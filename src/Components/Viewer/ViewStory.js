import React from 'react';
import "./ViewStory.css";
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import Navbar1 from "../Navbar/Navbar";
import { useRef } from "react";
import NewGnbM from '../Navbar/new-gnb-m';


const ViewStory = () => {



  const imageSrc = localStorage.getItem('imageurl')
  const [isMobile, setIsMobile] = useState(false);
  


  const [episodesData, setEpisodesData] = useState([]);
  const [storyData, setStoryData] = useState([]);

  //Mobile Responsive
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



  // Scroll to top of the page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);



  const handleComponentClick = () => {
    navigate('/user/ViewStory/slide')
  };

  const handleMainPage = () => {
    if (!token) {
      navigate('/login');
    } else {
      navigate('/user');
    }
  }



  const { storyId } = useParams();
  const { index } = useParams();
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(index);
  const [nextIndex, setNextIndex] = useState(index + 1);
  const [prevIndex, setPrevIndex] = useState(index - 1)
  //Navigate to the Next Episode
  const handleNextEpisode = () => {
    const nextIndex = Number(currentEpisodeIndex) + 1;
    setCurrentEpisodeIndex(nextIndex);
  }

  //Navigate to the previous episode
  const handlePrevEpisode = () => {
    const prevIndex = Number(currentEpisodeIndex) - 1;
    setCurrentEpisodeIndex(prevIndex);
  };





  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}.${month}.${day}`;
  };


  //fetch all episode data
  useEffect(() => {
    const fetchData = async () => {
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
        const filteredEpisodeData = responseData.data.filter(episode => episode.isPublished === true);

        setEpisodesData(filteredEpisodeData);
      } catch (error) {
        // console.error('Error fetching episodes data:', error.message);
      }
    };

    fetchData();
    // setEpisodesData([]);
  }, [storyId]);



  //Fetch all story data
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
        //  console.log(responseData)
        // console.log("array" + responseData.data)

        setStoryData(responseData.data);
        // console.log(episodesData)

      } catch (error) {
        // console.error('Error fetching episodes data:', error.message);
      }
    };

    fetchData();

  }, [storyId]);

  //Navigaet to particular author profile
  const navigate = useNavigate();
  const HandleProfileNavigate = () => {
    let episodeTitle, episodeDescription;
    if (storyData && storyData.episodes && currentEpisodeIndex >= 0 && currentEpisodeIndex < storyData.episodes.length) {
      episodeTitle = storyData.episodes[currentEpisodeIndex].episodeTitle;
      episodeDescription = storyData.episodes[currentEpisodeIndex].description;
    } else {
      episodeTitle = "Episode Title Not Available";
      episodeDescription = "Episode Description Not Available";
    }
    navigate(`/storyView/ViewMode/StoryViewMode/${storyId}`
      , {
        state: {
          episodeTitle,
          episodeDescription,
          storyId

        },
      })

  };

  // Navigate to author Profile
  const handleNavigatetoProfileAuthordefault = (authorId1, stid11) => {
    navigate(`/user/slide/story/profile/Authordefault/${authorId1}/${stid11}`, {
      state: {
        authorId: authorId1,
        storyId: stid11
      }
    });
  }





  const penNamenew = localStorage.getItem('penNameUser');
  const emailnew = localStorage.getItem('emailUser');
  const backgroundImagenew = localStorage.getItem('backgroundImageUser');



  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  // Aharing page Link Functionality
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


  const token = JSON.parse(localStorage.getItem("token"));
  const handleNavigateAper = () => {
    navigate('/login')
  }

  const targetRef = useRef(null);

  // const targetRef = useRef(null);
  const [isNavbarFixed, setIsNavbarFixed] = useState(false);
  const [lastScrollTop, setLastScrollTop] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const wrapSvElement = document.querySelector('.wrap-sv');
      const wrapSvTop = wrapSvElement.getBoundingClientRect().top;
      const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;

      setIsNavbarFixed(currentScrollTop > wrapSvTop);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);




  return (
    <div className="">
      {/* <div className="scroll-container"> */}
      {/* <Navbar1/> */}
      {isMobile ? <NewGnbM /> : <Navbar1 />}
      {!isMobile && (
        <div className={`fixed-divv ${isNavbarFixed ? 'visible' : ''}`}>
          <p className="auth-nam1">{storyData.authorName}</p>
          {storyData.coverTitle}
        </div>
      )}
      {isMobile &&
        <div className={`fixed-divv ${isNavbarFixed ? 'visible1' : ''}`}>
          <p className="auth-nam1"> {storyData.authorName}</p>
          {storyData.coverTitle}
        </div>
      }
      <div className="frame-container-sv" ref={targetRef}>
        {/* <div className="spacer"></div> */}

        <main className="frame-with-body-text-sv">
          <section className="episode-cover-viewer-sv">

            <div className="wrap-sv"
              style={{ fontFamily: `${storyData.lineStyle}, sans-serif` }}
            >
              <div className="title-wrap-sv">
                <div className="interface-sv">
                  <div className="story-title-sv">
                    <div className="t">
                      <div
                        className="t1"
                        // onClick={HandleProfileNavigate}
                        onClick={() => {
                          if (!token) {
                            handleNavigateAper();
                          } else {
                            HandleProfileNavigate()
                          }
                        }}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        style={{ fontFamily: `${storyData.lineStyle}, sans-serif` }}
                      >
                        [{storyData.coverTitle}]</div>

                      {isHovered && <div className="t5"> <div className="t3">회차 목록

                      </div>
                        <img
                          className="right"
                          src="/SVG/ic_chevron_right_s.svg" />
                      </div>}
                    </div>


                    <div className="story-title-child-sv" />
                    <div className="div15-sv">산문</div>
                  </div>
                  <div className="label-button-sv" onClick={copyCurrentPageLink}>
                    <img className="ic-write-icon-sv" alt="" />
                    <div className="text1-sv">
                      <div className="div16-sv">글 공유</div>
                    </div>
                    <img
                      className="ic-share-icon-sv"
                      loading="eager"
                      alt=""
                      src="/images/ic-share@2x.png"
                    />
                    {isLinkCopied && <span style={{ marginLeft: '10px', backgroundColor: 'black', color: 'white' }}>Link copied!</span>}
                  </div>

                </div>

                <div className="title3-sv">
                  <b className="title4-sv">{Number(currentEpisodeIndex) + 1}화.</b>
                  <div className="title5-sv"> {storyData && storyData.episodes && storyData.episodes[Number(currentEpisodeIndex)]?.episodeTitle}</div>
                </div>
              </div>
              <div className="genre-date-for-story-sv">
                <div className="field-thumb-sv"
                  onClick={() => {
                    if (!token) {
                      handleNavigateAper();
                    } else {
                      handleNavigatetoProfileAuthordefault(storyData.authorId, storyData._id)
                    }
                  }}
                >
                  <div className="field-list-imgfalsefalsethu-sv">
                    <img
                      className="pic-fieldprof-08-icon-sv"
                      loading="eager"
                      alt=""
                      src={storyData.backgroundImage
                        ? (storyData.backgroundImage.includes("/images")
                          ? `https://aper.cc/${storyData.backgroundImage}`
                          : `https://backend.aper.cc/${storyData.backgroundImage}`)
                        : 'defaultImageURL'}
                    />
                  </div>
                  <b className="b2-sv">{storyData.authorName}</b>
                </div>
                <div className="logo-instance-sv">
                  <div className="search-and-write-in-g-n-b-sv" />
                </div>
                <div className="sidebar-trail-sv">
                  <div className="div17-sv">{storyData.genre}</div>
                </div>
                <div className="logo-instance1-sv">
                  <div className="logo-instance-child-sv" />
                </div>
                <div className="date-sv">
                  <div className="top-level-frame-sv">{formatDate(storyData.createdAt)}</div>
                </div>
                <div className="duie-date-sv">
                  <div className="fear-of-driving-sv">2022.03.30 마감</div>
                  <b className="fear-of-driving1-sv">D-30</b>
                </div>
              </div>
              <div className="field-thumb1-sv">
                <div className="field-list-imgfalsefalsethu1-sv">
                  <img className="pic-fieldprof-08-icon1-sv" alt="" />
                </div>
                <b className="b3-sv">이연 작가</b>

              </div>
            </div>
          </section>


        </main>

        <div className="frame-group-sv">
          <div className="story-detail-bottom-parent-sv">
            <div className="story-detail-bottom-sv">
              <div className="prev-sv" onClick={handlePrevEpisode}>
                {Number(currentEpisodeIndex) > 0 && storyData.episodes && Number(currentEpisodeIndex) < storyData.episodes.length && storyData.episodes[Number(currentEpisodeIndex) - 1]?.isPublished && (
                  <div className="left-trail-frame-sv">
                    <img
                      className="ic-arrow-left-icon-sv"
                      loading="eager"
                      alt=""
                      src="/images/ic-arrow-left@2x.png"
                    />
                    <div className="frame-div-sv">
                      <div className="div21-sv">이전 글</div>
                      <b className="b4-sv">{Number(currentEpisodeIndex)}화.</b>
                      <b className="b5-sv">{storyData.episodes[Number(currentEpisodeIndex) - 1]?.episodeTitle}</b>
                    </div>
                  </div>
                )}

              </div>
              {storyData.episodes && Number(currentEpisodeIndex) < storyData.episodes.length - 1 && storyData.episodes[Number(currentEpisodeIndex) + 1]?.isPublished && (
                <div className="next-sv">
                  <div className="body1-sv">
                    <div className="text2-sv" onClick={handleNextEpisode}>
                      <div className="div22-sv">다음 글</div>
                      <b className="b6-sv">{Number(currentEpisodeIndex) + 2}화.</b>
                      <b className="b7-sv">{storyData.episodes[Number(currentEpisodeIndex) + 1]?.episodeTitle}</b>
                    </div>
                    <img
                      className="ic-arrow-right-icon-sv"
                      loading="eager"
                      alt=""
                      src="/images/ic-arrow-right@2x.png"
                    />
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
      <div className="body-sv " >


        <div className='add-div-222'>
          <div id="myTextarea" className="myTextarea" style={{ fontFamily: `${storyData.lineStyle}, sans-serif` }}>
            {storyData && storyData.episodes && storyData.episodes[Number(currentEpisodeIndex)]?.description.split('\n').map((line, index) => (
              <React.Fragment key={index}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};

export default ViewStory;
