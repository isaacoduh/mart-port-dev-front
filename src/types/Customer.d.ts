export interface ICustomer {
  id?: number;
  createdAt?: Date;
  updatedAt?: Date;
  firstName?: string;
  lastName?: string;
  customerDetail?: ICustomerDetail;
}

export interface ICustomerDetail {
  id?: number;
  createdAt?: Date;
  updatedOn?: Date;
  email?: string;
  phone?: string;
  primaryAddress?: string;
  alternateAddress?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
}
