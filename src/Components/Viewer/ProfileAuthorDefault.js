import React from 'react'
import '../StoryPreview/S1';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styles from "./new-gnb-m.module.css";
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useRef } from 'react';
import { updateEpisodeCount } from '../../redux/action';
import { setUserData, setSignupSuccess } from "../../redux/action";
import Popup2 from '../Modal/popup2';
import Popup1 from '../Modal/popup1';
import { useParams } from 'react-router-dom';
const ProfileAuthorDefault = () => {

  const token = JSON.parse(localStorage.getItem("token"));
  const [selectedDiv, setSelectedDiv] = useState(null);
  const dispatch = useDispatch();
  const data = useSelector((state) => state.userData);
  const location = useLocation();
  const { authorId } = useParams();
  const { storyId } = useParams();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };


  const handleNavigateAper = () => {
    localStorage.clear();
    navigate('/login')
  }

  const [newData, setNewData] = useState([]);
  const [authorData, setAuthorData] = useState([])
  const [img11, setImg] = useState()



  //Function to fetch user Details
  useEffect(() => {
    const fetchData = async () => {
      try {

        const token = JSON.parse(localStorage.getItem('token'));
        if (!token) {

          return;
        }

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
          return;
        }


        const userDetails = await userDetailsResult.json();


        setAuthorData(userDetails.data)
        setImg(userDetails.data.backgroundImage)

        dispatch(setUserData(userDetails.data));

        localStorage.setItem('penNameUser', userDetails.data.penName)
        localStorage.setItem('emailUser', userDetails.data.email)
        localStorage.setItem('checkId', userDetails.data._id)

      } catch (error) {
        // console.error('Error fetching user details:', error.message);
      }
    };


    fetchData();
  }, []);

  const checkId = localStorage.getItem('checkId')


  useEffect(() => {
    setSelectedDiv('home');
  }, []);


  const episodeCount1 = location.state?.episodeCount || 0;
  const [episodeCount, setEpisodeCount] = useState(episodeCount1)
  const [password, setPassword] = useState('')
  const [password1, setPassword1] = useState('')
  const penUser = localStorage.getItem('penNameUser')
  const emailUser = localStorage.getItem('emailUser')
  const imageSrc = localStorage.getItem('imageurl')
  const storedPenName = localStorage.getItem('pen');
  // const storedRoutineType = localStorage.getItem('routineType');
  const storedTitle = localStorage.getItem('title');
  const storedGenre = localStorage.getItem('genre');
  const storedWritingStyle = localStorage.getItem('writingStyle');
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isTableVisible, setTableVisible] = useState(false);
  const [creationDate, setCreationDate] = useState('');
  const storedRoutineType = localStorage.getItem('routineType');
  const [episodesData, setEpisodesData] = useState([]);
  const dop = localStorage.getItem('dateofpub');
  const [storyData, setStoryData] = useState([])
  const [confirmpassworderror, setConfirmPassworderror] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  // const storyId = localStorage.getItem('stid1');  
  const [passwordMatchError, setPasswordMatchError] = useState('');
  const [passmissmatch, setPassmissmatch] = useState('')
  const [existingPassword, setExistingPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword1, setConfirmPassword1] = useState('');
  const [selectedTab, setSelectedTab] = useState('home');
  const [pen, setPen] = useState('');
  const [email, setEmail] = useState('')

  const [selectedStoryIndex, setSelectedStoryIndex] = useState(null);
//Logout
  const handleLogout = () => {
    localStorage.clear();
    navigate('/login')
  }


  //Naviagte to author Profile
  const HandleProfileNavigate = () => {
    navigate(`/user/slide/story/profile/${authorData._id}`)
    // navigate(`/user/storyView/${storyId}`);
  }
  const desc1 = localStorage.getItem("first-desc");
  const [selectedEpisodeIndex, setSelectedEpisodeIndex] = useState(null);
  const [isTableVisiblenew, setTableVisiblenew] = useState(false)
  const handleMoreClick2 = (episodeId, episodeIndex) => {
    setSelectedEpisodeIndex(episodeIndex);
    setTableVisiblenew(!isTableVisiblenew);
  };
  useEffect(() => {
    // console.log("useEffect triggered. selectedStoryIndex:", selectedStoryIndex);
    setTableVisiblenew(selectedEpisodeIndex !== null);
  }, [selectedEpisodeIndex]);

  // const [storyVisibility, setStoryVisibility] = useState(Array(storyData.length).fill(false));
  useEffect(() => {
    // console.log("useEffect triggered. selectedStoryIndex:", selectedStoryIndex);
    setTableVisible(selectedStoryIndex !== null);
  }, [selectedStoryIndex]);


  const [reset, setReset] = useState(false);
  const toggleReset = () => {
    setReset(!reset)
  }
  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };


  const [selectedUI, setSelectedUI] = useState('home');

  const handleUISelection = (uiType) => {
    setSelectedUI(uiType);
    setSelectedDiv(uiType);
    setSelectedTab(uiType);
  };
  const [delete1, setDelete1] = useState(false);
  const togglDelete = () => {
    setDelete1(!delete1);
  };



  // Function to fetch story
  useEffect(() => {
    const fetchData = async () => {
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



        setStoryData(responseData.data);
        localStorage.setItem("author1image", responseData.data.backgroundImage);
        localStorage.setItem("authorname", responseData.data.authorName)
        localStorage.setItem('authoremail', responseData.data.email)

        // console.log(episodesData)

      } catch (error) {
        // console.error('Error fetching episodes data:', error.message);
      }
    };

    fetchData();

  }, []);



  const an = localStorage.getItem("authorname")
  const ae = localStorage.getItem('authoremail')
  const authorimage1 = localStorage.getItem("author1image")


  //Function to fetch episodes
  useEffect(() => {
    const fetchData = async () => {
      // console.log(authorId)
      const token = JSON.parse(localStorage.getItem('token'));
      try {
        const response = await fetch(`https://backend.aper.cc/story/get-episodebyAuthor/${authorId}`, {
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


        const filteredEpisodeData = responseData.data.filter(story => story.isPublished === true);

        setEpisodesData(filteredEpisodeData);

      } catch (error) {
        // console.error('Error fetching episodes data:', error.message);
      }
    };

    fetchData();
    // setEpisodesData([]);
  }, [authorId]);



  useEffect(() => {
    const fetchData = async () => {
      // const authorId = localStorage.getItem('authorId');
      // console.log(authorId)
      const token = JSON.parse(localStorage.getItem('token'));
      try {
        const response = await fetch(`https://backend.aper.cc/story/getStory/${authorId}`, {
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

        const filteredStoryData = responseData.data.filter(story => story.isPublished === true);
        setNewData(filteredStoryData);

        // setNewData(responseData.data);

      } catch (error) {
        // console.error('Error fetching episodes data:', error.message);
      }
    };

    fetchData();

  }, [authorId]);

  const [episodeprofile, setEpisodeProfile] = useState(false)




  const [storyprofile, setStoryProfile] = useState(false);


  const [isTableVisible3, setTableVisible3] = useState(false);


  const handleComponentClick = () => {

    // setShowComponent(false);
    setTimeout(() => {
      navigate('/user/slide')
    }, 500);
  };


  const handleMainPage = () => {
    navigate('/login')
  }
  const HandleNavigateToSearch = () => {
    navigate('/search')

  }
  const [isTableVisible4, setTableVisible4] = useState(false)

  const coverTitleCounts = {};
  episodesData.forEach(episode => {
    coverTitleCounts[episode.coverTitle] = (coverTitleCounts[episode.coverTitle] || 0) + 1;
  });



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



  const handleEpisodeClick = async (episodeIndex, epStoryId, episodeDescription, isPublished, epTitle) => {

    setSelectedEpisodeIndex(episodeIndex);
    if (episodesData.length > 0) {

      const clickedEpisode = episodesData[episodeIndex];


      if (clickedEpisode) {
        const episodeId = clickedEpisode._id;
        const handleSaveData = () => {
          navigate(`/user/slide/story/storycontent/view/profile/${episodeId}/${epStoryId}`, { state: { textValue: episodeDescription, storyId1: epStoryId, isPublished: isPublished, titleValue: epTitle } });
          // navigate(`/user/storyView/${epStoryId}`);
        };


        handleSaveData();
      } else {
        // console.error('Clicked episode is null or undefined.');
      }
    } else {
      // console.error('Episodes data is empty.');
    }
  };



  const handleAper = () => {
    window.location.href = 'https://team.aper.cc/';
  }
  const [isPopupVisible1, setPopupVisible1] = useState(false);
  const [isPopupVisible, setPopupVisible] = useState(false);
  const handleCancelClick1 = () => {
    setPopupVisible1(false);
  };
  const handleCancelClick = () => {
    setPopupVisible(false);
  };

  const handlePopupClick = () => {
    setPopupVisible(true);
  };

  const handlePopupClick1 = () => {
    setPopupVisible1(true);
  };

  const handleEpisodeClickStory = async (episodeIndex, epStoryId, episodeDescription, isPublished) => {

    setSelectedEpisodeIndex(episodeIndex);
    if (episodesData.length > 0) {

      const clickedEpisode = episodesData[episodeIndex];


      if (clickedEpisode) {
        const episodeId = clickedEpisode._id;
        const handleSaveData = () => {
          // navigate(`/user/slide/story/storycontent/view/${episodeId}`, { state: { textValue: episodeDescription ,storyId1:epStoryId, isPublished:isPublished} });
          navigate(`/user/storyView/${epStoryId}/${episodeIndex}`);
        };


        handleSaveData();
      } else {
        // console.error('Clicked episode is null or undefined.');
      }
    } else {
      // console.error('Episodes data is empty.');
    }
  };

  const targetRef = useRef(null);
  const [isNavbarFixed, setIsNavbarFixed] = useState(false);
// Fix the navbar . scrolling
  useEffect(() => {
    const handleScroll = () => {
      if (targetRef.current) {
        const { top } = targetRef.current.getBoundingClientRect();
        // Adjust this threshold as needed based on your layout
        const threshold = 0;
        setIsNavbarFixed(top <= threshold);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);



  // Mobile Responsive
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
    <div className='main-image-container'>
      <div className="image-container">
        <img
          className="profile-image"
          src={storyData.backgroundImage
            ? (storyData.backgroundImage.includes("/images")
              ? `https://aper.cc/${storyData.backgroundImage}`
              : `https://backend.aper.cc/${storyData.backgroundImage}`)
            : 'defaultImageURL'}
          alt="Background"
          style={{
            position: isNavbarFixed ? 'fixed' : 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: isNavbarFixed ? '60px' : '',
            zIndex: 1,
            objectFit: isNavbarFixed ? 'cover' : 'contain'
          }}
        />

        {!isMobile && (
          <header className={`navbar1 ${isNavbarFixed ? 'fixed-navbar1' : ''}`}>
            <div className="left-trail-search-1">
              <img
                className="logo-icon-search-1"
                loading="eager"
                alt=""
                src="/SVG/logo.svg"
                onClick={handleMainPage}
              />
            </div>
            {isNavbarFixed && (
              <div className="name-autorr">
                {storyData.authorName}의 필드
              </div>
            )}
            <div className="spacing-search" />

            <div
              className="search-in-gnb-search"
              // onClick={HandleNavigateToSearch}

              onClick={() => {
                if (!token) {
                  handleNavigateAper();
                } else {
                  HandleNavigateToSearch()
                }
              }}
            >
              <div className='search-in-gnb-search-inner'>
                <img
                  className="ic-search-icon-search-1"
                  loading="eager"
                  alt=""
                  src="/SVG/ic_search.svg"
                />
              </div>
            </div>
            <div className="search-in-gnb-search"
              //  onClick={handleComponentClick}
              onClick={() => {
                if (!token) {
                  handleNavigateAper();
                } else {
                  handleComponentClick()
                }
              }}
            >
              <div className='search-in-gnb-search-inner'>
                <img
                  className="ic-write-icon-search-1"
                  loading="eager"
                  alt=""
                  src="/SVG/ic_write.svg"
                />
              </div>
            </div>
            <div className="divider-search">
              <div className="v-divider-16-search">
                <div className="v-divider-161-search" />
              </div>
            </div>


            <div
              className="field-writer-search-1"
              // onClick={() => setTableVisible4(!isTableVisible4)}
              onClick={() => {
                if (!token) {
                  handleNavigateAper();
                } else {
                  setTableVisible4(!isTableVisible4)
                }
              }}
            // ref={tableRef}
            >
              <div className='name-search11'>
                <div className="name-search"

                  onClick={() => {
                    if (!token) {
                      handleNavigateAper();
                    } else {
                      setTableVisible4(!isTableVisible4)
                    }
                  }}
                >
                  {/* <div className="div1-search-1">{data.penName}</div> */}
                  {data.penName ? (
                    <div className="div1-search-1">{data.penName}</div>
                  ) : (
                    <div className="div1-search-1">Login</div>
                  )}
                </div>
                {img11 && (
                  <div className="field-list-imgfalsefalsethu-search">
                    {/* Render image if `im` exists */}
                    <img
                      className="image-profile-1 margin-image"
                      src={data.backgroundImage
                        ? (data.backgroundImage.includes("/images")
                          ? `https://aper.cc/${data.backgroundImage}`
                          : `https://backend.aper.cc/${data.backgroundImage}`)
                        : 'defaultImageURL'} />
                  </div>
                )}

                {!img11 && (
                  <div className="field-list-imgfalsefalsethu-search22">
                    {/* Render image if `im` exists */}
                    <img
                      className='ib'
                      // className="image-profile-1 margin-image"
                      alt="" src="/SVG/ic_user.svg"
                    />
                  </div>
                )}
              </div>

            </div>
          </header>
        )}
        {
          isMobile && (
            <header className={`${styles.newGnbM1} ${isNavbarFixed ? 'fixedGnbM1' : ''}`}>
              {/* <header className={styles.newGnbM1}> */}
              <div className={styles.leftTrail1}>
                <img className={styles.logoIcon} alt="" src="/logo.svg" />
                <img
                  className={styles.logoMinimalIcon}
                  loading="lazy"
                  alt=""
                  src="/SVG/logo_minimal.svg"
                  onClick={handleMainPage}
                />
              </div>
              <div className={styles.spacing} />
              <div className={styles.divider}>
                <div className={styles.vDivider16}>
                  <div className={styles.vDivider161} />
                </div>
              </div>
              {isNavbarFixed && (
                <div className="name-autorr-1">
                  {data.penName}의 필드
                </div>
              )}
              <div className={styles.rightTrail}>
                <b className={styles.login}>login</b>
                <img
                  className={styles.icChevronRightSIcon}
                  alt=""
                  src="/ic-chevron-right-s@2x.png"
                />
                <div className={styles.fieldListImgfalsefalsethu}>
                  <img
                    className={styles.picFieldprof01Icon}
                    alt=""
                    src="/pic-fieldprof-01@2x.png"
                  />
                </div>
              </div>
              <div className={styles.menu}>
                <img
                  className={styles.icHamburgerIcon1}
                  loading="lazy"
                  alt=""
                  src="/images/ic-hamburger@2x.png"
                  onClick={toggleMenu}
                />
                {menuOpen && (
                  <div className={styles.menuItems}>

                    <ul>
                      <li>
                        <div className="" onClick={() => {
                          if (!data.penName) {
                            handleNavigateAper();
                          } else {
                            handleComponentClick();
                          }
                        }}>
                          <div className='pen-100'>
                            <img
                              className="ic-write-icon-search"
                              loading="eager"
                              alt=""
                              src="/SVG/ic_write.svg"
                            />
                          </div>
                        </div>
                      </li>
                      <li style={{ display: 'flex', justifyContent: 'center' }}>
                        <div className="line-nav" style={{
                          width: '30px',
                          height: '2px',
                          backgroundColor: '#222222',



                        }}>

                        </div>
                      </li>
                      <li>
                        <div className="invert-icon-color"
                          // onClick={HandleNavigateToSearch}
                          onClick={() => {
                            if (!data.penName) {
                              handleNavigateAper();
                            } else {
                              HandleNavigateToSearch();
                            }
                          }}
                        >
                          <div className='search-100'>
                            <img
                              className="ic-search-icon-search"
                              loading="eager"
                              alt=""
                              src="/SVG/ic_search.svg"
                            />
                          </div>
                        </div>
                      </li>
                      <li style={{ display: 'flex', justifyContent: 'center' }}>
                        <div className="line-nav" style={{
                          width: '30px',
                          height: '2px',
                          backgroundColor: '#222222',



                        }}>

                        </div>
                      </li>
                      <li>
                        <div className="" onClick={() => {
                          if (!data.penName) {
                            handleNavigateAper();
                          } else {
                            setTableVisible3(!isTableVisible3);
                          }
                        }} >
                          <div className='name-search1'>
                            <div className="name-search" onClick={() => setTableVisible3(!isTableVisible3)}>
                              {data.penName ? (
                                <div className="div1-search">{data.penName}</div>
                              ) : (
                                <div className="div1-search" >Login</div>
                              )}
                            </div>
                            {img11 && (
                              <div className="field-list-imgfalsefalsethu-search">
                                {/* Render image if `im` exists */}
                                <img
                                  className="image-profile-1 margin-image"
                                  src={
                                    img11.includes("/images")
                                      ? `https://aper.cc/${img11}`
                                      : `https://backend.aper.cc/${img11}`
                                  }
                                  alt="User Background Image"
                                />
                              </div>
                            )}
                            {/* Render SVG if `im` doesn't exist */}
                            {!img11 && (
                              <div className="field-list-imgfalsefalsethu-search22">
                                {/* Render image if `im` exists */}
                                <img
                                  className='ib'
                                  // className="image-profile-1 margin-image"
                                  alt="" src="/SVG/ic_user.svg"
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                )}


                {isTableVisible3 && (

                  <div className="more-table-1"
                  >
                  <table>
                    <tbody className="design-table-2">

                      <tr>
                        <td className="font-table" onClick={HandleProfileNavigate}>
                          프로필
                        </td>
                      </tr>
                      <tr>
                        <td className="font-table" onClick={handleLogout}>
                          로그 아웃
                        </td>
                      </tr>
                    </tbody>
                    </table>
                  </div>

                )}
              </div>
            </header>
          )
        }
        <div>
          {isTableVisible4 && (
            <div className="table-container">
              <div className="more-table-profile">
              <table>
                <tbody className="design-table-profile">
                  <tr>
                    <td className="font-table" onClick={HandleProfileNavigate}>
                      프로필
                    </td>
                  </tr>
                  <tr>
                    <td className="font-table" onClick={handleLogout}>
                      로그 아웃
                    </td>
                  </tr>
                </tbody>
                </table>
              </div>
            </div>
          )}
        </div>



        <div className="centered-div">
          <div className="inner-div">
            <div className="first-subdiv">

              <p className='first-subdiv-content'>{storyData.authorName}</p>
            </div>
            <div className="second-subdiv">
              <div className="intro-text">{storyData.description}</div>
              <div className="overlay-div"></div>
              <div className='edit-content'>
                <div className='edit-button' onClick={copyCurrentPageLink}>
                  <div className="text-container">
                    필드 공유
                  </div>
                  <img src='/SVG/ic_share (1).svg' alt="Icon" style={{ width: '12px', height: '12px' }} />
                  {isLinkCopied && <span style={{ marginLeft: '20px', backgroundColor: 'black', color: 'white', width: '100%', height: '20px' }}>Link copied!</span>}
                </div>

              </div>

            </div>
          </div>
        </div>
      </div>
      <div className=''>
        <div className="additional-div-1 container4" ref={targetRef}>
          <div className='additional-div--'>
            <div className='additional-div-2-contents'>
              <div className="col-md-12">
                <div className="tab">
                  <p className={selectedTab === 'home' ? 'selected' : ''} onClick={() => handleUISelection('home')}>  홈  </p>
                  <p className={selectedTab === 'storyList' ? 'selected' : ''} onClick={() => handleUISelection('storyList')}>이야기 별 목록</p>
                  <p className={selectedTab === 'writerInfo' ? 'selected' : ''} onClick={() => handleUISelection('writerInfo')}>작가 정보</p>

                </div>
                <div className="bottom-line" style={{ height: '1px', width: '10000px', position: 'relative', background: 'rgba(0, 0, 0, 0.20)', marginLeft: '-1000px', marginTop: '-11px' }}></div>
                {/* <div style={{ backgroundColor: "#ffff", height: "3px" }} /> */}
              </div>



            </div>


          </div>
          {/* <div className="overlay-div-2"></div> */}
        </div>
      </div>


      {selectedUI === 'writerInfo' && (

        <div className="container4 author-div">
          <div className="fixed-size-div3">
            {/* <div className="child-div">
              <div className="child1">필명</div>
              <div className="child2 child-margin">{an}</div>
            </div>
            <div className="child-div main1">
              <div className="child1 child1-left">
                이메일 주소
              </div>
              <div className="child222 child22-left">
                {ae} </div>
            </div> */}
            <div style={{display:'flex', flexDirection:'row'}}>
      <p style={{marginLeft:'30px',fontWeight:'500', fontSize:'14px', lineHeight:'19px'}}> 필명</p>
      <p style={{marginLeft:'200px', fontWeight:'700', fontSize:'18px', lineHeight:'24px'}}>{an}</p>
    </div>
    <div style={{display:'flex', flexDirection:'row'}}>
      <p style={{marginLeft:'30px',fontWeight:'500', fontSize:'14px', lineHeight:'19px'}}> 이메일 주소</p>
      <p style={{marginLeft:'155px', fontWeight:'700', fontSize:'18px', lineHeight:'24px'}}>{ae}</p>
    </div>
            <div className="overlay-div-2"></div>
            <div className="child-div1 main1"></div>

          </div>
        </div>


      )}

      {selectedUI === 'home' && (

        <div className='main-content-div'>

          <div className='n-div1'>

            {episodesData.map((episode, index) => {
              const count = coverTitleCounts[episode.coverTitle]--;
              return (
                <div className="extra-div111" key={index}>


                  <div className="nested-div">
                    {/* <div className="bottom-line" style={{ height: '1px', width: '10000px', position: 'relative', background: 'rgba(0, 0, 0, 0.20)' ,marginLeft:'-1000px'}}></div> */}
                    <div className="episode"
                      //  onClick={async () => await handleEpisodeClick(index,episode.storyId, episode.description,episode.isPublished,episode.coverTitle)}

                      onClick={async () => {
                        if (!token) {
                          handleNavigateAper();
                        } else {
                          await handleEpisodeClick(index, episode.storyId, episode.description, episode.isPublished, episode.coverTitle)
                        }
                      }}
                    >



                      <div className="replacement-ui"   >
                        <div className='line-r space-r'>
                          {/* <div className="custom-line"></div> */}
                          <div className='text textroutine-1' >[{episode.coverTitle}]</div>

                        </div>
                        <div className='line2-r' >

                          <div className='line-r'>
                            <div className='head22' >
                              {count}화.
                            </div>
                            <b className='head22'>{episode.episodeTitle}</b>
                            {/* <b>{episode.dateOfPublication}</b> */}
                          </div>
                        </div>

                        {/* <div className='label label1'>  {episode.genre}<div className="separator1"></div><b className='sublabel3 lb'>{episode.createdAt.split("T")[0]}</b></div> */}
                        <p className='episode-data'>{episode.description.substring(0, 80)}...</p>
                        <div className="bin2" >
                          <img src='/SVG/ic_enter_arrow.svg' />
                          회차 목록 보기
                        </div>
                      </div>

                      <div className='nn1'>
                        {isTableVisiblenew && selectedEpisodeIndex !== null && selectedEpisodeIndex === index && (
                          <div className="more-table00">
                          <table>
                            <tbody className="tablestory">
                              <tr  >
                                <td className="font-table  tablestory"  >글 쓰기</td>
                              </tr>
                              <tr  >
                                <td className="font-table "   > 삭제</td>
                              </tr>

                            </tbody>
                            </table>
                          </div>
                        )}
                      </div>

                      {episodeprofile && (
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
                                <b className='text1' onClick={() => setEpisodeProfile(!episodeprofile)}>
                                  취소</b>
                              </button>
                              <button className='delete'  >
                                삭제
                              </button>
                            </div>
                          </div>

                        </>

                      )}

                    </div>

                  </div>
                </div>

              )
            }
            )}

          </div>
        </div>
      )}


      {selectedUI === 'storyList' && (

        <div className="container4 ">
          {newData.map((episode, index) => (
            <div key={index}>
              <div className='content-div11'

                // onClick={async () => await handleEpisodeClickStory(index,episode._id, episode.description,episode.isPublished)

                onClick={async () => {
                  if (!token) {
                    handleNavigateAper();
                  } else {
                    await handleEpisodeClickStory(index, episode._id, episode.description, episode.isPublished)
                  }
                }}
              >
                {/* <p>story {index + 1}</p> */}

                <div className='main-routine'>
                  <div className='line2-r'>
                    <div className='line-r'>
                      <div className="custom-line"></div>
                      <div className='text'>{episode.genre}</div>
                      {/* <div className='text2'>{episode.routineType}</div> */}
                    </div>


                  </div>

                </div>




                <div className='Title'    >
                  <div className="custom-text11">
                    {episode.coverTitle}
                  </div>

                </div>
                <div className="author-container1" style={{ position: 'relative' }}>
                  <div className="author-info">
                    {/* <div className="author-image-container">
        <div className="author-image">
            <img src={`https://backend.aper.cc/${data.backgroundImage}`} alt="Image"/>
        </div>
    </div> */}
                    <div className="author-details">
                      <div className="author-name text2 ">{episode.routineType}
                      </div>
                      <div className="separator"></div>
                      <div className="date-1">{episode.createdAt && episode.createdAt.split("T")[0]}</div>
                      <div className="separator"></div>
                      <div className="date"> {episode.creationDate}</div>
                    </div>
                    <div className="bin4" >
                      <img src='/SVG/ic_enter_arrow.svg' />
                      회차 목록 보기
                    </div>
                  </div>

                  {storyprofile && (
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
                            <b className='text1' onClick={() => setStoryProfile(!storyprofile)}>
                              취소</b>
                          </button>
                          <button className='delete' >
                            삭제
                          </button>
                        </div>
                      </div>
                    </>

                  )}
                </div>




              </div>
            </div>
          ))
          }
          {/* <div style={{ width: '100%', height: '1px', position: 'relative', background: 'rgba(0, 0, 0, 0.20)' }}></div> */}

        </div>

      )}



      <>


        <div className="footer-frame">

          {!isMobile && (
            <footer className="footer-mp">
              {/* <div className="logo2" /> */}
              <div className="personal-info-and-service-agre">
                <img
                  className="logo-icon1"
                  loading="eager"
                  alt=""
                  src="/SVG/logo.svg"
                />
                <img className="logo-icon2" alt="" />
                <div className="personal-info-and-service-agre-child" />
                <div className="rectangle1">
                  <div className="group">
                    <b className="b62"

                      //  onClick={handlePopupClick}

                      onClick={() => {
                        if (!token) {
                          handleNavigateAper();
                        } else {
                          handlePopupClick()
                        }
                      }}
                    >개인정보 처리방침</b>
                    {isPopupVisible && <Popup1 isPopupVisible={isPopupVisible} onCancelClick={handleCancelClick} />}
                    <div className="frame-child6" />
                  </div>
                  <div className="parent1">
                    <b className="b62"
                      // onClick={handlePopupClick1}
                      onClick={() => {
                        if (!token) {
                          handleNavigateAper();
                        } else {
                          handlePopupClick1()
                        }
                      }}
                    >서비스 이용약관</b>
                    {isPopupVisible1 && <Popup2 isPopupVisible1={isPopupVisible1} onCancelClick1={handleCancelClick1} />}
                    <div className="frame-child7" />
                  </div>
                  <div className="parent1">
                    <b className="b62" onClick={handleAper}>About</b>
                    {/* {isPopupVisible1  && <Popup2  isPopupVisible1={isPopupVisible1} onCancelClick1={handleCancelClick1}/>} */}
                    <div className="frame-child7" />
                  </div>
                </div>
              </div>
            </footer>
          )}

        </div>
      </>


    </div>
  )
}

export default ProfileAuthorDefault;
