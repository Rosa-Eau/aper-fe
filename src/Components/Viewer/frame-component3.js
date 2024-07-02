import styles from "./frame-component3.module.css";
import { useNavigate } from "react-router-dom";

const FrameComponent3 = ({ data }) => {


  // First Recomended Story Section for Mobile View
  const navigate = useNavigate();
  const firstTitle = localStorage.getItem("first-title")
  const a1 = localStorage.getItem("first-auth");
  const routine1 = localStorage.getItem("first-routineType")
  const date1 = localStorage.getItem("first-date")


  const second = localStorage.getItem("second-recomended");
  const second120Chars = second && second.substring(0, 120);

  const third = localStorage.getItem("third-recomended");
  const third120Chars = third && third.substring(0, 120);

  const a2 = localStorage.getItem("second-auth")
  const date2 = localStorage.getItem("second-date")
  const routine2 = localStorage.getItem("second-routineType")
  const secondTitlle = localStorage.getItem("second-coverTitle")



  //Third Recomended
  const a3 = localStorage.getItem("third-auth")
  const thirdTitle = localStorage.getItem("third-title")
  const date3 = localStorage.getItem("third-date")
  const routine3 = localStorage.getItem("third-routine")

  const handleNavigateAper = () => {
    navigate('/login')
  }
  return (
    <div className={styles.captionsWrapper}>
      <div className={styles.captions}>
        <div className={styles.div}>
          <img className={styles.icon} alt="" src="/--001-3@2x.png" />
          <div className={styles.div1}>서재</div>
          <div className={styles.wrapper}>
            <b className={styles.b}> {data && data.title}</b>
          </div>
        </div>
        <div className={styles.div2}>
          <img className={styles.icon1} alt="" src="/--001-3@2x.png" />
          <div className={styles.div3}>서재</div>
        </div>
        <div className={styles.parent}>
          <b className={styles.b1}>{a1}</b>
          <div className={styles.borderPropertiesParent}>
            <div className={styles.borderProperties}>
              <img className={styles.icon2} alt="" src="/--001-3@2x.png" />
              <div className={styles.div4}>서재</div>
              <div className={styles.fillProperties}>
                <div className={styles.div5}>{data && data.routine}</div>
              </div>
            </div>
            <div className={styles.div6}>
              <img className={styles.icon3} alt="" src="/--001-3@2x.png" />
              <div className={styles.div7}>연제완료</div>
              <div className={styles.div8}>{data && data.date}</div>
              <div className={styles.div9}>~</div>
              <div className={styles.div10}>{data && data.date}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrameComponent3;
