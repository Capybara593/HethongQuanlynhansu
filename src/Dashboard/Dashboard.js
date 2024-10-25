// src/Dashboard/Dashboard.js
import React, { useState } from 'react';
import Header from './Header';  // Import Header component
import Sidebar from './Sidebar';  // Import Sidebar component
import ListEmployees from '../Employee/ListEmployees';  // Import component Employees
import UserProfile from '../Profile/UserProfile';  // Import UserProfile component
import FileUpload from '../Components/FileUpload';  // Import FileUpload component
import FileList from '../Components/FileList';  // Import FileList component
import styles from './Dashboard.module.css';  // Import CSS module riêng cho Dashboard

export default function Dashboard({ userId }) {  // Nhận userId từ props
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Quản lý trạng thái mở/đóng của sidebar
  const [content, setContent] = useState('dashboard');  // Quản lý nội dung hiển thị

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); // Đổi trạng thái giữa mở và đóng sidebar
  };

  // Hàm thay đổi nội dung hiển thị
  const changeContent = (newContent) => {
    setContent(newContent);
  };

  return (
    <div className="d-flex">
      {/* Sidebar nằm bên trái */}
      <Sidebar isOpen={isSidebarOpen} onContentChange={changeContent} />

      {/* Nội dung chính */}
      <div className={`${styles.content} ${isSidebarOpen ? styles.open : styles.closed} flex-grow-1`}>
        {/* Header */}
        <Header toggleSidebar={toggleSidebar} onContentChange={changeContent} /> {/* Truyền onContentChange vào Header */}

        {/* Main content */}
        <main className="container mt-5 pt-5">
          {content === 'dashboard' && <h1>Dashboard Content</h1>}  {/* Hiển thị Dashboard */}
          {content === 'employees' && <ListEmployees />}  {/* Hiển thị Employees nếu chọn */}
          {content === 'clients' && <h1>Clients Content</h1>}  {/* Hiển thị Clients */}
          {content === 'projects' && <h1>Projects Content</h1>}  {/* Hiển thị Projects */}
          {content === 'tickets' && <h1>Tickets Content</h1>}  {/* Hiển thị Tickets */}
          {content === 'contacts' && <h1>Contacts Content</h1>}  {/* Hiển thị Contacts */}
          {content === 'companies' && <h1>Companies Content</h1>}  {/* Hiển thị Companies */}
          {content === 'deals' && <h1>Deals Content</h1>}  {/* Hiển thị Deals */}
          {content === 'leads' && <h1>Leads Content</h1>}  {/* Hiển thị Leads */}
          {content === 'profile' && <UserProfile userId={userId} />}  {/* Hiển thị Profile với userId */}
          {content === 'file' && (
            <div>
              <h1>File Management</h1>
              <FileUpload userId={userId} />  {/* Hiển thị FileUpload component */}
              <FileList userId={userId} />  {/* Hiển thị FileList component */}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
