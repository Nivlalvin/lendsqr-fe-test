import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/DashboardLayout/DashboardLayout';
import type { User } from '../../types/user';
import { getUserFromStorage } from '../../utils/storage';
import styles from './UserDetails.module.scss';

// ─── Star Rating ──────────────────────────────────────
const StarRating = ({ tier }: { tier: number }) => {
  return (
    <div className={styles.starRating}>
      {[1, 2, 3].map((star) => (
        <svg
          key={star}
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill={star <= tier ? '#E9B200' : 'none'}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 1l1.8 3.6L14 5.6l-3 2.9.7 4.1L8 10.5l-3.7 2.1.7-4.1-3-2.9 4.2-.6L8 1z"
            stroke="#E9B200"
            strokeWidth="1"
          />
        </svg>
      ))}
    </div>
  );
};

// ─── Info Item ────────────────────────────────────────
const InfoItem = ({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) => (
  <div className={styles.infoItem}>
    <p className={styles.infoLabel}>{label}</p>
    <p className={styles.infoValue}>{value || '—'}</p>
  </div>
);

// ─── Section ──────────────────────────────────────────
const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className={styles.section}>
    <h3 className={styles.sectionTitle}>{title}</h3>
    <div className={styles.sectionContent}>{children}</div>
  </div>
);

// ─── Guarantor Block ──────────────────────────────────
const GuarantorBlock = ({
  firstName,
  lastName,
  phoneNumber,
  email,
  relationship,
  isLast,
}: {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  relationship: string;
  isLast: boolean;
}) => (
  <div className={`${styles.guarantorBlock} ${isLast ? styles.lastGuarantor : ''}`}>
    <div className={styles.infoGrid}>
      <InfoItem
        label="FULL NAME"
        value={`${firstName} ${lastName}`}
      />
      <InfoItem
        label="PHONE NUMBER"
        value={phoneNumber}
      />
      <InfoItem
        label="EMAIL ADDRESS"
        value={email}
      />
      <InfoItem
        label="RELATIONSHIP"
        value={relationship}
      />
    </div>
  </div>
);

// ─── Tabs ─────────────────────────────────────────────
const TABS = [
  'General Details',
  'Documents',
  'Bank Details',
  'Loans',
  'Savings',
  'App and System',
];

// ─── Main Component ───────────────────────────────────
const UserDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState('General Details');
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!id) return;

    // Try localStorage first
    const stored = getUserFromStorage(id);
    if (stored) {
      setUser(stored);
      return;
    }

    // Fallback: load from users.json directly
    const loadFromJson = async () => {
      try {
        const data = await import('../../data/users.json');
        const found = (data.default as unknown as User[]).find(
          (u) => u.id === id
        );
        if (found) {
          setUser(found);
        } else {
          setNotFound(true);
        }
      } catch {
        setNotFound(true);
      }
    };

    loadFromJson();
  }, [id]);

  if (notFound) {
    return (
      <DashboardLayout>
        <div className={styles.notFound}>
          <p>User not found.</p>
          <button onClick={() => navigate('/dashboard/users')}>
            Back to Users
          </button>
        </div>
      </DashboardLayout>
    );
  }

  if (!user) {
    return (
      <DashboardLayout>
        <div className={styles.loading}>Loading user details...</div>
      </DashboardLayout>
    );
  }

  // ─── Derived Values ───────────────────────────────
  const guarantorRelationship =
    user.guarantor.gender === 'Female' ? 'Sister' : 'Brother';

  const formattedBalance = Number(user.accountBalance).toLocaleString(
    'en-NG',
    { minimumFractionDigits: 2 }
  );

  const formattedIncome = `₦${Number(
    user.education.monthlyIncome[0]
  ).toLocaleString()} - ₦${Number(
    user.education.monthlyIncome[1]
  ).toLocaleString()}`;

  return (
    <DashboardLayout>
      <div className={styles.userDetailsPage}>

        {/* Back Button */}
        <button
          className={styles.backBtn}
          onClick={() => navigate('/dashboard/users')}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M10 12L6 8l4-4"
              stroke="#545F7D"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Back to Users
        </button>

        {/* Page Header */}
        <div className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>User Details</h1>
          <div className={styles.headerActions}>
            <button className={styles.blacklistBtn}>BLACKLIST USER</button>
            <button className={styles.activateBtn}>ACTIVATE USER</button>
          </div>
        </div>

        {/* User Card */}
        <div className={styles.userCard}>
          <div className={styles.userCardTop}>

            {/* Avatar + Name */}
            <div className={styles.userIdentity}>
              <div className={styles.avatarWrapper}>
                {user.profile.avatar ? (
                  <img
                    src={user.profile.avatar}
                    alt={user.username}
                    className={styles.avatar}
                  />
                ) : (
                  <div className={styles.avatarPlaceholder}>
                    <svg
                      width="48"
                      height="48"
                      viewBox="0 0 48 48"
                      fill="none"
                    >
                      <circle
                        cx="24"
                        cy="20"
                        r="10"
                        stroke="#213F7D"
                        strokeWidth="2"
                      />
                      <path
                        d="M6 44c0-10 8-16 18-16s18 6 18 16"
                        stroke="#213F7D"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                )}
              </div>
              <div className={styles.userNameWrapper}>
                <h2 className={styles.userName}>{user.username}</h2>
                <p className={styles.userId}>{user.id}</p>
              </div>
            </div>

            <div className={styles.divider} />

            {/* Tier */}
            <div className={styles.tierWrapper}>
              <p className={styles.tierLabel}>User's Tier</p>
              <StarRating tier={user.tier} />
            </div>

            <div className={styles.divider} />

            {/* Balance */}
            <div className={styles.balanceWrapper}>
              <p className={styles.balance}>₦{formattedBalance}</p>
              <p className={styles.accountInfo}>
                {user.accountNumber}/Providus Bank
              </p>
            </div>
          </div>

          {/* Tabs */}
          <div className={styles.tabs} data-testid="tabs-container">
            {TABS.map((tab) => (
              <button
                key={tab}
                className={`${styles.tab} ${
                  activeTab === tab ? styles.activeTab : ''
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className={styles.tabContent}>
          {activeTab === 'General Details' && (
            <>
              {/* Personal Information */}
              <Section title="Personal Information">
                <div className={styles.infoGrid}>
                  <InfoItem
                    label="FULL NAME"
                    value={`${user.profile.firstName} ${user.profile.lastName}`}
                  />
                  <InfoItem
                    label="PHONE NUMBER"
                    value={user.profile.phoneNumber}
                  />
                  <InfoItem
                    label="EMAIL ADDRESS"
                    value={user.email}
                  />
                  <InfoItem
                    label="BVN"
                    value={user.profile.bvn}
                  />
                  <InfoItem
                    label="GENDER"
                    value={user.profile.gender}
                  />
                  <InfoItem
                    label="MARITAL STATUS"
                    value="Single"
                  />
                  <InfoItem
                    label="CHILDREN"
                    value="None"
                  />
                  <InfoItem
                    label="TYPE OF RESIDENCE"
                    value={user.profile.address}
                  />
                </div>
              </Section>

              {/* Education and Employment */}
              <Section title="Education and Employment">
                <div className={styles.infoGrid}>
                  <InfoItem
                    label="LEVEL OF EDUCATION"
                    value={user.education.level}
                  />
                  <InfoItem
                    label="EMPLOYMENT STATUS"
                    value={user.education.employmentStatus}
                  />
                  <InfoItem
                    label="SECTOR OF EMPLOYMENT"
                    value={user.education.sector}
                  />
                  <InfoItem
                    label="DURATION OF EMPLOYMENT"
                    value={user.education.duration}
                  />
                  <InfoItem
                    label="OFFICE EMAIL"
                    value={user.education.officeEmail}
                  />
                  <InfoItem
                    label="MONTHLY INCOME"
                    value={formattedIncome}
                  />
                  <InfoItem
                    label="LOAN REPAYMENT"
                    value={Number(
                      user.education.loanRepayment
                    ).toLocaleString()}
                  />
                </div>
              </Section>

              {/* Socials */}
              <Section title="Socials">
                <div className={styles.infoGrid}>
                  <InfoItem
                    label="TWITTER"
                    value={user.socials.twitter}
                  />
                  <InfoItem
                    label="FACEBOOK"
                    value={user.socials.facebook}
                  />
                  <InfoItem
                    label="INSTAGRAM"
                    value={user.socials.instagram}
                  />
                </div>
              </Section>

              {/* Guarantor — two blocks as per Figma design */}
              <Section title="Guarantor">
                <GuarantorBlock
                  firstName={user.guarantor.firstName}
                  lastName={user.guarantor.lastName}
                  phoneNumber={user.guarantor.phoneNumber}
                  email={user.email}
                  relationship={guarantorRelationship}
                  isLast={false}
                />
                <GuarantorBlock
                  firstName={user.guarantor.firstName}
                  lastName={user.guarantor.lastName}
                  phoneNumber={user.guarantor.phoneNumber}
                  email={user.email}
                  relationship={guarantorRelationship}
                  isLast={true}
                />
              </Section>
            </>
          )}

          {activeTab !== 'General Details' && (
            <div className={styles.emptyTab}>
              <p>{activeTab} content coming soon.</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UserDetails;