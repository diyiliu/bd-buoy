var page=0;    
var allpage;
	//初始化加载
	$("#clzt").click(function(){
    		$("#returnBtn").addClass("color-change");
    		jsparray.push("carState.jsp");
    		page=0;
    		clzt();
    		
    	});
	
	
	//从详细详细跳
	$(".clzt").click(function(){
		$("#returnBtn").addClass("color-change");
		jsparray.push("carState.jsp");
		
		$(".homecontext").addClass("hide");
		$(".jsppage").removeClass("hide");
		
		$.post("carState.jsp",function(data,status){
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
		
		$.ajax({
				type : "post",
				url : "queryAllVehCurr.do",
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
					
					//$(".clztlb table").children("tbody").empty();
					 var t = $('#tableL').DataTable();
					        t.clear();
					
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
						
							if (fbsj.name == null){
								fbmc1="无数据";
							}else{
								fbmc1=fbsj.name;
							}
							
							
							if (fbsj.sim == null) {
								fbbh = "无数据";
							} else{
								fbbh = fbsj.sim;
							}
							
							/*if (fbsj.sea_speed == null) {
								hssd = "无数据";
							} else{
								hssd = fbsj.sea_speed+" m/h";
							}*/
							
							if (fbsj.gps_Positioning =="0") {
								dwzt = "有效定位";
							} else if(fbsj.gps_Positioning =="1") {
								dwzt ="无效定位";
							}
							
							if (fbsj.gps_longitude == null) {
								jd = "无数据";
							} else if(fbsj.gps_longitude == "0"){
								jd = fbsj.gps_longitude;
							}else{
								jd = test(fbsj.gps_longitude);
							}	

							if (fbsj.gps_latitude == null) {
								wd = "无数据";
							} else if(fbsj.gps_latitude == "0"){
								wd = fbsj.gps_latitude;
							}else{
								wd = test(fbsj.gps_latitude);
							}
							
							if (fbsj.sea_depth == null) {
								hswd = "无数据";
							}else if(fbsj.sea_depth == 555.35){
								hswd="无效"
							}else if(fbsj.sea_depth > 160){
								hswd ="异常"
							}else{
								hswd = fbsj.sea_depth+" ℃";
							}
							
							if (fbsj.Cell_voltage == null) {
								dy = "无数据";
							} else{
								dy = fbsj.Cell_voltage+" mv";
							}
							
							if (fbsj.GPS_time == null) {
								cjsj = "无数据";
							} else{
								cjsj = fbsj.GPS_time;
							}
	
						
						
					
						
						//分页显示
						$("#allcount").text(allcount);
						$("#allpage").text(Math.ceil(allcount/15));
						$("#currentpage").text(( parseInt(page)+1)+"/"+Math.ceil(allcount/15));
						allpage=Math.ceil(allcount/15);
						
						
						
						function add(){
					       
							t.row.add( [
							            
					                    '<input type="checkbox" class="minimal" value='+fbsj.static_id+'>',
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
					              
									};
									
						$(function(){
							add();
						});
						
						
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
			
			$.post("carState.jsp",function(data,status){
			$(".jsppage").html(data);
			});
			
			var user=$("input[name='username']").val();
			var time=$("#hidetime").val();
			$.ajax({
					type : "post",
					url : "queryAllVehCurr.do",
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
						
						
						$(".clztlb table").children("tbody").empty();
						
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
							
								if (fbsj.name == null){
									fbmc1="无数据";
								}else{
									fbmc1=fbsj.name;
								}
								
								
								if (fbsj.sim == null) {
									fbbh = "无数据";
								} else{
									fbbh = fbsj.sim;
								}
								
								/*if (fbsj.sea_speed == null) {
									hssd = "无数据";
								} else{
									hssd = fbsj.sea_speed+" m/h";
								}*/
								
								if (fbsj.gps_Positioning =="0") {
									dwzt = "有效定位";
								} else if(fbsj.gps_Positioning =="1") {
									dwzt ="无效定位";
								}
								
								if (fbsj.gps_longitude == null) {
									jd = "无数据";
								} else if(fbsj.gps_longitude == "0"){
									jd = fbsj.gps_longitude;
								}else{
									jd = test(fbsj.gps_longitude);
								}	

								if (fbsj.gps_latitude == null) {
									wd = "无数据";
								} else if(fbsj.gps_latitude == "0"){
									wd = fbsj.gps_latitude;
								}else{
									wd = test(fbsj.gps_latitude);
								}
								
								if (fbsj.sea_depth == null) {
									hswd = "无数据";
								}else if(fbsj.sea_depth == 555.35){
									hswd="无效"
								}else if(fbsj.sea_depth > 160){
									hswd ="异常"
								}else{
									hswd = fbsj.sea_depth+" ℃";
								}
								
								if (fbsj.Cell_voltage == null) {
									dy = "无数据";
								} else{
									dy = fbsj.Cell_voltage+" mv";
								}
								
								if (fbsj.GPS_time == null) {
									cjsj = "无数据";
								} else{
									cjsj = fbsj.GPS_time;
								}
		
							
							
						
							
							//分页显示
							$("#allcount").text(allcount);
							$("#allpage").text(Math.ceil(allcount/15));
							$("#currentpage").text(( parseInt(page)+1)+"/"+Math.ceil(allcount/15));
							allpage=Math.ceil(allcount/15);
							
							
							
							function add(){
						        var t = $('#tableL').DataTable();
								t.row.add( [
								            
						                    '<input type="checkbox" class="minimal" value='+fbsj.static_id+'>',
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
						              
										};
										
							$(function(){
								add();
							});
							
							
						}
						$("#fbuser").val(user);
						$(".fbtime").val($("#hidetime").val());
						$("#hidetime").val($(".fbtime").val());
					}
			
				});
				
		   
    	}
    	
    	
    	
    	
		
	

    	
    	