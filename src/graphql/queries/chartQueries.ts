import { gql } from '@apollo/client';

// Get last 100 amount snapshots
export const GET_AMOUNT_SNAPSHOT = gql`
  query GetAmountSnapshot($startDate: Date) {
    krwSnapshot: amountSnapshotRelay(
      order: { date: ASC }
      filters: { currency: { exact: KRW }, date: { gte: $startDate } }
      last: 100
    ) {
      edges {
        node {
          id
          amount
          currency
          date
          summary
        }
      }
    }
    usdSnapshot: amountSnapshotRelay(
      order: { date: ASC }
      filters: { currency: { exact: USD }, date: { gte: $startDate } }
      last: 100
    ) {
      edges {
        node {
          id
          amount
          currency
          date
          summary
        }
      }
    }
  }
`;

// export const GET_INCOME_VS_EXPENSE_CHART = gql`
//   query GetIncomeVsExpenseChart($period: DateRangeInput!) {
//     incomeVsExpense(period: $period) {
//       periods {
//         label
//         income
//         expense
//         netIncome
//       }
//       summary {
//         totalIncome
//         totalExpense
//         totalNetIncome
//       }
//     }
//   }
// `;

// export const GET_INCOME_SOURCES_CHART = gql`
//   query GetIncomeSourcesChart($period: DateRangeInput!) {
//     incomeSources(period: $period) {
//       category
//       amount
//       percentage
//     }
//   }
// `;

// export const GET_EXPENSE_CATEGORIES_CHART = gql`
//   query GetExpenseCategoriesChart($period: DateRangeInput!) {
//     expenseCategories(period: $period) {
//       category
//       amount
//       percentage
//     }
//   }
// `;

// export const GET_ASSET_ALLOCATION_CHART = gql`
//   query GetAssetAllocationChart {
//     assetAllocation {
//       category
//       amount
//       percentage
//       detail {
//         name
//         amount
//         percentage
//       }
//     }
//   }
// `;

// export const GET_ASSET_RETURNS_CHART = gql`
//   query GetAssetReturnsChart($period: DateRangeInput!) {
//     assetReturns(period: $period) {
//       category
//       returnPercentage
//       returnAmount
//     }
//   }
// `;

// export const GET_NET_WORTH_TREND_CHART = gql`
//   query GetNetWorthTrendChart($period: DateRangeInput!) {
//     netWorthTrend(period: $period) {
//       date
//       assets
//       liabilities
//       netWorth
//     }
//   }
// `;

// export const GET_INVESTMENT_PERFORMANCE_CHART = gql`
//   query GetInvestmentPerformanceChart($period: DateRangeInput!, $investmentTypes: [InvestmentType!]) {
//     investmentPerformance(period: $period, investmentTypes: $investmentTypes) {
//       dates {
//         date
//       }
//       series {
//         name
//         type
//         data {
//           date
//           value
//         }
//       }
//     }
//   }
// `;

// export const GET_INVESTMENT_ALLOCATION_CHART = gql`
//   query GetInvestmentAllocationChart($investmentType: InvestmentType) {
//     investmentAllocation(investmentType: $investmentType) {
//       id
//       name
//       value
//       percentage
//       children {
//         id
//         name
//         value
//         percentage
//       }
//     }
//   }
// `;

// export const GET_SECTOR_ALLOCATION_CHART = gql`
//   query GetSectorAllocationChart {
//     sectorAllocation {
//       sector
//       percentage
//       value
//     }
//   }
// `;

// export const GET_BUDGET_VS_ACTUAL_CHART = gql`
//   query GetBudgetVsActualChart($period: DateRangeInput!) {
//     budgetVsActual(period: $period) {
//       category
//       budgetAmount
//       actualAmount
//       difference
//       percentageDifference
//     }
//   }
// `;

// export const GET_MONTHLY_BUDGET_USAGE_CHART = gql`
//   query GetMonthlyBudgetUsageChart($year: Int!) {
//     monthlyBudgetUsage(year: $year) {
//       months {
//         month
//       }
//       categories {
//         category
//         usageByMonth {
//           month
//           usagePercentage
//         }
//       }
//     }
//   }
// `;

// export const GET_SAVINGS_POTENTIAL_CHART = gql`
//   query GetSavingsPotentialChart {
//     savingsPotential {
//       category
//       currentSpending
//       recommendedSpending
//       potentialSavings
//     }
//   }
// `;

// 차트 관련 타입 정의
// (실제 서버 스키마에 맞게 조정 필요)
/*
input DateRangeInput {
  startDate: DateTime
  endDate: DateTime
}

enum InvestmentType {
  STOCK
  BOND
  CRYPTO
  REAL_ESTATE
  ALL
}
*/
