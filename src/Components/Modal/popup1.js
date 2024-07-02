import React from 'react'
import { useState } from 'react';

const Popup1 = ({ isPopupVisible, onCancelClick }) => {
  const [modal, setModal] = useState(true);
  const handlePrivacyPolicyClick = () => {

    setModal(false);

  };
  const handleConfirmClick = () => {
    toggleModal();


    const serviceTermsCheckbox = document.getElementById('serviceTermsCheckbox');
    if (serviceTermsCheckbox) {
      serviceTermsCheckbox.checked = true;
    }
  };
  const toggleModal = () => {
    setModal(!modal);
  };
  return (
    <div>
      {isPopupVisible && (
        <div className="modal-signup">
          <div onClick={toggleModal} className="overlay-signup"></div>
          <div className="modal-content-signup">
            <div className="heading-modaal-signup">
              <b className="b3-signup">개인정보 처리방침</b>

            </div>
            <div className="scrollable-content-signup">

              <div className="modal1-desc-signup">
                <div className="modal-desc2-signup">
                  <p>'에이퍼크리에이터클럽'(이하 '회사')가 운영하는 ‘에이퍼’은(는) 개인정보보호법 제30조 의거 이용자의 개인정보보호와 권익을 보호하고 관련된 고충 및 애로사항을 신속하게 처리하기 위해 아래의 개인정보처리방침을 제정·운영하고 있습니다.<br />
                    <br />
                    회사는 관계법령에서 규정하고 있는 책임과 의무를 준수하고 실천하기 위해 최선의 노력을 하고 있습니다<br />
                    <br />
                    시행일 : 2023-01-13<br />

                  </p>
                </div>
              </div>
              <div className="modad-2nd-desc-signup">
                <div className="modal1-heading2-signup-2">
                  <p>
                    목차
                  </p>

                </div>
                <div className="modal-desc2-signup">
                  <p>제1조 개인정보의 수집 및 이용에 관한 안내<br />
                    제2조 개인정보자동수집 장치의 설치와 운영거부에 관한 사항<br />
                    제3조 개인정보의 보유·이용기간 및 파기.<br />
                    제4조 개인정보 처리 위탁.<br />
                    제5조 개인정보의 제3자 제공.<br />
                    제6조 개인정보의 안전성 확보조치.<br />
                    제7조 이용자 및 법정대리인의 권리와 그 행사 방법.<br />
                    제8조 개인정보보호 책임자 및 이용자 권익침해에 대한 구제방법.<br />
                    제9조 개인정보처리방침 변경에 관한 사항<br />

                  </p>
                </div>

              </div>


              <div className="modad-2nd-desc-signup">
                <div className="heading-modaal-signup">
                  <b className="b33-signup">1조 개인정보의 수집 및 이용에 관한 안내</b>

                </div>

                <div className="modal-desc2-signup">
                  <p>회사는 아래와 같이 제공하는 서비스에 따라 개인정보의 수집목적, 항목, 보유 및 이용기간을 달리하여 서비스제공을 위하여 필요한 최소한의 개인정보를 수집하고 있습니다.
                  </p>
                </div>

              </div>

              <div className="scroll-modal-signup">
                <div className="modal1-heading2-signup">
                  <div className='modal1-heading1-signup'>회원가입 및 서비스 이용</div>
                  <table className="custom-table-signup">
                    <thead>
                      <tr className="model2-heading-signup">
                        <th>수집 목적</th>
                        <th>필수 항목</th>
                        <th>보유·이용기간</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="modal-table-content-signup">
                        <td>서비스 이용 관련 각종 고지 안내</td>
                        <td>이메일 주소</td>
                        <td>회원탈퇴 까지</td>
                      </tr>
                      <tr className="modal-table-content-signup">
                        <td>에이퍼 서비스 회원가입 및 이용자 식별</td>
                        <td>필명, 아이디(이메일주소), 비밀번호</td>
                        <td>회원탈퇴 까지</td>
                      </tr>
                      <tr className="modal-table-content-signup">
                        <td>서비스 문의 및 민원 응대</td>
                        <td>이메일 주소, 문의내용</td>
                        <td>회원탈퇴 까지 또는
                          관련법령에 따른 기간 까지</td>
                      </tr>
                    </tbody>
                  </table>


                  <div className='modal1-heading1-signup'>마케팅</div>
                  <table className="custom-table-signup">
                    <thead>
                      <tr className="model2-heading-signup">
                        <th>수집 목적</th>
                        <th>필수 항목</th>
                        <th>보유·이용기간</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="modal-table-content-signup">
                        <td>할인혜택 안내, 이벤트 안내</td>
                        <td>이메일</td>
                        <td>회원탈퇴 까지 또는
                          동의철회 까지
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="last-modal-signup">

                  <div className='modal1-heading1-signup'> 제 3 조 (약관 외 준칙)</div>
                  <p>
                    본 약관에 규정되지 않은 사항에 대해서는 관련법령 또는 회사가 정한 개별 서비스의 이용약관,
                    운영정책 및 규칙 등(이하 ‘세부지침’)의 규정에 따릅니다.

                  </p>
                </div>

              </div>

              <div className="modad-2nd-desc-signup">
                <div className="modal1-heading2-signup-2">
                  <p>
                    기타
                  </p>

                </div>
                <div className="modal-desc2-signup">
                  <p>
                    회사는 만 14세 미만 아동에게 당사의 서비스를 제공하지 않으며 이와 관련한 개인정보를 수집하지 않습니다.<br />

                    회사가 처리하는 회원정보의 목적과 항목이 변경될 경우에는 관련법령에 따라 사전에 동의를 요청합니다.<br />

                    회사는 주민등록번호 처리를 원칙적으로 금지하며 업무 수행 중 법률, 대통령령, 국회규칙, 대법원규칙,
                    헌법재판소규칙, 중앙선거관리위원회 규칙 및 감사원규칙에서 구체적으로 주민등록번호의 처리를 요구할 경우에만 처리하고 있습니다.<br />

                    회사는 다음의 방식으로 개인정보를 수집하며 수집 전 사전동의를 획득합니다.<br />
                    -
                    서비스 이용 과정에서 이용자가 개인정보를 직접 입력하는 방식<br />
                    -
                    박람회, 세미나, 행사진행 등 오프라인에서 서면으로 개인정보를 수집하는 방식<br />
                    -
                    서비스를 이용하는 과정에 쿠키, 접속로그 등 자동으로 생성 및 수집되는 방식<br />

                  </p>
                </div>

              </div>

              <div className="modad-2nd-desc-signup">
                <div className="heading-modaal-signup">
                  <b className="b33-signup">2조 개인정보자동수집 장치의 설치와 운영거부에 관한 사항</b>

                </div>

                <div className="modal-desc2-signup">
                  <p>회사는 서비스 이용과정에서 이용자로부터 다음과 같은 정보들이 자동으로 생성/수집되고 다음의 목적으로 이용될 수 있습니다.</p>
                </div>

              </div>


              <div className="modad-2nd-desc-signup">
                <div className="modal1-heading2-signup-2">
                  <p>
                    개인정보 자동수집정보 사용목적
                  </p>

                </div>
                <div className="modal-desc2-signup">
                  <p>
                    관련법규의 준수<br />
                    회사는 관련법규의 준수를 위해 이용자의 접속기록(로그인)을 보관할 의무가 있습니다.<br />


                  </p>
                </div>

              </div>

              <div className="modad-2nd-desc-signup">
                <div className="modal1-heading2-signup-2">
                  <p>
                    개인정보 자동수집안내 및 거부방법
                  </p>

                </div>
                <div className="modal-desc2-signup">
                  <p>
                    쿠키의 설치운영 및 거부 방법 : 아래 방법을 통해 쿠키 저장을 거부 할 수 있습니다.<br />

                    [web]
                    - Internet Explorer 웹 브라우저의 경우 : 웹브라우저 상단의 -도구인터넷 옵션 - 개인정보 메뉴의 옵션 설정<br />
                    - Microsoft Edge 웹 브라우저의 경우 : 웹브라우저 상단 메뉴 - 설정  고급 설정 보기 - 쿠키 메뉴의 옵션 설정<br />
                    - Chrome 웹브라우저의 경우 : 웹브라우저 상단 메뉴 - 설정 -고급 - 콘텐츠 설정 - 쿠키 메뉴의 옵션 설정<br />
                    - Chrome 모바일의 경우 : 크롬 App - 오른쪽상단 더보기 - 방문 기록 인터넷 사용 기록 삭제 - 기간선택 - 쿠키 및 사이트 데이터'와 '캐시된 이미지 또는 파일' 옆의 체크박스를 선택 - 인터넷 사용기록 삭제.<br />
                    - Safari 모바일의 경우 : Safari App - 방문기록 및 웹사이트 데이터 지우기 - 확인<br />
                    - Naver 모바일의 경우 : Naver App - 설정 - 캐시삭제 + 인터넷 사용 기록 - 쿠키삭제<br />


                  </p>
                </div>

              </div>

              <div className="modad-2nd-desc-signup">
                <div className="heading-modaal-signup">
                  <b className="b33-signup">3조 개인정보의 보유·이용기간 및 파기</b>

                </div>

                <div className="modal-desc2-signup">
                  <p>회사가 수집한 개인정보는 이용자로부터 개인정보 수집 시에 동의 받은 개인정보 보유·이용기간 내 또는 관련법령에 따른 개인정보 보유·이용기간 내 처리하고 해당 목적이 달성 및 보유이용기간이 경과할 시에는 지체없이 해당 개인정보를 복구 또는 재생할 수 없는 방법으로 파기합니다.

                  </p>
                </div>

              </div>

              <div className="modad-2nd-desc-signup">
                <div className="modal1-heading2-signup-2">
                  <p>
                    이용자정보
                  </p>

                </div>
                <div className="modal-desc2-signup">
                  <p>
                    1.개인정보를 수집한 이용목적을 달성한 경우 회사는 이용자의 모든 개인정보를 삭제합니다.<br />
                    2.단, 관계 법령에서 개인정보를 보존해야할 필요가 있는 경우 해당 법률의 규정에 따릅니다.<br />


                  </p>
                </div>

              </div>


              <div className="scroll-modal-signup">

                <div className="modal1-heading2-signup">



                  <div className='modal1-heading1-signup'>마케팅</div>
                  <table className="custom-table-signup">
                    <thead>
                      <tr className="model2-heading-signup">
                        <th>보유 목적</th>
                        <th>근거 법령</th>
                        <th>보유 기간</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="modal-table-content-signup">
                        <td>접속에 관한 기록보존</td>
                        <td>통신비밀보호법</td>
                        <td>3개월
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>


              </div>



              <div className="modad-2nd-desc-signup">
                <div className="heading-modaal-signup">
                  <b className="b33-signup">4조 개인정보 처리 위탁</b>

                </div>

                <div className="modal-desc2-signup">
                  <p>회사는 원활한 개인정보 업무처리를 위하여 일부 개인정보처리업무를 위탁하고 있으며 위탁 계약 체결 시 관련법령에 따라 수탁자가 개인정보를 안전하게 처리하는지를 감독하고 있습니다. 위탁업무의 내용이나 수탁자가 추가, 변경될 경우에는 지체 없이 관련 법령에 따른 사전 동의 안내 또는 본 개인정보 처리방침을 통하여 공개하도록 하겠습니다.

                  </p>
                </div>

              </div>


              <div className="scroll-modal-signup">

                <div className="modal1-heading2-signup">



                  <div className='modal1-heading1-signup'>개인정보처리 위탁업무 및 수탁사 안내</div>
                  <table className="custom-table-signup">
                    <thead>
                      <tr className="model2-heading-signup">
                        <th>수탁자</th>
                        <th>위탁업무</th>
                        <th>연락처</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="modal-table-content-signup">
                        <td>Amazon Web Service</td>
                        <td>데이터보관 및 전산시스템 운용·관리</td>
                        <td>aws-korea-privacy@amazon.com
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>


              </div>



              <div className="modad-2nd-desc-signup">
                <div className="heading-modaal-signup">
                  <b className="b33-signup">5조 개인정보의 제3자 제공</b>

                </div>

                <div className="modal-desc2-signup">
                  <p>회사는 정보주체의 개인정보를 ‘제1조 개인정보의 수집 및 이용에 관한 안내’에서 명시한 범위 내에서만 처리하며, 이용자의 별도 사전동의, 관련법령의 특별한 요구가 발생하는 경우에만 개인정보를 제3자에게 제공합니다.
                  </p>
                </div>

              </div>


              <div className="modad-2nd-desc-signup">
                <div className="modal1-heading2-signup-2">
                  <p>
                    관련법령에 근거한 사전동의 없는 제3자 제공안내
                  </p>

                </div>
                <div className="modal-desc2-signup">
                  <p>
                    1. 통계작성, 학술연구 또는 시장조사를 위하여 필요한 경우로서 특정 개인을 식별할 수 없는 형태로 제공하는 경우<br />
                    2.관계법령에 의하여 국가기관으로부터 요구받은 경우<br />
                    3.범죄에 대한 수사상의 목적이 있거나, 정보통신 윤리위원회의 요청이 있는 경우.<br />
                    4.기타 관계법령에서 정한 절차에 따른 요청이 있는 경우.<br />


                  </p>
                </div>

              </div>


              <div className="modad-2nd-desc-signup">
                <div className="heading-modaal-signup">
                  <b className="b33-signup">6조 개인정보의 안전성 확보조치</b>

                </div>

                <div className="modal-desc2-signup">
                  <p>회사는 이용자의 개인정보를 안전하게 관리하여 개인정보가 분실, 도난, 유출, 변조 또는 훼손되지 않도록 최선을 다하고 있으며 필요한 기술적, 관리적 및 물리적 조치를 하고 있습니다.


                  </p>
                </div>

              </div>


              <div className="modad-2nd-desc-signup">
                <div className="heading-modaal-signup">
                  <b className="b33-signup">개인정보 취급 직원의 최소화 및 교육

                  </b>

                </div>

                <div className="modal-desc2-signup">
                  <p>개인정보를 취급하는 직원을 최소화하고, 주기적인 개인정보 보호 교육을 실시하여 개인정보를 관리하는 대책을 시행하고 있습니다.


                  </p>
                </div>

              </div>


              <div className="modad-2nd-desc-signup">
                <div className="modal1-heading2-signup-2">
                  <p>
                    내부관리계획의 수립 및 시행
                  </p>

                </div>
                <div className="modal-desc2-signup">
                  <p>
                    개인정보의 안전한 처리를 위하여 내부관리계획을 수립하고 시행하고 있습니다.


                  </p>
                </div>

              </div>
              <div className="modad-2nd-desc-signup">
                <div className="modal1-heading2-signup-2">
                  <p>
                    접속기록의 보관 및 위변조 방지
                  </p>

                </div>
                <div className="modal-desc2-signup">
                  <p>
                    개인정보 침해사고 발생 시 대응이 용이하도록 개인정보처리시스템에 접속한 기록(웹 로그, 요약정보 등)을 최소 1년 이상 보관, 관리하고 있으며, 접속 기록이 위변조 및 도난, 분실되지 않도록 보안기능을 사용하고 있습니다.


                  </p>
                </div>

              </div>
              <div className="modad-2nd-desc-signup">
                <div className="modal1-heading2-signup-2">
                  <p>
                    개인정보의 암호화
                  </p>

                </div>
                <div className="modal-desc2-signup">
                  <p>
                    이용자의 개인정보는 암호화 되어 저장 및 관리되고 있습니다.


                  </p>
                </div>

              </div>
              <div className="modad-2nd-desc-signup">
                <div className="modal1-heading2-signup-2">
                  <p>
                    해킹 등에 대비한 기술적 대책
                  </p>

                </div>
                <div className="modal-desc2-signup">
                  <p>
                    회사는 해킹이나 컴퓨터 바이러스 등에 의한 개인정보 유출 및 훼손을 막기 위하여 보안프로그램을 설치하고 주기적인 갱신·점검을 합니다. 또한 외부로부터 접근이 통제된 구역에 시스템을 설치하고 기술적/물리적으로 감시 및 차단하고 있습니다.




                  </p>
                </div>

              </div>
              <div className="modad-2nd-desc-signup">
                <div className="modal1-heading2-signup-2">
                  <p>
                    개인정보에 대한 접근통제 제한
                  </p>

                </div>
                <div className="modal-desc2-signup">
                  <p>
                    개인정보를 처리하는 개인정보처리시스템에 대한 접근권한의 부여, 변경, 말소를 통하여 개인정보에 대한 접근통제를 위한 조치를 하고 있습니다.


                  </p>
                </div>

              </div>

              <div className="modad-2nd-desc-signup">
                <div className="heading-modaal-signup">
                  <b className="b33-signup">7조 이용자 및 법정대리인의 권리와 그 행사 방법</b>

                </div>

                <div className="modal-desc2-signup">
                  <p>회사는 이용자(또는 법정대리인)의 개인정보 권리를 보호하기 위해 아래와 같이 행사 방법을 마련하고 있습니다.
                  </p>
                </div>

              </div>



              <div className="modad-2nd-desc-signup">
                <div className="modal1-heading2-signup-2">
                  <p>
                    이용자의 권리 및 행사방법
                  </p>

                </div>
                <div className="modal-desc2-signup">
                  <p>
                    1.열람 또는 수정 : Setting - 계정 설정<br />
                    2.회원탈퇴 또는 삭제요청 : Setting - 계정 설정 - 계정 탈퇴하기.<br />
                    3.그 밖에 서면, 전자우편 등을 통하여 개인정보의 처리 정지 및 삭제를 요구할 수 있습니다.<br />
                    4.회사는 개인정보의 오류 등에 대한 정정 또는 삭제를 요청한 경우에는 정정 또는 삭제를 완료하기 전까지 당해 개인정보를 이용하거나 제공하지 않습니다.<br />
                    5.개인정보의 정정 및 삭제 요구는 다른 법령에서 그 개인정보가 수집 대상으로 명시되어 있는 경우에는 당해 개인정보의 삭제를 요구할 수 없습니다.<br />
                    6.회사는 이용자 권리에 따른 열람의 요구, 정정·삭제의 요구, 처리정지의 요구 시 열람 등 요구를 한 자가 본인인지를 확인합니다.<br />



                  </p>
                </div>

              </div>

              <div className="modad-2nd-desc-signup">
                <div className="modal1-heading2-signup-2">
                  <p>
                    법정대리인의 권리 및 행사방법
                  </p>

                </div>
                <div className="modal-desc2-signup">
                  <p>
                    1.이용자의 법정대리인이나 위임을 받은 자 등 대리인이 이용자의 권리(열람, 정정, 처리정지, 삭제)를 행사하는 경우 개인정보보호법 시행규칙 별지 제11호 서식에 따른 위임장을 제출해야 합니다.<br />
                    2.회사는 이용자 권리에 따른 열람의 요구, 정정·삭제의 요구, 처리정지의 요구 시 열람 등 요구를 한 자가 정당한 대리인인지를 확인합니다.<br />



                  </p>
                </div>

              </div>



              <div className="modad-2nd-desc-signup">
                <div className="heading-modaal-signup">
                  <b className="b33-signup">8조 개인정보보호 책임자 및 이용자 권익침해에 대한 구제방법

                  </b>

                </div>

                <div className="modal-desc2-signup">
                  <p>
                    회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 이용자의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보보호책임자를 지정하고 있습니다.


                  </p>
                </div>

              </div>


              <div className="modad-2nd-desc-signup">
                <div className="modal1-heading2-signup-2">
                  <p>
                    개인정보보호 책임자
                  </p>

                </div>
                <div className="modal-desc2-signup">
                  <p>
                    성명 : 유수연<br />
                    직책 : 대표<br />
                    연락처: aper.creator.club@gmail.com<br />



                  </p>
                </div>

              </div>



              <div className="modad-2nd-desc-signup">
                <div className="modal1-heading2-signup-2">
                  <p>
                    개인정보보호 책임자의 역할
                  </p>

                </div>
                <div className="modal-desc2-signup">
                  <p>
                    이용자는 서비스를 이용하면서 발생한 모든 개인정보보호 관련 문의, 불만처리, 피해구제 등에 관한 사항을 개인정보보호책임자에게 문의하실 수 있습니다. 회사는 이용자의 문의에 대해 지체 없이 답변 및 처리해드릴 것입니다.



                  </p>
                </div>

              </div>


              <div className="modad-2nd-desc-signup">
                <div className="modal1-heading2-signup-2">
                  <p>
                    권익침해관련 도움받을수 있는 기관
                  </p>

                </div>
                <div className="modal-desc2-signup">
                  <p>
                    이용자의 권익침해 관련 자세한 도움이 필요하시면 아래 기관에 문의하여 주시기 바랍니다.<br />

                    1. 개인정보 침해신고센터 (한국인터넷진흥원 운영)<br />
                    - 소관업무 : 개인정보 침해사실 신고, 상담 신청<br />
                    - 홈페이지 : privacy.kisa.or.kr<br />
                    - 전화 : (국번없이) 118<br />
                    - 주소 : (58324) 전남 나주시 진흥길 9(빛가람동 301-2) 3층 개인정보침해신고센터<br />
                    2.개인정보 분쟁조정위원회<br />
                    - 소관업무 : 개인정보 분쟁조정신청, 집단분쟁조정 (민사적 해결)<br />
                    - 홈페이지 : www.kopico.go.kr<br />
                    - 전화 : (국번없이) 1833-6972<br />
                    - 주소 : (03171) 서울특별시 종로구 세종대로 209 정부서울청사 4층<br />
                    3.대검찰청 사이버범죄수사단<br />
                    - 전화 : 02-3480-3573<br />
                    - 홈페이지 : www.spo.go.kr<br />
                    4.경찰청 사이버안전국<br />
                    - 전화 : 182<br />
                    - 홈페이지 : cyberbureau.police.go.kr<br />




                  </p>
                </div>

              </div>



              <div className="modad-2nd-desc-signup">
                <div className="heading-modaal-signup">
                  <b className="b33-signup">9조 개인정보처리방침 변경에 관한 사항

                  </b>

                </div>

                <div className="modal-desc2-signup">
                  <p>개인정보처리방침은 시행일로부터 적용되며, 관련법령 및 방침에 따른 변경내용의 추가, 삭제 및 정정이 있는 경우에는 지체없이 홈페이지를 통하여 고지할 것입니다.


                  </p>
                </div>

              </div>








              <div className="label-button-signup">
                <div className="text5-signup">
                  <div className="div26-signup">
                    <button className="custom-button-signup-1" onClick={onCancelClick}>
                      확인
                    </button></div>
                </div>
              </div>
            </div>



            <button className="close-modal-signup-2" onClick={onCancelClick}>
              <img
                className='close2'
                alt=""
                src="/SVG/ic_close (1).svg"
              />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Popup1
