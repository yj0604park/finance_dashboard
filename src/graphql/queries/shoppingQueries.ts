import { gql } from '@apollo/client';

// export const GET_WISHLIST_ITEMS = gql`
//   query GetWishlistItems($filter: WishlistFilterInput) {
//     wishlistItems(filter: $filter) {
//       id
//       name
//       price
//       originalPrice
//       discount
//       category
//       store
//       image
//       addedDate
//       priceHistory {
//         date
//         price
//       }
//       url
//       notes
//       isOnSale
//       isFavorite
//     }
//   }
// `;

// export const GET_PRICE_ALERTS = gql`
//   query GetPriceAlerts {
//     priceAlerts {
//       id
//       name
//       targetPrice
//       currentPrice
//       initialPrice
//       store
//       priceGap
//       percentToTarget
//       url
//       image
//       createdAt
//       lastChecked
//       reachedTargetCount
//       isActive
//     }
//   }
// `;

// export const GET_CART_ITEMS = gql`
//   query GetCartItems {
//     cartItems {
//       id
//       name
//       price
//       quantity
//       store
//       url
//       image
//       addedDate
//       availability
//       shippingCost
//       estimatedDelivery
//       notes
//     }
//   }
// `;

// export const GET_PURCHASE_HISTORY = gql`
//   query GetPurchaseHistory($period: DateRangeInput, $filter: PurchaseFilterInput) {
//     purchaseHistory(period: $period, filter: $filter) {
//       totalCount
//       totalAmount
//       items {
//         id
//         name
//         price
//         quantity
//         totalPrice
//         store
//         category
//         purchaseDate
//         deliveryStatus
//         image
//         orderNumber
//         receipt
//       }
//     }
//   }
// `;

// export const GET_PRODUCT_PRICE_HISTORY = gql`
//   query GetProductPriceHistory($productId: ID!, $period: DateRangeInput) {
//     productPriceHistory(productId: $productId, period: $period) {
//       product {
//         id
//         name
//         currentPrice
//         lowestPrice
//         highestPrice
//         averagePrice
//         recommendedBuyPrice
//       }
//       pricePoints {
//         date
//         price
//         store
//         isLowestPrice
//       }
//       similarProducts {
//         id
//         name
//         currentPrice
//         store
//         rating
//         url
//       }
//     }
//   }
// `;

// export const GET_PRODUCT_DETAILS = gql`
//   query GetProductDetails($productId: ID!) {
//     product(id: $productId) {
//       id
//       name
//       description
//       price
//       originalPrice
//       discount
//       category
//       subcategory
//       brand
//       model
//       store
//       url
//       image
//       rating
//       reviews {
//         rating
//         title
//         content
//         author
//         date
//       }
//       specifications {
//         name
//         value
//       }
//       availability
//       shippingOptions {
//         method
//         cost
//         estimatedDelivery
//       }
//       relatedProducts {
//         id
//         name
//         price
//         image
//         rating
//       }
//     }
//   }
// `;

// 쇼핑 관련 타입 정의
// (실제 서버 스키마에 맞게 조정 필요)
/*
input WishlistFilterInput {
  categories: [String!]
  stores: [String!]
  minDiscount: Float
  maxPrice: Float
  onSaleOnly: Boolean
  sortBy: WishlistSortOption
  sortDirection: SortDirection
}

input PurchaseFilterInput {
  categories: [String!]
  stores: [String!]
  priceRange: PriceRangeInput
  deliveryStatus: [DeliveryStatus!]
  sortBy: PurchaseSortOption
  sortDirection: SortDirection
}

input PriceRangeInput {
  min: Float
  max: Float
}

input DateRangeInput {
  startDate: DateTime
  endDate: DateTime
}

enum WishlistSortOption {
  PRICE
  DISCOUNT
  NAME
  ADDED_DATE
  STORE
}

enum PurchaseSortOption {
  PURCHASE_DATE
  PRICE
  NAME
  STORE
}

enum SortDirection {
  ASC
  DESC
}

enum DeliveryStatus {
  PENDING
  SHIPPED
  DELIVERED
  CANCELLED
  RETURNED
}
*/ 