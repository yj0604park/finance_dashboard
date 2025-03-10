import { gql } from '@apollo/client';

// export const GET_ASSET_SUMMARY = gql`
//   query GetAssetSummary {
//     assetSummary {
//       totalAssets
//       totalLiabilities
//       netWorth
//       assetsByCategoryPercentage {
//         category
//         amount
//         percentage
//         icon
//       }
//       liabilitiesByCategoryPercentage {
//         category
//         amount
//         percentage
//       }
//     }
//   }
// `;

// export const GET_ASSET_DETAILS = gql`
//   query GetAssetDetails($assetType: AssetType) {
//     assetDetails(assetType: $assetType) {
//       id
//       name
//       category
//       subcategory
//       value
//       acquisitionDate
//       acquisitionValue
//       description
//       currencyCode
//       lastValuationDate
//       changePercentage
//       icon
//       details {
//         key
//         value
//       }
//     }
//   }
// `;

// export const GET_LIABILITY_DETAILS = gql`
//   query GetLiabilityDetails($liabilityType: LiabilityType) {
//     liabilityDetails(liabilityType: $liabilityType) {
//       id
//       name
//       category
//       balance
//       initialAmount
//       interestRate
//       startDate
//       endDate
//       monthlyPayment
//       lender
//       description
//       currencyCode
//     }
//   }
// `;

// export const GET_NET_WORTH_HISTORY = gql`
//   query GetNetWorthHistory($period: DateRangeInput!) {
//     netWorthHistory(period: $period) {
//       periods {
//         date
//         assets
//         liabilities
//         netWorth
//       }
//       summary {
//         startNetWorth
//         endNetWorth
//         changeAmount
//         changePercentage
//       }
//     }
//   }
// `;

// 자산 관련 타입 정의
// (실제 서버 스키마에 맞게 조정 필요)
/*
enum AssetType {
  CASH
  REAL_ESTATE
  INVESTMENT
  VEHICLE
  VALUABLE
  ALL
}

enum LiabilityType {
  MORTGAGE
  LOAN
  CREDIT_CARD
  OTHER
  ALL
}

input DateRangeInput {
  startDate: DateTime
  endDate: DateTime
}
*/ 