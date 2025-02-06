// https://umijs.org/config/
import { defineConfig } from '@umijs/max';
import proxy from './proxy';
import routes from './routes';
const { REACT_APP_ENV = 'local' } = process.env;

export default defineConfig({
  access: {},
  model: {},
  antd: {
    configProvider: {}
  },
  /**
   * @name 快速热更新配置
   * @description 一个不错的热更新组件，更新时可以保留 state
   */
  fastRefresh: true,
  initialState: {},
  request: {},
  routes,
  npmClient: 'yarn',
  locale: {
    // 默认使用 src/locales/zh-CN.ts 作为多语言文件
    default: 'zh-CN',
    baseSeparator: '-',
  },
  proxy: proxy[REACT_APP_ENV as keyof typeof proxy],
});
