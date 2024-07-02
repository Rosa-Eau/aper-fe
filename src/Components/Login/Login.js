import './login.css'
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { setUserData, setSignupSuccess } from "../../redux/action";
import { useDispatch, useSelector } from 'react-redux';


const Login = () => {
  const [email, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const signupSuccess = useSelector((state) => state.signupSuccess);
  const [backgroundImageOpacity, setBackgroundImageOpacity] = useState(1);



  const [backgroundImages, setBackgroundImages] = useState([
    "/images/def1.png",
    "/images/def2.png",
    "/images/def3.png",
    "/images/def4.png",
    "/images/def5.png",
  ]);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);


  //Function which is used to slideshow background Images
  useEffect(() => {
    const changeBackgroundImage = () => {
      setBackgroundImageOpacity(0.6);

      setTimeout(() => {
        setCurrentImageIndex((prevIndex) =>
          prevIndex === backgroundImages.length - 1 ? 0 : prevIndex + 1
        );

        setTimeout(() => {
          setBackgroundImageOpacity(1);
        }, 100);
      }, 500);
    };

    const intervalId = setInterval(changeBackgroundImage, 4000);

    return () => clearInterval(intervalId);
  }, [backgroundImages]);




  useEffect(() => {
    const auth = localStorage.getItem("user");
    const signupSuccessFlag = localStorage.getItem("signupSuccess");
    if (auth) {
      navigate('/')
    }

  }, [])

  //Function which handles change in username
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  //Function which handles password 
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };


  //function to login into the account
  const handleLogin = async () => {
    try {

      // let result = await fetch("http://localhost:3001/user/log-in", {
      let result = await fetch("https://backend.aper.cc/user/log-in", {
        method: "post",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      result = await result.json();

      if (result.auth) {
        
        localStorage.setItem("user", JSON.stringify(result?.data));
        localStorage.setItem("token", JSON.stringify(result?.auth));
        const userDetailsResult = await fetch(
          // "http://localhost:3001/user/getUserDetails",
          "https://backend.aper.cc/user/getUserDetails",
          {
            method: "get",
            headers: {
              Authorization: `Bearer ${result.auth}`,
            },
          }
        );

        const userDetails = await userDetailsResult.json();
        dispatch(setUserData(userDetails.data));
        navigate("/user", { state: { userDetails } });
      } else {
        if (result.message === "User not found") {
          setError("아이디가 맞지 않습니다.");
        } else if (result.message === "Password is incorrect") {
          setError("비밀번호가 맞지 않습니다.");
        } else if (result.message === "Email and password are required fields.") {
          setError("이메일과 비밀번호는 필수 항목입니다.");
        } else {
          setError("Login failed. Please try again.");
        }
      }
    } catch (error) {
      // setError("An unexpected error occurred. Please try again.");
    }
  };

  
  const handleKeyPress = (event) => {

    if (event.keyCode === 13 || event.which === 13) {
      handleLogin()
    }
  }




  //Images of slideshow 
  const SliderData = [
    {
      img: "https://aper-files.s3.ap-northeast-2.amazonaws.com/def5.png",
      id: 1
    },
    {
      img: "https://aper-files.s3.ap-northeast-2.amazonaws.com/def4.png",
      id: 2
    },
    {
      img: "https://aper-files.s3.ap-northeast-2.amazonaws.com/def3.png",
      id: 3
    },
    {
      img: "https://aper-files.s3.ap-northeast-2.amazonaws.com/def2.png",
      id: 4
    },
    {
      img: "https://aper-files.s3.ap-northeast-2.amazonaws.com/def1.png",
      id: 5
    }
  ];

  const [current, setCurrent] = useState(0);
  const length = SliderData.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((current) => (current === length - 1 ? 0 : current + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, [length]);



  return (

    <form>
      <section className="slider11">
        {SliderData.map((slide, index) => (
          <div
            className={index === current ? "slide11 active1" : "slide11 hide1"}
            key={slide.id}
          >
            <img src={slide.img} alt="" className="image11" />
          </div>
        ))}
      </section>
      <main className="contents-login">
        <div className="heading-parent-login">
          <b className="heading-login">로그인</b>
          <div className="group-wrapper-login">
            <div className="label-button-wrapper-login">
              <div className="label-button-login">
                <div className="ic-arrow-left-login">
                  <div className="ic-arrow-left1-login">
                    <div className="tint" />
                  </div>
                </div>
                <div className="text-login">
                  <div className="div1-login">이전</div>
                </div>
                <img className="nowrite-icon-login" alt="" src="/nowrite1.svg" />
              </div>
            </div>
          </div>
        </div>
        <div className="contents-inner-login">
          <div className="input-parent-login">
            <div className="input-login">
              <div className="label-login">
                <div className="div2-login">이름</div>
              </div>
              <div className="input1-login">
                <div className="left-tails-login">
                  <div className="ic-user-login">
                    <div className="ic-user1-login">
                      <img
                        className="tint1-login"
                        alt=""
                        src="/SVG/ic_user.svg" />
                    </div>
                  </div>
                </div>
                <input
                  autoFocus
                  type="text"
                  placeholder="이메일을 입력하세요."
                  className="placeholder-login-login"
                  value={email}
                  autoComplete="current-password"
                  onChange={handleUsernameChange}
                  style={{
                    border: 'none',
                    background: 'none',
                    outline: 'none',
                    width: '100%',
                    color: 'black', // Adjust width as needed
                  }}
                />
                <div className="spacing-login" />
                <div className="rightarea-login">
                  <img className="nodelete-icon-login" alt="" src="/nodelete.svg" />
                </div>
              </div>
              <div className="line-login" />
            </div>
            <div className="input-login">
              <div className="label-login">
                <div className="div2-login">비밀번호</div>
              </div>
              <div className="input1-login">
                <div className="left-tails-login">
                  <div className="ic-user-login">
                    <div className="ic-pw1-login">
                      <img
                        className="tint2-login"
                        alt=""
                        src="/SVG/ic_pw.svg" />
                    </div>
                  </div>
                </div>
                <input
                  autoFocus
                  type="password"
                  placeholder="비밀번호를 입력하세요."
                  className="placeholder-login-login"
                  value={password}
                  onChange={handlePasswordChange}
                  autoComplete="current-password"
                  style={{
                    border: 'none',
                    background: 'none',
                    outline: 'none',
                    width: '100%',
                    color: 'black',
                    fontSize: '16px' // Adjust width as needed
                  }} />
                <div className="value-login">Value</div>
                <div className="spacing-login" />
                <div className="rightarea1-login">
                  <div className="div4-login">보기</div>
                  <img className="novisible-icon-login" alt="" src="/novisible.svg" />
                </div>
                <div className="rightarea-login">
                  <img className="nodelete-icon-login" alt="" src="/nodelete.svg" />
                </div>
              </div>
              <div className="line-login" />
            </div>
            <div className="label-error">{error && <p>{error}</p>}</div>
            <div className="label-button1-login" onClick={handleLogin}
              onKeyUp={handleKeyPress}

            >
              <div className="ic-write-login">
                <div className="ic-write1-login">
                  <div className="tint3-login" />
                </div>
              </div>
              <div className="text-login">
                <div className="div5-login">로그인</div>
              </div>
              <img className="ic-write-login" alt="" src="/nowrite2.svg" />
            </div>


            <Link to="/signup" className="custom-link-login">
              <div className="frame-parent-login">
                <div className="aper-wrapper-login">
                  <div className="aper-login">APER 계정이 없으신가요?</div>
                </div>
                <div className="label-button2-login">
                  <div className="nowrite-icon-login">
                    <div className="ic-write3-login">
                      <div className="tint4-login" />
                    </div>
                  </div>
                  <div className="text-login">
                    <div className="div1-login">회원가입</div>
                  </div>
                  <div className="ic-arrow-left-login">
                    <div className="ic-chevron-right-s1-login">
                      <img
                        className="tint5-login"
                        alt=""
                        src="/SVG/ic_chevron_right_s.svg" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>


      </main>


    </form>
  );
};

export default Login;
