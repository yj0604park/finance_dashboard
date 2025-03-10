import { gql } from '@apollo/client';

export const GET_TRANSACTION_LIST = gql`
query GetTransactionList($AccountID: ID, $After: String, $First: Int) {
  transactionRelay(
    filters: {account: {bank: {}, id: {exact: $AccountID}}}
    order: {date: DESC, amount: ASC, balance: ASC}
    after: $After
    first: $First
  ) {
    edges {
      cursor
      node {
        id
        amount
        balance
        date
        isInternal
        requiresDetail
        reviewed
        note
        type
        relatedTransaction {
          id
        }
        retailer {
          id
          name
        }
      }
    }
    totalCount
  }
  accountRelay(filters: {bank: {}, id: {exact: $AccountID}}) {
    edges {
      node {
        currency
        type
        name
        isActive
        bank {
          id
          name
        }
        amount
      }
    }
  }
}
`;

export const GET_RETAILER_CATEGORIES = gql`
  query GetTransactionCategory {
    __type(name: "TransactionCategory") {
      enumValues {
        name
      }
    }
  }
`;