// types.ts
export interface Invoice {
    id: number;
    attributes: {
      name: string;
      senderEmail: string;
      recipientEmail: string;
      shippingAddress: string;
      date: string;
      dueDate: string;
      invoiceNote: string;
      description: string;
      qty: number;
      rate: number;
      total: number;
    };
  }
  