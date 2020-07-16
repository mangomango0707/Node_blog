// 处理添加用户操作

// 导入用户集合构造函数
const { User, validateUser } = require('../../model/user');
// 导入bcrypt模块对密码进行加密
const bcrypt = require('bcrypt');

module.exports = async(req, res, next) => {

    try {
        await validateUser(req.body);
    } catch (error) {
        // 验证不通过
        // 重定向回添加用户页面，并把错误信息添加到请求地址req.query中
        // return res.redirect(`/admin/user-edit?message=${error.message}`);
        return next(JSON.stringify({ path: '/admin/user-edit', message: error.message }));

    }

    // 验证当前邮箱是否被注册过
    let user = await User.findOne({ email: req.body.email });
    if (user) {
        // 重定向回添加用户页面，并把错误信息添加到请求地址req.query中
        // return res.redirect(`/admin/user-edit?message=邮箱地址已经被占用了！`);
        // next只能传递一个参数， 且是字符串的， 因此需要把两个内容赋值成对象后， 转化为字符串
        return next(JSON.stringify({ path: '/admin/user-edit', message: '邮箱地址已经被占用了！' }));
    }

    // 对密码进行加密操作
    // 生成随机码
    const salt = await bcrypt.genSalt(10);
    // 进行加密
    const password = await bcrypt.hash(req.body.password, salt);
    // 替换密码
    req.body.password = password;

    // 将用户信息添加到数据库中
    await User.create(req.body);

    // 重定向到用户列表页面
    res.redirect('/admin/user');
}