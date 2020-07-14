// 引用express框架
const express = require('express');
// 创建博客管理页面路由
const admin = express.Router()

// 挂载二级路由
admin.get('/login', (req, res) => {
    // 渲染登录页面模板
    res.render('admin/login');
});

// 暴露路由对象，为路由匹配一级请求路径
module.exports = admin;