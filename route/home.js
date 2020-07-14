// 引用express框架
const express = require('express');
// 创建博客展示页面路由
const home = express.Router()

// 挂载二级路由
home.get('/', (req, res) => {
    res.send('欢迎来到博客首页')
});

// 暴露路由对象，为路由匹配一级请求路径
module.exports = home;