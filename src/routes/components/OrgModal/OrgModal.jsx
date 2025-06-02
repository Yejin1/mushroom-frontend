//  OrgModal.jsx
/**
 * - 조직도 모달
 */
import styles from './OrgModal.module.css';

function OrgModal({ onClose }) {
  return (
    <div className={styles['modal-overlay']}>
      <div className={styles['modal-content']}>
        <div className={styles['modal-header']}>
          <h2>조직도</h2>
          <button onClick={onClose} className={styles['close-btn']}>✕</button>
        </div>
        <div className={styles['modal-body']}>
          <div className={styles['org-mushroom']}>
            <div className={styles['org-mushroom-profile']}>
              <img src='./img_profile/10001.png' alt="프로필"></img>
            </div>
            <hr />
            <div className={styles['org-mushroom-info']}>
              <div className={styles['org-mushroom-info-name']}>
                노루궁뎅이 <span className={styles['org-mushroom-info-position']}> 과장</span>
              </div>
              <div className={styles['org-mushroom-info-head']}>
                부서 <span className={styles['org-mushroom-info-cont']}> 인사팀</span>
              </div>
              <div className={styles['org-mushroom-info-head']}>
                연락처 <span className={styles['org-mushroom-info-cont']}> 43-242-2423</span>
              </div>
              <div className={styles['org-mushroom-info-head']}>
                메일 <span className={styles['org-mushroom-info-cont']}> deer_hip@mushroom.net</span>
              </div>
              <div className={styles['org-mushroom-info-head']}>
                담당업무 <span className={styles['org-mushroom-info-cont']}> 버섯캐기</span>
              </div>
              <div className={styles['org-mushroom-info-head']}>
                한마디 <span className={styles['org-mushroom-info-cont']}> 노루와 고라니의 차이를 아십니까</span>
              </div>
            </div>
          </div>
          <div className={styles['org-mushroom']}>
            <div className={styles['org-mushroom-profile']}>
              <img src='./img_profile/10001.png' alt="프로필"></img>
            </div>
            <hr />
            <div className={styles['org-mushroom-info']}>
              <div className={styles['org-mushroom-info-name']}>
                노루궁뎅이 <span className={styles['org-mushroom-info-position']}> 과장</span>
              </div>
              <div className={styles['org-mushroom-info-head']}>
                부서 <span className={styles['org-mushroom-info-cont']}> 인사팀</span>
              </div>
              <div className={styles['org-mushroom-info-head']}>
                연락처 <span className={styles['org-mushroom-info-cont']}> 43-242-2423</span>
              </div>
              <div className={styles['org-mushroom-info-head']}>
                메일 <span className={styles['org-mushroom-info-cont']}> deer_hip@mushroom.net</span>
              </div>
              <div className={styles['org-mushroom-info-head']}>
                담당업무 <span className={styles['org-mushroom-info-cont']}> 버섯캐기</span>
              </div>
              <div className={styles['org-mushroom-info-head']}>
                한마디 <span className={styles['org-mushroom-info-cont']}> 노루와 고라니의 차이를 아십니까</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrgModal;