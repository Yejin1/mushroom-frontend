import './OrgModal.css';

function OrgModal({ onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>조직도</h2>
          <button onClick={onClose} className="close-btn">✕</button>
        </div> 
        <div className="modal-body">
          <div className="org-mushroom">
            <div className="org-mushroom-profile">
              <img src='./img_profile/10001.png'></img>
            </div>
            <hr></hr>
            <div className="org-mushroom-info">
              <div className="org-mushroom-info-name">노루궁뎅이 <span className='org-mushroom-info-position'> 과장</span></div>
              <div className="org-mushroom-info-head">부서 <span className='org-mushroom-info-cont'> 인사팀</span></div>
              <div className="org-mushroom-info-head">연락처 <span className='org-mushroom-info-cont'> 43-242-2423</span></div>
              <div className="org-mushroom-info-head">메일 <span className='org-mushroom-info-cont'> deer_hip@mushroom.net</span></div>
              <div className="org-mushroom-info-head">담당업무 <span className='org-mushroom-info-cont'> 버섯캐기</span></div>
              <div className="org-mushroom-info-head">한마디 <span className='org-mushroom-info-cont'> 노루와 고라니의 차이를 아십니까</span></div>
            </div>
          </div>
          <div className="org-mushroom">
            <div className="org-mushroom-profile">
              <img src='./img_profile/10001.png'></img>
            </div>
            <hr></hr>
            <div className="org-mushroom-info">
              <div className="org-mushroom-info-name">노루궁뎅이 <span className='org-mushroom-info-position'> 과장</span></div>
              <div className="org-mushroom-info-head">부서 <span className='org-mushroom-info-cont'> 인사팀</span></div>
              <div className="org-mushroom-info-head">연락처 <span className='org-mushroom-info-cont'> 43-242-2423</span></div>
              <div className="org-mushroom-info-head">메일 <span className='org-mushroom-info-cont'> deer_hip@mushroom.net</span></div>
              <div className="org-mushroom-info-head">담당업무 <span className='org-mushroom-info-cont'> 버섯캐기</span></div>
              <div className="org-mushroom-info-head">한마디 <span className='org-mushroom-info-cont'> 노루와 고라니의 차이를 아십니까</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrgModal;
