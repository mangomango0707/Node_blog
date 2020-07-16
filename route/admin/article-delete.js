const { Article } = require('../../model/article');

module.exports = async(req, res) => {
    // 获取到客户端传递过来的删除的文章id
    // res.send(req.query.id);
    // 根据id删除文章
    await Article.findOneAndDelete({ _id: req.query.id });
    // 重定向回用户列表页面
    res.redirect('/admin/article');
}