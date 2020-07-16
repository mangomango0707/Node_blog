// 渲染添加用户页面

// 导入用户集合构造函数
const { User } = require('../../model/user');
module.exports = async(req, res) => {

    // 标识：表示当前访问的是用户管理页面，用来控制侧边栏用户管理和文章管理的切换
    req.app.locals.currentLink = 'user';

    // 获取修改用户的id和错误信息
    const { message, id } = req.query;
    if (id) {
        // 修改操作
        // 查询用户信息
        let user = await User.findOne({ _id: id });

        res.render('admin/user-edit', {
            message: message,
            user: user,
            link: `/admin/user-modify?id=` + id,
            button: '修改'
        });
    } else {
        // 添加操作
        res.render('admin/user-edit', {
            message: message,
            link: '/admin/user-edit',
            button: '添加'
        });
    }

}