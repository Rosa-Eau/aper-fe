import React from 'react'
import "./Recomended.css"
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Aos from "aos";
import 'aos/dist/aos.css'

const Recomended = ({ id }) => {

  useEffect(() => {
    Aos.init({ duration: 2000 })
  }, [])
  const [selectedSlide, setSelectedSlide] = useState('c1');
  const [recomendedStory, setRecomendedStory] = useState([]);
  const handleSlideChange = (event) => {
    setSelectedSlide(event.target.id);
  };
  const navigate = useNavigate()


  const authorId1 = localStorage.getItem('aid1');
  const stid1 = localStorage.getItem("stid1")
  const handleNavigatetoProfileAuthor = () => {
    navigate(`/user/slide/story/profile/Authordefault/${authorId1}/${stid1}`)
  }
  const authorId2 = localStorage.getItem('aid2');
  const stid2 = localStorage.getItem("stid2")

  const handleNavigatetoProfileAuthor2 = () => {
    navigate(`/user/slide/story/profile/Authordefault/${authorId2}/${stid2}`)
  }

  // localStorage.setItem("aid3",authorId)

  const authorId3 = localStorage.getItem("aid3")
  const stid3 = localStorage.getItem("stid3")
  const handleNavigatetoProfileAuthor3 = () => {
    navigate(`/user/slide/story/profile/Authordefault/${authorId3}/${stid3}`)
  }

  const authorId4 = localStorage.getItem('aid4');
  const stid4 = localStorage.getItem("stid4")
  const handleNavigatetoProfileAuthor4 = () => {
    navigate(`/user/slide/story/profile/Authordefault/${authorId4}/${stid4}`)
  }
  const authorId5 = localStorage.getItem('aid5');
  const stid5 = localStorage.getItem("stid5")
  const handleNavigatetoProfileAuthor5 = () => {
    navigate(`/user/slide/story/profile/Authordefault/${authorId5}/${stid5}`)
  }
  const authorId6 = localStorage.getItem('aid6');
  const stid6 = localStorage.getItem("stid6")
  const handleNavigatetoProfileAuthor6 = () => {
    navigate(`/user/slide/story/profile/Authordefault/${authorId6}/${stid6}`)
  }



  //Function to fetch the recentAuthoe Stories
  useEffect(() => {
    const fetchRecomendedStories = async () => {
      try {
        const token = JSON.parse(localStorage.getItem("token"));

        const response = await fetch(
          "https://backend.aper.cc/story/getRecentAuthorStories",
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
          // console.log("API Response Data:", responseData.data);



          if (responseData.data && Array.isArray(responseData.data)) {
            const lastThreeResponses = responseData.data.slice(0, -1).slice(-6);
            setRecomendedStory(lastThreeResponses);
          } else {
            // console.error("Invalid or empty 'stories' array in API response data");
          }
        } else {
          // console.error("Failed to fetch total stories");
        }
      } catch (error) {
        // console.error("Error fetching total stories:", error);
      }
    };

    fetchRecomendedStories();
  }, []);


  const firstStoryObject = recomendedStory && recomendedStory.length > 0 ? recomendedStory[0] : null;

  if (firstStoryObject) {
    const { authorId, stories } = firstStoryObject;

    localStorage.setItem("aid1", authorId)
    if (stories && stories.length > 0) {
      const firstStoryInArray = stories[0];
      localStorage.setItem("first-title", firstStoryInArray.coverTitle)
      localStorage.setItem("stid1", firstStoryInArray._id)
      localStorage.setItem("first-description", firstStoryInArray.description)

      localStorage.setItem("first-auth", firstStoryInArray.authorName)
      localStorage.setItem("first-date", firstStoryInArray.createdAt && firstStoryInArray.createdAt.split("T")[0])
      localStorage.setItem("first-routineType", firstStoryInArray.genre)
      localStorage.setItem("first-im", firstStoryInArray.backgroundImage)


      if (firstStoryInArray.episodes && firstStoryInArray.episodes.length > 0) {
        const firstEpisode = firstStoryInArray.episodes[0];
        if (firstEpisode && firstEpisode.description) {
          localStorage.setItem("first-recomended", firstEpisode.description);
        }
      } else {
        console.log("No episodes found or episodes array is not defined.");
      }
    } else {
      // console.error("No stories found in the 'stories' array of the first object.");
    }
  } else {
    // console.error("No objects found in recomendedStory array or recomendedStory is not properly initialized.");
  }
  const description1 = localStorage.getItem("first-description")
  const desc1 = localStorage.getItem("first-desc");
  const im1 = localStorage.getItem("first-im");
  const a1 = localStorage.getItem("first-auth");
  const title1 = localStorage.getItem("first-title")
  const i1 = localStorage.getItem("first-im")



  const firstStoryObject4 = recomendedStory && recomendedStory.length > 0 ? recomendedStory[3] : null;

  if (firstStoryObject4) {
    const { authorId, stories } = firstStoryObject4;
    localStorage.setItem("aid5", authorId)
    if (stories && stories.length > 0) {
      const firstStoryInArray4 = stories[0];
      localStorage.setItem("fifth-title", firstStoryInArray4.coverTitle)
      localStorage.setItem("stid5", firstStoryInArray4._id)
      localStorage.setItem("fifth-description", firstStoryInArray4.description)
      localStorage.setItem("fifth-auth", firstStoryInArray4.authorName)
      localStorage.setItem("fifth-im", firstStoryInArray4.backgroundImage)

      if (firstStoryInArray4.episodes && firstStoryInArray4.episodes.length > 0) {
        const firstEpisode4 = firstStoryInArray4.episodes[0];
        if (firstEpisode4 && firstEpisode4.description) {
          localStorage.setItem("fifth-recomended", firstEpisode4.description);
        }
      } else {
        // console.log("No episodes found or episodes array is not defined.");
      }
    } else {
      // console.error("No stories found in the 'stories' array of the first object.");
    }
  } else {
    // console.error("No objects found in recomendedStory array or recomendedStory is not properly initialized.");
  }

  const fifth = localStorage.getItem("fifth-recomended")
  const desc5 = localStorage.getItem("fifth-desc");
  const im5 = localStorage.getItem("fifth-im");
  const a5 = localStorage.getItem("fifth-auth");
  const title5 = localStorage.getItem("fifth-title")
  const description5 = localStorage.getItem("fifth-description")



  const firstStoryObject1 = recomendedStory && recomendedStory.length > 0 ? recomendedStory[2] : null;

  if (firstStoryObject1) {
    const { authorId, stories } = firstStoryObject1;

    // console.log("Author ID  2 is:", authorId);
    localStorage.setItem("aid2", authorId)
    if (stories && stories.length > 0) {
      const firstStoryInArray1 = stories[0];
      localStorage.setItem("stid2", firstStoryInArray1._id)
      localStorage.setItem("second-title", firstStoryInArray1.coverTitle)
      localStorage.setItem("second-im", firstStoryInArray1.backgroundImage)
      localStorage.setItem("second-auth", firstStoryInArray1.authorName)
      localStorage.setItem("second-description", firstStoryInArray1.description)

      localStorage.setItem("second-auth", firstStoryInArray1.authorName)
      localStorage.setItem("second-date", firstStoryInArray1.dateOfPublication)
      localStorage.setItem("second-routineType", firstStoryInArray1.genre)
      localStorage.setItem("second-coverTitle", firstStoryInArray1.coverTitle)



      if (firstStoryInArray1.episodes && firstStoryInArray1.episodes.length > 0) {
        const firstEpisode1 = firstStoryInArray1.episodes[0];
        if (firstEpisode1 && firstEpisode1.description) {
          localStorage.setItem("second-recomended", firstEpisode1.description);
        }
      } else {

        // console.log("No episodes found or episodes array is not defined.");
      }
    } else {
      // console.error("No stories found in the 'stories' array of the first object.");
    }
  } else {
    // console.error("No objects found in recomendedStory array or recomendedStory is not properly initialized.");
  }

  const desc2 = localStorage.getItem("second-desc");
  const im2 = localStorage.getItem("second-im");
  const a2 = localStorage.getItem("second-auth");
  const title2 = localStorage.getItem("second-title")
  const i2 = localStorage.getItem("second-im")
  const description2 = localStorage.getItem("second-description")


  const firstStoryObject2 = recomendedStory && recomendedStory.length > 0 ? recomendedStory[3] : null;

  if (firstStoryObject2) {
    const { authorId, stories } = firstStoryObject2;
    localStorage.setItem("aid3", authorId)
    if (stories && stories.length > 0) {
      const firstStoryInArray2 = stories[0];
      localStorage.setItem("stid3", firstStoryInArray2._id)
      localStorage.setItem("third-im", firstStoryInArray2.backgroundImage)
      localStorage.setItem("third-auth", firstStoryInArray2.authorName)
      localStorage.setItem("third-title", firstStoryInArray2.coverTitle)
      localStorage.setItem("third-date", firstStoryInArray2.dateOfPublication)
      localStorage.setItem("third-routine", firstStoryInArray2.genre)
      localStorage.setItem("third-description", firstStoryInArray2.description)



      if (firstStoryInArray2.episodes && firstStoryInArray2.episodes.length > 0) {
        const firstEpisode2 = firstStoryInArray2.episodes[0];
        if (firstEpisode2 && firstEpisode2.description) {
          localStorage.setItem("third-recomended", firstEpisode2.description);
        }
      } else {

        // console.log("No episodes found or episodes array is not defined.");
      }
    } else {
      // console.error("No stories found in the 'stories' array of the first object.");
    }
  } else {
    // console.error("No objects found in recomendedStory array or recomendedStory is not properly initialized.");
  }

  const desc3 = localStorage.getItem("third-desc");
  const im3 = localStorage.getItem("third-im");
  const a3 = localStorage.getItem("third-auth");
  const title3 = localStorage.getItem("third-title");
  const description3 = localStorage.getItem("third-description")





  const firstStoryObject3 = recomendedStory && recomendedStory.length > 0 ? recomendedStory[5] : null;

  if (firstStoryObject3) {
    const { authorId, stories } = firstStoryObject3;
    localStorage.setItem("aid4", authorId)
    if (stories && stories.length > 0) {
      const firstStoryInArray3 = stories[0];
      localStorage.setItem("stid4", firstStoryInArray3._id)
      if (firstStoryInArray3 && firstStoryInArray3.description) {
        localStorage.setItem("fourth-desc", firstStoryInArray3.description);
      }
      localStorage.setItem("fourth-title", firstStoryInArray3.coverTitle)
      localStorage.setItem("fourth-im", firstStoryInArray3.backgroundImage)
      localStorage.setItem("fourth-auth", firstStoryInArray3.authorName)
      if (firstStoryInArray3.episodes && firstStoryInArray3.episodes.length > 0) {
        const firstEpisode3 = firstStoryInArray3.episodes[0];
        if (firstEpisode3 && firstEpisode3.description) {
          localStorage.setItem("fourth-recomended", firstEpisode3.description);
        }
      } else {

        // console.log("No episodes found or episodes array is not defined.");
      }
    } else {
      // console.error("No stories found in the 'stories' array of the first object.");
    }
  } else {
    // console.error("No objects found in recomendedStory array or recomendedStory is not properly initialized.");
  }

  const desc4 = localStorage.getItem("fourth-desc");
  const im4 = localStorage.getItem("fourth-im");
  const a4 = localStorage.getItem("fourth-auth");
  const title4 = localStorage.getItem("fourth-title")
  const fourth = localStorage.getItem("fourth-recomended")
  const f4 = localStorage.getItem("f4")




  const firstStoryObject5 = recomendedStory && recomendedStory.length > 0 ? recomendedStory[4] : null;

  if (firstStoryObject) {
    const { authorId, stories } = firstStoryObject5;
    localStorage.setItem("aid6", authorId)
    if (stories && stories.length > 0) {
      const firstStoryInArray5 = stories[0];
      localStorage.setItem("stid6", firstStoryInArray5._id)
      if (firstStoryInArray5 && firstStoryInArray5.description) {
        localStorage.setItem("sixth-desc", firstStoryInArray5.description);
      }
      localStorage.setItem("sixth-title", firstStoryInArray5.coverTitle)
      localStorage.setItem("sixth-im", firstStoryInArray5.backgroundImage)
      localStorage.setItem("sixth-auth", firstStoryInArray5.authorName)
      if (firstStoryInArray5.episodes && firstStoryInArray5.episodes.length > 0) {
        const firstEpisode5 = firstStoryInArray5.episodes[0];
        if (firstEpisode5 && firstEpisode5.description) {
          localStorage.setItem("sixth-description", firstEpisode5.description);
        }
      } else {

        // console.log("No episodes found or episodes array is not defined.");
      }
    } else {
      // console.error("No stories found in the 'stories' array of the first object.");
    }
  } else {
    // console.error("No objects found in recomendedStory array or recomendedStory is not properly initialized.");
  }

  const desc6 = localStorage.getItem("sixth-desc");
  const im6 = localStorage.getItem("sixth-im");
  const a6 = localStorage.getItem("sixth-auth");
  const title6 = localStorage.getItem("sixth-title")
  const sixth = localStorage.getItem("sixth-recomended")
  const description6 = localStorage.getItem("sixth-description")
  const first = localStorage.getItem("first-recomended");
  const first120Chars = first && first.substring(0, 120);
  const second = localStorage.getItem("second-recomended");

  const third = localStorage.getItem("third-recomended");
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
  const [isHovered, setIsHovered] = useState(true);

  //Howering functionality of Images (Recomended)
  const [hoveredIndex, setHoveredIndex] = useState(0);
  const [hoveredIndex1, setHoveredIndex1] = useState(1);
  const [hoveredIndex2, setHoveredIndex2] = useState(1);
  const [hoveredIndex3, setHoveredIndex3] = useState(1);
  const [hoveredIndex4, setHoveredIndex4] = useState(1);
  const [hoveredIndex5, setHoveredIndex5] = useState(1);
  const [hoveredIndex6, setHoveredIndex6] = useState(1);

  useEffect(() => {

    setHoveredIndex(0);
    setHoveredIndex1(1);
    setHoveredIndex2(1);
    setHoveredIndex3(1);
    setHoveredIndex4(1);
    setHoveredIndex5(1);
  }, []);



  return (


    <>
      <div className="frame-title-wrap backk" id={id}  >
        <img
          className="logo-minimal-icon3 icon-3-logo"
          loading="eager"
          alt=""
          src="/SVG/logo_minimal.svg"
        />
        <h1 className="h13">지금 주목 받는 작가의 필드</h1>
      </div>

      <div className='container11 backk' onMouseLeave={() => setHoveredIndex(0)} onMouseEnter={() => setHoveredIndex(-1)}
      >


        <div className={`card112 ${hoveredIndex === 0 ? 'default-hover' : ''}`}
          onMouseEnter={() => setHoveredIndex(0)}
          onMouseLeave={() => setHoveredIndex(-1)}>

          <img
            src={i1
              ? (i1.includes("/images")
                ? `https://aper.cc/${i1}`
                : `https://backend.aper.cc/${i1}`)
              : 'def'} />

          {hoveredIndex === 0 && (
            <div className="content-container" data-aos="fade-up">
              <div className='pen-main' onClick={handleNavigatetoProfileAuthor}>
                <div>{a1}</div>
                {/* <img  className='mainmen1'  src="/SVG/ic_enter_arrow (2).svg"/> */}
                <div className='arr-d'>
                  <img className='mainmen1' src="/SVG/ic_enter_arrow (2).svg" style={{ width: '20px', height: '20px', marginRight: '5px' }} />
                  작가의 필드 바로 가기 </div>
                {/* <p className="  mainmen1">  <img  src="/SVG/ic_enter_arrow (2).svg"/> {title1}</p> */}
              </div>
              {description1 && (
                <div className='wr'>{description1}</div>
              )}
            </div>
          )}
        </div>
        <div className={`card112 ${hoveredIndex1 === 0 ? 'hovered' : ''}`}
          onMouseEnter={() => setHoveredIndex1(0)}
          onMouseLeave={() => setHoveredIndex1(-1)}
        >
          <img
            src={i2
              ? (i2.includes("/images")
                ? `https://aper.cc/${i2}`
                : `https://backend.aper.cc/${i2}`)
              : 'def'} />
          {hoveredIndex1 === 0 && (
            <div className="content-container" data-aos="fade-up">
              <div className='pen-main' onClick={handleNavigatetoProfileAuthor2}>
                <div>{a2}</div>
                <div className='arr-d'>
                  <img className='mainmen1' src="/SVG/ic_enter_arrow (2).svg" style={{ width: '20px', height: '20px', marginRight: '5px' }} />
                  작가의 필드 바로 가기</div>
              </div>
              {description2 && (
                <div className='wr'>{description2}</div>
              )}
            </div>
          )}



        </div>
        <div className='description'>Description 2</div>

        <div className={`card112 ${hoveredIndex2 === 0 ? 'hovered' : ''}`}
          onMouseEnter={() => setHoveredIndex2(0)}
          onMouseLeave={() => setHoveredIndex2(-1)}>
          <img
            src={im3
              ? (im3.includes("/images")
                ? `https://aper.cc/${im3}`
                : `https://backend.aper.cc/${im3}`)
              : 'def'} />
          {hoveredIndex2 === 0 && (
            <div className="content-container" data-aos="fade-up" >
              <div className='pen-main' onClick={handleNavigatetoProfileAuthor3} >
                <div>{a3}</div>
                <div className='arr-d'>
                  <img className='mainmen1' src="/SVG/ic_enter_arrow (2).svg" style={{ width: '20px', height: '20px', marginRight: '5px' }} />
                  작가의 필드 바로 가기</div>
              </div>
              {description3 && (
                <div className='wr'>{description3}</div>
              )}
            </div>
          )}

        </div>
        <div className='description'>Description 3</div>
        <div className={`card112 ${hoveredIndex3 === 0 ? 'hovered' : ''}`}
          onMouseEnter={() => setHoveredIndex3(0)}
          onMouseLeave={() => setHoveredIndex3(-1)}>

          <img
            src={im4
              ? (im4.includes("/images")
                ? `https://aper.cc/${im4}`
                : `https://backend.aper.cc/${im4}`)
              : 'def'} />
          {hoveredIndex3 === 0 && (
            <div className="content-container" data-aos="fade-up" >
              <div className='pen-main' onClick={handleNavigatetoProfileAuthor4}>
                <div>{a4}</div>
                <span className='arr-d'>
                  <img className='mainmen1' src="/SVG/ic_enter_arrow (2).svg" style={{ width: '20px', height: '20px', marginRight: '5px' }} />
                  작가의 필드 바로 가기</span>
              </div>
              {desc4 && (
                <div className='wr'>{desc4}</div>
              )}
            </div>
          )}

        </div>
        <div className='description'>Description 4</div>

        <div className={`card112 ${hoveredIndex4 === 0 ? 'hovered' : ''}`}
          onMouseEnter={() => setHoveredIndex4(0)}
          onMouseLeave={() => setHoveredIndex4(-1)}>
          <img
            src={im5
              ? (im5.includes("/images")
                ? `https://aper.cc/${im5}`
                : `https://backend.aper.cc/${im5}`)
              : 'def'} />
          {hoveredIndex4 === 0 && (
            <div className="content-container" data-aos="fade-up" >
              <div className='pen-main' onClick={handleNavigatetoProfileAuthor5}>
                <div>{a5}</div>
                <span className='arr-d'>
                  <img className='mainmen1' src="/SVG/ic_enter_arrow (2).svg" style={{ width: '20px', height: '20px', marginRight: '5px' }} />
                  작가의 필드 바로 가기
                </span>
              </div>
              {description5 && (
                <div className='wr'>{description5}</div>
              )}
            </div>
          )}
        </div>
        <div className='description'>Description 5</div>
        <div className={`card112 ${hoveredIndex5 === 0 ? 'hovered' : ''}`}
          onMouseEnter={() => setHoveredIndex5(0)}
          onMouseLeave={() => setHoveredIndex5(-1)}
        >
          <img

            src={im6
              ? (im6.includes("/images")
                ? `https://aper.cc/${im6}`
                : `https://backend.aper.cc/${im6}`)
              : 'def'} />
          {hoveredIndex5 === 0 && (
            <div className="content-container" data-aos="fade-up">
              <div className='pen-main' onClick={handleNavigatetoProfileAuthor6}>
                <div>{a6}</div>
                <div className='arr-d'>
                  <img className='mainmen1' src="/SVG/ic_enter_arrow (2).svg" style={{ width: '20px', height: '20px', marginRight: '5px' }} />
                  작가의 필드 바로 가기
                </div>
              </div>
              {desc6 && (
                <div className='wr'>{desc6}</div>
              )}
            </div>
          )}
        </div>
        <div className='description'>Description </div>


      </div>
    </>
  )
}

export default Recomended


