var page=0;    
var allpage;
	//初始化加载
	$("#clzt").click(function(){
    		$("#returnBtn").addClass("color-change");
    		jsparray.push("hisInfo");
    		page=0;
    		clzt();
    		
    	});
	
	
	//从详细详细跳
	$(".clzt").click(function(){
		$("#returnBtn").addClass("color-change");
		jsparray.push("hisInfo");
		
		$(".homecontext").addClass("hide");
		$(".jsppage").removeClass("hide");
		
		$.post("hisInfo",function(data,status){
		$(".jsppage").html(data);
		});
		
		var user=$("input[name='username']").val();
		var fbmc=$("#xxxxcph").text().replace(/(^\s*)|(\s*$)/g, "");
		var time=$("#hidetime").val();
		$("#getfb").val(fbmc);
		page=0;
		cxfb(user,fbmc,time);
	});
	
	function test(str) {
		str = str.toString();
		var arr = str.split(".");
		var l = arr[1].length;
		var a = 6 - l;
		if(a > 0 && a != 0) {
			for(var i=0; i<a; i++) {
			str += "0";
			}
		}
		return str;
	}
		
	
	function cxfb(user,fbmc,time)
	{
        $('#tableL').DataTable().clear();
		$.ajax({
				type : "post",
				url : "buoy/queryHisInfo",
				data : 
				{
					"user":user,
					"fbmc":fbmc,
					"time":time,
					"page":page
				},
				dataType : "json",
				async : true,
				success:function(l){
					
					var allcount=l[0];
					var fbCurrents=l[1];
					
					if (fbCurrents==null) {
						alert("没有这个浮标名称");
					} else if(fbCurrents.length==0){
						alert("此时间段没有数据");
					}else{

					
					for ( var i = 0; i < fbCurrents.length; i++) {

						var fbsj = fbCurrents[i];
						
						var fbmc1;
						var fbbh;
						//var hssd;
						var dwzt;
						var jd;
						var wd;
						var hswd;
						var dy;
						var cjsj;

                        if (fbsj.buoy.name == null){
                            fbmc1="无数据";
                        }else{
                            fbmc1=fbsj.buoy.name;
                        }

                        if (fbsj.buoy.sim == null) {
                            fbbh = "无数据";
                        } else{
                            fbbh = fbsj.buoy.sim;
                        }

                        /*if (fbsj.sea_speed == null) {
                            hssd = "无数据";
                        } else{
                            hssd = fbsj.sea_speed+" m/h";
                        }*/

                        if (fbsj.gpsLocation =="0") {
                            dwzt = "有效定位";
                        } else if(fbsj.gpsLocation =="1") {
                            dwzt ="无效定位";
                        }

                        if (fbsj.gpsLng == null) {
                            jd = "无数据";
                        } else if(fbsj.gpsLng == "0"){
                            jd = fbsj.gpsLng;
                        }else{
                            jd = test(fbsj.gpsLng);
                        }

                        if (fbsj.gpsLat == null) {
                            wd = "无数据";
                        } else if(fbsj.gpsLat == "0"){
                            wd = fbsj.gpsLat;
                        }else{
                            wd = test(fbsj.gpsLat);
                        }

                        if (fbsj.temp == null) {
                            hswd = "无数据";
                        }else if(fbsj.temp == 555.35){
                            hswd="无效"
                        }else if(fbsj.temp > 160){
                            hswd ="异常"
                        }else{
                            hswd = fbsj.temp.toFixed(2)+" ℃";
                        }

                        if (fbsj.voltage == null) {
                            dy = "无数据";
                        } else{
                            dy = fbsj.voltage+" mv";
                        }

                        if (fbsj.gpsTime == null) {
                            cjsj = "无数据";
                        } else{
                            cjsj = fbsj.gpsTime;
                        }

						
						//分页显示
						$("#allcount").text(allcount);
						$("#allpage").text(Math.ceil(allcount/15));
						$("#currentpage").text(( parseInt(page)+1)+"/"+Math.ceil(allcount/15));
						allpage=Math.ceil(allcount/15);

                        $('#tableL').DataTable().row.add( [

                            '<input type="checkbox" class="minimal" value='+fbsj.buoyId+'>',
                            '<td >' + fbmc1 + '</td>',
                            '<td >' + fbbh + '</td>',
                            /*'<td >' + hssd + '</td>',*/
                            '<td >' + dwzt + '</td>',
                            '<td >' + jd + '</td>',
                            '<td >' + wd + '</td>',
                            '<td >' + hswd +'</td>',
                            '<td >' + dy +'</td>',
                            '<td >' + cjsj + '</td>'
                        ]).draw();
                    }
				}
					
					
					
				$("#getfb").val(fbmc);
				$("#fbuser").val(user);
				$("#hidetime").val(time);
				$(".fbtime").val(time);
				//alert(time);
				/*$(".fbtime").val(time);
				$("#hidetime").val($(".fbtime").val());*/
				}
				
		
			});
	}
	
	
    	function clzt()
    	{
			$(".homecontext").addClass("hide");
			$(".jsppage").removeClass("hide");
			
			$.post("hisInfo",function(data,status){
			$(".jsppage").html(data);
			});
			
			var user=$("input[name='username']").val();
			var time=$("#hidetime").val();

            $('#tableL').DataTable().clear();
			$.ajax({
					type : "post",
					url : "buoy/queryHisInfo",
					data : 
					{
						"user":user,
						"time":time,
						"page":page
					},
					dataType : "json",
					async : true,
					success:function(l){
						var allcount=l[0];
						var fbCurrents=l[1];

						for ( var i = 0; i < fbCurrents.length; i++) {
							var fbsj = fbCurrents[i];
							
							var fbmc1;
							var fbbh;
							//var hssd;
							var dwzt;
							var jd;
							var wd;
							var hswd;
							var dy;
							var cjsj;

								if (fbsj.buoy.name == null){
									fbmc1="无数据";
								}else{
									fbmc1=fbsj.buoy.name;
								}
								
								
								if (fbsj.buoy.sim == null) {
									fbbh = "无数据";
								} else{
									fbbh = fbsj.buoy.sim;
								}
								
								/*if (fbsj.sea_speed == null) {
									hssd = "无数据";
								} else{
									hssd = fbsj.sea_speed+" m/h";
								}*/
								
								if (fbsj.gpsLocation =="0") {
									dwzt = "有效定位";
								} else if(fbsj.gpsLocation =="1") {
									dwzt ="无效定位";
								}
								
								if (fbsj.gpsLng == null) {
									jd = "无数据";
								} else if(fbsj.gpsLng == "0"){
									jd = fbsj.gpsLng;
								}else{
									jd = test(fbsj.gpsLng);
								}	

								if (fbsj.gpsLat == null) {
									wd = "无数据";
								} else if(fbsj.gpsLat == "0"){
									wd = fbsj.gpsLat;
								}else{
									wd = test(fbsj.gpsLat);
								}
								
								if (fbsj.temp == null) {
									hswd = "无数据";
								}else if(fbsj.temp == 555.35){
									hswd="无效"
								}else if(fbsj.temp > 160){
									hswd ="异常"
								}else{
									hswd = fbsj.temp+" ℃";
								}
								
								if (fbsj.voltage == null) {
									dy = "无数据";
								} else{
									dy = fbsj.voltage+" mv";
								}
								
								if (fbsj.gpsTime == null) {
									cjsj = "无数据";
								} else{
									cjsj = fbsj.gpsTime;
								}
		

							
							//分页显示
							$("#allcount").text(allcount);
							$("#allpage").text(Math.ceil(allcount/15));
							$("#currentpage").text(( parseInt(page)+1)+"/"+Math.ceil(allcount/15));
							allpage=Math.ceil(allcount/15);

                            $('#tableL').DataTable().row.add( [
                                '<input type="checkbox" class="minimal" value='+fbsj.buoyId+'>',
                                '<td >' + fbmc1 + '</td>',
                                '<td >' + fbbh + '</td>',
                                /*'<td >' + hssd + '</td>',*/
                                '<td >' + dwzt + '</td>',
                                '<td >' + jd + '</td>',
                                '<td >' + wd + '</td>',
                                '<td >' + hswd +'</td>',
                                '<td >' + dy +'</td>',
                                '<td >' + cjsj + '</td>'
                            ]).draw();
                        }

						$("#fbuser").val(user);
						$(".fbtime").val($("#hidetime").val());
						$("#hidetime").val($(".fbtime").val());
					}
				});
    	}
    	
    	
    	
    	
		
	

    	
    	