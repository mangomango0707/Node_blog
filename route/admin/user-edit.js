// 渲染添加用户页面

// 导入用户集合构造函数
const { User, validateUser } = require('../../model/user');
module.exports = async(req, res) => {

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