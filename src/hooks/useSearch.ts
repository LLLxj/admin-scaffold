import { useState, useRef } from 'react';
import { useToggle } from 'ahooks';
import { useLocale } from '@/hooks';

export const useSearch = <T>(
  { 
    initSearchParams = {},
    initList = []
  }: {
    initSearchParams?: any,
    initList?: T[]
  }
) => {
  const { t } = useLocale();
  const [refreshDeps, setRefreshDepsFn] = useToggle(false);
  const [searchParams, setSearchParams] = useState(initSearchParams);
  const [list, setList] = useState(initList);
  const [pages, setPages] = useState({
    current: 1,
    pageSize: 20,
  })
  const currentId = useRef<number>();

  return {
    t,
    list,
    setList,
    refreshDeps,
    setRefreshDepsFn,
    searchParams,
    setSearchParams,
    pages,
    setPages,
    currentId,
  }
}