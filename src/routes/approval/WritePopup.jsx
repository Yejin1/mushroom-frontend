// 📦 WritePopup.jsx
/**
 * - 결재 작성 화면
 * - 조직도 선택, 결재양식 선택, 저장/제출 기능 포함
 */
import './WritePopup.css'
import ApprovalBtn from './ApprovalBtn';
import VacationWrite from './WriteForms/VacationWrite';

function WritePopup({docNo}) {
    return (
    <div >
      <ApprovalBtn></ApprovalBtn>
      <VacationWrite></VacationWrite>
    </div>
    );
}

export default WritePopup;