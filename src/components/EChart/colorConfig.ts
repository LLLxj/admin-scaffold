import * as echarts from 'echarts/core';

// 右/下/左/上
export const primaryColor = new echarts.graphic.LinearGradient(0, 0, 0, 1, [
  {
    offset: 0,
    color: '#e30212',
  },
  {
    offset: 1,
    color: '#DB1860',
  },
]);

export const primaryColor2 = new echarts.graphic.LinearGradient(0, 0, 1, 0, [
  {
    offset: 0,
    color: '#FDC16E',
  },
  {
    offset: 1,
    color: '#FE8B44',
  },
]);

export interface colorChangeProps {
  rgbToHex: (color: string) => {
    hex: string;
    alpha: number;
  };
  hexToRgb: (
    color: string,
    opacity: number,
  ) => {
    rgba: string;
  };
  getLightColor: (
    color: string,
    level: number,
  ) => {
    hex: string;
    alpha: number;
  };
  getDarkColor: (
    color: string,
    level: number,
  ) => {
    hex: string;
    alpha: number;
  };
}
export const colorChange: colorChangeProps = {
  rgbToHex: function (val) {
    //RGB(A)颜色转换为HEX十六进制的颜色值
    let r,
      g,
      b,
      a,
      regRgba = /rgba?\((\d{1,3}),(\d{1,3}),(\d{1,3})(,([.\d]+))?\)/, //判断rgb颜色值格式的正则表达式，如rgba(255,20,10,.54)
      rsa = val.replace(/\s+/g, '').match(regRgba);
    if (!!rsa) {
      r = parseInt(rsa[1]).toString(16);
      r = r.length == 1 ? '0' + r : r;
      g = (+rsa[2]).toString(16);
      g = g.length == 1 ? '0' + g : g;
      b = (+rsa[3]).toString(16);
      b = b.length == 1 ? '0' + b : b;
      a = +(rsa[5] ? rsa[5] : 1) * 100;
      return { hex: '#' + r + g + b, alpha: Math.ceil(a) };
    } else {
      return { hex: val, alpha: 100 };
    }
  },
  hexToRgb: function (val, opacity) {
    //HEX十六进制颜色值转换为RGB(A)颜色值
    let a, b, c;
    if (/^#/g.test(val)) {
      a = val.slice(1, 3);
      b = val.slice(3, 5);
      c = val.slice(5, 7);
      return {
        rgba: `rgb${opacity ? 'a' : ''}(${parseInt(a, 16)},${parseInt(
          b,
          16,
        )},${parseInt(c, 16)}${opacity ? `,${opacity}` : ''})`,
      };
    } else {
      return { rgba: '无效值：' + val };
    }
  },
  getDarkColor: function (color: string, level: number) {
    var r = /^\#?[0-9A-Fa-f]{6}$/;
    if (!r.test(color)) {
      return color as any;
    }
    const rgb = Array.from({ length: 3 }).map((_, index) => {
      const num = color.slice(index * 2 + 1, index * 2 + 3);
      return parseInt(num, 16);
    });
    //floor 向下取整
    for (var i = 0; i < 3; i++) rgb[i] = Math.floor(rgb[i] * (1 - level));
    return colorChange.rgbToHex(`rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`);
  },
  getLightColor: function (color: string, level: number) {
    var r = /^\#?[0-9A-Fa-f]{6}$/;
    if (!r.test(color)) {
      return color as any;
    }
    const rgb = Array.from({ length: 3 }).map((_, index) => {
      const num = color.slice(index * 2 + 1, index * 2 + 3);
      return parseInt(num, 16);
    });
    for (var i = 0; i < 3; i++) {
      rgb[i] = Math.floor((255 - rgb[i]) * level + rgb[i]);
    }
    return colorChange.rgbToHex(`rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`);
  },
};
export const color1 = [
  '#e30212', 
  '#e30212e6', 
  '#e30212cc', 
  '#e30212b3', 
  '#e3021299', 
  '#e3021280',
  '#e3021266',
  '#e302124d',
  '#e3021233',
  '#e302121a',
];
export default [
  '#e30212',
  '#9C26B0',
  '#2296F3',
  '#01BCD5',
  '#039586',
  '#FCA84B',
  '#EA1F63',
  '#7DB342',
  '#4051B6',
  '#8666C2',
  '#673AB7',
  '#C74D63',
  '#70CAF8',
  '#536DFE',
  '#14648F',
  '#CDBF40',
];
