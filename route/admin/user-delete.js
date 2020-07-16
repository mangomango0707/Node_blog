// 导入用户集合构造函数
const { User } = require('../../model/user');
module.exports = async(req, res) => {
    // 获取到客户端传递过来的删除的用户id
    // res.send(req.query.id);
    // 根据id删除用户
    await User.findOneAndDelete({ _id: req.query.id });
    // 重定向回用户列表页面
    res.redirect('/admin/user');
}