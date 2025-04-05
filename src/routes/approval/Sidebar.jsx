

function Sidebar() {

    return (
      <>
        <div className="sidebar">
            <button className="createBtn"><span><img src={'/pencil.png'} ></img></span> 결재작성</button>
            <hr className="menu-line"></hr>
            <div classNmae="menu-box">
                <div className="menu-title">개인결재함</div>
            </div>
        </div>
      </>
    )
  }
  
  export default Sidebar
  