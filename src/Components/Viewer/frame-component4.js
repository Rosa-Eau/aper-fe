import styles from "./frame-component4.module.css";
import { useNavigate } from "react-router-dom";

const FrameComponent4 = ({ data }) => {
  const navigate = useNavigate();

  const handleNavigateAper = () => {
    navigate('/login');
  };
  const token = JSON.parse(localStorage.getItem("token"));

  const handleNavigateViewStory = async (stod) => {
    // const storyId = localStorage.getItem("stid1")
    const a = 0;
    navigate(`/user/storyView/${stod}/${a}`);
  }

  const second = localStorage.getItem("second-recomended");
  const second120Chars = second && second.substring(0, 120);

  return (
    <div className={styles.parent}>
      <h3 className={styles.h3}>
        {data && data.title} 
      </h3>
      <div className={styles.buttonArea}>
        <img
          className={styles.icEnterArrowIcon}
          loading="lazy"
          alt=""
          src="/SVG/ic-enter-arrow.svg"
        />
        <div className={styles.spacing4Wrapper}>
          <div className={styles.spacing4} />
        </div>
        <img
          className={styles.norightArrowIcon}
          alt=""
          src="/noright-arrow.svg"
        />
        <div className={styles.wrapper}>
          <div className={styles.div}
            onClick={() => {
              if (!token) {
                handleNavigateAper();
              } else {
                handleNavigateViewStory(data.storyId);
              }
            }}>글 바로 가기</div>
        </div>
        <div className={styles.spacing41} />
      </div>
    </div>
  );
};

export default FrameComponent4;
