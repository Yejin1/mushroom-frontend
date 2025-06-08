//  OrgModal.jsx
/**
 * - 조직도 모달
 */
import React, { useEffect, useState } from 'react';
import styles from './OrgModal.module.css';

function OrgModal({ onClose }) {
  const [orgList, setOrgList] = useState([]);
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const token = localStorage.getItem('accesToken');

  useEffect(() => {
    const fetchOrgList = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/usr/org/modalList`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) throw new Error('조직도 정보를 불러오지 못했습니다.');
        const data = await response.json();
        console.log('조직도 정보:', data);
        setOrgList(data);
      } catch (error) {
        alert(error.message);
      }
    };
    fetchOrgList();
  }, [BASE_URL, token]);

  return (
    <div className={styles['modal-overlay']}>
      <div className={styles['modal-content']}>
        <div className={styles['modal-header']}>
          <h2>조직도</h2>
          <button onClick={onClose} className={styles['close-btn']}>✕</button>
        </div>
        <div className={styles['modal-body']}>
          {orgList.map((user) => (
            <div className={styles['org-mushroom']} key={user.usrId}>
              <div className={styles['org-mushroom-profile']}>
                <img src={`./img_profile/${user.empNo}.png`} alt="프로필" onError={e => { e.target.onerror = null; e.target.src = './img_profile/default.png' }} />
              </div>
              <hr />
              <div className={styles['org-mushroom-info']}>
                <div className={styles['org-mushroom-info-name']}>
                  {user.usrNm} <span className={styles['org-mushroom-info-position']}> {user.posNm}</span>
                </div>
                <div className={styles['org-mushroom-info-head']}>
                  부서 <span className={styles['org-mushroom-info-cont']}> {user.deptNm}</span>
                </div>
                <div className={styles['org-mushroom-info-head']}>
                  연락처 <span className={styles['org-mushroom-info-cont']}> {user.extensionNo}</span>
                </div>
                <div className={styles['org-mushroom-info-head']}>
                  메일 <span className={styles['org-mushroom-info-cont']}> {user.email}</span>
                </div>
                <div className={styles['org-mushroom-info-head']}>
                  담당업무 <span className={styles['org-mushroom-info-cont']}> {user.jobDesc}</span>
                </div>
                <div className={styles['org-mushroom-info-head']}>
                  한마디 <span className={styles['org-mushroom-info-cont']}> {user.profileBio}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default OrgModal;