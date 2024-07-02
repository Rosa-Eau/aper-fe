import "./Search.css";
import { saveData } from "../../redux/action";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar1 from "../Navbar/Navbar";
import AuthorSearch from "./AuthorSearch";
import NewGnbM from "../Navbar/new-gnb-m";
import React from "react";


const Search = () => {

  const [searchTerm, setSearchTerm] = useState("");
  const [isTableVisible, setTableVisible] = useState(false);
  const [fetchedStories, setFetchedStories] = useState([]);
  const data = useSelector((state) => state.userData);
  const imageSrc = localStorage.getItem('imageurl')
  const handleLogout = () => {
    localStorage.clear();
    navigate('/login')
  }
  const [selectedFilter, setSelectedFilter] = useState('');
  const [storyData, setStoryData] = useState([]);
  const [hoveredEpisodeIndex, setHoveredEpisodeIndex] = useState(null);
  const navigate = useNavigate();

  const handleEpisodeClick = (index) => {
    setHoveredEpisodeIndex(index);
  };

  //Function which navigates to particular clicked story
  const handleStoryClick = async (index, clickedStory) => {
    if (fetchedStories.length > 0) {
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

  const [visible, setVisible] = useState(true);
  const [authorVisible, setAuthorVisible] = useState(false)





  const [isClicked, setIsClicked] = useState(false);
  const handleChange = () => {
    setIsClicked(!isClicked);
    setVisible(false);
    setAuthorVisible(true)

  }


  const handleChange2 = () => {
    setIsClicked(!isClicked);
    setVisible(!visible)
    setAuthorVisible(false)
  }

  const handleChange1 = () => {
    setIsClicked(true);
  };



  //Handling each Filetr Click
  const handleFilterClick = async (filter) => {
    // console.log(`Filter clicked: ${filter}`);
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
      setFetchedStories(reversedStoryData)
      setSelectedFilter(filter);
    } catch (error) {
      // console.error("Error fetching stories:", error);
    }


  };



  // Function to handle the Searched Value
  const handleSearchvalue = async (event) => {
    // Check if the "Enter" key is pressed
    if (event.key === 'Enter') {
      try {
        const key = event.target.value;
        const token = JSON.parse(localStorage.getItem("token"));
        const response = await fetch(`https://backend.aper.cc/story/search/${key}`, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        const responseData = await response.json();
        // console.log(responseData)
        const filteredStoryData = responseData.data.filter(story => story.isPublished === true);
        const reversedStoryData = filteredStoryData.reverse();

        setFetchedStories(reversedStoryData)
      } catch (error) {
        // console.error("Error fetching stories:", error);
      }
    }
  }
  const token = JSON.parse(localStorage.getItem("token"));

  const handleMainPage = () => {
    if (!token) {
      navigate('/login');
    } else {
      navigate('/user');
    }
  }


  // Function Which fetcheds all the stories
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
      // console.log(responseData.data);
      const filteredStoryData = responseData.data.filter(story => story.isPublished === true);
      const reversedStoryData = filteredStoryData.reverse();


      setFetchedStories(reversedStoryData)
    } catch (error) {
      // console.error("Error fetching stories:", error);
    }

  }


  const penNamenew = localStorage.getItem('penNameUser');
  const emailnew = localStorage.getItem('emailUser');
  const backgroundImagenew = localStorage.getItem('backgroundImageUser');


  //Navigate to the each authors profile
  const handleNavigatetoProfileAuthordefault = (authorId1, stid11) => {
    navigate(`/user/slide/story/profile/Authordefault/${authorId1}/${stid11}`, {
      state: {
        authorId: authorId1,
        storyId: stid11
      }
    });
  }
  const uniqueAuthors = new Set();
  const uniqueStories = [];

  fetchedStories.forEach(story => {

    const searchTermPresent = story.authorName.toLowerCase().includes(searchTerm.toLowerCase());

    if (searchTermPresent && !uniqueAuthors.has(story.authorId)) {
      uniqueAuthors.add(story.authorId);
      uniqueStories.push(story);
    }
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const key = searchTerm;
      const token = JSON.parse(localStorage.getItem("token"));
      const response = await fetch(`https://backend.aper.cc/story/search/${key}`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      const responseData = await response.json();
      // console.log("clg for description" +responseData.data)
      const filteredStoryData = responseData.data.filter(story => story.isPublished === true);
      const reversedStoryData = filteredStoryData.reverse();
      setFetchedStories(reversedStoryData)
    } catch (error) {
      // console.error("Error fetching stories:", error);
    }
  };


  useEffect(() => {
    // Effect to handle search when searchTerm changes
    const fetchData = async () => {
      try {
        const key = searchTerm;
        const token = JSON.parse(localStorage.getItem("token"));
        const response = await fetch(
          `https://backend.aper.cc/story/search/${key}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const responseData = await response.json();
        // console.log(responseData);
        const filteredStoryData = responseData.data.filter(
          (story) => story.isPublished === true
        );
        const reversedStoryData = filteredStoryData.reverse();

        setFetchedStories(reversedStoryData);
      } catch (error) {
        // console.error("Error fetching stories:", error);
      }
    };

    if (searchTerm.trim() !== "") {
      fetchData();
    }
  }, [searchTerm]);


  const handleNavigateAper = () => {
    navigate('/login')
  }

  const [hoveredIndex, setHoveredIndex] = useState();


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

  return (
    <div className="main-image-container">
      {isMobile ? <NewGnbM /> : <Navbar1 />}
      <div className="div-search">
        <div className="cursor-search">
          <div className="cursor1-search" />
        </div>
        <div className="inner-search">
          <div className="frame-parent-search">
            <form className="frame-group-search" onSubmit={handleFormSubmit}>
              {
                isMobile && (
                  <div className="bg-search">
                    <div className={`parent-frame-search ${!isClicked ? 'active' : ''}`} onClick={handleChange2}  >
                      <div >이야기</div>
                    </div>
                    <div className={`parent-frame1-search ${isClicked ? 'active' : ''}`} onClick={handleChange}>
                      <div >작가</div>
                    </div>
                  </div>
                )
              }
              <div className="frame-wrapper-search">
                <div className="frame-container-search">
                  <div className="frame-div-search">
                    <div className="frame-parent1-search">
                      <div className="ic-search-wrapper-search">
                        <img
                          className="ic-search-icon1-search"
                          alt=""
                          src="/SVG/ic_search.svg"
                        />
                      </div>

                      <input
                        className="input-search"
                        // placeholder="김초엽"
                        type="text"
                        value={searchTerm}
                        onChange={(event) => setSearchTerm(event.target.value)}
                        onKeyPress={handleSearchvalue}
                        autoFocus
                      />
                    </div>
                    <div className="line-search" />
                  </div>
                  {visible && !isMobile &&
                    <div className="filters-search">
                      <div className={`filter-chip444 ${selectedFilter === '전체' ? 'selected' : ''}`} onClick={handleAll}>
                        <div className="text-search">
                          <b className="b-search">전체</b>
                        </div>
                        <img className="ic-check-icon" alt="" src="/SVG/ic_check_s.svg" />
                      </div>
                      <div className={`filter-chip444 ${selectedFilter === '일상' ? 'selected' : ''}`} onClick={() => handleFilterClick('일상')}>
                        <div className="text1-search">
                          <b className="b1-search">일상</b>
                        </div>
                        <img className="ic-check-icon" alt="" src="/SVG/ic_check_s.svg" />
                      </div>
                      <div className={`filter-chip444 ${selectedFilter === '로맨스' ? 'selected' : ''}`} onClick={() => handleFilterClick('로맨스')}>
                        <div className="text2-search">
                          <b className="b2-search">로맨스</b>
                        </div>
                        <img className="ic-check-icon" alt="" src="/SVG/ic_check_s.svg" />
                      </div>
                      <div className={`filter-chip444 ${selectedFilter === 'SF' ? 'selected' : ''}`} onClick={() => handleFilterClick('SF')}>
                        <div className="text3-search">
                          <b className="b3-search">SF</b>
                        </div>
                        <img className="ic-check-icon" alt="" src="/SVG/ic_check_s.svg" />
                      </div>
                      <div className={`filter-chip444 ${selectedFilter === '공포' ? 'selected' : ''}`} onClick={() => handleFilterClick('공포')}>
                        <div className="text4-search">
                          <b className="b4-search">공포</b>
                        </div>
                        <img className="ic-check-icon" alt="" src="/SVG/ic_check_s.svg" />
                      </div>
                      <div className={`filter-chip444 ${selectedFilter === '퀴어' ? 'selected' : ''}`} onClick={() => handleFilterClick('퀴어')}>
                        <div className="text5-search">
                          <b className="b5-search">퀴어</b>
                        </div>
                        <img className="ic-check-icon" alt="" src="/SVG/ic_check_s.svg" />
                      </div>
                      <div className={`filter-chip444 ${selectedFilter === '사회' ? 'selected' : ''}`} onClick={() => handleFilterClick('사회')}>
                        <div className="text6-search">
                          <b className="b6-search">사회</b>
                        </div>
                        <img className="ic-check-icon" alt="" src="/SVG/ic_check_s.svg" />
                      </div>
                      <div className={`filter-chip444 ${selectedFilter === '예술' ? 'selected' : ''}`} onClick={() => handleFilterClick('예술')}>
                        <div className="text7-search">
                          <b className="b7-search">예술</b>
                        </div>
                        <img className="ic-check-icon" alt="" src="/SVG/ic_check_s.svg" />
                      </div>
                      <div className={`filter-chip444 ${selectedFilter === '비평' ? 'selected' : ''}`} onClick={() => handleFilterClick('비평')}>
                        <div className="text8-search">
                          <b className="b8-search">비평</b>
                        </div>
                        <img className="ic-check-icon" alt="" src="/SVG/ic_check_s.svg" />
                      </div>
                      <div className={`filter-chip444 ${selectedFilter === '시' ? 'selected' : ''}`} onClick={() => handleFilterClick('시')}>
                        <div className="text9-search">
                          <b className="b9-search">시</b>
                        </div>
                        <img className="ic-check-icon" alt="" src="/SVG/ic_check_s.svg" />
                      </div>
                    </div>
                  }
                  {
                    visible && isMobile && <div className="filters ltts">
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
                  }
                </div>
              </div>
              {!isMobile && (
                <div className="bg-search">
                  <div className={`parent-frame-search ${!isClicked ? 'active' : ''}`} onClick={handleChange2}  >
                    <div >이야기</div>
                  </div>
                  <div className={`parent-frame1-search ${isClicked ? 'active' : ''}`} onClick={handleChange}>
                    <div >작가</div>
                  </div>
                </div>)}
            </form>
            {!isMobile &&
              <div className="ic-close-wrapper-search" onClick={handleMainPage}>
                <img
                  className="ic-close-icon-search"
                  loading="eager"
                  alt=""
                  src="/SVG/ic_close (1).svg"
                />
              </div>
            }
          </div>
        </div>
        {/* <div className="h-divider-16-search">
        <div className="h-divider-20-search" />
      </div> */}
        {visible && (
          <section className="frame-container-parent">
            <div className="frame-container">
              <div className="h-divider-16">
                <div className="h-divider-20" />
              </div>
            </div>
            <div className="frame-container1">
              <div className="h-divider-161">
                <div className="h-divider-201" />
              </div>
              <div className="story-list-in-main-search">

                {Array.isArray(fetchedStories) ? (
                  fetchedStories.map((story, index) => (
                    <React.Fragment key={index}>
                      {story.episodes && story.episodes.map((episode, episodeIndex) => (

                        episode.isPublished && (
                          <React.Fragment key={episode._id}>
                            <div className="list-main" >
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
                      ))}
                    </React.Fragment>
                  ))
                ) : (
                  <p>No stories found</p>
                )}
              </div>
            </div>
          </section>
        )}

      </div>
      {
        authorVisible && (
          <>

            {searchTerm && isMobile &&
              <div className="field-list-img-group-i-1">
                {uniqueStories.slice(0, 6).map((story, index) => {

                  return (
                    <div key={index} onClick={() => handleNavigatetoProfileAuthordefault(story.authorId, story._id)}>
                      <div className='box-1'>

                        <div className=''>
                          <img
                            className='image-mobile'
                            src={story.backgroundImage
                              ? (story.backgroundImage.includes("/images")
                                ? `https://aper.cc/${story.backgroundImage}`
                                : `https://backend.aper.cc/${story.backgroundImage}`)
                              : 'def'} />



                        </div>
                        <div className='inside-text'>
                          <div className='inside-title'>
                            {story.authorName}
                          </div>
                          <div className='inside-description'>
                            {story.description}
                          </div>

                        </div>
                        <div className='link-title-1' >
                          <div className=''>   <img className='' src="/SVG/ic_enter_arrow (2).svg" />
                            작가의 필드 바로 가기 </div>

                        </div>


                      </div>
                    </div>
                  );
                })}
              </div>
            }




            {searchTerm && !isMobile && uniqueStories.length > 0 &&
              <div className="field-list-img-group-i">
                {uniqueStories.slice(0, 6).map((story, index) => {

                  return (
                    <div key={index} onClick={() => handleNavigatetoProfileAuthordefault(story.authorId, story._id)}>
                      <div className={`card113 ${hoveredIndex === index ? 'hover11' : ''}`}
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(-1)}>
                        <img
                          className="pic-fieldprof-11-icon-i"
                          loading="lazy"
                          alt=""
                          src={story.backgroundImage
                            ? (story.backgroundImage.includes("/images")
                              ? `https://aper.cc/${story.backgroundImage}`
                              : `https://backend.aper.cc/${story.backgroundImage}`)
                            : 'def'} />

                        {hoveredIndex === index && (
                          <div className="content-container">
                            <div className='pen-main'>
                              <div>{story.authorName}</div>
                              <div className='arr-d'>
                                <img className='mainmen1' src="/SVG/ic_enter_arrow (2).svg" style={{ width: '20px', height: '20px', marginRight: '5px' }} />
                                작가의 필드 바로 가기
                              </div>
                            </div>
                            {story.description && (
                              <div className='wr'>{story.description}</div>
                            )}
                            {story.authorDetails && story.authorDetails.description && (
                              <div className='wr'>{story.authorDetails.description}</div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            }




          </>
        )
      }
    </div>
  );
};

export default Search;
