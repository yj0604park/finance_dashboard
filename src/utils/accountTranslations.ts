/**
 * 계좌 종류 번역을 위한 매핑 객체
 */
export const accountTypeTranslations: Record<string, string> = {
  'CHECKING_ACCOUNT': '입출금계좌',
  'SAVINGS_ACCOUNT': '예금계좌',
  'CREDIT_CARD': '신용카드',
  'STOCK': '투자계좌',
  'LOAN': '대출계좌',
  'RETIREMENT': '퇴직연금계좌',
  'INSTALLMENT_SAVING': '정기적금',
};

/**
 * 계좌 종류 코드를 한글로 번역하는 함수
 * @param accountType 계좌 종류 코드
 * @returns 번역된 계좌 종류 이름 또는 원본 코드
 */
export const translateAccountType = (accountType: string): string => {
  return accountTypeTranslations[accountType] || accountType;
}; 