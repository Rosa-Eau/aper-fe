import React from 'react';
import { useState, useEffect } from 'react';

import '../StoryCreation/StoryView.css'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useRef } from 'react';
import NewGnbM from '../Navbar/new-gnb-m';
import { Navbar } from 'react-bootstrap';
import Navbar1 from '../Navbar/Navbar';



const ViewProfileEpisode = () => {
  const { episodeId } = useParams();
  const { storyId } = useParams();
  const [fetchedText, setFetchedText] = useState('');
  const [fetchedTitle, setFetchedTitle] = useState('');
  const [fetchedGenere, setFectchedGenere] = useState('')
  const [fetchedStoryTitle, setFetchedStoryTitle] = useState('');
  const [storyData, setStoryData] = useState([]);
  const location = useLocation();
  const { textValue: episodeDescription } = location.state || {};
  const { storyId1 } = location.state || {};
  localStorage.setItem("up-stid", storyId1);
  const st1 = localStorage.getItem("up-stid");
  const { isPublished } = location.state || {};
  const authorId = localStorage.getItem('authorId');
  const data = useSelector((state) => state.userData);
  localStorage.setItem('pen', data.penName);
  const storedPenName = localStorage.getItem('pen');
  const storedRoutineType = localStorage.getItem('routineType');
  const storedTitle = localStorage.getItem('title');
  const storedGenre = localStorage.getItem('genre');
  const storedWritingStyle = localStorage.getItem('writingStyle');
  const [episodesData, setEpisodesData] = useState([]);

  const [authname, setAuthname] = useState('');
  const [authImage, setAuthImage] = useState('');

  const [fetchedDate,setFetchedDate] = useState('')

  useEffect(() => {
    //Function to fetch all episodes data
    const fetchData = async () => {
      try {
        const token = JSON.parse(localStorage.getItem('token'));
        // const storyId = localStorage.getItem('id');  

        // console.log("episode id is " + episodeId)
        const response = await fetch(
          `https://backend.aper.cc/story/get-episodeById/${storyId}/${episodeId}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          }
        );

        const responseData = await response.json();

        if (responseData.data && responseData.data.length > 0) {
          const fetchedText = responseData.data[0].description;
          const fetchedTitle = responseData.data[0].episodeTitle;
          const fetchedStoryTitle = responseData.data[0].coverTitle;
          const authname = responseData.data[0].authorDetails.penName;
          const authImage = responseData.data[0].authorDetails.backgroundImage;
          const fetchedGenere = responseData.data[0].genre;
          const fetchedDate = responseData.data[0].createdAt;
          setStoryData(responseData.data)
          setFetchedText(fetchedText);
          setFetchedTitle(fetchedTitle);
          setFetchedStoryTitle(fetchedStoryTitle)
          setAuthname(authname)
          setAuthImage(authImage)
          setFectchedGenere(fetchedGenere)
          setFetchedDate(fetchedDate)
        } else {

        }
      } catch (error) {
        // console.error('Error fetching episode data:', error);
      }
    };

    fetchData();
  }, []);

  const [selectedEpisodeIndex, setSelectedEpisodeIndex] = useState(null);
  const [expandedDescriptions, setExpandedDescriptions] = useState({});


  useEffect(() => {
    setEpisodesData([]);
    setEpisodeCount(0);
  }, [storyId]);


  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);




  const [creationDate, setCreationDate] = useState('');
  const dispatch = useDispatch();
  const [episodeCount, setEpisodeCount] = useState(0);
  const navigate = useNavigate();

  const [toastVisible, setToastVisible] = useState(true);
  //Toast message Visiblity Time
  useEffect(() => {
    const Interval = setTimeout(() => {
      setToastVisible(!toastVisible)
    }, 5000)
  }, []);

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
    localStorage.setItem('epin', episodeIndex);
    localStorage.setItem('epid', episodeId);
    setDelete2(!delete2);

  };


  const handleStory = () => {
    navigate('/user/slide/story/storycontent')
  }
  const [isAddIconClicked, setAddIconClicked] = useState(false);
  // const location = useLocation();
  useEffect(() => {

    if (location.state && location.state.isAddIconClicked) {
      setAddIconClicked(true);
    }
  }, [location.state]);




  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [lineStyle, setLineStyle] = useState('');

  useEffect(() => {

    const formatDate = (date) => {
      return `${date.getFullYear()}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date
        .getDate()
        .toString()
        .padStart(2, '0')}`;
    };


    const today = new Date();


    setCreationDate(formatDate(today));
  }, []);


  useEffect(() => {
    setShowComponent(true);
  }, []);

  const { textValue } = location.state || {};

  const HandleProfileNavigate = () => {
    navigate(`/storyView/ViewMode/StoryViewMode/${storyId}`)
  }
  // const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  //Sharing Link Functionality
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


  const [fontdata, setFont] = useState('')
  useEffect(() => {
    const fetchData = async () => {

      const token = JSON.parse(localStorage.getItem('token'));
      try {
        const response = await fetch(`https://backend.aper.cc/story/getStoryByStoryId/${storyId}`, {
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



      } catch (error) {
        // console.error('Error fetching episodes data:', error.message);
      }
    };

    fetchData();

  }, []);


  const targetRef = useRef(null);
  const [isNavbarFixed, setIsNavbarFixed] = useState(false);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  // Functionality whixh make cotent Fix at the top when page is scrolled
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



  const token = JSON.parse(localStorage.getItem('token'));
  const handleNavigateAper = () => {
    navigate('/login')
  }


  // Mobile Responsiveness
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


  // Navigate to the authors Profile
  const handleNavigatetoProfileAuthordefault = (authorId1, stid11) => {
    navigate(`/user/slide/story/profile/Authordefault/${authorId1}/${stid11}`, {
      state: {
        authorId: authorId1,
        storyId: stid11
      }
    });
  }

  //Function to format the optained created Date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}.${month}.${day}`;
  };

  return (
    <>
      {isMobile ? <NewGnbM /> : <Navbar1 />}

      {!isMobile && (
        <div className={`fixed-divv ${isNavbarFixed ? 'visible' : ''}`}>
          <p className="auth-nam1">{authname}</p>
          {fetchedStoryTitle}
        </div>
      )}
      {isMobile &&
        <div className={`fixed-divv ${isNavbarFixed ? 'visible1' : ''}`}>
          <p className="auth-nam1"> {authname}</p>
          {fetchedTitle}
        </div>
      }
      <div className="frame-container-sv" ref={targetRef}>
        {/* <div className="spacer"></div> */}

        <main className="frame-with-body-text-sv">
          <section className="episode-cover-viewer-sv">
            <div className="wrap-sv"
              style={{ fontFamily: `${fontdata.lineStyle}, sans-serif` }}
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
                        style={{ fontFamily: `${fontdata.lineStyle}, sans-serif` }}
                      >
                        [{fetchedStoryTitle}]</div>

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
                  {/* <b className="title4-sv">{currentEpisodeIndex +1}화.</b> */}
                  <div className="title5-sv"> {fetchedTitle}</div>
                </div>
              </div>
              <div className="genre-date-for-story-sv">
                <div className="field-thumb-sv"
                  //  onClick={()=>handleNavigatetoProfileAuthordefault(storyData.authorId,storyData._id)}
                  onClick={() => {
                    if (!token) {
                      handleNavigateAper();
                    } else {
                      handleNavigatetoProfileAuthordefault(fontdata.authorId, fontdata._id)
                    }
                  }}
                >
                  <div className="field-list-imgfalsefalsethu-sv">
                    <img
                      className="pic-fieldprof-08-icon-sv"
                      loading="eager"
                      alt=""
                      src={authImage
                        ? (authImage.includes("/images")
                          ? `https://aper.cc/${authImage}`
                          : `https://backend.aper.cc/${authImage}`)
                        : 'defaultImageURL'}
                    />
                  </div>
                  <b className="b2-sv">{authname}</b>
                </div>
                <div className="logo-instance-sv">
                  <div className="search-and-write-in-g-n-b-sv" />
                </div>
                <div className="sidebar-trail-sv">
                  <div className="div17-sv">{fetchedGenere}</div>
                </div>
                <div className="logo-instance1-sv">
                  <div className="logo-instance-child-sv" />
                </div>
                <div className="date-sv">
                  <div className="top-level-frame-sv">{formatDate(fetchedDate)}</div>
                  <div className="div18-sv">~</div>
                  <div className="div19-sv">2023.06.30</div>
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

      </div>
      <div className="body-sv " >
        <div className='add-div-222' style={{ fontFamily: `${fontdata.lineStyle}, sans-serif` }}>
          <div id="myTextarea" className="myTextarea" style={{ fontFamily: `${fontdata.lineStyle}, sans-serif` }}>
            {fetchedText.split('\n').map((line, index) => (
              <React.Fragment key={index}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </div>
        </div>

      </div>

    </>
  );
}

export default ViewProfileEpisode; 