import { gql } from '@apollo/client';

// export const GET_VALIDATION_SUMMARY = gql`
//   query GetValidationSummary {
//     dataValidation {
//       errorCount
//       warningCount
//       successCount
//     }
//   }
// `;

// export const GET_VALIDATION_RESULTS = gql`
//   query GetValidationResults($filter: ValidationFilterInput) {
//     validationResults(filter: $filter) {
//       totalCount
//       items {
//         id
//         source
//         field
//         status
//         message
//         createdAt
//       }
//     }
//   }
// `;

// export const RUN_DATA_VALIDATION = gql`
//   query RunDataValidation($scope: [ValidationScope!]) {
//     runValidation(scope: $scope) {
//       success
//       message
//       validationResults {
//         id
//         source
//         field
//         status
//         message
//         createdAt
//       }
//       summary {
//         errorCount
//         warningCount
//         successCount
//       }
//     }
//   }
// `;

// 검증 스코프와 필터를 위한 입력 타입 정의
// (실제 서버 스키마에 맞게 조정 필요)
/*
input ValidationFilterInput {
  status: [ValidationStatus!]
  source: [String!]
  field: [String!]
  dateRange: DateRangeInput
}

input DateRangeInput {
  startDate: DateTime
  endDate: DateTime
}

enum ValidationStatus {
  ERROR
  WARNING
  SUCCESS
}

enum ValidationScope {
  ACCOUNT
  TRANSACTION
  INCOME
  INVESTMENT
  TAX
  ALL
}
*/ 