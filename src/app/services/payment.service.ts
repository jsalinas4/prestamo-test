import { Injectable } from '@angular/core';
import { Payment } from '../models/payment.model';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private payments: Payment[] = [];

  registerPayment(payment: Payment) {
    this.payments.push(payment);
  }

  getPayments(): Payment[] {
    return this.payments;
  }
}
