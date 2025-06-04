// 📦 DraftWrite.jsx
/**
 * - 결재 양식 : 일반기안서 
 * - 화면 구분 : 작성
 * - 양식 코드 : DRAFT
 */

import React from "react";
import MainEditor from "../../../components/editor/MainEditor";

function DraftWrite({ form, setForm, content, setContent, setEditorYn }) {
  React.useEffect(() => {
    if (setEditorYn) setEditorYn("Y"); // 에디터 있는 양식이므로 무조건 Y로 세팅
  }, [setEditorYn]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <h2>일반기안서</h2>

      <div>
        <label>제목</label>
        <input
          name="title"
          type="text"
          value={form.title}
          onChange={handleChange}
          placeholder="문서 제목 입력"
        />
      </div>

      <div>
        <MainEditor
          initialContent={content}
          onContentChange={setContent}
        />
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            name="urgentYn"
            checked={form.urgentYn === "Y"}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, urgentYn: e.target.checked ? "Y" : "N" }))
            }
            className="form-checkbox"
          />
          <span>긴급</span>
        </label>
      </div>
      {/* 제출 버튼은 ApprovalWriteBtn의 [상신] 버튼으로 대체 */}
    </div>
  );
}

export default DraftWrite;
