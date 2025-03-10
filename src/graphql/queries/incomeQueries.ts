import { gql } from '@apollo/client';

// export const GET_INCOME_SUMMARY = gql`
//   query GetIncomeSummary($period: DateRangeInput!) {
//     incomeSummary(period: $period) {
//       totalIncome
//       previousPeriodIncome
//       changePercentage
//       estimatedAnnualIncome
//       byCategoryBreakdown {
//         category
//         amount
//         percentage
//       }
//     }
//   }
// `;

// export const GET_INCOME_DETAILS = gql`
//   query GetIncomeDetails($period: DateRangeInput!, $filter: IncomeFilterInput) {
//     incomeDetails(period: $period, filter: $filter) {
//       totalCount
//       items {
//         id
//         source
//         amount
//         date
//         category
//         recurring
//         description
//         attachments {
//           id
//           filename
//           url
//         }
//       }
//     }
//   }
// `;

// export const GET_INCOME_TRENDS = gql`
//   query GetIncomeTrends($period: DateRangeInput!, $groupBy: TrendGroupBy!) {
//     incomeTrends(period: $period, groupBy: $groupBy) {
//       periods {
//         label
//         startDate
//         endDate
//         value
//       }
//       categories {
//         category
//         values {
//           periodLabel
//           value
//         }
//       }
//     }
//   }
// `;

// 소득 필터 및 입력 타입 정의
// (실제 서버 스키마에 맞게 조정 필요)
/*
input IncomeFilterInput {
  sources: [String!]
  categories: [IncomeCategory!]
  minAmount: Float
  maxAmount: Float
  recurring: Boolean
}

input DateRangeInput {
  startDate: DateTime
  endDate: DateTime
}

enum IncomeCategory {
  SALARY
  BUSINESS
  INVESTMENT
  RENTAL
  OTHER
}

enum TrendGroupBy {
  DAY
  WEEK
  MONTH
  QUARTER
  YEAR
}
*/ 