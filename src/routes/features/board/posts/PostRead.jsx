// BoardList.jsx
/**
 * - 게시글 목록
 */
import React, { useEffect, useState } from "react"
import axios from 'axios'
import styles from './PostRead.module.css'
import MainViewer from '../../../components/editor/MainViewer'


function PostRead({ postId }) {

  const [form, setForm] = useState({
    title: "",
    urgentYn: "N",
  });
  const [cont, setCont] = useState('');
  const token = localStorage.getItem('accesToken');

  useEffect(() => {
    axios.get('http://localhost:8080/api/board/read', {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        postId: postId
      }
    })
      .then((response) => {
        console.log(response.data);
        //제목, 긴급여부 데이터 세팅
        setForm(response.data.doc);

        //문서 내용 json 파싱 및 세팅 
        setCont(response.data.content);
        console.log(response.data.content);

      })
      .catch((error) => {
        console.error(' 실패 ', error);
      });
  }, [cont]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
      <div className={styles.boardInWrapper}>
        <div className={styles.menuName}>공지사항</div>
        <div>제목</div>

      <div>
        <MainViewer markdownContent={cont} />
      </div>
        <div/>
      </div>
  )
}

export default PostRead
