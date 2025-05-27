//  ReadPopup.jsx
/**
 * - 결재 조회 화면
 * - 참조 기능 포함함
 */
import './WritePopup.css'
import ApprovalBtn from './ApprovalBtn';
import VacationRead from './ReadForms/VacationRead';
import React ,{ useState } from 'react';

function ReadPopup() {
  const params = new URLSearchParams(window.location.search);
  const docId = params.get('docId');


    return (
    <div >
      <ApprovalBtn></ApprovalBtn>
      <VacationRead docId={docId}></VacationRead>
    </div>
    );
}

export default ReadPopup;