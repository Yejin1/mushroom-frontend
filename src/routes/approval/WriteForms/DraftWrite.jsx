// 📦 DraftWrite.jsx
/**
 * - 결재 양식 : 일반기안서 
 * - 화면 구분 : 작성
 * - 양식 코드 : DRAFT
 */

import React, { useState } from "react";
import axios from 'axios';
import MainEditor from "../../common/MainEditor";

function DraftWrite() {
  const [form, setForm] = useState({
    title: "",
    startDate: "",
    endDate: "",
    reason: "",
    urgentYn: "N",
  });

  const [content, setContent] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('accesToken');
    const payload = {
      formId: 2,
      title: form.title,
      writer: 1, //백엔드에서 세팅함
      urgentYn: form.urgentYn,
      editorYn: 'Y',
      editorContent: content
    };


    try {
      const response = await axios.post("http://localhost:8080/api/approvals", payload, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      window.close();
      console.log("저장성공:", response.data);

    } catch (error) {
      console.log("저장실패:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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

        <button
          type="submit"
        >
          제출하기
        </button>
      </div>
    </form>
  );
};

export default DraftWrite;
