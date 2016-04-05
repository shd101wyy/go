### 围棋
- 文件结构
  ```
    www/* 网页
       /images      用到的图片
       /js          javascript 代码
       /less        less 代码
       /lib         一些 lib 例如 jquery
       index.html

    server.js       服务器代码
    /schema         数据库 schema        
  ```

- 搭建项目环境
  ```sh
    npm install
  ```
  在全局安装 babel, less, browserify
  ```sh
    npm install -g babel babel-cli less browserify
  ```
- 编译代码
  ```sh
    ./build.sh
  ```
