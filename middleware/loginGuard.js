const guard = (req, res, next) => {
    // 判断用户访问的是否是登录页面
    // 判断用户的登录状态：利用res.session.username判断
    if (req.url != '/login' && !req.session.username) {
        // 重定向到登录页面
        res.redirect('/admin/login');
    } else {
        // 将请求放行
        next();
    }
};

module.exports = guard;