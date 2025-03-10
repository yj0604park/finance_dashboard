import { gql } from '@apollo/client';

export const CREATE_RETAILER = gql`
  mutation CreateRetailer($name: String!, $category: TransactionCategory!) {
    createRetailer(data: { name: $name, category: $category }) {
      id
      name
      category
    }
  }
`; 