<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>海洋浮球监控平台</title>
    <link rel="shortcut icon" href="/static/image/minus.png">
    <link rel="stylesheet" type="text/css" href="/webjars/bootstrap/3.3.7/css/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="/webjars/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" type="text/css" href="/static/font/css/ionicons.min.css">
    <link rel="stylesheet" type="text/css" href="/static/plugin/jvectormap/jquery-jvectormap-1.2.2.css">
    <link rel="stylesheet" type="text/css" href="/static/plugin/iCheck/minimal/_all.css">
    <link rel="stylesheet" type="text/css" href="/static/css/base.css">
    <!-- DataTables -->
    <link rel="stylesheet" type="text/css" type="text/css" href="/static/plugin/datatables/dataTables.bootstrap.css">
    <link rel="stylesheet" type="text/css" type="text/css" href="/static/plugin/daterangepicker/daterangepicker.css">
    <link rel="stylesheet" type="text/css" type="text/css" href="/static/plugin/select2/select2.min.css">
    <link rel="stylesheet" type="text/css" href="/static/css/AdminLTE.min.css">
    <link rel="stylesheet" type="text/css" href="/static/css/skins/_all-skins.min.css">
    <link rel="stylesheet" type="text/css" href="/webjars/bootstrap-slider/9.10.0/dist/css/bootstrap-slider.css">
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
    <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
    <link rel="stylesheet" type="text/css" href="http://cache.amap.com/lbs/static/main1119.css"/>
</head>
<body class="hold-transition skin-blue sidebar-mini  fixed">
<div class="wrapper">
    <!-- 头部导航条 -->
    <header class="main-header">
        <!-- Logo -->
        <a class="logo">
            <!-- 收起时的logo -->
            <span class="logo-mini"><img src="/static/image/car_hd1.png"></span>
            <!-- 正常情况的logo -->
            <span class="logo-lg"><img id="loginimgId" src="/static/image/ico_hd2.png"></span>
        </a>
        <!-- 头部导航栏 -->
        <nav class="navbar navbar-static-top">
            <!-- 头部左侧切换按钮-->
            <a href="javascript:;" class="sidebar-toggle big-sidebar-toggle"
               data-toggle="offcanvas" role="button"> </a> <!-- 头部右侧功能区 -->
            <div class="navbar-custom-menu">
                <!-- 头部右侧功能区列表 -->
                <ul class="nav navbar-nav">

                    <!-- 个人中心 -->
                    <li class="dropdown user user-menu tasks-menu">
                        <!-- 个人中心在导航栏的图标 --> <a href="javascript:;" class="dropdown-toggle"
                                                data-toggle="dropdown"> <img src="/static/image/user2-160x160.jpg"
                                                                             class="user-image" alt="User Image">
                        <span class="hidden-xs">${Session.us.username}</span>
                        <input type="hidden" name="username" value="${Session.us.username }">
                    </a> <!-- 个人中心的下拉菜单 -->
                        <ul id="userCenter" class="dropdown-menu">
                            <!-- 个人中心底部功能按钮 -->
                            <li class="user-footer">
                                <div class="pull-right">
                                    <a href="login.do" class="btn btn-default btn-flat">退出登录</a>
                                </div>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </nav>
    </header>
    <!-- 左侧功能区 -->
    <aside class="main-sidebar">
        <section class="sidebar">
            <!-- 左侧 车辆 功能 按钮 -->
            <div class="function-btn-box">
                <ul>
                    <!-- 左侧 车辆按钮 -->
                    <li>
                        <button id="car-btn" class="function-main-btn  bg-yellow text-black">浮标列表</button>
                    </li>
                    <!-- 左侧功能 按钮 -->
                    <li>
                        <button id="function-btn" class="function-main-btn">功能列表</button>
                    </li>
                </ul>
            </div>

            <!-- /.search form --> <!-- 侧边菜单 -->
            <div class=" car-mian-list">
                <ul class="sidebar-menu">
                    <li class="header">浮标列表</li>
                    <!-- 机构名称 -->

                    <li class="treeview">
                        <a>
                            <i class="fa fa-cubes"></i>
                            <span>浮球列表</span>
                            <span class="pull-right-container">
							<i class="fa fa-angle-left pull-right"></i>
							</span>
                        </a>

                        <ul class="treeview-menu">
                              <#list buoys as static>
                                  <li class="jgvehicle">
                                      <a id="jgvehicle"><i class="fa fa-anchor text-green"></i>${static.name}</a>
                                  </li>
                              </#list>
                        </ul>
                    </li>

                    <li class="active treeview">
                        <a>
                            <i class="fa fa-cubes"></i>
                            <span>假人列表</span>
                            <span class="pull-right-container">
							<i class="fa fa-angle-left pull-right"></i>
							</span>
                        </a>

                        <ul class="treeview-menu">
                             <#list dummys as static>
                                 <li class="jgvehicle">
                                     <a id="jgvehicle"><i class="fa fa-anchor text-green"></i>${static.name}</a>
                                 </li>
                             </#list>
                        </ul>
                    </li>

                </ul>
            </div>
            <!-- 功能列表 -->
            <div class=" function-main-list hide">
                <ul class="sidebar-menu  ">
                    <li class="header">功能列表</li>
                    <!-- 功能列表的菜单 -->
                    <li class="active treeview">
                        <!-- 车辆管理 -->
                        <a>
                            <i class="fa fa-th"></i> <span>功能</span>
                            <span class="pull-right-container">
                            <i class="fa fa-angle-left pull-right"></i>
                        </span>
                        </a>
                        <!-- 功能的子菜单-->
                        <ul id="carMon" class="treeview-menu">
                            <li>
                                <a id="clzt"><i class="fa fa-circle-o"></i> 历史数据</a>
                            </li>
                            <li>
                                <a class="lsgj"><i class="fa fa-circle-o"></i> 历史轨迹</a>
                            </li>
                            <!-- <li>
                                <a id="ycsz"><i class="fa fa-circle-o"></i> 远程设置</a>
                            </li> -->
                        </ul>
                    </li>

                </ul>
            </div>
        </section> <!-- /.sidebar -->
    </aside>

    <!-- 主体 -->
    <div class="content-wrapper">
        <section class="content-header ">
            <div class="pages-control btn-group color-change" id="returnBtn">
                <button class="htBtn"><i class="fa fa-arrow-circle-left btnTxt"></i><span>后退</span></button>
            </div>
        </section>
        <!-- 主体的标题 -->
        <div class="homecontext">
            <!--主体的内容 -->
            <section class="content">

                <!-- 主要内容 -->
                <div class="row">
                    <div class="col-md-12">
                        <!-- 地图 -->
                        <div class="box box-success">

                            <div class="box-header with-border">
                                <i class="ion ion-clipboard"></i>
                                <h3 class="box-title">首页</h3>
                            </div>


                            <div class="box-body no-padding">
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="pad">
                                            <!-- Map 地图-->
                                            <div id="mapdiv" style="height: 600px;"></div>
                                        </div>
                                    </div>
                                    <!--状态栏， 默认首页显示的信息 -->
                                    <div class="col-md-3 map-right-box">
                                        <!-- 点击单个车辆显示的信息 默认隐藏，点击是上面的状态栏隐藏 -->
                                        <div class="car-messageBox hide">
                                            <div class="box-pane-right" style="min-height: 280px">
                                                <div class="box right-box">
                                                    <!-- 头部标题，车牌号 -->
                                                    <div class="box-header">
                                                        <h4 class="box-title" id="xxxxcph"></h4>
                                                        <input type="hidden" id="hideId">
                                                        <input type="hidden" id="hideId2">
                                                        <input type="hidden" id="hidetime" name="hidetime">
                                                        <input type="hidden" id="hidetime2" name="hidetime2">
                                                    </div>
                                                    <!-- 车辆信息 -->
                                                    <div class="car-box-table">
                                                        <table id="carMes"
                                                               class="table table-bordered table-hover">
                                                            <tbody>
                                                            <tr>
                                                                <td><i class="fa fa-id-card text-primary"></i>浮标编号</td>
                                                                <td id="fbbh">无数据</td>
                                                            </tr>
                                                            <!--
                                                            <tr>
                                                                <td><i class="fa fa-ticket text-primary"></i>海水速度</td>
                                                                <td id="hssd">无数据</td>
                                                            </tr> -->
                                                            <tr>
                                                                <td><i class="fa fa-map-marker text-primary"></i>定位状态
                                                                </td>
                                                                <td id="dwzt">无数据</td>
                                                            </tr>

                                                            <tr>
                                                                <td><i class="fa fa-map-marker text-primary"></i>GPS经度
                                                                </td>
                                                                <td id="gpsjd">无数据</td>
                                                            </tr>
                                                            <tr>
                                                                <td><i class="fa fa-map-marker text-primary"></i>GPS纬度
                                                                </td>
                                                                <td id="gpswd">无数据</td>
                                                            </tr>
                                                            <tr class="hide" id="bdjdhide">
                                                                <td><i class="fa fa-map-marker text-primary"></i>北斗经度
                                                                </td>
                                                                <td id="bdjd">无数据</td>
                                                            </tr>
                                                            <tr class="hide" id="bdwdhide">
                                                                <td><i class="fa fa-map-marker text-primary"></i>北斗纬度
                                                                </td>
                                                                <td id="bdwd">无数据</td>
                                                            </tr>
                                                            <tr>
                                                                <td><i class="fa fa-map-marker text-primary"></i>海水温度
                                                                </td>
                                                                <td id="hswd">无数据</td>
                                                            </tr>
                                                            <tr>
                                                                <td><i class="fa fa-map-marker text-primary"></i>电压</td>
                                                                <td id="sydy">无数据</td>
                                                            </tr>
                                                            <tr>
                                                                <td><i class="ion ion-ios-stopwatch text-primary"></i>采集时间
                                                                </td>
                                                                <td id="cjsj">无数据</td>
                                                            </tr>

                                                            </tbody>
                                                        </table>
                                                    </div>
                                                    <!-- 车辆的按钮 -->
                                                    <ul>
                                                        <li><a>
                                                            <button type="button"
                                                                    class="btn btn-block btn-info btn-flat btn-lg lsgj">
                                                                历史轨迹
                                                            </button>
                                                        </a></li>
                                                        <li><a>
                                                            <button type="button"
                                                                    class="btn btn-block btn-primary btn-flat btn-lg clzt">
                                                                历史数据
                                                            </button>
                                                        </a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
        <div class="jsppage"></div>
    </div>
    <!-- 底部版权等信息 -->
    <footer class="main-footer">
        <div class="pull-right hidden-xs">
            <b>版本</b> 1.0
        </div>
        <strong>版权所有 &copy; <a href="">徐州浦嘉科技</a>.
        </strong> 版权所有
    </footer>
</div>
<!-- ./wrapper -->
<script src="/webjars/jquery/3.2.1/jquery.min.js"></script>
<script src="/webjars/bootstrap/3.3.7/js/bootstrap.min.js"></script>
<script src="/static/js/app.min.js"></script>
<script src="/static/plugin/fastclick/fastclick.js"></script>
<script src="/static/plugin/sparkline/jquery.sparkline.min.js"></script>

<!-- InputMask -->
<script src="/static/plugin/input-mask/jquery.inputmask.js"></script>
<script src="/static/plugin/input-mask/jquery.inputmask.date.extensions.js"></script>
<script src="/static/plugin/input-mask/jquery.inputmask.extensions.js"></script>
<script src="/static/plugin/jvectormap/jquery-jvectormap-1.2.2.min.js"></script>
<script src="/static/plugin/jvectormap/jquery-jvectormap-world-mill-en.js"></script>
<script src="/static/plugin/slimScroll/jquery.slimscroll.min.js"></script>
<!-- date-range-picker -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.11.2/moment.min.js"></script>
<!-- Select2 -->
<script src="/static/plugin/select2/select2.full.min.js"></script>

<!-- iCheck 1.0.1 -->
<script src="/static/plugin/iCheck/icheck.min.js"></script>
<script src="/static/plugin/datatables/jquery.dataTables.min.js"></script>
<script src="/static/plugin/datatables/dataTables.bootstrap.min.js"></script>
<script src="/static/plugin/daterangepicker/daterangepicker.js"></script>

<!-- bootstrap datepicker -->
<script src="/webjars/bootstrap-datepicker/1.7.1/js/bootstrap-datepicker.js"></script>
<!-- bootstrap time picker -->
<script src="/webjars/bootstrap-timepicker/0.5.2/js/bootstrap-timepicker.js"></script>

<script src="/static/js/echarts.min.js"></script>
<script src="/static/js/ecStat.min.js"></script>

<script src="/static/js/home.js"></script>
<script src="/static/js/demo.js"></script>


<!-- 地图 -->
<script src="http://webapi.amap.com/maps?v=1.4.3&key=45826d0c97c0872c83e45f2852b05c74"></script>
<!-- <script type="text/javascript"src="http://cache.amap.com/lbs/static/addToolbar.js"></script> -->

<script type="text/javascript">

    $('#hidetime').daterangepicker({
        howDropdowns: true,
        timePicker: true, //是否显示小时和分钟
        timePicker24Hour: true,
        timePickerIncrement: 60, //的增量，单位为分钟
        timePickerSeconds: true,
        linkedCalendars: true,
        locale: {
            format: 'YYYY-MM-DD HH:mm:ss',
            applyLabel: '确定',
            cancelLabel: '取消',
            fromLabel: '起始时间',
            toLabel: '结束时间',
            customRangeLabel: '自定义',
            daysOfWeek: ['日', '一', '二', '三', '四', '五', '六'],
            monthNames: ['一月', '二月', '三月', '四月', '五月', '六月',
                '七月', '八月', '九月', '十月', '十一月', '十二月'],

            firstDay: 1
        }
    });

    $('#hidetime2').daterangepicker({
        howDropdowns: true,
        timePicker: true, //是否显示小时和分钟
        timePicker24Hour: true,
        timePickerIncrement: 60, //的增量，单位为分钟
        timePickerSeconds: true,
        linkedCalendars: true,
        locale: {
            format: 'YYYY-MM-DD HH:mm:ss',
            applyLabel: '确定',
            cancelLabel: '取消',
            fromLabel: '起始时间',
            toLabel: '结束时间',
            customRangeLabel: '自定义',
            daysOfWeek: ['日', '一', '二', '三', '四', '五', '六'],
            monthNames: ['一月', '二月', '三月', '四月', '五月', '六月',
                '七月', '八月', '九月', '十月', '十一月', '十二月'],

            firstDay: 1
        }
    });


    $(".pages-control button").mouseover(function () {
        $(this).children("span").css({
            "display": "block"
        })
    });

    $(".pages-control button").mouseout(function () {
        $(this).children("span").css({
            "display": "none"
        })
    })


    //设置列表查询 开始

    // 删选不区分大小写
    jQuery.expr[':'].contains = function (a, i, m) {
        return jQuery(a).text().toUpperCase().indexOf(m[3].toUpperCase()) >= 0;
    };

    // 输入框函数
    $("#car-search").on('input propertychange',
            function () {
                var result = $(this).val();
                if (result !== "") {
                    $(".car-mian-list .treeview-menu li").stop().hide() //将li都隐藏
                            .filter(":contains('" + ($(this).val()) + "')").show(); //，将符合条件的筛选出来
                } else {
                    $(".car-mian-list .treeview-menu li").stop().show();
                }
            });
    //设置列表查询 结束


    //首页地图
    var map = new AMap.Map("mapdiv", {
        resizeEnable: true,
        zoom: 6,
        mapStyle: 'amap://styles/69a2fc8368aae0bd84a6eb8be8e38cd4'
    });

    AMap.plugin(['AMap.ToolBar', 'AMap.Scale'], function () {
        map.addControl(new AMap.ToolBar());
        map.addControl(new AMap.Scale());
    });


    var data = new Array();
    var b;

    $(".jgvehicle").click(
            function () {
                clearInterval(b);
                $("#hideId1").val(0);
                $("#hideId2").val(-1);
                $(".home-car-state").addClass("hide");
                $(".car-messageBox").removeClass("hide");
                $(".homecontext").removeClass("hide");
                $(".jsppage").addClass("hide");
                chep = $(this).children().text().replace(/(^\s*)|(\s*$)/g, "");
                $(".box-title").text(chep);
                maprefresh1();
                //添加定时器

            });

    function tests(str) {
        str = str.toString();
        var arr = str.split(".");
        var l = arr[1].length;
        var a = 6 - l;
        if (a > 0 && a != 0) {
            for (var i = 0; i < a; i++) {
                str += "0";
            }
        }
        return str;
    }


    function maprefresh1() {

        $.ajax({
            type: "post",
            url: "buoy/queryBuoy",
            data: {
                "fbmc": chep
            },
            dataType: "json",
            async: true,
            success: function (L) {
                var vec = L[1][0];
                $("#fbbh").text(L[0][0]);
                $("#hideId").val(L[0][1]);

                if (vec == null) {
                    //车辆暂无实时数据的时候
                    //$("#hssd").text("暂无信息");
                    $("#dwzt").text("暂无信息");
                    $("#gpsjd").text("暂无信息");
                    $("#gpswd").text("暂无信息");

                    if (L[0][0] == "PG382633" || L[0][0] == "PG382636" || L[0][0] == "PG382642") {
                        $("#bdjd").text("暂无信息");
                        $("#bdwd").text("暂无信息");
                    } else {
                        $("#bdjdhide").addClass("hide");
                        $("#bdwdhide").addClass("hide");
                    }

                    $("#hswd").text("暂无信息");
                    $("#sydy").text("暂无信息");
                    $("#cjsj").text("暂无信息");
                } else {
                    //$("#hssd").text(vec.sea_speed + " m/h");
                    //当无效定位的时候
                    if (vec.gpsLocation == 0) {
                        $("#dwzt").text("有效定位");
                    } else {
                        $("#dwzt").text("无效定位");
                    }


                    if (L[0][0] == "PG382633" || L[0][0] == "PG382636" || L[0][0] == "PG382642" || L[0][0] == "PG372034") {

                        $("#bdjdhide").removeClass("hide");
                        $("#bdwdhide").removeClass("hide");

                        if (vec.bdLng == 0) {
                            $("#bdjd").text("无定位");
                        } else {
                            $("#bdjd").text(tests(vec.bdLng));
                        }

                        if (vec.bdLat == 0) {
                            $("#bdwd").text("无定位");
                        } else {
                            $("#bdwd").text(tests(vec.bdLat));
                        }

                    } else {
                        $("#bdjdhide").addClass("hide");
                        $("#bdwdhide").addClass("hide");
                    }


                    if (vec.gpsLng == 0.015498) {
                        $("#gpsjd").text("无定位");
                    } else if (vec.gpsLng == "0") {
                        $("#gpsjd").text(vec.gpsLng);
                    } else {
                        $("#gpsjd").text(tests(vec.gpsLng));
                    }

                    if (vec.gpsLat == 0.002728) {
                        $("#gpswd").text("无定位");
                    } else if (vec.gpsLat == "0") {
                        $("#gpswd").text(vec.gpsLat);
                    } else {
                        $("#gpswd").text(tests(vec.gpsLat));
                    }

                    if (vec.temp == null) {
                        $("#hswd").text("无数据");
                    } else if (vec.temp == 555.35) {
                        $("#hswd").text("无效");
                    } else if (vec.temp > 160) {
                        $("#hswd").text("异常");
                    } else {
                        $("#hswd").text(vec.temp + " ℃");
                    }


                    if (vec.voltage == 255) {
                        $("#sydy").text("无效数据");
                    } else {
                        $("#sydy").text(vec.voltage + " mv");
                    }

                    $("#cjsj").text(vec.gpsTime);


                    //map.cleanOverlays();
                    //map.clear();
                    //map.removeOverlay();
                    /* var data =new Array() ;
                    for(var i=0;i<data.length;i++){

                             map.remove(data[i]);
                    } */
                    map.clearMap();//清除前面的marker


                    var url = "static/image/ff.png";
                    for (var i = 0, marker; i < L[1].length; i++) {
                        vec = L[1][i];
                        //加载图标

                        if (vec.gpsLng != 0 || vec.gpsLat != 0) {

                            var marker = new AMap.Marker({
                                position: [vec.gpsLng, vec.gpsLat],
                                icon: url,
                                map: map
                            });

                            marker.content = "<span style='font-size:15px;color:black;'>浮标编号：" + L[0][0] + "</span><br/>" +
                                    "<span style='font-size:15px;color:black;'>海水温度：" + vec.temp + "&nbsp;&nbsp;℃" + "</span><br/>" +
                                    "<span style='font-size:15px;color:black;'>电&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;压：" + vec.voltage + "&nbsp;&nbsp;mv" + "</span><br/>" +
                                    "<span style='font-size:15px;color:black;'>采集时间：" + vec.gpsTime + "</span>";

                            marker.on('click', markerClick);

                            var a = vec.gpsLng;
                            var b = vec.gpsLat;

                        }


                    }

                    function markerClick(e) {

                        infoWindow.setContent(e.target.content);//更新点标记内容
                        infoWindow.open(map, e.target.getPosition());//更新点标记位置
                    }


                    //定位车辆位置


                    //放大地图
                    var infoWindow = new AMap.InfoWindow({
                        offset: new AMap.Pixel(0, -30)
                    });


                    //infoWindow.setContent(chep);
                    //infoWindow.open(map, [ tests(vec.gps_longitude),vec.gps_latitude ]);
                    //offset: new AMap.Pixel(-6,-13);

                    //设置中心点
                    map.setZoomAndCenter(11, [a, b]);
                }


            }
        });
    }

    map.setFitView();
</script>
<script src="/static/js/homepage.js"></script>

<!--车辆状态 -->
<script src="/static/js/clzt.js"></script>

<!--用户管理 -->
<!-- <script type="text/javascript"src="js/yhgl.js"></script> -->

<!--机构管理 -->
<script src="/static/js/jggl.js"></script>

<!--车辆管理 -->
<script src="/static/js/clgl.js"></script>

<!--历史轨迹 -->
<script src="/static/js/lsgj.js"></script>

<!-- 下发操作 -->
<!-- <script type="text/javascript" src="js/xfoperation.js"></script> -->

<!--权限 -->
<script  src="/static/js/power.js"></script>

<!--速度调节 滑块 -->
<script src="/webjars/bootstrap-slider/9.10.0/dist/bootstrap-slider.js"></script>

<!--统计 -->
<script  src="/static/js/tj.js"></script>

<!--售后 -->
<script  src="/static/js/shgl.js"></script>

<!-- 返回 -->
<script  src="/static/js/return.js"></script>
</body>
</html>