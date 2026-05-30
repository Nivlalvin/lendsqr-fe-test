import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/DashboardLayout/DashboardLayout';
import { useUsers } from '../../hooks/useUsers';
import { getStatusClass, formatDate } from '../../utils/statusHelpers';
import { saveUserToStorage } from '../../utils/storage';
import type { User } from '../../types/user';
import styles from './Users.module.scss';

interface StatCardProps {
  icon: string;
  label: string;
  value: string;
  iconBg: string;
}

const StatCard = ({ icon, label, value, iconBg }: StatCardProps) => (
  <div className={styles.statCard}>
    <div className={styles.statIcon} style={{ background: iconBg }}>
      <img src={icon} alt={label} />
    </div>
    <p className={styles.statLabel}>{label}</p>
    <p className={styles.statValue}>{value}</p>
  </div>
);

interface FilterValues {
  organization: string;
  username: string;
  email: string;
  date: string;
  phoneNumber: string;
  status: string;
}

interface FilterPopoverProps {
  onFilter: (filters: FilterValues) => void;
  onReset: () => void;
  onClose: () => void;
}

const FilterPopover = ({ onFilter, onReset, onClose }: FilterPopoverProps) => {
  const [filters, setFilters] = useState<FilterValues>({
    organization: '',
    username: '',
    email: '',
    date: '',
    phoneNumber: '',
    status: '',
  });

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleReset = () => {
    setFilters({
      organization: '',
      username: '',
      email: '',
      date: '',
      phoneNumber: '',
      status: '',
    });
    onReset();
  };

  return (
    <div className={styles.filterPopover} ref={ref}>
      <div className={styles.filterField}>
        <label>Organization</label>
        <select
          name="organization"
          value={filters.organization}
          onChange={handleChange}
        >
          <option value="">Select</option>
          <option value="Lendsqr">Lendsqr</option>
          <option value="Irorun">Irorun</option>
          <option value="Lendstar">Lendstar</option>
          <option value="Mkopoleo">Mkopoleo</option>
        </select>
      </div>

      <div className={styles.filterField}>
        <label>Username</label>
        <input
          type="text"
          name="username"
          placeholder="User"
          value={filters.username}
          onChange={handleChange}
        />
      </div>

      <div className={styles.filterField}>
        <label>Email</label>
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={filters.email}
          onChange={handleChange}
        />
      </div>

      <div className={styles.filterField}>
        <label>Date</label>
        <input
          type="date"
          name="date"
          value={filters.date}
          onChange={handleChange}
        />
      </div>

      <div className={styles.filterField}>
        <label>Phone Number</label>
        <input
          type="text"
          name="phoneNumber"
          placeholder="Phone Number"
          value={filters.phoneNumber}
          onChange={handleChange}
        />
      </div>

      <div className={styles.filterField}>
        <label>Status</label>
        <select
          name="status"
          value={filters.status}
          onChange={handleChange}
        >
          <option value="">Select</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
          <option value="Pending">Pending</option>
          <option value="Blacklisted">Blacklisted</option>
        </select>
      </div>

      <div className={styles.filterActions}>
        <button className={styles.resetBtn} onClick={handleReset}>
          Reset
        </button>
        <button
          className={styles.filterBtn}
          onClick={() => onFilter(filters)}
        >
          Filter
        </button>
      </div>
    </div>
  );
};

interface ContextMenuProps {
  userId: string;
  users: User[];
  onClose: () => void;
  position: { top: number; left: number };
}

const ContextMenu = ({
  userId,
  users,
  onClose,
  position,
}: ContextMenuProps) => {
  const navigate = useNavigate();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const handleViewDetails = () => {
    const user = users.find((u) => u.id === userId);
    if (user) saveUserToStorage(user);
    navigate(`/dashboard/users/${userId}`);
    onClose();
  };

  return (
    <div
      className={styles.contextMenu}
      ref={ref}
      style={{ top: position.top, left: position.left }}
    >
      <button onClick={handleViewDetails}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M8 3C4 3 1 8 1 8s3 5 7 5 7-5 7-5-3-5-7-5Z"
            stroke="#545F7D"
            strokeWidth="1.2"
          />
          <circle cx="8" cy="8" r="2" stroke="#545F7D" strokeWidth="1.2" />
        </svg>
        View Details
      </button>
      <button>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1ZM5 8h6"
            stroke="#545F7D"
            strokeWidth="1.2"
          />
        </svg>
        Blacklist User
      </button>
      <button>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1Zm-1 9.5L5 8.5l1-1 1 1 3-3 1 1-4 4Z"
            stroke="#545F7D"
            strokeWidth="1.2"
          />
        </svg>
        Activate User
      </button>
    </div>
  );
};

const Users = () => {
  const { users, loading } = useUsers();
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(100);
  const [showFilter, setShowFilter] = useState(false);
  const [contextMenu, setContextMenu] = useState<{
    userId: string;
    position: { top: number; left: number };
  } | null>(null);

  useEffect(() => {
    setFilteredUsers(users);
  }, [users]);

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentUsers = filteredUsers.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1, 2, 3, '...', totalPages - 1, totalPages);
    }
    return pages;
  };

  const handleFilter = (filters: FilterValues) => {
    const result = users.filter((user) => {
      const matchOrg = filters.organization
        ? user.organization
            .toLowerCase()
            .includes(filters.organization.toLowerCase())
        : true;
      const matchUsername = filters.username
        ? user.username
            .toLowerCase()
            .includes(filters.username.toLowerCase())
        : true;
      const matchEmail = filters.email
        ? user.email.toLowerCase().includes(filters.email.toLowerCase())
        : true;
      const matchPhone = filters.phoneNumber
        ? user.phoneNumber.includes(filters.phoneNumber)
        : true;
      const matchStatus = filters.status
        ? user.status === filters.status
        : true;

      return (
        matchOrg &&
        matchUsername &&
        matchEmail &&
        matchPhone &&
        matchStatus
      );
    });

    setFilteredUsers(result);
    setCurrentPage(1);
    setShowFilter(false);
  };

  const handleReset = () => {
    setFilteredUsers(users);
    setCurrentPage(1);
  };

  const handleContextMenu = (
    e: React.MouseEvent<HTMLButtonElement>,
    userId: string
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setContextMenu({
      userId,
      position: {
        top: rect.bottom,
        left: rect.left - 160,
      },
    });
  };

  return (
    <DashboardLayout>
      <div className={styles.usersPage}>
        <h1 className={styles.pageTitle}>Users</h1>

        <div className={styles.statsGrid}>
          <StatCard
            icon="/icons/users-icon.svg"
            iconBg="rgba(223, 24, 255, 0.1)"
            label="USERS"
            value="2,453"
          />
          <StatCard
            icon="/icons/active-users-icon.svg"
            iconBg="rgba(87, 24, 255, 0.1)"
            label="ACTIVE USERS"
            value="2,453"
          />
          <StatCard
            icon="/icons/loans-icon.svg"
            iconBg="rgba(245, 95, 68, 0.1)"
            label="USERS WITH LOANS"
            value="12,453"
          />
          <StatCard
            icon="/icons/savings-icon.svg"
            iconBg="rgba(255, 51, 102, 0.1)"
            label="USERS WITH SAVINGS"
            value="102,453"
          />
        </div>

        <div className={styles.tableWrapper}>
          {loading ? (
            <div className={styles.loading}>Loading users...</div>
          ) : (
            <>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {[
                      'ORGANIZATION',
                      'USERNAME',
                      'EMAIL',
                      'PHONE NUMBER',
                      'DATE JOINED',
                      'STATUS',
                    ].map((col) => (
                      <th key={col}>
                        <div className={styles.thContent}>
                          {col}
                          <button
                            className={styles.filterIcon}
                            onClick={() => setShowFilter(!showFilter)}
                            aria-label={`Filter by ${col}`}
                          >
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                            >
                              <path
                                d="M1 3h14M3 8h10M6 13h4"
                                stroke="#213F7D"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                              />
                            </svg>
                          </button>
                        </div>

                        {showFilter && col === 'ORGANIZATION' && (
                          <FilterPopover
                            onFilter={handleFilter}
                            onReset={handleReset}
                            onClose={() => setShowFilter(false)}
                          />
                        )}
                      </th>
                    ))}
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {currentUsers.map((user) => (
                    <tr key={user.id}>
                      <td>{user.organization}</td>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                      <td>{user.phoneNumber}</td>
                      <td>{formatDate(user.dateJoined)}</td>
                      <td>
                        <span
                          className={`${styles.statusBadge} ${
                            styles[getStatusClass(user.status)]
                          }`}
                        >
                          {user.status}
                        </span>
                      </td>
                      <td>
                        <button
                          className={styles.menuBtn}
                          onClick={(e) => handleContextMenu(e, user.id)}
                          aria-label="More options"
                        >
                          <svg
                            width="4"
                            height="18"
                            viewBox="0 0 4 18"
                            fill="none"
                          >
                            <circle cx="2" cy="2" r="2" fill="#545F7D" />
                            <circle cx="2" cy="9" r="2" fill="#545F7D" />
                            <circle cx="2" cy="16" r="2" fill="#545F7D" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {contextMenu && (
                <ContextMenu
                  userId={contextMenu.userId}
                  users={filteredUsers}
                  position={contextMenu.position}
                  onClose={() => setContextMenu(null)}
                />
              )}

              <div className={styles.pagination}>
                <div className={styles.paginationLeft}>
                  <span>Showing</span>
                  <select
                    value={itemsPerPage}
                    onChange={(e) => {
                      setItemsPerPage(Number(e.target.value));
                      setCurrentPage(1);
                    }}
                    className={styles.perPageSelect}
                  >
                    {[10, 20, 50, 100].map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                  <span>out of {filteredUsers.length}</span>
                </div>

                <div className={styles.paginationRight}>
                  <button
                    className={styles.pageBtn}
                    onClick={() =>
                      setCurrentPage((p) => Math.max(p - 1, 1))
                    }
                    disabled={currentPage === 1}
                    aria-label="Previous page"
                  >
                    &#8249;
                  </button>

                  {getPageNumbers().map((page, index) =>
                    page === '...' ? (
                      <span
                        key={`ellipsis-${index}`}
                        className={styles.ellipsis}
                      >
                        ...
                      </span>
                    ) : (
                      <button
                        key={page}
                        className={`${styles.pageBtn} ${
                          currentPage === page ? styles.activePage : ''
                        }`}
                        onClick={() => setCurrentPage(Number(page))}
                      >
                        {page}
                      </button>
                    )
                  )}

                  <button
                    className={styles.pageBtn}
                    onClick={() =>
                      setCurrentPage((p) => Math.min(p + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    aria-label="Next page"
                  >
                    &#8250;
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Users;