import { defineConfig } from 'dumi';

export default defineConfig({
  title: '代码编辑器',
  outputPath: 'dist',
  publicPath: './',
  history: {
    type: 'hash'
  }
  // more config: https://d.umijs.org/config
});
