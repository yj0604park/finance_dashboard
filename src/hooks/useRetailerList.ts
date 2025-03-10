import { useEffect, useMemo, useState, useCallback } from 'react';
import { useGetRetailerListQuery } from '../generated/graphql';
export interface RetailerOption {
  id: string;
  name: string;
  category: string;
}

export const useRetailerList = () => {
  const PAGE_SIZE = 100; // 한 번에 가져올 판매자 수
  const [allRetailers, setAllRetailers] = useState<RetailerOption[]>([]);
  const [hasMoreRetailers, setHasMoreRetailers] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  
  // 첫 페이지 로딩
  const { data, loading, error, refetch, fetchMore } = useGetRetailerListQuery({
    variables: { first: PAGE_SIZE },
    notifyOnNetworkStatusChange: true,
  });
  
  // 모든 판매자를 가져오는 함수 - 명시적으로 호출할 때만 실행
  const loadAllRetailers = useCallback(async () => {
    if (loading || isLoadingMore || !hasMoreRetailers) return;
    
    try {
      setIsLoadingMore(true);
      
      const result = await fetchMore({
        variables: {
          first: PAGE_SIZE,
          after: data?.retailerRelay?.pageInfo?.endCursor
        },
      });
      
      const newEdges = result.data.retailerRelay.edges || [];
      const hasNext = result.data.retailerRelay.pageInfo.hasNextPage;
      
      // 다음 페이지 여부 업데이트
      setHasMoreRetailers(hasNext);
      
      if (newEdges.length === 0) {
        setIsLoadingMore(false);
        return;
      }
      
      // 자동 로드 비활성화 - 무한 요청 방지
      // 다음 페이지가 필요할 때 loadAllRetailers를 명시적으로 호출하도록 함
      
    } catch (error) {
      console.error('Error loading retailers:', error);
      setHasMoreRetailers(false); // 에러 발생 시 더 이상 로드하지 않음
    } finally {
      setIsLoadingMore(false);
    }
  }, [data, fetchMore, hasMoreRetailers, isLoadingMore, loading]);
  
  // 초기 데이터가 로드되면 페이지 정보 업데이트 (자동 로드는 하지 않음)
  useEffect(() => {
    if (data?.retailerRelay?.pageInfo) {
      setHasMoreRetailers(data.retailerRelay.pageInfo.hasNextPage);
    }
  }, [data]);
  
  // 현재까지 로드된 모든 판매자를 저장
  useEffect(() => {
    if (data?.retailerRelay?.edges) {
      const newRetailers = data.retailerRelay.edges
        .filter((edge: any) => edge && edge.node)
        .map((edge: any) => ({
          id: String(edge.node.id),
          name: edge.node.name,
          category: edge.node.category,
        }));
      
      setAllRetailers(prev => {
        // 중복 제거
        const uniqueRetailers = [...prev];
        newRetailers.forEach((retailer: RetailerOption) => {
          if (!uniqueRetailers.some(r => r.id === retailer.id)) {
            uniqueRetailers.push(retailer);
          }
        });
        return uniqueRetailers;
      });
    }
  }, [data]);
  
  // 옵션 형태로 변환
  const retailers = useMemo(() => {
    return allRetailers.map(retailer => ({
      id: retailer.id,
      name: retailer.name,
      category: retailer.category,
      label: retailer.name, // Autocomplete 컴포넌트를 위한 label 속성
    }));
  }, [allRetailers]);
  
  return {
    retailers,
    loading: loading || isLoadingMore,
    error,
    hasMore: hasMoreRetailers,
    loadMore: loadAllRetailers,
    refetch,
    loadAllRetailers
  };
}; 