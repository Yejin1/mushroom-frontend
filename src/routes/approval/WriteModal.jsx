// 📦 WriteModal.jsx
/**
 * - 결재 작성 화면
 * - 조직도 선택, 결재양식 선택, 저장/제출 기능 포함
 * - 모달 형태로 사용됨 (Navbar 숨겨짐)
 */
import './WriteModal.css'
import LeavRequest from './Forms/LeaveRequest';
import ApprovalBtn from './ApprovalBtn';
import VacationForm from './Forms/VacationForm';

function WriteModal({docNo}) {


    return (
    <div >
      <ApprovalBtn></ApprovalBtn>
      <VacationForm></VacationForm>
    </div>
    );
}

export default WriteModal;