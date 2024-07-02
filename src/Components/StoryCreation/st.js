
import "../Routine/User2.css"
import "../Genere/Genere.css"
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { saveData } from "../../redux/action";
import { setSelectedRoutine } from "../../redux/action"
import { Link, useNavigate } from "react-router-dom";
import User2 from "../Routine/User2";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';




const Genere = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [title, setTitle] = useState("");
  const [routineType, setRoutineType] = useState("");
  const [genre, setGenre] = useState("");
  const [writingStyle, setWritingStyle] = useState("");
  const [isButtonVisible, setIsButtonVisible] = useState(false);

  const [selectedWritingStyle, setSelectedWritingStyle] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {

    document.body.className = selectedWritingStyle;
  }, [selectedWritingStyle]);

  const routineSelected = useSelector((state) => state.selectedRoutine);
  // const routineType1 = useSelector((state) => state.routineType);
  const saveDataToAPI = async (data) => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      localStorage.removeItem('areEpisodesCreated');
      const response = await fetch('https://backend.aper.cc/story/add-story', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,

        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {

        throw new Error('Failed to save data');
      }


      const responseData = await response.json();
      localStorage.setItem('id', responseData.data._id);
      localStorage.setItem('authorId', responseData.data.authorId);
      localStorage.setItem('dateofpub', responseData.data.dateOfPublication);
      localStorage.removeItem('areEpisodesCreated');
      localStorage.removeItem('episodeId');

      // Data saved successfull
      // alert('Data saved successfully');
      console.log('Data saved successfully');
    } catch (error) {
      // console.error('Error saving data:', error.message);

    }
  };


  useEffect(() => {
    checkButtonVisibility();
  }, [title, routineType, genre, writingStyle]);


  const handleTitleChange = (e) => {
    setTitle(e.target.value);

    checkButtonVisibility();
  };

  const handleRoutineTypeChange = (e) => {
    setRoutineType(e.target.value);
    // checkButtonVisibility();
  };

  const handleGenreChange = (e) => {
    setGenre(e.target.value);
    checkButtonVisibility();
  };

  const handleWritingStyleChange = (e) => {
    const newWritingStyle = e.target.value;
    setWritingStyle(newWritingStyle);
    setSelectedWritingStyle(newWritingStyle);
    checkButtonVisibility();
  };

  const checkButtonVisibility = () => {
    if (title && genre && writingStyle) {
      setIsButtonVisible(true);
    } else {
      setIsButtonVisible(false);
    }
  };

  const handleSaveButtonClick = () => {

    const selectedRoutineToSave = routineType || routineSelected;
    // Save data to Redux state
    dispatch(saveData({ title, genre, writingStyle }));
    dispatch(setSelectedRoutine(selectedRoutineToSave));
    localStorage.setItem('routineType', selectedRoutineToSave);
    localStorage.setItem('title', title);
    localStorage.setItem('genre', genre);
    localStorage.setItem('writingStyle', writingStyle);
    saveDataToAPI({ routineType: selectedRoutineToSave, coverTitle: title, genre, lineStyle: writingStyle });


    navigate(`/user/slide/story`);
  };

  return (
    <div className="div-g">
      <div className="child-g" />
      <div className="item-g" />
      <div className="frame-parent-g">
        <div className="frame-group-g">
          <div className="logo-area-parent-g">
            <div className="logo-area-g">
              <b className="a-p-e-g">A P E R</b>
              <img className="a-p-e-r-g" alt="" src="/a-p-e-r@2x.png" />
            </div>
            <div className="logo-area1-g" />
            <img
              className="logo-minimal-icon-g"
              alt=""
              src="/SVG/logo_minimal.svg"
            />
          </div>
          <div className="container-g">
            <div className="div4-g">어떤 루틴으로 글쓰기를 시작할까요?</div>
          </div>
        </div>
        <div className="routine-parent1-g">
          <div className="input-container-g">
            <input
              autoFocus
              type="text"
              className="text-routine-g custom-placeholder-g"
              placeholder="이야기 제목을 입력해 주세요"
              value={title}
              onChange={handleTitleChange}
              maxLength={30}
            />
            <hr className="input-line-g" />
          </div>

          <div className="dropdown-container-g">
            <DropdownButton id="dropdown-basic-button" title="Dropdown button">
              <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
            </DropdownButton>
            <select className="dropdown-g" onChange={handleGenreChange}>
              <option hidden>Choose a genere</option>
              <option value="일상">일상</option>
              <option value="로맨스">로맨스</option>
              <option value="SF">SF</option>
              <option value="공포">공포</option>
              <option value="퀴어">퀴어</option>
              <option value="사회">사회</option>
              <option value="예술">예술</option>
              <option value="비평">O비평</option>
              <option value="시">시</option>
            </select>
            <select className="dropdown-g" onChange={handleWritingStyleChange}>
              <option hidden>Choose a style of writing</option>
              <option value="문체부 바탕체">문체부 바탕체</option>
              <option value="KoPub바탕체">KoPub바탕체</option>
              <option value="Noto Serif KR">Noto Serif KR</option>
              <option value="네이버 나눔명조">네이버 나눔명조</option>
            </select>
          </div>

        </div>

        <div className="width-content-g">
          {isButtonVisible && (
            <button className="save-button-g" onClick={handleSaveButtonClick}>
              <p >
                저장하고 이야기 홈으로
              </p>
              <img className="ic-arrow-right-g" alt="" src="/SVG/ic_arrow_right.svg" />
            </button>

          )}
          {!isButtonVisible && (
            <p className="middle-content-g">
              저장하고 이야기 홈으로
            </p>
          )}

        </div>
      </div>
      <div className="right-trail7-g"
      >
        <img className="ic-search-icon-g" alt="" src="/SVG/ic_close (1).svg"
        />
      </div>
    </div>
  );
};

export default Genere;



