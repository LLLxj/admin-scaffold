import { JSX } from "react/jsx-runtime";

export const TableHoc = (WrappedComponent: any, height: number): any => {
  // 返回一个新的组件
  return function CustomItem (props: JSX.IntrinsicAttributes) {
    return <WrappedComponent {...props} height={height} />
  };

}