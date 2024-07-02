import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import "./ViewerData.css";


const handleLoginClick = () => {

}


const ViewerData = () => {


  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const [imageSrc, setImageSrc] = useState('');
  const userDetails = location.state?.userDetails || {};
  const [isMobileMenuOpen, setMobileMenuOpen1] = useState(false);


  const [showComponent, setShowComponent] = useState(false);

  const navigate = useNavigate();

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
  return (
    <div>
      <nav className="navbar">
        <div className="logo">
          <img className="aperlogo" src='/SVG/logo.svg' alt="Logo" />
        </div>
        <div className={`icons ${isMobileMenuOpen ? 'open' : ''}`}>
          <div className="icon">
            <img src='/SVG/ic_search.svg' alt="SVG 1" />
          </div>
          <div className="icon" onClick={handleLoginClick}>
            <img src='/SVG/ic_write.svg' />
          </div>
          <div className='icon'>
            login

          </div>
          <div className="icon">

            <img className="image-profile" />
          </div>
        </div>
        <div className={`mobile-menu-icon ${isMobileMenuOpen ? 'open' : ''}`} onClick={handleMobileMenuToggle}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
      </nav>
      <div className='heading-viewer'>

        <img className="" alt="" src="/SVG/logo_minimal.svg" />
        <b className="heading-viewer-1">추천하는 이야기</b>


      </div>
      <div className='viewer-recomended'>
        <div className="first-div  ">
          <div className='fnt'>
            겨울밤은 기나길었다. 부모님이 없는데도 우리는 다른 집에서보다가끔 나는 의도적으로 늙은이라는 말을 쓰는데, 바로 이 차이를 강조하고 싶어서다. 그리고 노령자, 고령자, 노인, 노년, 노친네, (여성의 경우) 노파 등 나이 든 사람을 가리키는 가끔 나는 의도적으로 늙은이라는 말을 쓰는데, 바로 이 차이를 강조하고 싶어서다. 그리고 노령자, 고령자, 노인, 노년, 노친네, (여성의 경우) 노파 등 나이 든 사람을 가리키는  더 얌전하게 놀았다. 누군가 탄성을 내질렀다.“웜마야!”
          </div>
          <div className='link'>글 바로 가기 </div>
          <div className='view-down'>
            <div className="content">모든 멋진 일에는 두려움이 따른다</div>
            <div className="content-2"><div>이연 작가 </div>    <div>산문</div>     <div>2022.06.30</div>   <div>2023.06.30</div></div>
          </div>
        </div>
        <div className="container-view">
          <div className="line-view"></div>
        </div>
        <div className="second-div fnt">이라는 말을 쓰는데, 바로 이 차이를 강조하고 싶어서다. 그리고 노령자, 고령자, 노인, 노년, 노친네, (여성의 경우) 노파 등 나이 든 사람을 가리키는 가끔 나는
        </div>

        <div className="container-view">
          <div className="line-view"></div>
        </div>

        <div className="third-div  fnt">
          가끔 나는 의도적으로 늙은이라는 말을 쓰는데가끔 나는 의도적으로 늙은이라는 말을 쓰는데
        </div>

      </div>


      <div className="responsive-div">
        <div className="nested-div-1">
          <div className='heading-viewer'>

            <img className=" " alt="" src="/SVG/logo_minimal.svg" />
            <b className="heading-viewer-1">추천하는 이야기</b>


          </div>
        </div>
      </div>

    </div>
  )
}

export default ViewerData



