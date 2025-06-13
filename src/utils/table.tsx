/**
 * @description 初始化antd table 表格宽度
 */
export const countTableCellWidth = ({
  title,
  titleCol = 0,
}: {
  title: string;
  titleCol?: number;
}) => {
  const baseWidth = 12;
  const _titleLength = titleCol || title?.length;
  const width = _titleLength * baseWidth + 32;
  return width;
};



