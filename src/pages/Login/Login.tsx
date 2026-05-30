import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.scss';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateEmail = (value: string) => {
    if (!value) return 'Email is required';
    if (!/\S+@\S+\.\S+/.test(value)) return 'Enter a valid email address';
    return '';
  };

  const validatePassword = (value: string) => {
    if (!value) return 'Password is required';
    if (value.length < 6) return 'Password must be at least 6 characters';
    return '';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const emailErr = validateEmail(email);
    const passwordErr = validatePassword(password);

    setEmailError(emailErr);
    setPasswordError(passwordErr);

    if (emailErr || passwordErr) return;

    navigate('/dashboard/users');
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.leftPanel}>
        <div className={styles.logo}>
          <img src="/logo.svg" alt="Lendsqr logo" />
        </div>
        <div className={styles.illustration}>
          <img src="/login-illustration.svg" alt="Login illustration" />
        </div>
      </div>

      <div className={styles.rightPanel}>
        <div className={styles.formWrapper}>
          <h1 className={styles.title}>Welcome!</h1>
          <p className={styles.subtitle}>Enter details to login.</p>

          <form onSubmit={handleSubmit} noValidate>
            <div className={styles.formGroup}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (emailError) setEmailError('');
                }}
                className={`${styles.input} ${emailError ? styles.inputError : ''}`}
              />
              {emailError && (
                <span className={styles.errorText}>{emailError}</span>
              )}
            </div>

            <div className={styles.formGroup}>
              <div className={styles.passwordWrapper}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (passwordError) setPasswordError('');
                  }}
                  className={`${styles.input} ${passwordError ? styles.inputError : ''}`}
                />
                <button
                  type="button"
                  className={styles.showToggle}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? 'HIDE' : 'SHOW'}
                </button>
              </div>
              {passwordError && (
                <span className={styles.errorText}>{passwordError}</span>
              )}
            </div>

            <div className={styles.forgotPassword}>
              <a href="#">FORGOT PASSWORD?</a>
            </div>

            <button type="submit" className={styles.loginBtn}>
              LOG IN
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;