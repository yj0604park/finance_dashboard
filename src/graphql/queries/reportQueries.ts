import { gql } from '@apollo/client';

// export const GET_RECENT_REPORTS = gql`
//   query GetRecentReports($limit: Int!) {
//     recentReports(limit: $limit) {
//       id
//       title
//       date
//       type
//       format
//       size
//       description
//       url
//     }
//   }
// `;

// export const GET_REPORT_DETAILS = gql`
//   query GetReportDetails($reportId: ID!) {
//     report(id: $reportId) {
//       id
//       title
//       date
//       type
//       format
//       size
//       description
//       url
//       content
//       generatedBy
//       sections {
//         title
//         content
//         charts
//       }
//       relatedData {
//         key
//         value
//       }
//     }
//   }
// `;

// export const GET_SCHEDULED_REPORTS = gql`
//   query GetScheduledReports {
//     scheduledReports {
//       id
//       title
//       frequency
//       nextDate
//       recipients
//       status
//       parameters {
//         key
//         value
//       }
//     }
//   }
// `;

// export const GET_REPORT_TEMPLATES = gql`
//   query GetReportTemplates {
//     reportTemplates {
//       id
//       name
//       description
//       type
//       sections
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

// export const GENERATE_REPORT = gql`
//   query GenerateReport($input: ReportGenerationInput!) {
//     generateReport(input: $input) {
//       success
//       message
//       report {
//         id
//         title
//         date
//         type
//         format
//         size
//         description
//         url
//       }
//     }
//   }
// `;

// 보고서 관련 타입 정의
// (실제 서버 스키마에 맞게 조정 필요)
/*
input ReportGenerationInput {
  templateId: ID!
  title: String!
  format: ReportFormat!
  parameters: [ParameterInput!]
  sendEmail: Boolean
  recipients: [String!]
}

input ParameterInput {
  name: String!
  value: String!
}

enum ReportFormat {
  PDF
  EXCEL
  CSV
  HTML
}

enum ReportType {
  MONTHLY_FINANCE
  EXPENSE_ANALYSIS
  INVESTMENT_PORTFOLIO
  NET_WORTH
  TAX
  CUSTOM
}
*/ 