import React from 'react'
import './S1.css';
import styles from "./new-gnb-m.module.css";
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateEpisodeCount } from '../../redux/action';
import { setUserData ,setSignupSuccess} from "../../redux/action";
import { useParams } from 'react-router-dom';
import { useRef } from 'react';
import Paper from "@material-ui/core/Paper";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import { makeStyles} from '@mui/styles';
import NewGnbM from '../Navbar/new-gnb-m';

const S1 = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  const [selectedTab, setSelectedTab] = useState('home');
  const tableRefex = useRef(null);


  const { authorId} = useParams();
 
  const [selectedDiv, setSelectedDiv] = useState(null);
  const dispatch = useDispatch();
    const data = useSelector((state) => state. userData);

    useEffect(() => {
      setSelectedDiv('home');
    }, []);
    // console.log("new DaTA" + data.backgroundImage)
    const location = useLocation();

    const episodeCount1 = location.state?.episodeCount || 0;

    const [episodeCount,setEpisodeCount] = useState(episodeCount1)
  


    const [password,setPassword] = useState('')
    const [password1,setPassword1] = useState('')
    const penUser = localStorage.getItem('penNameUser')
    const emailUser = localStorage.getItem('emailUser')
    const imageSrc= localStorage.getItem('imageurl')
    const storedPenName = localStorage.getItem('pen');
    // const storedRoutineType = localStorage.getItem('routineType');
  const storedTitle = localStorage.getItem('title');
  const storedGenre = localStorage.getItem('genre');
  const storedWritingStyle = localStorage.getItem('writingStyle');
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isTableVisible, setTableVisible] = useState(false);
    const [creationDate, setCreationDate] = useState('');

    const storedRoutineType = localStorage.getItem('routineType');
    const [modal, setModal] = useState(false);
    const [modal2, setModal2] = useState(false)
    const [secondPopup, setSecondPopup] = useState(false);
    const [thirdPopup, setThirdPopup] = useState(false);
    const [episodesData, setEpisodesData] = useState([]);
    const dop = localStorage.getItem('dateofpub');
    
    const [storyData,setStoryData] = useState([])
    const [confirmpassworderror, setConfirmPassworderror] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();
    const storyId = localStorage.getItem('id');  
    const [passwordMatchError, setPasswordMatchError] = useState('');
    const [ passmissmatch, setPassmissmatch] = useState('')


    const [existingPassword, setExistingPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword1, setConfirmPassword1] = useState('');
    const [value, setValue] = React.useState(0);



    const [ pen, setPen] = useState('');
    const [email, setEmail] = useState('');


    


    const handleExistingPasswordChange = (event) => {
      setExistingPassword(event.target.value);
    };
  
    const handleNewPasswordChange = (event) => {
      setNewPassword(event.target.value);
    };
  
    const handleConfirmPasswordChange = (event) => {
      setConfirmPassword1(event.target.value);
    };
  

    const [selectedStoryIndex, setSelectedStoryIndex] = useState(null);

    const handleLogout = ()=>{
      localStorage.clear();
      navigate('/login')
    }
    const HandleProfileNavigate = ()=>{
      navigate(`/user/slide/story/profile/${authorId}`)
    }
   const HandleProfileNavigate11 = ()=>{

   }

   const HandleProfileNavigate1= (storyId1)=>{
    // console.log("hello" +storyId1)
      navigate(`/storyView/ViewMode/StoryViewMode/${storyId1  }`
      , {
        state:{
          storyId:storyId1
         
        },
      })

  };

  const handlePasswordChange = async () => {
    try {
      if (!newPassword || !confirmPassword1) {
        setPasswordMatchError("비밀번호를 입력하세요.");
        return;
      }
  
      if (newPassword !== confirmPassword1) {
        setPasswordMatchError("비밀번호가 일치하지 않습니다.다시 확인해주세요.");
        setNewPassword('');
        setConfirmPassword1('');
        return;
      }
  
      setPasswordMatchError('');
  
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;
  
      if (!passwordRegex.test(newPassword)) {
        setPasswordMatchError("잘못된 형식의 비밀번호 입니다. 다시 확인해주세요 (영문, 숫자 조합 6자리 이상)");
        setNewPassword('');
        setConfirmPassword1('');
        return;
      }
  
      const token = JSON.parse(localStorage.getItem('token'));
      const response1 = await fetch('https://backend.aper.cc/user/verifyPassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          password: existingPassword,
        }),
      });
  
      if (response1.ok) {
        const passwordMatchResponse = await response1.json();
        if (passwordMatchResponse.message === 'Password matched') {
          const response = await fetch('https://backend.aper.cc/user/updateUserDetails', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
              password: newPassword,
              
            }),
          });
  
          if (!response.ok) {
            throw new Error(`Failed to update password. Status: ${response.status}`);
          }
  
          const responseData = await response.json();
          setExistingPassword('');
          setNewPassword('');
          setConfirmPassword1('');
          setReset(!reset);
        } else {
          setPasswordMatchError('현재 비밀번호를 다시 확인해 주세요');
        }
      } else {
        const errorResult = await response1.json();
      }
    } catch (error) {
      // console.error('Error updating password:', error.message);
    }
  };
  

    const toggleModal = () => {
      setModal(!modal);
    };


    const openSecondPopup = () => {
      if (!confirmpassworderror) {
        setModal(false); 

        setSecondPopup(true);
      }
    };
  
    const handleMoreClick = (storyId,storyIndex) => {
      setSelectedStoryIndex(storyIndex);
      setTableVisible(!isTableVisible); 
    };

    const [selectedEpisodeIndex,setSelectedEpisodeIndex ] = useState(null);
    const [isTableVisiblenew, setTableVisiblenew] = useState(false)
    const handleMoreClick2 = (episodeId,episodeIndex) => {
      setSelectedEpisodeIndex(episodeIndex);
      setTableVisiblenew(!isTableVisiblenew); 
    };
    useEffect(() => {
      setTableVisiblenew(selectedEpisodeIndex !== null);
    }, [selectedEpisodeIndex]);
  

    useEffect(() => {
      setTableVisible(selectedStoryIndex !== null);
    }, [selectedStoryIndex]);

    useEffect(() => {
      setTableVisible(selectedEpisodeIndex !== null);
    }, [selectedEpisodeIndex]);

    const closeSecondPopup = () => {
      setSecondPopup(false);
    };
    const[reset,setReset] = useState(false);
    const toggleReset = ()=>{
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
    




      useEffect(() => {
        const fetchData = async () => {
          const storyId = localStorage.getItem('id');  
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

            
            responseData.data.forEach( async (episode, index) => {
              await clickToggle(episode.isPublished, `toggleSwitchh_${index}`); 
              
            });
          } catch (error) {
           
          }
        };
    
        fetchData();
       
      },[]); 
      const fetchData1 = async () => {
        const storyId = localStorage.getItem('id');  
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
          responseData.data.forEach( async (episode, index) => {
            await clickToggle(episode?.isPublished, `toggleSwitchh_${index}`); 
            
          });
        } catch (error) {
         
        }
      };


      const  clickToggle = (isPublished, toggleId1)=> {
        
     
        const checkbox = document.querySelector(`#${toggleId1}`);
        if (checkbox) {
            checkbox.checked = !isPublished;
           
        } 
  
    }


    
      useEffect(() => {
        const fetchData = async () => {
          const storyId = localStorage.getItem('id');  
          
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
            setEpisodesData(responseData.data)
              
          } catch (error) {
            // console.error('Error fetching episodes data:', error.message);
          }
        };
    
        fetchData();
        // setEpisodesData([]);
      },[storyData]); 


     

     const [data1,setData]=useState([]) 
  
  
     const [fontdata,setFont]= useState('')
  useEffect(() => {
    const fetchData = async () => {
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
        setStoryData(responseData.data);
        setFont(responseData.data[0])


        setData(responseData.data[0].authorDetails)
        responseData.data.forEach( async (episode, index) => {
          const allUnpublished = episode.episodes.every(episode => episode.isPublished === false);
          await clickTogglestory(!allUnpublished, `toggleSwitchhes_${index}`); 
          
        });

      } catch (error) {
        // console.error('Error fetching episodes data:', error.message);
      }
    };

    fetchData();
 
  },[episodesData]); 


  //Function to fetch storyDATA
  const fetchData = async () => {
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
      setStoryData(responseData.data);
      setFont(responseData.data[0])
      setData(responseData.data[0].authorDetails)

      responseData.data.forEach( async (episode, index) => {
        const allUnpublished = episode.episodes.every(episode => episode.isPublished === false);
        await clickTogglestory(!allUnpublished, `toggleSwitchhes_${index}`); 
        
      });


      // console.log(episodesData)

    } catch (error) {
      // console.error('Error fetching episodes data:', error.message);
    }
  };


  const   clickTogglestory = (isPublished, toggleId)=> {
    const checkbox = document.querySelector(`#${toggleId}`);
    if (checkbox) {
        checkbox.checked = !isPublished;
       
    } 

}

//Function to check password and delete the memership
  const handlePasswordCheck = async () => {
    try {
       const token = JSON.parse(localStorage.getItem('token'));
      const response = await fetch("https://backend.aper.cc/user/deleteMembership", {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({password}),
      });
  
      
      if (response.ok) {
         
        // console.log('Account deleted successfully');
        localStorage.clear();
         navigate('/')
      } else {
       
        console.error('Failed to delete account:', response.statusText);
       
      }
    } catch (error) {
      console.error('Error deleting account:', error.message);
      
    }
    
  };

  const HandleNavigateToBackground = ()=>{
    navigate(`/user/slide/story/profile/background/${authorId}`);
  }
  const HandleNavigationToDescription = ()=>{
    navigate(`/user/slide/story/profile/Description/${authorId}`);
  }





  const handleVerifyPassword = async () => {
    try {
      const token = JSON.parse(localStorage.getItem('token'));
      const response = await fetch('https://backend.aper.cc/user/verifyPassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, 
        },
        body: JSON.stringify({
          password: password, 
        }),
      });      
      if (response.ok) {
        const result = await response.json();
        if(result.message == 'Password matched'){
          openSecondPopup();
        }
        else{
          setPassmissmatch("비밀번호를 다시 확인해 주세요")
          
        }

      } else {
     
        console.error('Password verification failed');
      }
    } catch (error) {
      console.error('Error during password verification:', error);
    }
  };


  const handleVerify = ()=>{
    setModal2(!modal2)
  }


  //Function to verify existing password match
  const handleVerifyPassword2 = async () => { 
    try {
      const token = JSON.parse(localStorage.getItem('token'));
      const response = await fetch('https://backend.aper.cc/user/verifyPassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, 
        },
        body: JSON.stringify({
          password: password1, 
        }),
      });
  
      if (response.ok) {
        const result = await response.json();
        
        // console.log(result.message);
        if(result.message == 'Password matched'){
          openThirdPopup();
        }
        else{
          setPassmissmatch("비밀번호를 다시 확인해 주세요")
          
        }
        // openSecondPopup();
      } else {
     
        console.error('Password verification failed');
      }
    } catch (error) {
      console.error('Error during password verification:', error);
    }
  };
  const openThirdPopup = () => {
   
      setModal2(false); 

      setThirdPopup(true);
    
  };

const [pass,setPassError] = useState('');

const [pass1,setPass]= useState('')


//Function to update the user Details
const handleEditUser = async () => {
  if (!pen && !email) {
    setPassError('필명과 이메일 주소를 입력하세요.');
    return;
  }


  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    setPassError('잘못된 형식의 이메일 주소입니다. 다시 확인해주세요.');
    return;
  }
  setPassError('');

  try {
    const token = JSON.parse(localStorage.getItem('token'));
    const response = await fetch('https://backend.aper.cc/user/updateUserDetails', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        penName: pen,
        email: email,
      }),
    });

    if (!response.ok) {
      if (response.status === 400) {
        const responseData = await response.json();
        setPass('이미 가입된 이메일 주소입니다. 다시 확인해주세요.')
      } else {
        throw new Error(`Failed to update user details. Status: ${response.status}`);
      }
    } else {
      // console.log('User details updated successfully.');
      openThirdPopup(false);
      setThirdPopup(!thirdPopup);
    }
  } catch (error) {
    // console.error('Error:', error);
    // Handle other errors if needed
  }
};



const toggleCancel = ()=>{

}

const [epid,setEpisodeId] = useState();
const [episodeprofile, setEpisodeProfile] = useState(false)
const togglDeleteEpisodeProfile = (episodeId, episodeIndex)=>{
  setEpisodeId(episodeId)
  setSelectedEpisodeIndex(episodeIndex)
  setEpisodeProfile(!episodeprofile);
}


//Function to Delete Each Episode
const togglDeleteEpisodeProfiledelete = async(episodeIdnew,episodeIndex11)=>{
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
        body: JSON.stringify({ episodeId: epid }),
      });
  
      if (!response.ok) {
        throw new Error(`Failed to delete data. Status: ${response.status}`);
      }
      const responseData = await response.json();
      setTableVisiblenew(!isTableVisiblenew);
      setEpisodeProfile(!episodeprofile);

      console.log('Data deleted successfully');
     
       const updatedEpisodes = episodesData.filter((_, selectedEpisodeIndex) => selectedEpisodeIndex !== episodeIndex11);
      
       setEpisodesData(updatedEpisodes);
    } catch (error) {
      // console.error('Error deleting data:', error.message);
      console.log('Error deleting data:', error.message);
    }

  }



  const [ storyprofile, setStoryProfile]  = useState(false);

  
  const [ isTableVisible3, setTableVisible3] = useState(false);


  const  handleMoreClickStory= (storyId,storyIndex) => {
    setSelectedStoryIndex(storyIndex);
    setTableVisible3(!isTableVisible3); 
  };


  const togglDeleteStory = (id,storyIndex)=>{
    setSelectedStoryIndex(storyIndex);
    setStoryProfile(!storyprofile)
   
  }


  //Function to handle story Deleting
  const togglDeleteStoryProfiledelete = async(storyIdnew,storyIndex)=>{
    try {
      const author1Id = localStorage.getItem('authorId');
      // console.log("svadvasvda" + Id);
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
        body: JSON.stringify({ storyId: storyIdnew }),
      });
  
      if (!response.ok) {
        throw new Error(`Failed to delete data. Status: ${response.status}`);
      }
  
      const responseData = await response.json();
      
      setEpisodeCount(episodeCount-1);
      localStorage.setItem('areEpisodesCreated', episodeCount - 1);
      dispatch(updateEpisodeCount(episodeCount));
     
      console.log('Data deleted successfully');
      setTableVisible3(!isTableVisible3);
      setStoryProfile(!storyprofile)
      

      const updatedStory= storyData.filter((_, selectedStoryIndex) => selectedStoryIndex !== storyIndex);
      
      setStoryData(updatedStory);
    } catch (error) {
      
      console.log('Error deleting data:', error.message);
    }
  }


  const [img11,setImg]= useState()

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Use the token stored in localStorage
        const token = JSON.parse(localStorage.getItem('token'));
        if (!token) {

          return;
        }
        // Fetch user details using the token
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

       
        dispatch(setUserData(userDetails.data));
      localStorage.setItem('checkId',userDetails.data._id) 
      localStorage.setItem('penNameUser',userDetails.data.penName)
      localStorage.setItem('emailUser',userDetails.data.email)
      localStorage.setItem('descUser',userDetails.data.description)

      setImg(userDetails.data.backgroundImage)
       
        // console.log('User details:', userDetails);
      } catch (error) {
        // console.error('Error fetching user details:', error.message);
      }
    };

   
    fetchData();
  }, [pen, email]); 

  const [expandedStates, setExpandedStates] = useState({});
  const checkId =localStorage.getItem('checkId') 

  const descUser =localStorage.getItem('descUser')

  const handleMouseEnter = (index) => {
    setExpandedStates(prevState => ({
      ...prevState,
      [index]: true
    }));
  };

  const handleMouseLeave = (index) => {
    setExpandedStates(prevState => ({
      ...prevState,
      [index]: false
    }));
  };





  const [expandedStatesStory, setExpandedStatesStory] = useState({});

 

  const handleMouseEnterStory = (index) => {
    setExpandedStatesStory(prevState => ({
      ...prevState,
      [index]: true
    }));
  };

  const handleMouseLeaveStory = (index) => {
    setExpandedStatesStory(prevState => ({
      ...prevState,
      [index]: false
    }));
  };


  //Handle Each Episode Click
  const handleEpisodeClick = async (episodeIndex,episodeDescription,storyId1,count) => {
    if (episodesData.length > 0) {
      const c = count;
      const clickedEpisode = episodesData[episodeIndex];  
      if (clickedEpisode) {
        const episodeId = clickedEpisode._id;     
        const isFirstClick = localStorage.getItem(`episodeClicked_${episodeId}`) !== 'true';       
        localStorage.setItem(`episodeClicked_${episodeId}`, 'true');        
          const handleSaveData = () => {
            navigate(`/user/slide/story/storycontent/view/${episodeId}/${storyId1}`, { state: { textValue: episodeDescription ,episodeNumber1:count, storyId1:storyId1} });
          };
  
         
          handleSaveData();
        
      } else {
        // console.error('Clicked episode is null or undefined.');
      }
    } else {
      // console.error('Episodes data is empty.');
    }
  };

  const handleComponentClick = () => {
    
    // setShowComponent(false);
    setTimeout(() => {
     navigate('/user/slide')
    }, 500); 
  };


 
  const handleMainPage = () => {
    if (checkId !== authorId) {
      navigate('/login')
    } else {
      navigate('/user'); 
    }
  }

  const HandleNavigateToSearch = ()=>{
    navigate('/search')
    
  }
  const [isTableVisible4,setTableVisible4] = useState(false);


  


  const handleNavigatetoStoryNew = (storyId1,index)=>{
    navigate(`/user/slide/story/${storyId1}`, { state: {
      storyId1: storyId1,
     
    } });
  }
  const coverTitleCounts = {};
  episodesData.forEach(episode => {
    coverTitleCounts[episode.coverTitle] = (coverTitleCounts[episode.coverTitle] || 0) + 1;
});
  
const [expandedIndex, setExpandedIndex] = useState(null); 

//Navigation to Login screen
const   handleNavigateAper = ()=>{
  localStorage.clear();
  navigate('/login')
}
const moreMainRef = useRef(null);
useEffect(() => {
  const handleClickOutside = (event) => {
    if (moreMainRef.current && !moreMainRef.current.contains(event.target)
    &&
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


const moreMainRef3 = useRef(null);
const tableRefex3 = useRef(null);
//handeling outside Click when more menu is openend
useEffect(() => {
  const handleClickOutside = (event) => {
    if (moreMainRef3.current && !moreMainRef3.current.contains(event.target)
    &&
    tableRefex3.current && !tableRefex3.current.contains(event.target)) {
      
      setTableVisible3(false);
      setSelectedEpisodeIndex(null);
    }
  };
  document.addEventListener('mousedown', handleClickOutside);
  return () => {
    document.removeEventListener('mousedown', handleClickOutside);
  };
}, []);


//Sharing Current page Link
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


//Function to Update the episode Publish status
const handleToggleClick = async (index, episodeId) => {
  try {
      // const authorId = localStorage.getItem('authorId');
      const token = JSON.parse(localStorage.getItem('token'));
      const apiUrl = `https://backend.aper.cc/story/update-episode/${episodeId}`;
     
      

      const requestBody = {
         
          isPublished: !episodesData[index].isPublished, 
      };

      const response = await fetch(apiUrl, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
          throw new Error(`Failed to update episode. Status: ${response.status}`);
      }
      console.log('Episode updated successfully');
      const responseData = await response.json();
      const updatedEpisodesData = [...episodesData];
      updatedEpisodesData[index].isPublished = !episodesData[index].isPublished;
      setEpisodesData(updatedEpisodesData);
    
      fetchData();   
  } catch (error) {
      // console.error('Error updating episode:', error.message);
  }
};


//Publsishing the Stories
const handleToggleClickStory = async (index, st1Id) => {
  try {
      
      const token = JSON.parse(localStorage.getItem('token'));
      const apiUrl = `https://backend.aper.cc/story/updateStory/${st1Id}`;

      const requestBody = {
          isPublished: !storyData[index].isPublished, 
      };

      const response = await fetch(apiUrl, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
          throw new Error(`Failed to update episode. Status: ${response.status}`);
      }

      console.log('Episode updated successfully');
      const updatedEpisodes = [...storyData];
      updatedEpisodes[index].isPublished = !updatedEpisodes[index].isPublished;
      setStoryData(updatedEpisodes);
      fetchData1();

  } catch (error) {
      // console.error('Error updating episode:', error.message);
  }
};


//On scrolling to fix the Navbar
const targetRef = useRef(null);
const [isNavbarFixed, setIsNavbarFixed] = useState(false);
useEffect(() => {
  const handleScroll = () => {
    if (targetRef.current) {
      const { top } = targetRef.current.getBoundingClientRect();
      const threshold = 0;
      setIsNavbarFixed(top <= threshold);
    }
  };

  window.addEventListener('scroll', handleScroll);

  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
}, []);



//Make Mobile Responsive
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


  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const im = localStorage.getItem('backgroundImageUser')
  const pen11 = localStorage.getItem('penNameUser');
  const description11 = localStorage.getItem('descriptionUser');
  const email11 =  localStorage.getItem('emailUser');
  return (

    <div className='main-image-container'>
       <div className="image-container"  >
     

            <img
          className="profile-image"
          // src={data1.backgroundImage
          //   ? (data1.backgroundImage.includes("/images")
          //     ? `https://aper.cc/${data1.backgroundImage}`
          //     : `https://backend.aper.cc/${data1.backgroundImage}`)
          //   : 'defaultImageURL'}

          src={data1.backgroundImage
    ? (data1.backgroundImage.includes("/images")
        ? `https://aper.cc/${data1.backgroundImage}`
        : `https://backend.aper.cc/${data1.backgroundImage}`)
    : (im && im.includes("/images")
        ? `https://aper.cc/${im}`
        : `https://backend.aper.cc/${im}`)
}
          alt="Background"
          style={{
            position: isNavbarFixed ? 'fixed' : 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: isNavbarFixed ? '70px':'', 
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
      {data.penName}의 필드
      </div>
    )}
  <div className="spacing-search" />
  
  <div
    className="search-in-gnb-search"
    // onClick={HandleNavigateToSearch}

    onClick={() => {
      if (checkId !== authorId) {
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
      if (checkId !== authorId) {
        handleNavigateAper();
      } else {
        handleComponentClick()
      }
    }}>
  <div className='search-in-gnb-search-inner'>
    <img
      className="ic-write-icon-search-1"
      loading="eager"
      alt=""
      src="/SVG/ic_write.svg"
    />
    </div>
  </div>
  {/* <div className="divider-search">
    <div className="v-divider-16-search">
      <div className="v-divider-161-search" />
    </div>
  </div> */}
  {/* <div className="vertical-line" style={{ height: '40px', borderLeft: '1px solid grey', marginLeft: '20px', marginTop:'15px' }}></div> */}
  
  <div
    className="field-writer-search-1"

    // onClick={() => setTableVisible4(!isTableVisible4)}
    onClick={() => {
      if (checkId !== authorId) {
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
      if (checkId !== authorId) {
        handleNavigateAper();
      } else {
        setTableVisible4(!isTableVisible4)
      }
    }}
      
      
      >
      {/* <div className="div1-search-1">{data.penName}</div> */}
      {data.penName && checkId === authorId ?   (
        <div className="div1-search-1">{data.penName}</div>
      ) : (
        <div className="div1-search-1">Login</div>
      )}
    </div>
    { img11 && (
        <div className="field-list-imgfalsefalsethu-search">
          {/* Render image if `im` exists */}
          <img 
            className="image-profile-1 margin-image"
            src={data1.backgroundImage
    ? (data1.backgroundImage.includes("/images")
        ? `https://aper.cc/${data1.backgroundImage}`
        : `https://backend.aper.cc/${data1.backgroundImage}`)
    : (im && im.includes("/images")
        ? `https://aper.cc/${im}`
        : `https://backend.aper.cc/${im}`)
}/>
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
   <header className={`${styles.newGnbM1} ${isNavbarFixed ? styles.fixedGnbM1 : ''}`}>
    {/* <header className={styles.newGnbM1}> */}
      <div className={styles.leftTrail1}>
       
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
      {isNavbarFixed &&  !isMobile && (
      <div className="name-autorr-1">
      {data.penName}의 필드
      </div>
    )}
    {isNavbarFixed && isMobile &&  (
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
  <li  style={{display: 'flex', justifyContent: 'center'}}>
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
  <li  style={{display: 'flex', justifyContent: 'center'}}>
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
          {data.penName? (
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
    
        <div className="more-table-1" ref={tableRefex}
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

{/* 
{
  isMobile && <NewGnbM/>
} */}

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
  
    <p  className='first-subdiv-content'>{data1.penName ? data1.penName : pen11}</p>
  </div>
  <div className="second-subdiv">
        <div className="intro-text"> {data1.description ? data1.description : descUser}</div>
        <div className="overlay-div"></div>
        <div className='edit-content'>
        {token && checkId === authorId && (
  <>
    <div className='edit-button'
      onClick={() => {
        if (checkId !== authorId) {
          handleNavigateAper();
        } else {
          HandleNavigateToBackground(!isTableVisible4);
        }
      }}
    >
      <div className="text-container">
        배경 이미지 수정
      </div>
      <img src='/SVG/ic_picture (1).svg' alt="Icon" style={{ width: '12px', height: '12px', marginLeft: '20px' }} />

      {/* <div className="vertical-line" style={{ height: '12px', borderLeft: '1px solid grey', marginLeft: '20px' }}></div> */}
    </div>
  </>
)}
       {token && checkId === authorId && 
       <>
             <div className='edit-button'
             
              // onClick={HandleNavigationToDescription}
              onClick={() => {
      if (checkId !== authorId) {
        handleNavigateAper();
      } else {
        HandleNavigationToDescription()
      }
    }}
              
              >
            <div className="text-container"  >
            소개글 수정
            </div>
            <img src='/SVG/ic_write.svg' alt="Icon" style={{ width: '12px', height: '12px' }}   className='ic-22'/>
            {/* <div className="vertical-line" style={{ height: '12px', borderLeft: '1px solid grey', marginLeft: '20px' }}></div> */}
            </div>
           
            </>
            }
           
              <div className='edit-button'   onClick={copyCurrentPageLink}>
            <div className="text-container">
            필드 공유
            </div>
            <img src='/SVG/ic_share (1).svg' alt="Icon" style={{ width: '12px', height: '12px'}} />
            {isLinkCopied && <span style={{ marginLeft: '10px',backgroundColor:'black',color:'white', width:'100%', height:'20px' }}>Link copied!</span>}
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
            </div> 
</div>
            </div>
            {/* <div className="overlay-div-2"></div> */}
        </div>
        <div style={{ width: '100%', height: '1px', position: 'relative', background: 'rgba(0, 0, 0, 0.20)', marginTop: '-44px' }}></div>
        </div>


        {selectedUI === 'writerInfo' && (
         
        <div className="container4">
   
    <div className="fixed-size-div3">
    {/* <div className="child-div">
    <div className="child1">필명</div>
    <div className="child2 child-margin">{data1.penName? data1.penName : pen11}</div>
    </div> */}
    {/* <div className="child-div main1">
    <div className="child1 child1-left">
    이메일 주소
    </div>
    <div className="child222 child22-left">
    {data1.email ? data1.email : email11}
    </div>
    </div> */}
    <div style={{display:'flex', flexDirection:'row'}}>
      <p style={{marginLeft:'30px',fontWeight:'500', fontSize:'14px', lineHeight:'19px'}}> 필명</p>
      <p style={{marginLeft:'200px', fontWeight:'700', fontSize:'18px', lineHeight:'24px'}}>{data1.penName? data1.penName : pen11}</p>
    </div>
    <div style={{display:'flex', flexDirection:'row'}}>
      <p style={{marginLeft:'30px',fontWeight:'500', fontSize:'14px', lineHeight:'19px'}}> 이메일 주소</p>
      <p style={{marginLeft:'155px', fontWeight:'700', fontSize:'18px', lineHeight:'24px'}}>{data1.email ? data1.email : email11}</p>
    </div>
    <div className="overlay-div-2"></div>
    <div className="child-div1 main1"></div>
    {token && checkId === authorId && 
    <div className="child-div22-2">
    <div className="child3" 
    
      // onClick={toggleReset}
      onClick={() => {
      if (checkId !== authorId) {
        handleNavigateAper();
      } else {
        toggleReset()
      }
    }}
      >비밀번호 재설정</div>
    <div className="child4"
    
      // onClick={handleVerify}

      onClick={() => {
      if (checkId !== authorId) {
        handleNavigateAper();
      } else {
        handleVerify()
      }
    }}
      >작가 정보 수정</div>
    </div>
    
    }
    {token && checkId === authorId && 
    <div className='m-2'>
    <div className="child-div3">APER를 더이상 이용하지 않을 경우 회원탈퇴를 진행해주세요</div>
    <div className='child-div3 d4'
    
      //  onClick={toggleModal}
       onClick={() => {
      if (checkId !== authorId) {
        handleNavigateAper();
      } else {
        toggleModal()
      }
    }}
       >회원 탈퇴하기</div>
    </div>
    }
    {
      isMobile && token && checkId === authorId && (
        <div className='delete-mobile'>
          <div className='delete-mobile-text'>
          APER를 더이상 이용하지 않을 경우 회원탈퇴를 진행해주세요
          </div>
          <div  className='delete-mobile-link' onClick={() => {
      if (checkId !== authorId) {
        handleNavigateAper();
      } else {
        toggleModal()
      }
    }}>
          회원 탈퇴하기
          </div>
        </div>
      )
    }
    </div>
</div>

)}

{selectedUI === 'home' && (
         
 <div className='main-content-div  '>
 
<div className='flexed-div'>




{episodesData.map(( episode,index)=> {
  
  const count = coverTitleCounts[episode.coverTitle]--;
  
  if (episode.coverTitle && episode.description) {
    
 return (
  <React.Fragment key={episode._id}>
  <div className='outer-div-1-1-1' >
		<div className="extra-div1-1" >
    
    
 		 <div className="nested-div">
    
      <div   className="episode"  >
        
         
         
          <div className="replacement-ui"   >
           <div className='line-r space-r'>
     
      <div className=''
      //  style={{ fontFamily: `${episode.lineStyle}, sans-serif`}}
      >[{episode.coverTitle}]</div>
      
        </div>
          <div className='main-horizontal mhl'>
      <div className='main-title'
      
        // onClick={async () => await handleEpisodeClick( index,episodesData[index].description,episodesData[index].storyId)}
        onClick={async() => {
      if (checkId !== authorId) {
        handleNavigateAper();
      } else {
        await handleEpisodeClick( index,episodesData[index].description,episodesData[index].storyId,count)
      }
    }}
        >  
      <div className='line-r'>
      <div className='head' >
     
      {count}화.
</div>
<div className='head2'
  // style={{ fontFamily: `${episode.lineStyle}, sans-serif`}}
>{episode.episodeTitle}</div>
</div>

      </div>
      {checkId === authorId &&  (
      <div className='main-toggle'>
       <div className='toggle-name tn'>
       <div className="form-check form-switch" style={{ display: 'flex', alignItems: 'center' }}>
       <input className="form-check-input" 
      type="checkbox" 
      role="switch"
      id={`toggleSwitchh_${index}`}
      checked={!episode.isPublished} 
      onChange={() => handleToggleClick(index, episode._id)}
  />
  <b className='text-main' >{episode.isPublished ? '공개' : '비공개'}</b>
 
  
</div>
 
       </div>
      </div>
      )}

   </div>


              <div className='label label1'>  {episode.genre}<div className="separator1"></div><b className='sublabel3 lb'>{episode.createdAt && episode.createdAt.split("T")[0].replaceAll("-", ".")}</b></div>
              <div className='episode-data-11' 
              
              onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={() => handleMouseLeave(index)}
  
              >
             <div
    className="hello" 
    // onClick={async () => await handleEpisodeClick(index, episodesData[index].description, episodesData[index].storyId)}
    // style={{ fontFamily: `${episode.lineStyle}, sans-serif`}}
    onClick={async() => {
      if (checkId !== authorId) {
        handleNavigateAper();
      } else {
        await handleEpisodeClick(index, episodesData[index].description, episodesData[index].storyId)
      }
    }}
  >
    {expandedStates[index] ? 
      episode.description.substring(0, 100) 
      : 
      episode.description.substring(0, 60) + '...'
    }
    ...

  
  </div>
  <div>

  {expandedStates[index] && token && checkId === authorId &&  (
  <div style={{ position: 'relative' ,display:'flex', flexDirection:'row'}}>
 
    <div style={{ width: '70px', height: '70px', marginLeft: '0px', marginTop: '40px', position: 'absolute' }}>
     
      <img
        src='/SVG/delete.svg'
        onClick={async () => {
          if (checkId !== authorId) {
            handleNavigateAper();
          } else {
            await togglDeleteEpisodeProfile(episode._id, index);
          }
        }}
      />
      <div className='delete-icon'>삭제</div>
    </div>
    
  </div>
)}

  </div>
           
              </div>
              
            </div>
            
            <div className='nn1'>
                </div>
           
                {episodeprofile && selectedEpisodeIndex !== null && selectedEpisodeIndex === index &&   (
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
         <b className='text1'   onClick={() => setEpisodeProfile(!episodeprofile)}>
         취소</b>
         </button>
         <button className='delete'  onClick={async()=> await togglDeleteEpisodeProfiledelete(episode._id, selectedEpisodeIndex)} >
         삭제
         </button>
                    </div>       
        </div>
        
        </>

      )}
    
        </div>
       
         </div>
        </div>
        </div>
        <div style={{ width: '100%', height: '1px', position: 'relative', background: 'rgba(0, 0, 0, 0.20)', marginTop: '80px' }}></div>
       
        
        </React.Fragment>
      )
  }
  else{
    return null
  }
}
      )}
     
      </div>
    </div>
 )}


{selectedUI === 'storyList' && (
         
         <div className="container4">
         {storyData.map((episode, index) => (
              <div key={index} >
         <div className='content-div11' 
          onMouseEnter={() => handleMouseEnterStory(index)}
          onMouseLeave={() => handleMouseLeaveStory(index)}
  
          >
<div className='main-horizontal'>
      <div className='main-title'>  
      <div className='line-r'>
     
      <div className="custom-line"></div>

      {/* <div className='text'>{episode.authorDetails.penName}</div> */}
      <div className='text' style={{color:'black'}}>{episode.routineType}</div>
      {/* <div className='text2'>{episode.routineType}</div>
      <div className="date-1">{ episode.createdAt && episode.createdAt.split("T")[0]}</div> */}
      
        
</div>

      </div>
{checkId === authorId && (
      <div className='main-toggle'>
       <div className='toggle-name'>
       <div className="form-check form-switch" style={{ display: 'flex', alignItems: 'center' }}>
       <input className="form-check-input" 
      type="checkbox" 
      role="switch"
      id={`toggleSwitchhes_${index}`}
      // defaultChecked={true}
      checked={!episode.isPublished} 
      onChange={() => handleToggleClickStory(index, episode._id)}

  />
  <b className='text-main' >{episode.isPublished ? '공개' : '비공개'}</b>
 
  
</div>
 
       </div>
      </div>
         )}

   </div>



<div className='Title' >
<div className="custom-text11" >
{episode.coverTitle}

</div>

</div>
<div className="author-container1"  style={{ position: 'relative' }}>


<div className='label label1'>  {episode.genre}<div className="separator1"></div><b className='sublabel3 lb'>{ episode.createdAt && episode.createdAt.split("T")[0].replaceAll("-", ".")}</b></div>
{expandedStatesStory[index] && token && !isMobile  && checkId === authorId &&   (
  <div style={{ width: '70px', height: '70px',marginLeft:'500px',marginTop:'115px',position:'absolute' }}>
    <img src='/SVG/delete.svg'
      //  onClick={async()=> await togglDeleteStory(storyData[index]._id, index)}

       onClick={async() => {
      if (checkId !== authorId) {
        handleNavigateAper();
      } else {
        await togglDeleteStory(storyData[index]._id, index)
      }
    }}
     alt='Delete' />
      <div className='delete-icon'>삭제</div>
  </div>
)}
{expandedStatesStory[index] && token && isMobile && checkId === authorId &&  (
  <div style={{ width: '70px', height: '70px',marginLeft:'250px',marginTop:'100px',position:'absolute' }}>
    <img src='/SVG/delete.svg'
      //  onClick={async()=> await togglDeleteStory(storyData[index]._id, index)}

       onClick={async() => {
      if (checkId !== authorId) {
        handleNavigateAper();
      } else {
        await togglDeleteStory(storyData[index]._id, index)
      }
    }}
     alt='Delete' />
      <div className='delete-icon'>삭제</div>
  </div>
)}
{/* {isTableVisible3 && selectedStoryIndex !== null && selectedStoryIndex === index && (
                  <div className="more-table02 mb" ref={tableRefex3}>
                   <tbody  className="design-table">
                    <tr  >
                        <td className="font-table"   onClick={async()=> await handleNavigatetoStoryNew(storyData[index]._id,index)}>커버 편집</td>
                       </tr>
                       <tr  >
                         <td className="font-table " > 이야기 공유</td>
                       </tr>
                       <tr>
                         <td className="font-table"  onClick={async()=> await togglDeleteStory(storyData[index]._id, index)}>삭제</td>
                       </tr>
                   </tbody>
                   </div>
                )} */}
                {storyprofile  && selectedStoryIndex !== null && selectedStoryIndex === index &&  (
        <>
        <div className="overlay" id="overlay"></div>

        <div className="popup" id="popup">
          <div className="popup-content">

          <div className="confirmation-message-container">
            <div className="confirmation-message">
              이야기를 정말 삭제하시겠어요?
            </div>
          </div>

         <button   className='cancel-1-1'   onClick={() => setStoryProfile(!storyprofile)}>
         <b className='text1' >
         취소</b>
         </button>
         <button className='delete'  onClick={async()=> await togglDeleteStoryProfiledelete(storyData[selectedStoryIndex]._id, selectedStoryIndex)} >
         삭제
         </button>
                    </div>       
        </div>
        </>

      )}
</div>
{expandedStatesStory[index] &&  token && checkId === authorId &&  (
  <div className="bin" 
  // onClick={() => {
  //     HandleProfileNavigate1(storyData[index]._id, index); // Call the function
    
  //   }}
    // onClick={async()=> await handleNavigatetoStoryNew(storyData[index]._id,index)}

    onClick={async() => {
      if (checkId !== authorId ) {
        handleNavigateAper();
      } else {
        await handleNavigatetoStoryNew(storyData[index]._id,index)
      }
    }}
    >
    <img src='/SVG/ic_enter_arrow.svg' />
    회차 목록 보기
  </div>
)}



</div>
   <div style={{ width: '100%', height: '1px', position: 'relative', background: 'rgba(0, 0, 0, 0.20)', marginTop: '50px' }}></div>
</div>
))
}
{/* <div style={{ width: '100%', height: '1px', position: 'relative', background: 'rgba(0, 0, 0, 0.20)' }}></div> */}
    
 </div>
 
 )}
        { modal && (
        <>
        

        <div className="overlay-s1" id="overlay">
            
        </div>
            
        
{/* <div className="confirmation-message-container-s1">
            <div className="confirmation-message-s11">
            비밀번호 확인이 필요합니다.
            </div>
            <div className='cnf-msg-2'>
           비밀번호 입력
           </div>
          
           <input type="password" className="story-content-s1"
           onChange={(e) => setPassword(e.target.value)}
            ></input>
             
           <div className="overlay-div-3"></div>
           {passmissmatch && (
                    <div className="error-message-signup-s1">{passmissmatch}</div>
                )}
           
          </div>
       

         <button   className='cancel-s1'  onClick={() => {
          setPassmissmatch('')
          setModal(false)}}>
         <b className='text1-s1'  >
         취소</b>
         </button>
         <button className='delete-s1'  onClick={handleVerifyPassword}>
         다음
         </button> */}
         {/* <div className="popup-s12" id="popup">
    <div className="popup-content-s1">
        <div className="confirmation-message-s11" style={{marginTop:'30px',marginLeft:'40px'}}>
            비밀번호 확인이 필요합니다.
        </div>
        <div className='cnf-msg-2' style={{}}>
           비밀번호 입력
           </div>
           <input type="password" className="story-content-s1"
           onChange={(e) => setPassword(e.target.value)}
            ></input>
              <div className="overlay-div-3"></div>
              {passmissmatch && (
                    <div className="error-message-signup-s1">{passmissmatch}</div>
                )}

                <button   className='cancel-s1'  onClick={() => {
          setPassmissmatch('')
          setModal(false)}}>
         <b className='text1-s1'  >
         취소</b>
         </button>
         <button className='delete-s1'  onClick={handleVerifyPassword}>
         다음
         </button> 

    </div>
</div> */}
<div className="popup-s12" id="popup">
    <div className="popup-content-s1">
        <div className="confirmation-message-s11" style={{ marginTop: '30px', marginLeft: '50px' }}>
            비밀번호 확인이 필요합니다
        </div>
        <div className='cnf-msg-2'>
            비밀번호 입력
        </div>
        <input
            type="password"
            className="story-content-s1"
            onChange={(e) => setPassword(e.target.value)}
        />
        <div className="overlay-div-3"></div>
        {passmissmatch && (
            <div className="error-message-signup-s1">{passmissmatch}</div>
        )}

        <div className="button-container">
            <button className='cancel-s1' onClick={() => {
                setPassmissmatch('')
                setModal(false)
            }}>
                <b className='text1-s1'>취소</b>
            </button>
            <button className='delete-s1' onClick={handleVerifyPassword}>
                다음
            </button>
        </div>
    </div>
</div>
        </>

      )}


      { modal2 && (
        <>
        <div className="overlay-s1" id="overlay"></div>

        <div className="popup-s12" id="popup">
          <div className="popup-content-s1">
          {/* <div><img
                      className="close-m1"
                      alt=""
                      src="/SVG/ic_close (1).svg"
                      onClick={() => setModal2(false)}
                    /></div>  */}

          {/* <div className="confirmation-message-container-s1">
            <div className="confirmation-message-s11" style={{marginTop:'30px',marginLeft:'40px'}}>
            비밀번호 확인이 필요합니다.
            </div>
            <div className='cnf-msg-2'>
           비밀번호 입력
           </div>
         
           <input type="password" className="story-content-s1"
           onChange={(e) => setPassword1(e.target.value)}
            ></input>
             
           <div className="overlay-div-3"></div>
           {passmissmatch && (
                    <div className="error-message-signup-s1">{passmissmatch}</div>
                )}
           
          </div> */}
       
         
         {/* <button   className='cancel-s1'   onClick={() => {
          setPassmissmatch('')
          setModal2(false)}}>
         <b className='text1-s1' >
         취소</b>
         </button>
         <button className='delete-s1'  onClick={handleVerifyPassword2}>
         다음
         </button> */}


         <div className="confirmation-message-s11" style={{marginTop:'30px',marginLeft:'50px'}}>
         비밀번호 확인이 필요합니다
        </div>
        <div className='cnf-msg-2' style={{}}>
           비밀번호 입력
           </div>
           <input type="password" className="story-content-s1"
           onChange={(e) => setPassword1(e.target.value)}
            ></input>
              <div className="overlay-div-3"></div>
              {passmissmatch && (
                    <div className="error-message-signup-s1">{passmissmatch}</div>
                )}

                <div className="button-container">
                <button   className='cancel-s1'  onClick={() => {
          setPassmissmatch('')
          setModal2(false)}}>
         <b className='text1-s1'  >
         취소</b>
         </button>
         <button className='delete-s1'   onClick={handleVerifyPassword2}>
         다음
         </button> 
         </div>
                    </div>       
        </div>
        </>

      )}




      {secondPopup && (
        <>
        <div className="overlay" id="overlay"></div>

        <div className="cm3" id="popup">
          <div className="popup-content">
          <div><img
                      className="close-m1"
                      alt=""
                    
                      onClick={() => setSecondPopup(false)}
                    /></div>
          <div className="cm2">
            <div className=" cm">
            저장된 모든 작품과 정보가 사라집니다. <br/>정말 탈퇴하시겠어요?
            </div>
          </div>

         <button   className='cancel'>
         <b className='text1'   onClick={() => setSecondPopup(false)}>
         취소</b>
         </button>
         <button className='delete'
         onClick={handlePasswordCheck}>
        탈퇴
         </button>
                    </div>       
        </div>
        </>

      )}
      {/* {reset && (
  <>
    <div className="overlay-s1" id="overlay"></div>

    <div className="popup-s1" id="popup">
      <div className="popup-content-s1">
        <div className="confirmation-message-container-s1-1">
          <div className='head-s1'>
            <b className='h1-s1'>작가 정보 수정 </b>
            <div className='ic-s1'>
              <img
                alt=""
                src="/SVG/ic_close (1).svg"
                onClick={() => {
                  setPasswordMatchError('');
                  setReset(!reset);
                }}
              />
            </div>
          </div>
         
          <div className='cnf-msg-2'>
            기존 비밀번호
          </div>
          <input
            type="password"
            className="story-content-s1"
            value={existingPassword}
            onChange={handleExistingPasswordChange}
          />
          <div className="overlay-div-3"></div>
          <p className='cnf-msg-2'>
            새 비밀번호
          </p>
          <input
            type="password"
            className="story-content-s1"
            value={newPassword}
            onChange={handleNewPasswordChange}
          />
          <div className="overlay-div-3"></div>
          <p className='cnf-msg-2'>
            새 비밀번호 확인
          </p>
          <input
            type="password"
            className="story-content-s1"
            value={confirmPassword1}
            onChange={handleConfirmPasswordChange}
          />
          <div className="overlay-div-3"></div>
          
          <div className='cnf-s1' onClick={handlePasswordChange}>수정 완료</div>
          {passwordMatchError && (
            <p className='error-message-1'>{passwordMatchError}</p>
          )}
        </div>
      </div>
    </div>
  </>
)} */}

{reset && (
  <>
    <div className="overlay-s1" id="overlay"></div>

    <div className="popup-s1" id="popup" style={{ width: '388px', height: '451px', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '30px', height: '24px', display: 'flex', alignItems: 'center', marginLeft:'112px',fontSize:'18px',fontWeight:'700' }}>
        작가 정보 수정
        <div style={{ position: 'absolute', right: '30px',cursor:'pointer' }}>
          <img
            alt=""
            src="/SVG/ic_close (1).svg"
            onClick={() => {
              setPasswordMatchError('');
              setExistingPassword('');
              setNewPassword('');
              setConfirmPassword1('');
              setReset(!reset);
            }}
          />
        </div>

        
      </div>
      <div className='new-cnf'>
      <div className='cnf-msg-2-2'>
            기존 비밀번호
          </div>
          <input
           type="password"
            className="story-content-s1"
            value={existingPassword}
            onChange={handleExistingPasswordChange}
          />
          <div className="new-overlay"></div>
        </div>


        <div className='new-cnf' >
      <div className='cnf-msg-2-2'>
      새 비밀번호 확인
          </div>
          <input
             type="password"
            className="story-content-s1"
            value={newPassword}
            onChange={handleNewPasswordChange}
          />
          <div className="new-overlay"></div>
        </div>


        <div className='new-cnf'>
      <div className='cnf-msg-2-2'>
      새 비밀번호
          </div>
          <input
            type="password"
            className="story-content-s1"
            value={confirmPassword1}
            onChange={handleConfirmPasswordChange}
          />
          <div className="new-overlay"></div>
        </div>
        <div style={{ position: 'relative' }}>
        {passwordMatchError && (
    <div style={{ position: 'absolute', top: '0', left: '5px', width: '100%', paddingLeft: '60px', fontSize: '14px', color: 'red', fontWeight: '600'}}>
      {passwordMatchError.includes('.') ? passwordMatchError.split('.').map((line, index) => (
        <React.Fragment key={index}>
          {line.trim()}
          {index !== passwordMatchError.split('.').length - 1 && <br />} {/* Add a line break if it's not the last line */}
        </React.Fragment>
      )) : passwordMatchError}
    </div>
)}
  <div style={{ marginTop: passwordMatchError ? 'calc(15px + 20px)' : '15px',padding:'15px' }}>
    <button className='button-edit' onClick={handlePasswordChange}>
    수정 완료
    </button>
  </div>
</div>

    </div>

  </>
)}

      {thirdPopup && (
        <>
        <div className="overlay-s1" id="overlay"></div>

        <div className="popup-s1-email" id="popup">
          <div className="popup-content-s1">
          <div className="confirmation-message-container-s1-email">
          <div className="confirmation-message-s1">
    작가 정보 수정
    <div className='ic-s1'>
        <img
            alt=""
            src="/SVG/ic_close (1).svg"
            onClick={() => {
                 setPassError('')
                 setPass('')
                setThirdPopup(false);
            }}
        />
    </div>
</div>
            <div className='cnf-msg-2'>
            필명
           </div>
          
           <input type="text" className="story-content-s1-email"
           onChange={(e) => setPen(e.target.value)}
            ></input>
             
           <div className="overlay-div-3-3"></div>
            <div className='cnf-msg-2'>
            이메일 주소
           </div>
          
           <input type="text" className="story-content-s1-email"
           onChange={(e) => setEmail(e.target.value)}
            ></input>
             
           <div className="overlay-div-3-3"></div>
           {pass && (
    <div className="error-message-signup-1-1">{pass.includes('.') ? pass.split('.').map((line, index) => (
        <React.Fragment key={index}>
            {line.trim()}
            {index !== pass.split('.').length - 1 && <br />} 
        </React.Fragment>
    )) : pass}
    </div>
)}
{pass1 && (
    <div className="error-message-signup-1-1">{pass1.includes('.') ? pass1.split('.').map((line, index) => (
        <React.Fragment key={index}>
            {line.trim()}
            {index !== pass1.split('.').length - 1 && <br />} 
        </React.Fragment>
    )) : pass1}
    </div>
)}

          </div>
         
         <button className='delete-s1-2'  onClick={handleEditUser}>
         수정 완료
         </button>
                    </div>       
        </div>
        </>

      )}
      
    </div>
    
  )
}

export default S1
