import "./StoryViewMode.css";
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useRef } from "react";
import NewGnbM from '../Navbar/new-gnb-m';
import Navbar1 from "../Navbar/Navbar";
const StoryViewMode = () => {
  const [ storyData,setStoryData] = useState([]);
  const {storyId} = useParams()
  const location = useLocation();
  const { episodeTitle, episodeDescription } = location.state || {};
    const navigate = useNavigate();

    localStorage.setItem('sid',storyId)
    const handleNavigateViewProfile = ()=>{
      const storyId = localStorage.getItem('sid');
      navigate(`/storyView/ViewMode/StoryViewMode/ViewProfile/${storyId}`);
    }


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
          // console.log("array" + responseData.data)
         
          setStoryData(responseData.data);
          // console.log(episodesData)
  
        } catch (error) {
          // console.error('Error fetching episodes data:', error.message);
        }
      };
  
      fetchData();
   
    }, [storyId]); 
  

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
    const targetRef = useRef(null);
    const [isNavbarFixed, setIsNavbarFixed] = useState(false);
    
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

    const handleEpisodeClick = async (episodeIndex, epStoryId, episodeDescription, isPublished, epTitle) => {
      
      if (storyData && storyData.episodes) {
        
        if (episodeIndex >= 0 && episodeIndex < storyData.episodes.length) {
         
          const clickedEpisode = storyData.episodes[episodeIndex];
    
          
          if (clickedEpisode) {
            const episodeId = clickedEpisode._id;
    
            
            navigate(`/user/slide/story/storycontent/view/profile/${episodeId}/${epStoryId}`, {
              state: {
                textValue: episodeDescription,
                storyId1: epStoryId,
                isPublished: isPublished,
                titleValue: epTitle
              }
            });
          } else {
            // console.error('Clicked episode is null or undefined.');
          }
        } else {
          // console.error('Invalid episode index.');
        }
      } else {
        // console.error('Episodes data is empty or undefined.');
      }
    };

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
    <>
       {/* <Navbar1/> */}
       {isMobile ? <NewGnbM /> :  <Navbar1 />}
       <div  className={`fixed-divv ${isNavbarFixed ? 'visible' : ''}`}>
       <p className="auth-nam1"> {storyData.authorName}</p>
         {storyData.coverTitle}
      </div>
    <div className="frame-container-viewmore">
    
      <div className="gnb-2-viewmore">
        <div className="right-trail-viewmore">
          <img className="nolist-icon-viewmore" alt="" />
        </div>
        <div className="left-trail-viewmore">
          <img className="logo-icon-viewmore" alt="" src="/SVG/logo.svg" />
        </div>
        <div className="spacing-viewmore" />
        <div className="right-trail1-viewmore">
          <img className="nosearch-icon-viewmore" alt="" />
        </div>
        <div className="right-trail2-viewmore">
          <img className="ic-search-icon-viewmore" alt="" />
        </div>
        <div className="right-trail3-viewmore">
          <img className="ic-write-icon-viewmore" alt="" />
        </div>
        <div className="right-trail4-viewmore">
          <div className="field-list-imgfalsefalsethu-viewmore">
            <img className="pic-fieldprof-15-icon-viewmore" alt="" />
          </div>
          <div className="div-viewmore">김초엽</div>
        </div>
        <div className="right-trail5-viewmore">
          <img className="ic-search-icon1-viewmore" alt="" src="/ic-search-1@2x.png" />
        </div>
        <div className="right-trail6-viewmore">
          <div className="wrapper-viewmore">
            <div className="div1-viewmore">김초엽</div>
          </div>
          <div className="field-list-imgfalsefalsethu1-viewmore">
            <img className="pic-fieldprof-08-icon-viewmore" alt="" />
          </div>
        </div>
        <div className="write-in-gnb-viewmore">
          <img className="ic-write-icon1-viewmore" alt="" src="/ic-write-1@2x.png" />
        </div>
        <div className="v-divider-16-invers-wrapper-viewmore">
          <div className="v-divider-16-invers-viewmore">
            <div className="v-divider-16-invers-child-viewmore" />
          </div>
        </div>
        <div className="field-writer-viewmore">
          <div className="name-viewmore">
            <div className="div2-viewmore">김초엽</div>
          </div>
          <div className="field-list-imgfalsefalsethu2-viewmore">
            <img
              className="pic-fieldprof-10-icon-viewmore"
              alt=""
              src="/images/pic-fieldprof-10@2x.png"
            />
          </div>
        </div>
      </div>
      <main className="list-frame-viewmore">
        <section className="text-input-viewmore">
          <header className="instance-viewmore">
            <div className="story-cover-viewer-viewmore">
              <div className="wrap-viewmore"
               style={{ fontFamily: `${storyData.lineStyle}, sans-serif` }}
              >
                <div className="title-viewmore">
                  <div className="interface-viewmore">
                    <div className="routine-viewmore">
                      <div className="aper-viewmore" />
                      <b className="b-viewmore">{storyData.routineType}</b>
                    </div>
                    <div className="label-button-viewmore">
                      <img className="ic-write-icon2-viewmore" alt="" />
                      <div className="text-viewmore"    onClick={copyCurrentPageLink}>
                        <div className="div3-viewmore">이야기 공유</div>
                      </div>
                      <img
                        className="ic-share-icon-viewmore"
                        loading="eager"
                        alt=""
                        src="/images/ic-share@2x.png"
                      />
                       {isLinkCopied && <span style={{ marginLeft: '10px',backgroundColor:'black',color:'white' }}>Link copied!</span>}
                    </div>
                    <div className="label-button1-viewmore">
                      <img className="ic-hamburger-icon-viewmore" alt="" />
                      <div className="text1-viewmore"
                      
                      >
                        <div className="div4-viewmore">회차 목록 보기</div>
                      </div>
                      <img className="nowrite-icon-viewmore" alt="" />
                    </div>
                  </div>
                  <div className="title1-viewmore">
                    <b className="b1-viewmore">3화.</b>
                    <h1 className="title2-viewmore" ref={targetRef}>
                     {storyData.coverTitle}
                    </h1>
                  </div>
                </div>
                <div className="field-thumb-viewmore">
                  <div className="field-list-imgfalsefalsethu3-viewmore">
                    <img className="pic-fieldprof-08-icon1-viewmore" alt="" />
                  </div>
                  <b className="b2-viewmore">이연 작가</b>
                </div>
                <div className="genre-date-for-story-viewmore">
                  <div className="field-thumb1-viewmore">
                    <div className="field-list-imgfalsefalsethu4-viewmore">
                      <img
                        className="pic-fieldprof-08-icon2-viewmore"
                        alt=""
                        src={storyData.backgroundImage
            ? (storyData.backgroundImage.includes("/images")
              ? `https://aper.cc/${storyData.backgroundImage}`
              : `https://backend.aper.cc/${storyData.backgroundImage}`)
            : 'defaultImageURL'}
                      />
                    </div>
                    <b className="b3-viewmore">{storyData.authorName}</b>
                  </div>
                  <div className="text2-viewmore">
                    <div className="instance1-viewmore" />
                  </div>
                  <div className="datefield-viewmore">
                    <div className="div5-viewmore">{storyData.genre}</div>
                  </div>
                  <div className="text3-viewmore">
                    <div className="text-child-viewmore" />
                  </div>
                  <div className="date-viewmore">
                    <div className="div6-viewmore">{storyData.createdAt ? storyData.createdAt.split("T")[0].replaceAll("-", ".") : ''}</div>
                    <div className="div7-viewmore">~</div>
                    <div className="div8-viewmore">2023.06.30</div>
                  </div>
                  <div className="duie-date-viewmore">
                    <div className="fear-of-driving-viewmore">2022.03.30 마감</div>
                    <b className="fear-of-driving1-viewmore">D-30</b>
                  </div>
                </div>
              </div>
            </div>
          </header>
          <div className="h-divider-16-viewmore">
            <div className="h-divider-20-viewmore" />
          </div>
        </section>
        <div className="h-divider-161-viewmore">
          <div className="h-divider-201-viewmore" />
        </div>
        <section className="h-divider-16-parent-viewmore">
        
          <div className="h-divider-162-viewmore">
            <div className="h-divider-202-viewmore" />
          </div>
          {
    storyData && (
        <>
            <div className="episode-list-in-story-viewer-viewmore">
                <div className="list-viewmore">
                    {storyData.episodes && storyData.episodes.map((episode, index) => (
                        // Render the episode only if it's published
                        episode.isPublished && (
                            <div className="episode-1" key={index} onClick={async () => await handleEpisodeClick(index, episode.storyId, episode.description, episode.isPublished, episode.coverTitle)}>
                                {episode && episode.episodeTitle && (
                                    <div className="title3-viewmore">
                                        <b className="b4-viewmore">{index + 1}화.</b>
                                        <h3 className="h3-viewmore" style={{ fontFamily: `${storyData.lineStyle}, sans-serif` }}>
                                            {episode.episodeTitle}
                                        </h3>
                                    </div>
                                )}
                                <div className="date1-viewmore">
                                    <div className="episodedatebody-viewmore">{storyData.createdAt && storyData.createdAt.split("T")[0].replaceAll("-", ".")}</div>
                                    <div className="div10-viewmore">~</div>
                                </div>
                                {episode && episode.description && (
                                    <div className="body-viewmore">
                                        <div className="div12-viewmore">
                                            <p className="p-viewmore" style={{ fontFamily: `${storyData.lineStyle}, sans-serif` }}>
                                                {episode.description}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )
                    ))}
                    <div className="button-area-viewmore">
                        <img className="ic-enter-arrow-icon-viewmore" alt="" />
                        <div className="text4-viewmore">
                            <b className="b5-viewmore">글 읽기</b>
                            <img className="underline-icon-viewmore" alt="" />
                        </div>
                        <div className="spacing-4-viewmore" />
                        <div className="label-button2-viewmore">
                            <img className="ic-write-icon4-viewmore" alt="" />
                            <div className="text5-viewmore">
                                <div className="div13-viewmore">스토리 커버 바로가기</div>
                            </div>
                            <img className="nochevron-right-s-icon-viewmore" alt="" />
                        </div>
                        <div className="label-button3-viewmore">
                            <img className="ic-write-icon5-viewmore" alt="" />
                            <div className="text6-viewmore">
                                <div className="div14-viewmore">삭제</div>
                            </div>
                            <img className="nowrite-icon1-viewmore" alt="" />
                        </div>
                    </div>
                </div>
                <div className="h-divider-163-viewmore">
                    <div className="h-divider-203-viewmore" />
                </div>
            </div>
        </>
    )
}
           
        </section>

      </main>
    </div>
    </>
  );
};

export default StoryViewMode;
