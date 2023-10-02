export interface Candidate {
  id: number;
  examDate: string;  
  passed: boolean;
  firstName?: string;
  lastName?: string;
  emailAddress?: string;
  phoneNumber?: string;
  examDateId?: number; 
  paymentId?: number; 
}

