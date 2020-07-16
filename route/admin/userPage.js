// 导入用户集合构造函数
const { User, validateUser } = require('../../model/user');

module.exports = async(req, res) => {

    // 标识：表示当前访问的是用户管理页面，用来控制侧边栏用户管理和文章管理的切换
    req.app.locals.currentLink = 'user';

    // 接受客户端传递过来的当前页码
    let page = req.query.page;
    // 每页显示的数据条数, 设置为10
    let pagesize = 5;

    // 用户数据的总数
    let total = await User.countDocuments({});

    // 总页数,向上取整
    let count = Math.ceil(total / pagesize);

    // 数据开始查询的位置
    let start = (page - 1) * pagesize;

    // 获取用户数据
    let users = await User.find({}).limit(pagesize).skip(start);
    // 渲染用户列表页面模板
    res.render('admin/user', {
        users: users,
        page: page,
        count: count
    });
}