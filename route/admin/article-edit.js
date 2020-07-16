const { Article } = require('../../model/article');

module.exports = async(req, res) => {

    // 标识：表示当前访问的是用户管理页面，用来控制侧边栏用户管理和文章管理的切换
    req.app.locals.currentLink = 'article';

    // 获取修改文章的id
    const { id } = req.query;
    if (id) {
        // 修改操作
        // 查询文章信息
        let article = await Article.findOne({ _id: id });
        // res.send(article);
        res.render('admin/article-edit', {
            article: article,
            link: '/admin/article-edit?id=' + id,
            button: '修改'
        });
    } else {
        // 添加操作
        res.render('admin/article-edit', {
            link: '/admin/article-add',
            button: '添加'
        });
    }
}