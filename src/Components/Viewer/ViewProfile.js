import "./ViewProfile.css";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";



const ViewProfile = () => {
  const location = useLocation();
  const { episodeTitle, episodeDescription, storyId } = location.state || {};
  const userDetails = location.state?.userDetails || {};
  const [imageSrc, setImageSrc] = useState('')



// Function to fetch the Image
  useEffect(() => {
    const fetchData = async () => {
      try {
        const email = localStorage.getItem('emailUser')

        const response = await fetch(`https://backend.aper.cc/user/getImage/${email}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch episodes data');
        }

        const responseData = await response.json();

        const backgroundImageUrl = await responseData?.data?.imagePath;

        setImageSrc(backgroundImageUrl);
        localStorage.setItem('imageurl', backgroundImageUrl);

      } catch (error) {
        // console.error('Error fetching episodes data:', error.message);
      }
    };

    fetchData();
    // setEpisodesData([]);
  }, []);
  const backgroundImageUrl1 = localStorage.getItem('imageurl');



  return (
    <div className="frame-container-sp">
      <div className="div-sp">
        <div className="routine-sp">
          <div className="roomtiny-sp">
            <img className="pic-fieldprof-02-icon-sp" alt="" />
          </div>
          <div className="parent-sp">
            <b className="b-sp">이연 루틴</b>
            <b className="b1-sp">단거리</b>
          </div>
        </div>
        <div className="routine1-sp">
          <div className="roomtiny1-sp">
            <img className="pic-fieldprof-02-icon1-sp" alt="" />
          </div>
          <div className="group-sp">
            <b className="b2-sp">이연 루틴</b>
            <b className="b3-sp">단거리</b>
          </div>
        </div>
        <div className="routine2-sp">
          <div className="roomtiny2-sp">
            <img className="pic-fieldprof-02-icon2-sp" alt="" />
          </div>
          <div className="container-sp">
            <b className="b4-sp">이ㄹ연 루틴</b>
            <b className="b5-sp">단거리</b>
          </div>
        </div>
        <div className="routine3-sp">
          <div className="roomtiny3-sp">
            <img className="pic-fieldprof-02-icon3-sp" alt="" />
          </div>
          <div className="frame-div-sp">
            <b className="b6-sp">이연 루틴</b>
            <b className="b7-sp">단거리</b>
          </div>
        </div>
      </div>
      <section className="field-header-viewer-parent-sp">
        <div className="field-header-viewer-sp">
          <div className="field-img-sp">
            <img
              className="pic-fieldprof-12-icon-sp"
              alt=""
              src="/images/pic-fieldprof-03@2x.png"
            />
            <div className="cover-sp" />
            <div className="cover1-sp" />
          </div>
          <div className="title-sp">
            <div className="wrap-sp">
              <div className="name-sp">
                <div className="frame-parent-sp">
                  <div className="parent1-sp">
                    <div className="div1-sp">
                      <img className="icon-sp" alt="" />
                      <div className="div2-sp">서재</div>
                      <div className="wrapper-sp">
                        <div className="div3-sp">장거리</div>
                      </div>
                    </div>
                    <div className="div4-sp">
                      <div className="frame-sp">
                        <b className="b8-sp">이연 작가</b>
                      </div>
                      <img className="icon1-sp" alt="" />
                      <div className="div5-sp">서재</div>
                    </div>
                  </div>
                  <div className="title-parent-sp">
                    <b className="title1-sp">3화.</b>
                    <h1 className="title2-sp">이연</h1>
                  </div>
                </div>
                <div className="div6-sp">
                  <img className="icon2-sp" alt="" />
                  <div className="div7-sp">이연</div>
                  <div className="div8-sp">연제완료</div>
                  <div className="parent2-sp">
                    <div className="div9-sp">2022.06.30</div>
                    <div className="div10-sp">~</div>
                    <div className="div11-sp">2023.06.30</div>
                  </div>
                </div>
                <div className="div12-sp">
                  <img className="icon3-sp" alt="" />
                  <b className="b9-sp">이연 작가</b>
                  <div className="child-sp" />
                  <div className="div13-sp">연제완료</div>
                  <div className="div14-sp">산문</div>
                  <div className="parent3-sp">
                    <div className="div15-sp">2022.06.30</div>
                    <div className="div16-sp">~</div>
                    <div className="div17-sp">2023.06.30</div>
                  </div>
                </div>
                <div className="name-child-sp" />
                <div className="label-button-sp">
                  <img className="ic-write-icon-sp" alt="" />
                  <div className="text-sp">
                    <div className="div18-sp">필드 공유</div>
                  </div>
                  <img className="ic-share-icon-sp" alt="" />
                </div>
              </div>
              <div className="right-sp">
                <div className="div19-sp">
                  펼 연(演) 자를 쓴다. 이름처럼 사는 삶을 꿈꾼다. 매일 운동을
                  하고, 산책을 하고, 사색을 하며, 일기를 쓴다. 내 필드도
                  그러했으면 좋겠다.펼 연(演) 자를 쓴다. 이름처럼 사는 삶을
                  꿈꾼다. 매일 운동을 하고, 산책을 하고, 사색을 하며, 일기를
                  쓴다. 내 필드도 그러했으면 좋겠다.
                </div>
                <div className="right-child-sp" />
                <div className="interface-sp">
                  <div className="label-button1-sp">
                    <img className="ic-write-icon1-sp" alt="" />
                    <div className="text1-sp">
                      <div className="div20-sp">배경 이미지 수정</div>
                    </div>
                    <img className="ic-picture-icon-sp" alt="" />
                  </div>
                  <div className="interface-child-sp" />
                  <div className="label-button2-sp">
                    <img className="ic-write-icon2-sp" alt="" />
                    <div className="text2-sp">
                      <div className="div21-sp">소개글 수정</div>
                    </div>
                    <img className="ic-write-icon3-sp" alt="" />
                  </div>
                  <div className="interface-item-sp" />
                  <div className="label-button3-sp">
                    <img className="ic-write-icon4-sp" alt="" />
                    <div className="text3-sp">
                      <div className="div22-sp">필드 공유</div>
                    </div>
                    {/* <img
                      className="ic-share-icon1-sp"
                      loading="eager"
                      alt=""
                      src="/images/ic-share@2x.png"
                    /> */}
                    <img className="pic-fieldprof-10-icon-sp" src={backgroundImageUrl1
                      ? `https://aper.cc/${backgroundImageUrl1}`
                      : `https://backend.aper.cc/${backgroundImageUrl1}`} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <header className="new-gnb-sp">
          <div className="right-trail-sp">
            <img className="nolist-icon-sp" alt="" />
          </div>
          <div className="left-trail-sp">
            <img className="logo-icon-sp" loading="eager" alt="" src="/SVG/logo.svg" />
          </div>
          <div className="spacing-sp" />
          <div className="right-trail1-sp">
            <img className="nosearch-icon-sp" alt="" />
          </div>
          <div className="right-trail2-sp">
            <img className="ic-search-icon-sp" alt="" />
          </div>
          <div className="right-trail3-sp">
            <img className="ic-write-icon5-sp" alt="" />
          </div>
          <div className="right-trail4-sp">
            <div className="field-list-imgfalsefalsethu-sp">
              <img className="pic-fieldprof-08-icon-sp" alt="" />
            </div>
            <div className="div23-sp">김초엽</div>
          </div>
          <div className="right-trail5-sp">
            <div className="wrapper1-sp">
              <div className="div24-sp">김초엽</div>
            </div>
            <div className="field-list-imgfalsefalsethu1-sp">
              <img className="pic-fieldprof-08-icon1-sp" alt="" />
            </div>
          </div>
          <div className="v-divider-16-invers-wrapper-sp">
            <div className="v-divider-16-invers-sp">
              <div className="v-divider-16-invers-child-sp" />
            </div>
          </div>
          <div className="search-in-gnb-parent-sp">
            <div className="search-in-gnb-sp">
              <img
                className="ic-search-icon1-sp"
                loading="eager"
                alt=""
                src="/SVG/ic_search.svg"
              />
            </div>
            <div className="write-in-gnb-sp">
              <img
                className="ic-write-icon6-sp"
                loading="eager"
                alt=""
                src="/SVG/ic_write.svg"
              />
            </div>
            <div className="field-writer-sp">
              <div className="name1-sp">
                <div className="div25-sp">김초엽</div>
              </div>
              <div className="field-list-imgfalsefalsethu2-sp">
                {/* <img
                  className="pic-fieldprof-10-icon-sp"
                  loading="eager"
                  alt=""
                  src="/images/pic-fieldprof-10@2x.png"
                /> */}
                <img className="pic-fieldprof-10-icon-sp" src={userDetails.data.backgroundImage
                  ? `https://aper.cc/${imageSrc}`
                  : `https://backend.aper.cc/${userDetails.data.backgroundImage}`} />
              </div>
            </div>
          </div>
        </header>
      </section>
      <div className="field-tab-sp">
        <div className="selected-line-frame-sp">
          <div className="logo-instance-sp">
            <div className="home-tab-frame-sp">
              <b className="b10-sp">홈</b>
            </div>
            <div className="selected-line-sp" />
          </div>
          <div className="div26-sp">
            <div className="div27-sp">회차별</div>
            <div className="selected-line1-sp" />
          </div>
          <div className="g-n-b-search-field-sp">
            <div className="div28-sp">이야기 별 목록</div>
            <div className="title-story-frame-sp">
              <div className="selected-line2-sp" />
            </div>
          </div>
          <div className="g-n-b-search-field1-sp">
            <div className="div29-sp">작가 정보</div>
            <div className="selected-line-wrapper-sp">
              <div className="selected-line3-sp" />
            </div>
          </div>
        </div>
        <div className="list-container-sp" />
      </div>
      <section className="list-sp">
        <div className="episode-list-in-field-home-vi-sp">
          <div className="list1-sp">
            <div className="title3-sp">
              <div className="story-title-sp">
                <div className="div30-sp">
                  [당신의 이름을 지어다가 며칠을 먹었다]
                </div>
              </div>
              <div className="episode-title-sp">
                <b className="title4-sp">3화.</b>
                <b className="title5-sp">모든 멋진 일에는 두려움이 따른다</b>
              </div>
            </div>
            <div className="genre-date-for-story-sp">
              <div className="field-thumb-sp">
                <div className="field-list-imgfalsefalsethu3-sp">
                  <img className="pic-fieldprof-08-icon2-sp" alt="" />
                </div>
                <b className="b11-sp">이연 작가</b>
              </div>
              <div className="div31-sp">산문</div>
              <div className="genre-date-for-story-child-sp" />
              <div className="duie-date-sp">
                <div className="fear-of-driving-sp">2022.03.30 마감</div>
                <b className="fear-of-driving1-sp">D-30</b>
              </div>
              <div className="date-sp">
                <div className="div32-sp">2022.06.30</div>
                <div className="div33-sp">~</div>
                <div className="div34-sp">2023.06.30</div>
              </div>
            </div>
            <div className="body-sp">
              <div className="div35-sp">
                <p className="p-sp">
                  “어른들이 들으면 뭐라고 할 만한 쓸데없는 일들을 잔뜩
                  하겠습니다."
                </p>
                <p className="p1-sp">
                  졸업 후 무엇을 하겠냐는 질문에 내가 했던 대답이다. 신기하게도
                  나는 정말 그런 어른이 되었다. 호기롭게 내뱉은 청춘의 대답이
                  서른이 지나 궁금해졌다. 이렇게 계속 쓸데없는 일을 하면서
                  살아도 되는건지, 창작 하겠다고 했던이유가 무엇인지 말이다.
                  졸업 후 무엇을 하겠냐는 질문에 내가 했던 대답이다. 신기하게도
                  나는 정말 그런 어른이 되었다. 호기롭게 내뱉은 청춘의 대답이
                  서른이 지나 궁금해졌다. 이렇게 계속 쓸데없는 일을 하면서
                  살아도 되는건지, 창작 하겠다고 했던이유가 무엇인지 말이다.
                </p>
              </div>
            </div>
          </div>
          <div className="h-divider-16-sp">
            <div className="h-divider-20-sp" />
          </div>
        </div>
        <div className="episode-list-in-field-home-vi1-sp">
          <div className="list2-sp">
            <div className="title6-sp">
              <div className="story-title1-sp">
                <div className="div36-sp">[하늘과 바람과 별과 시]</div>
              </div>
              <div className="episode-title1-sp">
                <b className="title7-sp">4화.</b>
                <b className="title8-sp">별헤는 밤</b>
              </div>
            </div>
            <div className="genre-date-for-story1-sp">
              <div className="field-thumb1-sp">
                <div className="field-list-imgfalsefalsethu4-sp">
                  <img className="pic-fieldprof-08-icon3-sp" alt="" />
                </div>
                <b className="b12-sp">이연 작가</b>
              </div>
              <div className="div37-sp">산문</div>
              <div className="genre-date-for-story-item-sp" />
              <div className="duie-date1-sp">
                <div className="fear-of-driving2-sp">2022.03.30 마감</div>
                <b className="fear-of-driving3-sp">D-30</b>
              </div>
              <div className="date1-sp">
                <div className="div38-sp">2022.06.30</div>
                <div className="div39-sp">~</div>
                <div className="div40-sp">2023.06.30</div>
              </div>
            </div>
            <div className="body1-sp">
              <div className="div41-sp">
                <p className="p2-sp">
                  “어른들이 들으면 뭐라고 할 만한 쓸데없는 일들을 잔뜩
                  하겠습니다."
                </p>
                <p className="p3-sp">
                  졸업 후 무엇을 하겠냐는 질문에 내가 했던 대답이다. 신기하게도
                  나는 정말 그런 어른이 되었다. 호기롭게 내뱉은 청춘의 대답이
                  서른이 지나 궁금해졌다. 이렇게 계속 쓸데없는 일을 하면서
                  살아도 되는건지, 창작 하겠다고 했던이유가 무엇인지 말이다.
                  졸업 후 무엇을 하겠냐는 질문에 내가 했던 대답이다. 신기하게도
                  나는 정말 그런 어른이 되었다. 호기롭게 내뱉은 청춘의 대답이
                  서른이 지나 궁금해졌다. 이렇게 계속 쓸데없는 일을 하면서
                  살아도 되는건지, 창작 하겠다고 했던이유가 무엇인지 말이다.
                </p>
              </div>
            </div>
          </div>
          <div className="h-divider-161-sp">
            <div className="h-divider-201-sp" />
          </div>
        </div>
        <div className="episode-list-in-field-home-vi2-sp">
          <div className="list3-sp">
            <div className="title9-sp">
              <div className="story-title2-sp">
                <div className="div42-sp">
                  [당신의 이름을 지어다가 며칠을 먹었다]
                </div>
              </div>
              <div className="episode-title2-sp">
                <b className="title10-sp">3화.</b>
                <b className="title11-sp">모든 멋진 일에는 두려움이 따른다</b>
              </div>
            </div>
            <div className="genre-date-for-story2-sp">
              <div className="field-thumb2-sp">
                <div className="field-list-imgfalsefalsethu5-sp">
                  <img className="pic-fieldprof-08-icon4-sp" alt="" />
                </div>
                <b className="b13-sp">이연 작가</b>
              </div>
              <div className="div43-sp">산문</div>
              <div className="genre-date-for-story-inner-sp" />
              <div className="duie-date2-sp">
                <div className="fear-of-driving4-sp">2022.03.30 마감</div>
                <b className="fear-of-driving5-sp">D-30</b>
              </div>
              <div className="date2-sp">
                <div className="div44-sp">2022.06.30</div>
                <div className="div45-sp">~</div>
                <div className="div46-sp">2023.06.30</div>
              </div>
            </div>
            <div className="body2-sp">
              <div className="div47-sp">
                <p className="p4-sp">
                  “어른들이 들으면 뭐라고 할 만한 쓸데없는 일들을 잔뜩
                  하겠습니다."
                </p>
                <p className="p5-sp">
                  졸업 후 무엇을 하겠냐는 질문에 내가 했던 대답이다. 신기하게도
                  나는 정말 그런 어른이 되었다. 호기롭게 내뱉은 청춘의 대답이
                  서른이 지나 궁금해졌다. 이렇게 계속 쓸데없는 일을 하면서
                  살아도 되는건지, 창작 하겠다고 했던이유가 무엇인지 말이다.
                  졸업 후 무엇을 하겠냐는 질문에 내가 했던 대답이다. 신기하게도
                  나는 정말 그런 어른이 되었다. 호기롭게 내뱉은 청춘의 대답이
                  서른이 지나 궁금해졌다. 이렇게 계속 쓸데없는 일을 하면서
                  살아도 되는건지, 창작 하겠다고 했던이유가 무엇인지 말이다.
                </p>
              </div>
            </div>
          </div>
          <div className="h-divider-162-sp">
            <div className="h-divider-202-sp" />
          </div>
        </div>
        <div className="episode-list-in-field-home-vi3-sp">
          <div className="list4-sp">
            <div className="title12-sp">
              <div className="story-title3-sp">
                <div className="div48-sp">[하늘과 바람과 별과 시]</div>
              </div>
              <div className="episode-title3-sp">
                <b className="title13-sp">4화.</b>
                <b className="title14-sp">별헤는 밤</b>
              </div>
            </div>
            <div className="genre-date-for-story3-sp">
              <div className="field-thumb3-sp">
                <div className="field-list-imgfalsefalsethu6-sp">
                  <img className="pic-fieldprof-08-icon5-sp" alt="" />
                </div>
                <b className="b14-sp">이연 작가</b>
              </div>
              <div className="div49-sp">산문</div>
              <div className="rectangle-div-sp" />
              <div className="duie-date3-sp">
                <div className="fear-of-driving6-sp">2022.03.30 마감</div>
                <b className="fear-of-driving7-sp">D-30</b>
              </div>
              <div className="date3-sp">
                <div className="div50-sp">2022.06.30</div>
                <div className="div51-sp">~</div>
                <div className="div52-sp">2023.06.30</div>
              </div>
            </div>
            <div className="body3-sp">
              <div className="div53-sp">
                <p className="p6-sp">
                  “어른들이 들으면 뭐라고 할 만한 쓸데없는 일들을 잔뜩
                  하겠습니다."
                </p>
                <p className="p7-sp">
                  졸업 후 무엇을 하겠냐는 질문에 내가 했던 대답이다. 신기하게도
                  나는 정말 그런 어른이 되었다. 호기롭게 내뱉은 청춘의 대답이
                  서른이 지나 궁금해졌다. 이렇게 계속 쓸데없는 일을 하면서
                  살아도 되는건지, 창작 하겠다고 했던이유가 무엇인지 말이다.
                  졸업 후 무엇을 하겠냐는 질문에 내가 했던 대답이다. 신기하게도
                  나는 정말 그런 어른이 되었다. 호기롭게 내뱉은 청춘의 대답이
                  서른이 지나 궁금해졌다. 이렇게 계속 쓸데없는 일을 하면서
                  살아도 되는건지, 창작 하겠다고 했던이유가 무엇인지 말이다.
                </p>
              </div>
            </div>
          </div>
          <div className="h-divider-163-sp">
            <div className="h-divider-203-sp" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default ViewProfile;
