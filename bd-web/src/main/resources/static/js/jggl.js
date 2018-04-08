
$(function(){
	
$("#jggl").click(
	function() {
		jsparray.push("mechanism.jsp");
		$("#returnBtn").addClass("color-change");
		jg();
	});

function jg()
{

	$("#hideId1").val(0);
	$("#hideId2").val(0);
	$(".homecontext").addClass("hide");
	$(".jsppage").removeClass("hide");
	
	$.post("mechanism.jsp",function(data,status){
	$(".jsppage").html(data);
	});
	$.ajax({
			type : "post",
			url : "showJgList.do",
			dataType : "json",
			async : true,
			success : function(list)
			{
		
				$(".jggllb table").children("tbody").empty();
				
				$(".yhgllb table").children("tbody").empty();
									
				for ( var i = 0; i < list.length; i++) {
					$(function add(){
				        var t = $('#table_jggl').DataTable();
						var counter = $('#table_jggl tbody tr').length;
						t.row.add( [
				                    '<input type="checkbox" class="minimal" value="'+list[i].id+'">',
				                    '<td>'+list[i].organization_name+'</td>',
									'<td>'+list[i].parname+'</td>',
									'<td>'+list[i].address+'</td>',
									'<td>'+list[i].zip_code+'</td>',
									'<td>'+list[i].legal_representative+'</td>',
									'<td>'+list[i].contact_number+'</td>',
									'<td>'+list[i].phone_number+'</td>',
									'<td>'+list[i].fax+'</td>',
									'<td>'+list[i].mail_box+'</td>'
				                ]).draw();
				               	counter++;
								});
							
						}
				}
		});

	
}


	
	/*$("#btn_submit").click(function(){
		var txt_qymc=$("input[name='txt_qymc']").val();
		var suoshujigou=$(".form-group select").val();
		var txt_qydz=$("input[name='txt_qydz']").val();
		var txt_frdb=$("input[name='txt_frdb']").val();
		var txt_lxdh=$("input[name='txt_lxdh']").val();
		var txt_sjhm=$("input[name='txt_lxdh']").val();
		var txt_cz=$("input[name='txt_cz']").val();
		var txt_yb=$("input[name='txt_yb']").val();
		var txt_dzyx=$("input[name='txt_dzyx']").val();
		var arr=[txt_qymc,suoshujigou,txt_qydz,txt_frdb,txt_lxdh,txt_sjhm,txt_cz,txt_yb,txt_dzyx]
		
		$.ajax(

				{
					type : "post",
					url : "addjigou.do",
					data : 
					{
						"jginput" : txt_qymc+","+suoshujigou+","+txt_qydz+","+txt_frdb+","+txt_lxdh+","+txt_sjhm+","+txt_cz+","+txt_yb+","+txt_dzyx
					},
					dataType : "json",
					async : true,
					success : function(u)
					{
						
					}
						
						
				});
	});
	
	
	
	$("#btn_add").click(function(){
		
		$("input[name='txt_qymc']").empty();
		$("input[name='txt_qydz']").empty();
		$("input[name='txt_frdb']").empty();
		$("input[name='txt_lxdh']").empty();
		$("input[name='txt_lxdh']").empty();
		$("input[name='txt_cz']").empty();
		$("input[name='txt_yb']").empty();
		$("input[name='txt_dzyx']").empty();
		
		$.ajax(

				{
					type : "post",
					url : "queryPjgList.do",
					dataType : "json",
					async : true,
					success : function(list)
					{
						$(".form-group select").empty();
						$(".form-group select").append('<option>����»�</option>');
						
						for(var i=0;i<list.length;i++)
						{
							$(".form-group select").append('<option>'+list[i].organization_name+'</option>')
						}
				
					}
						
						
				});*/
	});
	
	
