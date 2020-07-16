const formidable = require('formidable');
const path = require('path');
const { Article } = require('../../model/article');

module.exports = async(req, res) => {
    // 获取客户端传递过来的id
    const id = req.query.id;

    // 处理客户端上传的post请求参数，涵盖文件上传，利用formidable模块
    // 创建表单解析对象
    const form = new formidable.IncomingForm();
    // 配置文件上传的存放位置(绝对路径)
    form.uploadDir = path.join(__dirname, '../', '../', 'public', 'uploads');
    // 保留文件的后缀名
    form.keepExtensions = true;
    // 解析表单
    form.parse(req, async(err, fields, files) => {
        // err：错误对象，if表单解析错误，err即存储错误信息，成功则为null
        // fields：对象类型，保存普通表单数据
        // files：对象类型，保存和文件上传相关的数据
        // res.send(files);

        // 更新文章信息，并保存到数据库
        await Article.updateOne({ _id: id }, {
            title: fields.title,
            cover: files.cover.path.split('public')[1],
            content: fields.content
        });

        // 重定向到文章列表页面
        res.redirect('/admin/article');
    })
}