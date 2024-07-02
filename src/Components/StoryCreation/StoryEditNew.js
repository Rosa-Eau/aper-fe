import React from 'react'
import { saveData } from "../../redux/action";
import Navbar1 from '../Navbar/Navbar';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import NewGnbM from '../Navbar/new-gnb-m';
import { setUserData, setSignupSuccess } from "../../redux/action";


const StoryEditNew = () => {
  const tableRef = useRef(null);
  const tableRef1 = useRef(null);
  const tableRefex = useRef(null);
  const tableRefex2 = useRef(null);
  const dispatch = useDispatch();
  const [edit2, setEdit2] = useState(false);
  const [toastVisible, setToastVisible] = useState(false)
  const [isLinkCopied, setIsLinkCopied] = useState(false);
  const [descriptionClicked, setDescriptionClicked] = useState(null)
  const [expandedDescriptions, setExpandedDescriptions] = useState({});
  const [delete2, setDelete2] = useState(false);
  const [episodeCount, setEpisodeCount] = useState(0);
  const [isTableVisible, setTableVisible] = useState(false);
  const [storyeditData, setStoryEditData] = useState([]);
  const [episodeEditData, setEpisodeEditData] = useState([]);
  const [genre, setGenre] = useState('');
  const [lineStyle, setLineStyle] = useState('');
  const [st, setSt] = useState(false)


  const handleToast = () => {
    setToastVisible(true)
  }
  const [currentPageUrl] = useState(window.location.href);


  //Copy the page sharing link
  const copyCurrentPageLink = () => {
    const tempInput = document.createElement("input");
    tempInput.value = currentPageUrl;
    document.body.appendChild(tempInput);
    tempInput.select();
    tempInput.setSelectionRange(0, 99999);
    document.execCommand("copy");
    document.body.removeChild(tempInput);
    setIsLinkCopied(true);
    setTimeout(() => {
      setIsLinkCopied(false);
    }, 2000);
  };


  // setting time to make toast message visible
  useEffect(() => {
    let timeout;
    if (toastVisible) {
      timeout = setTimeout(() => {
        setToastVisible(false);
      }, 3000);
    }
    return () => clearTimeout(timeout);
  }, [toastVisible]);


  // Handeling clicking outside the more menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (tableRef.current && !tableRef.current.contains(event.target) &&
        tableRefex2.current && !tableRefex2.current.contains(event.target)) {
        setTableVisible(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [tableRef]);


  const navigate = useNavigate();
  const penUser = localStorage.getItem('penNameUser');
  const data = useSelector((state) => state.userData);
  const location = useLocation();
  const { storyId1 } = useParams();

  //  const { storyId1 } = location.state || {};
  //  const episodeId = localStorage.getItem('episodeId');

  const [modal, setModal] = useState(false);
  const toggleModal = () => {
    setModal(!modal);
  };
  const [delete1, setDelete1] = useState(false);
  const togglDelete = () => {
    setDelete1(!delete1);
  };

  const HandleProfileNavigate = () => {
    navigate('/user/slide/story/profile', { state: { episodeCount } })
  }
  const handleMoreClick = () => {
    setTableVisible(!isTableVisible);
  };

  const handleEditGenre = (e) => {
    setGenre(e.target.value);
  };

  const handleEditStyle = (e) => {
    setLineStyle(e.target.value);
  };



  //Function to edit the story
  const handleEditStory = async () => {
    try {
      dispatch(saveData({ title, genre, lineStyle }));
      const authorid = localStorage.getItem('authorId');
      const storyId = localStorage.getItem('id');
      const token = JSON.parse(localStorage.getItem('token'));
      const apiUrl = `https://backend.aper.cc/story/updateStory/${storyId1}`;


      const prevTitle = localStorage.getItem('title');
      const prevGenre = localStorage.getItem('genre');
      const prevLineStyle = localStorage.getItem('writingStyle');
      const requestBody = {};
      let shouldUpdate = false;

      if (title !== prevTitle && title.trim() !== '') {
        requestBody.coverTitle = title;
        shouldUpdate = true;
      } else {
        requestBody.coverTitle = prevTitle;
      }
      if (genre !== prevGenre && genre.trim() !== '') {
        requestBody.genre = genre;
        shouldUpdate = true;
      } else {
        requestBody.genre = prevGenre;
      }
      if (lineStyle !== prevLineStyle && lineStyle.trim() !== '') {
        requestBody.lineStyle = lineStyle;
        shouldUpdate = true;
      } else {
        requestBody.lineStyle = prevLineStyle;
      }

      if (!shouldUpdate) {
        console.log('No changes detected. Previous values retained.');
        setDelete1(false);
        return;
      }

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
      localStorage.setItem('title', requestBody.coverTitle);
      localStorage.setItem('genre', requestBody.genre);
      localStorage.setItem('writingStyle', requestBody.lineStyle);

      const responseData = await response.json();
      const stTitle = responseData.data.coverTitle;
      const stRoutine = responseData.data.routineType;
      const stGenere = responseData.data.genre;
      const stDate = responseData.data.createdAt;
      setStData1(responseData.data);
      setStTitle(stTitle);
      setStRoutine(stRoutine);
      setStGenere(stGenere);
      setstCreated(stDate);
      fetchData();
      setDelete1(false);


    } catch (error) {
      // console.error('Error updating story:', error.message);
    }
  };



  const handleMoreClick1 = (episodeId, episodeIndex) => {
    setSelectedEpisodeIndex(episodeIndex);
    setTableVisible1(!isTableVisible1)
    // togglDeleteEpisode2(episodeId, episodeIndex);
  };


  const episodeId = localStorage.getItem('episodeId');
  //Function to fetch all the episodes
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
        setStoryEditData(responseData.data)
        // console.log("response of publish" +responseData.data)
        localStorage.setItem('routineEdit', responseData.data.routineType);
        localStorage.setItem('genereEdit', responseData.data.genre)
        localStorage.setItem('covertitleEdit', responseData.data.coverTitle)

      } catch (error) {
        // console.error('Error fetching episodes data:', error.message);
      }
    };

    fetchData();

  }, [storyId1, episodeId]);


  //Function to make the episode Publish
  useEffect(() => {
    const fetchData = async () => {
      const token = JSON.parse(localStorage.getItem('token'));
      try {
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
        responseData.data.forEach(async (episode, index) => {
          await clickToggle(episode.isPublished, `toggleSwitch_${index}`);
        });
      } catch (error) {
        // console.error('Error fetching episodes data:', error.message);
      }
    };
    fetchData();
  });


  //Function to Update story Details
  const handleToggleClicksave = async (val) => {
    try {
      const authorid = localStorage.getItem('authorId');
      const token = JSON.parse(localStorage.getItem('token'));
      const apiUrl1 = `https://backend.aper.cc/story/updateStory/${storyId1}`;
      const requestBody = {
        isPublished: !val,
      };
      const response = await fetch(apiUrl1, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          accept: 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      setSt(val);
      if (!response.ok) {
        throw new Error(`Failed to update story. Status: ${response.status}`);
      }
      const responseData = await response.json();
      setStData1(responseData.data)
      const updatedEpisodes = [...stData1];
      updatedEpisodes.isPublished = !updatedEpisodes.isPublished;
      setStData1(updatedEpisodes);
    } catch (error) {
      // console.error('Error updating story:', error.message);
    }
  };


  const [stTitle, setStTitle] = useState('');
  const [stRoutine, setStRoutine] = useState('');
  const [stGenere, setStGenere] = useState('');
  const [stDate, setstCreated] = useState('')
  const [stData1, setStData1] = useState([])
  const [fontdata, setFont] = useState('')


  //Fetch  story Data
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
        const stTitle = responseData.data.coverTitle;
        const stRoutine = responseData.data.routineType;
        const stGenere = responseData.data.genre;
        const stDate = responseData.data.createdAt;

        setStData1(responseData.data)
        setStTitle(stTitle);
        setStRoutine(stRoutine);
        setStGenere(stGenere);
        setstCreated(stDate);

      } catch (error) {
        // console.error('Error fetching episodes data:', error.message);
      }
    };

    fetchData();

  }, [episodeEditData, storyId1]);



  const fetchData = async () => {
    const token = JSON.parse(localStorage.getItem('token'));
    try {
      const response = await fetch(`https://backend.aper.cc/story/getStoryByStoryId/${storyId1}`, {
        // const response = await fetch(`https://backend.aper.cc/story/get-episode/${storyId1}`, {
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
      const stTitle = responseData.data.coverTitle;
      const stRoutine = responseData.data.routineType;
      const stGenere = responseData.data.genre;
      const stDate = responseData.data.createdAt;

      setStData1(responseData.data)
      setStTitle(stTitle);
      setStRoutine(stRoutine);
      setStGenere(stGenere);
      setstCreated(stDate);

    } catch (error) {
      // console.error('Error fetching episodes data:', error.message);
    }
  };


  //Handle the title change of story
  const [title, setTitle] = useState(stTitle);
  const handleEditTitle = (e) => {
    setTitle(e.target.value);
    setStTitle(e.target.value)
  };


  const storedRoutineType = localStorage.getItem('routineType');
  const storedGenre = localStorage.getItem('genre');
  const storedTitle = localStorage.getItem('title');

  //Funcction which handles publish toggle of story
  const clickToggle = (isPublished, toggleId) => {
    const checkbox = document.querySelector(`#${toggleId}`);
    if (checkbox) {
      checkbox.checked = !isPublished;
    }
  }

  //Function which handles publish toggle of episodes
  const clickToggle1 = (isPublished) => {
    const checkbox = document.querySelector('#flexSwitchCheckDefault');
    if (checkbox) {
      checkbox.checked = isPublished;
    }
  }




  // Get logged in user details
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = JSON.parse(localStorage.getItem('token'));
        const userDetailsResult = await fetch(
          'https://backend.aper.cc/user/getUserDetails',
          {
            method: 'get',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!userDetailsResult.ok) {
          // console.error('Error fetching user details:', userDetailsResult.statusText);
          return;
        }


        const userDetails = await userDetailsResult.json();
        // Dispatch the action to update Redux state
        dispatch(setUserData(userDetails.data));
        // localStorage.setItem('penNameUser',userDetails.data.penName)
        // localStorage.setItem('emailUser',userDetails.data.email)
        // console.log('User details:', userDetails);
      } catch (error) {
        // console.error('Error fetching user details:', error.message);
      }
    };
    fetchData();
  }, []);



  useEffect(() => {
    const fetchData = async () => {
      const authorId = localStorage.getItem('authorId');
      const storyId = localStorage.getItem('id');
      // console.log(authorId)
      const token = JSON.parse(localStorage.getItem('token'));
      try {
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
        setEpisodeEditData(responseData.data);
      } catch (error) {
        // console.error('Error fetching episodes data:', error.message);
      }
    };
    fetchData();

  }, [storyId1, episodeId]);



  localStorage.setItem('episode-length', episodeEditData.length + 1)

  const cnt11 = localStorage.getItem('episode-length')


  //   const [textValue, setTextValue] = useState(localStorage.getItem(`storyText_${storyId1}_${episodeId}`) || '');
  //   const [titlleValue, setTitleValue] = useState(localStorage.getItem(`titleText_${storyId1}_${episodeId}`) || '');
  const [textValue, setTextValue] = useState('')
  const [titlleValue, setTitleValue] = useState('')
  const [isTableVisible1, setTableVisible1] = useState(false);
  const [selectedEpisodeIndex, setSelectedEpisodeIndex] = useState(null);
  const togglDeleteEpisode2 = (episodeId, episodeIndex) => {
    // console.log('More clicked for episode with index:', episodeIndex);
    setSelectedEpisodeIndex(episodeIndex);
    localStorage.setItem('epin', episodeIndex);
    localStorage.setItem('epid', episodeId);
    setDelete2(!delete2);

  };


  //Function to create a Episode
  const createEpisode = async () => {
    const authorid = localStorage.getItem('authorId');
    const token = JSON.parse(localStorage.getItem('token'));
    try {
      if (storedRoutineType === '단편') {
        const areEpisodesCreated = localStorage.getItem('areEpisodesCreated');
      }
      if (storedRoutineType === '장편') {
        const areEpisodesCreated = localStorage.getItem('areEpisodesCreated');
      }

      if (storedRoutineType === ' 시집') {
        const areEpisodesCreated = localStorage.getItem('areEpisodesCreated');
      }


      const response = await fetch('https://backend.aper.cc/story/add-episode', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          storyId: storyId1,
          authorId: authorid,
          episodeTitle: titlleValue,
          description: textValue,
          routineType: storedRoutineType,
          genre: storedGenre,
          coverTitle: storedTitle
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create episode');
      }

      const responseData = await response.json();
      console.log('POST request successful:');
      setEpisodeCount(episodeCount + 1);
      localStorage.setItem('areEpisodesCreated', episodeCount + 1);
      const episodeId = responseData.data._id;
      //  console.log(episodeId)
      const authorId = responseData.data.authorId;
      localStorage.setItem('episodeId', episodeId);
      // console.log(episodeId)
      localStorage.setItem('authorId', authorId);
    } catch (error) {
      // console.error('Error creating episode:', error.message);
    }
  };


  //Function to navigate to write each episode
  const handleEpisodeClick = async (episodeIndex, episodeDescription, isPublished) => {
    setSelectedEpisodeIndex(episodeIndex);
    if (episodeEditData.length > 0) {
      const clickedEpisode = episodeEditData[episodeIndex];
      if (clickedEpisode) {
        const episodeId = clickedEpisode._id;
        const isFirstClick = localStorage.getItem(`episodeClicked_${episodeId}`) !== 'true';
        localStorage.setItem(`episodeClicked_${episodeId}`, 'true');
        if (isFirstClick) {
          navigate(`/user/slide/story/storycontent/${episodeId}`, { state: { storyId1: storyId1, episodeNumber: episodeIndex + 1, isPublished: isPublished } });
        } else {
          const handleSaveData = () => {
            navigate(`/user/slide/story/storycontent/view/${episodeId}/${storyId1}`, { state: { textValue: episodeDescription, episodeNumber: episodeIndex + 1, storyId1: storyId1, isPublished: isPublished } });
          };
          handleSaveData();
        }
      } else {
        // console.error('Clicked episode is null or undefined.');
      }
    } else {
      // console.error('Episodes data is empty.');
    }
  };



  //Function to delete each episode
  const togglDeleteEpisodeOne = async (episodeIdnew, episodeIndex) => {
    const clickedEpisode = episodeEditData[episodeIndex];
    const episodeIdnew1 = clickedEpisode._id;

    try {
      const author1Id = localStorage.getItem('authorId');
      const token = JSON.parse(localStorage.getItem("token"));
      if (!token) {
        // console.error('Token is missing.');
        return;
      }
      //  console.log('Deleting data with token:', episodeIndex);

      const response = await fetch('https://backend.aper.cc/story/delete-episode', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ episodeId: episodeIdnew1 }),
      });

      if (!response.ok) {
        throw new Error(`Failed to delete data. Status: ${response.status}`);
      }

      const responseData = await response.json();
      setEpisodeCount(episodeCount - 1);
      localStorage.setItem('areEpisodesCreated', episodeCount - 1);
      // setSelectedEpisodeIndex(null);
      setTableVisible1(false);
      setDelete2(!delete2)
      console.log('Data deleted successfully');

      const updatedEpisodes = episodeEditData.filter((_, selectedEpisodeIndex) => selectedEpisodeIndex !== episodeIndex);
      setEpisodeEditData(updatedEpisodes);
    } catch (error) {
      // console.error('Error deleting data:', error.message);
      // console.log('Error deleting data:', error.message);
    }

  }



  const handleDescriptionClick = (index) => {
    setDescriptionClicked(descriptionClicked === index ? null : index);

    setExpandedDescriptions((prevDescriptions) => {
      return {
        ...prevDescriptions,
        [index]: !prevDescriptions[index],
      };
    });
  };

  const areEpisodesCreated = localStorage.getItem('areEpisodesCreated')
  const dop1 = localStorage.getItem('dateofpub');
  const dop = dop1 && dop1.split("T")[0];


  const moreMainRef = useRef(null);

  // Function to handle clicks outside the more-main div
  useEffect(() => {

    const handleClickOutside = (event) => {
      if (moreMainRef.current && !moreMainRef.current.contains(event.target) &&
        tableRefex.current && !tableRefex.current.contains(event.target)) {
        setTableVisible(false);
        setSelectedEpisodeIndex(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  const [toggleEnabledStates, setToggleEnabledStates] = useState([]);
  const [characterLimitStatus, setCharacterLimitStatus] = useState([]);
  useEffect(() => {
    const countCharacters = (inputText) => {
      const allCharactersPattern = /[^\s]/g;
      const allMatches = inputText.match(allCharactersPattern);
      return allMatches ? allMatches.length : 0;
    };
    const updatedToggleStates = episodeEditData.map((episode) => {
      const descriptionCharacterCount = countCharacters(episode.description);
      return descriptionCharacterCount > 2000;
    });
    setToggleEnabledStates(updatedToggleStates);
    setCharacterLimitStatus(updatedToggleStates);


    updatedToggleStates.forEach(async (status, index) => {
      try {
        const episodeId = episodeEditData[index]._id;
        const token = JSON.parse(localStorage.getItem('token'));
        const apiUrl = `https://backend.aper.cc/story/update-episode/${episodeId}`;

        const requestBody = {
          characterLimitStatus: true

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
          throw new Error(`Failed to update episode. Status: ${response.status}`);
        }

        // console.log('Character limit status sent successfully for episode', episodeId);
      } catch (error) {
        // console.error('Error updating episode:', error.message);
      }
    });
  }, [episodeEditData]);



  //Function to delete the story
  const handleDelete = async () => {
    try {
      const Id = localStorage.getItem('id');
      const author1Id = localStorage.getItem('authorId');
      const token = JSON.parse(localStorage.getItem("token"));
      const storyId = localStorage.getItem('id');
      if (!token) {
        // console.error('Token is missing.');
        return;
      }
      const response = await fetch('https://backend.aper.cc/story/deleteStory', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ storyId: storyId }),
      });

      if (!response.ok) {
        throw new Error(`Failed to delete data. Status: ${response.status}`);
      }

      const responseData = await response.json();
      localStorage.removeItem('authorId');
      localStorage.removeItem('id');
      console.log('Data deleted successfully');
      setModal(false);
      navigate('/user/slide')
    } catch (error) {
      // console.error('Error deleting data:', error.message);
      // console.log('Error deleting data:', error.message);
    }
  };

  const [toggleClick, setToggleClick] = useState(false);

  //Function to publish each episodes
  const handleToggleClick = async (index, episodeId) => {
    try {
      const authorid = localStorage.getItem('authorId');

      const token = JSON.parse(localStorage.getItem('token'));

      const apiUrl1 = `https://backend.aper.cc/story/updateStory/${storyId1}`;
      const apiUrl = `https://backend.aper.cc/story/update-episode/${episodeId}`;
      const requestBody = {
        isPublished: !episodeEditData[index].isPublished,
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
      const updatedEpisodes = [...episodeEditData];
      updatedEpisodes[index].isPublished = !updatedEpisodes[index].isPublished;
      setEpisodeEditData(updatedEpisodes);
      setToggleClick(!toggleClick);
    } catch (error) {
      // console.error('Error updating story:', error.message);
    }
  };
  const [isPublished, setIsPublished] = useState(false);


  const targetRef = useRef(null);
  const [isNavbarFixed, setIsNavbarFixed] = useState(false);



  // Handling scrolling.. fixing navbar
  useEffect(() => {
    const handleScroll = () => {
      if (targetRef.current) {
        const { top } = targetRef.current.getBoundingClientRect();
        const threshold = 0;
        setIsNavbarFixed(top <= threshold);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);




  //editing the genere
  const handleGenreChange = (genre) => {
    const selectedGenre = genre;
    setGenre(selectedGenre);
  };


  //editing the font
  const handleWritingStyleChange = (style) => {
    const newWritingStyle = style;
    setLineStyle(newWritingStyle)
  };


  const handleNavigateAper = () => {
    navigate('/login');
  };

  // mobile responsive
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
  const token = JSON.parse(localStorage.getItem("token"));




  return (
    <>
      <div className=''>
        {/* <Navbar1/> */}
        {isMobile ? <NewGnbM /> : <Navbar1 />}

        <div className={`fixed-divv ${isNavbarFixed ? 'visible' : ''}`}>
          <p className="auth-nam1"> {stGenere}</p>
          {stTitle}
        </div>


        <div className='outer-div-1 story-media' ref={targetRef}>
          <div className='main-horizontal'>
            <div className='main-title'>
              <div className="custom-line"
              ></div>
              <div className='text textroutine'
                style={{ fontFamily: `${fontdata.lineStyle}, sans-serif` , paddingBottom:'5px'}}
              >{stRoutine}</div>

            </div>
            {token &&
              <div className='main-toggle'>
                <div className='toggle-name'>
                  <div className="form-check form-switch" style={{ display: 'flex', alignItems: 'center' }}>
                    <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" style={{ display: 'flex', alignItems: 'center' }}
                      checked={!stData1.isPublished}
                      onChange={() => handleToggleClicksave(stData1.isPublished)}
                    />

                    <b className='text-main'
                      style={{ fontFamily: `${fontdata.lineStyle}, sans-serif` }}
                    >  {stData1.isPublished ? '공개' : '비공개'}</b>


                  </div>
                </div>
                <div className='more-main' ref={tableRef} onClick={handleMoreClick} >
                  <img src='/SVG/ic_more_horiz.svg' />
                </div>

              </div>
            }
            <div>
              {isLinkCopied && (
                <div className="link-copied">Link Copied</div>
              )}
            </div>

          </div>
          <div className='second-horizontal'>
            <div className='first-horizontal-1'>
              <div className='col-horizontal-1 custom-text1'
                style={{ fontFamily: `${fontdata.lineStyle}, sans-serif` }}
              >
                {stTitle}
              </div>
              <div className='col-horizontal-2'>
                <div className="" style={{ position: 'relative' }}>
                  <div className="author-info">
                    <div className="author-image-container" onClick={HandleProfileNavigate}>
                      <div className="author-image">
                        <img src={fontdata.backgroundImage
                          ? (fontdata.backgroundImage.includes("/images")
                            ? `https://aper.cc/${fontdata.backgroundImage}`
                            : `https://backend.aper.cc/${fontdata.backgroundImage}`)
                          : 'defaultImageURL'} />

                      </div>
                    </div>
                    <div className="author-details">
                      <div className="author-name"
                        style={{ fontFamily: `${fontdata.lineStyle}, sans-serif` }}
                      >{fontdata.authorName}
                      </div>
                      <div className="separator"></div>
                      <div className="category">{stGenere}</div>
                      <div className="separator"></div>
                      <div className="date" style={{ fontFamily: `${fontdata.lineStyle}, sans-serif` }}>
  {stDate && stDate.split("T")[0].replaceAll("-", ".")}
</div>
                    </div>
                  </div>

                </div>
              </div>

            </div>
            <div className='second-horizontal-1'>
              {isTableVisible && (
                <div className="story-table  " ref={tableRefex2}>
                  <table>
                    <tbody className="design-table">
                      <tr  >
                        <td className="font-table111" onClick={togglDelete}>커버 편집</td>

                      </tr>
                      <tr>
                        <td className="font-table111" onClick={copyCurrentPageLink}>이야기 공유</td>

                      </tr>
                      <tr>
                        <td className="font-table111" onClick={toggleModal}>삭제</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}

            </div>

          </div>
        </div>



        <div style={{ width: '100%', height: '1px', position: 'relative', background: 'rgba(0, 0, 0, 0.20)', marginTop: '20px' }}></div>

        <div style={{ width: '100%', height: '1px', position: 'relative', background: 'rgba(0, 0, 0, 0.20)', marginTop: '2px' }}></div>

        <div className='outer-div-'>


          {episodeEditData.map((episode, index) => (

            <React.Fragment key={index}>

              <div className='outer-div-1'>
                <div className="extra-div" >

                  <div className="replacement-ui   m1-ui"   >
                    <div className='main-horizontal'>
                      <div className='main-title' style={{ fontFamily: `${fontdata.lineStyle}, sans-serif` }}>
                        <div className='line-r'>
                          <div className='head'

                            onClick={async () => {
                              if (!token) {
                                handleNavigateAper();
                              } else {
                                await handleEpisodeClick(index)
                              }
                            }}
                          //  onClick={async () => await handleEpisodeClick(index)}
                          >
                            {index + 1}화.

                          </div>
                          <b className='head2'
                            style={{ fontFamily: `${fontdata.lineStyle}, sans-serif` }}
                          >{episode.episodeTitle}</b>
                        </div>

                      </div>
                      {token &&
                        <div className='main-toggle'>
                          <div className='toggle-name'>
                            <div className="form-check form-switch" style={{ display: 'flex', alignItems: 'center' }}>
                              <input className="form-check-input"
                                type="checkbox"
                                role="switch"
                                id={`toggleSwitch_${index}`}
                                checked={!episode.isPublished}
                                onChange={() => handleToggleClick(index, episode._id)}

                              />
                              <b className='text-main'
                                style={{ fontFamily: `${fontdata.lineStyle}, sans-serif` }}
                              >{episode.isPublished ? '공개' : '비공개'}</b>


                            </div>

                          </div>
                          <div className='more-main' ref={moreMainRef} onClick={async () => await handleMoreClick1(episode._id, index)}>
                            <img src='/SVG/ic_more_horiz.svg' />
                          </div>

                        </div>
                      }

                    </div>


                    <div className='flex-table'>
                      <div>
                        <div className='label3'> {(() => {

                          const dateOfPublication = new Date();
                          let expirationDays = 30;

                          if (storedRoutineType === '자유' || storedRoutineType === '단편') {
                            expirationDays = 30;
                          } else if (storedRoutineType === '장편') {
                            expirationDays = 40;
                          } else if (storedRoutineType === '시집') {
                            expirationDays = 7;
                          }
                          const expirationDate = new Date(episode.createdAt);

                          const presentDate = new Date();

                          const daysLeft = presentDate - expirationDate;

                          const difference = Math.floor(daysLeft / (1000 * 60 * 60 * 24));

                          expirationDate.setDate(expirationDate.getDate() + (index + 1) * expirationDays);

                          return (
                            <>
                              {(((index + 1) * expirationDays) - difference <= 0) ? `D+` + (difference - ((index + 1) * expirationDays) + 1) : `D-` + (((index + 1) * expirationDays) - difference)}
                              <b className='sublabel3'>
                                ({expirationDate.toLocaleDateString('ko-KR').replace(/\s/g, '').slice(0, -1)})
                              </b>
                            </>
                          );
                        })()}</div>
                        <p className='episode-data-1'
                          onClick={async () => {
                            if (!token) {
                              handleNavigateAper();
                            } else {
                              await handleEpisodeClick(index, episode.isPublished)
                            }
                          }}


                          //  onClick={async () => await handleEpisodeClick(index,episode.isPublished)}
                          style={{ fontFamily: `${fontdata.lineStyle}, sans-serif` }}>
                          {expandedDescriptions[index]
                            ? episode.description.substring(0, 240)
                            : episode.description.substring(0, 120)}
                          <span className='mi' onClick={() => handleDescriptionClick(index)}>...</span>
                        </p>

                        {delete2 && selectedEpisodeIndex !== null && selectedEpisodeIndex === index && (
                          <>
                            <div className="overlay" id="overlay"></div>

                            <div className="popup" id="popup">
                              <div className="popup-content">
                                <div className="confirmation-message-container">
                                  <div className="confirmation-message">
                                    이야기를 정말 삭제하시겠어요?
                                  </div>
                                </div>

                                <button className='cancel'>
                                  <b className='text1' onClick={() => setDelete2(!delete2)}>
                                    취소</b>
                                </button>
                                <button className='delete' onClick={async () => await togglDeleteEpisodeOne(episode._id, index)} >
                                  삭제
                                </button>
                              </div>
                            </div>

                          </>

                        )}

                      </div>


                      <div className='nn'>
                        {isTableVisible1 && selectedEpisodeIndex !== null && selectedEpisodeIndex === index && (
                          <div className="more-table1" ref={tableRefex}>
                          <table>
                            <tbody className="design-table1">
                              <tr  >
                                <td className="font-table1" onClick={async () => await
                                  handleEpisodeClick(index)} >글 쓰기</td>

                              </tr>
                              <tr  >
                                <td className="font-table1 " onClick={async () => await togglDeleteEpisode2(episode._id, index)}>삭제</td>
                              </tr>

                            </tbody>
                            </table>
                          </div>
                        )}


                      </div>
                    </div>
                  </div>



                </div>
              </div>
              <div style={{ width: '100%', height: '1px', position: 'relative', background: 'rgba(0, 0, 0, 0.20)', marginTop: '0px' }}></div>
            </React.Fragment>


          ))}


          {token &&
            <div className='block'>


              {/* {toastVisible && <div className='autosave111'><p className='autocnt111'>신규 회차 글 상자를 추가했습니다.</p></div>}  */}
              {toastVisible && (
                <div className='toast-container'>
                  <p className='toast-message'>신규 회차 글 상자를 추가했습니다.</p>
                </div>
              )}
              <div>
                <div className="custom-title1"
                  style={{ fontFamily: `${fontdata.lineStyle}, sans-serif` }}
                >
                  {`${cnt11} 회차 추가`}
                </div>
                <div className='custom-logo1' onClick={createEpisode}>
                  <img src='/SVG/ic_add_s.svg' alt={`Add Episode ${cnt11}`} onClick={handleToast} />
                </div>
              </div>


            </div>
          }
        </div>

      </div>

      {modal && (
        <>
          <div className="overlay" id="overlay"></div>

          <div className="popup" id="popup">
            <div className="popup-content">
              <div className="confirmation-message-container">
                <div className="confirmation-message">
                  이야기를 정말 삭제하시겠어요?
                </div>
              </div>

              <button className='cancel'>
                <b className='text1' onClick={() => setModal(false)}>
                  취소</b>
              </button>
              <button className='delete' onClick={handleDelete} >
                삭제
              </button>
            </div>
          </div>
        </>

      )}




      {delete1 && (
        <>
          <div className="overlay" id="overlay"></div>

          <div className="popup2" id="popup">
            <div className="popup-content">
              <div className="story-cover-title">이야기 커버 편집</div>
              <div className="story-title">이야기 제목</div>

              <input type="text" className="story-content" onChange={handleEditTitle} autoFocus
                value={stTitle}
              />
              <div className="black-background1"></div>
              <div className='box-flex'>
                <div className="dropdown">
                  <button
                    className="btn dropdown-toggle colorCh dropdown-gg "
                    type="button"
                    id="dropdownMenuButton"
                    data-mdb-toggle="dropdown"
                    aria-expanded="false"
                  >

                    <span className="genre-style">{genre ? genre : <span className="custom-style">이야기 장르 선택</span>}</span>
                  </button>
                  <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <li>
                      <a className="dropdown-item fontGenre" onClick={() => handleGenreChange('일상')}>
                        일상
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item fontGenre" onClick={() => handleGenreChange('로맨스')}>
                        로맨스
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item fontGenre" onClick={() => handleGenreChange('SF')}>
                        SF
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item fontGenre" onClick={() => handleGenreChange('공포')}>
                        공포
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item fontGenre" onClick={() => handleGenreChange('퀴어')}>
                        퀴어
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item fontGenre" onClick={() => handleGenreChange('사회')}>
                        사회
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item fontGenre" onClick={() => handleGenreChange('예술')}>
                        예술
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item fontGenre" onClick={() => handleGenreChange('비평')}>
                        비평
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item fontGenre" onClick={() => handleGenreChange('시')}>
                        시
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="dropdown  lll">
                  <button
                    className="btn dropdown-toggle colorCh dropdown-gg"
                    type="button"
                    id="dropdownMenuButton"
                    data-mdb-toggle="dropdown"
                    aria-expanded="false"

                  >


                    <span className="genre-style">{lineStyle ? lineStyle : <span className="custom-style">글줄 스타일 선택</span>}</span>

                  </button>
                  <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <li>
                      <a className="dropdown-item font1" onClick={() => handleWritingStyleChange('문체부 바탕체')}>
                        문체부 바탕체
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item font2" onClick={() => handleWritingStyleChange('KoPub바탕체')}>
                        KoPub바탕체
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item font3" onClick={() => handleWritingStyleChange('Noto Serif KR')}>
                        Noto Serif KR
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item font4" onClick={() => handleWritingStyleChange('네이버 나눔명조')}>
                        네이버 나눔명조
                      </a>
                    </li>
                  </ul>
                </div>

              </div>

              <button className='cancel1'>
                <b className='text1' onClick={() => setDelete1(!delete1)}>
                  취소</b>
              </button>
              <button className='delete1' onClick={handleEditStory}>
                저장
              </button>
            </div>
          </div>
        </>
      )}
      {edit2 && (
        <>
          <div className="overlay" id="overlay"></div>

          <div className="popup2" id="popup">
            <div className="popup-content">
              <div><img
                className="close-m1"
                alt=""
                src="/SVG/ic_close (1).svg"
                onClick={() => setEdit2(!edit2)}
              /></div>
              <div className="story-cover-title">이야기 커버 편집</div>
              <div className="story-title">이야기 제목</div>

              <input type="text" className="story-content" placeholder="당신의 이름을 지어다가 며칠을 먹었다" onChange={handleEditTitle} autoFocus />
              <div className="black-background"></div>
              <div className='drops'>
                <select className="dropdown-g" onChange={handleEditGenre}>
                  <option hidden>Choose a Genere of writing</option>
                  <option value=" 자유 루틴"> 자유 루틴</option>
                  <option value="단편">단편</option>
                  <option value=" 장편"> 장편</option>
                  <option value="시집">시집</option>
                </select>
                <select className="dropdown-g" onChange={handleEditStyle}>
                  <option hidden>Choose a style of writing</option>
                  <option value="문체부 바탕체">문체부 바탕체</option>
                  <option value="KoPub바탕체">KoPub바탕체</option>
                  <option value="Noto Serif KR">Noto Serif KR</option>
                  <option value="네이버 나눔명조">네이버 나눔명조</option>
                </select>
              </div>
              <button className='cancel1  '>
                <b className='text1' onClick={() => setDelete1(!delete2)}>
                  취소</b>
              </button>
              <button className='delete1' onClick={handleEditStory}>
                삭제
              </button>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default StoryEditNew
