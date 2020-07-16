    // 导入集合
    const { User } = require('../../model/user');
    // 导入加密模块
    const bcrypt = require('bcrypt');

    module.exports = async(req, res) => {
        // 接收post请求参数
        const { email, password } = req.body;
        // 做二次验证
        if (email.trim().length == 0 || password.trim().length == 0) {
            return res.status(400).render('admin/error', { msg: '邮件地址或者密码错误！' });
        }

        // 根据邮箱地址查询用户信息（需要导入用户集合进行查询）
        // 数据库操作均为异步
        let user = await User.findOne({ email: email });
        // 判断是否查询到用户
        if (user) {
            // 比对客户端传递过来的密码和用户的密码
            let isValid = await bcrypt.compare(password, user.password);
            if (isValid) {
                // 将用户信息存储在session中
                req.session.username = user.username;
                // res.send('登录成功');

                // 将用户信息保存到app的local变量共全局使用
                req.app.locals.userInfo = user;
                // 重定向到用户列表页面
                res.redirect('/admin/user');
            } else {
                res.status(400).render('admin/error', { msg: '邮件地址或者密码错误！' });
            }
        } else {
            res.status(400).render('admin/error', { msg: '邮件地址或者密码错误！' });
        }
    }