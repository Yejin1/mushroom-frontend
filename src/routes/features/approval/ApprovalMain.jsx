// ApprovalMain.jsx
/**
 * - 결재 목록 화면
 * - 전자결재 로그인 시 가장 먼저 보이는 화면
 */
import Sidebar from './components/Sidebar'
import React, { useEffect, useState, useRef } from "react"
import axios from 'axios'
import styles from './ApprovalMain.module.css';

function ApprovalMain() {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [approvals, setApprovals] = useState([]);
  const [page, setPage] = useState(0);
  const [boxType, setBoxType] = useState('my-completed');
  const token = localStorage.getItem('accesToken');
  const [totalPages, setTotalPages] = useState(0);
  const [searchType, setSearchType] = useState('all');
  const [searchValue, setSearchValue] = useState('');
  // 실제 검색에 사용할 state
  const [searchTypeValue, setSearchTypeValue] = useState('all');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  const todayStr = `${yyyy}-${mm}-${dd}`;
  const tenYearsAgoStr = `${yyyy - 10}-${mm}-${dd}`;

  const [startDate, setStartDate] = useState(tenYearsAgoStr);
  const [endDate, setEndDate] = useState(todayStr);

  useEffect(() => {
    console.log(startDate, endDate);
    axios.get(`${BASE_URL}/api/approvals/list`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        page: page,
        size: 10,
        sort: 'createdDt,desc',
        boxType: boxType,
        searchType: searchTypeValue,
        keyword: searchKeyword,
        startDate: startDate,
        endDate: endDate
      }
    })
      .then((response) => {
        setTotalPages(response.data.totalPages);
        setApprovals(response.data.content);
        console.log(response);
      })
      .catch((error) => {
        if (error.response && error.response.status === 403) {
          alert('로그인이 필요합니다. 다시 로그인 해주세요.');
          window.location.href = '/login';
        }
      });
  }, [page, boxType, searchTypeValue, searchKeyword, startDate, endDate]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleBoxTypeChange = (type) => {
    setBoxType(type);
    setPage(0);
    setSearchType('all');      // 검색 드롭다운 초기화
    setSearchValue('');        // 검색어 입력값 초기화
    setSearchTypeValue('all'); // 실제 검색 state도 초기화
    setSearchKeyword('');      // 실제 검색 state도 초기화
  };

  const handleOpenDoc = (docId, formId, lineId, userId, writer) => {
    let own = 'N';
    if (userId == writer) own = 'Y';
    window.open(
      `/approval/read?formId=${formId}&docId=${docId}&boxType=${boxType}&lineId=${lineId}&own=${own}`,
      '_blank',
      'width=800,height=600,top=100,left=200'
    );
  };

  function formatDateTime(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    const yyyy = date.getFullYear();
    const MM = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    const hh = String(date.getHours()).padStart(2, '0');
    const mi = String(date.getMinutes()).padStart(2, '0');
    const ss = String(date.getSeconds()).padStart(2, '0');
    return `${yyyy}-${MM}-${dd} ${hh}:${mi}:${ss}`;
  }

  const boxTypeNames = {
    'my-approval': '결재함',
    'my-in-progress': '진행함',
    'my-completed': '완료함',
    'my-temp': '임시저장함',
    'my-referenced': '참조함',
    'my-rejected': '반려함',
    'dept-completed': '완료함',
    'dept-referenced': '참조함',
  };

  const searchOptions = [
    { value: "all", label: "전체" },
    { value: "title", label: "제목" },
    { value: "formNm", label: "양식" },
    { value: "writerNm", label: "작성자" },
  ];

  // 검색 버튼 클릭 시 실제 검색 state에 반영
  const handleSearch = () => {
    setSearchTypeValue(searchType);
    setSearchKeyword(searchValue);
    setPage(0);
  };

  // 날짜 변경 시에도 page를 0으로 리셋
  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
    setPage(0);
  };
  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
    setPage(0);
  };

  return (
    <div className={styles['approval-wrapper']}>
      <Sidebar onBoxTypeChange={handleBoxTypeChange} />
      <div className={styles['approval-in-wrapper']}>
        <div className={styles['menu-name']}>{boxTypeNames[boxType] || '결재함'}</div>
        <div className={styles['approval-search-wrapper']}>
          <div className={styles['approval-search']}>
            <div
              className={styles['search-dropdown']}
              ref={dropdownRef}
            >
              <button
                type="button"
                className={styles['search-dropdown-btn']}
                onClick={() => setDropdownOpen((open) => !open)}
              >
                {searchOptions.find(opt => opt.value === searchType)?.label || "전체"}
                <span style={{ marginLeft: 4 }}>▼</span>
              </button>
              {dropdownOpen && (
                <ul className={styles['search-dropdown-list']}>
                  {searchOptions.map(opt => (
                    <li
                      key={opt.value}
                      className={styles['search-dropdown-item']}
                      onClick={() => {
                        setSearchType(opt.value);
                        setDropdownOpen(false);
                      }}
                    >
                      {opt.label}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <input
              value={searchValue}
              onChange={e => setSearchValue(e.target.value)}
              placeholder="검색어 입력"
            />
            <img src={'/search.png'} alt="검색" style={{ cursor: 'pointer' }} onClick={handleSearch} />
          </div>
          {/* 작성일 검색 영역 */}
          <div className={styles['approval-search-date']}>
            <span className={styles['search-date-label']}>작성일</span>
            <input
              type="date"
              value={startDate || ''}
              onChange={handleStartDateChange}
              className={styles['search-date-input']}
            />
            <span style={{ margin: '0 6px', color: '#888' }}>~</span>
            <input
              type="date"
              value={endDate || ''}
              onChange={handleEndDateChange}
              className={styles['search-date-input']}
            />
          </div>
        </div>
        <div className={styles['approval-list-wrapper']}>
          <table className={styles['approval-list-table']}>
            <thead>
              <tr>
                <th>번호</th>
                <th>양식</th>
                <th>제목</th>
                <th>작성자</th>
                <th>작성일</th>
                <th>완료일</th>
              </tr>
            </thead>
            <tbody>
              {approvals.map((doc, index) => (
                <tr key={index}>
                  <td>{index + page * 10 + 1}</td>
                  <td>{doc.formNm}</td>
                  <td>
                    <span
                      className={styles['approval-title']}
                      onClick={() => handleOpenDoc(doc.id, doc.formId, doc.lineId, doc.userId, doc.writer)}
                    >
                      {doc.title}
                    </span>
                  </td>
                  <td>{doc.writerNm}</td>
                  <td>{formatDateTime(doc.createdDt)}</td>
                  <td>{formatDateTime(doc.completedDt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className={styles['approval-pagination']}>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={`${styles['approval-pagination-btn']}${page === i ? ' ' + styles.active : ''}`}
              onClick={() => handlePageChange(i)}
              disabled={page === i}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ApprovalMain
