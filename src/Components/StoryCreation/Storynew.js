import React from 'react';
import { useState,useEffect } from 'react';
import './Story.css'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate ,  useLocation} from 'react-router-dom';
import { updateEpisodeCount } from '../../redux/action';
import { useParams } from 'react-router-dom';
import { useRef } from 'react';
import Switch from './Switch';
import { setUserData ,setSignupSuccess} from "../../redux/action";
import NewGnbM from '../Navbar/new-gnb-m';
import { saveData } from "../../redux/action";
import Navbar1 from '../Navbar/Navbar';
import "./Storynew.css"

const StoryNew = () => {
  const tableRef = useRef(null);
  const tableRef1 = useRef(null);
  const tableRefex = useRef(null);
  const tableRefex2 = useRef(null);

  const {storyId} = useParams();

 
  
    const [value,setValue] = useState(false)
  const penUser = localStorage.getItem('penNameUser')
  const emailUser = localStorage.getItem('emailUser')
  const [descriptionClicked,setDescriptionClicked] = useState(null)
  const imageSrc= localStorage.getItem('imageurl')
  const [genre, setGenre] = useState('');
const [lineStyle, setLineStyle] = useState('');

 
  const authorId = localStorage.getItem('authorId');
  const episodeId = localStorage.getItem('episodeId');
  const data = useSelector((state) => state. userData);

  localStorage.setItem('pen', data.penName);
  const storedPenName = localStorage.getItem('pen');
  const storedRoutineType = localStorage.getItem('routineType');
  // const [initialRender, setInitialRender] = useState(true);


  // const storyId = localStorage.getItem('id');


  
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
  
  
  const routineCreationKey = `routineCreated_${storyId}`;
  const [episodeCount, setEpisodeCount] = useState(0);
  const [initialRender, setInitialRender] = useState(true);
  
  useEffect(() => {
   
    const routineCreated = localStorage.getItem(routineCreationKey);
   
  
    if (storedRoutineType === '단편' && !routineCreated) {
      setEpisodesData([])
      
     
      for (let i = 0; i < 5; i++) {
        createEpisode();
      }
      setEpisodeCount(5)
     
      localStorage.setItem(routineCreationKey, 'true');

      setInitialRender(false);
    }
    if (storedRoutineType === '장편' && !routineCreated) {
      setEpisodesData([])
     
      for (let i = 0; i < 10; i++) {
        createEpisode();
        
      }
  
      localStorage.setItem(routineCreationKey, 'true');
  
      // Update state to indicate that the initial render has occurred
      setInitialRender(false);
      setEpisodeCount(9)
    }
    
    if (storedRoutineType === '시집' && !routineCreated) {
      setEpisodesData([])
     
      for (let i = 0; i < 50; i++) {
        createEpisode();
        
      }
  
      localStorage.setItem(routineCreationKey, 'true');

      setInitialRender(false);
      setEpisodeCount(49)
    }
  }, [storedRoutineType, routineCreationKey]);



  // console.log('changed Routine' + storedRoutineType)
const storedTitle = localStorage.getItem('title');
const storedGenre = localStorage.getItem('genre');
const storedWritingStyle = localStorage.getItem('writingStyle');
const dop1= localStorage.getItem('dateofpub');
 const dop =  dop1 && dop1.split("T")[0];
//  const storyId = localStorage.getItem('id');  

//  console.log("storyId is" + storyId)
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


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (tableRef.current && !tableRef.current.contains(event.target)  &&
      tableRefex2.current && !tableRefex2.current.contains(event.target)) {
        // console.log("Clicked outside the table");
        setTableVisible(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [tableRef]);

  const [isTableVisible3, setTableVisible3] = useState(false);
  const [currentEpisodeId, setCurrentEpisodeId] = useState(1);
  const [episodes, setEpisodes] = useState([]);
  const [activeEpisode, setActiveEpisode] = useState(null);
  const [creationDate, setCreationDate] = useState('');
  const [isTableVisible1, setTableVisible1] = useState(false);

  
  const [edit2, setEdit2] = useState(false);
  // const [textValue, setTextValue] = useState(localStorage.getItem(`storyText_${storyId}_${episodeId}`) || '');
  // const [titlleValue, setTitleValue] = useState(localStorage.getItem(`titleText_${storyId}_${episodeId}`) || '');
  const [textValue ,setTextValue]= useState('')
const [titlleValue,setTitleValue] = useState('')
  const [showFullDescription, setShowFullDescription] = useState(false);
  const dispatch = useDispatch();
  
  const navigate = useNavigate();
  const [toastVisible, setToastVisible] = useState(false)
  const handleToast = ()=>{
    setToastVisible(true)
  }
  useEffect(() => {
    let timeout;
    if (toastVisible) {
        timeout = setTimeout(() => {
            setToastVisible(false);
        }, 2000); 
    }

    return () => clearTimeout(timeout);
}, [toastVisible]);

const [fontdata,setFont]= useState('')


const[stTitle,setStTitle]= useState('');
const[stRoutine,setStRoutine]= useState('');
const [stGenere,setStGenere]= useState('');
const [stDate,setstCreated] = useState('')
const [ stData1,setStData1] = useState([])
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
      //  console.log("sresuly of piublish ......................" +responseData.data.isPublished)

       setFont(responseData.data)
       const stTitle = responseData.data.coverTitle;
       const stRoutine = responseData.data.routineType;
       const stGenere = responseData.data.genre;
       const stDate = responseData.data.createdAt;
      
       setStData1(responseData.data)
       setStTitle(stTitle);
       setStRoutine(stRoutine);
       setStGenere(stGenere);
       setstCreated(stDate);
    clickToggle1(responseData.data.isPublished)
    

      } catch (error) {
        // console.error('Error fetching episodes data:', error.message);
      }
    };

    fetchData();
 
  },[storyId,lineStyle]); 
  


 const  clickToggle1 = (val)=> {
    
    const checkbox = document.querySelector('#flexSwitchCheckDefault');
    
   
    if (checkbox) {
        checkbox.checked = !val;
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
      
        
        // console.log('User details:', userDetails);
      } catch (error) {
        // console.error('Error fetching user details:', error.message);
      }
    };

  
    fetchData();
  }, []); 

  const image = localStorage.getItem('backgroundImage');

  

  const createEpisode = async() => {
    // setEpisodeCount(episodeCount + 1);
    // localStorage.setItem('areEpisodesCreated', episodeCount + 1);
    


    const authorid = localStorage.getItem('authorId'); 
    // const storyId = localStorage.getItem('id');  
    const token = JSON.parse(localStorage.getItem('token'));
    try {


      if (storedRoutineType === '단편') {
        const areEpisodesCreated = localStorage.getItem('areEpisodesCreated');
    
        // if (areEpisodesCreated >= 5) {
        //   alert('Cannot create more than 5 episodes for 단편 type.');
        //   return;
        // }
      }


      if (storedRoutineType === '장편') {
        const areEpisodesCreated = localStorage.getItem('areEpisodesCreated');
    
        // if (areEpisodesCreated >= 10) {
        //   alert('Cannot create more than 5 episodes for 장편 type.');
        //   return;
        // }
      }

      if(storedRoutineType === ' 시집'){
        const areEpisodesCreated = localStorage.getItem('areEpisodesCreated');
        // if(areEpisodesCreated >=15){
        //   alert("cannot create more than 15 Episodes in  시집 type")
        // }
      }

      
      const response = await fetch('https://backend.aper.cc/story/add-episode', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, 
        },
        body: JSON.stringify({
          storyId:storyId,
          authorId: authorid,
          episodeTitle: titlleValue,
          description: textValue,
          routineType: storedRoutineType,
          genre: storedGenre,
          coverTitle : storedTitle
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create episode');
      }

      const responseData = await response.json();
       console.log('POST request successful:');
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
      // const storyId = localStorage.getItem('id');
      const token = JSON.parse(localStorage.getItem('token'));
      const episodeId = localStorage.getItem('episodeId'); // Include episodeId in dependencies
      
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
        setEpisodesData(responseData.data);
      
        
        
      } catch (error) {
        // console.error('Error fetching episodes data:', error.message);
      }
    };
    fetchData();
  }, [episodeId]); 



  
  const  clickToggle = (isPublished, toggleId)=> {
    
    const checkbox = document.querySelector(`#${toggleId}`);
   
    if (checkbox) {
        checkbox.checked = !isPublished;
       
    } 

 
}


  localStorage.setItem('episode-length',episodesData.length + 1)
  const cnt11 = localStorage.getItem('episode-length')


  useEffect(() => {
    
    const areEpisodesCreated = localStorage.getItem('areEpisodesCreated');
    if (areEpisodesCreated) {
      
      setEpisodeCount(parseInt(areEpisodesCreated, 10));
    }
  }, []);



  const handleEpisodeClick = async (episodeIndex,episodeDescription) => {
   
    if (episodesData.length > 0) {
      
      const clickedEpisode = episodesData[episodeIndex];
  
      
      if (clickedEpisode) {
        const episodeId = clickedEpisode._id;
  
       
        const isFirstClick = localStorage.getItem(`episodeClicked_${episodeId}`) !== 'true';
  
       
        localStorage.setItem(`episodeClicked_${episodeId}`, 'true');
  
        
        if (isFirstClick) {
          navigate(`/user/slide/story/storycontent/${episodeId}`,{state:{ storyId1: storyId,episodeNumber:episodeIndex + 1}});
        } else {
         
          const handleSaveData = () => {
            navigate(`/user/slide/story/storycontent/view/${episodeId}/${storyId}`, { state: { textValue: episodeDescription ,episodeNumber:episodeIndex + 1,storyId1:storyId } });
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
  setDelete2(!delete2);
 
};

  const handleToggle = () => {
    setToggleOn(!isToggleOn);
  };


   const handleStory = () =>{
    navigate('/user/slide/story/storycontent')
   }
  const [isAddIconClicked, setAddIconClicked] = useState(false);
  const location = useLocation();
  useEffect(() => {
    
    if (location.state && location.state.isAddIconClicked) {
      setAddIconClicked(true);
    }
  }, [location.state]);




  






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
      

  
      const token = JSON.parse(localStorage.getItem("token"));
      
      if (!token) {
        
        return;
      }
  
      
  
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
      localStorage.removeItem('authorId');
      localStorage.removeItem('id');
      console.log('Data deleted successfully');

     
      setModal(false);
      navigate('/user/slide')
    } catch (error) {
      // console.error('Error deleting data:', error.message);
      // console.log('Error deleting data:', error.message);
    }
  };

  const handleLogout = ()=>{
    localStorage.clear();
    navigate('/login')
  }


  const togglDeleteEpisodeOne = async(episodeIdnew,episodeIndex)=>{
    try {    
      const author1Id = localStorage.getItem('authorId'); 
      const token = JSON.parse(localStorage.getItem("token"));
      if (!token) {
  
        return;
      }
  
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
      setEpisodeCount(episodeCount-1);
      localStorage.setItem('areEpisodesCreated', episodeCount - 1);
      setTableVisible1(false);
      setDelete2(!delete2)

      console.log('Data deleted successfully');
     
      const updatedEpisodes = episodesData.filter((_, selectedEpisodeIndex) => selectedEpisodeIndex !== episodeIndex);
      setEpisodesData(updatedEpisodes);
      
    } catch (error) {
      // console.error('Error deleting data:', error.message);
    
    }

  }


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
      const stTitle = responseData.data.coverTitle;
      const stRoutine = responseData.data.routineType;
      const stGenere = responseData.data.genre;
      const stDate = responseData.data.createdAt;
     
      setStData1(responseData.data)
      setStTitle(stTitle);
      setStRoutine(stRoutine);
      setStGenere(stGenere);
      setstCreated(stDate);
            
    } catch (error) {
      // console.error('Error fetching episodes data:', error.message);
    }
  };
  const handleEditStory = async () => {
    try {
      dispatch(saveData({ title, genre, lineStyle }));
      const authorid = localStorage.getItem('authorId');
      const storyId = localStorage.getItem('id');
      const token = JSON.parse(localStorage.getItem('token'));
      const apiUrl = `https://backend.aper.cc/story/updateStory/${storyId}`;
  
      const prevTitle = localStorage.getItem('title');
      const prevGenre = localStorage.getItem('genre');
      const prevLineStyle = localStorage.getItem('writingStyle');

      const requestBody = {};
      let shouldUpdate = false;
  
      if (title !== prevTitle && title.trim() !== '') {
        requestBody.coverTitle = title;
        shouldUpdate = true;
      } else {
        requestBody.coverTitle = prevTitle;
      }
      if (genre !== prevGenre && genre.trim() !== '') {
        requestBody.genre = genre;
        shouldUpdate = true;
      } else {
        requestBody.genre = prevGenre;
      }
      if (lineStyle !== prevLineStyle && lineStyle.trim() !== '') {
        requestBody.lineStyle = lineStyle;
        shouldUpdate = true;
      } else {
        requestBody.lineStyle = prevLineStyle;
      }
  
      if (!shouldUpdate) {
        console.log('No changes detected. Previous values retained.');
        setDelete1(false);
        return;
      }
  
      const response = await fetch(apiUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          accept: 'application/json',
        },
        body: JSON.stringify(requestBody),
      });
  
      if (!response.ok) {
        throw new Error(`Failed to update story. Status: ${response.status}`);
      }
  
      console.log('Story updated successfully');
  
      localStorage.setItem('title', requestBody.coverTitle);
      localStorage.setItem('genre', requestBody.genre);
      localStorage.setItem('writingStyle', requestBody.lineStyle);
  
      const responseData = await response.json();
      const stTitle = responseData.data.coverTitle;
      const stRoutine = responseData.data.routineType;
      const stGenere = responseData.data.genre;
      const stDate = responseData.data.createdAt;
      setStData1(responseData.data);
      setStTitle(stTitle);
      setStRoutine(stRoutine);
      setStGenere(stGenere);
      setstCreated(stDate);
      fetchData();
      setDelete1(false);
    } catch (error) {
      console.error('Error updating story:', error.message);
    }
  };
  


  const [title, setTitle] = useState(stTitle);
  
  const handleEditTitle = (e) => {
    setTitle(e.target.value);
    setStTitle(e.target.value)
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




const HandleProfileNavigate = ()=>{
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

  const HandleNavigateToSearch = ()=>{
    navigate('/search')
  }


  const moreMainRef = useRef(null);

  useEffect(() => {
   
    const handleClickOutside = (event) => {
      if (moreMainRef.current && !moreMainRef.current.contains(event.target)  &&
      tableRefex.current && !tableRefex.current.contains(event.target)) {
        
        setTableVisible(false);
        setSelectedEpisodeIndex(null);
      }
    };

    
    document.addEventListener('mousedown', handleClickOutside);

    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


const [toggleClick, setToggleClick] = useState(false);

useEffect(() => {
  const countCharacters = (inputText) => {
    const allCharactersPattern = /[^\s]/g;
    const allMatches = inputText.match(allCharactersPattern);
    return allMatches ? allMatches.length : 0;
  };

  const updatedToggleStates = episodesData.map((episode) => {
    const descriptionCharacterCount = countCharacters(episode.description);
 

    return descriptionCharacterCount;
  });

}, [episodesData]);

  
const handleGenreChange = (genre) => {
  const selectedGenre = genre;
setGenre(selectedGenre);
};


const handleWritingStyleChange = (style) => {
  const newWritingStyle = style;
  setLineStyle(newWritingStyle);
 
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

  const handleNavigateAper = () => {
    navigate('/login');
  };
  
  


  return (
    <>
    <div className=''>
{/* <Navbar1/> */}
{isMobile ? <NewGnbM /> :  <Navbar1 />}
  <div className='outer-div-1   story-media'>
   <div className='main-horizontal'>
      <div className='main-title'>
      <div className="custom-line"></div>
      <div className='text textroutine'  style={{paddingBottom : '5px'}}>{stRoutine}</div>

      </div>
      {token &&
      <div className='main-toggle'>
       <div className='toggle-name'>
       <div className="form-check form-switch" style={{ display: 'flex', alignItems: 'center' }}>
  <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" style={{ display: 'flex', alignItems: 'center' }}
    defaultChecked
    
     
  />
  
  <b  className='text-main'
   style={{ fontFamily: `${fontdata.lineStyle}, sans-serif`}}
  >비공개</b>
 
  
</div>


 
       </div>
       <div className='more-main'   onClick={handleMoreClick}  ref={tableRef} >
       <img  src='/SVG/ic_more_horiz.svg' />
       </div>
       <div>
      {isLinkCopied && (
    <div className="link-copied">Link Copied</div>
  )}
  </div>
      </div>
      }
      

   </div>
   
   <div className='second-horizontal'>
     <div className='first-horizontal-1'>
        <div className='col-horizontal-1 custom-text1'
        style={{ fontFamily: `${fontdata.lineStyle}, sans-serif`}}>
        {stTitle}
        </div>
        <div className='col-horizontal-2'>
        <div className=""  style={{ position: 'relative' }}>
  
    <div className="genre-date-for-story-sv">
              <div className="field-thumb-sv">
                <div className="field-list-imgfalsefalsethu-sv">
                  <img
                    className="pic-fieldprof-08-icon-sv"
                    loading="eager"
                    alt=""
                    src={fontdata.backgroundImage
            ? (fontdata.backgroundImage.includes("/images")
              ? `https://aper.cc/${fontdata.backgroundImage}`
              : `https://backend.aper.cc/${fontdata.backgroundImage}`)
            : 'defaultImageURL'}
                  />
                </div>
                <b className="b2-sv"
                style={{ fontFamily: `${fontdata.lineStyle}, sans-serif`}}
                >{fontdata.authorName}</b>
              </div>
              <div className="logo-instance-sv">
                <div className="search-and-write-in-g-n-b-sv" />
              </div>
              <div className="sidebar-trail-sv">
                <div className="div17-sv"
                style={{ fontFamily: `${fontdata.lineStyle}, sans-serif`}}
                >{stGenere}</div>
              </div>
              
              <div className="logo-instance1-sv">
                <div className="logo-instance-child-sv" />
              </div>
              <div className="date-sv">
              <div className="top-level-frame-sv" style={{ fontFamily: `${fontdata.lineStyle}, sans-serif` }}>
  {stDate && stDate.split("T")[0].replaceAll("-", ".")}
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
        </div>

     </div>
     <div className='second-horizontal-1'>
     {isTableVisible && (
                      <div className="story-table  "   ref={tableRefex2} >
                      <table>
                       <tbody  className="design-table">
                        <tr  >
                            <td className="font-table111"   onClick={togglDelete}>커버 편집</td>
                           </tr>
                           <tr  >
                             <td className="font-table111 "  onClick={copyCurrentPageLink } >이야기 공유</td>
                           </tr>
                           <tr>
                             <td className="font-table111"   onClick={toggleModal}>삭제</td>
                           </tr>
                       </tbody>
                       </table>
                       </div>
                    )}
        
        </div>

   </div>
  </div>
  <div style={{ width: '100%', height: '1px', position: 'relative', background: 'rgba(0, 0, 0, 0.20)',marginTop:'20px' }}></div>
  
  <div style={{ width: '100%', height: '1px', position: 'relative', background: 'rgba(0, 0, 0, 0.20)',marginTop:'2px' }}></div>

<div className='outer-div-'>


{episodesData.map(( episode,index)=> (
  <React.Fragment  key={index}>
  <div className='outer-div-1'>

		<div className="extra-div" >
    
    
 		 <div className="">
      <div   className="" >
        
        
         
          <div className="replacement-ui"  >
          <div className='main-horizontal'>
      <div className='main-title'>  
      <div className='line-r'>
      <div className='head' 
      style={{ fontFamily: `${fontdata.lineStyle}, sans-serif`}}

      onClick={async () => {
      if (!token) {
        handleNavigateAper();
      } else {
        await handleEpisodeClick(index)
      }
    }}
      //  onClick={async () => await handleEpisodeClick(index)} 
       >
  {index + 1}화. 
  
</div>
<b className='head2'
style={{ fontFamily: `${fontdata.lineStyle}, sans-serif`}}
>{episode.episodeTitle}</b>
</div>

      </div>
      {token &&
      <div className='main-toggle'>
       <div className='toggle-name'>
       <div className="form-check form-switch" style={{ display: 'flex', alignItems: 'center' }}>
  <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" 
 
    defaultChecked={!toggleClick}
  />
  <b className='text-main' 
  style={{ fontFamily: `${fontdata.lineStyle}, sans-serif`}}
  >{episode.isPublished ? '공개' : '비공개'}</b>
 
  
</div>
 
       </div>
       <div className='more-main'  ref={moreMainRef} onClick={async()=> await handleMoreClick1(episodesData[index]._id, index)}>
       <img  src='/SVG/ic_more_horiz.svg'   />
       </div>

      </div>
      }

   </div>
  

             <div className='flex-table'>
             <div>
             <div className='label3'> {(() => {
  
  const dateOfPublication = new Date(dop); 
  let expirationDays = 30; 

  if (storedRoutineType === '자유' || storedRoutineType === '단편') {
    expirationDays = 30;
} else if (storedRoutineType === '장편') {
    expirationDays = 40;
} else if (storedRoutineType === '시집') {
    expirationDays = 7; 
}
  const expirationDate = new Date(dateOfPublication);
  expirationDate.setDate(expirationDate.getDate() + (index+1)*expirationDays);

  return (
    <>
      D-{(index+1) * expirationDays} <b className='sublabel3'>({expirationDate.toLocaleDateString('ko-KR').replace(/\s/g, '').slice(0, -1)})</b>
    </>
  );
})()}</div>
  <p className='episode-data-1'
  style={{ fontFamily: `${fontdata.lineStyle}, sans-serif`}}

  onClick={async () => {
      if (!token) {
        handleNavigateAper();
      } else {
        await handleEpisodeClick(index)
      }
    }}
  //  onClick={async () => await handleEpisodeClick(index)}
   >
  {expandedDescriptions[index]
    ? episode.description.substring(0, 240)
    : episode.description.substring(0, 120)}
  <span className='mi' onClick={() => handleDescriptionClick(index)}>...</span>
</p>

            {delete2 && (
        <>
        <div className="overlay" id="overlay"></div>

        <div className="popup" id="popup">
          <div className="popup-content">
          <div className="confirmation-message-container">
            <div className="confirmation-message">
              이야기를 정말 삭제하시겠어요?
            </div>
          </div>

         <button   className='cancel'>
         <b className='text1'   onClick={() => setDelete2(!delete2)}>
         취소</b>
         </button>
         <button className='delete'  onClick={async()=> await togglDeleteEpisodeOne(episodesData[index]._id, index)} >
        
         삭제
         </button>
                    </div>       
        </div>
        </>

      )}
              </div>
         
                    <div className='nn'>
        {isTableVisible1 && selectedEpisodeIndex !== null && selectedEpisodeIndex === index && (
                      <div className="more-table1"  ref={tableRefex}>
                      <table>
                       <tbody  className="design-table1">
                        <tr  >
                            <td className="font-table1"  onClick={async()=> await 
                            handleEpisodeClick(index)} >글 쓰기</td>
                           
                           </tr>
                           <tr  >
                             <td className="font-table1 "   onClick={async()=> await togglDeleteEpisode2(episodesData[index]._id, index)}>삭제</td>
                           </tr>
                        
                       </tbody>
                       </table>
                       </div>
                    )}
                    </div>
                    </div>
            </div>
           

        </div>
       
       
         </div>
       
        </div>
      
        </div>
        <div style={{ width: '100%', height: '1px', position: 'relative', background: 'rgba(0, 0, 0, 0.20)', marginTop: '0px' }}></div>
       </React.Fragment>
        
        
      ))}
     {token && 
      <div className='block'>
      {/* {toastVisible && <div className='autosave111'><p className='autocnt111'> 신규 회차 글 상자를 추가했습니다.</p></div>}  */}
      {toastVisible && (
        <div className='toast-container'>
          <p className='toast-message'>신규 회차 글 상자를 추가했습니다.</p>
        </div>
      )}
      {/* {!initialRender && ( */}
        <div>
          <div className="custom-title1"
          style={{ fontFamily: `${fontdata.lineStyle}, sans-serif`}}
          >
            {`${cnt11} 회차 추가`}
            
          </div>
          <div className='custom-logo1' onClick={createEpisode}>
            <img src='/SVG/ic_add_s.svg' alt={`Add Episode ${cnt11}`}  onClick={handleToast}/>
          </div>
          
        </div>
      {/* )} */}
    </div>
    }
    
  


  
</div>


  </div>
  

  {modal && (
        <>
        <div className="overlay" id="overlay"></div>

        <div className="popup" id="popup">
          <div className="popup-content">
          <div className="confirmation-message-container">
            <div className="confirmation-message">
              이야기를 정말 삭제하시겠어요?
            </div>
          </div>

         <button   className='cancel'>
         <b className='text1'   onClick={() => setModal(false)}>
         취소</b>
         </button>
         <button className='delete'  onClick={handleDelete} >
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
          <div className="story-cover-title">이야기 커버 편집</div> 
          <div className="story-title">이야기 제목</div>

          <input type="text" className="story-content" onChange={handleEditTitle}   autoFocus
           value={stTitle} 
           />
          <div className="black-background1"></div>
          <div  className='box-flex'>
          <div className="dropdown">
  <button
    className="btn dropdown-toggle colorCh dropdown-gg"
    type="button"
    id="dropdownMenuButton"
    data-mdb-toggle="dropdown"
    aria-expanded="false"
  >
    
    <span className="genre-style">{genre ? genre : <span className="custom-style">이야기 장르 선택</span>}</span>
  </button>
  <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <li>
          <a className="dropdown-item fontGenre"  onClick={() => handleGenreChange('일상')}>
            일상
          </a>
        </li>
        <li>
          <a className="dropdown-item fontGenre"  onClick={() => handleGenreChange('로맨스')}>
            로맨스
          </a>
        </li>
        <li>
          <a className="dropdown-item fontGenre"  onClick={() => handleGenreChange('SF')}>
            SF
          </a>
        </li>
        <li>
          <a className="dropdown-item fontGenre"  onClick={() => handleGenreChange('공포')}>
            공포
          </a>
        </li>
        <li>
          <a className="dropdown-item fontGenre"  onClick={() => handleGenreChange('퀴어')}>
            퀴어
          </a>
        </li>
        <li>
          <a className="dropdown-item fontGenre"  onClick={() => handleGenreChange('사회')}>
            사회
          </a>
        </li>
        <li>
          <a className="dropdown-item fontGenre"  onClick={() => handleGenreChange('예술')}>
            예술
          </a>
        </li>
        <li>
          <a className="dropdown-item fontGenre"  onClick={() => handleGenreChange('비평')}>
            비평
          </a>
        </li>
        <li>
          <a className="dropdown-item fontGenre"  onClick={() => handleGenreChange('시')}>
            시
          </a>
        </li>
      </ul>
</div>
     <div className="dropdown  lll">
  <button
    className="btn dropdown-toggle colorCh dropdown-gg"
    type="button"
    id="dropdownMenuButton"
    data-mdb-toggle="dropdown"
    aria-expanded="false"
    
  >
   
    
    <span className="genre-style">{lineStyle ? lineStyle: <span className="custom-style">글줄 스타일 선택</span>}</span>

  </button>
  <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <li>
          <a className="dropdown-item font1"  onClick={() => handleWritingStyleChange('문체부 바탕체')}>
            문체부 바탕체
          </a>
        </li>
        <li>
          <a className="dropdown-item font2"  onClick={() => handleWritingStyleChange('KoPub바탕체')}>
            KoPub바탕체
          </a>
        </li>
        <li>
          <a className="dropdown-item font3"  onClick={() => handleWritingStyleChange('Noto Serif KR')}>
            Noto Serif KR
          </a>
        </li>
        <li>
          <a className="dropdown-item font4"  onClick={() => handleWritingStyleChange('네이버 나눔명조')}>
            네이버 나눔명조
          </a>
        </li>
      </ul>
</div>

</div>
          <button   className='cancel1'>
         <b className='text1 text1111'   onClick={() => setDelete1(!delete1)}>
         취소</b>
         </button>
         <button className='delete1'   onClick={handleEditStory}>
         저장
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

          <input type="text" className="story-content" placeholder="당신의 이름을 지어다가 며칠을 먹었다"  onChange={handleEditTitle} autoFocus />
          <div className="black-background"></div>
          <div className='drops'>
          <select className="dropdown-g"  onChange={handleEditGenre}>
          <option hidden>Choose a Genere of writing</option>
          <option value=" 자유 루틴"> 자유 루틴</option>
          <option value="단편">단편</option>
          <option value=" 장편"> 장편</option>
          <option value="시집">시집</option>
        </select>
          <select className="dropdown-g"  onChange={handleEditStyle}>
          <option hidden>Choose a style of writing</option>
          <option value="문체부 바탕체">문체부 바탕체</option>
          <option value="KoPub바탕체">KoPub바탕체</option>
          <option value="Noto Serif KR">Noto Serif KR</option>
          <option value="네이버 나눔명조">네이버 나눔명조</option>
        </select>
          </div>
          <button   className='cancel1  '>
         <b className='text1'   onClick={() => setDelete1(!delete2)}>
         취소</b>
         </button>
         <button className='delete1'   onClick={handleEditStory}>
         저장
         </button>
         </div>   
        </div>
        </>
      )}
  </>
  )
}

export default StoryNew; 