import { useGetBankSimpleListQuery } from '../generated/graphql';

export const useBankData = () => {
  const { data, loading, error } = useGetBankSimpleListQuery();

  const banks = data?.bankRelay.edges
    .map(edge => edge.node)
    .filter(bank => bank.balance.some(
      balance => Number(balance.value) !== 0
    )) || [];

  return {
    banks,
    loading,
    error
  };
};