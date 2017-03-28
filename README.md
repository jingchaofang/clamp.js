#clamp

```less
// 单行溢出打点...
.ellipsis() {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
// 多行溢出打点...
.multi-ellipsis(@line:2) {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    -webkit-line-clamp: @line;
}
```

TODO: 不支持文本包裹元素里有html代码标签包裹的子节点,这样的代码节点会被删除