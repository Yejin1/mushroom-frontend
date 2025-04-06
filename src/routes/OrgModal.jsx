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
          {/* 여기 조직도 트리 넣기 */}
          
        </div>
      </div>
    </div>
  );
}

export default OrgModal;
