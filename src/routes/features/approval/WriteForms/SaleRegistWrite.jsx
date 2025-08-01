// SaleRegistWrite.jsx
/**
 * - 결재 양식 : 판매 실적 등록(작성)
 * - 양식 코드 : SALE_REGISTRATION
 */

import React from "react";
import styles from './WriteForms.module.css';

function SaleRegistWrite({ form, setForm, setEditorYn, getPayloadRef, writer, approvalLine, validateRef }) {
  React.useEffect(() => {
    setEditorYn && setEditorYn("N");
  }, [setEditorYn]);

  // payload 생성 함수 (DTO에 맞게)
  const getPayload = () => ({
    formId: form.formId,
    title: "판매 실적 등록 (" + (form.saleDate ? `${form.saleDate} ` : "") + (form.saleItem ? `, ${form.saleItem})` : ""),
    writer: writer,
    urgentYn: form.urgentYn,
    editorYn: "N",
    formContent: {
      saleDate: form.saleDate,
      saleItem: form.saleItem,
      unitPrice: form.unitPrice,
      quantity: form.quantity,
      amount: form.amount,
    },
    editorContent: "", // 휴가신청서는 에디터 내용 없음
    approvalLine: approvalLine || [],
  });

  // 부모에서 참조할 수 있도록 ref에 할당
  React.useEffect(() => {
    if (getPayloadRef) getPayloadRef.current = getPayload;
  }, [form, getPayloadRef, writer, approvalLine]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const saleItems = [
    { value: "item1", label: "상품 A" },
    { value: "item2", label: "상품 B" },
    { value: "item3", label: "상품 C" },
  ];

  const itemUnitPrices = {
    "상품 A": 10000,
    "상품 B": 20000,
    "상품 C": 30000,
  };

  // 판매 항목 변경 시 개당 금액 자동 세팅
  React.useEffect(() => {
    if (form.saleItem && itemUnitPrices[form.saleItem] !== undefined) {
      setForm(prev => ({ ...prev, unitPrice: itemUnitPrices[form.saleItem] }));
    } else {
      setForm(prev => ({ ...prev, unitPrice: '' }));
    }
  }, [form.saleItem, setForm]);

  // 판매 수량 또는 개당 금액 변경 시 판매 금액 자동 계산
  React.useEffect(() => {
    const qty = Number(form.quantity);
    const unit = Number(form.unitPrice);
    if (!isNaN(qty) && !isNaN(unit) && qty > 0 && unit > 0) {
      setForm(prev => ({ ...prev, amount: qty * unit }));
    } else {
      setForm(prev => ({ ...prev, amount: '' }));
    }
  }, [form.quantity, form.unitPrice, setForm]);

  // 유효성 검사 함수
  React.useEffect(() => {
    if (validateRef) validateRef.current = () => {
      const errors = [];
      if (!form.saleDate) errors.push("판매일을 선택해주세요.");
      if (!form.saleItem) errors.push("판매 항목을 선택해주세요.");
      if (!form.quantity || form.quantity <= 0) errors.push("판매 수량을 입력해주세요.");

      if (errors.length > 0) {
        alert(errors.join('\n'));
        return false;
      }
      return true;
    };
  }, [form, validateRef, approvalLine]);

  return (
    <form className={styles.docForm} onSubmit={e => e.preventDefault()}>
      <div className={styles.formContainer}>
        <div className={styles.formHeader}>
          <h2 className={styles.formHeaderTitle}>판매 실적 등록</h2>
          <span className={styles.urgentLabel}>
            <input
              type="checkbox"
              name="urgentYn"
              checked={form.urgentYn === "Y"}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, urgentYn: e.target.checked ? "Y" : "N" }))
              }
              className={styles.formCheckbox}
            /> 긴급
          </span>
        </div>

        <div className={styles.formRow}>
          <div className={styles.formLabel}>판매일</div>
          <input
            name="saleDate"
            type="date"
            value={form.saleDate}
            onChange={handleChange}
            className={styles.formInput}
          />
        </div>
        <div className={styles.formRow}>
          <div className={styles.rowItem}>
            <div className={styles.formLabel}>판매 항목</div>
            <select
              name="saleItem"
              value={form.saleItem}
              onChange={handleChange}
              list={saleItems}
              className={styles.formInput}
            >
              <option value="">판매 항목 선택</option>
              {saleItems.map(item => (
                <option key={item.value} value={item.label}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.rowItemLast}>
            <div className={styles.formLabel}>개당 금액</div>
            <input
              name="unitPrice"
              type="number"
              value={form.unitPrice || ''}
              readOnly
              placeholder="개당 금액"
              className={styles.formInput}
            />
          </div>
        </div>
        <div className={styles.formRow}>
          <div className={styles.rowItem}>
            <div className={styles.formLabel}>판매 수량</div>
            <input
              name="quantity"
              type="number"
              value={form.quantity}
              onChange={handleChange}
              placeholder="판매 수량 입력"
              className={styles.formInput}
            />
          </div>
          <div className={styles.rowItemLast}>
            <div className={styles.formLabel}>판매 금액</div>
            <div className={styles.lastInput}>
              <input
                name="amount"
                type="number"
                value={form.amount}
                readOnly
                placeholder="판매 금액"
                className={styles.formInput}
              />
            </div>
          </div>
        </div>

        <div className={styles.formFooter}>
          {/* 제출 버튼은 ApprovalWriteBtn의 [상신] 버튼 사용 */}
        </div>
      </div>
    </form>
  );
}

export default SaleRegistWrite;
