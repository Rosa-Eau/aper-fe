import React, { useEffect } from "react";
// import { Routes, Route, useNavigationType, useLocation } from "react-router-dom";
 import { useSelector } from 'react-redux';
import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
  
} from "react-router-dom";
import '../src/global.css'
import ViewProfileEpisode from "./Components/Viewer/ViewProfileEpisode";
import Upload from "./Components/StoryCreation/Upload";
 import Login from "./Components/Login/Login";
 import SignUpComponent from "./Components/SignUp/SignUpComponent";
 import Preview from "./Components/BackgroundImage/Background";
 import Edit from "./Components/BackgroundEdit/BackEdit";
import Modal from "./Components/Modal/Modal";
import User1 from "./Components/Writer/User1";
 import User2 from "./Components/Routine/User2";
 import Genere from "./Components/Genere/Genere";
 import Story from "./Components/StoryCreation/Story";
import StoryWriting from "./Components/StoryCreation/StoryWriting";
import BackDefault from "./Components/BackgroundImage/BackDefault";
import StoryPreview from "./Components/StoryPreview/StoryPreview";
import S1 from "./Components/StoryPreview/S1";
import St from "./Components/StoryCreation/st";
import UserBackground from "./Components/StoryCreation/UserBackground";
import UserBackEdit from "./Components/StoryCreation/UserBackEdit";
import UserBackgroundUpload from "./Components/StoryCreation/UserBackgroundUpload";
import ViewerData from "./Components/Viewer/ViewerData";
import StoryView from "./Components/StoryCreation/StoryView";
// import MainFrame from "./Components/Viewer/MainFrame";
import ViewStory from "./Components/Viewer/ViewStory";
import ViewMode from "./Components/Viewer/ViewMode";
import StoryViewMode from "./Components/Viewer/StoryViewMode";
import ViewProfile from "./Components/Viewer/ViewProfile";
import Search from "./Components/Viewer/Search";
import MainPage from "./Components/Viewer/MainPage";
import { Navbar } from "react-bootstrap";
import Navbar1 from "./Components/Navbar/Navbar";
import Filter from "./Components/Filter/Filter";
import Popup2 from "./Components/Modal/popup2";
import Transition from "./Components/Filter/Transition";
import Recomended from "./Components/Viewer/Recomended";


// import ShortPoet from "./Components/Story1/ShortPoet";
import StoryEditNew from "./Components/StoryCreation/StoryEditNew";

// import MainFrame from "./Components/Viewer/MainFrame";
// import Story2 from "./Components/Story2";
import StoryNew from "./Components/StoryCreation/Storynew";
import Proposed from "./Components/Viewer/Proposed";
import ProfileAuthorDefault from "./Components/Viewer/ProfileAuthorDefault";
import AuthorSearch from "./Components/Viewer/AuthorSearch";
import RecomendedMobile from "./Components/Viewer/RecomendedMobile";
import Frame5 from "./Components/BackgroundEdit/BackEdit1";
import AuthorRecomendedMobile from "./Components/Viewer/AuthorRecomendedMobile";

//  import ImageSlider from "./Components/Login/Login2";
 

function App() {
  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action]);

  useEffect(() => {
    let title = "";
    let metaDescription = "";

    switch (pathname) {
      case "/":
        title = "APER";
        metaDescription = "Your Meta Description Here";
        break;
      // Add more cases as needed

      default:
        break;
    }

    if (title) {
      document.title = title;
    }

    if (metaDescription) {
      const metaDescriptionTag = document.querySelector(
        'head > meta[name="description"]'
      );
      if (metaDescriptionTag) {
        metaDescriptionTag.content = metaDescription;
      }
    }
  }, [pathname]);

  const imageData = useSelector((state) => state.imageData);
    
  return (
    <Routes>
      {/* <Route path="/" element={<ImageSlider/>} /> */}

      {/* <Route path="/" element={<Login/>} /> */}
      <Route path="/" element={<MainPage/>} />
      <Route path="/storyView" element={<ViewStory/>} />
      <Route path="/storyView/ViewMode/StoryViewMode/:storyId" element={<StoryViewMode/>} />
      {/* <Route path="/storyView/ViewMode/StoryViewModeProfile" element={<StoryViewMode/>} /> */}
      {/* <Route path="/user/slide/story/profile/ViewProfile/:storyId" element={<ViewProfile />} /> */}
      <Route path="/storyView/ViewMode" element={<ViewMode/>} />
      <Route path="/backgroundedit/look" element={<Frame5 imageData={imageData}/>} />
      <Route path="/backgroundedit/edit/look" element={<Frame5 imageData={imageData}/>} />

      <Route path="/loginback" element={<Login />} /> 
      <Route path="/signup" element={<SignUpComponent />} />
      <Route path="/backgroundedit" element={<BackDefault />} />
      {/* <Route path="/backgroundedit/edit" element={<Edit imageData={imageData} />} /> */}
      <Route path="/backgroundedit/edit" element={<Preview  imageData={imageData}/>} />
      
      
     
      {/* <Route path="/backgroundedit/edit/login_edit"  element={<Login/>}/>  */}
      <Route path="/user" element={<MainPage />}/> 
      <Route path="/login" element={<Login />}/> 
      <Route path="/search" element={<Search />}/> 
      <Route path="/user/slide" element={<User2 />}/> 
      <Route path="/user/ViewStory/slide" element={<User2 />}/> 
      <Route path="/user/slide/genere" element={<Genere />}/> 
      <Route path="/user/slide/story/storynew/:storyId" element={<StoryNew  />}/> 
      <Route path="/user/slide/story/:storyId1" element={<StoryEditNew  />}/> 
      {/* <Route path="/user/slide/shortStory" element={<StoryShort />}/>  */}
      {/* <Route path="/user/slide/poet" element={<ShortPoet/>}/>  */}
      <Route path="/user/slide/story/profile/:authorId" element={<S1  imageData={imageData} />}/> 
      <Route path="/user/slide/story/profile/Authordefault/:authorId/:storyId" element={<ProfileAuthorDefault />}/> 
      <Route path="/user/slide/story/profile/background/:authorId" element={<UserBackground />}/> 
      <Route path="/user/slide/story/profile/Description/:authorId" element={<UserBackEdit />}/> 
      <Route path="/user/slide/story/profile/background/backedit"  element={<UserBackEdit   imageData={imageData}/>}/> 
      <Route path="/user/slide/story/profile/background/upload/:authorId" element={<UserBackgroundUpload/>}/> 
      <Route path="/user/slide/story/profile/background/upload/backedit" element={<UserBackEdit   imageData={imageData}/>}/> 
      <Route path="/user/slide/story/storycontent/:episodeId" element={<StoryWriting />}/> 
      <Route path="/user/slide/story/storycontent/edit/:episodeId" element={<StoryWriting/>}/>
      <Route path="/user/slide/story/storycontent/view/:episodeId/:storyId" element={<StoryView />}/>
      <Route path="/user/slide/story/storycontent/view/profile/:episodeId/:storyId" element={<ViewProfileEpisode />}/> 
      <Route path="/user/storyView/:storyId/:index" element={<ViewStory />}/> 
      {/* <Route path="/user/storyView/:storyId" element={<ViewStory />}/>  */}
      <Route path="/user/storyView/search/:storyId/:index" element={<ViewStory />}/> 
      <Route path="/storyView/ViewMode/search" element={<Search />}/> 
      <Route path="/backgroundedit/edit/login" element={<MainPage />}/> 
     
    </Routes>
  );
}

export default App;
