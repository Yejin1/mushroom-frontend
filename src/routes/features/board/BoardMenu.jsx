// BoardMenu.jsx
/**
 * - 게시판 메뉴 사이드바
 */
import { useState, useEffect, useRef } from "react"
import axios from 'axios'
import BoardTree from "./components/MenuTree"
import styles from './BoardMenu.module.css'

function BoardMenu({ handleWriteClick, setMenuId }) {

  let [createOpen, setCreateOpen] = useState(false);
  let [forms, setforms] = useState([]);
  let [menus, setMenus] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState(null);
  const token = localStorage.getItem('accesToken');
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    axios.get(`${BASE_URL}/api/board/menuList`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
      }
    })
      .then((response) => {
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
          handleWriteClick();
        }}><span>
          </span> 글쓰기</button>
        <BoardTree
          boardMenuData={menus}
          className={styles['board-tree']}
          onSelectBoard={(boardId) => {
            setMenuId(boardId);
          }}
        />

      </div>
    </>
  )
}

export default BoardMenu
