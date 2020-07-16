// 引用express框架
const express = require('express');
// 创建博客管理页面路由
const admin = express.Router()


// 挂载二级路由
// 渲染登录页面
admin.get('/login', require('./admin/loginPage'));

// 实现登录功能
admin.post('/login', require('./admin/login'))

// 用户列表页面
admin.get('/user', require('./admin/userPage'));

// 实现退出功能
admin.get('/logout', require('./admin/logout'))

// 新增用户页面
admin.get('/user-edit', require('./admin/user-edit'))

// 新增用户
admin.post('/user-edit', require('./admin/user-edit-fn'))

// 修改用户
admin.post('/user-modify', require('./admin/user-modify'))

// 删除用户
admin.get('/delete', require('./admin/user-delete'))

// 文章列表页面
admin.get('/article', require('./admin/article'));

// 渲染文章编辑页面
admin.get('/article-edit', require('./admin/article-edit'));

// 文章编辑
admin.post('/article-edit', require('./admin/article-edit-fn'));

// 添加文章
admin.post('/article-add', require('./admin/article-add'));

// 删除文章
admin.get('/delete-article', require('./admin/article-delete'))

// 暴露路由对象，为路由匹配一级请求路径
module.exports = admin;