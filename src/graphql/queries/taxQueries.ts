import { gql } from '@apollo/client';

// export const GET_TAX_SUMMARY = gql`
//   query GetTaxSummary($taxYear: Int!) {
//     taxSummary(taxYear: $taxYear) {
//       taxYear
//       estimatedTaxes {
//         income
//         property
//         localTax
//         healthInsurance
//         nationalPension
//         total
//       }
//       paidTaxes
//       remainingTaxes
//       expectedTaxBenefit
//       taxRate
//       filingStatus
//       filingDeadline
//       daysRemaining
//     }
//   }
// `;

// export const GET_TAX_DEDUCTIONS = gql`
//   query GetTaxDeductions($taxYear: Int!) {
//     taxDeductions(taxYear: $taxYear) {
//       totalDeductions
//       deductionsByCategory {
//         id
//         category
//         amount
//         status
//         maxAllowable
//         remaining
//         items {
//           id
//           name
//           date
//           amount
//           receipt
//           notes
//           status
//         }
//       }
//     }
//   }
// `;

// export const GET_TAX_CALCULATORS = gql`
//   query GetTaxCalculators {
//     taxCalculators {
//       id
//       name
//       description
//       parameters {
//         name
//         type
//         required
//         defaultValue
//         options
//       }
//     }
//   }
// `;

// export const CALCULATE_TAX = gql`
//   query CalculateTax($calculator: ID!, $input: TaxCalculationInput!) {
//     taxCalculation(calculator: $calculator, input: $input) {
//       totalTax
//       effectiveTaxRate
//       marginalTaxRate
//       brackets {
//         rate
//         min
//         max
//         taxAmount
//       }
//       deductions {
//         category
//         amount
//         eligible
//       }
//       credits {
//         name
//         amount
//       }
//       comparisonWithLastYear {
//         difference
//         percentageChange
//         reasons {
//           reason
//           impact
//         }
//       }
//       recommendations {
//         action
//         potentialSavings
//         details
//       }
//     }
//   }
// `;

// export const GET_TAX_IMPORTANT_DATES = gql`
//   query GetTaxImportantDates($taxYear: Int!) {
//     taxImportantDates(taxYear: $taxYear) {
//       id
//       name
//       date
//       status
//       description
//       reminder
//       category
//     }
//   }
// `;

// export const GET_TAX_TIPS = gql`
//   query GetTaxTips($categories: [TaxTipCategory!]) {
//     taxTips(categories: $categories) {
//       id
//       title
//       content
//       category
//       applicability
//       potentialSavings
//       references {
//         title
//         url
//       }
//     }
//   }
// `;

// 세금 관련 타입 정의
// (실제 서버 스키마에 맞게 조정 필요)
/*
input TaxCalculationInput {
  income: Float!
  filingStatus: FilingStatus!
  age: Int
  dependents: Int
  deductions: [DeductionInput!]
  credits: [CreditInput!]
  estimatedTaxesPaid: Float
}

input DeductionInput {
  category: DeductionCategory!
  amount: Float!
}

input CreditInput {
  name: String!
  amount: Float!
}

enum FilingStatus {
  SINGLE
  MARRIED_JOINT
  MARRIED_SEPARATE
  HEAD_OF_HOUSEHOLD
}

enum DeductionCategory {
  MEDICAL
  EDUCATION
  DONATION
  PENSION
  CREDIT_CARD
  INSURANCE
  OTHER
}

enum TaxTipCategory {
  INCOME
  DEDUCTION
  CREDIT
  RETIREMENT
  INVESTMENT
  PROPERTY
  BUSINESS
  ALL
}
*/ 