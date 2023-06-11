# zero-loading

## 使用方法

导入 `uni_modules` 后直接使用即可

提供多种加载动画类型,传入 type 改变 loading 样式，不传默认 circle

### 全屏使用

```html
<zero-loading v-if="loading"></zero-loading>
```

### 局部使用

**父元素的 `position` 记得改为 `relative` 哦**

```html
<zero-loading type="pulse" position="absolute"></zero-loading>
```

## 参数说明

| 参数     | 类型    | 默认值 | 描述         |
| -------- | ------- | ------ | ------------ |
| type     | String  | atom   | 样式         |
| position | String  | fixed  | 定位方式     |
| zIndex   | Number  | 9      |              |
| mask     | Boolean | false  | 是否需要遮罩 |

### type 可选值：

| type 值  | 描述 |
| -------- | ---- |
| gear     | 齿轮 |
| sword    | 剑气 |
| atom     | 原子 |
| circle   | 圆环 |
| love     | 爱心 |
| pulse    | 脉冲 |
| sun      | 太阳 |
| eyes     | 眼睛 |
| triangle | 三角 |
| bounce   | 弹跳 |

插件预览:
![code](https://img.jszero.cn/mweb/we_code.jpg)

> 预览的小程序不一定能及时更新当前插件
