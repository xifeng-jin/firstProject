module.exports = {
  plugins: {
    autoprefixer: {
      "postcss-px-to-viewport": {
        viewportWidth: 375,//视口宽度,设计稿都是依据iPhone6(750*667/1334)
        viewportHeight: 667,//
        unitPrecision: 5,//保留小数位
        viewportUnit: 'vw',//指定需要转换成的视口单位，建议vw
        selectorBlackList: ['ignore','tab-bar','tab-bar-item'],//指定不需要转换的类
        //ignore，在需要忽视的类当中直接添加一个ignore即可
        minPixelValue: 1,//最小的转换单位
        mediaQuery: false,//允许在媒体查询中转换'px'
        exclude: [/TabBar/],//匹配包含含这些文件的内容
      }
    }
  }
};
