import styles from "./new-gnb-m.module.css";
import { useState } from "react";
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import './Navbar.css'
import { useRef } from 'react';

const NewGnbM = () => {

  const [menuOpen, setMenuOpen] = useState(false);
  const tableRef = useRef(null);
  const tableRefex = useRef(null);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };


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


  const [authorData, setAuthorData] = useState([])

  const data = useSelector((state) => state.userData);
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


      // localStorage.setItem('backgroundImageUser', userDetails1.data.backgroundImage )


      if (userDetails1 && userDetails1.data && userDetails1.data.backgroundImage) {
        localStorage.setItem('backgroundImageUser', userDetails1.data.backgroundImage);
      } else {
        // console.error("Unable to set penNameUser in localStorage due to invalid user details.");

      }
    }
    user()
  }, []);


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
    <header className={styles.newGnbM}>
      <div className={styles.leftTrail}>
        <img className={styles.logoIcon} alt="" src="/logo.svg" />
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
          className={styles.icHamburgerIcon}
          loading="lazy"
          alt=""
          src="/images/ic-hamburger@2x.png"
          onClick={toggleMenu}
        />
        {menuOpen && (
          <div className={styles.menuItems}>

            <ul>
              <li>
                <div className="invert-icon-color" onClick={() => {
                  if (!penin) {
                    handleNavigateAper();
                  } else {
                    handleComponentClick();
                  }
                }}>
                  <div className=''>
                    <img
                      className="ic-write-icon-search"
                      loading="eager"
                      alt=""
                      src="/SVG/ic_write.svg"
                    />
                  </div>
                </div>
              </li>
              <li style={{ display: 'flex', justifyContent: 'center' }}>
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
                    if (!penin) {
                      handleNavigateAper();
                    } else {
                      HandleNavigateToSearch();
                    }
                  }}
                >
                  <div className=''>
                    <img
                      className="ic-search-icon-search"
                      loading="eager"
                      alt=""
                      src="/SVG/ic_search.svg"
                    />
                  </div>
                </div>
              </li>
              <li style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{
                  width: '30px',
                  height: '2px',
                  backgroundColor: '#222222',


                }}>

                </div>
              </li>
              <li>
                <div className="" onClick={() => {
                  if (!penin) {
                    handleNavigateAper();
                  } else {
                    setTableVisible3(!isTableVisible3);
                  }
                }} ref={tableRef}>
                  <div className='name-search1'>
                    <div className="name-search" onClick={() => setTableVisible3(!isTableVisible3)}>
                      {penin ? (
                        <div className="div1-search">{penin}</div>
                      ) : (
                        <div className="div1-search" >Login</div>
                      )}
                    </div>
                    {im && (
                      <div className="field-list-imgfalsefalsethu-search">
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
                    {/* Render SVG if `im` doesn't exist */}
                    {!im && (
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
  );
};

export default NewGnbM;
