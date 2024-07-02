import "./MainPage.css";
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Navbar1 from "../Navbar/Navbar";
import Popup1 from "../Modal/popup1";
import NewGnbM from "../Navbar/new-gnb-m";
import Popup2 from "../Modal/popup2";
import React from "react";
import Recomended from "./Recomended";
import Navbar2 from "../Navbar/Navbar2";
import Aos from "aos";
import 'aos/dist/aos.css'
import RecomendedMobile from "./RecomendedMobile";
import AuthorRecomendedMobile from "./AuthorRecomendedMobile";



const MainPage = () => {
  const refElement = useRef();

  //Function which  determines whether page is Scrolled
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);




  const stid1 = localStorage.getItem("stid1")
  const stid2 = localStorage.getItem("stid2")
  const first = localStorage.getItem("first-recomended");
  const first120Chars = first && first.substring(0, 150);
  const second = localStorage.getItem("second-recomended");
  const second120Chars = second && second.substring(0, 150);
  const third = localStorage.getItem("third-recomended");
  const third120Chars = third && third.substring(0, 147);

  //Popup in the footer
  const [isPopupVisible, setPopupVisible] = useState(false);
  const handlePopupClick = () => {
    setPopupVisible(true);
  };
  const [isPopupVisible1, setPopupVisible1] = useState(false);

  const handlePopupClick1 = () => {
    setPopupVisible1(true);
  };

  const [modal1, setModal1] = useState(false);
  const [isTableVisible, setTableVisible] = useState(false);

  const ScrollToTopButton = () => {
    const scrollToTop = () => {
      window.location.href = '#top';
    };
  }

  //Function to always select all filter
  const [selectedFilter, setSelectedFilter] = useState('전체');
  useEffect(() => {
    if (!selectedFilter) {
      setSelectedFilter('전체');
    }
  }, []);


  //Function to logout
  const handleLogout = () => {
    localStorage.clear();
    navigate('/login')
  }

  //Naviage to the aper site
  const handleAper = () => {
    window.location.href = 'https://team.aper.cc/';
  }


  //Function to navigate to the login page
  const handleNavigateAper = () => {
    navigate('/login')
  }



  //Function to handle the filters in the story
  const token = JSON.parse(localStorage.getItem("token"));
  const handleFilterClick = async (filter) => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      let apiUrl = "https://backend.aper.cc/story/fetchStories";
      if (filter !== '전체') {
        apiUrl += `?genre=${encodeURIComponent(filter)}`;
      }
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      const responseData = await response.json();
      // console.log(responseData.data);
      const filteredStoryData = responseData.data.filter(story => story.isPublished === true);
      const reversedStoryData = filteredStoryData.reverse();
      setStoryData(reversedStoryData)
      setSelectedFilter(filter);
    } catch (error) {
      // console.error("Error fetching stories:", error);
    }
  };



  //Function to fetch all the stories before filtering
  const handleAll = async () => {
    try {
      setSelectedFilter(selectedFilter === '전체' ? '' : '전체');
      const token = JSON.parse(localStorage.getItem("token"));
      let apiUrl = "https://backend.aper.cc/story/fetchStories";
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      const responseData = await response.json();
      const filteredStoryData = responseData.data.filter(story => story.isPublished === true);
      const reversedStoryData = filteredStoryData.reverse();
      setStoryData(reversedStoryData)
    } catch (error) {
      // console.error("Error fetching stories:", error);
    }

  }
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const [imageSrc, setImageSrc] = useState('');
  // const userDetails = location.state?.userDetails || {};
  const [isMobileMenuOpen, setMobileMenuOpen1] = useState(false);
  const [showComponent, setShowComponent] = useState(false);
  const [storyData, setStoryData] = useState([]);


  //Navigation to Recomended Stories
  const handleNavigateViewStory1 = async () => {
    const storyId = localStorage.getItem("stid1")
    const a = 0;
    navigate(`/user/storyView/${storyId}/${a}`);
  }
  const handleNavigateViewStory2 = async () => {
    const storyId = localStorage.getItem("stid2")
    const a = 0;
    navigate(`/user/storyView/${storyId}/${a}`);
  }
  const handleNavigateViewStory3 = async () => {
    const storyId = localStorage.getItem("stid3")
    const a = 0;
    navigate(`/user/storyView/${storyId}/${a}`);
  }


  //Function to Check the particular clicked story
  const handleStoryClick = async (index, clickedStory) => {
    if (storyData.length > 0) {
      if (clickedStory) {
        const storyId = clickedStory;
        const authorId = clickedStory.authorId;
        localStorage.setItem(`storyClicked_${storyId}`, 'true');
        localStorage.setItem(`storyClicked_${authorId}`, 'true');
        navigate(`/user/storyView/${storyId}/${index}`);
      }
    } else {
      // console.error('Story data is empty.');
    }
  };


  //Function to get the Background Image setto a particular User
  useEffect(() => {
    const fetchData = async () => {
      try {
        const email = localStorage.getItem('emailUser')
        const response = await fetch(`https://backend.aper.cc/user/getImage/${email}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch episodes data');
        }

        const responseData = await response.json();
        const backgroundImageUrl = await responseData?.data?.imagePath;
        setImageSrc(backgroundImageUrl);
        localStorage.setItem('imageurl', backgroundImageUrl)

      } catch (error) {
        // console.error('Error fetching episodes data:', error.message);
      }
    };
    fetchData();
  }, []);


  //Function to get user details
  useEffect(() => {
    const fetchTotalStories = async () => {
      try {
        const token = JSON.parse(localStorage.getItem("token"));
        const response = await fetch(
          "https://backend.aper.cc/story/fetchStories",
          {
            method: "GET",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          const responseData = await response.json();
          const filteredStoryData = responseData.data.filter(story => story.isPublished === true);
          const reversedStoryData = filteredStoryData.reverse();
          setStoryData(reversedStoryData)
          // console.log("Array" +storyData)
        } else {
          // console.error("Failed to fetch total stories");
        }
      } catch (error) {
        // console.error("Error fetching total stories:", error);
      }
    };

    fetchTotalStories();
  }, []);


  const handleMobileMenuToggle = () => {
    setMobileMenuOpen1(!isMobileMenuOpen);
  };
  useEffect(() => {
    setShowComponent(true);
  }, []);

  const handleComponentClick = () => {
    setShowComponent(false);
    setTimeout(() => {
      navigate('/user/slide')
    }, 500);
  };
  const f4 = localStorage.getItem("f4")

  useEffect(() => {
    const user = async () => {
      const token = JSON.parse(localStorage.getItem("token"));
      if (!token) {
        return;
      }
      const userDetailsResult = await fetch(
        // "http://localhost:3001/user/getUserDetails",
        "https://backend.aper.cc/user/getUserDetails",
        {
          method: "get",
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );
      const userDetails1 = await userDetailsResult.json();
      if (userDetails1 && userDetails1.data && userDetails1.data.penName) {
        localStorage.setItem('penNameUser', userDetails1.data.penName);
      } else {
        // console.error("Unable to set penNameUser in localStorage due to invalid user details.");
      }
      // localStorage.setItem('emailUser',userDetails1.data.email)
      if (userDetails1 && userDetails1.data && userDetails1.data.email) {
        localStorage.setItem('emailUser', userDetails1.data.email);
      } else {
        // console.error("Unable to set penNameUser in localStorage due to invalid user details.");
      }
      if (userDetails1 && userDetails1.data && userDetails1.data.backgroundImage) {
        localStorage.setItem('backgroundImageUser', userDetails1.data.backgroundImage);
      } else {
        // console.error("Unable to set penNameUser in localStorage due to invalid user details.");

      }
      if (userDetails1 && userDetails1.data && userDetails1.data._id) {
        localStorage.setItem('authorId', userDetails1.data._id);
      } else {
        // console.error("Unable to set penNameUser in localStorage due to invalid user details.");
      }
    }
    user()
  }, []);

  const penNamenew = localStorage.getItem('penNameUser');
  const emailnew = localStorage.getItem('emailUser');
  const backgroundImagenew = localStorage.getItem('backgroundImageUser');
  let backgroundnewImageUrl;
  if (backgroundImagenew && backgroundImagenew.includes("/images")) {
    backgroundnewImageUrl = `https://aper.cc/${backgroundImagenew}`
  }
  else {
    backgroundnewImageUrl = `https://backend.aper.cc/${backgroundImagenew}`
  }

  const handleToggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };


  const handleFocus = () => {
    refElement.current.focus();
    refElement.current.style.colour = 'blue'
  }

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 600) {
        closeMobileMenu();
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  //Navigate to View recomended story
  const HandleProfileNavigate = () => {
    const storyId = localStorage.getItem("stid1")
    let episodeTitle, episodeDescription;
    navigate(`/storyView/ViewMode/StoryViewMode/${storyId}`
      , {
        state: {
          episodeTitle,
          episodeDescription,
          storyId
        },
      })
  };


  const HandleProfileNavigate2 = () => {
    const storyId = localStorage.getItem("stid2")
    let episodeTitle, episodeDescription;
    navigate(`/storyView/ViewMode/StoryViewMode/${storyId}`
      , {
        state: {
          episodeTitle,
          episodeDescription,
          storyId

        },
      })

  };
  const HandleProfileNavigate3 = () => {
    const storyId = localStorage.getItem("stid3")
    let episodeTitle, episodeDescription;
    navigate(`/storyView/ViewMode/StoryViewMode/${storyId}`
      , {
        state: {
          episodeTitle,
          episodeDescription,
          storyId

        },
      })
  };


  const HandleProfileNavigate11 = () => {
    navigate('/user/slide/story/profile')
  }
  const navigate = useNavigate()
  const handleNavigateViewStory = () => {
    navigate('/storyView')
  }

  const HandleNavigateToSearch = () => {
    navigate('/search')
  }


  const handleMainPage = () => {
    if (!token) {
      navigate('/login');
    } else {
      navigate('/user');
    }
  }


  //Handle Popup
  const handleCancelClick = () => {
    setPopupVisible(false);
  };
  const handleCancelClick1 = () => {
    setPopupVisible1(false);
  };

  const [isHovered, setIsHovered] = useState(true);
  // const refElement = React.createRef();

  const handleHover = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };


  const handleNavigatetoProfileAuthor = () => {
    navigate("/user/slide/story/profile/Author")
  }


  //Function which navigates to authors Profile
  const handleNavigatetoProfileAuthordefault = (authorId1, stid11) => {
    navigate(`/user/slide/story/profile/Authordefault/${authorId1}/${stid11}`, {
    });
  }



  // add fade-up effect onthe page
  useEffect(() => {
    Aos.init({ duration: 2000 })
  }, [])


  const handleNavigatetoProfileAuthor2 = () => {
    navigate("/user/slide/story/profile/Author2")
  }
  const handleNavigatetoProfileAuthor3 = () => {
    navigate("/user/slide/story/profile/Author3")
  }
  const handleNavigatetoProfileAuthor4 = () => {
    navigate("/user/slide/story/profile/Author4")
  }
  const handleNavigatetoProfileAuthor5 = () => {
    navigate("/user/slide/story/profile/Author5")
  }
  const handleNavigatetoProfileAuthor6 = () => {
    navigate("/user/slide/story/profile/Author6")
  }

  const firstTitle = localStorage.getItem("first-title")
  const a1 = localStorage.getItem("first-auth");
  const routine1 = localStorage.getItem("first-routineType")
  const date1 = localStorage.getItem("first-date")



  //second Recomended
  const a2 = localStorage.getItem("second-auth")
  const date2 = localStorage.getItem("second-date")
  const routine2 = localStorage.getItem("second-routineType")
  const secondTitlle = localStorage.getItem("second-coverTitle")



  //Third Recomended
  const a3 = localStorage.getItem("third-auth")
  const thirdTitle = localStorage.getItem("third-title")
  const date3 = localStorage.getItem("third-date")
  const routine3 = localStorage.getItem("third-routine")



  const [hoveredEpisodeIndex, setHoveredEpisodeIndex] = useState(null);

  const handleEpisodeClick = (index) => {
    setHoveredEpisodeIndex(index);
  };

  const [showAltNavbar, setShowAltNavbar] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const recommendedComponentOffset = document.getElementById('recommended').offsetTop;
      const title5ComponentOffset = document.getElementById('title5').offsetTop;

      if (scrollTop >= recommendedComponentOffset && scrollTop < title5ComponentOffset) {
        setShowAltNavbar(true);
      } else {
        setShowAltNavbar(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
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




  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Function to check if the section is reached
    const checkSectionReached = () => {
      const section = document.getElementById('title5');
      if (section) {
        const sectionPosition = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (sectionPosition < windowHeight) {
          setShowContent(true);
        } else {
          setShowContent(false);
        }
      }
    };
    const handleScroll = () => {
      if (!isMobile) {
        checkSectionReached();
      }
    };
    window.addEventListener('scroll', handleScroll);
    if (!isMobile) {
      checkSectionReached();
    }
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile]);


  return (
    <>
      {/* {showAltNavbar ? <Navbar2 /> : <Navbar1 />}  
     <NewGnbM/> */}
      {isMobile ? <NewGnbM /> : (showAltNavbar ? <Navbar2 /> : <Navbar1 />)}



      <div className="divider-container" id="top">
        <div className="logo-area">
          <b className="a-p-e">A P E R</b>
          <img className="a-p-e-r" alt="" />
        </div>
        <div className="logo-area1" />
        <div className="divider-container-child" />
        <div className="div">
          <img className="icon" alt="" />
          <div className="div1">서재</div>
          <div className="wrapper">
            <b className="b">모든 멋진 일에는 두려움이 따른다</b>
          </div>
        </div>
        <div className="div2">
          <img className="icon1" alt="" />
          <div className="div3">서재</div>
          <div className="container">
            <div className="div4">산문</div>
          </div>
        </div>
        <div className="div5">
          <img className="icon2" alt="" />
          <div className="div6">연제완료</div>
          <div className="div7">2022.06.30</div>
          <div className="div8">~</div>
          <div className="div9">2023.06.30</div>
        </div>
        <div className="title">
          <div className="logo-area-parent">
            <div className="logo-area2">
              <b className="a-p-e1">A P E R</b>
              <img className="a-p-e-r1" alt="" />
            </div>
            <div className="logo-area3" />
            <img className="logo-minimal-icon" alt="" />
          </div>
          <div className="frame">
            <b className="b1">02</b>
          </div>
        </div>
        <div className="div10">
          <img className="icon3" alt="" />
          <div className="div11">서재</div>
          <div className="frame-div">
            <b className="b2">모든 멋진 일에는 두려움이 따른다</b>
          </div>
        </div>
        <div className="div12">
          <img className="icon4" alt="" />
          <div className="div13">서재</div>
          <div className="wrapper1">
            <div className="div14">산문</div>
          </div>
        </div>
        <div className="div15">
          <img className="icon5" alt="" />
          <div className="div16">연제완료</div>
          <div className="div17">2022.06.30</div>
          <div className="div18">~</div>
          <div className="div19">2023.06.30</div>
        </div>
        <div className="title1">
          <div className="logo-area-group">
            <div className="logo-area4">
              <b className="a-p-e2">A P E R</b>
              <img className="a-p-e-r2" alt="" />
            </div>
            <div className="logo-area5" />
            <img className="logo-minimal-icon1" alt="" />
          </div>
          <div className="wrapper2">
            <b className="b3">03</b>
          </div>
        </div>
        <div className="h-divider-60-parent">
          <div className="h-divider-60">
            <div className="divider-black" />
          </div>
          <div className="h-divider-601">
            <div className="divider-black1" />
          </div>
        </div>
        <div className="label-button">
          <img className="ic-write-icon" alt="" />
          <div className="text">
            <div className="div20">더보기</div>
          </div>
          <img className="nowrite-icon" alt="" />
        </div>
        <main className="main-content-frame">
          <div className="iii">
            <img
              className="ttt"
              loading="eager"
              alt=""
              src="/SVG/logo_minimal.svg"
            />
            <div className="yy">
              <b >추천하는 이야기</b>
            </div>
          </div>
          {!isMobile && (<>
            <section className="container11"  >
              <div
                className={`card11 h111 ${isHovered ? 'default-hover' : ''}`}
                id="card1"
                onMouseEnter={handleHover}
                onMouseLeave={handleMouseLeave}
              >
                <div className="styleh1">
                  <div
                    ref={refElement}
                    className={`m1-details ${isHovered ? 'def' : ''}`}
                  >
                    {first120Chars}
                 {/* <div className="vertical-lin" style={{ width: '5px', height: '20px', backgroundColor: 'black', marginTop:'40px' }}></div> */}
                
                  </div>
                 
                  <div className="f-details">

                    <p className="p-left   mainmen"
                      // onClick={handleNavigateViewStory1}
                      onClick={() => {
                        if (!token) {
                          handleNavigateAper();
                        } else {
                          handleNavigateViewStory1();
                        }
                      }}


                    >  <img src="/SVG/ic_enter_arrow.svg" /> 글 바로 가기</p>


                  </div>
                  {/* <div className="rt"><p className="p-left">helloooooooooooooooooo</p></div> */}


                </div>
               
                <div className="styleh1 sth1">

                  <div className="f-details">
                    <div className="">
                      <span className="bck"
                        // onClick={HandleProfileNavigate}
                        onClick={() => {
                          if (!token) {
                            handleNavigateAper();
                          } else {
                            HandleProfileNavigate();
                          }
                        }}
                      >  {firstTitle}</span>
                      
                      <b className="thecontent" style={{ marginRight: '10px' }}>{a1}</b>
                      <b className="theroutine" style={{ marginRight: '10px' }}>{routine1}</b>
                      {/* <b className="thedate" style={{ marginRight: '10px' }}>{date1}~{date1}</b> */}
                      <b className="thedate" style={{ marginRight: '10px' }}>{date1} ~ {date1}</b>

                    </div>
                  </div>
                </div>
              </div>
              <div className="vertical"></div>
              <div className='card11 h111' id='card1'>
                <div className="styleh1">
                  <div className="m1-details">{second120Chars}
                  
                  </div>
                  {/* <div className="vertical-line" style={{ width: '5px', height: '20px', backgroundColor: 'black', marginTop:'40px' }}></div> */}
                  
                  <div className="f-details"><p className="p-left  mainmen"
                    // onClick={handleNavigateViewStory2}
                    onClick={() => {
                      if (!token) {
                        handleNavigateAper();
                      } else {
                        handleNavigateViewStory2()
                      }
                    }}
                  >  <img src="/SVG/ic_enter_arrow.svg" />글 바로 가기</p>
                  </div>
                  {/* <div className="rt"><p className="p-left">helloooooooooooooooooo</p></div> */}

                </div>
                <div className="styleh1 sth1">
                  <div className="f-details">
                    <div className="">
                      <span className="bck"
                        // onClick={HandleProfileNavigate2}
                        onClick={() => {
                          if (!token) {
                            handleNavigateAper();
                          } else {
                            HandleProfileNavigate2()
                          }
                        }}
                      >  {secondTitlle}</span>
                      <b className="thecontent" style={{ marginRight: '10px' }}>{a2}</b>
                      <b className="theroutine" style={{ marginRight: '10px' }}>{routine2}</b>
                      <b className="thedate" style={{ marginRight: '10px' }}>{date2} ~ {date2}</b>
                    </div>
                  </div>
                </div>
                <div className="vertical-1"></div>

              </div>

              <div className="vertical"></div>
              <div className='card11 h111' id='card1'>
                <div className="styleh1">
                  <div className="m1-details">{third120Chars}</div>
                  <div className="f-details"><p className="p-left   mainmen"
                    //  onClick={handleNavigateViewStory3}
                    onClick={() => {
                      if (!token) {
                        handleNavigateAper();
                      } else {
                        handleNavigateViewStory3()
                      }
                    }}
                  >  <img src="/SVG/ic_enter_arrow.svg" /> 글 바로 가기</p>


                  </div>
                </div>
                <div className="styleh1  sth1">


                  <div className="f-details">
                    <div className="">
                      <span className="bck"
                        //  onClick={HandleProfileNavigate3}
                        onClick={() => {
                          if (!token) {
                            handleNavigateAper();
                          } else {
                            HandleProfileNavigate3()
                          }
                        }}
                      >  {thirdTitle}</span>
                      <b className="thecontent" style={{ marginRight: '10px' }}>{a3}</b>
                      <b className="theroutine" style={{ marginRight: '10px' }}>{routine3}</b>
                      <b className="thedate" style={{ marginRight: '10px' }}>{date3} ~ {date3}</b>
                    </div>
                  </div>
                </div>
                <div className="vertical-1"></div>
              </div>
              <div className="list-frame1">
                <div className="list-frame-item" />
              </div>


            </section>
          </>)}
          {isMobile && <RecomendedMobile />}
          {isMobile && <AuthorRecomendedMobile id="recommended" />}
          {!isMobile && <Recomended id="recommended" />}
          {!isMobile && showContent && (
            <div className="floating-arrow" onClick={() => { window.scrollTo({ top: 0, left: 0, behavior: 'smooth' }); }}>
              <img className="top-icon" loading="eager" alt="" src="/SVG/top.svg" />
            </div>
          )}
          <section className="title5" id="title5" data-aos="fade-up">
            <div className="instance-story-meta-info">
              <div className="logo-area8">
                <b className="a-p-e4">A P E R</b>
                <img className="a-p-e-r4" alt="" />
              </div>
              <div className="logo-area9" />
              <img
                className="logo-minimal-icon4"
                loading="eager"
                alt=""
                src="/SVG/logo_minimal.svg"
              />
            </div>
            <div className="text-other-meta-labels">
              <h1 className="h14">새로운 이야기</h1>
              <div className="label-button4">
                <div className="spacing-222" />
                <img className="nowrite-icon3" alt="" />
                <div className="spacing-410" />
                <b className="b11">이야기 더보기</b>
                <div className="spacing-411" />
                <img className="noright-arrow-icon5" alt="" />
                <div className="spacing-223" />
              </div>
            </div>
            <div className="filters">
              <button className={`filter-chip111 ${selectedFilter === '전체' ? 'selected' : ''}`} onClick={handleAll} >
                <div className="">
                  <b className="">전체</b>
                </div>
                <img className="ic-check-icon" alt="" src="/SVG/ic_check_s.svg" />
              </button>
              <button className={`filter-chip111 ${selectedFilter === '일상' ? 'selected' : ''}`} onClick={() => handleFilterClick('일상')}>
                <div className="">
                  <b className="">일상</b>
                </div>
                <img className="ic-check-icon" alt="" src="/SVG/ic_check_s.svg" />
              </button>
              <button className={`filter-chip111 ${selectedFilter === '로맨스' ? 'selected' : ''}`} onClick={() => handleFilterClick('로맨스')}>
                <div className="">
                  <b className="">로맨스</b>
                </div>
                <img className="ic-check-icon" alt="" src="/SVG/ic_check_s.svg" />
              </button>
              <button className={`filter-chip111 ${selectedFilter === 'SF' ? 'selected' : ''}`} onClick={() => handleFilterClick('SF')}>
                <div className="">
                  <b className="">SF</b>
                </div>
                <img className="ic-check-icon" alt="" src="/SVG/ic_check_s.svg" />
              </button>
              <button className={`filter-chip111 ${selectedFilter === '공포' ? 'selected' : ''}`} onClick={() => handleFilterClick('공포')}>
                <div className="">
                  <b className="">공포</b>
                </div>
                <img className="ic-check-icon" alt="" src="/SVG/ic_check_s.svg" />
              </button>
              <button className={`filter-chip111 ${selectedFilter === '퀴어' ? 'selected' : ''}`} onClick={() => handleFilterClick('퀴어')}>
                <div className="">
                  <b className="">퀴어</b>
                </div>
                <img className="ic-check-icon" alt="" src="/SVG/ic_check_s.svg" />
              </button>
              <button className={`filter-chip111 ${selectedFilter === '사회' ? 'selected' : ''}`} onClick={() => handleFilterClick('사회')}>
                <div className="">
                  <b className="">사회</b>
                </div>
                <img className="ic-check-icon" alt="" src="/SVG/ic_check_s.svg" />
              </button>
              <button className={`filter-chip111 ${selectedFilter === '예술' ? 'selected' : ''}`} onClick={() => handleFilterClick('예술')}>
                <div className="">
                  <b className="">예술</b>
                </div>
                <img className="ic-check-icon" alt="" src="/SVG/ic_check_s.svg" />
              </button>
              <button className={`filter-chip111 ${selectedFilter === '비평' ? 'selected' : ''}`} onClick={() => handleFilterClick('비평')}>
                <div className="">
                  <b className="">비평</b>
                </div>
                <img className="ic-check-icon" alt="" src="/SVG/ic_check_s.svg" />
              </button>
              <button className={`filter-chip111 ${selectedFilter === '시' ? 'selected' : ''}`} onClick={() => handleFilterClick('시')}>
                <div className="">
                  <b className="">시</b>
                </div>
                <img className="ic-check-icon" alt="" src="/SVG/ic_check_s.svg" />
              </button>
            </div>
          </section>
          <section className="frame-container-parent" data-aos="fade-up">
            <div className="frame-container">
              <div className="h-divider-16">
                <div className="h-divider-20" />
              </div>
            </div>
            <div className="frame-container1" data-aos="fade-up">
              <div className="h-divider-161">
                <div className="h-divider-201" />
              </div>
              <div className="story-list-in-main-search" data-aos="fade-up">
                {Array.isArray(storyData) ? (
                  storyData.map((story, index) => (
                    <React.Fragment key={index}>
                      {story.episodes && story.episodes.map((episode, episodeIndex) => (
                        // Render the episode only if it's published
                        episode.isPublished && (
                          <React.Fragment key={episode._id}>
                            <div className="list-main">
                              <div className="captions">
                                <div className="title-wrap">
                                  <div className="title6" onClick={async () => {
                                    if (!token) {
                                      handleNavigateAper();
                                    } else {
                                      await handleStoryClick(episodeIndex, episode.storyId, episode._id);
                                    }
                                  }}>
                                    <b className="b22">
                                      <p className="p2">{episode.coverTitle}</p>
                                    </b>
                                  </div>
                                </div>
                                <div className="routine">
                                  <div className="aper" />
                                  <b className="b23">자유형 루틴</b>
                                </div>
                                <div className="captions1">
                                  {/* Writer information */}
                                  <div className="writer">
                                    <b className="b24">{story.authorName}</b>
                                  </div>
                                  <div className="genre-date-for-story">
                                    {/* Genre and date information */}
                                    <div className="field-thumb">
                                      <div className="field-list-imgfalsefalsethu2">
                                        <img className="pic-fieldprof-08-icon1" alt="" />
                                      </div>
                                      <b className="b25">{story.authorName}</b>
                                    </div>
                                    <div className="div31">{episode.genre}</div>
                                    <div className="genre-date-for-story-child" />
                                    <div className="duie-date">
                                      <div className="fear-of-driving">2022.03.30 마감</div>
                                      <b className="fear-of-driving1">D-30</b>
                                    </div>
                                    <div className="date">
                                      <div className="div32">2022.06.30</div>
                                      <div className="div33">~</div>
                                      <div className="div34">2023.06.30</div>
                                    </div>
                                  </div>
                                  <div className="field-thumb1">
                                    <div className="field-list-imgfalsefalsethu3">
                                      <img className="pic-fieldprof-08-icon2" alt="" />
                                    </div>
                                    <b className="b26">{story.authorName}</b>
                                  </div>
                                </div>
                                <div className="captions2">
                                  {/* Additional information */}
                                  <div className="writer1">
                                    <b className="b27">{story.authorName}</b>
                                  </div>
                                  <div className="genre-date-for-story1">
                                    {/* Genre and date information */}
                                    <div className="field-thumb2"
                                      onClick={() => {
                                        if (!token) {
                                          handleNavigateAper();
                                        } else {
                                          handleNavigatetoProfileAuthordefault(story.authorId, story._id)
                                        }
                                      }}
                                    >
                                      <div className="field-list-imgfalsefalsethu4">
                                        <img
                                          className="image-profile"
                                          src={story.backgroundImage ? (story.backgroundImage.includes("/images") ? `https://aper.cc/${story.backgroundImage}` : `https://backend.aper.cc/${story.backgroundImage}`) : 'defaultImageURL'}
                                          alt=""
                                        />
                                      </div>
                                      <b>{story.authorName}</b>
                                    </div>
                                    <div className="genre-date-for-story-inner">
                                      <div className="frame-child" />
                                    </div>
                                    <div className="wrapper3">
                                      <div className="div35">{episode.genre}</div>
                                    </div>
                                    <div className="genre-date-for-story-inner1">
                                      <div className="frame-item" />
                                    </div>
                                    <div className="date1">
                                      <div className="div36">{new Date(episode.createdAt).toISOString().split('T')[0].replace(/-/g, '.')}</div>
                                      <div className="div37">~</div>
                                      <div className="div38">2023.06.30</div>
                                    </div>
                                    <div className="duie-date1">
                                      <div className="fear-of-driving2">2022.03.30 마감</div>
                                      <b className="fear-of-driving3">D-30</b>
                                    </div>
                                  </div>
                                  <div className="field-thumb3">
                                    <div className="field-list-imgfalsefalsethu5">
                                      <img className="pic-fieldprof-08-icon4" alt="" />
                                    </div>
                                    <b className="b29">{episode.routineType}</b>
                                  </div>
                                </div>
                              </div>
                              <div className="body-wrap" onMouseEnter={() => handleEpisodeClick(index)}>
                                <div className="body">
                                  <div className="div39">
                                    <p className="p6" style={{ fontFamily: `${story.lineStyle}, sans-serif` }}>
                                      {episode.description}
                                      <span className='mainmen2'>글 읽기</span>
                                    </p>
                                  </div>
                                </div>
                              </div>
                              {!isMobile && (<>
                                {hoveredEpisodeIndex === index && (
                                  <div>
                                    <p className="mainmen2"
                                      //  onClick={async () => await handleStoryClick(index)}
                                      onClick={async () => {
                                        if (!token) {
                                          handleNavigateAper();
                                        } else {
                                          await handleStoryClick(episodeIndex, episode.storyId)
                                        }
                                      }}
                                    ><img src="/SVG/ic_enter_arrow.svg" />글 읽기</p>
                                  </div>
                                )}
                              </>)}
                              {(
                                <div className="hhh">
                                  <p className="mainmen2"
                                    //  onClick={async () => await handleStoryClick(index)}
                                    onClick={async () => {
                                      if (!token) {
                                        handleNavigateAper();
                                      } else {
                                        await handleStoryClick(episodeIndex, episode.storyId)
                                      }
                                    }}
                                  ><img src="/SVG/ic_enter_arrow.svg" />글 읽기</p>

                                </div>
                              )}
                            </div>
                            <div className="h-divider-161">
                              <div className="h-divider-201" />
                            </div>
                          </React.Fragment>
                        )
                      )).reverse()}
                    </React.Fragment>
                  ))
                ) : (
                  <p>No stories found</p>
                )}
              </div>
            </div>
          </section>
        </main>
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
        {
          isMobile && (
            <>
              <div className="footer-mobile">
                <div className="footer-logo-mobile">
                  <div>
                    <img
                      className="logo-icon1"
                      loading="eager"
                      alt=""
                      src="/SVG/logo.svg"
                    />
                  </div>
                  <div className="top-icon-mobile icon-mobile">
                    <img className="top-icon" loading="eager" alt="" src="/SVG/top.svg" onClick={() => {
                      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                    }} />

                  </div>
                </div>
                <div className="second-footer-row">
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
                  <div>
                  </div>
                  <div>
                  </div>
                </div>
              </div>
            </>
          )
        }
      </div>
    </>
  );
};

export default MainPage;
