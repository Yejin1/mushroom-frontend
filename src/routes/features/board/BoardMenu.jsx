// BoardMenu.jsx
/**
 * - 게시판 메뉴 사이드바
 */
import { useState, useEffect, useRef } from "react"
import axios from 'axios'
import BoardTree from "./components/MenuTree"
import styles from './BoardMenu.module.css'

function BoardMenu() {

  let [createOpen, setCreateOpen] = useState(false);
  let [forms, setforms] = useState([]);
  let [menus, setMenus] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState(null);
  const token = localStorage.getItem('accesToken');

  useEffect(() => {
    axios.get('http://localhost:8080/api/board/menuList', {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
      }
    })
      .then((response) => {
        //console.log(response);
        setMenus(response.data);
      })
      .catch((error) => {
        console.error(' 실패 ', error);
      });
  }, []);


  return (
    <>
      <div className={styles.sidebar}>
        <button className={styles.createBtn} onClick={() => {
          setCreateOpen(!createOpen);
        }}><span>
          </span> 글쓰기</button>
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
        <BoardTree
          boardMenuData={menus}
          className={styles['board-tree']}
          onSelectBoard={(boardId) => {
            console.log('선택된 게시판 ID:', boardId);
            // 게시글 목록 불러오기
          }}
        />

      </div>
    </>
  )
}

export default BoardMenu
