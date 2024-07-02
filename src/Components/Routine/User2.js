import "./User2.css"
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setSelectedRoutine } from "../../redux/action"
import { Link, useNavigate } from "react-router-dom";

const User2 = () => {
  const [isHovered, setIsHovered] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRoutineClick = (routineType) => {
    dispatch(setSelectedRoutine(routineType));
    navigate('/user/slide/genere')
  };


  const token = JSON.parse(localStorage.getItem("token"));
  const handleMainPage = () => {
    if (!token) {
      navigate('/login');
    } else {
      navigate('/user');
    }
  }

  return (
    <div className="div-2 ">
      <div className='move-back-story'>
        <img alt="" src="/SVG/Vector.svg" onClick={handleMainPage} />
        <b className='title-st'>뒤로가기</b>

        {/* <p>Korean Words remaining: {characterLimit - koreanWordCount}</p> */}
      </div>
      <div className="child-2" />
      <div className="item-2" />
      <div className="frame-parent-2">
        <div className="frame-group-2">
          <div className="logo-area-parent-2">
            <div className="logo-area-2">
              <b className="a-p-e-2">A P E R</b>
              <img className="a-p-e-r-2" alt="" src="/a-p-e-r@2x.png" />
            </div>
            <div className="logo-area1-2" />
            <img
              className="logo-minimal-icon-2"
              alt=""
              src="/SVG/logo_minimal.svg"
            />
          </div>
          <div className="container-2">
            <div className="div4-2">어떤 루틴으로 글쓰기를 시작할까요?</div>
          </div>
          <div className="right-trail7-2" onClick={handleMainPage}>
            <img className="ic-search-icon-2" alt="" src="/SVG/ic_close (1).svg" />
          </div>
        </div>
        <div className="routine-parent-2">
          <span
            className="routine-2"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => handleRoutineClick("자유")}
          >
            <div className={`routine-child-2 ${isHovered ? 'hovered' : ''}`} ></div>
            <div className="parent-2">
              <b className="b-2">자유</b>
              <div className="div5-2">
                초보자에게 알맞는 루틴으로, 마감 일정 없이 자유롭게 창작할 수 있어요
              </div>
            </div>
            <div className="ggg  ggg1">
              {isHovered && <div className="">선택
                <img src="/SVG/nochevron_right_s.svg" /></div>}
            </div>
            {/* <img
              className="logo-minimal-icon"
              alt=""
              src="/SVG/logo-minimal.svg"
            /> */}
          </span>
          <div
            className="routine-2"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => handleRoutineClick("단편")}
          >
            <div className={`routine-child-2 ${isHovered ? 'hovered' : ''}`} />
            <div className="parent-2">
              <b className="b-2">단편</b>
              <div className="div5-2">{`1회당 30일의 기한이 주어지고 원고지 50매 분량으로 총 5회의 이야기를 창작합니다. `}</div>
            </div>
            <div className="ggg ">
              {isHovered && <div className="">선택
                <img src="/SVG/nochevron_right_s.svg" /></div>}
            </div>
          </div>
          <div
            className="routine-2"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => handleRoutineClick("장편")}
          >
            <div className={`routine-child-2 ${isHovered ? 'hovered' : ''}`} />
            <div className="parent-2">
              <b className="b-2">장편</b>
              <div className="div5-2">{`1회당 40일의 기한이 주어지고 원고지 70매 분량으로 총 10회의 이야기를 창작합니다. `}</div>
            </div>
            <span className="ggg">
              {isHovered && <div className="">선택
                <img src="/SVG/nochevron_right_s.svg" /></div>}
            </span>
          </div>
          <div
            className="routine-2"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => handleRoutineClick("시집")}
          >
            <div className={`routine-child-2 ${isHovered ? 'hovered' : ''}`} />
            <div className="parent-2">
              <b className="b-2">시집</b>
              <div className="div5-2">
                1회당 7일의 기한이 주어지고 매수제한 없이 총 50회의 시를
                창작합니다
              </div>
            </div>
            <div className="ggg ggg1">
              {isHovered && <div className="">선택
                <img src="/SVG/nochevron_right_s.svg" /></div>}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default User2;


