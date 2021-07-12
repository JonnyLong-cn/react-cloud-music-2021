<h1 style="color:red;font-weight:bold;text-align:center">react-cloud-music-2021</h1>

<p style="font-family:KaiTi">在线音乐播放网站，后端接口使用在线的 NodeJS</p>

<div style="font-family:KaiTi">
    <p>作者：龙征宇</p>
    <p>毕业院校：安徽大学</p>
    <p>专业：软件工程</p>
</div>

# 导入的依赖
+ react-router：React Router核心
+ react-router-dom：用于DOM绑定的React Router
+ react-router-config：静态路由配置的小助手
+ redux
+ redux-thunk
+ react-redux
+ swiper：轮播图插件
+ better-scroll：Scroll插件，让其能滚动

# 项目更新日志
+ 2021/6/9：项目初始化
+ 2021/6/11：配置路由，完成页面顶部导航栏
+ 2021/6/12：配置Redux，引入Slider
+ 2021/6/13：推荐列表，使用axios展示数据，Scroll功能有问题
+ 2021/6/15：推荐列表，解决的Scroll的问题
+ 2021/6/16：Loading效果和Redux的逻辑的编写
+ 2021/6/19：歌手列表，面包屑导航
+ 2021/6/20：dependency graph插件的配置

# 后端的启动
后台地址：[链接](https://neteasecloudmusicapi.vercel.app)

安装：
```bash
git clone git@github.com:Binaryify/NeteaseCloudMusicApi.git
npm install
```

运行：
```bash
# 正常运行
node app.js
# 更改端口运行，这里改成4000
# Windows
set PORT=4000 && node app.js
# Linux
PORT=4000 node app.js
```

# 项目关键点详细说明

项目关键点说明：[链接](./项目文档/项目关键点说明.md)

# 全局函数
## 工具函数
+ `getCount(count)`：传入count，将这个count转换成万、亿为单位
+ `debounce(func, delay)`：防抖函数。短时间内多次触发同一事件，只执行最后一次，或者只执行最开始的一次，中间的不执行。

## 请求封装
+ `getBannerRequest`：对路径`/banner`发送get请求
+ `getRecommendListRequest`：对路径`/personalized`发送get请求

# 路由
