<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>历史数据</title>
        <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
        <style type="text/css">
            .dataTables_filter { display: none; }
            #tableid tr {cursor: pointer;}
        </style>
    </head>
<body class="hold-transition skin-blue sidebar-mini">

<!-- Main content -->
<section class="content">
    <!-- Main row -->
    <div class="row">
        <!-- Left col -->
        <div class="col-md-12">
            <!-- 车辆信息 -->
            <div class="box box-success" id="1">
                <div class="box-header with-border">
                    <i class="ion ion-clipboard"></i>
                    <h3 class="box-title">浮标信息</h3>
                    <div class="box-tools pull-right">
                    </div>
                </div>
                <!-- /.box-header -->
                <div class="box-body">
                    <div class="col-md-12">
                        <div class="col-md-2">
                            <div class="form-group">
                                <input class="form-control " type="text" value="浮标名称" readonly>
                            </div>
                        </div>
                        <form action="dcbiao.do" method="get" id="gzfx" name="gzfx">
                            <div class="col-md-2">
                                <div class="form-group">
                                    <input type="text"  name="fbmc" class="form-control" id="getfb">
                                    <input type="text"  class="hide" name="user" value="" id="fbuser">
                                </div>
                            </div>

                            <div class="col-md-4">
                                <div class="form-group">
                                    <input type="text"  class="form-control fbtime" id="reservationtime2">
                                </div>
                            </div>

                        </form>

                        <div class="col-md-1 pull-right">
                            <div class="form-group">
                                <button type="submit"  class="btn btn-primary btn-block" id="cxdc">导出</button>
                            </div>
                        </div>

                        <div class="col-md-2">
                            <div class="form-group">
                                <button  class="btn btn-primary btn-block" id="cxfb">查询</button>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-12">
                        <div class="car-state clztlb">
                            <table id="tableL" class="table table-bordered table-hover table-striped table-condensed table-first-check car-detail-table" cellspacing="0" width="100%">
                                <thead>
                                <tr>
                                    <th>
                                        <input type="checkbox" class="minimal car-s">
                                    </th>
                                    <th >浮标名称</th>
                                    <th >浮标编号</th>
                                    <!-- <th >海水速度</th> -->
                                    <th >定位状态</th>
                                    <th >经度</th>
                                    <th >纬度</th>
                                    <th >海水温度</th>
                                    <th >电压</th>
                                    <th >采集时间</th>
                                </tr>
                                </thead>
                                <tbody id ="tableid">


                                </tbody>
                            </table>
                            <div class="pageBox">
                                <ul class="pageList right">
                                    <li>总笔数：<span id="allcount">0</span></li>
                                    <li>页：<span id="currentpage">0/0</span></li>
                                    <li>总页数：<span id="allpage">0</span></li>
                                    <li><a id="uppage">上一页</a></li>
                                    <li><a id="nextpage">下一页</a></li>
                                    <li>到第<input class="baseIpt " type="text" id="selectpage"/>页</li>
                                    <li id="gopage"><button class="baseBtn blueBtn" type="button"><span class="btnTxt" >前往</span></button></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- /.row -->
</section>

</body>

<script type="text/javascript">


    $('#reservationtime2').daterangepicker({
        howDropdowns : true,
        timePicker : true, //是否显示小时和分钟
        timePicker24Hour: true,
        //timePickerIncrement : 60, //的增量，单位为分钟
        timePickerSeconds : true,
        linkedCalendars : true,
        locale : {
            format: 'YYYY-MM-DD HH:mm:ss',
            applyLabel : '确定',
            cancelLabel : '取消',
            fromLabel : '起始时间',
            toLabel : '结束时间',
            customRangeLabel : '自定义',
            daysOfWeek : [ '日', '一', '二', '三', '四', '五', '六' ],
            monthNames : [ '一月', '二月', '三月', '四月', '五月', '六月',
                '七月', '八月', '九月', '十月', '十一月', '十二月' ],

            firstDay : 1 }
    });



    var table =  $('#tableL').DataTable({
        "bPaginate" : false,
        "searching": true,
        "ordering": true,
        "info": false,
        "bLengthChange": false,
        "scrollX": true,
        "oLanguage":{
            "sProcessing":   "处理中...",
            "sLengthMenu":   "显示 _MENU_ 项结果",
            "sZeroRecords":  "没有匹配结果",
            "sInfo":         "显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项",
            "sInfoEmpty":    "显示第 0 至 0 项结果，共 0 项",
            "sInfoFiltered": "(由 _MAX_ 项结果过滤)",
            "sInfoPostFix":  "",
            "sSearch":       "搜索:",
            "sUrl":          "",
            "oPaginate": {
                "sFirst":    "首页",
                "sPrevious": "上页",
                "sNext":     "下页",
                "sLast":     "末页"
            }
        }
    });

    $('#search1').on( 'keyup', function () {
        table.search( this.value ).draw();
    } );

</script>

<script type="text/javascript">

    $(function(){

        $("#cxfb").click(function(){
            $("#returnBtn").addClass("color-change");
            jsparray.push("hisInfo.ftl");
            var fbmc=$("#getfb").val().replace(/(^\s*)|(\s*$)/g, "");
            var user=$("input[name='username']").val();
            var time=$(".fbtime").val();
            page=0;
            cxfb(user,fbmc,time);

        });

        $("#cxdc").click(function(){

            $("#gzfx").submit();
        });
    });



    //下一页
    $("#nextpage").click(function(){
        if(page+1<allpage)
        {
            page+=1;
            var fbmc=$("#getfb").val().replace(/(^\s*)|(\s*$)/g, "");
            var user=$("input[name='username']").val();
            var time=$(".fbtime").val();
            if (fbmc.length>0) {
                cxfb(user,fbmc,time);
            } else {
                clzt();
            }
        }
        else
        {
            alert("已经是最后一页了");
        }
    });

    //上一页
    $("#uppage").click(function(){
        if(page>0)
        {
            page-=1;
            var fbmc=$("#getfb").val().replace(/(^\s*)|(\s*$)/g, "");
            var user=$("input[name='username']").val();
            var time=$(".fbtime").val();
            if (fbmc.length>0) {
                cxfb(user,fbmc,time);
            } else {
                clzt();
            }
        }
        else
        {
            alert("已经是第一页了");
        }

    });

    //跳转
    $("#gopage").click(function(){

        var p=$("#selectpage").val();

        reg=/^[0-9_]+$/;
        if(reg.test(p)&&p>0&&p<=allpage)
        {
            page=p-1;
            var fbmc=$("#getfb").val().replace(/(^\s*)|(\s*$)/g, "");
            var user=$("input[name='username']").val();
            var time=$(".fbtime").val();
            if (fbmc.length>0) {
                cxfb(user,fbmc,time);
            } else {
                clzt();
            }
        }
        else
        {
            alert("输入格式有误");
        }

    });
</script>
</html>