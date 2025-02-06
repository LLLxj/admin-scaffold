import { useRef, useEffect } from 'react';

export const UseInnerHeight = () => {

  const height = useRef<number>(0)

  useEffect(() => {

    setTableHeight()
    // 添加 resize 事件监听器
    window.addEventListener('resize', setTableHeight);

    // 组件卸载时移除监听器
    return () => {
      window.removeEventListener('resize', setTableHeight);
    };
  }, [])


  const setTableHeight = () => {
    // ref src/layouts/BasicLayout.less
    const counrHeight = window.innerHeight - 56 - 24;
    height.current = counrHeight
  }

  return {
    height: height?.current
  }
}