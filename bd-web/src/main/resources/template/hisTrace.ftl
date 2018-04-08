<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>历史轨迹</title>
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
</head>
<body class="hold-transition skin-blue sidebar-mini">

<!-- Main content -->
<section class="content">
    <!-- Main row -->
    <div class="row">
        <!-- Left col -->
        <div class="col-md-12">
            <!-- 车辆信息 -->
            <div class="box box-success">
                <div class="box-header with-border">
                    <i class="ion ion-clipboard"></i>
                    <h3 class="box-title">历史轨迹</h3>
                </div>
                <!-- /.box-header -->
                <div class="box-body">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label>查询条件</label>
                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="form-group">
                                <input class="form-control " type="text" value="浮标编号" readonly>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group">
                                <input type="text" class="form-control getcph">
                            </div>
                        </div>
                        <div class="col-md-5">
                            <div class="form-group">
                                <div class="input-group">
                                    <div class="input-group-addon">
                                        <i class="fa fa-clock-o"></i>
                                    </div>
                                    <input type="text" class="form-control pull-right" id="reservationtime">
                                </div>
                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="form-group">
                                <button type="button" class="btn btn-primary btn-block" id="cxgj">
                                    查询
                                </button>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <!-- Left col -->
                        <div class="col-md-12">
                            <div class="box box-primary">
                                <div class="box-header with-border">
                                    <i class="ion ion-videocamera"></i>
                                    <h3 class="box-title">轨迹回放</h3>
                                    <div class="box-tools pull-right">
                                        <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
                                        </button>
                                    </div>
                                </div>
                                <div class="box-body">

                                    <div class="btn-video" style="float: right; ">


                                        <button type="button" class="btn btn-primary btn-sm" id="start">
                                            开始
                                        </button>
                                        <button type="button" class="btn btn-primary btn-sm " id="pause">
                                            暂停
                                        </button>
                                        <button type="button" class="btn btn-primary btn-sm " id="resume">
                                            继续
                                        </button>
                                        <button type="button" class="btn btn-primary btn-sm " id="stop">
                                            停止
                                        </button>
                                    </div>
                                    <div class="slider-video col-md-3 pull-right">

                                        <input id="speed" class="slider form-control glyphicon glyphicon-eject" data-slider-id='aqua' type="text" data-slider-min="0" data-slider-max="20000" data-slider-step="10" data-slider-value="2000" data-slider-handle="triangle" />
                                    </div>
                                    <div class="pull-right text-video">速度：</div>


                                    <div id="video-history" style="width: 100%;height: 500px; "></div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="box-footer">

                </div>
            </div>


        </div>
    </div>
    <!-- /.row -->
</section>
</body>
<script type="text/javascript">
    $(function(){

        $(".select2").select2();
        $('#reservationtime').daterangepicker({
            howDropdowns : true,
            timePicker : true, //是否显示小时和分钟
            timePicker24Hour: true,
            timePickerIncrement : 1, //的增量，单位为分钟
            timePickerSeconds : true,
            linkedCalendars : true,
            timePicker24Hour: true,
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

        $('input[type="checkbox"].minimal, input[type="radio"].minimal').iCheck({
            checkboxClass: 'icheckbox_minimal-blue',
            radioClass: 'iradio_minimal-blue'
        });
        //Red color scheme for iCheck
        $('input[type="checkbox"].minimal-red, input[type="radio"].minimal-red').iCheck({
            checkboxClass: 'icheckbox_minimal-red',
            radioClass: 'iradio_minimal-red'
        });
        //Flat red color scheme for iCheck
        $('input[type="checkbox"].flat-red, input[type="radio"].flat-red').iCheck({
            checkboxClass: 'icheckbox_flat-green',
            radioClass: 'iradio_flat-green'
        });


        $('#example2').DataTable({
            "paging": true,
            "searching": false,
            "ordering": true,
            "info": true,
            "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
            "scrollX": true,
            "oLanguage":{
                "sProcessing":   "处理中...",
                "sLengthMenu":   "显示 _MENU_ 项结果",
                "sZeroRecords":  "处理中.....",
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
    });
</script>
<script type="text/javascript">


    $(function(){


        $('#speed').slider({
            formatter: function(value) {
                return '速度: ' + value+ 'km/h';
            }
        });



        var mapa = new AMap.Map("video-history", {
            resizeEnable: true,
            center: [118.820327, 32.021018],
            zoom: 15
        });

        AMap.plugin(['AMap.Scale'],function(){
            mapa.addControl(new AMap.Scale());
        });

        var xxxxcph=$("#xxxxcph").text();
        $(".getcph").val(xxxxcph);

        $("#cxgj").click(function() {
            var cph=$(".getcph").val().replace(/(^\s*)|(\s*$)/g, "");
            var time=$("#reservationtime").val();
            var startime=time.substring(0, 19);
            var endtime=time.substring(21, 41);

            if (cph.length<1) {
                alert("请输入浮标名");
            }else{

                $.ajax({
                    type : "post",
                    url : "buoy/hisTrace",
                    data : {
                        "cph" : cph,
                        "startime":startime,
                        "endtime":endtime,
                    },
                    dataType : "json",
                    async : true,
                    contentType: "application/x-www-form-urlencoded; charset=utf-8",
                    success : function(list) {

                        if (list[0]==0) {
                            alert("浮标名称不存在");
                        } else if(list.length==0){
                            alert("此时间段没有数据");
                        }else{

                            var startLong = list[0].gps_longitude;
                            var startLat = list[0].gps_latitude;
                            var endLong = list[list.length-1].gps_longitude;
                            var endLat = list[list.length-1].gps_latitude;


                            var mapb = new AMap.Map("video-history", {
                                resizeEnable: true,
                                center: [startLong, startLat],
                                zoom: 10
                            });

                            AMap.plugin(['AMap.Scale'],function(){
                                mapb.addControl(new AMap.Scale());
                            });

                            var marker = new AMap.Marker({
                                map: mapb,
                                position: [startLong, startLat],
                                icon: "images/ff1.png", //marker图标，直接传递地址url
                                offset: new AMap.Pixel(-13, -6), //相对于基点的位置
                                autoRotation: true//根据线点自动转换方向
                            });

                            var  time = [];
                            var  lineArr = [];
                            var lngX = startLong, latY = startLat;
                            lineArr.push([lngX, latY]);
                            for (var i = 1; i < list.length; i++) {
                                lngX = list[i].gps_longitude;

                                for (var a=1;lngX==0.015498;a++) {
                                    lngX = list[i-a].gps_longitude;

                                }

                                latY = list[i].gps_latitude;

                                for (var b=1;latY==0.002728;b++) {
                                    latY = list[i-b].gps_latitude;
                                }

                                lineArr.push([lngX, latY,]);
                            }




                            // 绘制轨迹
                            var polyline = new AMap.Polyline({
                                map: mapb,
                                path: lineArr,
                                strokeColor: "#00A",  //线颜色
                                // strokeOpacity: 1,     //线透明度
                                strokeWeight: 3,      //线宽
                                // strokeStyle: "solid"  //线样式
                            });

                            //前进后的线
                            var passedPolyline = new AMap.Polyline({
                                map: mapb,
                                // path: lineArr,
                                strokeColor: "#F00",  //线颜色
                                // strokeOpacity: 1,     //线透明度
                                strokeWeight: 3,      //线宽
                                // strokeStyle: "solid"  //线样式
                            });



                            var infoWindow = new AMap.InfoWindow({
                                offset : new AMap.Pixel(0, -30)
                            });


                            marker.on('moving',function(e){
                                var len = e.passedPath.length;
                                var time = list[len-1].gps_time;
                                var speed2 = list[len-1].sea_depth;
                                if (speed2==6553.5) {
                                    speed2 = "无效数据";
                                }

                                var location = e.passedPath[len-1];
                                infoWindow.setContent("<span style='font-size:15px;color:black;'>时间："+time+"</span></br><span style='font-size:15px;color:black;'>温度："+speed2+"</span>");
                                infoWindow.open(mapb, [location.lng,location.lat]);
                                passedPolyline.setPath(e.passedPath);
                            });
                            mapb.setFitView();



                            AMap.event.addDomListener(document.getElementById('start'), 'click', function() {
                                var sd=$("#speed").val()*2.2;
                                marker.moveAlong(lineArr, sd);
                            }, false);
                            AMap.event.addDomListener(document.getElementById('pause'), 'click', function() {
                                marker.pauseMove();
                            }, false);
                            AMap.event.addDomListener(document.getElementById('resume'), 'click', function() {
                                marker.resumeMove();
                            }, false);
                            AMap.event.addDomListener(document.getElementById('stop'), 'click', function() {
                                marker.stopMove();
                            }, false);

                        }
                    }
                });

            }

        });
    });
</script>
</html>