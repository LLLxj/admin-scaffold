import React from 'react'
import { MoonFilled, SunFilled } from '@ant-design/icons'
import { useAntdConfig, useAntdConfigSetter } from '@umijs/max';
import { theme, Dropdown } from 'antd';
import { Row } from '@/components'
import './index.less'

type IThemeType = 'darkAlgorithm' | 'defaultAlgorithm'

const ThemePicker: React.FC = () => {

  const setAntdConfig = useAntdConfigSetter();
  const antdConfig = useAntdConfig();
  const { darkAlgorithm, defaultAlgorithm } = theme;
  const themeValue =
    Object?.keys(antdConfig.theme || {})?.find((item, index) => index === 0)
  const style = {
    fontSize: '16px'
  }

  const changeTheme = (themeType: IThemeType) => {
    if (themeType === 'darkAlgorithm') {
      setAntdConfig({
        theme: {
          algorithm: [darkAlgorithm],
        },
      });
    } else {
      setAntdConfig({
        theme: {
          algorithm: [defaultAlgorithm],
        },
      });
    }
  }

  const renderItem = (label: string, type: IThemeType) => {
    return (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="#"
        onClick={(e) => {
          e?.preventDefault()
          changeTheme(type)
        }}
      >
        { label }
      </a>
    )
  }

  const items = [
    {
      label: renderItem('深色模式', 'darkAlgorithm'),
      key: 'darkAlgorithm'
    },
    {
      label: renderItem('浅色模式', 'defaultAlgorithm'),
      key: 'defaultAlgorithm'
    },
  ]

  return (
    <Row
      align='middle'
      className='theme-container'
    >
      <Dropdown menu={{ items }}>
        {
          themeValue === 'algorithm'
            ? <SunFilled  style={style} />
            : <MoonFilled style={style} />
        }
      </Dropdown>
      
    </Row>
  );
}

export default ThemePicker