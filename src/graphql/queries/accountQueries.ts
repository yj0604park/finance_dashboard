import { gql } from '@apollo/client';

export const GET_ACCOUNT_NODE = gql`
query GetAccountNode($After: String!, $BankId: ID) {
  accountRelay(
    order: {name: ASC}
    filters: {bank: {id: {exact: $BankId}, name: {}}}
    first: 100
    after: $After
  ) {
    totalCount
    edges {
      node {
        amount
        name
        currency
        bank {
          id
          name
        }
        lastUpdate
        id
        isActive
        type
        firstTransaction
        lastTransaction
      }
      cursor
    }
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
  }
  bankRelay(filters: {id: {exact: $BankId}}) {
    edges {
      node {
        id
        name
      }
    }
  }
}
`;
