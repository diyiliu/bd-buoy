var jsparray=[];
$(function(){
	
	$("#returnBtn").removeClass("color-change");
	
	$(".htBtn").click(function(){
		if($(this).parent().hasClass("color-change"))
		{
			if(jsparray.length==1)
			{
				$("#hideId1").val(0);
				$(".jsppage").addClass("hide");
				$(".homecontext").removeClass("hide");
				jsparray=[];
				$("#returnBtn").removeClass("color-change");
			}
			else 
			{
				if(jsparray[jsparray.length-2]=="historylTrajectory.jsp")
				{
					lsgj();
				}
				else if(jsparray[jsparray.length-2]=="carState.jsp")
				{
					clzt();
				}
				else if(jsparray[jsparray.length-2]=="query.jsp")
				{
					zdkz();
				}
				else if(jsparray[jsparray.length-2]=="userManege.jsp")
				{
					yh();
				}
				else if(jsparray[jsparray.length-2]=="car.jsp")
				{
					cl();
				}
				else if(jsparray[jsparray.length-2]=="mechanism.jsp")
				{
					jg();
				}
				else if(jsparray[jsparray.length-2]=="carDetail.jsp")
				{
					xxxx();
				}
			}
			jsparray.splice(jsparray.length-2,1);
		}
		else
		{
			alert("已经是最后一层了");
		}
	});
	
	
});