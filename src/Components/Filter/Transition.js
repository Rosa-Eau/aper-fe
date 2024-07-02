import React from 'react';
import "./Transition.css";
import { useState } from 'react';

const Transition = () => {
  const [selectedSlide, setSelectedSlide] = useState('c1');

  const handleSlideChange = (event) => {
    setSelectedSlide(event.target.id);
  };
  return (
    <div>
      <div className="instance-profile-picture">
        <div className="text-author-name">

          <input className="hide" type="radio" name="slide" id="c1" defaultChecked onChange={handleSlideChange} />
          <label htmlFor="c1" className="card">
            <div className="field-list-img1">
              <img
                className="pic-fieldprof-03-icon"
                alt=""
                src="/images/pic-fieldprof-03@2x.png"
              />
            </div>
          </label>
          <div className="text-sanmen">
            {selectedSlide === 'c1' && (
              <div className="heading-container">
                <div className='content-mainpage'>
                  <b className='pen-main'>이연</b>
                  <div className='wr'>  // 펼 연(演) 자를 쓴다. 이름처럼 사는 삶을 꿈꾼다. 매일 운동을 하고, 산책을 하고, 사색을 하며, 일기를 쓴다. 내 필드도 그러했으면 좋겠다.펼 연(演) 자를 쓴다. 이름처럼 사는 삶을 꿈꾼다. 매일 운동을 하고, 산책을 하고, 사색을 하며, 일기를 쓴다. 내 필드도 그러했으면 좋겠다.  </div>
                </div>
              </div>
            )}
          </div>

          <div className="enable">

            <input className="hide" type="radio" name="slide" id="c2" onChange={handleSlideChange} />
            <label htmlFor="c2" className="card">
              <div className="field-list-img1">
              </div>
            </label>
            <div className="text-sanmen">
              {selectedSlide === 'c2' && (
                <div className="heading-container1">
                  <div className='content-mainpage'>
                    <b className='pen-main'>이연</b>
                    <div className='wr'>  // 펼 연(演) 자를 쓴다. 이름처럼 사는 삶을 꿈꾼다. 매일 운동을 하고, 산책을 하고, 사색을 하며, 일기를 쓴다. 내 필드도 그러했으면 좋겠다.펼 연(演) 자를 쓴다. 이름처럼 사는 삶을 꿈꾼다. 매일 운동을 하고, 산책을 하고, 사색을 하며, 일기를 쓴다. 내 필드도 그러했으면 좋겠다.  </div>
                  </div>
                </div>
              )}
            </div>

            <input className="hide" type="radio" name="slide" id="c3" onChange={handleSlideChange} />
            <label htmlFor="c3" className="card">
              <div className="field-list-img2">
              </div>
            </label>
            <div className="text-sanmen">
              {selectedSlide === 'c3' && (
                <div className="heading-container2">
                  <div className='content-mainpage'>
                    <b className='pen-main'>이연</b>
                    <div className='wr'>  // 펼 연(演) 자를 쓴다. 이름처럼 사는 삶을 꿈꾼다. 매일 운동을 하고, 산책을 하고, 사색을 하며, 일기를 쓴다. 내 필드도 그러했으면 좋겠다.펼 연(演) 자를 쓴다. 이름처럼 사는 삶을 꿈꾼다. 매일 운동을 하고, 산책을 하고, 사색을 하며, 일기를 쓴다. 내 필드도 그러했으면 좋겠다.  </div>
                  </div>
                </div>
              )}
            </div>

            <input className="hide" type="radio" name="slide" id="c4" onChange={handleSlideChange} />
            <label htmlFor="c4" className="card">
              <div className="field-list-img3">
              </div>
            </label>
            <div className="text-sanmen">
              {selectedSlide === 'c4' && (
                <div className="heading-container3">
                  <div className='content-mainpage'>
                    <div className='pen-main'>이연</div>
                    <div className='wr'>  // 펼 연(演) 자를 쓴다. 이름처럼 사는 삶을 꿈꾼다. 매일 운동을 하고, 산책을 하고, 사색을 하며, 일기를 쓴다. 내 필드도 그러했으면 좋겠다.펼 연(演) 자를 쓴다. 이름처럼 사는 삶을 꿈꾼다. 매일 운동을 하고, 산책을 하고, 사색을 하며, 일기를 쓴다. 내 필드도 그러했으면 좋겠다.  </div>
                  </div>
                </div>
              )}
            </div>

            <input className="hide" type="radio" name="slide" id="c5" onChange={handleSlideChange} />
            <label htmlFor="c5" className="card">
              <div className="field-list-img4">
              </div>
            </label>
            <div className="text-sanmen">
              {selectedSlide === 'c5' && (
                <div className="heading-container4">
                  <div className='content-mainpage'>
                    <div className='pen-main'>이연</div>
                    <div className='wr'>  // 펼 연(演) 자를 쓴다. 이름처럼 사는 삶을 꿈꾼다. 매일 운동을 하고, 산책을 하고, 사색을 하며, 일기를 쓴다. 내 필드도 그러했으면 좋겠다.펼 연(演) 자를 쓴다. 이름처럼 사는 삶을 꿈꾼다. 매일 운동을 하고, 산책을 하고, 사색을 하며, 일기를 쓴다. 내 필드도 그러했으면 좋겠다.  </div>
                  </div>
                </div>
              )}
            </div>

            <input className="hide" type="radio" name="slide" id="c6" onChange={handleSlideChange} />
            <label htmlFor="c6" className="card">
              <div className="field-list-img5">
              </div>
            </label>
            <div className="co">
              {selectedSlide === 'c6' && (
                <div className="heading-container5">
                  <div className='content-mainpage'>
                    <div className='pen-main'>이연</div>
                    <div className='wr'>  // 펼 연(演) 자를 쓴다. 이름처럼 사는 삶을 꿈꾼다. 매일 운동을 하고, 산책을 하고, 사색을 하며, 일기를 쓴다. 내 필드도 그러했으면 좋겠다.펼 연(演) 자를 쓴다. 이름처럼 사는 삶을 꿈꾼다. 매일 운동을 하고, 산책을 하고, 사색을 하며, 일기를 쓴다. 내 필드도 그러했으면 좋겠다.  </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transition;