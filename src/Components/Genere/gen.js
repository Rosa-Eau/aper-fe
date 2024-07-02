import "../Routine/User2.css";
import "./Genere.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { saveData } from "../../redux/action";
import { setSelectedRoutine } from "../../redux/action";
import { Link, useNavigate } from "react-router-dom";
import User2 from "../Routine/User2";

const Gen = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [title, setTitle] = useState("");
  const [routineType, setRoutineType] = useState("");
  const [genre, setGenre] = useState(null);
  const [writingStyle, setWritingStyle] = useState("");
  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const [selectedWritingStyle, setSelectedWritingStyle] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();


  //Function to select the font based on selected writing Style
  useEffect(() => {
    document.body.className = selectedWritingStyle;
    document.body.style.fontFamily = getFontFamily(selectedWritingStyle)
  }, [selectedWritingStyle]);

  const routineSelected = useSelector((state) => state.selectedRoutine);


  //Function to save the story Creation data
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
      localStorage.removeItem('id');
      localStorage.setItem('id', responseData.data._id);
      localStorage.setItem('authorId', responseData.data.authorId);
      localStorage.setItem('dateofpub', responseData.data.createdAt);
      localStorage.removeItem('areEpisodesCreated');
      localStorage.removeItem('episodeId');

    } catch (error) {
      // console.error('Error saving data:', error.message);
    }
  };


  //to only make Button visible if all the fields are selected
  useEffect(() => {
    checkButtonVisibility();
  }, [title, routineType, genre, writingStyle]);



  //Function to handle The Title change
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    checkButtonVisibility();
  };


  //Function to handle the Routine Dropdown changes
  const handleRoutineTypeChange = (routine1) => {
    const selectedRoutineType = routine1;
    setRoutineType(selectedRoutineType);

  };


  //Function to handle Genere Dropdown
  const handleGenreChange = (genre) => {
    const selectedGenre = genre;
    setGenre(selectedGenre);
    checkButtonVisibility();
  };

  useEffect(() => {
const fontFamily = getFontFamily(selectedWritingStyle);
    document.body.style.fontFamily = fontFamily;
  }, [selectedWritingStyle]);

  const getFontFamily = (writingStyle) => {

    switch (writingStyle) {
      case "문체부 바탕체":
        return "'Spoqa Han Sans Neo ', sans-serif !important";

      case "KoPub바탕체":


        document.body.style.fontFamily = "KoPub Dotum";
        return "'KoPub Dotum', sans-serif !important";
      case "Noto Serif KR":
        return "'Noto Serif KR '";
      case "네이버 나눔명조":
        return "'Nanum Gothic', sans-serif";
      default:
      // return "'Spoqa Han Sans Neo', sans-serif"; // Default font
    }
  };


  //Function to handle fontstyle changes
  const handleWritingStyleChange = (style) => {
    const newWritingStyle = style;
    setWritingStyle(newWritingStyle);
    setSelectedWritingStyle(newWritingStyle);
    checkButtonVisibility();
  };


//Visiblity of Button
  const checkButtonVisibility = () => {
    if (title && genre && writingStyle) {
      setIsButtonVisible(true);
    } else {
      setIsButtonVisible(false);
    }
  };


  // Make a API call after setting the Fields
  const handleSaveButtonClick = () => {
    const selectedRoutineToSave = routineType || routineSelected;
    dispatch(saveData({ title, genre, writingStyle }));
    dispatch(setSelectedRoutine(selectedRoutineToSave));
    localStorage.setItem('routineType', routineType);
    localStorage.setItem('routineType', selectedRoutineToSave);
    localStorage.setItem('title', title);
    localStorage.setItem('genre', genre);
    localStorage.setItem('writingStyle', writingStyle);

    saveDataToAPI({
      routineType: selectedRoutineToSave,
      coverTitle: title,
      genre,
      lineStyle: writingStyle,
    });

    console.log("selected oneneeee" + selectedRoutineToSave);
    navigate('/user/slide/story');
  };

//Navigation to the previous Slide
  const handleBack = () => {
    navigate('/user/ViewStory/slide')
  }



  //Navigate to the Main Page
  const handleMainPage = () => {
    if (!token) {
      navigate('/login');
    } else {
      navigate('/user');
    }
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <div className="div-g">
            <div className='move-back-story'>
              <img alt="" src="/SVG/Vector.svg" onClick={handleBack} />
              <b className='title-st'>뒤로가기</b>

              {/* <p>Korean Words remaining: {characterLimit - koreanWordCount}</p> */}
            </div>

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
                  {/* <div className="font">Name</div> */}
                  <div className="div4-g">커버 제목과 장르, 본문 스타일을 선택해 주세요.</div>
                </div>
                <div className="right-trail7-g"
                  onClick={handleMainPage}
                >
                  <img className="ic-search-icon-g" alt="" src="/SVG/ic_close (1).svg"
                  />
                </div>
              </div>
              <div className="routine-parent1-g">
                <div className="input-container-g">

                  <input
                    type="text"
                    className="text-routine-g custom-placeholder-g"
                    placeholder="이야기 제목을 입력해 주세요"
                    value={title}
                    onChange={handleTitleChange}
                    maxLength={30}
                  />
                  <div className="input-line-g" />
                </div>

                <div className="dropdown-container-g">

                  <div className="dropdown">
                    <button
                      className="btn dropdown-toggle colorCh dropdown-g"
                      type="button"
                      id="dropdownMenuButton"
                      data-mdb-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {routineSelected}
                    </button>

                  </div>



                  <div className="dropdown">
                    <button
                      className="btn dropdown-toggle colorCh dropdown-g"
                      type="button"
                      id="dropdownMenuButton"
                      data-mdb-toggle="dropdown"
                      aria-expanded="false"
                    >

                      <span className="genre-style">{genre ? genre : <span className="custom-style">이야기 장르 선택</span>}</span>
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                      <li>
                        <a className="dropdown-item fontGenre" href="#" onClick={() => handleGenreChange('일상')}>
                          일상
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item fontGenre" href="#" onClick={() => handleGenreChange('로맨스')}>
                          로맨스
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item fontGenre" href="#" onClick={() => handleGenreChange('SF')}>
                          SF
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item fontGenre" href="#" onClick={() => handleGenreChange('공포')}>
                          공포
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item fontGenre" href="#" onClick={() => handleGenreChange('퀴어')}>
                          퀴어
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item fontGenre" href="#" onClick={() => handleGenreChange('사회')}>
                          사회
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item fontGenre" href="#" onClick={() => handleGenreChange('예술')}>
                          예술
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item fontGenre" href="#" onClick={() => handleGenreChange('비평')}>
                          비평
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item fontGenre" href="#" onClick={() => handleGenreChange('시')}>
                          시
                        </a>
                      </li>
                    </ul>
                  </div>


                  {/* <select className="dropdown-g" value={selectedWritingStyle} onChange={handleWritingStyleChange}>
          <option hidden style={{color:'red'}} >글줄 스타일 선택</option>
          <option value="문체부 바탕체">문체부 바탕체</option>
          <option value="KoPub바탕체">KoPub바탕체</option>
          <option value="Noto Serif KR">Noto Serif KR</option>
          <option value="네이버 나눔명조">네이버 나눔명조</option>
        </select> */}


                  <div className="dropdown">
                    <button
                      className="btn dropdown-toggle colorCh dropdown-g"
                      type="button"
                      id="dropdownMenuButton"
                      data-mdb-toggle="dropdown"
                      aria-expanded="false"

                    >


                      <span className="genre-style">{selectedWritingStyle ? selectedWritingStyle : <span className="custom-style">글줄 스타일 선택</span>}</span>

                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                      <li>
                        <a className="dropdown-item font1" href="#" onClick={() => handleWritingStyleChange('문체부 바탕체')}>
                          문체부 바탕체
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item font2" href="#" onClick={() => handleWritingStyleChange('KoPub바탕체')}>
                          KoPub바탕체
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item font3" href="#" onClick={() => handleWritingStyleChange('Noto Serif KR')}>
                          Noto Serif KR
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item font4" href="#" onClick={() => handleWritingStyleChange('네이버 나눔명조')}>
                          네이버 나눔명조
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>

              </div>

              <div className="width-content-g">
                {isButtonVisible && (
                  <button className="save-button-g" onClick={handleSaveButtonClick}>
                    <p className="middle-g">
                      저장하고 이야기 홈으로
                    </p>
                    <img className="ic-arrow-right-g" alt="" src="/SVG/ic_arrow_right.svg" />
                  </button>

                )}
                {!isButtonVisible && (
                  <p className="middle-content-g">
                    <p className="padding-content"></p>저장하고 이야기 홈으로
                  </p>
                )}

              </div>

            </div>
            <div className="toast-genere">
              이야기의 커버를 대표할 이야기 커버 제목과 이야기의 장르,
              그리고 어떤 자간과 행간으로 이야기를 구성할지 선택해 주세요.
            </div>
            {/* <div>hdehhiuwfiurgiufiuewdkjeeeeeeejjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj</div> */}



          </div>
        </div>
      </div>
    </div>
  );
};

export default Gen;
