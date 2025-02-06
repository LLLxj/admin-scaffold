import { useToggle } from 'ahooks';


export const UseModal = () => {
  const [open, setOpenFn] = useToggle(false)

  return {
    open,
    setOpenFn,
  };
};
