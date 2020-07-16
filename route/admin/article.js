const { Article } = require('../../model/article');
// 导入实现分页的mongoose-sex-page第三方模块
const pagination = require('mongoose-sex-page');

module.exports = async(req, res) => {

    // 获取当前页码
    const page = req.query.page;

    // 标识：表示当前访问的是用户管理页面，用来控制侧边栏用户管理和文章管理的切换
    req.app.locals.currentLink = 'article';

    // page：指定当前页码
    // size：指定每页显示的数据条数
    // display：指定客户端要显示的页码数量
    // exec: 向数据库中发送查询请求
    // 查询文章数据
    let articles = await pagination(Article).find().page(page).size(2).display(3).populate('author').exec();

    // res.send(articles);
    res.render('admin/article', {
        articles: articles
    });
}