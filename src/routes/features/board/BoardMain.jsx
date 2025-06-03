// BoardList.jsx
/**
 * - 게시글 목록
 */
import BoardMenu from "./BoardMenu"
import PostRead from "./posts/PostRead"
import React, { useEffect, useState } from "react"
import axios from 'axios'
import styles from './BoardList.module.css'
import BoardList from "./components/BoardList"

function BoardMain() {

  const token = localStorage.getItem('accesToken');

 
 
  return (
    <div className={styles.boardWrapper}>
      <BoardMenu>
      </BoardMenu>
      <BoardList></BoardList>
      <PostRead postId={1}></PostRead>
      
    </div>
  )
}

export default BoardMain
