
$(function(){

    //点击事件
    $("#submit").click(function(){

        var password=$("#inputPassword").val();
        var username=$("#inputUsernameEmail").val();

        if(password!="" && username!=""){
            $.ajax({
                    type : "post",
                    url : "/login",
                    data :
                        {
                            "username" : username,
                            "password" : password,
                        },
                    dataType : "text",
                    async : true,
                    success : function(u) {
                        if(u.length>0) {

                            // $("#login").submit();
                            window.location.href = "/home"
                        } else {
                            alert("您输入的用户名或密码有误");
                        }
                    }
                });
        }else{
            alert("请填写用户名或密码");
        }
    });


});

//判断是否敲击了Enter键
$(document).keyup(function(event){
    if(event.keyCode ==13){
        $("#submit").trigger("click");
    }
});