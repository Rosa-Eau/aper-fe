import React from 'react';
import './RecomendedMobile.css';
import FrameComponent4 from './frame-component4';
import FrameComponent3 from './frame-component3';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';

const RecomendedMobile = () => {
  const [selectedItem, setSelectedItem] = useState(1);
  const [clicked1, isClicked1] = useState(false)
  const [clicked2, isClicked2] = useState(false)
  const [clicked3, isClicked3] = useState(false)
  const [recomendedStory, setRecomendedStory] = useState([]);

  const handleItemClick = (item) => {
    setSelectedItem(item);

    if (item == 1) {
      isClicked1(true)
      isClicked2(false)
      isClicked3(false)
    }
    if (item == 2) {
      isClicked2(true)
      isClicked3(false)
      isClicked1(false)
    }
    if (item == 3) {
      isClicked3(true)
      isClicked1(false)
      isClicked2(false)
    }
  };



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



          if (responseData.data && Array.isArray(responseData.data)) {
            const lastThreeResponses = responseData.data.slice(0, -1).slice(-6);
            setRecomendedStory(lastThreeResponses);
          } else {
            console.error("Invalid or empty 'stories' array in API response data");
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

      // console.log("First Story Description-----------:", firstStoryInArray.description);
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

        // console.log("No episodes found or episodes array is not defined.");
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
    localStorage.setItem("aid2", authorId)


    if (stories && stories.length > 0) {
      const firstStoryInArray1 = stories[0];
      // console.log("First Story Description-----------:", firstStoryInArray1.description);
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


      // console.log("First Story Description-----------:", firstStoryInArray3.description);
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

      // console.log("First Story Description-----------:", firstStoryInArray5.description);
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



  // const stid1 = localStorage.getItem("stid1")
  // const stid2 = localStorage.getItem("stid2")
  //   const first = localStorage.getItem("first-recomended");
  //   const first120Chars =  first && first.substring(0, 120);
  //   const second = localStorage.getItem("second-recomended" );

  //   const third = localStorage.getItem("third-recomended");
  const [isPopupVisible, setPopupVisible] = useState(false);

  const navigate = useNavigate();
  const first = localStorage.getItem("first-recomended");
  // const a1 = localStorage.getItem("first-auth");
  const routine1 = localStorage.getItem("first-routineType");
  const date1 = localStorage.getItem("first-date");
  const first120Chars = first && first.substring(0, 120);
  const firstTitle = localStorage.getItem("first-title");
  const second = localStorage.getItem("second-recomended");
  const second120Chars = second && second.substring(0, 120);
  const third = localStorage.getItem("third-recomended");
  const third120Chars = third && third.substring(0, 120);
  // const a2 = localStorage.getItem("second-auth");
  const date2 = localStorage.getItem("second-date");
  const routine2 = localStorage.getItem("second-routineType");
  const secondTitlle = localStorage.getItem("second-coverTitle");
  // const a3 = localStorage.getItem("third-auth");
  const thirdTitle = localStorage.getItem("third-title");
  const date3 = localStorage.getItem("third-date");
  const routine3 = localStorage.getItem("third-routine");

  const handleNavigateAper = () => {
    navigate('/login');
  };

  document.addEventListener('DOMContentLoaded', function () {
    var paginationItems = document.querySelectorAll('.pagination span');

    paginationItems.forEach(function (item, index) {
      item.addEventListener('click', function () {
        // Remove 'active' class from all items
        paginationItems.forEach(function (item) {
          item.classList.remove('active');
        });
        this.classList.add('active');

      });
    });
  });

  return (
    <div>
      <div className="yy">
        <b>추천하는 이야기</b>
      </div>
      <FrameComponent4
        data={
          selectedItem === 1
            ? { author: a1, routine: routine1, title: first120Chars, date: date1, storyId: localStorage.getItem('stid1') }
            : selectedItem === 2
              ? { author: a2, routine: routine2, title: second120Chars, date: date2, storyId: localStorage.getItem('stid2') }
              : selectedItem === 3
                ? { author: a3, routine: routine3, title: third120Chars, date: date3, storyId: localStorage.getItem('stid3') }
                : null
        }
      />
      <FrameComponent3
        data={
          selectedItem === 1
            ? { author: a1, routine: routine1, title: firstTitle, date: date1, storyId: localStorage.getItem('stid1') }
            : selectedItem === 2
              ? { author: a2, routine: routine2, title: secondTitlle, date: date2, storyId: localStorage.getItem('stid2') }
              : selectedItem === 3
                ? { author: a3, routine: routine3, title: thirdTitle, date: date3, storyId: localStorage.getItem('stid3') }
                : null
        }
      />
      <div className="pagination">
        {/* <span class="active">-</span> */}
        <div onClick={() => handleItemClick(1)} style={{
          width: '50px',
          height: '5px',
          backgroundColor: clicked1 ? 'black' : '#D3D3D3',
          cursor: 'pointer',

        }}>  </div>
        <div onClick={() => handleItemClick(2)}
          style={{
            width: '50px',
            height: '5px',
            backgroundColor: clicked2 ? 'black' : '#D3D3D3',
            cursor: 'pointer',

          }}> </div>
        <div onClick={() => handleItemClick(3)}

          style={{
            width: '50px',
            height: '5px',
            backgroundColor: clicked3 ? 'black' : '#D3D3D3',
            cursor: 'pointer',

          }}
        ></div>
      </div>


    </div>
  );
};

export default RecomendedMobile;
