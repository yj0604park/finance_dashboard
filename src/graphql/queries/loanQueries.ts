import { gql } from '@apollo/client';

// export const GET_LOAN_SUMMARY = gql`
//   query GetLoanSummary {
//     loanSummary {
//       totalLoanBalance
//       totalPrincipal
//       repaymentProgress
//       totalMonthlyPayment
//       averageInterestRate
//       nextPaymentDate
//       nextPaymentAmount
//     }
//   }
// `;

// export const GET_LOAN_LIST = gql`
//   query GetLoanList($filter: LoanFilterInput) {
//     loans(filter: $filter) {
//       id
//       name
//       lender
//       loanType
//       principal
//       balance
//       interestRate
//       term
//       startDate
//       endDate
//       monthlyPayment
//       status
//       repaymentProgress
//       nextPaymentDate
//       nextPaymentAmount
//       associatedAsset {
//         id
//         name
//         type
//       }
//     }
//   }
// `;

// export const GET_LOAN_DETAILS = gql`
//   query GetLoanDetails($loanId: ID!) {
//     loan(id: $loanId) {
//       id
//       name
//       lender
//       loanType
//       principal
//       balance
//       interestRate
//       term
//       startDate
//       endDate
//       monthlyPayment
//       status
//       repaymentProgress
//       paymentSchedule {
//         paymentNumber
//         date
//         amount
//         principal
//         interest
//         remainingBalance
//         status
//       }
//       additionalPayments {
//         date
//         amount
//         note
//       }
//       documents {
//         id
//         name
//         type
//         url
//         uploadDate
//       }
//       history {
//         date
//         balance
//         event
//         details
//       }
//     }
//   }
// `;

// export const GET_PAYMENT_HISTORY = gql`
//   query GetPaymentHistory($period: DateRangeInput!, $loanId: ID) {
//     loanPayments(period: $period, loanId: $loanId) {
//       totalCount
//       items {
//         id
//         loanId
//         loanName
//         date
//         amount
//         principal
//         interest
//         remainingBalance
//         type
//         status
//         notes
//       }
//     }
//   }
// `;

// export const GET_LOAN_SIMULATION = gql`
//   query GetLoanSimulation($input: LoanSimulationInput!) {
//     loanSimulation(input: $input) {
//       monthlyPayment
//       totalPayments
//       totalInterest
//       amortizationSchedule {
//         year
//         payments {
//           paymentNumber
//           date
//           amount
//           principal
//           interest
//           remainingBalance
//         }
//         yearSummary {
//           totalPayment
//           totalPrincipal
//           totalInterest
//         }
//       }
//       comparisons {
//         scenario
//         monthlyPayment
//         totalPayments
//         totalInterest
//         timeSaved
//         interestSaved
//       }
//     }
//   }
// `;

// 대출 관련 타입 정의
// (실제 서버 스키마에 맞게 조정 필요)
/*
input LoanFilterInput {
  loanTypes: [LoanType!]
  status: [LoanStatus!]
  lender: String
  minInterestRate: Float
  maxInterestRate: Float
}

input LoanSimulationInput {
  principal: Float!
  interestRate: Float!
  term: Int!
  extraPayment: Float
  paymentFrequency: PaymentFrequency!
  compoundingPeriod: CompoundingPeriod!
}

enum LoanType {
  MORTGAGE
  AUTO
  STUDENT
  PERSONAL
  BUSINESS
  CREDIT_CARD
  OTHER
}

enum LoanStatus {
  ACTIVE
  PAID_OFF
  DEFAULTED
  DEFERRED
}

enum PaymentFrequency {
  MONTHLY
  BI_WEEKLY
  WEEKLY
}

enum CompoundingPeriod {
  DAILY
  MONTHLY
  QUARTERLY
  ANNUALLY
}

input DateRangeInput {
  startDate: DateTime
  endDate: DateTime
}
*/ 