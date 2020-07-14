// 引用express框架
const express = require('express');
// 引入路径处理模块
const path = require('path');
// 引入处理post请求参数的body-parser
const bodyParser = require('body-parser');
// 导入express-session模块实现session功能
const session = require('express-session');

// 创建网站服务器
const app = express();

// 数据库连接
require('./model/connect');
// require('./model/user');

// 处理post请求参数
app.use(bodyParser.urlencoded({ extended: false }));

// 拦截请求交给session处理，配置session
app.use(session({ secret: 'secret key' }));

// 模板所在位置
app.set('views', path.join(__dirname, 'views'));
// 模板默认的后缀
app.set('view engine', 'art');
// 渲染art模板时，所使用的模板引擎
app.engine('art', require('express-art-template'));

// 开放静态资源文件(绝对路径)
app.use(express.static(path.join(__dirname, 'public')));

// 导入路由对象（引入路由模块）
const home = require('./route/home');
const admin = require('./route/admin');

// 为路由对象匹配一级请求路径
app.use('/home', home);
app.use('/admin', admin);

// 监听端口，80端口
app.listen(80);
console.log('网站服务器启动成功，请访问localhost');