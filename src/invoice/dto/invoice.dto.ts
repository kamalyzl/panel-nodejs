export class InvoiceDetailDto {
  id: number;
  quantity: number;
  price: string;
  productId: number;
}

export class InvoiceDto {
  id: number;
  invoiceDate: string;
  totalAmount: string;
  customerId: number;
  details?: InvoiceDetailDto[];
} 