import { memo } from "react";
import { Link } from "react-router-dom";
import "./BackEdit1.css";
import { useSelector } from 'react-redux';
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { setSignupSuccess } from '../../redux/action';

const Frame5 = memo(() => {

  const userData = useSelector((state) => state.userData);
  localStorage.setItem('pen', userData.penName)
  const pen = localStorage.getItem('pen-name')
  const [userInput, setUserInput] = useState('');
  const dispatch = useDispatch();
  const imageData = useSelector(state => state.imageData);
  const [charCount, setCharCount] = useState(0);

  //Function to Update the Input Values In the description field
  const handleInputChange = (e) => {
    const inputText = e.target.value;
    setUserInput(inputText);
    setCharCount(inputText.length);

    if (inputText.length > 239) {
      setUserInput(inputText.slice(0, 239));
      setCharCount(240);
    }
  };

  //Function to update the description and save it to DB
  const handleSubmit = async () => {
    try {
      const response = await fetch(`https://backend.aper.cc/user/update-Profle-Description`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userData.email,
          description: userInput
        }),
      });

      
      const responseData = await response.json();
  

      if (response.ok) {
        
        dispatch(setSignupSuccess(true));

      } else {
        // console.error('Failed to update user data');
      }
    } catch (error) {
      // console.error('Error:', error);
    }

  };



  const [isMobile, setIsMobile] = useState(false);
  //Function to determine the screen Size for Mobile Responsiveness
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



  return (
    <div className="div241">
      <div className="writer2">
        <img
          className="pic-fieldprof-02-icon"
          alt=""
          src="/pic-fieldprof-021@2x.png"
        />
        <div className="text60">
          <b className="floyd-carter4">김초엽</b>
          <div className="floyd-carter5">작가</div>
        </div>
      </div>
      <div className="div242" />
      <div className="div243">
        <img className="icon3" alt="" src="/--001-31@2x.png" />
        <b className="b45">이연 작가</b>
        <div className="child7" />
        <div className="div244">연제완료</div>
        <div className="div245">산문</div>
        <div className="parent20">
          <div className="div246">2022.06.30</div>
          <div className="div247">~</div>
          <div className="div248">2023.06.30</div>
        </div>
      </div>
      <div className="child8" />
      <div className="div249">
        펼 연(演) 자를 쓴다. 이름처럼 사는 삶을 꿈꾼다. 매일 운동을 하고, 산책을
        하고, 사색을 하며, 일기를 쓴다. 내 필드도 그러했으면 좋겠다.펼 연(演)
        자를 쓴다. 이름처럼 사는 삶을 꿈꾼다. 매일 운동을 하고, 산책을 하고,
        사색을 하며, 일기를 쓴다. 내 필드도 그러했으면 좋겠다.
      </div>
      <div className="child9" />
      <div className="frame-parent7">
        <div className="logo-area-parent">
          <div className="logo-area">
            <b className="a-p-e">A P E R</b>
            <img className="a-p-e-r" alt="" src="/a-p-e-r.svg" />
          </div>
          <div className="logo-area1" />
          <img
            className="logo-minimal-icon"
            loading="lazy"
            alt=""
            src="/SVG/logo_minimal.svg"
          />
        </div>
        <nav className="customize-fields-parent">
          <div className="customize-fields">
            <h2 className="h2-11">내 필드 꾸미기</h2>
            <div className="div250">
              작가의 말을 필드 대표 문장으로 작성해 주세요
            </div>
          </div>
          {/* <Link to="/backgroundedit" className="col"> */}
          {!isMobile &&
            <Link to="/backgroundedit" className="label-button39">
              <img
                className="ic-arrow-left-icon"
                loading="lazy"
                alt=""
                src="/SVG/ic_arrow_left.svg"
              />
              <div className="text61">
                <div className="div251">이전</div>
              </div>
              <img className="nowrite-icon23" alt="" src="/nowrite.svg" />
            </Link>
          }
          {!isMobile &&
            <Link to="/backgroundedit/edit/login" className="custom-link-bked">
              <button className="label-button40" onClick={handleSubmit}>
                <img className="ic-write-icon54" alt="" src="/ic-write2@2x.png" />
                <div className="text62">
                  <div className="div252">계정 생성 완료</div>
                </div>
                <img className="ic-check-s-icon" alt="" src="/SVG/ic_check_s.svg" />
              </button>
            </Link>
          }
        </nav>
      </div>
      <section className="overview-field-img-parent">
        <div className="overview-field-img3">
          <img
            className="pic-fieldprof-09-icon"
            alt=""
            src={imageData}
          />
          <div className="cover13" />
        </div>
        <h1 className="title20">
          <p className="p11">{pen}</p>
          <p className="p12">작가의 필드</p>
        </h1>
        <div className="frame-parent8">
          <div className="cursor-parent">
            <textarea
              className="frame-inner-e"
              placeholder="내 작품을 대표하는 작가의 말을 작성해 주세요 (240자 이내)"
              value={userInput}
              onChange={handleInputChange}
              onInput={handleInputChange}
            />
            <div className="line16" />
          </div>
          <div className="field-customizer-wrapper">
            <div className="field-customizer">{`${charCount}/240`}</div>
          </div>
        </div>
      </section>
      <div className="box-footer-1">
        {
          isMobile &&
          <Link to="/backgroundedit" className="label-button39 ll">
            <img
              className="ic-arrow-left-icon"
              loading="lazy"
              alt=""
              src="/SVG/ic_arrow_left.svg"
            />
            <div className="text61">
              <div className="div251">이전</div>
            </div>
            <img className="nowrite-icon23" alt="" src="/nowrite.svg" />
          </Link>
        }
        {
          isMobile &&
          <Link to="/backgroundedit/edit/login" className="custom-link-bked">
            <button className="label-button40" onClick={handleSubmit}>
              <img className="ic-write-icon54" alt="" src="/ic-write2@2x.png" />
              <div className="text62">
                <div className="div252">계정 생성 완료</div>
              </div>
              <img className="ic-check-s-icon" alt="" src="/SVG/ic_check_s.svg" />
            </button>
          </Link>


        }
      </div>
    </div>
  );
});

export default Frame5;