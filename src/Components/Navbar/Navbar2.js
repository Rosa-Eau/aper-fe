import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import './Navbar.css'
import { useRef } from 'react';

const Navbar2 = () => {
  const tableRef = useRef(null);
  const tableRefex = useRef(null);
  const [authorData, setAuthorData] = useState([]);
  const [isTableVisible3, setTableVisible3] = useState(false)


  // handling outside click of the table
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

  // Function to get user details
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



      if (userDetails1 && userDetails1.data && userDetails1.data.email) {
        localStorage.setItem('emailUser', userDetails1.data.email);
      } else {
        // console.error("Unable to set penNameUser in localStorage due to invalid user details.");

      }
      // localStorage.setItem('backgroundImageUser', userDetails1.data.backgroundImage )

      if (userDetails1 && userDetails1.data && userDetails1.data.backgroundImage) {
        localStorage.setItem('backgroundImageUser', userDetails1.data.backgroundImage);
      } else {
        // console.error("Unable to set penNameUser in localStorage due to invalid user details.");

      }
    }
    user()
  }, []);



  // Navigation to login page
  const handleNavigateAper = () => {
    navigate('/login')
  }

  const im = localStorage.getItem('backgroundImageUser')
  const penin = localStorage.getItem('penNameUser')




  const navigate = useNavigate()
  const token = JSON.parse(localStorage.getItem("token"));
  const handleMainPage = () => {
    if (!token) {
      navigate('/login');
    } else {
      navigate('/user');
    }
  }

  const HandleNavigateToSearch = () => {
    navigate('/search')
  }

  const handleComponentClick = () => {
    navigate('/user/slide')
  };
  const handleLogout = () => {
    localStorage.clear();
    navigate('/login')
  }
  const HandleProfileNavigate = () => {
    navigate(`/user/slide/story/profile/${authorData._id}`)
    // navigate(`/user/storyView/${storyId}`);
  }
  return (
    <>
      <header className="new-gnb-search-2">
        <div className="left-trail-search-2">
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
          onClick={() => {
            if (!penin) {
              handleNavigateAper();
            } else {
              HandleNavigateToSearch();
            }
          }}
        >
          <div className='search-in-gnb-search-inner-2'>
            <img
              className="ic-search-icon-search"
              loading="eager"
              alt=""
              src="/SVG/ic_search.svg"
            />
          </div>
        </div>
        <div className="search-in-gnb-search" onClick={() => {
          if (!penin) {
            handleNavigateAper();
          } else {
            handleComponentClick();
          }
        }}>
          <div className='search-in-gnb-search-inner-2'>
            <img
              className="ic-write-icon-search"
              loading="eager"
              alt=""
              src="/SVG/ic_write.svg"
            />
          </div>
        </div>
        

        <div
          className="field-writer-search-2"
          onClick={() => {
            if (!penin) {
              handleNavigateAper();
            } else {
              setTableVisible3(!isTableVisible3);
            }
          }}
          ref={tableRef}
        >
          <div className='name-search1'>
            <div className="name-search" onClick={() => setTableVisible3(!isTableVisible3)}>
              {penin ? (
                <div className="div1-search">{penin}</div>
              ) : (
                <div className="div1-search">Login</div>
              )}
            </div>
            <div className="field-list-imgfalsefalsethu-search1">

              {im && (
                <div className="field-list-imgfalsefalsethu-search1">
                  {/* Render image if `im` exists */}
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
                    className='ib'
                    alt="" src="/SVG/ic_user.svg"
                  />
                </div>
              )}

            </div>
          </div>

        </div>
      </header>
      <div>
        {isTableVisible3 && (
          <div className="more-table-1-n2" ref={tableRefex}
          >
            {/* <table className="more-table-1"> */}
            <table>
              <tbody className="design-table-2-n2">

                <tr>
                  <td className="font-table-n2" onClick={HandleProfileNavigate}>
                    프로필
                  </td>
                </tr>
                <tr>
                  <td className="font-table-n2" onClick={handleLogout}>
                    로그 아웃
                  </td>
                </tr>
              </tbody>
            </table>

            {/* </table> */}
          </div>
        )}
      </div>
    </>

  )
}

export default Navbar2;
