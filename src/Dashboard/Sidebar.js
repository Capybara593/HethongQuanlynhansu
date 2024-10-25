// src/Sidebar/Sidebar.js
import React, { useRef } from 'react';
import { FaUserFriends, FaProjectDiagram, FaTicketAlt, FaRocket, FaBuilding, FaHandshake, FaChartLine, FaBox, FaCube, FaFileAlt } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';  // Import Bootstrap
import styles from './Sidebar.module.css';  // Import CSS module

const Sidebar = ({ isOpen, onContentChange }) => {
  const sidebarRef = useRef(null);  // Tạo tham chiếu cho sidebar

  // Hàm xử lý sự kiện cuộn chuột
  const handleScroll = (e) => {
    const sidebar = sidebarRef.current;
    if (sidebar) {
      e.preventDefault();  // Ngăn chặn hành vi mặc định (cuộn trang)
      e.stopPropagation();  // Ngăn chặn sự kiện lan rộng đến các phần tử khác
      sidebar.scrollTop += e.deltaY * 0.5;  // Điều chỉnh tốc độ cuộn
    }
  };

  return (
    <div
      ref={sidebarRef}  // Tham chiếu sidebar
      onWheel={handleScroll}  // Bắt sự kiện cuộn chuột
      className={`${styles.sidebar} ${isOpen ? styles.open : styles.closed} bg-dark text-light vh-100 p-3`}
      style={{ marginTop: '56px', overflowY: 'hidden' }}  // Ẩn thanh cuộn để chỉ cuộn bằng lăn chuột
    >
      {/* Section MAIN */}
      <h6 className="text-muted text-uppercase">{isOpen && 'Main'}</h6> {/* Hiển thị title khi mở */}
      <ul className="nav flex-column mb-4">
        <li className="nav-item mb-2" style={{ marginLeft: '-12px' }}>
          <div className={`nav-link text-light ${isOpen ? 'open' : 'closed'}`} onClick={() => onContentChange('dashboard')}>
            <FaCube className="me-2" /> {isOpen && 'Dashboard'}
          </div>
        </li>
        <li className="nav-item" style={{ marginLeft: '-12px' }}>
          <div className={`nav-link text-light ${isOpen ? 'open' : 'closed'}`} onClick={() => onContentChange('employees')}>
            <FaUserFriends className="me-2" /> {isOpen && 'Employees'}
          </div>
        </li>
        <li className="nav-item" style={{ marginLeft: '-12px' }}>
          <div className={`nav-link text-light ${isOpen ? 'open' : 'closed'}`} onClick={() => onContentChange('clients')}>
            <FaUserFriends className="me-2" /> {isOpen && 'Clients'}
          </div>
        </li>
        <li className="nav-item" style={{ marginLeft: '-12px' }}>
          <div className={`nav-link text-light ${isOpen ? 'open' : 'closed'}`} onClick={() => onContentChange('projects')}>
            <FaProjectDiagram className="me-2" /> {isOpen && 'Projects'}
          </div>
        </li>
        <li className="nav-item" style={{ marginLeft: '-12px' }}>
          <div className={`nav-link text-light ${isOpen ? 'open' : 'closed'}`} onClick={() => onContentChange('tickets')}>
            <FaTicketAlt className="me-2" /> {isOpen && 'Tickets'}
          </div>
        </li>
        <li className="nav-item" style={{ marginLeft: '-12px' }}>
          <div className={`nav-link text-light ${isOpen ? 'open' : 'closed'}`} onClick={() => onContentChange('contacts')}>
            <FaRocket className="me-2" /> {isOpen && 'Contacts'}
          </div>
        </li>
        <li className="nav-item" style={{ marginLeft: '-12px' }}>
          <div className={`nav-link text-light ${isOpen ? 'open' : 'closed'}`} onClick={() => onContentChange('companies')}>
            <FaBuilding className="me-2" /> {isOpen && 'Companies'}
          </div>
        </li>
        <li className="nav-item" style={{ marginLeft: '-12px' }}>
          <div className={`nav-link text-light ${isOpen ? 'open' : 'closed'}`} onClick={() => onContentChange('deals')}>
            <FaHandshake className="me-2" /> {isOpen && 'Deals'}
          </div>
        </li>
        <li className="nav-item" style={{ marginLeft: '-12px' }}>
          <div className={`nav-link text-light ${isOpen ? 'open' : 'closed'}`} onClick={() => onContentChange('leads')}>
            <FaChartLine className="me-2" /> {isOpen && 'Leads'}
          </div>
        </li>
        {/* Thêm mục File */}
        <li className="nav-item" style={{ marginLeft: '-12px' }}>
          <div className={`nav-link text-light ${isOpen ? 'open' : 'closed'}`} onClick={() => onContentChange('file')}>
            <FaFileAlt className="me-2" /> {isOpen && 'File'}
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
