// 连接数据库
// 引入mongoose第三方模块
const mongoose = require('mongoose');

mongoose.set('useCreateIndex', true);

// 数据库连接
mongoose.connect('mongodb://mango:mango@localhost/blog', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('数据库连接成功'))
    .catch(() => console.log('数据库连接失败'))