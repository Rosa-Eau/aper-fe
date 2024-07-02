import React from 'react';
import { useState, useEffect } from 'react';
import './Story.css'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { updateEpisodeCount } from '../../redux/action';
import { setUserData, setSignupSuccess } from "../../redux/action";

import { saveData } from "../../redux/action";
import Navbar1 from '../Navbar/Navbar';

const Story = () => {
  const penUser = localStorage.getItem('penNameUser')
  const emailUser = localStorage.getItem('emailUser')
  const [descriptionClicked, setDescriptionClicked] = useState(null)
  const imageSrc = localStorage.getItem('imageurl')

  const authorId = localStorage.getItem('authorId');
  const episodeId = localStorage.getItem('episodeId');
  const data = useSelector((state) => state.userData);

  localStorage.setItem('pen', data.penName);
  const storedPenName = localStorage.getItem('pen');
  const storedRoutineType = localStorage.getItem('routineType');
  console.log('changed Routine' + storedRoutineType)
  const storedTitle = localStorage.getItem('title');
  const storedGenre = localStorage.getItem('genre');
  const storedWritingStyle = localStorage.getItem('writingStyle');
  const dop1 = localStorage.getItem('dateofpub');
  const dop = dop1 && dop1.split("T")[0];
  const storyId = localStorage.getItem('id');
  console.log("storyId is" + storyId)
  const [episodesData, setEpisodesData] = useState([]);


  const [selectedEpisodeIndex, setSelectedEpisodeIndex] = useState(null);
  const [expandedDescriptions, setExpandedDescriptions] = useState({});


  useEffect(() => {
    setEpisodesData([]);
    setEpisodeCount(0);
  }, [storyId]);

  const handleDescriptionClick = (index) => {
    setDescriptionClicked(descriptionClicked === index ? null : index);

    setExpandedDescriptions((prevDescriptions) => {
      return {
        ...prevDescriptions,
        [index]: !prevDescriptions[index],
      };
    });
  };
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isTableVisible, setTableVisible] = useState(false);
  const [isTableVisible3, setTableVisible3] = useState(false);
  const [currentEpisodeId, setCurrentEpisodeId] = useState(1);
  const [episodes, setEpisodes] = useState([]);
  const [activeEpisode, setActiveEpisode] = useState(null);
  const [creationDate, setCreationDate] = useState('');
  const [isTableVisible1, setTableVisible1] = useState(false);
  const [edit2, setEdit2] = useState(false);
  const [textValue, setTextValue] = useState(localStorage.getItem(`storyText_${storyId}_${episodeId}`) || '');
  const [titlleValue, setTitleValue] = useState(localStorage.getItem(`titleText_${storyId}_${episodeId}`) || '');
  const [showFullDescription, setShowFullDescription] = useState(false);
  const dispatch = useDispatch();
  const [episodeCount, setEpisodeCount] = useState(0);
  const navigate = useNavigate();



  useEffect(() => {
    const fetchData = async () => {
      // const authorId = localStorage.getItem('authorId');
      // console.log(authorId)
      const token = JSON.parse(localStorage.getItem('token'));
      try {
        const response = await fetch(`https://backend.aper.cc/story/getStoryByStoryId/${storyId}`, {
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
        console.log("sresuly of piublish ......................" + responseData.data.isPublished)

        if (responseData.data.isPublished === true) {
          clickToggle()
        }
        // console.log("array" + responseData.data)

        // setStoryData(responseData.data);
        // console.log(episodesData)

      } catch (error) {
        // console.error('Error fetching episodes data:', error.message);
      }
    };

    fetchData();

  }, [storyId]);



  const clickToggle = () => {

    const checkbox = document.querySelector('#flexSwitchCheckDefault');


    if (checkbox) {
      checkbox.checked = true;
    }
  }


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


        console.log('User details:', userDetails);
      } catch (error) {
        // console.error('Error fetching user details:', error.message);
      }
    };


    fetchData();
  }, []);

  const image = localStorage.getItem('backgroundImage');



  const createEpisode = async () => {
    // setEpisodeCount(episodeCount + 1);
    // localStorage.setItem('areEpisodesCreated', episodeCount + 1);


    const authorid = localStorage.getItem('authorId');
    const storyId = localStorage.getItem('id');
    const token = JSON.parse(localStorage.getItem('token'));
    try {


      if (storedRoutineType === '단편') {
        const areEpisodesCreated = localStorage.getItem('areEpisodesCreated');

        if (areEpisodesCreated >= 5) {
          alert('Cannot create more than 5 episodes for 단편 type.');
          return;
        }
      }


      if (storedRoutineType === '장편') {
        const areEpisodesCreated = localStorage.getItem('areEpisodesCreated');

        if (areEpisodesCreated >= 10) {
          alert('Cannot create more than 5 episodes for 장편 type.');
          return;
        }
      }

      if (storedRoutineType === ' 시집') {
        const areEpisodesCreated = localStorage.getItem('areEpisodesCreated');
        if (areEpisodesCreated >= 15) {
          alert("cannot create more than 15 Episodes in  시집 type")
        }
      }


      const response = await fetch('https://backend.aper.cc/story/add-episode', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          storyId: storyId,
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
      console.log('POST request successful:', responseData);
      setEpisodeCount(episodeCount + 1);
      localStorage.setItem('areEpisodesCreated', episodeCount + 1);
      const episodeId = responseData.data._id;
      //  console.log(episodeId)
      const authorId = responseData.data.authorId;
      localStorage.setItem('episodeId', episodeId);
      // console.log(episodeId)
      localStorage.setItem('authorId', authorId);

      // setEpisodeCount((prevEpisodeCount) => prevEpisodeCount + 1);


      // localStorage.setItem('areEpisodesCreated', episodeCount + 1);
      //  navigate(`/user/slide/story/storycontent/${episodeId}`)

    } catch (error) {
      // console.error('Error creating episode:', error.message);
    }
  };


  useEffect(() => {
    const fetchData = async () => {
      const authorId = localStorage.getItem('authorId');
      const storyId = localStorage.getItem('id');
      // console.log(authorId)
      const token = JSON.parse(localStorage.getItem('token'));
      try {
        const response = await fetch(`https://backend.aper.cc/story/get-episode/${storyId}`, {
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
        // console.log("array" + responseData.data)
        // Assuming the API response is an array of episodes
        setEpisodesData(responseData.data);
        // console.log(episodesData)

      } catch (error) {
        // console.error('Error fetching episodes data:', error.message);
      }
    };

    fetchData();
    // setEpisodesData([]);
  }, [storyId, episodeId]);

  useEffect(() => {

    const areEpisodesCreated = localStorage.getItem('areEpisodesCreated');
    if (areEpisodesCreated) {

      setEpisodeCount(parseInt(areEpisodesCreated, 10));
    }
  }, []);

  // const handleEpisodeClick = async (episodeIndex) => {
  //   // Check if the episodesData array is not empty
  //   if (episodesData.length > 0) {
  //     // Get the clicked episode from episodesData using the episodeIndex
  //     const clickedEpisode = episodesData[episodeIndex];

  //     // Check if the clickedEpisode is not null or undefined
  //     if (clickedEpisode) {

  //       const episodeId = clickedEpisode._id;
  //       // console.log(episodeId)

  //       // Set the episode ID in localStorage
  //       localStorage.setItem('episodeId', episodeId);

  //       // Navigate to the corresponding episode content page
  //       navigate(`/user/slide/story/storycontent/${episodeId}`);
  //     } else {
  //       console.error('Clicked episode is null or undefined.');
  //     }
  //   } else {
  //     console.error('Episodes data is empty.');
  //   }
  // };

  const handleEpisodeClick = async (episodeIndex, episodeDescription) => {

    if (episodesData.length > 0) {

      const clickedEpisode = episodesData[episodeIndex];


      if (clickedEpisode) {
        const episodeId = clickedEpisode._id;


        const isFirstClick = localStorage.getItem(`episodeClicked_${episodeId}`) !== 'true';


        localStorage.setItem(`episodeClicked_${episodeId}`, 'true');


        if (isFirstClick) {
          navigate(`/user/slide/story/storycontent/${episodeId}`);
        } else {

          const handleSaveData = () => {
            navigate(`/user/slide/story/storycontent/view/${episodeId}`, { state: { textValue: episodeDescription } });
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

  const handleMoreClick = () => {
    setTableVisible(!isTableVisible);
  };
  const handleMoreClick1 = (episodeId, episodeIndex) => {
    setSelectedEpisodeIndex(episodeIndex);
    setTableVisible1(!isTableVisible1)
    // togglDeleteEpisode2(episodeId, episodeIndex);
  };

  useEffect(() => {

    setTableVisible1(selectedEpisodeIndex !== null);
  }, [selectedEpisodeIndex]);



  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };
  const title1 = useSelector((state) => state.title);
  const routineType1 = useSelector((state) => state.routineType);
  const routineSelected = useSelector((state) => state.selectedRoutine);
  // console.log("routine is" + routineSelected)
  const genre1 = useSelector((state) => state.genre);
  const writingStyle1 = useSelector((state) => state.writingStyle);
  const [showComponent, setShowComponent] = useState(false);

  const [isToggleOn, setToggleOn] = useState(false);
  const [modal, setModal] = useState(false);
  const toggleModal = () => {
    setModal(!modal);
  };
  const [delete1, setDelete1] = useState(false);
  const togglDelete = () => {
    setDelete1(!delete1);
  };

  const [delete2, setDelete2] = useState(false);
  const togglDeleteEpisode2 = (episodeId, episodeIndex) => {
    console.log('More clicked for episode with index:', episodeIndex);
    localStorage.setItem('epin', episodeIndex);
    localStorage.setItem('epid', episodeId);
    setDelete2(!delete2);

  };

  const handleToggle = () => {
    setToggleOn(!isToggleOn);
  };


  const handleStory = () => {
    navigate('/user/slide/story/storycontent')
  }
  const [isAddIconClicked, setAddIconClicked] = useState(false);
  const location = useLocation();
  useEffect(() => {

    if (location.state && location.state.isAddIconClicked) {
      setAddIconClicked(true);
    }
  }, [location.state]);




  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [lineStyle, setLineStyle] = useState('');


  const handleEditTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleEditGenre = (e) => {
    setGenre(e.target.value);
  };

  const handleEditStyle = (e) => {
    setLineStyle(e.target.value);
  };
  const handleDelete = async () => {
    try {

      const Id = localStorage.getItem('id');

      const author1Id = localStorage.getItem('authorId');
      console.log("svadvasvda" + Id);


      const token = JSON.parse(localStorage.getItem("token"));
      const storyId = localStorage.getItem('id');
      if (!token) {
        // console.error('Token is missing.');
        return;
      }

      console.log('Deleting data with token:', token);

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
      console.log('Response Data:', responseData);

      localStorage.removeItem('authorId');
      localStorage.removeItem('id');
      // Data deleted successfully
      alert('Data deleted successfully');
      console.log('Data deleted successfully');


      setModal(false);
      navigate('/user/slide')
    } catch (error) {
      // console.error('Error deleting data:', error.message);
      console.log('Error deleting data:', error.message);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login')
  }


  const togglDeleteEpisodeOne = async (episodeIdnew, episodeIndex) => {
    //  const episodeIndex = localStorage.getItem('epin');
    //  const episodeIdnew = localStorage.getItem('epid');
    console.log(episodeIndex);
    // setDelete2(!delete2);
    try {
      const author1Id = localStorage.getItem('authorId');
      const token = JSON.parse(localStorage.getItem("token"));
      if (!token) {
        // console.error('Token is missing.');
        return;
      }
      console.log('Deleting data with token:', episodeIndex);

      const response = await fetch('https://backend.aper.cc/story/delete-episode', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ episodeId: episodeIdnew }),
      });

      if (!response.ok) {
        throw new Error(`Failed to delete data. Status: ${response.status}`);
      }

      const responseData = await response.json();
      // console.log('Response Data:', responseData);
      setEpisodeCount(episodeCount - 1);
      localStorage.setItem('areEpisodesCreated', episodeCount - 1);
      // setSelectedEpisodeIndex(null);
      setTableVisible1(false);
      setDelete2(!delete2)

      // setEpisodeCount((prevEpisodeCount) => prevEpisodeCount - 1);
      // Data deleted successfully
      // alert('Episode  deleted successfully' +episodeIdnew);
      console.log('Data deleted successfully');

      const updatedEpisodes = episodesData.filter((_, selectedEpisodeIndex) => selectedEpisodeIndex !== episodeIndex);
      setEpisodesData(updatedEpisodes);

      // Toggle the delete state
      // setDelete2(!delete2);


    } catch (error) {
      // console.error('Error deleting data:', error.message);
      console.log('Error deleting data:', error.message);
    }

  }

  const handleEditStory = async () => {
    try {
      dispatch(saveData({ title, genre, lineStyle }));
      const authorid = localStorage.getItem('authorId');
      const storyId = localStorage.getItem('id');
      console.log(storyId)
      const token = JSON.parse(localStorage.getItem("token"));
      // console.log(authorid);
      const apiUrl = `https://backend.aper.cc/story/updateStory/${storyId}`;

      const requestBody = {
        // routineType: 'ass', 
        coverTitle: title,
        genre,
        lineStyle,
        dateOfPublication: '04-1-2024', // replace with the actual dateOfPublication value
        // authorName: 'spoo' 
      };

      // console.log(requestBody);
      const response = await fetch(apiUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'accept': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`Failed to update story. Status: ${response.status}`);
      }


      console.log('Story updated successfully');
      localStorage.setItem('title', title);
      localStorage.setItem('genre', genre);
      localStorage.setItem('writingStyle', lineStyle);


      setDelete1(false);

    } catch (error) {

      // console.error('Error updating story:', error.message);
    }
  };

  useEffect(() => {
    // Function to format the date as "YYYY.MM.DD"
    const formatDate = (date) => {
      return `${date.getFullYear()}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date
        .getDate()
        .toString()
        .padStart(2, '0')}`;
    };

    // Get the current date
    const today = new Date();


    setCreationDate(formatDate(today));
  }, []);


  useEffect(() => {
    setShowComponent(true);
  }, []);
  const handleComponentClick = () => {

    setShowComponent(false);
    setTimeout(() => {
      navigate('/user/slide')
    }, 500);
  };




  const HandleProfileNavigate = () => {
    navigate('/user/slide/story/profile', { state: { episodeCount } })
  }
  const token = JSON.parse(localStorage.getItem("token"));

  const handleMainPage = () => {
    if (!token) {
      navigate('/login');
    } else {
      navigate('/user');
    }
  }

  const HandleNavigateToSearch = () => {
    navigate('/search')
  }



  const [currentPageUrl] = useState(window.location.href);
  const [isLinkCopied, setIsLinkCopied] = useState(false);
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

  return (
    <>
      <div>
        <Navbar1 />
        <div className='main-content-div'>
          <div className='content-div'>

            <div className='line2-r'>
              {/* <div className="custom-container">
        <div className="custom-item">
          <div className="custom-line"></div>
         
        </div>
        <div className="custom-text">{storedRoutineType}</div>
        <div className='main-contain'>
        <div className="toggle-container">
          <div className="form-check form-switch">
  <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault"/>
</div>
        </div>
        <div className='lab'>비공개</div>
        <img className='mre' src='/SVG/ic_more_horiz.svg'  onClick={handleMoreClick} />
        </div>
      </div> */}
              <div className='line-r  '>
                <div className="custom-line"></div>
                <div className='text textroutine'>{storedRoutineType}</div>

              </div>

              <div className='line11-r'>
                <div className="toggle-container">
                  <div className="form-check form-switch">
                    <input className="form-check-input" type="checkbox" role="switch" id="switchCheckDefault" />
                    <label className="form-check-label" for="switchCheckDefault">Default switch</label>
                  </div>

                </div>
                <p className='cont'>비공개</p>
                {/* <p className='line-c'>비공개</p> */}
                <img className='cont2' src='/SVG/ic_more_horiz.svg' onClick={handleMoreClick} />
                {/* <div  className='line2-r'>
     <div>hdghjegfyregktrgutrh</div>
    </div> */}

              </div>
            </div>
            <div className='cnt1'>
              <div className='flex-cnt'>
                <div className='Title'>
                  <div className="custom-text1">
                    {storedTitle}
                  </div>

                </div>
                <div className="author-container" style={{ position: 'relative' }}>
                  <div className="author-info">
                    <div className="author-image-container" onClick={HandleProfileNavigate}>
                      <div className="author-image">
                        <img src={data.backgroundImage
                          ? (data.backgroundImage.includes("/images")
                            ? `https://aper.cc/${data.backgroundImage}`
                            : `https://backend.aper.cc/${data.backgroundImage}`)
                          : 'defaultImageURL'} />

                      </div>
                    </div>
                    <div className="author-details">
                      <div className="author-name">{penUser}
                      </div>
                      <div className="separator"></div>
                      <div className="category">{storedGenre}</div>
                      <div className="separator"></div>
                      <div className="date"> {dop}</div>
                    </div>
                  </div>

                </div>
              </div>
              <div className='flex-cnt2'>
                {isTableVisible && (
                  <table className="more-table">
                    <tbody className="design-table">
                      <tr  >
                        <td className="font-table" onClick={togglDelete}>자유형 루틴</td>
                      </tr>
                      <tr  >
                        <td className="font-table "  >이야기 공유</td>
                      </tr>
                      <tr>
                        <td className="font-table" onClick={toggleModal}>삭제</td>
                      </tr>
                    </tbody>
                  </table>
                )}

              </div>
            </div>

          </div>
        </div>
        <div style={{ width: '100%', height: '1px', position: 'relative', background: 'rgba(0, 0, 0, 0.20)' }}></div>

        <div style={{ width: '100%', height: '1px', position: 'relative', background: 'rgba(0, 0, 0, 0.20)', marginTop: '2px' }}></div>

        <div className='main-content-div'>
          <div className='n-div'>

            {episodesData.map((episode, index) => (

              <>


                <div className="extra-div" key={index}>


                  <div className="nested-div">
                    <div className="episode" >

                      {/* <p>Episode {index + 1}</p> */}

                      <div className="replacement-ui"   >
                        <div className='line2-r' >

                          <div className='line-r'>
                            <div className='head' onClick={async () => await handleEpisodeClick(index)}>
                              {index + 1}화.
                            </div>
                            <b className='head2'>{episode.episodeTitle}</b>

                          </div>

                          <div className='line1-r'>
                            <div className="toggle-container">
                              <div className="form-check form-switch" style={{ display: 'flex', alignItems: 'center' }}>
                                <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" />
                              </div>
                            </div>
                            <p className='cont'>비공개</p>
                            <img className='cont2' src='/SVG/ic_more_horiz.svg' onClick={async () => await handleMoreClick1(episodesData[index]._id, index)} />
                          </div>
                        </div>

                        <div className='flex-table'>
                          <div>
                            <div className='label3'> {(() => {

                              const dateOfPublication = new Date(dop); // Replace with the actual date
                              let expirationDays = 30; // Default expiration days

                              {/* if (storedRoutineType === '자유') {
    expirationDays = 30;
  } else if (storedRoutineType === '단편') {
    expirationDays = 30;
  } else if (storedRoutineType === '장편') {
    expirationDays = 40;
  } else if (storedRoutineType === '시집') {
    // No expiration limit for '자유'
     expirationDays=7;
  } */}





                              // Add expiration days to the date of publication


                              if (storedRoutineType === '자유' || storedRoutineType === '단편') {
                                expirationDays = 30;
                              } else if (storedRoutineType === '장편') {
                                expirationDays = 40;
                              } else if (storedRoutineType === '시집') {
                                expirationDays = 7; // No expiration limit for '시집'
                              }
                              const expirationDate = new Date(dateOfPublication);
                              expirationDate.setDate(expirationDate.getDate() + expirationDays);

                              return (
                                <>
                                  D-{expirationDays} <b className='sublabel3'>({expirationDate.toLocaleDateString('ko-KR').replace(/\s/g, '').slice(0, -1)})</b>
                                </>
                              );
                            })()}</div>
                            <p className='episode-data'>
                              {expandedDescriptions[index]
                                ? episode.description.substring(0, 240)
                                : episode.description.substring(0, 120)}
                              <span className='mi' onClick={() => handleDescriptionClick(index)}>...</span>
                            </p>

                            {descriptionClicked === index && (
                              <div className='li'>
                                <img src='/SVG/ic_enter_arrow.svg' />
                                <p
                                  className='empty-description'
                                  onClick={async () => await handleEpisodeClick(index, episode.description)}
                                >
                                  글 읽기
                                </p>

                              </div>
                            )}
                            {episode.description ? (

                              <p className='episode-data'>{episode.description.substring(0, 0)}</p>
                            ) : (
                              <div className='li'>
                                <img src='/SVG/ic_enter_arrow.svg' />
                                <p className='empty-description' onClick={async () => await handleEpisodeClick(index, episode.description)}>글 쓰기</p>

                              </div>
                            )}
                            {delete2 && (
                              <>
                                <div className="overlay" id="overlay"></div>

                                <div className="popup" id="popup">
                                  <div className="popup-content">
                                    {/* <div><img
                      className="close-m3"
                      alt=""
                      src="/SVG/ic_close (1).svg"
                      onClick={() => setDelete2(!delete2)}
                    /></div> */}
                                    <div className="confirmation-message-container">
                                      <div className="confirmation-message">
                                        이야기를 정말 삭제하시겠어요?
                                      </div>
                                    </div>

                                    <button className='cancel'>
                                      <b className='text1' onClick={() => setDelete2(!delete2)}>
                                        취소</b>
                                    </button>
                                    <button className='delete' onClick={async () => await togglDeleteEpisodeOne(episodesData[selectedEpisodeIndex]._id, selectedEpisodeIndex)} >

                                      삭제
                                    </button>
                                  </div>
                                </div>
                              </>

                            )}
                          </div>
                          <div>


                          </div>
                        </div>
                      </div>
                      <div className='nn'>
                        {isTableVisible1 && selectedEpisodeIndex !== null && selectedEpisodeIndex === index && (
                          <div className="more-table1">
                          <table>
                            <tbody className="design-table1">
                              <tr  >
                                <td className="font-table1" onClick={async () => await
                                  handleEpisodeClick(index)} >글 쓰기</td>

                              </tr>
                              <tr  >
                                <td className="font-table1 " onClick={async () => await togglDeleteEpisode2(episodesData[index]._id, index)}>삭제</td>
                              </tr>

                            </tbody>
                            </table>
                          </div>
                        )}
                      </div>

                    </div>


                  </div>

                  {/* <div style={{ width: '100%', height: '1px', position: 'relative', background: 'rgba(0, 0, 0, 0.20)',marginTop:'2px' }}></div> */}

                </div>
              </>


            ))}
            {/* <div style={{ width: '100%', height: '1px', position: 'relative', background: 'rgba(0, 0, 0, 0.20)',marginTop:'2px' }}></div> */}
            <div className='block'>
              <div className="custom-title1">
                {`${episodeCount + 1} 회차 추가`}
              </div>
              <div className='custom-logo1'>
                <img src='/SVG/ic_add_s.svg' onClick={createEpisode} />
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* <div style={{ width: '100%', height: '1px', position: 'relative', background: 'rgba(0, 0, 0, 0.20)',marginTop:'2px' }}></div> */}

      {modal && (
        <>
          <div className="overlay" id="overlay"></div>

          <div className="popup" id="popup">
            <div className="popup-content">
              <div><img
                className="close-m1"
                alt=""
                src="/SVG/ic_close (1).svg"
                onClick={() => setModal(false)}
              /></div>
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
              {/* <div><img
                      className="close-m2 "
                      alt=""
                      src="/SVG/ic_close (1).svg"
                      onClick={() => setDelete1(!delete1)}
                    /></div> */}
              <div className="story-cover-title">이야기 커버 편집</div>
              <div className="story-title">이야기 제목</div>

              <input autoFocus type="text" className="story-content" placeholder="당신의 이름을 지어다가 며칠을 먹었다" onChange={handleEditTitle} />
              <div className="black-background1"></div>
              <div className='drops'>
                {/* <div className="custom-div">
            <p className='t1'>
            연애 소설
            <img  className='ic-ch' src='/SVG/ic_chevron_down_s.svg' />
            </p>
          
          
          </div> */}
                <select className="dropdown-g-1" onChange={handleEditGenre}>
                  <option hidden>Choose a Genere of writing</option>
                  <option value=" 자유 루틴"> 자유 루틴</option>
                  <option value="단편">단편</option>
                  <option value=" 장편"> 장편</option>
                  <option value="시집">시집</option>
                </select>
                {/* <div className="custom-div cdiv2">
          <p className='t2'>
            
          글줄 스타일 선택  
          </p>
          </div> */}
                <select className="dropdown-g-1  drop-2" onChange={handleEditStyle}>
                  <option hidden>Choose a style of writing</option>
                  <option value="문체부 바탕체">문체부 바탕체</option>
                  <option value="KoPub바탕체">KoPub바탕체</option>
                  <option value="Noto Serif KR">Noto Serif KR</option>
                  <option value="네이버 나눔명조">네이버 나눔명조</option>
                </select>
              </div>
              <button className='cancel1'>
                <b className='text1' onClick={() => setDelete1(!delete1)}>
                  취소</b>
              </button>
              <button className='delete1' onClick={handleEditStory}>
                삭제
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

              <input autoFocus type="text" className="story-content" onChange={handleEditTitle} />
              <div className="black-background"></div>
              <div className='drops'>
                {/* <div className="custom-div">
            <p className='t1'>
            연애 소설
            <img  className='ic-ch' src='/SVG/ic_chevron_down_s.svg' />
            </p>
          
          
          </div> */}
                <select className="dropdown-g" onChange={handleEditGenre}>
                  <option hidden>Choose a Genere of writing</option>
                  <option value=" 자유 루틴"> 자유 루틴</option>
                  <option value="단편">단편</option>
                  <option value=" 장편"> 장편</option>
                  <option value="시집">시집</option>
                </select>
                {/* <div className="custom-div cdiv2">
          <p className='t2'>
            
          글줄 스타일 선택  
          </p>
          </div> */}
                <select className="dropdown-g" onChange={handleEditStyle}>
                  <option hidden>Choose a style of writing</option>
                  <option value="문체부 바탕체">문체부 바탕체</option>
                  <option value="KoPub바탕체">KoPub바탕체</option>
                  <option value="Noto Serif KR">Noto Serif KR</option>
                  <option value="네이버 나눔명조">네이버 나눔명조</option>
                </select>
              </div>
              <button className='cancel1 '>
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

export default Story; 