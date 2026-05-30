import { NavLink, useNavigate } from 'react-router-dom';
import styles from './Sidebar.module.scss';

interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
}

interface NavGroup {
  groupLabel?: string;
  items: NavItem[];
}

const iconProps = {
  width: '16',
  height: '16',
  viewBox: '0 0 16 16',
  fill: 'none',
  xmlns: 'http://www.w3.org/2000/svg',
};

const navGroups: NavGroup[] = [
  {
    items: [
      {
        label: 'Dashboard',
        path: '/dashboard',
        icon: (
          <svg {...iconProps}>
            <path
              d="M1 1h6v6H1V1zm8 0h6v6H9V1zM1 9h6v6H1V9zm8 0h6v6H9V9z"
              stroke="#213F7D"
              strokeWidth="1"
              strokeLinecap="round"
            />
          </svg>
        ),
      },
    ],
  },
  {
    groupLabel: 'CUSTOMERS',
    items: [
      {
        label: 'Users',
        path: '/dashboard/users',
        icon: (
          <svg {...iconProps}>
            <path
              d="M8 7A3 3 0 1 0 8 1a3 3 0 0 0 0 6ZM2 15s-1 0-1-1 1-4 7-4 7 3 7 4-1 1-1 1H2Z"
              stroke="#213F7D"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        ),
      },
      {
        label: 'Guarantors',
        path: '/dashboard/guarantors',
        icon: (
          <svg {...iconProps}>
            <path
              d="M11 7A3 3 0 1 0 11 1a3 3 0 0 0 0 6ZM5 7A3 3 0 1 0 5 1a3 3 0 0 0 0 6ZM1 15c0-3 2-4 4-4M15 15c0-3-2-4-4-4M8 11c3 0 5 1 5 4H3c0-3 2-4 5-4Z"
              stroke="#213F7D"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        ),
      },
      {
        label: 'Loans',
        path: '/dashboard/loans',
        icon: (
          <svg {...iconProps}>
            <path
              d="M3 3h10a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1ZM2 6h12"
              stroke="#213F7D"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        ),
      },
      {
        label: 'Decision Models',
        path: '/dashboard/decision-models',
        icon: (
          <svg {...iconProps}>
            <path
              d="M8 1v14M1 8h14"
              stroke="#213F7D"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        ),
      },
      {
        label: 'Savings',
        path: '/dashboard/savings',
        icon: (
          <svg {...iconProps}>
            <path
              d="M2 8a6 6 0 1 0 12 0A6 6 0 0 0 2 8Zm4 0h4M8 6v4"
              stroke="#213F7D"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        ),
      },
      {
        label: 'Loan Requests',
        path: '/dashboard/loan-requests',
        icon: (
          <svg {...iconProps}>
            <path
              d="M13 2H3a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1ZM5 6h6M5 9h4"
              stroke="#213F7D"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        ),
      },
      {
        label: 'Whitelist',
        path: '/dashboard/whitelist',
        icon: (
          <svg {...iconProps}>
            <path
              d="M8 1L10 6h5l-4 3 1.5 5L8 12l-4.5 3L5 10 1 7h5L8 1Z"
              stroke="#213F7D"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        ),
      },
      {
        label: 'Karma',
        path: '/dashboard/karma',
        icon: (
          <svg {...iconProps}>
            <path
              d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1Zm0 4v4l3 1.5"
              stroke="#213F7D"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        ),
      },
    ],
  },
  {
    groupLabel: 'BUSINESSES',
    items: [
      {
        label: 'Organization',
        path: '/dashboard/organization',
        icon: (
          <svg {...iconProps}>
            <path
              d="M2 14V6l6-4 6 4v8H2ZM6 14V9h4v5"
              stroke="#213F7D"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        ),
      },
      {
        label: 'Loan Products',
        path: '/dashboard/loan-products',
        icon: (
          <svg {...iconProps}>
            <path
              d="M13 2H3a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1Z"
              stroke="#213F7D"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        ),
      },
      {
        label: 'Savings Products',
        path: '/dashboard/savings-products',
        icon: (
          <svg {...iconProps}>
            <path
              d="M2 8a6 6 0 1 0 12 0A6 6 0 0 0 2 8Z"
              stroke="#213F7D"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        ),
      },
      {
        label: 'Fees and Charges',
        path: '/dashboard/fees-charges',
        icon: (
          <svg {...iconProps}>
            <path
              d="M8 1v14M4 5h6a2 2 0 0 1 0 4H4m0 0h7a2 2 0 0 1 0 4H4"
              stroke="#213F7D"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        ),
      },
      {
        label: 'Transactions',
        path: '/dashboard/transactions',
        icon: (
          <svg {...iconProps}>
            <path
              d="M2 5h12M2 8h9M2 11h6"
              stroke="#213F7D"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        ),
      },
      {
        label: 'Services',
        path: '/dashboard/services',
        icon: (
          <svg {...iconProps}>
            <path
              d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1Z"
              stroke="#213F7D"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        ),
      },
      {
        label: 'Service Account',
        path: '/dashboard/service-account',
        icon: (
          <svg {...iconProps}>
            <path
              d="M8 7A3 3 0 1 0 8 1a3 3 0 0 0 0 6ZM2 15s-1 0-1-1 1-4 7-4 7 3 7 4-1 1-1 1H2Z"
              stroke="#213F7D"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        ),
      },
      {
        label: 'Settlements',
        path: '/dashboard/settlements',
        icon: (
          <svg {...iconProps}>
            <path
              d="M2 4h12v8H2V4ZM2 7h12"
              stroke="#213F7D"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        ),
      },
      {
        label: 'Reports',
        path: '/dashboard/reports',
        icon: (
          <svg {...iconProps}>
            <path
              d="M3 2h10a1 1 0 0 1 1 1v11l-3-2-3 2-3-2-3 2V3a1 1 0 0 1 1-1Z"
              stroke="#213F7D"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        ),
      },
    ],
  },
  {
    groupLabel: 'SETTINGS',
    items: [
      {
        label: 'Preferences',
        path: '/dashboard/preferences',
        icon: (
          <svg {...iconProps}>
            <path
              d="M8 5a3 3 0 1 0 0 6 3 3 0 0 0 0-6ZM1 8h2m10 0h2M8 1v2m0 10v2"
              stroke="#213F7D"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        ),
      },
      {
        label: 'Fees and Pricing',
        path: '/dashboard/fees-pricing',
        icon: (
          <svg {...iconProps}>
            <path
              d="M8 1v14M4 5h6a2 2 0 0 1 0 4H4"
              stroke="#213F7D"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        ),
      },
      {
        label: 'Audit Logs',
        path: '/dashboard/audit-logs',
        icon: (
          <svg {...iconProps}>
            <path
              d="M3 2h10a1 1 0 0 1 1 1v11l-3-2-3 2-3-2-3 2V3a1 1 0 0 1 1-1Z"
              stroke="#213F7D"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        ),
      },
      {
        label: 'Systems Messages',
        path: '/dashboard/systems-messages',
        icon: (
          <svg {...iconProps}>
            <path
              d="M2 2h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4l-3 3V3a1 1 0 0 1 1-1Z"
              stroke="#213F7D"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        ),
      },
    ],
  },
];

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <aside className={styles.sidebar}>
      {/* Switch Organization */}
      <div className={styles.switchOrg}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M2 4h12M2 8h8M2 12h5"
            stroke="#213F7D"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
        <span>Switch Organization</span>
        <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
          <path
            d="M1 1l4 4 4-4"
            stroke="#213F7D"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Nav Groups */}
      <nav className={styles.nav}>
        {navGroups.map((group, groupIndex) => (
          <div key={groupIndex} className={styles.navGroup}>
            {group.groupLabel && (
              <p className={styles.groupLabel}>{group.groupLabel}</p>
            )}
            <ul className={styles.navList}>
              {group.items.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `${styles.navItem} ${isActive ? styles.active : ''}`
                    }
                    end={item.path === '/dashboard'}
                  >
                    <span className={styles.navIcon}>{item.icon}</span>
                    <span className={styles.navLabel}>{item.label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className={styles.footer}>
        <button className={styles.logoutBtn} onClick={handleLogout}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M6 14H3a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h3M11 11l3-3-3-3M14 8H6"
              stroke="#213F7D"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          <span>Logout</span>
        </button>
        <p className={styles.version}>v1.2.0</p>
      </div>
    </aside>
  );
};

export default Sidebar;