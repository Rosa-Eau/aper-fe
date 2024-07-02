import "../BackgroundImage/background.css";
import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { updateImage } from '../../redux/action';
import { useSelector } from 'react-redux';
import { useParams } from "react-router-dom";


const UserBackgroundUpload = () => {

  const { authorId } = useParams();
  const userData = useSelector((state) => state.userData);
  localStorage.setItem('pen', userData.penName)
  const pen = localStorage.getItem('pen-name')

  const images = [
    '/images/im100.jpg',
    '/images/im1.jpg',
    '/images/im2.jpg',
    '/images/im3.jpg',
    '/images/im4.jpg',
    '/images/im5.jpg',
    '/images/im6.jpg',
    '/images/im7.jpg',
    '/images/im8.jpg',
    '/images/im9.jpg',
    '/images/im10.jpg',
    '/images/im11.jpg',
    '/images/im12.jpg',
  ];




  const [file, setFile] = useState();
  //Function to upload the image into DB
  const upload = async () => {
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('email', userData.email);

      // fetch('http://localhost:3001/user/update-Background', {
      fetch('https://backend.aper.cc/user/update-Background', {
        method: 'PUT',
        body: formData,
      })
        .then((res) => res.json())
      // .then((data) => console.log(data))
      // .catch((err) => console.error(err));
      dispatch(updateImage(selectedImage));
    } else {
      dispatch(updateImage(selectedImage));
      const requestBody = {
        imagePath: selectedImage,
        email: userData.email
      };
      const response = await fetch('https://backend.aper.cc/user/addImage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',

        },
        body: JSON.stringify(requestBody),
      }).then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      }).then(data => {
        // console.log('API Response:', data);

      }).catch(error => {
        // console.error('API Error:', error);
      });
      dispatch(updateImage(fieldSelectImage));
    }
  };

  const [selectedImage, setSelectedImage] = useState('/images/im101.jpg');
  const [fieldSelectImage, setFieldSelectImage] = useState('/images/im101.jpg');
  const [initialSwapDone, setInitialSwapDone] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Function to handle the selected Image
  const handleImageClick = async (imageSrc) => {
    console.log("Selected Image in handleImageClick:", imageSrc);
    setSelectedImage(imageSrc);
    setFieldSelectImage(imageSrc);
    dispatch(updateImage(fieldSelectImage));

  };
  const handleImageClick1 = (imageData) => {
    dispatch(updateImage(fieldSelectImage));
    navigate(`/user/slide/story/profile/${authorId}`);
  };



  //Function to select the image from file explorer
  const handleFile = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile.size > 2e6) {
      window.alert("Please upload a file smaller than 2 MB");
      return false;
    }

    setFile(selectedFile);

    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
        setFieldSelectImage(e.target.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  }

  // console.log("fieldSelectImage in Preview:", fieldSelectImage);

  useEffect(() => {

    const fileInput = document.getElementById('fileInput');
    fileInput.click();

  }, []);

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
    <div className="div-bk">
      <div className="frame-bk">
        <div className="frame-group-bk">

          <div className="flex-container">
            <div className="logo-area-parent-bk">

              <div className="logo-area-bk">
                <b className="a-p-e-bk">A P E R</b>
                <img className="a-p-e-r-bk" alt="" src="/a-p-e-r.svg" />
              </div>
              <div className="logo-area1-bk" />
              <img className="logo-minimal-icon-bk" alt="" src="/SVG/logo_minimal.svg" />
            </div>
            <div className="frame-parent2-e">
              <div className="group-e">
                <b className="b1-edit  www">내 필드 수정</b>
                <div className="div11-edit www">
                  작가의 말을 필드 대표 문장으로 작성해 주세요
                </div>
              </div>
              <div className="label-button-e">


                <img className="nowrite-icon-e" alt="" src="/nowrite.svg" />
              </div>
              {/* </Link> */}
              <div onClick={handleImageClick1} >
                <div className="label-button1-ee" onClick={upload}>
                  <div className="nowrite-icon-e">
                    <div className="ic-write1-e">
                      <div className="tint1-e" />
                    </div>
                  </div>
                  <div className="text2-e">
                    <div className="div12-ed1-e">완료</div>
                  </div>
                  <div className="ic-arrow-left-e">
                    <div className="ic-check-s1-e">
                      <img className="tint2-e" alt="" src="/SVG/ic_arrow_right.svg" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {!isMobile &&
            <div className="field-select-img-parent-bk">

              <div className="field-select-img-bk">
                <div className="field-select-img-bk">

                  {fieldSelectImage && (
                    <img

                      alt="Selected Image"
                      src={fieldSelectImage}
                      style={{ width: "13.75rem", height: "10rem" }}
                      loading="lazy"
                    />
                  )}
                  <img className="selected-icon-bk-1 " alt="" src="/SVG/ic_check_s.svg" />
                </div>
                {/* <img className="selected-icon-bk" alt="" src="/SVG/ic_check_s.svg" /> */}
                <button className="button-bk">
                  <img className="ic-write-icon-bk" alt="" src="/ic-write@2x.png" />
                  <div className="text-bk2">
                    {/* <div className="div3">다시 업로드</div> */}
                    <label htmlFor="fileInput" className="div100">
                      다시 업로드
                    </label>
                    <input
                      type='file'
                      id="fileInput"
                      onChange={handleFile}
                      style={{ display: "none" }}
                    />
                  </div>
                  <img
                    className="ic-arrow-right-icon-bk"
                    alt=""
                    src="/SVG/ic_add_s.svg"
                  />
                </button>
              </div>

              {images.map((image, index) => (

                <div
                  key={index}
                  className="field-select-img1-bk"
                  onClick={() => handleImageClick(image)}
                >
                  <div className="pic-fieldprof-01-bk">
                    <img className={`img${index}`} alt="" src={image}
                      style={{ width: "13.75rem", height: "10rem" }} />
                  </div>
                </div>
              ))}
            </div>
          }
          <div className="room-bk">
            <div className="overview-field-img-bk">
              <div className="pic-fieldprof-09-bk">
                <img
                  className="craig-manners-bngxioiwm0y-unsp-icon-bk"
                  alt=""
                  src={selectedImage}
                />
              </div>
              <div className="cover-bk" />
              <div className="cover1-bk" />
            </div>
            <div className="text-bk">
              <div className="writer-bk">
                <div className="pic-fieldprof-021-bk">
                  <img
                    className="parrish-freeman-imidyuvbole-un-icon1-bk"
                    alt=""
                    src="https://s3-alpha-sig.figma.com/img/9110/32e5/6227ab93969eb16d5fea915a78f1d5f6?Expires=1703462400&Signature=Lr7V~PhNnxpqeW6KnDvebXpSKoHOPRDHshOQIVtO0rW32iRKv0eqcmPfnTH8lP1yXNie2orDrRDIWR6UQyKKcgPONYTMuTtXuuROrAdPCUNvuWyto5U39JxwzQ6NuYvAhgo~uC39DNemNNkOYCfpiaCavnYImn2MPfGal828fs3DgnioQNHWreDZniN7VatYBWgIYdXVclCuq7Foes6tXxOOdm3elakwIBjEkx8zmGVSkr42OKakhpNkTsia9g4rDvCCQGY6cdDhOTPsh9uoZQvNBydfV0qEwx0B~E8kX1sx-pcBqdClxdq62i41UVQPOggNs-UPvE3egGQO9EFPFw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
                  />
                </div>
                <div className="text1-bk">
                  <b className="floyd-carter-bk">김초엽</b>
                  <div className="floyd-carter-bk">작가</div>
                </div>
              </div>
              <div className="frame-container-bk">
                <div className="frame-child-bk" />
                <div className="title-parent-bk">
                  <b className="title-bk">3화.</b>
                  <b className="title1-bk">이연</b>
                </div>
              </div>
              <div className="frame-child-bk" />
              <div className="div2-bk">
                <div className="div3-bk">
                  <img
                    className="caglar-oskay-37iikyijewa-unspl-icon1-bk"
                    alt=""
                    src="/caglaroskay37iikyijewaunsplash1@2x.png"
                  />
                </div>
                <b className="b-bk">이연 작가</b>
                <div className="child-bk" />
                <div className="div4-bk">연제완료</div>
                <div className="b-bk">산문</div>
                <div className="parent-bk">
                  <div className="div6-bk">2022.06.30</div>
                  <div className="div6-bk">~</div>
                  <div className="div6-bk">2023.06.30</div>
                </div>
              </div>
              <div className="frame-div-bk">
                <div className="frame-parent1-bk">
                  <div className="frame-child-bk" />
                  <b className="title2-bk">
                    <p className="para">{userData.penName} 작가님의 필드 커버 미리보기</p>
                    <h5 className="p-bk">{userData.penName}</h5>
                  </b>
                </div>
                <div className="div9-bk">
                  펼 연(演) 자를 쓴다. 이름처럼 사는 삶을 꿈꾼다. 매일 운동을
                  하고, 산책을 하고, 사색을 하며, 일기를 쓴다. 내 필드도
                  그러했으면 좋겠다.펼 연(演) 자를 쓴다. 이름처럼 사는 삶을
                  꿈꾼다. 매일 운동을 하고, 산책을 하고, 사색을 하며, 일기를
                  쓴다. 내 필드도 그러했으면 좋겠다.
                </div>
                <div className="frame-inner-bk" />
                <div className="frame-parent2-bk">
                  <div className="cursor-parent-bk">
                    <div className="cursor-bk" />
                    <div className="div10-bk">
                      내 작품을 대표하는 작가의 말을 작성해 주세요
                    </div>
                  </div>
                  <div className="line-bk" />
                </div>
              </div>
            </div>
          </div>
          {
            isMobile &&
            <div className="main-box-image">
              <div className="main-box-image-1">
                <div className="field-select-img-bk">
                  <div className="pic-fieldprof-16-bk">

                    {fieldSelectImage && (
                      <img
                        className="mahdi-bafande-dixt8q81-wq-unsp-icon"
                        alt="Selected Image"
                        src={fieldSelectImage}
                        style={{ width: "13.75rem", height: "13rem" }}
                        loading="lazy"
                      />
                    )}
                  </div>
                  <img className="selected-icon-bk" alt="" src="/SVG/ic_check_s.svg" />
                  <button className="button-bk">
                    <img className="ic-write-icon-bk" alt="" src="/ic-write@2x.png" />
                    <div className="text-bk2">
                      {/* <div className="div3">다시 업로드</div> */}
                      <label htmlFor="fileInput" className="div100">
                        다시 업로드
                      </label>
                      <input
                        type='file'
                        id="fileInput"
                        onChange={handleFile}
                        style={{ display: "none" }}
                      />
                    </div>
                    <img
                      className="ic-arrow-right-icon-bk"
                      alt=""
                      src="/SVG/ic_add_s.svg"
                    />
                  </button>
                </div>
              </div>
              <div className="main-box-image-2">
                {images.map((image, index) => (
                  <div
                    key={index}
                    className="field-select-img1-bk"
                    onClick={() => handleImageClick(image)}
                  >
                    <div className="pic-fieldprof-01-bk">
                      <img className={`img${index}`} alt="" src={image}
                        style={{ width: "13.75rem", height: "10rem" }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  );
};

export default UserBackgroundUpload;