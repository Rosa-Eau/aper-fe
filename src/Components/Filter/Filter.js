import React from 'react'
import { useState } from 'react';

const Filter = () => {
  const [selectedFilter, setSelectedFilter] = useState('');
  const [storyData, setStoryData] = useState([]);


  //Function to fetch all the storyData
  const handleAll = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      let apiUrl = "https://backend.aper.cc/story/fetchStories";
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      const responseData = await response.json();
      setStoryData(responseData.data)
    } catch (error) {
      // console.error("Error fetching stories:", error);
    }

  }

  //Function to fetch only filtered Storydata
  const handleFilterClick = async (filter) => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      let apiUrl = "https://backend.aper.cc/story/fetchStories";

      if (filter !== '전체') {
        apiUrl += `?genre=${encodeURIComponent(filter)}`;
      }
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      const responseData = await response.json();
      setStoryData(responseData.data)
      setSelectedFilter(filter);
    } catch (error) {
      // console.error("Error fetching stories:", error);
    }
  };

  return (
    <div>
      <section className="title5">
        <div className="instance-story-meta-info">
          <div className="logo-area8">
            <b className="a-p-e4">A P E R</b>
            <img className="a-p-e-r4" alt="" />
          </div>
          <div className="logo-area9" />
          <img
            className="logo-minimal-icon4"
            loading="eager"
            alt=""
            src="/SVG/logo_minimal.svg"
          />
        </div>
        <div className="text-other-meta-labels">
          <h1 className="h14">새로운 이야기</h1>
          <div className="label-button4">
            <div className="spacing-222" />
            <img className="nowrite-icon3" alt="" />
            <div className="spacing-410" />
            <b className="b11">이야기 더보기</b>
            <div className="spacing-411" />
            <img className="noright-arrow-icon5" alt="" />
            <div className="spacing-223" />
          </div>
        </div>
        <div className="filters">
          <button className="filter-chip" onClick={handleAll} >
            <div className="">
              <b className="">전체</b>
            </div>
            <img className="ic-check-icon" alt="" src="/SVG/ic_check_s.svg" />
          </button>
          <button className={`filter-chip1 ${selectedFilter === '일상' ? 'selected' : ''}`} onClick={() => handleFilterClick('일상')}>
            <div className="">
              <b className="">일상</b>
            </div>
            <img className="ic-check-icon1" alt="" />
          </button>
          <button className={`filter-chip2 ${selectedFilter === '로맨스' ? 'selected' : ''}`} onClick={() => handleFilterClick('로맨스')}>
            <div className="">
              <b className="">로맨스</b>
            </div>
            <img className="ic-check-icon2" alt="" />
          </button>
          <button className={`filter-chip3 ${selectedFilter === 'SF' ? 'selected' : ''}`} onClick={() => handleFilterClick('SF')}>
            <div className="text6">
              <b className="">SF</b>
            </div>
            <img className="ic-check-icon3" alt="" />
          </button>
          <button className={`filter-chip4 ${selectedFilter === '공포' ? 'selected' : ''}`} onClick={() => handleFilterClick('공포')}>
            <div className="text7">
              <b className="">공포</b>
            </div>
            <img className="ic-check-icon4" alt="" />
          </button>
          <button className={`filter-chip5 ${selectedFilter === '퀴어' ? 'selected' : ''}`} onClick={() => handleFilterClick('퀴어')}>
            <div className="text8">
              <b className="">퀴어</b>
            </div>
            <img className="ic-check-icon5" alt="" />
          </button>
          <button className={`filter-chip6 ${selectedFilter === '사회' ? 'selected' : ''}`} onClick={() => handleFilterClick('사회')}>
            <div className="text9">
              <b className="">사회</b>
            </div>
            <img className="ic-check-icon6" alt="" />
          </button>
          <button className={`filter-chip7 ${selectedFilter === '예술' ? 'selected' : ''}`} onClick={() => handleFilterClick('예술')}>
            <div className="text10">
              <b className="">예술</b>
            </div>
            <img className="ic-check-icon7" alt="" />
          </button>
          <button className={`filter-chip8 ${selectedFilter === '비평' ? 'selected' : ''}`} onClick={() => handleFilterClick('비평')}>
            <div className="text11">
              <b className="">비평</b>
            </div>
            <img className="ic-check-icon8" alt="" />
          </button>
          <button className={`filter-chip9 ${selectedFilter === '시' ? 'selected' : ''}`} onClick={() => handleFilterClick('시')}>
            <div className="text12">
              <b className="">시</b>
            </div>
            <img className="ic-check-icon9" alt="" />
          </button>
        </div>
      </section>

    </div>
  )
}

export default Filter
