import "./ViewMode.css";
import { useLocation } from "react-router-dom";
import { useState } from "react";

const ViewMode = () => {
  const location = useLocation();
  const { episodeTitle, episodeDescription } = location.state || {};
  const paragraphs = episodeDescription ? episodeDescription.split("\n") : [];

  const [currentPage, setCurrentPage] = useState(1);

  const paragraphsPerPage = 3;

  const startIndex = (currentPage - 1) * paragraphsPerPage;
  const endIndex = startIndex + paragraphsPerPage;


  const currentParagraphs = paragraphs.slice(startIndex, endIndex);

  const nextPage = () => {
    if (endIndex < paragraphs.length) {
      setCurrentPage(currentPage + 1);
    }
  };


  const prevPage = () => {
    if (startIndex > 0) {
      setCurrentPage(currentPage - 1);
    }
  };
  return (
    <div className="div-vm">
      <div className="left-page-wrapper-vm">
        <div className="left-page-vm">
          <div className="frame-parent-vm">
            <div className="parent-vm">
              <div className="div1-vm">
                <img className="icon-vm" alt="" />
                <div className="div2-vm">서재</div>
              </div>
              <div className="div3-vm" />
            </div>
            <div className="title-parent-vm">
              <b className="title-vm">3화.</b>
              <h2 className="title1-vm">{`지나온 길의 뒤 `}</h2>
            </div>
          </div>
          <h2 className="body-vm">
            <p className="p-vm">
              소피, 어디서부터 이야기를 시작해야 할까. 이 편지가 네게 도착했을
              때는 이미 내가 떠났다는 소문이 퍼진 이후이겠지. 어른들이 많이 화가
              났을까. 그동안 나처럼 성년이 되기 전에 마을을 뛰쳐나온 사람은
              없었으니까. 괜찮다면 대신 이야기를 전해줄래? 여전히 그분들을 많이
              사랑한다고, 하지만 내 결정을 후회하지 않는다고 말야. 너도 내가 왜
              이런 선택을 했는지 궁금할 거야. 믿을지 모르겠지만 나는 지금
              ‘시초지’로 가고 있어.
            </p>
            <p className="p1-vm"></p>
            <p className="p2-vm">
              떠나겠다고 대답할 때 그는 내가 보았던 그의 수많은 불행의 얼굴들 중
              가장 나은 미소를 짓고 있었지. 그때 나는 알았어.
            </p>
            <p className="p3-vm">우리는 그곳에서 괴로울 거야.</p>
          </h2>
          <div className="viewer-mode-pagination-vm">
            <div className="left-pagination-vm">
              <div className="div4-vm">144</div>
              <div className="div5-vm">143</div>
            </div>
            <div className="v-divider-16-vm">
              <div className="v-divider-161-vm" />
            </div>
            <div className="div6-vm">[모든 멋진 일에는 두려움이 따른다]</div>
          </div>
          <div className="left-trail-vm">
            <img
              className="ic-arrow-left-icon-vm"
              loading="eager"
              alt=""
              src="/images/ic-arrow-left@2x.png"
            />
            <div className="div7-vm">돌아가기</div>
            <img className="logo-icon-vm" alt="" />
          </div>
        </div>
      </div>
      <div className="div8-vm">146</div>
      <div className="v-divider-162-vm">
        <div className="v-divider-163-vm" />
      </div>
      <div className="frame-group-vm">
        <div className="body-wrapper-vm">
          <h2 className="body1-vm">
            <p className="p4-vm">하지만 그보다 많이 행복할 거야.</p>
            <p className="blank-line-vm">&nbsp;</p>
            <p className="p5-vm">
              이미 내가 떠났다는 소문이 퍼진 이후이겠지. 어른들이 많이 화가
              났을까. 그동안 나처럼 성년이 되기 전에 마을을 뛰쳐나온 사람은
              어디서부터 이야기를 시작해야 할까. 이편지가 네게 도착했을 때는
              이미 내가 떠났다는 소문이 퍼진 이후이겠지. 어른들이 많이 화가
              났을까. 그동안 나처럼 성년이 되기 전에 마을을 뛰쳐나온 사람은
              어디서부터 이야기를 시작해야 할까. 이 편지가 네게 도착했을 때는
              이미 내가 떠났다는 소문이 퍼진 이후이겠지. 어른들이 많이 화가
              났을까. 소피, 어디서부터 이야기를 시작해야 할까. 이 편지가 네게
              도착했을 때는 이미 내가 떠났다는 소문이 퍼진 이후이겠지. 어른들이
              많이 화가 났을까. 그동안 나처럼 성년이 되기 전에 마을을 뛰쳐나온
              사람은 없었으니까. 괜찮다면 대신 이야기를 전해줄래? 여전히
              그분들을 많이 사랑한다고, 하지만 내 결정을 후회하지 않
            </p>
          </h2>
        </div>
        <div className="viewer-mode-pagination1-vm">
          <div className="left-pagination1-vm">
            <div className="div9-vm">145</div>
            <div className="div10-vm">143</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewMode;
