import Sidebar from "./Sidebar"
import React, {useEffect, useState} from "react"
import axios from 'axios'
import './ApprovalMain.css'
import './Sidebar.css'

function ApprovalMain() {

  const [approvals, setApprovals] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/approvals/list?usrId=1&statusCd=3')
    .then((response) => {
      setApprovals(response.data);
    })
    .catch((error) => {
      console.error(' 실패 ', error);
    });
  },[])

    return (
      <div className="approval-wrapper">
        <Sidebar>
        </Sidebar>
        <div className="approval-in-wrapper">
          <div className="menu-name">결재완료함</div>
          <div className="approval-search-wrapper">
            <div className="approval-search">
              <div>제목 <span className="approval-search-s">▼</span></div>
              <input></input>
              <img src={'/search.png'}></img>
            </div>
            <div className="approval-search">
              <div>작성일 <span className="approval-search-s">▼</span></div>
              <input></input>
            </div>
            <div className="approval-search-open-wrapper">
            <img src="./options.png" className="approval-search-open-img"></img>
              <div className="approval-search-open">상세검색</div>
            </div>
          </div>
          <div className="approval-list-wrapper">
          <table className="approval-list-table">
            <thead>
              <tr>
                <th>번호</th>
                <th>양식</th>
                <th>제목</th>
                <th>작성자</th>
                <th>작성일</th>
                <th>완료일</th>
              </tr>
            </thead>
            <tbody>
              {approvals.map((doc, index) => (
                <tr key={doc.id}>
                  <td>{index+1}</td>
                  <td>{doc.formNm}</td>
                  <td>{doc.title}</td>
                  <td>{doc.writerNm}</td>
                  <td>{doc.createDt}</td>
                  <td>{doc.completedDt}</td>
                </tr>
              ))
            }
            </tbody>
          </table>
        </div>
        </div>
      </div>
    )
  }
  
  export default ApprovalMain
  