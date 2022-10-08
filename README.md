# element-pc

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### Scss
```
sass的语法有两个 sass(旧) scss(新)  
scss和less的语法很像(支持嵌套,支持变量)
声明变量的方式不同 less = @  scss = $  
sass和stylu的语法很像(stylu要求省略分号和花括号{})
```
### 深度选择器
```
加上scoped,可以让样式,只作用于当前组件模版(局部样式)  
默认scoped,不会像在渗透,影响到其他子组件(除了根元素)  
如果希望样式,可以向下渗透,影响到下面的子样式,就需要用到深度作用选择器(Vue提供)  
::v-deep sccss  
/deep/   less  
```