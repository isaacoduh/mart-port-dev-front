import { IMaterial } from "@/types/Material";
export interface IInvoice {
  customerId: number;
  lineItems: ILineItem[];
  createdAt: Date;
  updatedAt: Date;
}
export interface ILineItem {
  material?: IMaterial;
  quantity: number;
}
