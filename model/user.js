// 创建用户集合
// 引入mongoose第三方模块
const mongoose = require('mongoose');
// 导入加密模块
const bcrypt = require('bcrypt');

// 创建用户集合规则
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 20
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    // admin
    // normal
    role: {
        type: String,
        required: true,
    },
    // 0 启用状态
    // 1 禁用状态
    state: {
        type: Number,
        default: 0
    }
})

// 创建集合
const User = mongoose.model('User', userSchema);

async function createUser() {
    // 利用bcrypt获取随机字符串
    const salt = await bcrypt.genSalt(10);
    // 利用bcrypt对密码进行加密
    const password = await bcrypt.hash('123456', salt);
    // 创建用户
    const user = await User.create({
        username: 'admin',
        email: 'admin@163.com',
        password: password,
        role: 'admin',
        state: 0
    });
}

// createUser();

// 将用户集合作为模块成员导出
module.exports = {
    User: User
}