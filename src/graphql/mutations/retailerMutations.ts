import { gql } from '@apollo/client';

export const CREATE_RETAILER = gql`
  mutation CreateRetailer(
    $name: String!
    $type: RetailerType!
    $category: TransactionCategory!
  ) {
    createRetailer(data: { name: $name, type: $type, category: $category }) {
      id
      name
      category
    }
  }
`; 