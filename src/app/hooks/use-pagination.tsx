import { useCallback, useState } from 'react';

export const DEFAULT_PAGINATION = { cursor: null, back: false };

export const usePagination = () => {
  const [pagination, setPagination] = useState<{
    cursor: string | null;
    back: boolean;
  }>(DEFAULT_PAGINATION);

  const paginateBack = useCallback(
    (cursor: string) => setPagination({ cursor, back: true }),
    [],
  );
  const paginateNext = useCallback(
    (cursor: string) => setPagination({ cursor, back: false }),
    [],
  );

  return {
    pagination,
    setPagination,
    resetPagination: () => setPagination(DEFAULT_PAGINATION),
    paginateBack,
    paginateNext,
  };
};
