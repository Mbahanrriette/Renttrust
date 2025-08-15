export interface Agreement {
  id: string;
  tenantAddress: string;
  landlordAddress: string;
  monthlyRent: number;
  securityDeposit: number;
  leaseStartDate: string;
  leaseDuration: number;
  status: 'active' | 'pending' | 'terminated';
}

export interface Review {
  id: string;
  reviewer: string;
  reviewee: string;
  rating: number;
  comment: string;
  timestamp: string;
}

export interface Reputation {
  score: number;
  totalReviews: number;
  positivePercent: number;
}


