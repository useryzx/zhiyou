class.row表示一行

class.col-md-8表示中型设备一行中占据8份

## 页面排版

|        class        | 作用                                                         |
| :-----------------: | ------------------------------------------------------------ |
|        .lead        | 使段落突出显示                                               |
|       .small        | 设定小文本 (设置为父文本的 85% 大小)                         |
|     .text-left      | 设定文本左对齐                                               |
|    .text-center     | 设定文本居中对齐                                             |
|     .text-right     | 设定文本右对齐                                               |
|    .text-justify    | 设定文本对齐,段落中超出屏幕部分文字自动换行                  |
|    .text-nowrap     | 段落中超出屏幕部分不换行                                     |
|   .text-lowercase   | 设定文本小写                                                 |
|   .text-uppercase   | 设定文本大写                                                 |
|  .text-capitalize   | 设定单词首字母大写                                           |
|     .initialism     | 显示在 <abbr> 元素中的文本以小号字体展示，且可以将小写字母转换为大写字母 |
| .blockquote-reverse | 设定引用右对齐                                               |
|   .list-unstyled    | 移除默认的列表样式，列表项中左对齐 ( <ul> 和 <ol> 中)。 这个类仅适用于直接子列表项 (如果需要移除嵌套的列表项，你需要在嵌套的列表中使用该样式) |
|    .list-inline     | 将所有列表项放置同一行                                       |
|   .dl-horizontal    | 该类设置了浮动和偏移，应用于 <dl> 元素和 <dt> 元素中，具体实现可以查看实例 |
|   .pre-scrollable   | 使 <pre> 元素可滚动，代码块区域最大高度为340px,一旦超出这个高度,就会在Y轴出现滚动条 |

- .text-muted：提示，使用浅**灰色（#999）**
- .text-primary：主要，使用**蓝色（#428bca）**
- .text-success：成功，使用**浅绿色(#3c763d)**
- .text-info：通知信息，使用**浅蓝色（#31708f）**
- .text-warning：警告，使用**黄色（#8a6d3b）**
- .text-danger：危险，使用**褐色（#a94442）**





## 表格类

下表样式可用于表格中：

| 类                   | 描述                                            | 实例                                                         |
| :------------------- | :---------------------------------------------- | :----------------------------------------------------------- |
| .table               | 为任意 <table> 添加基本样式 (只有横向分隔线)    | [尝试一下](https://www.runoob.com/try/try.php?filename=trybs_ref_table&) |
| .table-striped       | 在 <tbody> 内添加斑马线形式的条纹 ( IE8 不支持) | [尝试一下](https://www.runoob.com/try/try.php?filename=trybs_ref_table-striped) |
| .table-bordered      | 为所有表格的单元格添加边框                      | [尝试一下](https://www.runoob.com/try/try.php?filename=trybs_ref_table-bordered) |
| .table-hover         | 在 <tbody> 内的任一行启用鼠标悬停状态           | [尝试一下](https://www.runoob.com/try/try.php?filename=trybs_ref_table-hover) |
| .table-condensed     | 让表格更加紧凑                                  | [尝试一下](https://www.runoob.com/try/try.php?filename=trybs_ref_table-condensed) |
| *联合使用所有表格类* |                                                 | [尝试一下](https://www.runoob.com/try/try.php?filename=trybs_ref_table-all) |

### <tr>, <th> 和 <td> 类

下表的类可用于表格的行或者单元格：

| 类       | 描述                             | 实例                                                         |
| :------- | :------------------------------- | :----------------------------------------------------------- |
| .active  | 将悬停的颜色应用在行或者单元格上 | [尝试一下](https://www.runoob.com/try/try.php?filename=trybs_ref_tr_active) |
| .success | 表示成功的操作                   | [尝试一下](https://www.runoob.com/try/try.php?filename=trybs_ref_tr_success) |
| .info    | 表示信息变化的操作               | [尝试一下](https://www.runoob.com/try/try.php?filename=trybs_ref_tr_info) |
| .warning | 表示一个警告的操作               | [尝试一下](https://www.runoob.com/try/try.php?filename=trybs_ref_tr_warning) |
| .danger  | 表示一个危险的操作               | [尝试一下](https://www.runoob.com/try/try.php?filename=trybs_ref_tr_danger) |