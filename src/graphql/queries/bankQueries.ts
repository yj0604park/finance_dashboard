import { gql } from '@apollo/client';

export const GET_BANK_NODE = gql`
  query GetBankNodeWithBalance {
    bankRelay {
      edges {
        node {
          balance {
            currency
            value
          }
          id
          name
          accountSet {
            edges {
              node {
                type
                id
                currency
                amount
                lastUpdate
                name
                isActive
              }
            }
            totalCount
          }
        }
      }
    }
  }
`;

export const GET_BANK_SIMPLE_LIST = gql`
  query GetBankSimpleList {
    bankRelay {
      edges {
        node {
          id
          name
          balance {
            currency
            value
          }
          accountSet {
            totalCount
          }
        }
      }
    }
  }
`; 