import { gql } from '@apollo/client';

export const CREATE_TRANSACTION = gql`
  mutation CreateTransaction(
    $amount: Decimal!
    $date: Date!
    $accountId: ID
    $isInternal: Boolean
    $note: String
    $retailerId: ID
  ) {
    createTransaction(
      data: {
        amount: $amount
        date: $date
        account: { set: $accountId }
        isInternal: $isInternal
        note: $note
        retailer: { set: $retailerId }
      }
    ) {
      id
    }
  }
`;

export const CREATE_TRANSACTION_WITHOUT_RETAILER = gql`
  mutation CreateTransactionWithoutRetailer(
    $amount: Decimal!
    $date: Date!
    $accountId: ID
    $isInternal: Boolean
    $note: String
  ) {
    createTransaction(
      data: {
        amount: $amount
        date: $date
        account: { set: $accountId }
        isInternal: $isInternal
        note: $note
      }
    ) {
      id
    }
  }
`;
