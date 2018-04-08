
//故障管理
$(function(){
		$("#hideId1").val(0);
		$("#bjgl").click(function() {
			$(".homecontext").addClass("hide");
			$(".jsppage").removeClass("hide");
			
			$.post("warn.jsp",function(data,status){
				$(".jsppage").html(data);
				});
			gzcldo();
		});
		

		$('#bjts li').click(function(){	
			$(".homecontext").addClass("hide");
			$(".jsppage").removeClass("hide");
			
			$.post("warn.jsp",function(data,status){
				$(".jsppage").html(data);
				});

		});
		
		function gzcldo(){
			var c=$("input[name='sbid']").val();
			var b=$("input[name='pid']").val();	
			var a=$("input[name='userName']").val();	
			
			$.ajax({
				type : "post",
				url : "gzcl.do",
				data : {
					"user" : a,
					"pid" : b,
					"sbid" : c
				},
				dataType : "json",
				async : true,
				success : function(list) {
					$("#bjdj1").text(list[0]);
					$("#bjdj2").text(list[1]);
					$("#bjdj3").text(list[2]);
				}
			});	
			
		};
		
		

		
		
		
});




