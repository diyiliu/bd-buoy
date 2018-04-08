<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>海洋浮球监控平台</title>
    <link rel="shortcut icon" href="/static/image/minus.png" >
    <link rel="stylesheet" type="text/css" href="/static/css/login.css">
    <script type="text/javascript" src="/webjars/jquery/3.2.1/jquery.min.js"></script>
    <script type="text/javascript" src="/static/js/login.js"></script>
    <script type="text/javascript" src="/static/js/base.js"></script>

</head>
<body>
<!-- 背景 -->
<div class="login-bg">
    <img src="/static/image/login.png">
</div>
<div class="wrap login-wrap">

    <!-- 登录box -->
    <div class="login-container">
        <!-- 名称 -->
        <div class="login-hd">
        </div>

        <!-- 输入框 -->
        <div class="login-account">

            <form  action="#" method="post"  id="login">
                <div class="form-group">
                    <div class="login-ico login-u"></div>
                    <input type="text" id="inputUsernameEmail" class="form-control login-u" name="username" placeholder="用户名">
                </div>
                <div class="form-group">
                    <div class="login-ico login-p"></div>
                    <input type="password" id="inputPassword" class="form-control login-p" name="password" placeholder="密码">
                </div>
            </form>
            <div class="form-group">
                <button class="btn-login  right" type="button" id="submit">登 录</button>
            </div>
        </div>
    </div>
    <!-- 登录box结束 -->
    <!-- 底部 -->
    <div class="login-footer">
        <h6>
            天泽信息
        </h6>
    </div>
</div>
</body>
</html>