import { gql } from '@apollo/client';

export const GET_RETAILER_LIST = gql`
  query GetRetailerList($first: Int, $after: String) {
    retailerRelay(first: $first, after: $after) {
      edges {
        node {
          id
          name
          category
        }
      }
      totalCount
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

export const GET_RETAILER_TYPES = gql`
  query GetRetailerType {
    __type(name: "RetailerType") {
      enumValues {
        name
      }
    }
  }
`;