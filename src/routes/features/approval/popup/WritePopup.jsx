// 📦 WritePopup.jsx
/**
 * - 결재 작성 화면
 * - 조직도 선택, 결재양식 선택, 저장/제출 기능 포함
 */
import './WritePopup.module.css'
import ApprovalBtn from '../components/ApprovalBtn'
import VacationWrite from '../WriteForms/VacationWrite';
import DraftWrite from '../WriteForms/DraftWrite';

function WritePopup() {
  const params = new URLSearchParams(window.location.search);
  const form = params.get('form') + 'Write';

  //문서 양식 컴포넌트 목록 변수화(양식 신규 생성할때마다 여기 추가해줘야함)
  const formComponents = { VacationWrite, DraftWrite };

  //양식명으로 컴포넌트 할당
  const FormComponent = formComponents[form];

  return (
    <div >
      <ApprovalBtn></ApprovalBtn>
      <FormComponent></FormComponent>
    </div>
  );
}

export default WritePopup;