import { useState, useEffect } from "react";
import { useRequest } from "./useRequest";
import ResourceService from "@/services/resource";
import type { ResourceType } from '@/services/resource/type'

export interface UseTableOptionProps {
  resource: ResourceType;
}

export const useTableOption = (
  {
    resource
  }: UseTableOptionProps
) => {

  const [columns, setColumns] = useState<any[]>([])

  const getPermissionRequest = useRequest(
    ResourceService.getResourcePermission,
    {
      manual: true,
      onSuccess: (data) => {
        console.log(data)
      }
    }
  )

  useEffect(() => {
    if (resource) {
      getPermissionRequest.run({
        resource
      })
    }
  }, [resource])

  return {
    columns,
    setColumns,
  }
}