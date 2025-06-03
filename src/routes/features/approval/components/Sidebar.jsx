// Sidebar.jsx
/**
 * - 사이드바
 * - 전자결재 결재함 리스트 선택
 */
import { useState, useEffect, useRef } from "react"
import axios from 'axios'
import styles from './Sidebar.module.css'

function Sidebar() {

  let [createOpen, setCreateOpen] = useState(false);
  let [forms, setforms] = useState([]);
  let isFirst = useRef(true);
  const token = localStorage.getItem('accesToken');

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }
    axios.get('http://localhost:8080/api/approvals/formList', {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
      }
    })
      .then((response) => {
        //console.log(response);
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
        }}><span>
            {/* <img src={'/pencil.png'} ></img> */}
          </span> 결재작성</button>
        {createOpen && (
          <ul className={styles['dropdown-menu']}>
            {forms.map((form, index) => (
              <li key={form.id} onClick={() => window.open(
                `/approval/write?form=${form.reactName}`,
                '_blank',
                'width=800,height=600,top=100,left=200'
              )}>{form.name}</li>
            ))}
          </ul>
        )}
        <div className={styles.menuBox}>
          <hr className={styles.menuLine}></hr>
          <div className={styles.menuTitle}>개인결재함</div>
          <div className={styles.menuList}>결재함</div>
          <div className={styles.menuList}>진행함</div>
          <div className={styles.menuList}>완료함</div>
          <div className={styles.menuList}>임시저장함</div>
          <div className={styles.menuList}>참조함</div>
          <div className={styles.menuList}>반려함</div>
        </div>
        <div className={styles.menuBox}>
          <hr className={styles.menuLine}></hr>
          <div className={styles.menuTitle}>부서결재함</div>
          <div className={styles.menuList}>완료함</div>
          <div className={styles.menuList}>참조함</div>
        </div>
      </div>
    </>
  )
}

export default Sidebar
