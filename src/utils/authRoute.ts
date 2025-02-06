import routerConfig from '../../config/routes'
import type { IResource, IPermission } from '@/models/type'

interface IRoute {
  path: string;
  name: string;
  component?: any;
  routes?: IRoute[];
  permissionCodes?: string[];
}

export const authRoute = (resources: IResource[] = []) => {
  const routes = routerConfig?.[0]?.routes;
  const permissionCodes: string[] = getPermissionCodes(resources);
  const validateRoutes = formatRoute(routes, permissionCodes)
  return validateRoutes;
}

export const getPermissionCodes = (resources: IResource[] = []): string[] => {
  const permissionCodes: string[] = resources?.reduce((prev: string[], cur: IResource) => {
    const resourceCode = cur?.resourceCode;
    const permissions = cur?.permissions
      ?.map((item: IPermission) => `${resourceCode}${item?.code}`) || [];
    return [
      ...prev,
      resourceCode,
      ...permissions
    ]
  }, [] as string[])
  return permissionCodes
}

const formatRoute = (initRoutes: IRoute[] = [], permissionCodes: string[]) => {
  const routes: IRoute[] = initRoutes?.reduce((prev: IRoute[], cur: IRoute) => {
    if (hasPermission(cur, permissionCodes)) {
      return [
        ...prev,
        {
          ...cur,
          routes: formatRoute(cur?.routes, permissionCodes)
        }
      ]
    }
    return prev;
  }, [] as IRoute[])
  return routes;
}

export const hasPermission = (route: IRoute, permissionCodes: string[]) => {
  if (!route?.permissionCodes?.length) {
    return true;
  } else if (route?.permissionCodes?.length) {
    return route?.permissionCodes.some(
      perm => permissionCodes?.includes(perm))
  } 
  return false
}
