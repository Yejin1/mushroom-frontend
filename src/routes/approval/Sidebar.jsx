// Sidebar.jsx
/**
 * - 사이드바
 * - 전자결재 결재함 리스트 선택
 */
import { useState, useEffect, useRef } from "react"
import axios from 'axios'
import WritePopup from "./WritePopup";

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
      <div className="sidebar">
        <button className="createBtn" onClick={() => {
          setCreateOpen(!createOpen);
        }}><span>
            {/* <img src={'/pencil.png'} ></img> */}
          </span> 결재작성</button>
        {createOpen && (
          <ul className="dropdown-menu">
            {forms.map((form, index) => (
              <li key={form.id} onClick={() => window.open(
                `/approval/write?form=${form.reactName}`,
                '_blank',
                'width=800,height=600,top=100,left=200'
              )}>{form.name}</li>
            ))}
          </ul>
        )}
        <div className="menu-box">
          <hr className="menu-line"></hr>
          <div className="menu-title">개인결재함</div>
          <div className="menu-list">결재함</div>
          <div className="menu-list">진행함</div>
          <div className="menu-list">완료함</div>
          <div className="menu-list">임시저장함</div>
          <div className="menu-list">참조함</div>
          <div className="menu-list">반려함</div>
        </div>
        <div className="menu-box">
          <hr className="menu-line"></hr>
          <div className="menu-title">부서결재함</div>
          <div className="menu-list">완료함</div>
          <div className="menu-list">참조함</div>
        </div>
      </div>
    </>
  )
}


export default Sidebar
