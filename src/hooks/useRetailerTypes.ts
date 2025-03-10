import { useQuery } from '@apollo/client';
import { GET_RETAILER_TYPE } from '../graphql/queries/retailerQueries';
import { useMemo } from 'react';

export interface RetailerTypeOption {
  id: string;
  name: string;
}

export const useRetailerTypes = () => {
  const { data, loading, error } = useQuery(GET_RETAILER_TYPE);
  
  const types = useMemo<RetailerTypeOption[]>(() => {
    if (!data || !data.__type || !data.__type.enumValues) {
      return [];
    }
    
    return data.__type.enumValues.map((value: any, index: number) => ({
      id: value.name,
      name: value.name
    }));
  }, [data]);
  
  return {
    types,
    loading,
    error
  };
}; 