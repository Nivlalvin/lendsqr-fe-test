export interface UserProfile {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  avatar: string;
  gender: string;
  bvn: string | number;
  address: string;
  currency: string;
}

export interface UserGuarantor {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  gender: string;
  address: string;
}

export interface UserSocials {
  facebook: string;
  instagram: string;
  twitter: string;
}

export interface UserEducation {
  level: string;
  employmentStatus: string;
  sector: string;
  duration: string;
  officeEmail: string;
  monthlyIncome: [string | number, string | number];
  loanRepayment: string | number;
}

export interface User {
  id: string;
  organization: string;
  username: string;
  email: string;
  phoneNumber: string;
  dateJoined: string;
  status: 'Active' | 'Inactive' | 'Pending' | 'Blacklisted';
  profile: UserProfile;
  guarantor: UserGuarantor;
  accountBalance: string | number;
  accountNumber: string | number;
  socials: UserSocials;
  education: UserEducation;
  tier: number;
}