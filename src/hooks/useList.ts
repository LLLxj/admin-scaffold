import { useRef, useState } from 'react';
import { useToggle } from 'ahooks';
import { useLocale } from '@/hooks';

export const UseList = <P = undefined, E = undefined, S = undefined>(
  { 
    initSearchParams,
    initEditRef,
    initSearchRef,
  }: {
    initSearchParams?: P,
    initEditRef?: E,
    initSearchRef?: S
  }
) => {
  const { t } = useLocale();
  const [refreshDeps, setRefreshDepsFn] = useToggle(false);
  const currentId = useRef<string | number>('');
  const editRef = useRef(initEditRef);
  const searchRef = useRef(initSearchRef);
  const [searchParams, setSearchParams] = useState(initSearchParams);

  return {
    t,
    refreshDeps,
    setRefreshDepsFn,
    currentId,
    searchParams,
    setSearchParams,
    editRef,
    searchRef,
  }
}