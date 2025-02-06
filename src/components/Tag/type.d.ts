import type { TagProps } from 'antd';

type ITagType = 'useful-status';

interface ICommonTagProps extends TagProps {
  children: JSX.Element[] | JSX.Element | string;
}

export { ICommonTagProps, ITagType };
