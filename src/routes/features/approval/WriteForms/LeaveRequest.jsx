// 📦 LeavRequest.jsx
/**
 * - 결재 양식 : 휴가 신청서(삭제예정, 스타일 참고용용)
 */
import './Forms.css'

function LeavRequest({docNo}) {
    return (
    <div >
        <h2>휴가 신청서</h2>
        <div>
            <form>
                <input name="title"></input>
                <table></table>
            </form>
        </div>
    </div>
    );
}

export default LeavRequest;