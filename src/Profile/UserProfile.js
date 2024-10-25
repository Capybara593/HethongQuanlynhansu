import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './UserProfile.module.css'; // Import đúng CSS module

const UserProfile = ({ userId }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(` https://1d83-2001-ee0-4fc5-56f0-b99d-4f72-1df1-5b78.ngrok-free.app/api/user/result/${userId}`);
        setUserData(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading user data: {error.message}</p>;

  return (
    <div className={styles.profileContainer}>  {/* Sử dụng CSS module */}
      <div className={styles.profileHeader}>
        <div className={styles.profileImage}>
          <img 
            src={userData.image || './img/user.png'} 
            alt={userData.fullName} 
            style={{ width: '100px', height: '100px', borderRadius: '50%' }} 
          />
        </div>
        <div className={styles.profileDetails}>
          <h2>{userData.fullName}</h2>
          <p>{userData.username}</p>
          <p><strong>Employee ID:</strong> {userData.userId}</p>
          <p><strong>Date of Join:</strong> 1st Jan 2023</p>
          <button className={styles.sendMessageBtn}>Send Message</button>  {/* Sử dụng CSS module */}
        </div>
      </div>

      <div className={styles.profileInfo}>
        <div className={styles.profileInfoLeft}>
          <p><strong>Phone:</strong> {userData.phoneNumber}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Birthday:</strong> {userData.birthDay}</p>
          <p><strong>Address:</strong> {userData.address}</p>
        </div>
        <div className={styles.profileInfoRight}>
          <p><strong>Gender:</strong> Male</p>  {/* Assuming Gender is static for now */}
          <p><strong>Reports to:</strong> <img src="./img/reporting_to_user.png" alt="Reporting to" /></p>
        </div>
      </div>

      <div className={styles.profileTabs}>
        <ul>
          <li className={styles.active}>Profile</li>
          <li>Projects</li>
          <li>Bank & Statutory (Admin Only)</li>
          <li>Assets</li>
        </ul>
      </div>
    </div>
  );
};

export default UserProfile;
