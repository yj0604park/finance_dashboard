import { useState, ChangeEvent } from 'react';
import { RetailerSelectionPropsOrNull, TransactionCreationData } from '../types/transaction';
import { 
  useCreateTransactionMutation,
  useCreateTransactionWithoutRetailerMutation 
} from '../generated/graphql';

interface UseCreateTransactionProps {
  accountId: string | number;
}

export const useCreateTransaction = ({ accountId }: UseCreateTransactionProps) => {
  // 오늘 날짜를 YYYY-MM-DD 형식으로 가져오기
  const today = new Date().toISOString().split('T')[0];
  
  const [defaultTransactionCreationData, setDefaultTransactionCreationData] =
    useState<TransactionCreationData>({
      amount: null,
      date: '',
      accountId: accountId,
      isInternal: false,
      note: '',
      type: 'EXPENSE'  // 기본값을 지출로 설정
    });

  const [
    createTransaction,
    { error: mutationError, loading: mutationLoading }
  ] = useCreateTransactionMutation();

  const [
    createTransactionWithoutRetailer,
    {
      loading: mutationWithoutRetailerLoading,
      error: mutationWithoutRetailerError
    }
  ] = useCreateTransactionWithoutRetailerMutation();

  const [transactionCreationDataList, setTransactionCreationDataList] =
    useState<TransactionCreationData[]>([
      { ...defaultTransactionCreationData, id: 1 }
    ]);

  const addNewRow = () => {
    // 마지막 트랜잭션의 날짜와 retailerId 가져오기
    const lastTransaction = transactionCreationDataList[transactionCreationDataList.length - 1];
    const lastDate = lastTransaction?.date || today;
    const lastRetailerId = lastTransaction?.retailerId;

    let nextDataList = [
      ...transactionCreationDataList,
      {
        ...defaultTransactionCreationData,
        id: transactionCreationDataList.length + 1,
        date: lastDate,
        retailerId: lastRetailerId // 이전 거래와 동일한 판매자 설정
      }
    ];
    setTransactionCreationDataList(nextDataList);
  };

  const setTransactionCreationData = (id: number) => {
    return (data: TransactionCreationData) => {
      setTransactionCreationDataList(
        transactionCreationDataList.map((item) => {
          if (item.id === id) {
            return data;
          }
          return item;
        })
      );
    };
  };

  const onRetailerChange = (id: number) => {
    return (
      _e: ChangeEvent<HTMLInputElement>,
      value: RetailerSelectionPropsOrNull
    ) => {
      setTransactionCreationDataList(
        transactionCreationDataList.map((item) => {
          if (item.id === id) {
            if (!value) {
              return {
                ...item,
                retailerId: undefined
              };
            } else {
              return {
                ...item,
                retailerId: value.id
              };
            }
          }
          return item;
        })
      );
    };
  };

  const onIsInternalChange = (id: number) => {
    return (e: ChangeEvent<HTMLInputElement>) => {
      setTransactionCreationDataList(
        transactionCreationDataList.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              isInternal: e.target.checked
            };
          }
          return item;
        })
      );
    };
  };

  const submitRequest = async () => {
    const results = [];
    for (const item of transactionCreationDataList) {
      if (item.amount === null || item.date === '') {
        continue;
      }
      
      try {
        if (item.retailerId) {
          const result = await createTransaction({
            variables: {
              amount: Number(item.amount),
              date: item.date,
              accountId: String(item.accountId),
              isInternal: item.isInternal,
              note: item.note,
              retailerId: String(item.retailerId)
            }
          });
          results.push(result);
        } else {
          const result = await createTransactionWithoutRetailer({
            variables: {
              amount: Number(item.amount),
              date: item.date,
              accountId: String(item.accountId),
              isInternal: item.isInternal,
              note: item.note
            }
          });
          results.push(result);
        }
      } catch (error) {
        console.error('Error creating transaction:', error);
      }
    }
    
    return results;
  };

  const resetTransactionCreationDataList = () => {
    setTransactionCreationDataList([
      { ...defaultTransactionCreationData, id: 1 }
    ]);
  };

  const updateDefaultTransaction = (accountId: string | number, date: string) => {
    if (
      accountId === defaultTransactionCreationData.accountId &&
      date === defaultTransactionCreationData.date
    ) {
      return;
    }

    setDefaultTransactionCreationData({
      ...defaultTransactionCreationData,
      accountId: accountId,
      date: date
    });

    resetTransactionCreationDataList();

    setTransactionCreationDataList([
      {
        ...defaultTransactionCreationData,
        id: 1,
        accountId: accountId,
        date: date
      }
    ]);
  };

  return {
    transactionCreationDataList,
    resetTransactionCreationDataList,
    setTransactionCreationData,
    addNewRow,
    onRetailerChange,
    onIsInternalChange,
    submitRequest,
    mutationError,
    mutationLoading,
    updateDefaultTransaction,
    mutationWithoutRetailerError,
    mutationWithoutRetailerLoading
  };
}; 