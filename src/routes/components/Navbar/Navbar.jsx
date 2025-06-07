//  Navbar.jsx
/**
 * - 최상단 네비게이션 바
 */
import styles from './Navbar.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import OrgModal from '../OrgModal/OrgModal';

function Navbar() {
    let [isOpen, setIsOpen] = useState(false);
    let [showOrg, setShowOrg] = useState(false);
    const navigate = useNavigate();

    //사번세팅
    const usrId = localStorage.getItem('empNo') || '10002'; // 기본값 10002

    //로그아웃
    const handleLogout = () => {
        //토큰 삭제
        localStorage.removeItem('accesToken');
        //로그인 페이지로 이동
        navigate('/login');
    };

    return (
        <nav className={styles.navbar}>
            <div className={styles['navbar-left']}>
                <Link to="/" className={styles['navbar-brand']}>
                    <img src={'/icon-mushroom.png'} className={styles['navbar-logo']} />
                    <div className={styles['navbar-title']}>버섯상사</div>
                </Link>
                <ul className={styles['navbar-menu']}>
                    <li><Link to="/">홈</Link></li>
                    <li><Link to="/approval">전자결재</Link></li>
                    <li><Link to="/board">게시판</Link></li>
                    <li><Link onClick={() => setShowOrg(true)}>조직도</Link></li>
                    {showOrg && <OrgModal onClose={() => setShowOrg(false)} />}
                </ul>
            </div>

            <div className={styles['navbar-right']}>
                <div className={styles['profile-dropdown']}>
                    <img
                        src={`img_profile/${usrId}.png`}
                        alt="프로필"
                        className={styles['profile-img']}
                        onClick={() => setIsOpen(!isOpen)} />
                    {isOpen && (
                        <ul className={styles['dropdown-menu']}>
                            {/* <li><Link to="/settings">환경설정</Link></li>
                            <li><Link to="/mypage">마이페이지</Link></li> */}
                            <li><button onClick={handleLogout}>로그아웃</button></li>
                        </ul>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
