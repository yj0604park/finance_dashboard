import { gql } from '@apollo/client';

// export const GET_INVESTMENT_SUMMARY = gql`
//   query GetInvestmentSummary {
//     investmentSummary {
//       totalInvestment
//       currentValue
//       totalProfit
//       totalProfitPercentage
//       investmentsByType {
//         type
//         initialValue
//         currentValue
//         profit
//         profitPercentage
//       }
//     }
//   }
// `;

// export const GET_STOCK_INVESTMENTS = gql`
//   query GetStockInvestments {
//     stockInvestments {
//       id
//       name
//       ticker
//       quantity
//       purchasePrice
//       currentPrice
//       sector
//       profit
//       profitPercentage
//       history {
//         date
//         price
//       }
//       dividends {
//         date
//         amount
//       }
//     }
//   }
// `;

// export const GET_CRYPTO_INVESTMENTS = gql`
//   query GetCryptoInvestments {
//     cryptoInvestments {
//       id
//       name
//       ticker
//       quantity
//       purchasePrice
//       currentPrice
//       profit
//       profitPercentage
//       history {
//         date
//         price
//       }
//     }
//   }
// `;

// export const GET_REAL_ESTATE_INVESTMENTS = gql`
//   query GetRealEstateInvestments {
//     realEstateInvestments {
//       id
//       name
//       location
//       type
//       size
//       purchasePrice
//       currentValue
//       profit
//       profitPercentage
//       rentalIncome
//       expenses
//       netYield
//       history {
//         date
//         value
//       }
//     }
//   }
// `;

// export const GET_INVESTMENT_PERFORMANCE = gql`
//   query GetInvestmentPerformance($period: DateRangeInput!, $type: InvestmentType) {
//     investmentPerformance(period: $period, type: $type) {
//       periods {
//         date
//         value
//         changePercentage
//       }
//       benchmarks {
//         name
//         values {
//           date
//           value
//           changePercentage
//         }
//       }
//     }
//   }
// `;

// 투자 관련 타입 정의
// (실제 서버 스키마에 맞게 조정 필요)
/*
enum InvestmentType {
  STOCK
  BOND
  CRYPTO
  REAL_ESTATE
  ALL
}

input DateRangeInput {
  startDate: DateTime
  endDate: DateTime
}
*/ 