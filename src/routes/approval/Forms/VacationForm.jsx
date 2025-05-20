// src/components/VacationForm.jsx

import React, { useState } from "react";
import axios from 'axios';

function VacationForm() {
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
    console.log("제출된 데이터:", form);

    const payload = {
      formId : 1,
      title: form.title,
      writer: 1001, //사용자 ID로 대체 필요
      urgentYn: form.urgentYn,
      formContent: {
        startDate: form.startDate,
        endDate: form.endDate,
        reason: form.reason
      }
    };

    try {
      const response = await axios.post("http://localhost:8080/api/approvals", payload);
      console.log("저장성공:", response.data);
    } catch (error) {
      console.log("저장실패:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-6 bg-white rounded shadow space-y-6">
      <h2 className="text-xl font-semibold border-b pb-2">휴가 신청서</h2>

      <div className="grid grid-cols-4 items-center gap-2">
        <label className="col-span-1 text-right font-medium">제목</label>
        <input
          name="title"
          type="text"
          value={form.title}
          onChange={handleChange}
          className="col-span-3 border border-gray-300 rounded px-3 py-2"
          placeholder="문서 제목 입력"
        />
      </div>

      <div className="grid grid-cols-4 items-center gap-2">
        <label className="col-span-1 text-right font-medium">시작일</label>
        <input
          name="startDate"
          type="date"
          value={form.startDate}
          onChange={handleChange}
          className="col-span-3 border border-gray-300 rounded px-3 py-2"
        />
      </div>

      <div className="grid grid-cols-4 items-center gap-2">
        <label className="col-span-1 text-right font-medium">종료일</label>
        <input
          name="endDate"
          type="date"
          value={form.endDate}
          onChange={handleChange}
          className="col-span-3 border border-gray-300 rounded px-3 py-2"
        />
      </div>

      <div className="grid grid-cols-4 items-start gap-2">
        <label className="col-span-1 text-right font-medium pt-2">사유</label>
        <textarea
          name="reason"
          value={form.reason}
          onChange={handleChange}
          className="col-span-3 border border-gray-300 rounded px-3 py-2"
          rows="4"
          placeholder="휴가 사유 입력"
        />
      </div>

      <div className="flex justify-end space-x-4">
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            name="urgentYn"
            checked={form.urgentYn === "Y"}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, urgentYn: e.target.checked ? "Y" : "N" }))
            }
            className="form-checkbox"
          />
          <span className="ml-2 text-sm text-gray-600">긴급</span>
        </label>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded"
        >
          제출하기
        </button>
      </div>
    </form>
  );
};

export default VacationForm;
