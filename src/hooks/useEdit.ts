import { useState } from "react";
import { useToggle } from "ahooks";

export const useEdit = () => {
  const [id, setId] = useState<number>()
  const [open, setOpenFn] = useToggle(false)

  return {
    id,
    setId,
    open,
    setOpenFn
  }

}