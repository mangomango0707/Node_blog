// 将表单数据转化为表单对象
function serializeToJson(form) {
    // 定义一个对象来存储表单数据
    var formObj = {};
    var f = form.serializeArray();
    // console.log(f);
    f.forEach(item => {
        formObj[item.name] = item.value;
    });

    return formObj;
}