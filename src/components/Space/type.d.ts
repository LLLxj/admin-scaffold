import type { SpaceProps } from 'antd';

export interface ICommonSpaceProps extends SpaceProps {
  children: JSX.Element[] | JSX.Element | string | undefined;
}