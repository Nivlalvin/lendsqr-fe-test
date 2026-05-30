import styles from './Navbar.module.scss';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logoWrapper}>
        <img src="/logo.svg" alt="Lendsqr logo" className={styles.logo} />
      </div>

      <div className={styles.searchWrapper}>
        <input
          type="text"
          placeholder="Search for anything"
          className={styles.searchInput}
        />
        <button className={styles.searchBtn} aria-label="Search">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.333 12.667A5.333 5.333 0 1 0 7.333 2a5.333 5.333 0 0 0 0 10.667ZM14 14l-2.9-2.9"
              stroke="#fff"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      <div className={styles.rightSection}>
        <a href="#" className={styles.docsLink}>
          Docs
        </a>

        <button className={styles.notificationBtn} aria-label="Notifications">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 2a6 6 0 0 0-6 6v3l-1.5 2.5h15L16 11V8a6 6 0 0 0-6-6ZM8.5 17a1.5 1.5 0 0 0 3 0"
              stroke="#213F7D"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div className={styles.userProfile}>
          <div className={styles.avatarWrapper}>
            <img
              src="/avatar.png"
              alt="User avatar"
              className={styles.avatar}
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/avatar-placeholder.svg';
              }}
            />
          </div>
          <span className={styles.userName}>Adedeji</span>
          <svg
            width="10"
            height="6"
            viewBox="0 0 10 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={styles.dropdownIcon}
          >
            <path
              d="M1 1l4 4 4-4"
              stroke="#213F7D"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;