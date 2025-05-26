// 📦 VacationWrite.jsx
/**
 * - 결재 양식 : 휴가 신청서(작성)
 * - 양식 코드 : VACATION
 */

import React, { useState } from "react";
import axios from 'axios';

function VacationWrite() {
  const [form, setForm] = useState({
    title: "",
    startDate: "",
    endDate: "",
    reason: "",
    urgentYn: "N",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log("제출된 데이터:", form);

    const token = localStorage.getItem('accesToken');
    const payload = {
      formId : 1,
      title: form.title,
      writer: 1, 
      urgentYn: form.urgentYn,
      formContent: {
        startDate: form.startDate,
        endDate: form.endDate,
        reason: form.reason
      }
    };

    try {
      const response = await axios.post("http://localhost:8080/api/approvals", payload,{
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
      <h2>휴가 신청서</h2>

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
        <label>시작일</label>
        <input
          name="startDate"
          type="date"
          value={form.startDate}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>종료일</label>
        <input
          name="endDate"
          type="date"
          value={form.endDate}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>사유</label>
        <textarea
          name="reason"
          value={form.reason}
          onChange={handleChange}
          rows="4"
          placeholder="휴가 사유 입력"
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

export default VacationWrite;
