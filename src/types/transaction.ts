export interface TransactionCreationData {
  amount?: number | null;
  date: string;
  accountId: string | number;
  isInternal: boolean;
  note: string;
  retailerId?: string | number;
  id?: number;
}

export interface RetailerSelectionProps {
  id: string | number;
  name?: string;
}

export type RetailerSelectionPropsOrNull = RetailerSelectionProps | null;

export type TransactionFilter = 'all' | 'internal' | 'external'; 