// 导入用户集合构造函数
const { User, validateUser } = require('../../model/user');
// 导入bcrypt模块对密码进行加密
const bcrypt = require('bcrypt');

module.exports = async(req, res, next) => {
    // 接收客户端传递过来的请求参数
    const { username, email, role, state, password } = req.body;
    const id = req.query.id;

    let user = await User.findOne({ _id: id });
    // 做密码比对
    const isValid = await bcrypt.compare(password, user.password);
    if (isValid) {
        // 密码比对成功
        // 更新用户信息,不能更新密码
        await User.updateOne({ _id: id }, {
            username: username,
            email: email,
            role: role,
            state: state
        });
        // 重定向到用户列表页面
        res.redirect('/admin/user');
    } else {
        // 比对失败，触发错误处理中间件
        let obj = { path: '/admin/user-edit', message: '密码比对失败，不能进行用户信息的修改！', id: id };
        next(JSON.stringify(obj));
    }
}