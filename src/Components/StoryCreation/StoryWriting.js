import React from 'react'
import "./StoryWriting.css";
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import BottomInterfaceWriter from './FooterStory';
import { useLocation } from 'react-router-dom';


const StoryWriting = () => {

  const authorId = localStorage.getItem('authorId');
  const { episodeId } = useParams();
  localStorage.setItem('episodeId', episodeId)
  const location = useLocation();
  const { storyId1 } = location.state;
  const { isPublished } = location.state;
  const { episodeNumber } = location.state;
  const { episodeNumber1 } = location.state;
  const [textValue, setTextValue] = useState(localStorage.getItem(`storyText_${storyId1}_${episodeId}`) || '');
  const [titlleValue, setTitleValue] = useState(localStorage.getItem(`titleText_${storyId1}_${episodeId}`) || '');
  const [isDataSaved, setIsDataSaved] = useState(false);
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [episodeExists, setEpisodeExists] = useState(false);
  const [isNewEpisode, setIsNewEpisode] = useState(false);
  const [dataChanged, setDataChanged] = useState(false);
  const [debounceTimeout, setDebounceTimeout] = useState(null);
  const [toggleClick, setToggleClick] = useState(false);

  // const [isToggleEnabled, setIsToggleEnabled] = useState(false);
  const [koreanWordCount, setKoreanWordCount] = useState(
    Number(localStorage.getItem(`koreanWordCount_${episodeId}`)) || 0
  );



  // Function to update the publishing of episode
  const handleToggleClick = async () => {
    try {
      const authorid = localStorage.getItem('authorId');

      const token = JSON.parse(localStorage.getItem('token'));

      const apiUrl1 = `https://backend.aper.cc/story/updateStory/${storyId1}`;
      const apiUrl = `https://backend.aper.cc/story/update-episode/${episodeId}`;
      const requestBody = {
        isPublished: !toggleClick,
      };

      const response = await fetch(apiUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          accept: 'application/json',
        },
        body: JSON.stringify(requestBody),
      });



      if (!response.ok) {
        throw new Error(`Failed to update story. Status: ${response.status}`);
      }

      console.log('Story updated successfully');
      // console.log(".....................................console............." + !toggleClick)
      setToggleClick(!toggleClick);
    } catch (error) {
      // console.error('Error updating story:', error.message);
    }
  };


  //Function to set the font 
  const [fontdata, setFont] = useState('')
  useEffect(() => {
    const fetchData = async () => {
      const token = JSON.parse(localStorage.getItem('token'));
      try {
        const response = await fetch(`https://backend.aper.cc/story/getStoryByStoryId/${storyId1}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch episodes data');
        }

        const responseData = await response.json();
        setFont(responseData.data)
        // console.log("result of piublish ......................" + responseData.data.isPublished)

      } catch (error) {
        // console.error('Error fetching episodes data:', error.message);
      }
    };
    fetchData();
  }, [storyId1]);



  //Function to handle the Publish toggle
  const clickToggle = (val) => {
    const checkbox = document.querySelector('#flexSwitchCheckDefault');
    if (checkbox) {
      checkbox.checked = !val;
      setToggleClick(!val)
    }
  }


  const [toastVisible, setToastVisible] = useState(false);

  useEffect(() => {
    // Function to show the toast for 2 seconds
    const showToast = () => {
      setToastVisible(true);
      setTimeout(() => {
        setToastVisible(false);
      }, 2000);
    };
    showToast();
    const interval = setInterval(() => {
      showToast();
    }, 2 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);




  useEffect(() => {
    setDataChanged(true);
  }, [textValue, titlleValue]);

  const routineSelected = useSelector((state) => state.selectedRoutine);


  //Function which calculates the lImit for each routine
  const calculateCharacterLimit = () => {
    const koreanCharacterSize = 1;
    switch (routineSelected) {
      case '자유':
        return 50000;
      case '단편':
        return 8800;
      case '장편':
        return 12000;
      case '시집':
        return 10000;
      default:
        return 50000;
    }
  };

  const characterLimit = calculateCharacterLimit();
  const countKoreanAndEnglishCharacters = (inputText) => {

    const allCharactersPattern = /[^\s]/g;
    const allMatches = inputText.match(allCharactersPattern);
    const allCharacterCount = allMatches ? allMatches.length : 0;

    return allCharacterCount;
  };


  useEffect(() => {
    const { korean, english } = countCharacters(textValue);
    setKoreanWordCount(korean + english);
  }, []);



  //Function which is used to change the added text
  const handleTextChange = (e) => {
    clearTimeout(debounceTimeout);
    const inputText = e.target.value;
    localStorage.setItem(`storyText_${episodeId}`, inputText);
    const { korean, english } = countCharacters(inputText);
    setKoreanWordCount(korean + english);
    const totalCharacters = korean + english;
    const total = korean + english;
    const remainingCharacters = characterLimit - (korean + english);

    if (total < characterLimit) {
      setTextValue(inputText);
      localStorage.setItem(`storyText_${episodeId}`, inputText);
      localStorage.setItem(`koreanWordCount_${episodeId}`, total.toString());
      localStorage.setItem(`englishLetterCount_${episodeId}`, english.toString());
    } else if (total >= characterLimit) {
      setTextValue(inputText.slice(0, characterLimit));
      localStorage.setItem(`storyText_${episodeId}`, inputText.slice(0, characterLimit));
      alert('Character limit reached!');
    }
  };


  //Function which calculates the korean characters
  const countCharacters = (inputText) => {
    const koreanCharacterPattern = /[\u3131-\uD79D\uDC00-\uDFFF\s]/g;
    const koreanMatches = inputText.match(koreanCharacterPattern);
    const koreanCharacterCount = koreanMatches ? koreanMatches.length : 0;
    const englishCharacterPattern = /\S/g;
    const englishMatches = inputText.match(englishCharacterPattern);
    const englishCharacterCount = englishMatches ? englishMatches.length : 0;
    return { korean: koreanCharacterCount, english: englishCharacterCount };
  };




  useEffect(() => {
    const fetchDataFromLocalStorage = () => {
      const savedText = localStorage.getItem(`storyText_${storyId1}_${episodeId}`);
      const savedTitle = localStorage.getItem(`titleText_${storyId1}_${episodeId}`);
      if (savedText && savedTitle) {
        setTextValue(savedText);
        setTitleValue(savedTitle);
        setIsNewEpisode(false);
      } else {
        setIsNewEpisode(true);
      }
    };

    fetchDataFromLocalStorage();
  }, [storyId1, episodeId]);



  //Updating the episode data
  useEffect(() => {
    if (isDataSaved) {
      const token = JSON.parse(localStorage.getItem('token'));
      const episode1id = localStorage.getItem('episodeId');
      fetch(`https://backend.aper.cc/story/update-episode/${episode1id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          episodeTitle: titlleValue,
          description: textValue
        }),
      })
        .then(response => response.json())
        .then(data => {
          // console.log('PUT request successful:');
        })

        .catch(error => {
          // console.error('Error making PUT request:', error);
        });
    }
  }, [textValue, titlleValue, isDataSaved]);


  const token = JSON.parse(localStorage.getItem("token"));
  const handleMainPage = () => {
    if (!token) {
      navigate('/login');
    } else {
      navigate('/user');
    }
  }


  const handleTitleChange = (e) => {
    let inputTitle = e.target.value;
    if (inputTitle.length > 25) {
      inputTitle = inputTitle.slice(0, 25);
    }
    setTitleValue(inputTitle);
  };
  const [fetchedStoryTitle, setFetchedStoryTitle] = useState('')

  const [checkData, setStoryCheckData] = useState([]);
  const [episodeNumber2, setEpisodeNumber] = useState(null);

  //Function to fetch each episode data
  useEffect(() => {
    const fetchData = async () => {
      const token = JSON.parse(localStorage.getItem('token'));
      try {
        //  const response = await fetch(`https://backend.aper.cc/story/getStoryByStoryId/${storyId1}`, {
        const response = await fetch(`https://backend.aper.cc/story/get-episode/${storyId1}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch episodes data');
        }

        const responseData = await response.json();
        setStoryCheckData(responseData.data);


      } catch (error) {
        // console.error('Error fetching episodes data:', error.message);
      }
    };

    fetchData();

  }, []);


  useEffect(() => {
    const episodeId = localStorage.getItem('episodeId');
    const index = checkData.findIndex(episode => episode._id === episodeId);
    setEpisodeNumber(index + 1)
  }, [checkData]);



  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = JSON.parse(localStorage.getItem('token'));
        const storyId = localStorage.getItem('id');
        const episodeid = localStorage.getItem('episodeId');
        // console.log("episode id is " + episodeId)
        const response = await fetch(
          `https://backend.aper.cc/story/get-episodeById/${storyId1}/${episodeId}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          }
        );

        const responseData = await response.json();
        const response1 = JSON.stringify(responseData.data[0].isPublished);
        clickToggle(!responseData.data[0].isPublished)

        if (responseData.data && responseData.data.length > 0) {
          const fetchedStoryTitle = responseData.data[0].coverTitle;
          const fetchedText = responseData.data[0].description;
          const fetchedTitle = responseData.data[0].episodeTitle;
          // console.log("title in " + fetchedText);
          // console.log("data in  " + fetchedTitle);

          const { korean, english } = countCharacters(fetchedText);
          setKoreanWordCount(korean + english);

          setTextValue(fetchedText);
          setTitleValue(fetchedTitle);
          setFetchedStoryTitle(fetchedStoryTitle);
          localStorage.setItem(`storyText_${storyId1}_${episodeId}`, fetchedText)
          localStorage.setItem(`titleText_${storyId1}_${episodeId}`, fetchedTitle)
          setEpisodeExists(true);
          setIsDataSaved(true);
        } else {

          setEpisodeExists(false);
        }
      } catch (error) {
        // console.error('Error fetching episode data:', error);
      }
    };
    fetchData();
  }, []);

  const navigate = useNavigate();
  const handleNavBack = () => {
    navigate(`/user/slide/story/${storyId1}`, { state: { isAddIconClicked: true, storyId1: storyId1 } })
  }
  const storedTitle = localStorage.getItem('title');

  const handleSaveData = () => {

    navigate('/user/slide/story/storycontent/view/${episodeId}', { state: { textValue } });
  };


  //Mobile Responsive
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);






  return (
    <div className='main-image-container11'>

      {/* <button onClick={handleSaveData}>Save Data</button> */}
      {!isMobile &&
        <div className='move-back-story1' onClick={handleNavBack} >
          <img alt="" src="/SVG/Vector.svg" />
          <b className='title-st'>뒤로가기</b>


        </div>
      }

      <div className="additional-div" style={{ zIndex: 1001 }}>

        <div className="custom-text-1">
          <div className='ccc'
            style={{ fontFamily: `${fontdata.lineStyle}, sans-serif` }}
          > [{fetchedStoryTitle}]</div>
        </div>
        <div className='test'>
          {/* <b className='bbb'>  {episodeNumber?episodeNumber:episodeNumber1}화.</b> */}
          <b className='bbb'
            style={{ fontFamily: `${fontdata.lineStyle}, sans-serif` }}
          >  {episodeNumber2}화.</b>

          <input
            type="text"
            className="subtitle"
            placeholder="  회차의 제목을 입력해 주세요"
            value={titlleValue}
            onChange={handleTitleChange}
            autoFocus
            style={{ fontFamily: `${fontdata.lineStyle}, sans-serif` }}
          />
          <div className="full-size-background"></div>
        </div>
      </div>

      <div className='add-div-22'>
        <textarea id="myTextarea" placeholder="본문을 입력해 주세요."
          style={{ fontFamily: `${fontdata.lineStyle}, sans-serif` }}
          value={textValue}

          onChange={handleTextChange}
        ></textarea>
      </div>

      {toastVisible && <div className='autosave1' style={{ position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', color: 'white' }}><p className='autocnt11'>자동 저장 활성화</p></div>}
      {!isMobile &&
        <footer className="bottom-interface-writer">

          <div className="left-trail2" onClick={handleMainPage}>
            <img className="logo-icon1" loading="eager" alt="" src="
        /SVG/logo.svg" />
          </div>
          <div className="progress11">
            <div className="bar">
              <div className="progress1">
                <div className="progress2" />
              </div>
              <b className="b2">8%</b>
            </div>

            <div>
              {/* <div className="fear-of-driving">
          최소 2000 자 이상 채워야만 공개가 가능합니다.
        </div> */}
              <div className='above'>
                <div className="characters">
                  <div className="toggle-buttons">
                    {koreanWordCount >= 0 ? (koreanWordCount <= characterLimit ? koreanWordCount : characterLimit) : 0}
                  </div>
                  <div className="toggle-buttons1">/</div>
                  <div className="toggle-buttons2">{characterLimit}</div>
                </div>

                <div className=" above2">
                  <div className="form-check form-switch" style={{ display: 'flex', alignItems: 'center' }}>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      role="switch"
                      id="flexSwitchCheckDefault"
                      style={{ display: 'flex', alignItems: 'center' }}
                      // disabled={!isToggleEnabled}
                      onChange={handleToggleClick}
                      checked={!toggleClick}
                    />
                    <b className='text-main'>{toggleClick ? '공개' : '비공개'}</b>
                  </div>
                </div>
              </div>
            </div>
            {/* <button onClick={addData}> save Data</button> */}
          </div>
        </footer>
      }
      {
        isMobile && (
          <>
            <div className="footer-mobile-writer" style={{ position: 'fixed', bottom: 0, left: 0, width: '100%' ,zIndex:1000}}>
              <div>
                <div className='move-back-story' onClick={handleNavBack} >
                  <img alt="" src="/SVG/Vector.svg" />
                  {/* <b className='title-st'>뒤로가기</b> */}
                  <b className='title-st'>돌아가기</b>


                </div>
              </div>

              <div className='above'>
                <div className="characters">
                  <div className="toggle-buttons">
                    {koreanWordCount >= 0 ? (koreanWordCount <= characterLimit ? koreanWordCount : characterLimit) : 0}
                  </div>
                  <div className="toggle-buttons1">/</div>
                  <div className="toggle-buttons2">{characterLimit}</div>
                </div>

                <div className=" above2">
                  <div className="form-check form-switch" style={{ display: 'flex', alignItems: 'center' }}>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      role="switch"
                      id="flexSwitchCheckDefault"
                      style={{ display: 'flex', alignItems: 'center' }}
                      // disabled={!isToggleEnabled}
                      onChange={handleToggleClick}
                      checked={!toggleClick}
                    />
                    <b className='text-main'>{toggleClick ? '공개' : '비공개'}</b>
                  </div>
                </div>
              </div>
            </div>
          </>
        )
      }

    </div>
  )
}

export default StoryWriting
