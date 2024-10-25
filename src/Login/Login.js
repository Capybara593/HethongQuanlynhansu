import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock, FaSignInAlt, FaEye, FaEyeSlash, FaUserLock } from 'react-icons/fa';
import styles from './Login.module.css';

const Login = ({ setUserId }) => {
  const [userId, setLocalUserId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [isLoginClicked, setIsLoginClicked] = useState(false);
  const navigate = useNavigate();

  const textArray = [
    'Chào Bạn!',
    'Bạn có phải là đom đóm không?',
    'Chúng tôi ở đây để giúp bạn gia nhập fan J97!',
    'Đăng nhập và tận hưởng nhé!',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prevIndex) => (prevIndex + 1) % textArray.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [textArray.length]);

  const handleLoginClick = () => {
    setIsLoginClicked(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const loginData = new URLSearchParams();
    loginData.append('userId', userId);
    loginData.append('password', password);

    fetch(' https://1d83-2001-ee0-4fc5-56f0-b99d-4f72-1df1-5b78.ngrok-free.app/api/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: loginData.toString(),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Invalid credentials');
        }
        return response.text();
      })
      .then((data) => {
        if (data === 'Success') {
          setUserId(userId);
          navigate('/dashboard');
        } else {
          throw new Error('Đăng nhập thất bại! Kiểm tra tài khoản mật khẩu!');
        }
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div className={`${styles.container} ${isLoginClicked ? styles.loginMode : ''}`}>
      {!isLoginClicked && (
        <div className={styles.fullScreenContainer}>
          <video autoPlay muted loop className={styles.videoBackground}>
            <source src="/videos/a222.mp4" type="video/mp4" />
          </video>
          <div className={styles.overlayText}>
            <h2>{textArray[textIndex]}</h2>
            <button onClick={handleLoginClick} className={styles.loginButton}>
              Login
            </button>
          </div>
        </div>
      )}

      {isLoginClicked && (
        <div className={styles.formContainer}>
          <div className={styles.leftContainer}>
            <video autoPlay muted loop className={styles.videoBackground}>
              <source src="/videos/as.mp4" type="video/mp4" />
            </video>
            <div className={styles.overlayText}>
              <h2>{textArray[textIndex]}</h2>
              <p>Enter your personal details and start your journey with us</p>
              <a href="/forgot-password" className={styles.forgotPassword}>Forgot your password?</a>
            </div>
          </div>
          <div className={styles.rightContainer}>
            <h1 className={styles.title}><FaUserLock className={styles.iconLarge} />Login</h1>
            {error && <p className={styles.error}>{error}</p>}
            <form onSubmit={handleSubmit}>
              <div className={styles.singleInputWrapper}>
                <FaUser className={styles.iconInside} />
                <input
                  type="text"
                  value={userId}
                  onChange={(e) => setLocalUserId(e.target.value)}
                  required
                  placeholder=" "
                />
                <label>Tên người dùng</label>
              </div>

              <div className={styles.singleInputWrapper}>
                <FaLock className={styles.iconInside} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder=" "
                />
                <label>Mật khẩu</label>
                {password && (
                  <span className={styles.eyeIcon} onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                )}
              </div>

              <div className={styles.buttonContainer}>
                <button type="submit" className={styles.loginButton}><FaSignInAlt className={styles.icon} /> LOGIN</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
