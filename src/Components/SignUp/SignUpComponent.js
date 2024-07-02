import { Link, useNavigate } from "react-router-dom";
import "./signup.css"
import { useDispatch } from 'react-redux';
import { setUserData } from '../../redux/action';
import "../Modal/Modal.css";
import React from "react";
import { useEffect } from "react";


import { useState } from "react";
const SignUpComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [penName, setName] = useState('');
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmpassword, setConfirmPassword] = useState('');
  const [passwordMatchError, setPasswordMatchError] = useState('');
  const [penNameError, setPenNameError] = useState('');
  const [fielderror, setFieldError] = useState('')
  const [checkboxerror, setCheckboxError] = useState('');
  const [emailError, setEmailError] = useState('')
  const [modal, setModal] = useState(false);


  const [checkbox1, setCheckbox1] = useState(false);
  const [checkbox2, setCheckbox2] = useState(false);
  const [checkbox3, setCheckbox3] = useState(false);

  const [backgroundImageOpacity, setBackgroundImageOpacity] = useState(1);

  //Function to show and stop showing the mdal
  const toggleModal = () => {
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }
  const [modal1, setModal1] = useState(false);
  const toggleModal1 = () => {
    setModal1(!modal1);
  };

  if (modal1) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

  const [backgroundImages, setBackgroundImages] = useState([
    "/images/def1.png",
    "/images/def2.png",
    "/images/def3.png",
    "/images/def4.png",
    "/images/def5.png",
  ]);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const preloadImages = async () => {
      const imagePromises = backgroundImages.map((image) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = image;
          img.onload = resolve;
        });
      });

      await Promise.all(imagePromises);
    };

    preloadImages();
  }, [backgroundImages]);

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



  const [error, setError] = useState()


  const handleCheckbox1Change = () => {
    setCheckbox1(!checkbox1);
  };

  const handleCheckbox2Change = () => {
    setCheckbox2(!checkbox2);
  };

  const handleCheckbox3Change = () => {
    setCheckbox3(!checkbox3);
  };



  const handleSignup = async () => {

    let highestPriorityError1 = '';

    if (penName === '' && email === '') {
      highestPriorityError1 = "필드가 비어 있습니다.";
      setFieldError('필드가 비어 있습니다.')

      return;
    }
    setFieldError('');

    if (highestPriorityError1) {
      setError(highestPriorityError1);
      return;
    }


    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let highestPriorityError2 = '';

    if (!emailRegex.test(email)) {
      highestPriorityError2 = "잘못된 형식의 이메일 주소입니다. 다시 확인해주세요.";
      setEmailError("잘못된 형식의 이메일 주소입니다. 다시 확인해주세요.");
      setEmail('');
      setPassword('');
      setConfirmPassword('')
      return;
    }


    setEmailError('');


    if (highestPriorityError2) {
      setError(highestPriorityError2);
      return;
    }


    if (penName === '') {
      setPenNameError('필드가 비어 있습니다. 필드를 입력하십시오.');
      // console.log('pen name empty');
      return;
    } else {
      setPenNameError('');
    }

    let highestPriorityError3 = '';

    if (password !== confirmpassword) {
      // highestPriorityError3 = "비밀번호가 일치하지 않습니다. 다시 입력해주세요.";
      setPasswordMatchError("비밀번호가 일치하지 않습니다. 다시 확인해주세요.");
      // console.log("password doesnt")
      // console.log(passwordMatchError)
      setPassword('');
      setConfirmPassword('');
      return;
    }

    setPasswordMatchError('');





    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;

    if (!passwordRegex.test(password)) {
      setPasswordMatchError("잘못된 형식의 비밀번호 입니다. 다시 확인해주세요. (영문, 숫자 조합 6자리 이상)");
      // console.log("Invalid password format");
      setPassword('');
      setConfirmPassword('');
      return;
    }

    setPasswordMatchError('');





    if (!checkbox1 || !checkbox2 || !checkbox3) {

      setCheckboxError("모든 체크박스를 선택해주세요.");
      return;
    }


    setCheckboxError('');

    // const response = await fetch('http://localhost:3001/user/sign-up', {
    const response = await fetch('https://backend.aper.cc/user/sign-up', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      body: JSON.stringify({
        penName, email, password,
        // backgroundImage:"https://s3-alpha-sig.figma.com/img/fc35/ed82/43b4edf3518447f7a38b962ff9237c06?Expires=1703462400&Signature=hcRc9ZPvDQo0qZRf7qvw5I9EzspnOjcui5orZwJPaF7DCTFflSc3JtnKA~wdqOi3bA2~UtUAE~hAcrMMIpba7vl7JQrXfdtepDsB5AugG7RTiPwO5T2bHaZMc0eqLqn7laOswLe5Qt4Z5YfzTVakKiSgjUpdqjK2zFv0~uuEAk6iy2vt-RHFANISRB026Jco6eIszB1nugPLqHsbRBpxXsHfaXwScp-CDn7i5saXgJZblxqjOgTGgd9Xy2BTbw7PaA463kVyiwZCk6celuZ1~H~Hb4DhtHMOH631sWJA4MzoVY6rO-XhUhoDELPkIcodcBtXagtzf06yeFreHCix9w__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"

      }),
    });
    // console.log(penName,email,password)
    // console.log('Signup response:', response);
    // const responseData = await response.json();
    if (response.status === 400) {

      setEmailError('이미 가입된 이메일 주소입니다. 다시 확인해주세요.');
      // console.log('email already registedered')
      setEmail('');
      return;
    }

    const data = await response.json();
    // console.log(data)

    if (data.auth) {

      localStorage.setItem("user", JSON.stringify(data?.data));
      localStorage.setItem("pen-name", data?.data.penName)
      localStorage.setItem("token", JSON.stringify(data?.auth));
    }



    if (response.ok) {

      dispatch(setUserData({ penName, email, password }));
      navigate('/backgroundedit');
    } else {

    }
  };

  const handleConfirmClick = () => {
    toggleModal();

    const serviceTermsCheckbox = document.getElementById('serviceTermsCheckbox');
    if (serviceTermsCheckbox) {
      serviceTermsCheckbox.checked = true;
    }
  };

  const handleConfirmClick1 = () => {
    toggleModal1();


    const serviceTermsCheckbox1 = document.getElementById('serviceTermsCheckbox1');
    if (serviceTermsCheckbox1) {
      serviceTermsCheckbox1.checked = true;
    }
  };

  const handlePrivacyPolicyClick = () => {

    setModal(false);
    setModal1(true);
  };

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
      {/* <div className='background-image-1'  loading="lazy">
   

   
      <img className="logo-icon1-signup" alt="" src="/SVG/logo.svg" />
      </div> */}
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
      <div className="contents1-signup   ">
        <div className="frame-group-signup">
          <div className="heading-group-signup">
            <b className="heading1-signup">회원가입</b>
            <div className="group-container-signup">
              <div className="label-button-container-signup">
                <div className="label-button3-signup">
                  <div className="ic-arrow-left4-signup">
                    <div className="ic-arrow-left5-signup">
                      {/* <div className="tint12" /> */}

                    </div>
                  </div>
                  <div className="text5-signup">
                    <div className="div13-signup">이전</div>
                  </div>
                  <img className="nowrite-icon4-signup" alt="" src="/nowrite1.svg" />
                </div>
              </div>
            </div>
          </div>
          <div className="body-signup">
            <div className="inputs-signup">
              <div className="input6-signup">
                <div className="label4-signup">
                  <div className="div14-signup">필명</div>
                </div>
                <div className="input7-signup">
                  <div className="left-tails4-signup">
                    <div className="ic-user4-signup">
                      <div className="ic-user5-signup">
                        <div className="tint13-signup" />
                      </div>
                    </div>
                  </div>

                  <input
                    autoFocus
                    type="text"
                    placeholder="사용하실 필명을 입력하세요"
                    className="placeholder2-signup"
                    style={{
                      border: 'none',
                      background: 'none',
                      outline: 'none',
                      width: '100%',
                    }}
                    onChange={(e) => setName(e.target.value)}
                    value={penName}
                  />
                  <div className="spacing4-signup" />
                  <div className="rightarea6-signup">
                    <img
                      className="ic-checkbox-icon-signup"
                      alt=""
                      src="/nodelete.svg"
                    />
                  </div>
                </div>
                <div className="line4-signup" />
              </div>
              <div className="input6-signup">
                <div className="label4-signup">
                  <div className="div14-signup">이메일 주소</div>
                </div>
                <div className="input7-signup">
                  <div className="left-tails4-signup">
                    <div className="ic-user4-signup">
                      <div className="ic-user5-signup">
                        <div className="tint13-signup" />
                      </div>
                    </div>
                  </div>

                  <input
                    autoFocus
                    type="text"
                    placeholder="이메일 주소를 입력하세요"
                    className="placeholder2-signup"
                    style={{
                      border: 'none',
                      background: 'none',
                      outline: 'none',
                      width: '100%',
                    }}
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  />
                  <div className="spacing4-signup" />
                  <div className="rightarea6-signup">
                    <img
                      className="ic-checkbox-icon-signup"
                      alt=""
                      src="/nodelete.svg"
                    />
                  </div>
                </div>
                <div className="line4-signup" />
              </div>
              <div className="input6-signup">
                <div className="label4-signup">
                  <div className="div14-signup">비밀번호</div>
                </div>
                <div className="input7-signup">
                  <div className="left-tails4-signup">
                    <div className="ic-user4-signup">
                      <div className="ic-pw5-signup">
                        <div className="tint15-signup" />
                      </div>
                    </div>
                  </div>
                  <input
                    autoFocus
                    type="password"
                    placeholder="영문,숫자 조합 6자리 이상"
                    className="placeholder2-signup"
                    style={{
                      border: 'none',
                      background: 'none',
                      outline: 'none',
                      width: '100%',
                    }}
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                  />
                  <div className="value2-signup">Value</div>
                  <div className="spacing4-signup" />

                  <div className="rightarea8-signup">
                    <div className="div17-signup">보기</div>
                    <img
                      className="novisible-icon2-signup"
                      alt=""
                      src="/novisible.svg"
                    />
                  </div>

                  <div className="rightarea6-signup">
                    <img
                      className="ic-checkbox-icon-signup"
                      alt=""
                      src="/nodelete.svg"
                    />
                  </div>
                </div>
                <div className="line4-signup" />
              </div>
              <div className="input6-signup">
                <div className="label4-signup">
                  <div className="div14-signup">비밀번호</div>
                </div>
                <div className="input7-signup">
                  <div className="left-tails4-signup">
                    <div className="ic-user4-signup">
                      <div className="ic-pw5-signup">
                        <div className="tint15-signup" />
                      </div>
                    </div>
                  </div>
                  <input
                    autoFocus
                    type="password"
                    placeholder="영문,숫자 조합 6자리 이상"
                    className="placeholder2-signup"
                    style={{
                      border: 'none',
                      background: 'none',
                      outline: 'none',
                      width: '100%',
                    }}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    value={confirmpassword}
                  />
                  <div className="value2-signup">Value</div>
                  <div className="spacing4-signup" />



                  <div className="rightarea8-signup">
                    <div className="div17-signup">보기</div>
                    <img
                      className="novisible-icon2-signup"
                      alt=""
                      src="/novisible.svg"
                    />
                  </div>

                  <div className="rightarea6-signup">
                    <img
                      className="ic-checkbox-icon-signup"
                      alt=""
                      src="/nodelete.svg"
                    />
                  </div>
                </div>
                <div className="line4-signup" />
              </div>
            </div>
            <div className="agree-signup">
              <div className="div20-signup">
                {/* <img
                  className="ic-checkbox-icon"
                  alt=""
                  src="/lightdarklight-selectedtrue-disablefalse-pressedfalse.svg"
                /> */}
                <input
                  autoFocus
                  type="checkbox"
                  checked={checkbox1} onChange={handleCheckbox1Change}
                  className="ic-checkbox-icon-signup"

                />
                <div className="div21-signup">(필수) 만 14세 이상입니다.</div>
                <div className="parent-signup">
                  <b className="b-signup">내용보기</b>
                  <div className="frame-child-signup" />
                </div>
              </div>
              <div className="div20-signup">
                {/* <img
                  className="ic-checkbox-icon"
                  alt=""
                  src="/ic-checkbox.svg"
                /> */}
                <input
                  autoFocus
                  type="checkbox"
                  className="ic-checkbox-icon-signup"
                  checked={checkbox2} onChange={handleCheckbox2Change}
                  id="serviceTermsCheckbox"
                />
                <div className="div21-signup">(필수) 서비스 이용약관 동의</div>

                <div className="group-signup">
                  <b className="b-signup" onClick={toggleModal1}>보기</b>
                  <div className="frame-item-signup" />
                </div>

              </div>
              <div className="div20-signup">
                <input
                  autoFocus
                  type="checkbox"
                  checked={checkbox3} onChange={handleCheckbox3Change}
                  className="ic-checkbox-icon-signup"
                  id="serviceTermsCheckbox1"
                />
                <div className="div21-signup">(필수) 개인정보 수집 이용 동의</div>

                <div className="group-signup">
                  <b className="b-signup" onClick={toggleModal}>보기</b>
                  <div className="frame-item-signup" />
                </div>

              </div>
            </div>
          </div>
        </div>

        {passwordMatchError && (
          <div className="err">{passwordMatchError}</div>
        )}
        {emailError && (
          <div className="err">{emailError.includes('.') ? emailError.split('.').map((line, index) => (
            <React.Fragment key={index}>
              {line.trim()}
              {index !== emailError.split('.').length - 1 && <br />}
            </React.Fragment>
          )) : emailError}
          </div>
        )}
        {checkboxerror && (
          <div className="err">{checkboxerror}</div>
        )}
        {fielderror && (
          <div className="err">{fielderror}</div>
        )}
       

        {penNameError && (
          <div className="err">{penNameError.includes('.') ? penNameError.split('.').map((line, index) => (
            <React.Fragment key={index}>
              {line.trim()}
              {index !== penNameError.split('.').length - 1 && <br />}
            </React.Fragment>
          )) : penNameError}
          </div>
        )}
        {error && (
          <div className="err">{error}</div>
        )}


        <div className="label-button-parent-signup">
          <Link to="/loginback" className="custom-link-signup-signup">
            <div className="label-button4-signup">
              <div className="ic-arrow-left6-signup">
                <div className="ic-arrow-left7-signup">
                  {/* <div className="tint17" /> */}
                  <img className="tint17-signup" alt="" src="/SVG/ic_arrow_left.svg" />
                </div>
              </div>
              <div className="text6-signup">
                <div className="div27-signup  ">이전</div>
              </div>
              <img className="nowrite-icon5-signup" alt="" src="/nowrite.svg" />
            </div>
          </Link>
          <div className="label-button5-signup" onClick={handleSignup}>
            <div className="nowrite-icon5-signup">
              <div className="ic-write11-signup">
                <div className="tint18-signup" />
              </div>
            </div>
            <div className="text5-signup">
              <div className="div26-signup">회원가입 완료</div>
            </div>
            <img className="nowrite-icon5-signup" alt="" src="/nowrite.svg" />
          </div>
          {/* </Link> */}
        </div>

      </div>
      {modal && (
        <div className="modal-signup">
          <div onClick={toggleModal} className="overlay-signup"></div>
          <div className="modal-content-signup">
            <div className="heading-modaal-signup">
              <b className="b3-signup">개인정보 처리방침</b>

            </div>
            <div className="scrollable-content-signup">

              <div className="modal1-desc-signup">
                <div className="modal-desc2-signup">
                  <p>'에이퍼크리에이터클럽'(이하 '회사')가 운영하는 ‘에이퍼’은(는) 개인정보보호법 제30조 의거 이용자의 개인정보보호와 권익을 보호하고 관련된 고충 및 애로사항을 신속하게 처리하기 위해 아래의 개인정보처리방침을 제정·운영하고 있습니다.<br />
                    <br />
                    회사는 관계법령에서 규정하고 있는 책임과 의무를 준수하고 실천하기 위해 최선의 노력을 하고 있습니다<br />
                    <br />
                    시행일 : 2023-01-13<br />

                  </p>
                </div>
              </div>
              <div className="modad-2nd-desc-signup">
                <div className="modal1-heading2-signup-2">
                  <p>
                    목차
                  </p>

                </div>
                <div className="modal-desc2-signup">
                  <p>제1조 개인정보의 수집 및 이용에 관한 안내<br />
                    제2조 개인정보자동수집 장치의 설치와 운영거부에 관한 사항<br />
                    제3조 개인정보의 보유·이용기간 및 파기.<br />
                    제4조 개인정보 처리 위탁.<br />
                    제5조 개인정보의 제3자 제공.<br />
                    제6조 개인정보의 안전성 확보조치.<br />
                    제7조 이용자 및 법정대리인의 권리와 그 행사 방법.<br />
                    제8조 개인정보보호 책임자 및 이용자 권익침해에 대한 구제방법.<br />
                    제9조 개인정보처리방침 변경에 관한 사항<br />

                  </p>
                </div>

              </div>


              <div className="modad-2nd-desc-signup">
                <div className="heading-modaal-signup">
                  <b className="b33-signup">1조 개인정보의 수집 및 이용에 관한 안내</b>

                </div>

                <div className="modal-desc2-signup">
                  <p>회사는 아래와 같이 제공하는 서비스에 따라 개인정보의 수집목적, 항목, 보유 및 이용기간을 달리하여 서비스제공을 위하여 필요한 최소한의 개인정보를 수집하고 있습니다.
                  </p>
                </div>

              </div>

              <div className="scroll-modal-signup">
                <div className="modal1-heading2-signup">
                  <div className='modal1-heading1-signup'>회원가입 및 서비스 이용</div>
                  <table className="custom-table-signup">
                    <thead>
                      <tr className="model2-heading-signup">
                        <th>수집 목적</th>
                        <th>필수 항목</th>
                        <th>보유·이용기간</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="modal-table-content-signup">
                        <td>서비스 이용 관련 각종 고지 안내</td>
                        <td>이메일 주소</td>
                        <td>회원탈퇴 까지</td>
                      </tr>
                      <tr className="modal-table-content-signup">
                        <td>에이퍼 서비스 회원가입 및 이용자 식별</td>
                        <td>필명, 아이디(이메일주소), 비밀번호</td>
                        <td>회원탈퇴 까지</td>
                      </tr>
                      <tr className="modal-table-content-signup">
                        <td>서비스 문의 및 민원 응대</td>
                        <td>이메일 주소, 문의내용</td>
                        <td>회원탈퇴 까지 또는
                          관련법령에 따른 기간 까지</td>
                      </tr>
                    </tbody>
                  </table>


                  <div className='modal1-heading1-signup'>마케팅</div>
                  <table className="custom-table-signup">
                    <thead>
                      <tr className="model2-heading-signup">
                        <th>수집 목적</th>
                        <th>필수 항목</th>
                        <th>보유·이용기간</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="modal-table-content-signup">
                        <td>할인혜택 안내, 이벤트 안내</td>
                        <td>이메일</td>
                        <td>회원탈퇴 까지 또는
                          동의철회 까지
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="last-modal-signup">

                  <div className='modal1-heading1-signup'> 제 3 조 (약관 외 준칙)</div>
                  <p>
                    본 약관에 규정되지 않은 사항에 대해서는 관련법령 또는 회사가 정한 개별 서비스의 이용약관,
                    운영정책 및 규칙 등(이하 ‘세부지침’)의 규정에 따릅니다.

                  </p>
                </div>

              </div>

              <div className="modad-2nd-desc-signup">
                <div className="modal1-heading2-signup-2">
                  <p>
                    기타
                  </p>

                </div>
                <div className="modal-desc2-signup">
                  <p>
                    회사는 만 14세 미만 아동에게 당사의 서비스를 제공하지 않으며 이와 관련한 개인정보를 수집하지 않습니다.<br />

                    회사가 처리하는 회원정보의 목적과 항목이 변경될 경우에는 관련법령에 따라 사전에 동의를 요청합니다.<br />

                    회사는 주민등록번호 처리를 원칙적으로 금지하며 업무 수행 중 법률, 대통령령, 국회규칙, 대법원규칙,
                    헌법재판소규칙, 중앙선거관리위원회 규칙 및 감사원규칙에서 구체적으로 주민등록번호의 처리를 요구할 경우에만 처리하고 있습니다.<br />

                    회사는 다음의 방식으로 개인정보를 수집하며 수집 전 사전동의를 획득합니다.<br />
                    -
                    서비스 이용 과정에서 이용자가 개인정보를 직접 입력하는 방식<br />
                    -
                    박람회, 세미나, 행사진행 등 오프라인에서 서면으로 개인정보를 수집하는 방식<br />
                    -
                    서비스를 이용하는 과정에 쿠키, 접속로그 등 자동으로 생성 및 수집되는 방식<br />

                  </p>
                </div>

              </div>

              <div className="modad-2nd-desc-signup">
                <div className="heading-modaal-signup">
                  <b className="b33-signup">2조 개인정보자동수집 장치의 설치와 운영거부에 관한 사항</b>

                </div>

                <div className="modal-desc2-signup">
                  <p>회사는 서비스 이용과정에서 이용자로부터 다음과 같은 정보들이 자동으로 생성/수집되고 다음의 목적으로 이용될 수 있습니다.</p>
                </div>

              </div>


              <div className="modad-2nd-desc-signup">
                <div className="modal1-heading2-signup-2">
                  <p>
                    개인정보 자동수집정보 사용목적
                  </p>

                </div>
                <div className="modal-desc2-signup">
                  <p>
                    관련법규의 준수<br />
                    회사는 관련법규의 준수를 위해 이용자의 접속기록(로그인)을 보관할 의무가 있습니다.<br />


                  </p>
                </div>

              </div>

              <div className="modad-2nd-desc-signup">
                <div className="modal1-heading2-signup-2">
                  <p>
                    개인정보 자동수집안내 및 거부방법
                  </p>

                </div>
                <div className="modal-desc2-signup">
                  <p>
                    쿠키의 설치운영 및 거부 방법 : 아래 방법을 통해 쿠키 저장을 거부 할 수 있습니다.<br />

                    [web]
                    - Internet Explorer 웹 브라우저의 경우 : 웹브라우저 상단의 -도구인터넷 옵션 - 개인정보 메뉴의 옵션 설정<br />
                    - Microsoft Edge 웹 브라우저의 경우 : 웹브라우저 상단 메뉴 - 설정  고급 설정 보기 - 쿠키 메뉴의 옵션 설정<br />
                    - Chrome 웹브라우저의 경우 : 웹브라우저 상단 메뉴 - 설정 -고급 - 콘텐츠 설정 - 쿠키 메뉴의 옵션 설정<br />
                    - Chrome 모바일의 경우 : 크롬 App - 오른쪽상단 더보기 - 방문 기록 인터넷 사용 기록 삭제 - 기간선택 - 쿠키 및 사이트 데이터'와 '캐시된 이미지 또는 파일' 옆의 체크박스를 선택 - 인터넷 사용기록 삭제.<br />
                    - Safari 모바일의 경우 : Safari App - 방문기록 및 웹사이트 데이터 지우기 - 확인<br />
                    - Naver 모바일의 경우 : Naver App - 설정 - 캐시삭제 + 인터넷 사용 기록 - 쿠키삭제<br />


                  </p>
                </div>

              </div>

              <div className="modad-2nd-desc-signup">
                <div className="heading-modaal-signup">
                  <b className="b33-signup">3조 개인정보의 보유·이용기간 및 파기</b>

                </div>

                <div className="modal-desc2-signup">
                  <p>회사가 수집한 개인정보는 이용자로부터 개인정보 수집 시에 동의 받은 개인정보 보유·이용기간 내 또는 관련법령에 따른 개인정보 보유·이용기간 내 처리하고 해당 목적이 달성 및 보유이용기간이 경과할 시에는 지체없이 해당 개인정보를 복구 또는 재생할 수 없는 방법으로 파기합니다.

                  </p>
                </div>

              </div>

              <div className="modad-2nd-desc-signup">
                <div className="modal1-heading2-signup-2">
                  <p>
                    이용자정보
                  </p>

                </div>
                <div className="modal-desc2-signup">
                  <p>
                    1.개인정보를 수집한 이용목적을 달성한 경우 회사는 이용자의 모든 개인정보를 삭제합니다.<br />
                    2.단, 관계 법령에서 개인정보를 보존해야할 필요가 있는 경우 해당 법률의 규정에 따릅니다.<br />


                  </p>
                </div>

              </div>


              <div className="scroll-modal-signup">

                <div className="modal1-heading2-signup">



                  <div className='modal1-heading1-signup'>마케팅</div>
                  <table className="custom-table-signup">
                    <thead>
                      <tr className="model2-heading-signup">
                        <th>보유 목적</th>
                        <th>근거 법령</th>
                        <th>보유 기간</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="modal-table-content-signup">
                        <td>접속에 관한 기록보존</td>
                        <td>통신비밀보호법</td>
                        <td>3개월
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>


              </div>



              <div className="modad-2nd-desc-signup">
                <div className="heading-modaal-signup">
                  <b className="b33-signup">4조 개인정보 처리 위탁</b>

                </div>

                <div className="modal-desc2-signup">
                  <p>회사는 원활한 개인정보 업무처리를 위하여 일부 개인정보처리업무를 위탁하고 있으며 위탁 계약 체결 시 관련법령에 따라 수탁자가 개인정보를 안전하게 처리하는지를 감독하고 있습니다. 위탁업무의 내용이나 수탁자가 추가, 변경될 경우에는 지체 없이 관련 법령에 따른 사전 동의 안내 또는 본 개인정보 처리방침을 통하여 공개하도록 하겠습니다.

                  </p>
                </div>

              </div>


              <div className="scroll-modal-signup">

                <div className="modal1-heading2-signup">



                  <div className='modal1-heading1-signup'>개인정보처리 위탁업무 및 수탁사 안내</div>
                  <table className="custom-table-signup">
                    <thead>
                      <tr className="model2-heading-signup">
                        <th>수탁자</th>
                        <th>위탁업무</th>
                        <th>연락처</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="modal-table-content-signup">
                        <td>Amazon Web Service</td>
                        <td>데이터보관 및 전산시스템 운용·관리</td>
                        <td>aws-korea-privacy@amazon.com
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>


              </div>



              <div className="modad-2nd-desc-signup">
                <div className="heading-modaal-signup">
                  <b className="b33-signup">5조 개인정보의 제3자 제공</b>

                </div>

                <div className="modal-desc2-signup">
                  <p>회사는 정보주체의 개인정보를 ‘제1조 개인정보의 수집 및 이용에 관한 안내’에서 명시한 범위 내에서만 처리하며, 이용자의 별도 사전동의, 관련법령의 특별한 요구가 발생하는 경우에만 개인정보를 제3자에게 제공합니다.
                  </p>
                </div>

              </div>


              <div className="modad-2nd-desc-signup">
                <div className="modal1-heading2-signup-2">
                  <p>
                    관련법령에 근거한 사전동의 없는 제3자 제공안내
                  </p>

                </div>
                <div className="modal-desc2-signup">
                  <p>
                    1. 통계작성, 학술연구 또는 시장조사를 위하여 필요한 경우로서 특정 개인을 식별할 수 없는 형태로 제공하는 경우<br />
                    2.관계법령에 의하여 국가기관으로부터 요구받은 경우<br />
                    3.범죄에 대한 수사상의 목적이 있거나, 정보통신 윤리위원회의 요청이 있는 경우.<br />
                    4.기타 관계법령에서 정한 절차에 따른 요청이 있는 경우.<br />


                  </p>
                </div>

              </div>


              <div className="modad-2nd-desc-signup">
                <div className="heading-modaal-signup">
                  <b className="b33-signup">6조 개인정보의 안전성 확보조치</b>

                </div>

                <div className="modal-desc2-signup">
                  <p>회사는 이용자의 개인정보를 안전하게 관리하여 개인정보가 분실, 도난, 유출, 변조 또는 훼손되지 않도록 최선을 다하고 있으며 필요한 기술적, 관리적 및 물리적 조치를 하고 있습니다.


                  </p>
                </div>

              </div>


              <div className="modad-2nd-desc-signup">
                <div className="heading-modaal-signup">
                  <b className="b33-signup">개인정보 취급 직원의 최소화 및 교육

                  </b>

                </div>

                <div className="modal-desc2-signup">
                  <p>개인정보를 취급하는 직원을 최소화하고, 주기적인 개인정보 보호 교육을 실시하여 개인정보를 관리하는 대책을 시행하고 있습니다.


                  </p>
                </div>

              </div>


              <div className="modad-2nd-desc-signup">
                <div className="modal1-heading2-signup-2">
                  <p>
                    내부관리계획의 수립 및 시행
                  </p>

                </div>
                <div className="modal-desc2-signup">
                  <p>
                    개인정보의 안전한 처리를 위하여 내부관리계획을 수립하고 시행하고 있습니다.


                  </p>
                </div>

              </div>
              <div className="modad-2nd-desc-signup">
                <div className="modal1-heading2-signup-2">
                  <p>
                    접속기록의 보관 및 위변조 방지
                  </p>

                </div>
                <div className="modal-desc2-signup">
                  <p>
                    개인정보 침해사고 발생 시 대응이 용이하도록 개인정보처리시스템에 접속한 기록(웹 로그, 요약정보 등)을 최소 1년 이상 보관, 관리하고 있으며, 접속 기록이 위변조 및 도난, 분실되지 않도록 보안기능을 사용하고 있습니다.


                  </p>
                </div>

              </div>
              <div className="modad-2nd-desc-signup">
                <div className="modal1-heading2-signup-2">
                  <p>
                    개인정보의 암호화
                  </p>

                </div>
                <div className="modal-desc2-signup">
                  <p>
                    이용자의 개인정보는 암호화 되어 저장 및 관리되고 있습니다.


                  </p>
                </div>

              </div>
              <div className="modad-2nd-desc-signup">
                <div className="modal1-heading2-signup-2">
                  <p>
                    해킹 등에 대비한 기술적 대책
                  </p>

                </div>
                <div className="modal-desc2-signup">
                  <p>
                    회사는 해킹이나 컴퓨터 바이러스 등에 의한 개인정보 유출 및 훼손을 막기 위하여 보안프로그램을 설치하고 주기적인 갱신·점검을 합니다. 또한 외부로부터 접근이 통제된 구역에 시스템을 설치하고 기술적/물리적으로 감시 및 차단하고 있습니다.




                  </p>
                </div>

              </div>
              <div className="modad-2nd-desc-signup">
                <div className="modal1-heading2-signup-2">
                  <p>
                    개인정보에 대한 접근통제 제한
                  </p>

                </div>
                <div className="modal-desc2-signup">
                  <p>
                    개인정보를 처리하는 개인정보처리시스템에 대한 접근권한의 부여, 변경, 말소를 통하여 개인정보에 대한 접근통제를 위한 조치를 하고 있습니다.


                  </p>
                </div>

              </div>

              <div className="modad-2nd-desc-signup">
                <div className="heading-modaal-signup">
                  <b className="b33-signup">7조 이용자 및 법정대리인의 권리와 그 행사 방법</b>

                </div>

                <div className="modal-desc2-signup">
                  <p>회사는 이용자(또는 법정대리인)의 개인정보 권리를 보호하기 위해 아래와 같이 행사 방법을 마련하고 있습니다.
                  </p>
                </div>

              </div>



              <div className="modad-2nd-desc-signup">
                <div className="modal1-heading2-signup-2">
                  <p>
                    이용자의 권리 및 행사방법
                  </p>

                </div>
                <div className="modal-desc2-signup">
                  <p>
                    1.열람 또는 수정 : Setting - 계정 설정<br />
                    2.회원탈퇴 또는 삭제요청 : Setting - 계정 설정 - 계정 탈퇴하기.<br />
                    3.그 밖에 서면, 전자우편 등을 통하여 개인정보의 처리 정지 및 삭제를 요구할 수 있습니다.<br />
                    4.회사는 개인정보의 오류 등에 대한 정정 또는 삭제를 요청한 경우에는 정정 또는 삭제를 완료하기 전까지 당해 개인정보를 이용하거나 제공하지 않습니다.<br />
                    5.개인정보의 정정 및 삭제 요구는 다른 법령에서 그 개인정보가 수집 대상으로 명시되어 있는 경우에는 당해 개인정보의 삭제를 요구할 수 없습니다.<br />
                    6.회사는 이용자 권리에 따른 열람의 요구, 정정·삭제의 요구, 처리정지의 요구 시 열람 등 요구를 한 자가 본인인지를 확인합니다.<br />



                  </p>
                </div>

              </div>

              <div className="modad-2nd-desc-signup">
                <div className="modal1-heading2-signup-2">
                  <p>
                    법정대리인의 권리 및 행사방법
                  </p>

                </div>
                <div className="modal-desc2-signup">
                  <p>
                    1.이용자의 법정대리인이나 위임을 받은 자 등 대리인이 이용자의 권리(열람, 정정, 처리정지, 삭제)를 행사하는 경우 개인정보보호법 시행규칙 별지 제11호 서식에 따른 위임장을 제출해야 합니다.<br />
                    2.회사는 이용자 권리에 따른 열람의 요구, 정정·삭제의 요구, 처리정지의 요구 시 열람 등 요구를 한 자가 정당한 대리인인지를 확인합니다.<br />



                  </p>
                </div>

              </div>



              <div className="modad-2nd-desc-signup">
                <div className="heading-modaal-signup">
                  <b className="b33-signup">8조 개인정보보호 책임자 및 이용자 권익침해에 대한 구제방법

                  </b>

                </div>

                <div className="modal-desc2-signup">
                  <p>
                    회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 이용자의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보보호책임자를 지정하고 있습니다.


                  </p>
                </div>

              </div>


              <div className="modad-2nd-desc-signup">
                <div className="modal1-heading2-signup-2">
                  <p>
                    개인정보보호 책임자
                  </p>

                </div>
                <div className="modal-desc2-signup">
                  <p>
                    성명 : 유수연<br />
                    직책 : 대표<br />
                    연락처: aper.creator.club@gmail.com<br />



                  </p>
                </div>

              </div>



              <div className="modad-2nd-desc-signup">
                <div className="modal1-heading2-signup-2">
                  <p>
                    개인정보보호 책임자의 역할
                  </p>

                </div>
                <div className="modal-desc2-signup">
                  <p>
                    이용자는 서비스를 이용하면서 발생한 모든 개인정보보호 관련 문의, 불만처리, 피해구제 등에 관한 사항을 개인정보보호책임자에게 문의하실 수 있습니다. 회사는 이용자의 문의에 대해 지체 없이 답변 및 처리해드릴 것입니다.



                  </p>
                </div>

              </div>


              <div className="modad-2nd-desc-signup">
                <div className="modal1-heading2-signup-2">
                  <p>
                    권익침해관련 도움받을수 있는 기관
                  </p>

                </div>
                <div className="modal-desc2-signup">
                  <p>
                    이용자의 권익침해 관련 자세한 도움이 필요하시면 아래 기관에 문의하여 주시기 바랍니다.<br />

                    1. 개인정보 침해신고센터 (한국인터넷진흥원 운영)<br />
                    - 소관업무 : 개인정보 침해사실 신고, 상담 신청<br />
                    - 홈페이지 : privacy.kisa.or.kr<br />
                    - 전화 : (국번없이) 118<br />
                    - 주소 : (58324) 전남 나주시 진흥길 9(빛가람동 301-2) 3층 개인정보침해신고센터<br />
                    2.개인정보 분쟁조정위원회<br />
                    - 소관업무 : 개인정보 분쟁조정신청, 집단분쟁조정 (민사적 해결)<br />
                    - 홈페이지 : www.kopico.go.kr<br />
                    - 전화 : (국번없이) 1833-6972<br />
                    - 주소 : (03171) 서울특별시 종로구 세종대로 209 정부서울청사 4층<br />
                    3.대검찰청 사이버범죄수사단<br />
                    - 전화 : 02-3480-3573<br />
                    - 홈페이지 : www.spo.go.kr<br />
                    4.경찰청 사이버안전국<br />
                    - 전화 : 182<br />
                    - 홈페이지 : cyberbureau.police.go.kr<br />




                  </p>
                </div>

              </div>



              <div className="modad-2nd-desc-signup">
                <div className="heading-modaal-signup">
                  <b className="b33-signup">9조 개인정보처리방침 변경에 관한 사항

                  </b>

                </div>

                <div className="modal-desc2-signup">
                  <p>개인정보처리방침은 시행일로부터 적용되며, 관련법령 및 방침에 따른 변경내용의 추가, 삭제 및 정정이 있는 경우에는 지체없이 홈페이지를 통하여 고지할 것입니다.


                  </p>
                </div>

              </div>








              <div className="label-button-signup">
                <div className="text5-signup">
                  <div className="div26-signup">
                    <button className="custom-button-signup-1" onClick={handleConfirmClick}>
                      확인
                    </button></div>
                </div>
              </div>
            </div>



            <button className="close-modal-signup-2" onClick={toggleModal}>
              <img
                className='close2'
                alt=""
                src="/SVG/ic_close (1).svg"
              />
            </button>
          </div>
        </div>
      )}
      {
        modal1 && (
          <div className="modal-signup">
            <div onClick={toggleModal} className="overlay-signup"></div>
            <div className="modal-content-signup">
              <div className="heading-modaal-signup">
                <b className="b3-signup">서비스 이용약관</b>
              </div>
              <div className="scrollable-content-signup">
                <div className="modal1-desc-signup">
                  <div className="modal1-heading-signup">
                    <p >
                      제1장 총칙
                    </p>

                  </div>
                  <div className="modal1-heading2-signup-2">
                    <p>
                      제 1 조 (목적)
                    </p>

                  </div>
                  <div className="modal-desc2-signup">
                    <p>이 약관은 회원(본 약관에 동의한 자를 말합니다. 이하 “회원”)이 에이퍼크리에이터클럽(이하 ‘회사’)가 온라인으로 제공하는 디지털콘텐츠(이하 "콘텐츠"라고 한다) 및 콘텐츠 생산 제반서비스의 이용과 관련하여 회사와 이용자와의 권리, 의무 및 책임사항 등을 규정함을 목적으로 합니다.
                    </p>
                  </div>
                </div>
                <div className="modad-2nd-desc-signup">
                  <div className="modal1-heading2-signup-2">
                    <p>
                      제2조(정의)
                    </p>

                  </div>
                  <div className="modal-desc2-signup">
                    <p>이 약관에서 사용하는 용어의 정의는 다음과 같습니다.<br />
                      1. "회사"라 함은 "콘텐츠" 산업과 관련된 경제활동을 영위하는 자로서 콘텐츠 및 콘텐츠 생산 제반서비스를 제공하는 자를 말합니다.<br />
                      2. "이용자"라 함은 "회사"의 사이트에 접속하여 이 약관에 따라 "회사"가 제공하는 "콘텐츠" 및 콘텐츠 생산 제반서비스를 이용하는 회원 및 비회원을 말합니다.<br />
                      3. "회원"이라 함은 "회사"와 이용계약을 체결하고 "이용자" 아이디(ID)를 부여받은 "이용자"로서 "회사"의 정보를 지속적으로 제공받으며 "회사"가 제공하는 서비스를 지속적으로 이용할 수 있는 자를 말합니다.<br />
                      4. "비회원"이라 함은 "회원"이 아니면서 "회사"가 제공하는 서비스를 이용하는 자를 말합니다.<br />
                      5. "콘텐츠"라 함은 정보통신망이용촉진 및 정보보호 등에 관한 법률 제2조 제1항 제1호의 규정에 의한 정보통신망에서 사용되는 부호·문자·음성·음향·이미지 또는 영상 등으로 표현된 자료 또는 정보로서, 그 보존 및 이용에 있어서 효용을 높일 수 있도록 전자적 형태로 제작 또는 처리된 것을 말합니다.<br />
                      6. "아이디(ID)"라 함은 "회원"의 식별과 서비스이용을 위하여 "회원"이 정하고 "회사"가 승인하는 문자 또는 숫자의 조합을 말합니다.<br />
                      7. "비밀번호(PASSWORD)"라 함은 "회원"이 부여받은 "아이디"와 일치되는 "회원"임을 확인하고 비밀보호를 위해 "회원" 자신이 정한 문자 또는 숫자의 조합을 말합니다.<br />


                    </p>
                  </div>

                </div>
                <div className="modad-2nd-desc-signup">
                  <div className="modal1-heading2-signup-2">
                    <p>
                      제3조(신원정보 등의 제공)
                    </p>

                  </div>
                  <div className="modal-desc2-signup">
                    <p>"회사"는 이 약관의 내용, 상호, 대표자 성명, 영업소 소재지 주소(소비자의 불만을 처리할 수 있는 곳의 주소를 포함), 전화번호, 모사전송번호, 전자우편주소, 사업자등록번호, 통신판매업 신고번호 및 개인정보관리책임자 등을 이용자가 쉽게 알 수 있도록 온라인 서비스초기화면에 게시합니다. 다만, 약관은 이용자가 연결화면을 통하여 볼 수 있도록 할 수 있습니다.

                    </p>
                  </div>

                </div>
                <div className="modad-2nd-desc-signup">
                  <div className="modal1-heading2-signup-2">
                    <p>
                      제4조(약관의 게시 등)
                    </p>

                  </div>
                  <div className="modal-desc2-signup">
                    <p>① "회사"는 이 약관을 "회원"이 그 전부를 인쇄할 수 있고 거래과정에서 해당 약관의 내용을 확인할 수 있도록 기술적 조치를 취합니다.<br />
                      ② "회사"는 "이용자"가 "회사"와 이 약관의 내용에 관하여 질의 및 응답할 수 있도록 기술적 장치를 설치합니다.<br />
                      ③ "회사"는 "이용자"가 약관에 동의하기에 앞서 약관에 정하여져 있는 내용 중 청약철회, 환불조건 등과 같은 중요한 내용을 이용자가 쉽게 이해할 수 있도록 별도의 연결화면 또는 팝업화면 등을 제공하여 "이용자"의 확인을 구합니다.<br />


                    </p>
                  </div>

                </div>

                <div className="modad-2nd-desc-signup">
                  <div className="modal1-heading2-signup-2">
                    <p>

                      제5조(약관의 개정 등)

                    </p>

                  </div>
                  <div className="modal-desc2-signup">
                    <p>① "회사"는 온라인 디지털콘텐츠산업 발전법, 전자상거래 등에서의 소비자보호에 관한 법률, 약관의 규제에 관한 법률 등 관련법을 위배하지 않는 범위에서 이 약관을 개정할 수 있습니다.<br />
                      ② "회사"가 약관을 개정할 경우에는 적용일자 및 개정사유를 명시하여 현행약관과 함께 서비스초기화면에 그 적용일자 7일 이전부터 적용일 후 상당한 기간동안 공지하고, 기존회원에게는 개정약관을 전자우편주소로 발송합니다.<br />
                      ③ "회사"가 약관을 개정할 경우에는 개정약관 공지 후 개정약관의 적용에 대한 "이용자"의 동의 여부를 확인합니다. "이용자"가 개정약관의 적용에 동의하지 않는 경우 "회사" 또는 "이용자"는 콘텐츠 이용계약을 해지할 수 있습니다. 이때, "회사"는 계약해지로 인하여 "이용자"가 입은 손해를 배상합니다.<br />


                    </p>
                  </div>

                </div>


                <div className="modad-2nd-desc-signup">
                  <div className="modal1-heading2-signup-2">
                    <p>

                      제6조(약관의 해석)

                    </p>

                  </div>
                  <div className="modal-desc2-signup">
                    <p>이 약관에서 정하지 아니한 사항과 이 약관의 해석에 관하여는 온라인 디지털콘텐츠산업 발전법, 전자상거래 등에서의 소비자보호에 관한 법률, 약관의 규제에 관한 법률, 문화체육관광부장관이 정하는 디지털콘텐츠이용자보호지침, 기타 관계법령 또는 상관례에 따릅니다.


                    </p>
                  </div>

                </div>


                <div className="modad-2nd-desc-signup">
                  <div className="modal1-heading-signup">
                    <p >
                      제2장 회원가입
                    </p>

                  </div>
                  <div className="modal1-heading2-signup-2">
                    <p>

                      제7조(회원가입)

                    </p>

                  </div>
                  <div className="modal-desc2-signup">
                    <p>① 회원가입은 "이용자"가 약관의 내용에 대하여 동의를 하고 회원가입신청을 한 후 "회사"가 이러한 신청에 대하여 승낙함으로써 체결됩니다.<br />
                      ② 회원가입신청서에는 다음 사항을 기재해야 합니다. 1호 내지 3호의 사항은 필수사항이며, 그 외의 사항은 선택사항입니다.<br />
                      1. "회원"의 성명과 주민등록번호 또는 인터넷상 개인식별번호<br />
                      2. "아이디"와 "비밀번호"<br />
                      3. 전자우편주소<br />
                      4. 이용하려는 "콘텐츠"의 종류<br />
                      5. 기타 "회사"가 필요하다고 인정하는 사항<br />
                      ③ "회사"는 상기 "이용자"의 신청에 대하여 회원가입을 승낙함을 원칙으로 합니다. 다만, "회사"는 다음 각 호에 해당하는 신청에 대하여는 승낙을 하지 않을 수 있습니다.<br />
                      1. 가입신청자가 이 약관에 의하여 이전에 회원자격을 상실한 적이 있는 경우<br />
                      2. 실명이 아니거나 타인의 명의를 이용한 경우<br />
                      3. 허위의 정보를 기재하거나, 회사가 제시하는 내용을 기재하지 않은 경우<br />
                      4. 이용자의 귀책사유로 인하여 승인이 불가능하거나 기타 규정한 제반 사항을 위반하며 신청하는 경우<br />
                      ④ "회사"는 서비스 관련 설비의 여유가 없거나, 기술상 또는 업무상 문제가 있는 경우에는 승낙을 유보할 수 있습니다.<br />
                      ⑤ 제3항과 제4항에 따라 회원가입신청의 승낙을 하지 아니하거나 유보한 경우, "회사"는 이를 신청자에게 알려야 합니다. "회사"의 귀책사유 없이 신청자에게 통지할 수 없는 경우에는 예외로 합니다.<br />
                      ⑥ 회원가입계약의 성립 시기는 "회사"의 승낙이 "이용자"에게 도달한 시점으로 합니다.<br />



                    </p>
                  </div>

                </div>

                <div className="modad-2nd-desc-signup">
                  <div className="modal1-heading2-signup-2">
                    <p>

                      제8조(미성년자의 회원가입에 관한 특칙)

                    </p>

                  </div>
                  <div className="modal-desc2-signup">
                    <p>① 만 14세 미만의 "이용자"는 개인정보의 수집 및 이용목적에 대하여 충분히 숙지하고 부모 등 법정대리인의 동의를 얻은 후에 회원가입을 신청하고 본인의 개인정보를 제공하여야 합니다.<br />
                      ② 회사는 부모 등 법정대리인의 동의에 대한 확인절차를 거치지 않은 14세 미만 이용자에 대하여는 가입을 취소 또는 불허합니다.<br />
                      ③ 만 14세 미만 "이용자"의 부모 등 법정대리인은 아동에 대한 개인정보의 열람, 정정, 갱신을 요청하거나 회원가입에 대한 동의를 철회할 수 있으며, 이러한 경우에 "회사"는 지체 없이 필요한 조치를 취해야 합니다.<br />



                    </p>
                  </div>

                </div>

                <div className="modad-2nd-desc-signup">
                  <div className="modal1-heading2-signup-2">
                    <p>

                      제9조(회원정보의 변경)

                    </p>

                  </div>
                  <div className="modal-desc2-signup">
                    <p>① "회원"은 개인정보관리화면을 통하여 언제든지 자신의 개인정보를 열람하고 수정할 수 있습니다.<br />
                      ② "회원"은 회원가입신청 시 기재한 사항이 변경되었을 경우 온라인으로 수정을 하거나 전자우편 기타 방법으로 "회사"에 대하여 그 변경사항을 알려야 합니다.<br />
                      ③ 제2항의 변경사항을 "회사"에 알리지 않아 발생한 불이익에 대하여 "회사"는 책임지지 않습니다.<br />




                    </p>
                  </div>

                </div>

                <div className="modad-2nd-desc-signup">
                  <div className="modal1-heading2-signup-2">
                    <p>

                      제10조("회원"의 "아이디" 및 "비밀번호"의 관리에 대한 의무)

                    </p>

                  </div>
                  <div className="modal-desc2-signup">
                    <p>① "회원"의 "아이디"와 "비밀번호"에 관한 관리책임은 "회원"에게 있으며, 이를 제3자가 이용하도록 하여서는 안 됩니다.<br />
                      ② "회원"은 "아이디" 및 "비밀번호"가 도용되거나 제3자에 의해 사용되고 있음을 인지한 경우에는 이를 즉시 "회사"에 통지하고 "회사"의 안내에 따라야 합니다.<br />
                      ③ 제2항의 경우에 해당 "회원"이 "회사"에 그 사실을 통지하지 않거나, 통지한 경우에도 "회사"의 안내에 따르지 않아 발생한 불이익에 대하여 "회사"는 책임지지 않습니다.<br />




                    </p>
                  </div>

                </div>

                <div className="modad-2nd-desc-signup">
                  <div className="modal1-heading2-signup-2">
                    <p>

                      제11조("회원"에 대한 통지)

                    </p>

                  </div>
                  <div className="modal-desc2-signup">
                    <p>① "회사"가 "회원"에 대한 통지를 하는 경우 "회원"이 지정한 전자우편주소로 할 수 있습니다.<br />
                      ② "회사"는 "회원" 전체에 대한 통지의 경우 7일 이상 "회사"의 게시판에 게시함으로써 제1항의 통지에 갈음할 수 있습니다. 다만, "회원" 본인의 거래와 관련하여 중대한 영향을 미치는 사항에 대하여는 제1항의 통지를  합니다.<br />





                    </p>
                  </div>

                </div>

                <div className="modad-2nd-desc-signup">
                  <div className="modal1-heading2-signup-2">
                    <p>

                      제12조(회원탈퇴 및 자격 상실 등)

                    </p>

                  </div>
                  <div className="modal-desc2-signup">
                    <p>① "회원"은 "회사"에 언제든지 탈퇴를 요청할 수 있으며 "회사"는 즉시 회원탈퇴를 처리합니다.<br />
                      ② "회원"이 다음 각호의 사유에 해당하는 경우, "회사"는 회원자격을 제한 및 정지시킬 수 있습니다.<br />
                      1. 가입신청 시에 허위내용을 등록한 경우<br />
                      2. "회사"의 서비스이용대금, 기타 "회사"의 서비스이용에 관련하여 회원이 부담하는 채무를 기일에 이행하지 않는 경우<br />
                      3. 다른 사람의 "회사"의 서비스이용을 방해하거나 그 정보를 도용하는 등 전자상거래 질서를 위협하는 경우<br />
                      4. "회사"를 이용하여 법령 또는 이 약관이 금지하거나 공서양속에 반하는 행위를 하는 경우<br />
                      ③ "회사"가 회원자격을 제한·정지시킨 후, 동일한 행위가 2회 이상 반복되거나 30일 이내에 그 사유가 시정되지 아니하는 경우 "회사"는 회원자격을 상실시킬 수 있습니다.<br />
                      ④ "회사"가 회원자격을 상실시키는 경우에는 회원등록을 말소합니다. 이 경우 "회원"에게 이를 통지하고, 회원등록 말소 전에 최소한 30일 이상의 기간을 정하여 소명할 기회를 부여합니다.<br />





                    </p>
                  </div>

                </div>
                <div className="modad-2nd-desc-signup">
                  <div className="modal1-heading-signup">
                    <p >
                      제3장 콘텐츠이용계약
                    </p>

                  </div>
                  <div className="modal1-heading2-signup-2">
                    <p>

                      제13조("콘텐츠"의 내용 등의 게시)

                    </p>

                  </div>
                  <div className="modal-desc2-signup">
                    <p>① "회사"는 다음 사항을 해당 "콘텐츠"의 이용초기화면이나 그 포장에 "이용자"가 알기 쉽게 표시합니다.<br />
                      1. "콘텐츠"의 명칭 또는 제호<br />
                      2. "콘텐츠"의 제작 및 표시 연월일<br />
                      3. "콘텐츠" 제작자의 성명(법인인 경우에는 법인의 명칭), 주소, 전화번호<br />
                      4. "콘텐츠"의 내용, 이용방법, 이용료 기타 이용조건<br />





                    </p>
                  </div>

                </div>
                <div className="modad-2nd-desc-signup">
                  <div className="modal1-heading2-signup-2">
                    <p>

                      제14조(이용계약의 성립 등)

                    </p>

                  </div>
                  <div className="modal-desc2-signup">
                    <p>① "이용자"는 "회사"가 제공하는 다음 또는 이와 유사한 절차에 의하여 이용신청을 합니다. "회사"는 계약 체결 전에 각 호의 사항에 관하여 "이용자"가 정확하게 이해하고 실수 또는 착오 없이 거래할 수 있도록 정보를 제공합니다.<br />
                      1. "콘텐츠" 목록의 열람 및 선택<br />
                      2. 성명, 주소, 전화번호(또는 이동전화번호), 전자우편주소 등의 입력<br />
                      3. 약관내용, 청약철회가 불가능한 "콘텐츠"에 대해 "회사"가 취한 조치에 관련한 내용에 대한 확인<br />
                      4. 이 약관에 동의하고 위 제3호의 사항을 확인하거나 거부하는 표시(예, 마우스 클릭)<br />
                      5. "콘텐츠"의 이용신청에 관한 확인 또는 "회사"의 확인에 대한 동의<br />
                      6. 결제방법의 선택<br />
                      ② "회사"는 "이용자"의 이용신청이 다음 각 호에 해당하는 경우에는 승낙하지 않거나 승낙을 유보할 수 있습니다.<br />
                      1. 실명이 아니거나 타인의 명의를 이용한 경우<br />
                      2. 허위의 정보를 기재하거나, "회사"가 제시하는 내용을 기재하지 않은 경우<br />
                      3. 미성년자가 청소년보호법에 의해서 이용이 금지되는 "콘텐츠"를 이용하고자 하는 경우<br />
                      4. 서비스 관련 설비의 여유가 없거나, 기술상 또는 업무상 문제가 있는 경우<br />
                      ③ "회사"의 승낙이 제16조 제1항의 수신확인통지형태로 "이용자"에게 도달한 시점에 계약이 성립한 것으로 봅니다.<br />
                      ④ "회사"의 승낙의 의사표시에는 "이용자"의 이용신청에 대한 확인 및 서비스제공 가능여부, 이용신청의 정정·취소 등에 관한 정보 등을 포함합니다.<br />





                    </p>
                  </div>

                </div>
                <div className="modad-2nd-desc-signup">
                  <div className="modal1-heading2-signup-2">
                    <p>

                      제15조(미성년자 이용계약에 관한 특칙)

                    </p>

                  </div>
                  <div className="modal-desc2-signup">
                    <p>"회사"는 만 20세 미만의 미성년이용자가 유료서비스를 이용하고자 하는 경우에 부모 등 법정 대리인의 동의를 얻거나, 계약체결 후 추인을 얻지 않으면 미성년자 본인 또는 법정대리인이 그 계약을 취소할 수 있다는 내용을 계약체결 전에 고지하는 조치를 취합니다.




                    </p>
                  </div>

                </div>
                <div className="modad-2nd-desc-signup">
                  <div className="modal1-heading2-signup-2">
                    <p>

                      제16조(수신확인통지·이용신청 변경 및 취소)

                    </p>

                  </div>
                  <div className="modal-desc2-signup">
                    <p>① "회사"는 "이용자"의 이용신청이 있는 경우 "이용자"에게 수신확인통지를 합니다.<br />
                      ② 수신확인통지를 받은 "이용자"는 의사표시의 불일치 등이 있는 경우에는 수신확인통지를 받은 후 즉시 이용신청 변경 및 취소를 요청할 수 있고, "회사"는 서비스제공 전에 "이용자"의 요청이 있는 경우에는 지체 없이 그 요청에 따라 처리하여야 합니다. 다만, 이미 대금을 지불한 경우에는 청약철회 등에 관한 제27조의 규정에 따릅니다.<br />





                    </p>
                  </div>

                </div>
                <div className="modad-2nd-desc-signup">
                  <div className="modal1-heading2-signup-2">
                    <p>

                      제17조("회사"의 의무)

                    </p>

                  </div>
                  <div className="modal-desc2-signup">
                    <p>① "회사"는 법령과 이 약관이 정하는 권리의 행사와 의무의 이행을 신의에 좇아 성실하게 하여야 합니다.<br />
                      ② "회사"는 "이용자"가 안전하게 "콘텐츠"를 이용할 수 있도록 개인정보(신용정보 포함)보호를 위해 보안시스템을 갖추어야 하며 개인정보보호정책을 공시하고 준수합니다.<br />
                      ③ "회사"는 "이용자"가 콘텐츠이용 및 그 대금내역을 수시로 확인할 수 있도록 조치합니다.<br />
                      ④ "회사"는 콘텐츠이용과 관련하여 "이용자"로부터 제기된 의견이나 불만이 정당하다고 인정할 경우에는 이를 지체없이 처리합니다. 이용자가 제기한 의견이나 불만사항에 대해서는 게시판을 활용하거나 전자우편 등을 통하여 그 처리과정 및 결과를 전달합니다.<br />
                      ⑤ "회사"는 이 약관에서 정한 의무 위반으로 인하여 "이용자"가 입은 손해를 배상합니다.<br />


                    </p>
                  </div>

                </div>
                <div className="modad-2nd-desc-signup">
                  <div className="modal1-heading2-signup-2">
                    <p>

                      제18조("이용자"의 의무)

                    </p>

                  </div>
                  <div className="modal-desc2-signup">
                    <p>① "이용자"는 다음 행위를 하여서는 안 됩니다.<br />
                      1. 신청 또는 변경 시 허위내용의 기재.<br />
                      2. 타인의 정보도용.<br />
                      3. "회사"에 게시된 정보의 변경.<br />
                      4. "회사"가 금지한 정보(컴퓨터 프로그램 등)의 송신 또는 게시.<br />
                      5. "회사"와 기타 제3자의 저작권 등 지적재산권에 대한 침해.<br />
                      6. "회사" 및 기타 제3자의 명예를 손상시키거나 업무를 방해하는 행위.<br />
                      7. 외설 또는 폭력적인 말이나 글, 화상, 음향, 기타 공서양속에 반하는 정보를 "회사"의 사이트에 공개 또는 게시하는 행위.<br />
                      8. 기타 불법적이거나 부당한 행위.<br />
                      ② "이용자"는 관계법령, 이 약관의 규정, 이용안내 및 "콘텐츠"와 관련하여 공지한 주의사항, "회사"가 통지하는 사항 등을 준수하여야 하며, 기타 "회사"의 업무에 방해되는 행위를 하여서는 안 됩니다.<br />




                    </p>
                  </div>

                </div>
                <div className="modad-2nd-desc-signup">
                  <div className="modal1-heading2-signup-2">
                    <p>

                      제19조(지급방법)

                    </p>

                  </div>
                  <div className="modal-desc2-signup">
                    <p>"콘텐츠"의 이용에 대한 대금지급방법은 다음 각 호의 방법 중 가능한 방법으로 할 수 있습니다. 다만, "회사"는 "이용자"의 지급방법에 대하여 어떠한 명목의 수수료도 추가하여 징수하지 않습니다.<br />
                      1. 폰뱅킹, 인터넷뱅킹, 메일 뱅킹 등의 각종 계좌이체.<br />
                      2. 선불카드, 직불카드, 신용카드 등의 각종 카드결제.<br />
                      3. 온라인무통장입금.<br />
                      4. 전자화폐에 의한 결제.<br />
                      5. 마일리지 등 "회사"가 지급한 포인트에 의한 결제.<br />
                      6. "회사"와 계약을 맺었거나 "회사"가 인정한 상품권에 의한 결제.<br />
                      7. 전화 또는 휴대전화를 이용한 결제.<br />
                      8. 기타 전자적 지급방법에 의한 대금지급 등



                    </p>
                  </div>

                </div>
                <div className="modad-2nd-desc-signup">
                  <div className="modal1-heading2-signup-2">
                    <p>

                      제20조(콘텐츠서비스의 제공 및 중단)

                    </p>

                  </div>
                  <div className="modal-desc2-signup">
                    <p>① 콘텐츠서비스는 연중무휴, 1일 24시간 제공함을 원칙으로 합니다.<br />
                      ② "회사"는 컴퓨터 등 정보통신설비의 보수점검, 교체 및 고장, 통신두절 또는 운영상 상당한 이유가 있는 경우 콘텐츠서비스의 제공을 일시적으로 중단할 수 있습니다. 이 경우 "회사"는 제11조["회원"에 대한 통지]에 정한 방법으로 "이용자"에게 통지합니다. 다만, "회사"가 사전에 통지할 수 없는 부득이한 사유가 있는 경우 사후에 통지할 수 있습니다.<br />
                      ③ "회사"는 상당한 이유 없이 콘텐츠서비스의 제공이 일시적으로 중단됨으로 인하여 "이용자"가 입은 손해에 대하여 배상합니다. 다만, "회사"가 고의 또는 과실이 없음을 입증하는 경우에는 그러하지 아니합니다.<br />
                      ④ "회사"는 콘텐츠서비스의 제공에 필요한 경우 정기점검을 실시할 수 있으며, 정기점검시간은 서비스제공화면에 공지한 바에 따릅니다.<br />
                      ⑤ 사업종목의 전환, 사업의 포기, 업체 간의 통합 등의 이유로 콘텐츠서비스를 제공할 수 없게 되는 경우에는 "회사"는 제11조["회원"에 대한 통지]에 정한 방법으로 "이용자"에게 통지하고 당초 "회사"에서 제시한 조건에 따라 "이용자"에게 보상합니다. 다만, "회사"가 보상기준 등을 고지하지 아니하거나, 고지한 보상기준이 적절하지 않은 경우에는 "이용자"들의 마일리지 또는 적립금 등을 현물 또는 현금으로 "이용자"에게 지급합니다.<br />




                    </p>
                  </div>

                </div>
                <div className="modad-2nd-desc-signup">
                  <div className="modal1-heading2-signup-2">
                    <p>

                      제21조(콘텐츠서비스의 변경)

                    </p>

                  </div>
                  <div className="modal-desc2-signup">
                    <p>① "회사"는 상당한 이유가 있는 경우에 운영상, 기술상의 필요에 따라 제공하고 있는 콘텐츠서비스 및 콘텐츠 생산 제반 서비스를 변경할 수 있습니다.<br />
                      ② "회사"는 콘텐츠서비스의 내용, 이용방법, 이용시간을 변경할 경우에 변경사유, 변경될 콘텐츠서비스의 내용 및 제공일자 등을 그 변경 전 7일 이상 해당 콘텐츠초기화면에 게시합니다.<br />
                      ③ 제2항의 경우에 변경된 내용이 중대하거나 "이용자"에게 불리한 경우에는 "회사"가 해당 콘텐츠서비스를 제공받는 "이용자"에게 제11조["회원"에 대한 통지]에 정한 방법으로 통지하고 동의를 받습니다. 이때, "회사"는 동의를 거절한 "이용자"에 대하여는 변경전 서비스를 제공합니다. 다만, 그러한 서비스 제공이 불가능할 경우 계약을 해지할 수 있습니다.<br />
                      ④ "회사"는 제1항에 의한 서비스의 변경 및 제3항에 의한 계약의 해지로 인하여 "이용자"가 입은 손해를 배상합니다.<br />

                    </p>
                  </div>

                </div>
                <div className="modad-2nd-desc-signup">
                  <div className="modal1-heading2-signup-2">
                    <p>

                      제22조(정보의 제공 및 광고의 게재)

                    </p>

                  </div>
                  <div className="modal-desc2-signup">
                    <p>① "회사"는 "이용자"가 콘텐츠이용 중 필요하다고 인정되는 다양한 정보를 공지사항이나 전자우편 등의 방법으로 "회원"에게 제공할 수 있습니다. 다만, "회원"은 언제든지 전자우편 등을 통하여 수신 거절을 할 수 있습니다.<br />
                      ② 제1항의 정보를 전화 및 모사전송기기에 의하여 전송하려고 하는 경우에는 "회원"의 사전 동의를 받아서 전송합니다.<br />
                      ③ "회사"는 "콘텐츠"서비스 제공과 관련하여 콘텐츠화면, 홈페이지, 전자우편 등에 광고를 게재할 수 있습니다. 광고가 게재된 전자우편 등을 수신한 "회원"은 수신거절을 "회사"에게 할 수 있습니다.<br />





                    </p>
                  </div>

                </div>
                <div className="modad-2nd-desc-signup">
                  <div className="modal1-heading2-signup-2">
                    <p>

                      제23조(게시물의 삭제)

                    </p>

                  </div>
                  <div className="modal-desc2-signup">
                    <p>① "회사"는 게시판에 정보통신망이용촉진 및 정보보호 등에 관한 법률을 위반한 청소년유해매체물이 게시되어 있는 경우에는 이를 지체 없이 삭제 합니다. 다만, 19세 이상의 "이용자"만 이용할 수 있는 게시판은 예외로 합니다.<br />
                      ② “회사”는 성 차별, 성소수자 혐오, 약자 혐오, 인종 및 종교적 차별 등 다양한 혐오·폭력을 바탕으로 한 게시물에 대해 통보 없이 삭제 조치할 수 있습니다. <br />
                      ③ "회사"가 운영하는 게시판 등에 게시된 정보로 인하여 법률상 이익이 침해된 자는 "회사"에게 당해 정보의 삭제 또는 반박내용의 게재를 요청할 수 있습니다. 이 경우 "회사"는 지체 없이 필요한 조치를 취하고 이를 즉시 신청인에게 통지합니다.<br />





                    </p>
                  </div>

                </div>
                <div className="modad-2nd-desc-signup">
                  <div className="modal1-heading2-signup-2">
                    <p>

                      제24조(저작권 등의 귀속)

                    </p>

                  </div>
                  <div className="modal-desc2-signup">
                    <p>① "회사"가 작성한 저작물에 대한 저작권 기타 지적재산권은 "회사"에 귀속합니다.<br />
                      ② "회사"가 제공하는 서비스 중 제휴계약에 의해 제공되는 저작물에 대한 저작권 기타 지적재산권은 해당 제공업체에 귀속합니다.<br />
                      ③ "이용자"는 "회사"가 제공하는 서비스를 이용함으로써 얻은 정보 중 "회사" 또는 제공업체에 지적재산권이 귀속된 정보를 "회사" 또는 제공업체의 사전승낙 없이 복제, 전송, 출판, 배포, 방송 기타 방법에 의하여 영리목적으로 이용하거나 제3자에게 이용하게 하여서는 안 됩니다.<br />
                      ④ "회사"는 약정에 따라 "이용자"의 저작물을 사용하는 경우 당해 "이용자"의 허락을 받습니다..<br />





                    </p>
                  </div>

                </div>
                <div className="modad-2nd-desc-signup">
                  <div className="modal1-heading2-signup-2">
                    <p>

                      제25조(개인정보보호)

                    </p>

                  </div>
                  <div className="modal-desc2-signup">
                    <p>① "회사"는 제7조 제2항의 신청서기재사항 이외에 "이용자"의 콘텐츠이용에 필요한 최소한의 정보를 수집할 수 있습니다. 이를 위해 "회사"가 문의한 사항에 관해 "이용자"는 진실한 내용을 성실하게 고지하여야 합니다.<br />
                      ② "회사"가 "이용자"의 개인 식별이 가능한 "개인정보"를 수집하는 때에는 당해 "이용자"의 동의를 받습니다.<br />
                      ③ "회사"는 "이용자"가 이용신청 등에서 제공한 정보와 제1항에 의하여 수집한 정보를 당해 "이용자"의 동의 없이 목적 외로 이용하거나 제3자에게 제공할 수 없으며, 이를 위반한 경우에 모든 책임은 "회사"가 집니다. 다만, 다음의 경우에는 예외로 합니다.<br />
                      1. 통계작성, 학술연구 또는 시장조사를 위하여 필요한 경우로서 특정 개인을 식별할 수 없는 형태로 제공하는 경우.<br />
                      2. "콘텐츠" 제공에 따른 요금정산을 위하여 필요한 경우.<br />
                      3. 도용방지를 위하여 본인확인에 필요한 경우.<br />
                      4. 약관의 규정 또는 법령에 의하여 필요한 불가피한 사유가 있는 경우.<br />
                      ④ "회사"가 제2항과 제3항에 의해 "이용자"의 동의를 받아야 하는 경우에는 "개인정보"관리책임자의 신원(소속, 성명 및 전화번호 기타 연락처), 정보의 수집목적 및 이용목적, 제3자에 대한 정보제공관련사항(제공받는 자, 제공목적 및 제공할 정보의 내용)등에 관하여 정보통신망이용촉진 및 정보보호 등에 관한 법률 제22조 제2항이 규정한 사항을 명시하고 고지하여야 합니다.<br />
                      ⑤ "이용자"는 언제든지 제3항의 동의를 임의로 철회할 수 있습니다.<br />
                      ⑥ "이용자"는 언제든지 "회사"가 가지고 있는 자신의 "개인정보"에 대해 열람 및 오류의 정정을 요구할 수 있으며, "회사"는 이에 대해 지체 없이 필요한 조치를 취할 의무를 집니다. "이용자"가 오류의 정정을 요구한 경우에는 "회사"는 그 오류를 정정할 때까지 당해 "개인정보"를 이용하지 않습니다.<br />
                      ⑦ "회사"는 개인정보보호를 위하여 관리자를 한정하여 그 수를 최소화하며, 신용카드, 은행계좌 등을 포함한 "이용자"의 "개인정보"의 분실, 도난, 유출, 변조 등으로 인한 "이용자"의 손해에 대하여 책임을 집니다.<br />
                      ⑧ "회사" 또는 그로부터 "개인정보"를 제공받은 자는 "이용자"가 동의한 범위 내에서 "개인정보"를 사용할 수 있으며, 목적이 달성된 경우에는 당해 "개인정보"를 지체 없이 파기합니다.<br />
                      ⑨ "회사"는 정보통신망이용촉진 및 정보보호에 관한 법률 등 관계 법령이 정하는 바에 따라 "이용자"의 "개인정보"를 보호하기 위해 노력합니다. "개인정보"의 보호 및 사용에 대해서는 관련법령 및 "회사"의 개인정보보호정책이 적용됩니다.<br />




                    </p>
                  </div>

                </div>
                <div className="modad-2nd-desc-signup">
                  <div className="modal1-heading-signup">
                    <p >
                      제4장 콘텐츠이용계약의 청약철회, 계약해제·해지 및 이용제한
                    </p>

                  </div>
                  <div className="modal1-heading2-signup-2">
                    <p>

                      제26조("이용자"의 청약철회와 계약해제·해지)

                    </p>

                  </div>
                  <div className="modal-desc2-signup">
                    <p>① "회사"와 "콘텐츠"의 이용에 관한 계약을 체결한 "이용자"는 수신확인의 통지를 받은 날로부터 7일 이내에는 청약의 철회를 할 수 있습니다. 다만, "회사"가 다음 각 호중 하나의 조치를 취한 경우에는 "이용자"의 청약철회권이 제한될 수 있습니다.<br />
                      1. 청약의 철회가 불가능한 "콘텐츠"에 대한 사실을 표시사항에 포함한 경우.<br />
                      2. 시용상품을 제공한 경우.<br />
                      3. 한시적 또는 일부이용 등의 방법을 제공한 경우.<br />
                      ② "이용자"는 다음 각 호의 사유가 있을 때에는 당해 "콘텐츠"를 공급받은 날로부터 3월 이내 또는 그 사실을 안 날 또는 알 수 있었던 날부터 30일 이내에 콘텐츠이용계약을 해제·해지할 수 있습니다.<br />
                      1. 이용계약에서 약정한 "콘텐츠"가 제공되지 않는 경우.<br />
                      2. 제공되는 "콘텐츠"가 표시·광고 등과 상이하거나 현저한 차이가 있는 경우.<br />
                      3. 기타 "콘텐츠"의 결함으로 정상적인 이용이 현저히 불가능한 경우.<br />
                      ③ 제1항의 청약철회와 제2항의 계약해제·해지는 "이용자"가 전화, 전자우편 또는 모사전송으로 "회사"에 그 의사를 표시한 때에 효력이 발생합니다.<br />
                      ④ "회사"는 제3항에 따라 "이용자"가 표시한 청약철회 또는 계약해제·해지의 의사표시를 수신한 후 지체 없이 이러한 사실을 "이용자"에게 회신합니다.<br />
                      ⑤ "이용자"는 제2항의 사유로 계약해제·해지의 의사표시를 하기 전에 상당한 기간을 정하여 완전한 "콘텐츠" 혹은 서비스이용의 하자에 대한 치유를 요구할 수 있습니다.<br />


                    </p>
                  </div>

                </div>
                <div className="modad-2nd-desc-signup">
                  <div className="modal1-heading2-signup-2">
                    <p>

                      제27조("이용자"의 청약철회와 계약해제·해지의 효과)
                    </p>

                  </div>
                  <div className="modal-desc2-signup">
                    <p>① "회사"는 "이용자"가 청약철회의 의사표시를 한 날로부터 또는 "이용자"에게 계약해제·해지의 의사표시에 대하여 회신한 날로부터 3영업일 이내에 대금의 결제와 동일한 방법으로 이를 환급하여야 하며, 동일한 방법으로 환불이 불가능할 때에는 이를 사전에 고지하여야 합니다. 이 경우 "회사"가 "이용자"에게 환급을 지연한 때에는 그 지연기간에 대하여 공정거래위원회가 정하여 고시하는 지연이자율을 곱하여 산정한 지연이자를 지급합니다.<br />
                      ② "회사"가 제1항에 따라 환급할 경우에 "이용자"가 서비스이용으로부터 얻은 이익에 해당하는 금액을 공제하고 환급할 수 있습니다.<br />
                      ③ "회사"는 위 대금을 환급함에 있어서 "이용자"가 신용카드 또는 전자화폐 등의 결제수단으로 재화 등의 대금을 지급한 때에는 지체 없이 당해 결제수단을 제공한 사업자로 하여금 재화 등의 대금의 청구를 정지 또는 취소하도록 요청합니다. 다만, 제2항의 금액공제가 필요한 경우에는 그러하지 아니할 수 있습니다.<br />
                      ④ "회사", "콘텐츠 등의 대금을 지급 받은 자" 또는 "이용자와 콘텐츠이용계약을 체결한 자"가 동일인이 아닌 경우에 각자는 청약철회 또는 계약해제·해지로 인한 대금환급과 관련한 의무의 이행에 있어서 연대하여 책임을 집니다.<br />
                      ⑤ "회사"는 "이용자"에게 청약철회를 이유로 위약금 또는 손해배상을 청구하지 않습니다. 그러나 "이용자"의 계약해제·해지는 손해배상의 청구에 영향을 미치지 않습니다.<br />





                    </p>
                  </div>

                </div>
                <div className="modad-2nd-desc-signup">
                  <div className="modal1-heading2-signup-2">
                    <p>

                      제28조(회사의 계약해제·해지 및 이용제한)

                    </p>

                  </div>
                  <div className="modal-desc2-signup">
                    <p>① "회사"는 "이용자"가 제12조 제2항에서 정한 행위를 하였을 경우 사전통지 없이 계약을 해제·해지하거나 또는 기간을 정하여 서비스이용을 제한할 수 있습니다.<br />
                      ② 제1항의 해제·해지는 "회사"가 자신이 정한 통지방법에 따라 "이용자"에게 그 의사를 표시한 때에 효력이 발생합니다.<br />
                      ③ "회사"의 해제·해지 및 이용제한에 대하여 "이용자"는 "회사"가 정한 절차에 따라 이의신청을 할 수 있습니다. 이 때 이의가 정당하다고 "회사"가 인정하는 경우, "회사"는 즉시 서비스의 이용을 재개합니다.<br />


                    </p>
                  </div>

                </div>

                <div className="modad-2nd-desc-signup">
                  <div className="modal1-heading2-signup-2">
                    <p>

                      제29조(회사의 계약해제·해지의 효과)

                    </p>

                  </div>
                  <div className="modal-desc2-signup">
                    <p>"이용자"의 귀책사유에 따른 이용계약의 해제·해지의 효과는 제27조를 준용합니다. 다만, "회사"는 "이용자"에 대하여 계약해제·해지의 의사표시를 한 날로부터 7영업일 이내에 대금의 결제와 동일한 방법으로 이를 환급합니다.



                    </p>
                  </div>

                </div>
                <div className="modad-2nd-desc-signup">
                  <div className="modal1-heading-signup">
                    <p >
                      제5장 과오금, 피해보상 등
                    </p>

                  </div>
                  <div className="modal1-heading2-signup-2">
                    <p>

                      제30조(과오금)

                    </p>

                  </div>
                  <div className="modal-desc2-signup">
                    <p>① "회사"는 과오금이 발생한 경우 이용대금의 결제와 동일한 방법으로 과오금 전액을 환불하여야 합니다. 다만, 동일한 방법으로 환불이 불가능할 때는 이를 사전에 고지합니다.<br />
                      ② "회사"의 책임 있는 사유로 과오금이 발생한 경우 "회사"는 계약비용, 수수료 등에 관계없이 과오금 전액을 환불합니다. 다만, "이용자"의 책임 있는 사유로 과오금이 발생한 경우, "회사"가 과오금을 환불하는 데 소요되는 비용은 합리적인 범위 내에서 "이용자"가 부담하여야 합니다.<br />
                      ③ 회사는 "이용자"가 주장하는 과오금에 대해 환불을 거부할 경우에 정당하게 이용대금이 부과되었음을 입증할 책임을 집니다.<br />
                      ④ "회사"는 과오금의 환불절차를 디지털콘텐츠이용자보호지침에 따라 처리합니다.<br />




                    </p>
                  </div>

                </div>
                <div className="modad-2nd-desc-signup">
                  <div className="modal1-heading2-signup-2">
                    <p>

                      제31조(콘텐츠하자 등에 의한 이용자피해보상)

                    </p>

                  </div>
                  <div className="modal-desc2-signup">
                    <p>"회사"는 콘텐츠하자 등에 의한 이용자피해보상의 기준·범위·방법 및 절차에 관한 사항을 디지털콘텐츠이용자보호지침에 따라 처리합니다.



                    </p>
                  </div>

                </div>
                <div className="modad-2nd-desc-signup">
                  <div className="modal1-heading2-signup-2">
                    <p>

                      제32조(면책조항)

                    </p>

                  </div>
                  <div className="modal-desc2-signup">
                    <p>① "회사"는 천재지변 또는 이에 준하는 불가항력으로 인하여 "콘텐츠"를 제공할 수 없는 경우에는 "콘텐츠" 제공에 관한 책임이 면제됩니다.<br />
                      ② "회사"는 "이용자"의 귀책사유로 인한 콘텐츠이용의 장애에 대하여는 책임을 지지 않습니다.<br />
                      ③ "회사"는 "회원"이 "콘텐츠"와 관련하여 게재한 정보, 자료, 사실의 신뢰도, 정확성 등의 내용에 관하여는 책임을 지지 않습니다.<br />
                      ④ "회사"는 "이용자" 상호간 또는 "이용자"와 제3자 간에 "콘텐츠"를 매개로 하여 발생한 분쟁 등에 대하여 책임을 지지 않습니다.<br />





                    </p>
                  </div>

                </div>
                <div className="modad-2nd-desc-signup">
                  <div className="modal1-heading2-signup-2">
                    <p>

                      제33조(분쟁의 해결)

                    </p>

                  </div>
                  <div className="modal-desc2-signup">
                    <p>"회사"는 분쟁이 발생하였을 경우에 "이용자"가 제기하는 정당한 의견이나 불만을 반영하여 적절하고 신속한 조치를 취합니다. 다만, 신속한 처리가 곤란한 경우에 "회사"는 "이용자"에게 그 사유와 처리일정을 통보합니다.<br />

                      본 약관은 2023년 01월 13일부터 적용됩니다.




                    </p>
                  </div>

                </div>

                <div className="label-button-signup">
                  <div className="text5-signup">
                    <div className="div26-signup">
                      <button className="custom-button-signup-1" onClick={handleConfirmClick1}>
                        확인
                      </button></div>
                  </div>
                </div>
              </div>

              <button className="close-modal-signup-1" onClick={toggleModal1}>
                <img

                  alt=""
                  src="/SVG/ic_close (1).svg"
                />
              </button>
            </div>
          </div>
        )
      }

    </form>
  );
};

export default SignUpComponent;
