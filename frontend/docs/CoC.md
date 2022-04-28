# 前端Code Of Conduct



## 一、整体结构



## 二、页面规范



## 三、代码规范

建议使用 Prettier插件进行代码格式化。

1. 常量、变量和一般函数(非组件)使用小驼峰命名. 例如

   ```ts
   let userId = 2333;
   const maxNameLength = 10;
   const getMax = (a: number, b: number): number => (a > b ? a : b);
   const [count, setCount] = useState(0);
   ```

   在取名时尽量使用有实际意义的单词全拼组合, 比`filePath, groupName`

   - 变量定义请使用`let`, 而不是`var`.

2. 组件(class, function)统一使用大驼峰命名. 例如

   ```ts
   class Children extends Father {
      
   }
   ```

3. 大括号

   - 为了程序的可扩展性, 即使代码块中只有一个语句, 也请添加大括号.

     ```ts
     if (recvMsg.content.indexOf('tql') != -1) {
        askForBg(recvMsg.sender);
     } else {
        ...
     }
     ```


4. 引号

   字符串建议双引号`""`

5. 分号

   `js是一门需要分号结尾的语言`;

6. tabstop

   请使用**两个空格**来缩进. 用小程序自带的编辑器里右键格式化即可。



7. 函数

   请尽量使用命名function函数

   ~~~js
   function Log(e){
   	console.log(e)
   }
   ~~~

   而不是匿名函数

   ~~~js
   (e)=>{
   	console.log(e)
   }
   ~~~




### 七、文档

**开发中建议使用jsdoc来自动化生成注释**

