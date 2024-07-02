import React from 'react';
import { useState, useEffect } from 'react';
import './StoryView.css'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Navbar } from 'react-bootstrap';
import Navbar1 from '../Navbar/Navbar';
import NewGnbM from '../Navbar/new-gnb-m';



const StoryView = () => {
  const { episodeId } = useParams();
  const { storyId } = useParams();
  const [fetchedText, setFetchedText] = useState('');
  const [fetchedTitle, setFetchedTitle] = useState('')
  const [fetchedGenere, setFectchedGenere] = useState('')
  const [fontdata, setFont] = useState('')



  //Function to fetch the storydata
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


  const location = useLocation();
  const { textValue: episodeDescription } = location.state || {};


  //Mobile Responsiveness
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


  const { storyId1 } = location.state || {};
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
  const [fetchedStoryTitle, setFetchedStoryTitle] = useState('');



  //Function to fetch logged in user details
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
        localStorage.setItem('checkId1', userDetails.data._id)
      } catch (error) {
        // console.error('Error fetching user details:', error.message);
      }
    };
    fetchData();
  }, []);

  const [authId, setAuthId] = useState('');
  const checkId = localStorage.getItem('checkId1')
  const [penn, setPenn] = useState('')


  //fetch episode details
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = JSON.parse(localStorage.getItem('token'));
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
          const fetchedGenere = responseData.data[0].genre;
          const authImage = responseData.data[0].authorDetails.backgroundImage;
          const AuthName1 = responseData.data[0].authorDetails.penName;
          const createdAt = responseData.data[0].createdAt;
          const fetchedAuthorId = responseData.data[0].authorId;
          setAuthImage(authImage)
          setFetchedText(fetchedText);
          setFetchedTitle(fetchedTitle);
          setFetchedStoryTitle(fetchedStoryTitle)
          setFectchedGenere(fetchedGenere)
          setCreationDate(createdAt)
          setAuthId(fetchedAuthorId);
          setPenn(AuthName1)


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

  useEffect(() => {
    const Interval = setTimeout(() => {
      setToastVisible(!toastVisible)
    }, 3000)
  }, []);


  const handleEditClick = () => {
    navigate(`/user/slide/story/storycontent/edit/${episodeId}`, {
      state: {
        storyId1: storyId,
        textValue: episodeDescription
      }
    });
  };



  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };
  const title1 = useSelector((state) => state.title);
  const routineType1 = useSelector((state) => state.routineType);
  const routineSelected = useSelector((state) => state.selectedRoutine);
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
    // console.log('More clicked for episode with index:', episodeIndex);
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
  const [authImage, setAuthImage] = useState('');

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
      // console.log("svadvasvda" + Id);


      const token = JSON.parse(localStorage.getItem("token"));
      // const storyId = localStorage.getItem('id');  
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
      console.log('Data deleted successfully');


      setModal(false);
      navigate('/user/slide')
    } catch (error) {
      // console.error('Error deleting data:', error.message);
      // console.log('Error deleting data:', error.message);
    }
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



  const { textValue } = location.state || {};


  const HandleProfileNavigate = () => {
    navigate(`/user/slide/story/profile/${authId}`)
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

  const token = JSON.parse(localStorage.getItem('token'));

  return (
    <>

      <div className=''>
        {isMobile ? <NewGnbM /> : <Navbar1 />}
        <div className='main-content-div   view-media'>
          <div className='content-div'>
            <div className='main-routine mn1'>
              <div className="interface-sv">
                <div className="story-title-sv">
                  <div className="t">
                    <div
                      className="t1"

                      style={{ fontFamily: `${fontdata.lineStyle}, sans-serif` }}
                    >
                      [{fetchedStoryTitle}]</div>
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
            </div>
            <div className='Title' style={{ fontFamily: `${fontdata.lineStyle}, sans-serif` }}>
              <div className="custom-text1"
                style={{ fontFamily: `${fontdata.lineStyle}, sans-serif` }}
              >
                {fetchedTitle}
              </div>

            </div>
            {/* <div className="author-container" style={{ position: 'relative' }}>
              <div className="author-info">
                <div className="author-image-container">
                  <div className="author-image-1">
                    <img src={authImage
                      ? (authImage.includes("/images")
                        ? `https://aper.cc/${authImage}`
                        : `https://backend.aper.cc/${authImage}`)
                      : 'defaultImageURL'} />

                  </div>
                </div>
                <div className="author-details"
                  style={{ fontFamily: `${fontdata.lineStyle}, sans-serif` }}
                >
                  <div className="author-name">{penn}
                  </div>
                  <div className="separator"></div>
                  <div className="category">{fetchedGenere}</div>
                  <div className="separator"></div>
                  <div className="date"> {creationDate && creationDate.split("T")[0].replaceAll("-", ".")}</div>
                </div>
              </div>

            </div> */}

            <div className=""  style={{ position: 'relative', marginTop:'20px' }}>
  
  <div className="genre-date-for-story-sv">
            <div className="field-thumb-sv"   onClick={HandleProfileNavigate}>
              <div className="field-list-imgfalsefalsethu-sv">
                <img
                  className="pic-fieldprof-08-icon-sv"
                  loading="eager"
                  alt=""
                  src={authImage
                      ? (authImage.includes("/images")
                        ? `https://aper.cc/${authImage}`
                        : `https://backend.aper.cc/${authImage}`)
                      : 'defaultImageURL'} />
              </div>
              <b className="b2-sv"
              style={{ fontFamily: `${fontdata.lineStyle}, sans-serif`}}
              >{penn}</b>
            </div>
            <div className="logo-instance-sv">
              <div className="search-and-write-in-g-n-b-sv" />
            </div>
            <div className="sidebar-trail-sv">
              <div className="div17-sv"
              style={{ fontFamily: `${fontdata.lineStyle}, sans-serif`}}
              >{fetchedGenere}</div>
            </div>
            
            <div className="logo-instance1-sv">
              <div className="logo-instance-child-sv" />
            </div>
            <div className="date-sv">
            <div className="top-level-frame-sv" style={{ fontFamily: `${fontdata.lineStyle}, sans-serif` }}>
            {creationDate && creationDate.split("T")[0].replaceAll("-", ".")}
</div>
              <div className="div18-sv">~</div>
              <div className="div19-sv">2023.06.30</div>
            </div>
            <div className="duie-date-sv">
              <div className="fear-of-driving-sv">2022.03.30 마감</div>
              <b className="fear-of-driving1-sv">D-30</b>
            </div>
          </div>
</div>
            <div className='add-div-22'>
              <div id="myTextarea" className="myTextarea" placeholder="본문을 입력해 주세요."
                style={{ fontFamily: `${fontdata.lineStyle}, sans-serif` }}
              >
                {fetchedText.split('\n').map((line, index) => (
                  <React.Fragment key={index}>
                    {line}
                    <br />
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="footer-mail main-content-div">
          <div className='footer-buttons'>
            {authId === checkId && token && (
              <div className='footer-buttons1'>
                <div className='share-footer' onClick={handleEditClick}>
                  <img src='/SVG/ic_write.svg' alt="SVG 1" className='inv' />
                  <b className='button-share'>글 편집하기</b>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default StoryView; 