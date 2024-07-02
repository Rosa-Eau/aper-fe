import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import './Navbar.css'
import { useRef } from 'react';

const Navbar1 = () => {
  const tableRef = useRef(null);
  const tableRefex = useRef(null);
  const [authorData, setAuthorData] = useState([]);
  const [isHovered, setIsHovered] = useState(false);



  // More Menu option. handlling Outside Click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (tableRef.current && !tableRef.current.contains(event.target) &&
        tableRefex.current && !tableRefex.current.contains(event.target)) {
        setTableVisible3(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [tableRef]);



  const data = useSelector((state) => state.userData);

  // to get logged in User Details
  useEffect(() => {
    const user = async () => {
      const token = JSON.parse(localStorage.getItem("token"));
      if (!token) {

        return;
      }
      const userDetailsResult = await fetch(

        // "http://localhost:3001/user/getUserDetails",
        "https://backend.aper.cc/user/getUserDetails",
        {
          method: "get",
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      const userDetails1 = await userDetailsResult.json();


      setAuthorData(userDetails1.data)
      if (userDetails1 && userDetails1.data && userDetails1.data.penName) {
        localStorage.setItem('penNameUser', userDetails1.data.penName);
      } else {
        // console.error("Unable to set penNameUser in localStorage due to invalid user details.");

      }


      if (userDetails1 && userDetails1.data && userDetails1.data.description) {
        localStorage.setItem('descriptionUser', userDetails1.data.description);
      } else {
        // console.error("Unable to set penNameUser in localStorage due to invalid user details.");

      }

      if (userDetails1 && userDetails1.data && userDetails1.data._id) {
        localStorage.setItem('authorId', userDetails1.data._id);
      } else {
        // console.error("Unable to set penNameUser in localStorage due to invalid user details.");

      }

      if (userDetails1 && userDetails1.data && userDetails1.data.email) {
        localStorage.setItem('emailUser', userDetails1.data.email);
      } else {
        // console.error("Unable to set penNameUser in localStorage due to invalid user details.");

      }



      if (userDetails1 && userDetails1.data && userDetails1.data.backgroundImage) {
        localStorage.setItem('backgroundImageUser', userDetails1.data.backgroundImage);
      } else {
        // console.error("Unable to set penNameUser in localStorage due to invalid user details.");

      }
    }
    user()
  }, []);



  // navigation to login page if token not present
  const handleNavigateAper = () => {
    navigate('/login')
  }

  const im = localStorage.getItem('backgroundImageUser')
  const penin = localStorage.getItem('penNameUser')


  const [isTableVisible3, setTableVisible3] = useState(false)

  const navigate = useNavigate()
  const token = JSON.parse(localStorage.getItem("token"));
  const handleMainPage = () => {
    if (!token) {
      navigate('/login');
    } else {
      navigate('/user');
    }
  }


  // search page navigation
  const HandleNavigateToSearch = () => {
    navigate('/search')
  }


  // story creation page navigation
  const handleComponentClick = () => {
    navigate('/user/slide')
  };


  //logging out
  const handleLogout = () => {
    localStorage.clear();
    navigate('/login')
  }

  // Navigate to particular authors Profile
  const HandleProfileNavigate = () => {
    navigate(`/user/slide/story/profile/${authorData._id}`)
  }



  return (
    <>
      <header className="new-gnb-search">
        <div className="left-trail-search">
          <img
            className="logo-icon-search"
            loading="eager"
            alt=""
            src="/SVG/logo.svg"
            onClick={handleMainPage}
          />
        </div>
        <div className="spacing-search" />

        <div
          className="search-in-gnb-search"
          // onClick={HandleNavigateToSearch}
          onClick={() => {
            if (!penin) {
              handleNavigateAper();
            } else {
              HandleNavigateToSearch();
            }
          }}
        >
          <div className='search-in-gnb-search-inner'>
            <img
              className="ic-search-icon-search"
              loading="eager"
              alt=""
              src="/SVG/ic_search.svg"
            />
          </div>
        </div>
        <div className="search-in-gnb-search"
          // onClick={handleComponentClick}
          onClick={() => {
            if (!penin) {
              handleNavigateAper();
            } else {
              handleComponentClick();
            }
          }}
        >
          <div className='search-in-gnb-search-inner'>
            <img
              className="ic-write-icon-search"
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
       

        <div className="field-writer-search" onClick={() => {
          if (!penin) {
            handleNavigateAper();
          } else {
            setTableVisible3(!isTableVisible3);
          }
        }} ref={tableRef}>
          <div className='name-search1-1' onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            <div className="name-search" onClick={() => setTableVisible3(!isTableVisible3)}>
              {penin ? (
                <div className="div1-search">{penin}</div>
              ) : (
                <div className="div1-search" >Login</div>
              )}
            </div>

            {im && (
              <div className="field-list-imgfalsefalsethu-search">
                <img
                  className="image-profile-1 margin-image"
                  src={
                    im.includes("/images")
                      ? `https://aper.cc/${im}`
                      : `https://backend.aper.cc/${im}`
                  }
                  alt="User Background Image"
                />
              </div>
            )}

            {!im && (
              <div className="field-list-imgfalsefalsethu-search22">
                <img
                  className={`ib ${isHovered ? 'invert-icon' : ''}`}

                  alt="" src="/SVG/ic_user.svg"
                />
              </div>
            )}
          </div>
        </div>
      </header>

      {isTableVisible3 && (

        <div className="more-table-1" ref={tableRefex}
        >
          <table>
            <tbody className="design-table-2">

              <tr>
                <td className="font-table ft" onClick={HandleProfileNavigate}>
                  프로필
                </td>
              </tr>
              <tr>
                <td className="font-table ft" onClick={handleLogout}>
                  로그 아웃
                </td>
              </tr>
            </tbody>
          </table>
        </div>

      )}
    </>

  )
}

export default Navbar1;
