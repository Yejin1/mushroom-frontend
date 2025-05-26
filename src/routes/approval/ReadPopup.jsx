//  ReadPopup.jsx
/**
 * - 결재 조회 화면
 * - 참조 기능 포함함
 */
import './WritePopup.css'
import ApprovalBtn from './ApprovalBtn';
import VacationRead from './ReadForms/VacationRead';

function ReadPopup({docNo}) {
    return (
    <div >
      <ApprovalBtn></ApprovalBtn>
      <VacationRead></VacationRead>
    </div>
    );
}

export default ReadPopup;