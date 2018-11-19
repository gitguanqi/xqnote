//便签添加
$(function(){
    $('form').on('submit',function(e){
        e.preventDefault();
        var nameReg = /[0-9A-Za-z]/g;
        if(getCookie('admin_cookie')) {
            var name =  JSON.parse(getCookie('admin_cookie')).username;
            var token =  JSON.parse(getCookie('admin_cookie')).token;
            $('.author').attr('value',name);
        }
        if($('#title').val() == '') {
            layer.alert('便签标题不能为空！', {
                icon: 2,
                skin: 'layer-ext-moon'
            })
            return false;
        }
        if(nameReg.test($('#title').val())) {
            layer.alert('便签标题不能为数字和字母！', {
                icon: 2,
                skin: 'layer-ext-moon'
            })
            return false;
        }
        if($('#type').val() == '') {
            layer.alert('便签分类不能为空！', {
                icon: 2,
                skin: 'layer-ext-moon'
            })
            return false;
        }
        if($('#content').val() == '') {
            layer.alert('便签内容不能为空！', {
                icon: 2,
                skin: 'layer-ext-moon'
            })
            return false;
        }
        $.ajax({
            url: '/admin/mark/add',
            type: 'post',
            data: $('form').serialize(),
            success: function (res) {
                if(res.msg == 'find_succ'){
                    layer.alert(res.data.info, {
                        icon: 1,
                        skin: 'layer-ext-moon'
                    })
                    setTimeout(function(){
                        location.href = '/admin/mark/list';
                    },2000)
                }else {
                    layer.alert(res.data.info, {
                        icon: 2,
                        skin: 'layer-ext-moon'
                    })
                }
            },
            error: function (err) {
                throw new Error(err)
            }
        })
    })
})