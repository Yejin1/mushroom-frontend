// PostWrite.jsx
/**
 * - 게시글 작성
 */
import { useState, useEffect } from "react"
import axios from 'axios';
import styles from './PostWrite.module.css';
import MainEditor from "../../../components/editor/MainEditor";

function PostWrite({ setIsWriting }) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [menuId, setMenuId] = useState(null);
    const [menus, setMenus] = useState([]);
    const token = localStorage.getItem('accesToken');
    const BASE_URL = import.meta.env.VITE_BASE_URL;


    useEffect(() => {
        axios.get(`${BASE_URL}/api/board/writeMenuList`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
            }
        })
            .then((response) => {
                setMenus(response.data);
                console.log('게시판 메뉴 목록:', response.data);
            })
            .catch((error) => {
                console.error(' 실패 ', error);
            });
    }, []);

    const handleChange = (e) => {
        // input 값 변경 핸들러
        if (e.target.name === 'title') {
            setTitle(e.target.value);
        } else {
            setContent(e.target.value);
        }
    };

    const handleEditorChange = (value) => {
        setContent(value);
    };

    const handleSubmit = async () => {
        // 게시글 작성 로직
        const payload = {
            boardMenuId: menuId,
            title: title,
            content: content
        };
        try {
            await axios.post(`${BASE_URL}/api/board/write`, payload, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert("작성이 완료되었습니다.");
            setIsWriting(false); // 작성 완료 후 글쓰기 모달 닫기
        } catch (error) {
            alert("작성에 실패했습니다.");
        }
    };

    return (
        <div>
            <div className={styles.menuName}>글쓰기</div>
            <div className={styles.menuSelectWrapper}>
                <label htmlFor="menu-select" className={styles.menuSelectLabel}>게시판 선택</label>
                <select
                    id="menu-select"
                    value={menuId || ''}
                    onChange={e => setMenuId(e.target.value)}
                    className={styles.menuSelect}
                >
                    <option value="" disabled>게시판을 선택하세요</option>
                    {menus.map(menu => (
                        <option key={menu.boardId} value={menu.boardId}>{menu.name}</option>
                    ))}
                </select>
            </div>
            <div className={styles.formRow}>
                <div className={styles.formLabel}>제목</div>
                <input
                    name="title"
                    type="text"
                    value={title}
                    onChange={handleChange}
                    placeholder="문서 제목 입력"
                    className={styles.formInput}
                />
            </div>

            <div className={styles.formRow}>
                <div style={{ flex: 1 }}>
                    <MainEditor
                        value={content}
                        onChange={handleEditorChange}
                    />
                </div>
            </div>
            <div style={{ marginTop: 32 }}>
                <button type="button" className={styles.writeButton} onClick={handleSubmit}>
                    등록
                </button>
                <button type="button" className={styles.cancelButton} onClick={() => setIsWriting(false)}>
                    취소
                </button>
            </div>
        </div>
    );
}

export default PostWrite;