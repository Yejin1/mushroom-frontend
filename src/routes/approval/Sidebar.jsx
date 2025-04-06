import { useState } from "react"

function Sidebar() {

  let [createOpen, setCreateOpen] = useState(false);

    return (
      <>
        <div className="sidebar">
            <button className="createBtn" onClick={()=>{
              setCreateOpen(!createOpen);
            }}><span><img src={'/pencil.png'} ></img></span> 결재작성</button>
            {createOpen && (
                            <ul className="dropdown-menu">
                                <li>기안서</li>
                                <li>품의서</li>
                                <li>휴가신청서</li>
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
  