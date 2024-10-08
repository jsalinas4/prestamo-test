export interface User {
  clientId: number;
  clientType: string; // Natural, Legal Entity, SME
  firstName: string;
  lastName: string;
  dniRuc: string;
  address: string;
  phone: string;
  email: string;
}