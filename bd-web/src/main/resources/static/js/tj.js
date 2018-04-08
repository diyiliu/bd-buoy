
//里程统计
$(function(){
		$("#hideId1").val(0);
		$("#hideId2").val(0);
		$("#lctj").click(function() {
		$(".homecontext").addClass("hide");
		$(".jsppage").removeClass("hide");
		$.post("workMilage.jsp",function(data,status){
		$(".jsppage").html(data);
		});
		 
	});
});


//工作时间统计
$(function(){
		$("#hideId1").val(0);
		$("#gzsjtj").click(function() {
		$(".homecontext").addClass("hide");
		$(".jsppage").removeClass("hide");
		
		$.post("workTime.jsp",function(data,status){
		$(".jsppage").html(data);
		});
		 
	});
});


//故障分析
$(function(){
		$("#hideId1").val(0);
		$("#gzfx").click(function() {
		$(".homecontext").addClass("hide");
		$(".jsppage").removeClass("hide");
		
		$.post("workfault.jsp",function(data,status){
		$(".jsppage").html(data);
		});
		 
	});
});


//充电状态统计
$(function(){
		$("#hideId1").val(0);
		$("#cdzttj").click(function() {
		$(".homecontext").addClass("hide");
		$(".jsppage").removeClass("hide");
		
		$.post("workCharge.jsp",function(data,status){
		$(".jsppage").html(data);
		});
		 
	});
});