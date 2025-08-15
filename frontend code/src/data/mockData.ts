interface Agreement {
  id: number;
  landlord: string;
  tenant: string;
  propertyAddress: string;
  monthlyRent: number;
  status: 'active' | 'pending';
  startDate: string;
  lastPayment: string | null;
}

interface Review {
  id: number;
  reviewer: string;
  reviewee: string;
  rating: number;
  comment: string;
  date: string;
}

interface Reputation {
  [key: string]: {
    averageRating: number;
    totalRatings: number;
    role: 'landlord' | 'tenant' | 'unknown';
  };
}

interface Agreement {
  id: number;
  landlord: string;
  tenant: string;
  propertyAddress: string;
  monthlyRent: number;
  status: 'active' | 'pending' | 'terminated';
  startDate: string;
  lastPayment: string | null;
  // Add new fields
  paymentHistory: {
    date: string;
    amount: number;
    txHash: string;
  }[];
}

export const mockAgreements: Agreement[] = [
  {
     id: 1,
    landlord: '0x742a4b6e4aB8f69c7438e2B8334B6A86C52c',
    tenant: '0x8f3e4c67d5b9a120d8f9e7a6c5b4a3f2e1d0',
    propertyAddress: '123 Main Street, Toronto, ON',
    monthlyRent: 2200,
    status: 'active',
    startDate: '2024-03-01',
    lastPayment: '2024-08-01',
    paymentHistory: [
      {
        date: '2024-08-01',
        amount: 2200,
        txHash: '0x123...abc'
      }
    ]
  },
  {
    id: 2,
    landlord: '0x742a4b6e4aB8f69c7438e2B8334B6A86C52c',
    tenant: '0x8f3e4c67d5b9a120d8f9e7a6c5b4a3f2e1d0',
    propertyAddress: '456 Elm Street, Toronto, ON',
    monthlyRent: 1800,
    status: 'pending',
    startDate: '2024-05-01',
    lastPayment: null,
    paymentHistory: []
  }
];

export const mockReviews: Review[] = [
  {
    id: 1,
    reviewer: '0x8f3e4c67d5b9a120d8f9e7a6c5b4a3f2e1d0',
    reviewee: '0x742a4b6e4aB8f69c7438e2B8334B6A86C52c',
    rating: 5,
    comment: 'Excellent landlord, very responsive to maintenance requests.',
    date: '2024-07-15'
  }
];

export const mockReputation: Reputation = {
  '0x742a4b6e4aB8f69c7438e2B8334B6A86C52c': {
    averageRating: 4.2,
    totalRatings: 15,
    role: 'landlord'
  },
  '0x8f3e4c67d5b9a120d8f9e7a6c5b4a3f2e1d0': {
    averageRating: 4.7,
    totalRatings: 8,
    role: 'tenant'
  }
};