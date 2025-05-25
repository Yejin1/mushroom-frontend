// 📦 WritePopup.jsx
/**
 * - 결재 작성 화면
 * - 조직도 선택, 결재양식 선택, 저장/제출 기능 포함
 */
import './WritePopup.css'
import ApprovalBtn from './ApprovalBtn';
import VacationForm from './WriteForms/VacationForm';

function ReadPopup({docNo}) {
    return (
    <div >
      <ApprovalBtn></ApprovalBtn>
      <VacationForm></VacationForm>
    </div>
    );
}

export default ReadPopup;