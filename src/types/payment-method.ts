export enum PaymentMethod {
  SEPA = 'SEPA',
  STRIPE = 'STRIPE',
  BANK_TRANSFER = 'BANK_TRANSFER',
}

export const PaymentMethodFormatter = {
  [PaymentMethod.SEPA]: 'SEPA',
  [PaymentMethod.STRIPE]: 'Stripe',
  [PaymentMethod.BANK_TRANSFER]: 'Virement bancaire',
};
