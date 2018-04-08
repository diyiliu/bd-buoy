
$(function(){
		
		$(".lsgj").click(function() {
		jsparray.push("hisTrace");
		$("#returnBtn").addClass("color-change");
		lsgj();
	});
		
});

function lsgj()
{
	$("#hideId1").val(0);
	$("#hideId2").val(0);
	$(".homecontext").addClass("hide");
	$(".jsppage").removeClass("hide");
	$.post("hisTrace",function(data,status){
		$(".jsppage").html(data);
	});
}