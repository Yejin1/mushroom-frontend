import './Navbar.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';

function Navbar() {

    let [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="navbar">
            <div className="navbar-left">
            <div className="navbar-brand">
                <img src={'/icon-mushroom.png'} className="navbar-logo"></img>
                <div className="navbar-title">버섯상사</div>
            </div>
            <ul className="navbar-menu">
                <li><Link to="/">홈</Link></li>
                <li><Link to="/login">전자결재</Link></li>
                <li><Link to="/about">게시판</Link></li>
                <li><Link to="/about">조직도</Link></li>
            </ul>
            </div>

            <div className="navbar-right">
                <div className="profile-dropdown">
                    <img
                        src="img_profile/10002.png"
                        alt="프로필"
                        className="profile-img"
                        onClick={ () => setIsOpen(!isOpen)} />
                        {isOpen && (
                            <ul className="dropdown-menu">
                                <li><Link to="/settings">환경설정</Link></li>
                                <li><Link to="/mypage">마이페이지</Link></li>
                                <li><button onClick={()=> alert('로그아웃')}>로그아웃</button></li>
                            </ul>
                        )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
