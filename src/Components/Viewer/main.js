
// import FrameComponent4 from "../components/frame-component4";
// import FrameComponent3 from "../components/frame-component3";

import styles from './main.module.css'

const MainHub = () => {
  return (
    <div className={styles.main}>
      <section className={styles.mainInner}>
        <div className={styles.parent}>
          <h3 className={styles.h3}>추천하는 이야기</h3>
          {/* <FrameComponent4 />
          <FrameComponent3 /> */}
          <div className={styles.bgParent}>
            <div className={styles.bg}>
              <div className={styles.inprogress} />
            </div>
            <div className={styles.bg1}>
              <div className={styles.inprogress1} />
            </div>
          </div>
          <div className={styles.bg2}>
            <div className={styles.inprogress2} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default MainHub;
