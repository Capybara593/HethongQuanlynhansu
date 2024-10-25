import React, { useState, useEffect, useRef } from 'react';
import { FaBars, FaBell, FaCommentDots, FaSearch, FaCaretDown, FaCaretUp } from 'react-icons/fa';
import styles from './Header.module.css';  // Import CSS modules

const Header = ({ toggleSidebar, onContentChange }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);  // Trạng thái của menu
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);  // Trạng thái của dropdown
  const [userAvatar] = useState('');   // Giả sử trạng thái của ảnh đại diện người dùng
  const dropdownRef = useRef(null);  // Tạo ref cho dropdown

  const handleMenuClick = (e) => {
    e.preventDefault();  // Ngăn chặn hành vi mặc định
    setIsMenuOpen(!isMenuOpen);  // Đổi trạng thái menu
    toggleSidebar();  // Gọi hàm để thu gọn/mở rộng sidebar
  };

  const toggleDropdown = (e) => {
    e.preventDefault();  // Ngăn chặn hành vi mặc định của thẻ <a>
    setIsDropdownOpen(!isDropdownOpen);  // Đổi trạng thái của dropdown
  };

  // Đóng dropdown nếu click ngoài khu vực dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);  // Đóng dropdown
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <nav className={`navbar navbar-expand-lg navbar-light bg-light fixed-top ${styles.customHeader}`}>
      <div className="container-fluid d-flex justify-content-between align-items-center">
        {/* Logo và tên công ty */}
        <div className="d-flex align-items-center">
          <a className={`navbar-brand d-flex align-items-center ${styles.customLogo}`} href="/">
            {!isMenuOpen && <span>SmartHR</span>}
            <FaBars
              className={`${styles.menuIcon} ${isMenuOpen ? styles.menuOpen : ''}`}  // Thêm class khi menu mở
              onClick={handleMenuClick}
            />
          </a>
          <span className={`navbar-text ${styles.companyName}`}>Dreams Technologies</span>
        </div>

        {/* Tìm kiếm */}
        <form className={`d-flex ${styles.searchForm}`}>
          <input className="form-control" type="search" placeholder="Search here" aria-label="Search" />
          <button className="btn btn-outline-success" type="submit">
            <FaSearch />
          </button>
        </form>

        {/* Biểu tượng thông báo và profile */}
        <div className={`d-flex align-items-center ${styles.notificationGroup}`}>
          <a href="/" className="me-3 text-primary">
            <FaBell />
          </a>
          <a href="/" className="me-3 text-primary">
            <FaCommentDots />
          </a>

          {/* Dropdown cho admin */}
          <div className="dropdown" ref={dropdownRef}>  {/* Áp dụng ref cho dropdown */}
            <a 
              href="/" 
              className="d-flex align-items-center"
              onClick={toggleDropdown}  // Toggle dropdown khi nhấn
              style={{ textDecoration: 'none' }}  // Trực tiếp áp dụng style để bỏ gạch chân
            >
              {/* Kiểm tra có ảnh đại diện không, nếu không thì hiển thị ảnh mặc định */}
              <img 
                src={userAvatar || './img/user.png'}  // Sử dụng ảnh mặc định khi không có ảnh user
                alt="Admin avatar"
                className="rounded-circle"
                style={{ width: '30px', height: '30px', objectFit: 'cover' }}  // Làm cho ảnh tròn
              />
              <span className={styles.adminText}>Admin</span>  {/* Sử dụng class adminText */}
              {isDropdownOpen ? <FaCaretUp className={styles.iconDropdown} /> : <FaCaretDown className={styles.iconDropdown} />}
            </a>

            {/* Dropdown menu */}
            {isDropdownOpen && (
              <ul className={`dropdown-menu show ${styles.dropdownMenu}`}>
                <li className="dropdown-item" onClick={() => onContentChange('profile')}>My Profile</li>  {/* Thay đổi nội dung hiển thị thành Profile */}
                <li className="dropdown-item">Settings</li>
                <li className="dropdown-item">Logout</li>
              </ul>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Header;
