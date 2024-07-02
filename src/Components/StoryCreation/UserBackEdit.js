
import { Link } from "react-router-dom";
import "../BackgroundEdit/BackEdit.css"
import { useSelector } from 'react-redux';
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { setSignupSuccess } from '../../redux/action';
import { setUserData } from "../../redux/action";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const UserBackEdit = () => {


  const [userInput, setUserInput] = useState('');
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { authorId } = useParams();
  const imageData = useSelector(state => state.imageData);
  const userData = useSelector((state) => state.userData);
  localStorage.setItem('pen', userData.penName)
  const pen = localStorage.getItem('pen-name')
  const [charCount, setCharCount] = useState(0);

  //Function to edit the description
  const handleInputChange = (e) => {
    const inputText = e.target.value;
    setUserInput(inputText);
    setCharCount(inputText.length);
    if (inputText.length > 239) {
      setUserInput(inputText.slice(0, 239));
      setCharCount(240);
    }
  };

//Function to get User Details
  useEffect(() => {
    const fetchData = async () => {
      try {

        const token = JSON.parse(localStorage.getItem('token'));
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
        if (userDetails.data && userDetails.data.description) {
          dispatch(setUserData(userDetails.data));
          setUserInput(userDetails.data.description);
          setCharCount(userDetails.data.description.length);
        }
        // console.log('User details:', userDetails);
      } catch (error) {
        // console.error('Error fetching user details:', error.message);
      }
    };
    fetchData();
  }, []);


  //Function to update email and penname
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
        console.error('Failed to update user data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
    navigate(`/user/slide/story/profile/${authorId}`)
  };
  const data = useSelector((state) => state.userData);



  const [isMobile, setIsMobile] = useState(false);
//Mobile Responsiveness
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
            <h2 className="h2-11">내 필드 수정</h2>
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
            <Link to={`/user/slide/story/profile/${authorId}`} className="custom-link-bked">
              <button className="label-button40" onClick={handleSubmit}>
                <img className="ic-write-icon54" alt="" src="/ic-write2@2x.png" />
                <div className="text62">
                  <div className="div252">계정 수정 완료</div>
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
            src={data.backgroundImage
              ? (data.backgroundImage.includes("/images")
                ? `https://aper.cc/${data.backgroundImage}`
                : `https://backend.aper.cc/${data.backgroundImage}`)
              : 'defaultImageURL'}
          />
          {/* <div className="cover-wrapper">
            <div className="cover12" />
          </div> */}
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
          <Link to={`/user/slide/story/profile/${authorId}`} className="custom-link-bked">
            <button className="label-button40" onClick={handleSubmit}>
              <img className="ic-write-icon54" alt="" src="/ic-write2@2x.png" />
              <div className="text62">
                <div className="div252">저장</div>
              </div>
              <img className="ic-check-s-icon" alt="" src="/SVG/ic_check_s.svg" />
            </button>
          </Link>


        }
      </div>
    </div>
  );

};

export default UserBackEdit;
