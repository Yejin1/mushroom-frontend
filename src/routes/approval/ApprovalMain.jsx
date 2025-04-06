import Sidebar from "./Sidebar"
import './ApprovalMain.css'
import './Sidebar.css'

function ApprovalMain() {

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
              <tr>
                <td>1</td>
                <td>품의서</td>
                <td>세계정복 계획보고</td>
                <td>능이버섯</td>
                <td>2024-04-06</td>
                <td>2024-04-07</td>
              </tr>
              <tr>
                <td>2</td>
                <td>품의서</td>
                <td>세계정복 계획보고</td>
                <td>능이버섯</td>
                <td>2024-04-06</td>
                <td>2024-04-07</td>
              </tr>
            </tbody>
          </table>
        </div>
        </div>
      </div>
    )
  }
  
  export default ApprovalMain
  