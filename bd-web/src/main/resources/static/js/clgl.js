
var page1=0;
var allpage1;
// �������������ʾ�����û��б�
$("#clgl").click(function() {
	jsparray.push("car.jsp");
	$("#returnBtn").addClass("color-change");
	cl();
});


function cl()
{
	
	$("#hideId1").val(0);
	$("#hideId2").val(0);
	var sbid=$("input[name='sbid']").val();
	var pid=$("input[name='pid']").val();
	
	$(".homecontext").addClass("hide");
	$(".jsppage").removeClass("hide");
	$.post("car.jsp",function(data,status){
	$(".jsppage").html(data);
	});
	
	$.ajax({
				type : "post",
				url : "queryAllVehStatic.do",
				data : {
					"sbid" : sbid,
					"pid" : pid,
					"page1":page1
				},
				dataType : "json",
				async : true,
				success : function(list) {
					
					var allcount1=list[0];
					
					var vehicle=list[1];
					
					
					$(".clgllb table").children("tbody").empty();
					for ( var i = 0; i < vehicle.length; i++) {
						$(function add(){
					        var t = $('#table_clgl').DataTable();
							t.row.add( [
					                    '<input type="checkbox" class="minimal" value="'+vehicle[i].id+'">',
					                    '<td>'+vehicle[i].vehicle_id+'</td>',
					                    '<td>'+vehicle[i].vin+'</td>',
										'<td>'+vehicle[i].terminal_number+'</td>',
										'<td>'+vehicle[i].sim+'</td>',
										'<td>'+vehicle[i].vehicle_type+'</td>'
					                ]).draw();
									});
					}
					
					$("#allcount1").text(allcount1);
					$("#allpage1").text(Math.ceil(allcount1/15));
					$("#currentpage1").text(( parseInt(page1)+1)+"/"+Math.ceil(allcount1/15));
					allpage1=Math.ceil(allcount1/15);
					
				}

			});
	

}


$(function(){
	$(".add").click(function(){
		$(".addclinfo").css("display","block");
		
		$.ajax(
				{
					type : "post",
					url : "showAllJgName.do",
					dataType : "json",
					async : true,
					success : function(list)
					{
						$("#orgids").empty();
						for(var i=0;i<list.length;i++)
						{
							$("#orgids").append('<option>'+list[i]+'</option>');
						}
					}
				});
		
	});
	
	$("input[type='button']").click(function(){
		$(".addclinfo").css("display","none");
	});
	
	
	$("#addcl1").click(function(){
		
		$.ajax(
				{
					type : "post",
					url : "addcl.do",
					data : 
					{
						"buslic" : $("#buslic").val(),"serno":$("#serno").val(),"vin":$("#vin").val(),"sim":$("#sim").val(),"btype":$("#btype").val(),"orgids":$("#orgids").val(),"ddqcxslc":$("#ddqcxslc").val(),"ddqczgcs":$("#ddqczgcs").val(),"gdwcdb":$("#gdwcdb").val(),"djzj":$("#djzj").val(),"zdsczj":$("#zdsczj").val(),"djqdnum":$("#djqdnum").val(),"djwz":$("#djwz").val(),"djlqfs":$("#djlqfs").val(),"djtype":$("#djtype").val(),"djeddy":$("#djeddy").val(),"djzdgzdl":$("#djzdgzdl").val(),"djfzpower":$("#djfzpower").val(),"djrpm":$("#djrpm").val(),"batnums":$("#batnums").val(),"batno":$("#batno").val(),"batenery":$("#batenery").val(),"battype":$("#battype").val(),"dclqfs":$("#dclqfs").val()
					},
					dataType : "json",
					async : true,
					success : function()
					{
						//��ѯ�����б�
						
					}
				});
		
		$(".addclinfo").css("display","none");
		alert("��ӳ����ɹ�");
		
	});
	
	
});