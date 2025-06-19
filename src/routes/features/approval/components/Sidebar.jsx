// Sidebar.jsx
/**
 * - 사이드바
 * - 전자결재 결재함 리스트 선택
 */
import { useState, useEffect, useRef } from "react"
import axios from 'axios'
import styles from './Sidebar.module.css'

function Sidebar({ onBoxTypeChange }) {

  let [createOpen, setCreateOpen] = useState(false);
  let [forms, setforms] = useState([]);
  let isFirst = useRef(true);
  const token = localStorage.getItem('accesToken');
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }
    axios.get(`${BASE_URL}/api/approvals/formList`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
      }
    })
      .then((response) => {
        setforms(response.data);
      })
      .catch((error) => {
        console.error(' 실패 ', error);
      });
  }, [createOpen]);


  return (
    <>
      <div className={styles.sidebar}>
        <button className={styles.createBtn} onClick={() => {
          setCreateOpen(!createOpen);
        }}>
          <span>
          </span> 결재작성
        </button>
        {createOpen && (
          <ul className={styles['dropdown-menu']}>
            {forms.map((form, index) => (
              <li key={form.id} onClick={() => window.open(
                `/approval/write?form=${form.reactName}&formId=${form.id}`,
                '_blank',
                'width=1050,height=700,top=100,left=200'
              )}>{form.name}</li>
            ))}
          </ul>
        )}
        <div className={styles.menuBox}>
          <hr className={styles.menuLine}></hr>
          <div className={styles.menuTitle}>개인결재함</div>
          <div className={styles.menuList} onClick={() => onBoxTypeChange('my-approval')}>결재함</div>
          <div className={styles.menuList} onClick={() => onBoxTypeChange('my-in-progress')}>진행함</div>
          <div className={styles.menuList} onClick={() => onBoxTypeChange('my-completed')}>완료함</div>
          <div className={styles.menuList} onClick={() => onBoxTypeChange('my-temp')}>임시저장함</div>
          <div className={styles.menuList} onClick={() => onBoxTypeChange('my-referenced')}>참조함</div>
          <div className={styles.menuList} onClick={() => onBoxTypeChange('my-rejected')}>반려함</div>
        </div>
        <div className={styles.menuBox}>
          <hr className={styles.menuLine}></hr>
          <div className={styles.menuTitle}>부서결재함</div>
          <div className={styles.menuList} onClick={() => onBoxTypeChange('my-completed')}>완료함</div>
          <div className={styles.menuList} onClick={() => onBoxTypeChange('my-referenced')}>참조함</div>
        </div>
      </div>
    </>
  )
}

export default Sidebar
