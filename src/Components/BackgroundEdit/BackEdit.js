
import { Link } from "react-router-dom";
import "./BackEdit.css"
import { useSelector } from 'react-redux';
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { setSignupSuccess } from '../../redux/action';
const Edit = () => {

  const userData = useSelector((state) => state.userData);
  const [userInput, setUserInput] = useState('');
  const [charCount, setCharCount] = useState(0);
  const dispatch = useDispatch();
  localStorage.setItem('pen', userData.penName)
  const pen = localStorage.getItem('pen-name')
  const imageData = useSelector(state => state.imageData);

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


  return (
    <div className="div-e">
      <div className="overview-field-img-parent-e">
        <div className="overview-field-img-e">
          <div className="pic-fieldprof-09-e">
            <img
              className="craig-manners-bngxioiwm0y-unsp-icon-e"
              alt=""
              src={imageData}
              onError={(e) => console.error('Image Error:', e, 'Image Data:', imageData)}
            />
          </div>
          <div className="cover-e" />
          <div className="cover1-e" />
        </div>
        <div className="text-e">
          <div className="writer-e">
            <div className="pic-fieldprof-02-e">
              <img
                className="parrish-freeman-imidyuvbole-un-icon-e"
                alt=""
                src="/parrishfreemanimidyuvboleunsplash-1@2x.png"
              />
            </div>
            <div className="text1-e">
              <b className="floyd-carter-e">김초엽</b>
              <div className="floyd-carter-e">작가</div>
            </div>
          </div>
          <div className="div1-e" />
          <div className="div2-e">
            <div className="div3-e">
              <img
                className="caglar-oskay-37iikyijewa-unspl-icon-e"
                alt=""
                src="/caglaroskay37iikyijewaunsplash@2x.png"
              />
            </div>
            <b className="b-e">이연 작가</b>
            <div className="child-e" />
            <div className="div4-e">연제완료</div>
            <div className="b-e">산문</div>
            <div className="parent-e">
              <div className="div6-e">2022.06.30</div>
              <div className="div6-e">~</div>
              <div className="div6-e">2023.06.30</div>
            </div>
          </div>
          <div className="frame-parent-e">
            <div className="frame-group-e">
              <div className="frame-child-e" />
              <b className="title-e">
                <p className="p-edit">{userData.penName} </p>
                <p className="p-edit">작가의 필드</p>
              </b>
            </div>
            <div className="div9-e">
              펼 연(演) 자를 쓴다. 이름처럼 사는 삶을 꿈꾼다. 매일 운동을 하고,
              산책을 하고, 사색을 하며, 일기를 쓴다. 내 필드도 그러했으면
              좋겠다.펼 연(演) 자를 쓴다. 이름처럼 사는 삶을 꿈꾼다. 매일 운동을
              하고, 산책을 하고, 사색을 하며, 일기를 쓴다. 내 필드도 그러했으면
              좋겠다.
            </div>
            <div className="frame-item-e" />
            <div className="frame-container-e">
              <div className="frame-div-e">
                <textarea
                  className="frame-inner-e"
                  placeholder="내 작품을 대표하는 작가의 말을 작성해 주세요 (240자 이내)"
                  value={userInput}
                  onChange={handleInputChange}
                  onInput={handleInputChange}

                />
                <div className="line-e" />
              </div>
              <div className="div10-e">{`${charCount}/240`}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="frame-parent1-e">
        <div className="logo-area-parent-e">
          <div className="logo-area-e">
            <b className="a-p-e-e">A P E R</b>
            <img className="a-p-e-r-e" alt="" src="/a-p-e-r.svg" />
          </div>
          <div className="logo-area1-e" />
          <img className="logo-minimal-icon-e" alt="" src="/SVG/logo_minimal.svg" />
        </div>
        <div className="frame-parent2-e">
          <div className="group-e">
            <b className="b1-edit">내 필드 꾸미기</b>
            <div className="div11-edit">
              작가의 말을 필드 대표 문장으로 작성해 주세요
            </div>
          </div>
          <Link to="/backgroundedit" className="col">
            <div className="label-button-e">
              <div className="ic-arrow-left-e">
                <div className="ic-arrow-left1-e">
                  <img className="tint-e" alt="" src="/SVG/ic_arrow_left.svg" />
                </div>
              </div>
              <div className="text2-e">
                <div className="div12-e">이전</div>
              </div>
              <img className="nowrite-icon-e" alt="" src="/nowrite.svg" />
            </div>
          </Link>
          <Link to="/backgroundedit/edit/login" className="custom-link-bked">
            <div className="label-button1-e" onClick={handleSubmit}>
              <div className="nowrite-icon-e">
                <div className="ic-write1-e">
                  <div className="tint1-e" />
                </div>
              </div>
              <div className="text2-e">
                <div className="div12-ed1-e">계정 생성 완료</div>
              </div>
              <div className="ic-arrow-left-e">
                <div className="ic-check-s1-e">
                  <img className="tint2-e" alt="" src="/SVG/ic_check_s.svg" />
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>

    </div>
  );
};

export default Edit;
