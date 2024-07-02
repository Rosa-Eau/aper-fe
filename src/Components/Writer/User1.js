import React, { useState, useEffect } from 'react';
import "./User1.css"
import { useLocation } from 'react-router-dom';
import { Link, useNavigate } from "react-router-dom";


const User1 = () => {

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const [imageSrc, setImageSrc] = useState('');
  const userDetails = location.state?.userDetails || {};
  const [isMobileMenuOpen, setMobileMenuOpen1] = useState(false);


  const [showComponent, setShowComponent] = useState(false);

  const navigate = useNavigate();




  useEffect(() => {
    const fetchData = async () => {
      try {
        const email = localStorage.getItem('emailUser')
        const response = await fetch(`https://backend.aper.cc/user/getImage/${email}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch episodes data');
        }

        const responseData = await response.json();

        const backgroundImageUrl = await responseData?.data?.imagePath;


        setImageSrc(backgroundImageUrl);
        localStorage.setItem('imageurl', backgroundImageUrl)


      } catch (error) {
        // console.error('Error fetching episodes data:', error.message);
      }
    };

    fetchData();
    // setEpisodesData([]);
  }, []);

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen1(!isMobileMenuOpen);
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


  localStorage.setItem('penNameUser', userDetails.data.penName)
  localStorage.setItem('emailUser', userDetails.data.email)
  const handleToggleMenu = () => {

    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 600) {
        closeMobileMenu();
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const HandleProfileNavigate = () => {
    navigate('/user/slide/story/profile')
  }

  return (
    <>
      <nav className="navbar">
        <div className="logo">
          <img className="aperlogo" src='/SVG/logo.svg' alt="Logo" />
        </div>
        <div className={`icons ${isMobileMenuOpen ? 'open' : ''}`}>
          <div className="icon">
            <img src='/SVG/ic_search.svg' alt="SVG 1" />
          </div>
          <div className="icon" onClick={handleComponentClick}>
            <img src='/SVG/ic_write.svg' />
          </div>
          {/* <div className='icon'>
        {userDetails.data.penName}

      </div> */}
          <div className="icon-profile1" onClick={HandleProfileNavigate}>
            {userDetails.data.penName}

            <img className="image-profile" src={userDetails.data.backgroundImage
              ? `https://backend.aper.cc/${userDetails.data.backgroundImage}`
              : `https://aper.cc/${imageSrc}`} />
          </div>
        </div>
        <div className={`mobile-menu-icon ${isMobileMenuOpen ? 'open' : ''}`} onClick={handleMobileMenuToggle}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
      </nav>
      <div className='view'>Viewer Page Still In Implementation</div>
      {/* <h3>This is Viewer Page Not Implemented Please Click on write Icon For Writer Page Implementations</h3> */}
      {/* <p>{userDetails.data.penName}</p>
    <p>{userDetails.data.email}</p>
    <p>{userDetails.data.description}</p>
    <p>{userDetails.data.backgroundImage}</p> */}
      {/* {imageSrc && <img  className="image-body" src={`https://aper.cc/${imageSrc}`}  />} */}
    </>
  );
};

export default User1;

