# HCT
* 集成N种web开发人员常用工具
* 工具离线化，不联网也能用
* 跨平台工具，支持mac、linux和windows
* 支持配置导入导出

## 获取最新版本
* 为了100%获取最新版本，建议手动打包
```sh
npm install electron-packager -g
git clone https://github.com/hisune/hisune-coder-tools.git
cd hisune-coder-tools
npm install
#for Mac OS
electron-packager ./ hct --platform=darwin --arch=x64 --asar=true
#for Windows
electron-packager ./ hct --platform=win32 --arch=x64 --asar=true
#for Linux
electron-packager ./ hct --platform=linux --arch=x64 --asar=true
```
指定版本 & 国内镜像
```
electron-packager ./ hct --platform=win32 --arch=x64 --electron-version=2.0.2 --download.mirror=https://npm.taobao.org/mirrors/electron/
```

## 包含以下工具
### 网络工具
* Shadowsocks    -> 翻墙工具
* Postman       -> 简单的Http API测试工具
* IP域名查询     -> 归属地查询、ping测试、trace路由测试、端口开放测试

### 工具函数
* 常用函数      -> 随机数、哈希、base64、url编码、时间戳与时间互转、二维码生成、中英翻译、多语言翻译
* 压缩美化      -> 提供JSON、SQL、JS（混淆）、CSS、HTML、XML的压缩美化，高亮
* 颜色选择器     -> HSB、RGB、CMY

### 手册查询
* 正则表达式     -> 正则测试、正则查询手册、常用正则
* jQuery手册     -> jQuery离线手册
* Nodejs手册     -> Nodejs在线手册
* Bootstrap手册   -> Bootstrap在线手册
* ASCII        -> ASCII码速查表
* Content Type   -> HTTP Content Type速查表
* Html转义      -> Html转义速查表
* 状态码       -> HTTP状态码速查表

### 其他工具
* Calendar      -> 日历及待办事项
* Markdown      -> Markdown编辑器
* 程序启动器     -> 程序启动器，可启动可执行文件、脚本等，可自定义图标
* 发周报       -> 发邮件，需要你填密码，如果不放心可以看源代码
* 计算器       -> 调用系统计算器程序
* CMD         -> 调用系统cmd/terminal程序

## 常用快捷键
* Ctrl + F 可搜索页面内容
* Ctrl + E 导出配置
* Ctrl + I 导入配置

## 应用截图
![](https://raw.githubusercontent.com/hisune/images/master/screen-hct.jpg)

## TODO
* 自动更新
* Calendar待办事项提示

## About Author
Code by Hisune(http://hisune.com)

## License
MIT
