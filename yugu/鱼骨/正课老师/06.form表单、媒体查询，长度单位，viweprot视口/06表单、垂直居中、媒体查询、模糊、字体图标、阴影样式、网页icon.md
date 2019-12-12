### 行内垂直居中

```css
vertical-align：top| middle| bottom
```

行内垂直居中 top middle bottom，参照父元素里面的文本(基线)标签 。



## form表单（重点）

https://www.runoob.com/tags/att-input-autocomplete.html菜鸟表单教程。

##### 用于向服务器提交数据的，action属性表示元素，数据提交的位置(服务器地址)  “#”表示刷新当前网页。

```html
<form action="#">
```

+ label标签 

  用于展示一段文字并且关联一个其他的元素, for属性就是用来关联的，属性值一般都是要关联的元素id,当关联成功之后点击label字体可以激活关联的元素。

+ input表单项 

  type代表当前表单的类型 text代表输入框，表单项的name属性代表服务器将来需要的字段，服务器通过name属性的值可以捕获到当前用户输入的内容， placeholder提示 ，value代表表单项的默认内容，主要也是服务器获取的。

  tips：如果对input设置display:none;value为用户密码，可以用作免密登录和免密支付功能。

```html
<label for="username">账号:</label>
<input type="text" id="username" name="" placeholder="请输入账号" value="123">
```

- radio单选

  单选，处在同一组的单选只能选择一个通过name来控制name值相同的时候会自动放入到一个组，一个组内的radio每次只能选择一个。

  ```html
  <input type="radio" name="city">
  <label for="sh">上海</label>
  <input type="radio" name="city">
  <label for="zz">郑州</label>
  <input type="radio" name="city">
  ```

+ checkbox复选框

  ```html
  <input type="checkbox">
  <label for="">土豆</label>
  <input type="checkbox">
  <label for="">西蓝花</label>
  <input type="checkbox">
  ```

+ select+option下拉列表

  ```html
  <label for="nvyou">请选择你的女朋友</label>
          <select id="nvyou">
              <option value="">迪丽热巴</option>
              <option value="">古力娜扎</option>
              <option value="">马尔扎哈</option>
          </select>
  ```



#### 表单制作

##### 		可以通过fieldset来控制表单的区域，legend设置分区域的标题，checked设置表单输入必填项目，optgroup中包裹option设置下拉框分组，select中multiple设置滚动展示。





##### 信息采集表例子

```html + css
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>信息采集表</title>
    <style>
        h1 {
            text-align: center;
        }

        .infoBox {
            margin: 5px;
        }

        #education,
        #major {
            width: 150px;
        }

        #majorLabel {
            vertical-align: top;
        }

        #feel {
            width: 100%;
            /* 不支持拖拽 */
            resize: none;
            font-size: 3vw;
            text-indent: 2em;
        }
    </style>
</head>

<body>
    <h1>信息采集表</h1>
    <form action="#">
        <!-- fieldset表单区域 可以将一个表单分为多个区域 -->
        <fieldset>
            <!-- 区域标题 -->
            <legend>基本信息</legend>
            <div class="infoBox">
                <label for="name">姓名:</label>
                <!-- checked必填 -->
                <input type="text" placeholder="请输入全名" id="name" name="username" checked>
            </div>
            <!-- 性别 -->
            <div class="infoBox">
                <span>性别:</span>
                <!-- name是供给服务器用的 id样式选择 -->
                <input type="radio" name="gender" checked id="male" value="1">
                <label for="male">男</label>
                <input type="radio" name="gender" checked id="female" value="2">
                <label for="female">女</label>
            </div>
            <!-- 爱好 -->
            <div class="infoBox">
                <label for="userId">身份证号:</label>
                <input type="text" name="userId" id="userId" checked placeholder="请输入身份证号">
                <hr>
                <span>爱好</span>
                <input type="checkbox" name="gender" id="basketball" value="1">
                <label for="basketball">篮球</label>
                <input type="checkbox" name="gender" id="sing" value="2">
                <label for="sing">唱歌</label>
                <input type="checkbox" name="gender" id="game" value="3">
                <label for="sing">游戏</label>
            </div>
        </fieldset>
        <!-- 学历和专业课程 -->
        <fieldset>
            <div class="infoBox">
                <label for="education">学历</label>
                <select name="" id="education">
                    <!-- 项目分组 optgroup分组-->
                    <optgroup label="本科以下">
                        <option value="1">初中</option>
                        <option value="2">高中</option>
                        <option value="3">大专</option>
                    </optgroup>
                    <optgroup label="本科以上">
                        <option value="4">本科</option>
                        <option value="5">硕士</option>
                        <option value="6">博士</option>
                    </optgroup>
                </select>
            </div>
            <!-- 专业 -->
            <div class="infoBox">
                <label for="major" id="majorLabel">专业课程:</label>
                <!-- multiple设置滚动展示 -->
                <select name="major" id="major" multiple>
                    <option value="1">html</option>
                    <option value="2">ios</option>
                    <option value="3">android</option>
                    <option value="4">windows</option>
                    <option value="5">bigData</option>
                </select>
            </div>
        </fieldset>
        <!-- 分区 -->
        <fieldset>
            <legend>学习感言</legend>
            <!-- 留言板 cols允许的列数 rows允许的行数-->
            <textarea name="" id="feel" cols="10" rows="5" placeholder="不能少于15个字">
            </textarea>
            <!-- submit提交 属性会自动连接form表单的action地址 -->
            <input type="submit" value="提交信息" id="submit">
            <!-- reset重置 会把当前表单重置 -->
            <input type="reset" id="reset">
        </fieldset>
    </form>
</body>

</html>
```

## 阴影样式

+ #### 元素阴影

  ```css
  box-shadow:1 2 3 4 5 6;
  box-shadow:10px 10px 5px 10px green inset;
  ```

  - 1 横向偏移量
  - 2 纵向偏移量
  - 3 模糊程度
  - 4 阴影大小
  - 5 阴影颜色
  - 6 内阴影还是外阴影

+ #### 文本阴影

  ```css
  text-shadow: 2px 2px 5px black;
  ```

  - 设置文本阴影 前四个参数和box-shadow一样,主要适用于设置文本的阴影效果和背景已达到突出文本内容的效果。

## viewport视口设置

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <!-- 支持中文 -->
    <meta charset="UTF-8">
    <!--view视口   device-width设备的宽度 
	initial-scale视口的缩放比例,1.0:维持初始的缩放比
	user-scalable=no 不允许进行两指缩放-->
    <meta name="viewport" content="width=device-width, initial-scale=1.0,user-scalable=no">
    <!-- http-equiv 当前页面加载http时要如何去配置http通信协议-->
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <!-- 配置viewport是要核心加载icon图标
    apple-touch-icon苹果的移动设备 
rel当页面被程序加载的时候会解读当前程序的具体信息-->
    <link rel="apple-touch-icon" href="imgs/icon57.png" sizes="57*57">
    <link rel="apple-touch-icon" href="imgs/icon72.png" sizes="72*72">
    <link rel="apple-touch-icon" href="imgs/icon114.png" sizes="114*114">
    <link rel="apple-touch-icon" href="imgs/icon196.png" sizes="196*196">.
    <title>viewport视口</title>
</head>
<body>
</body>
</html>
```

## 媒体查询

```html + css
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>媒体查询</title>
    <style>
        html,body{
            height: 100%;
        }
        body{
            margin: 0;
            display: flex;
        }
        section{
            /* 项目在主轴上的尺寸 */
            flex-basis: 50%;
            /* 背景不重复 */
            background-repeat: no-repeat;
            background-size: 100% 100%;
        }
        section:nth-child(1){
            background-image: url("imgs/startup750.png");
        }
        section:nth-child(2){
            background-image: url("imgs/2.jpg");
        }
        /*screen屏幕 使用媒体查询第一步选择设备
        第二步是填充媒体查询的条件  
        当屏幕宽高任意一种在 400px以下时沿用这个样式*/
        
        /*媒体查询逻辑符号and or not 其中，相当于or*/
        @media screen and (max-width: 400px),(max-height:400px)
        {
            body{
                background-color: red;
            }
        }
        /* 宽高的最大比例 */
        @media (max-aspect-ratio:1/1){
            body{
                /* 主轴的方向 */
                flex-direction: column;
            }
        }
    </style>
</head>
<body>
    <section></section>
    <section></section>
</body>
</html>
```

## 网页icon

```html
    <link rel="shortcut icon" href="imgs/icon.ico" type="image/png">
```

```html
    <link rel="icon" href="imgs/icon.ico" type="image/png">
```

###### 下面一列兼容IE

## 模糊效果

```css
filter: none | blur() | brightness() | contrast() | drop-shadow() | grayscale() | hue-			rotate() | invert() | opacity() | saturate() | sepia() | url();
```

###### **提示:** 使用空格分隔多个滤镜。

## 字体图标的使用

```html + css
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>字体图标的使用</title>
    <!-- link就是引入外部文件 可以引入样式表,,icon,... -->
    <link rel="stylesheet" href="font-awesome/css/font-awesome.css">
</head>
<body>
    <span id="icon" class="fa fa-home"></span>我的家乡
</body>
</html>
```

http://www.fontawesome.com.cn/faicons/

## 常用的长度单位

```html
<body>
    <div id="px">px,代表像素，1px相当于屏幕上一个最小的发光单元</div>
    <p id="em">em表示当前元素的父元素的字体大小</p>
    <p id="rem">rem表示根标签元素字体的大小</p>

    <!-- html5新特性 -->
    <p id="vw">1vw代表浏览器窗口宽度的1%</p>
    <p id="vh">1vw代表浏览器窗口高度的1%</p>
    <p id="cm">cm代表厘米</p>
    <p id="mm">mm代表毫米</p>
    <p id="pt">pt，磅，印刷单位</p>
</body>
```

