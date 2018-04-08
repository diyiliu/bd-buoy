$(function(){

	var jgname;
	//点击添加按钮
	$("#addJg").click(function(){
		$("#jgsureBtn button").text("确定");
        $('.checkList-table').addClass("hide");
        $('.user-form').removeClass("hide");
        
        
        $.ajax({
        	type:"post",
        	url:"queryPjgList.do",
        	dataType:"json",
        	async : true,
			success : function(list)
			{
				$("#jgId").empty();
				$("#jgId").append('<option value="添加新机构">添加新机构</option>');
				for(var i=0;i<list.length;i++)
				{
					$("#jgId").append('<option value="'+list[i].organization_name+'">'+list[i].organization_name+'</option>');
				}
			}
        });
	});
	
	
	
	/*点击添加确认按钮*/
	$("#jgsureBtn").click(function(){
		var jgname=$("#qymc").val();
		var ssjg=$("#jgId").val();
		var qydz=$("#qydz").val();
		var fzr=$("#fzr").val();
		var phon=$("#phon").val();
		var iphon=$("#iphon").val();
		var cz=$("#cz").val();
		var yb=$("#yb").val();
		var yx=$("#yx").val();
		//判断非空
		reg=/^[0-9_]+$/;   
		if(jgname==''||qydz==''||fzr==''||phon==''||iphon==''||cz==''||yb==''||yx=='')
		{
			alert("企业信息不完善");
		}
		else if(iphon.length!=11||!reg.test(iphon))
		{
			alert("手机号格式不正确");
		}
		else if(yb.length!=6||!reg.test(yb))
		{
			alert("邮编格式不正确");
		}
		else
		{
			if($("#jgsureBtn button").text()=="确定")
			{
			 $.ajax({
		        	type:"post",
		        	url:"addjigou.do",
		        	data:{"jgname":jgname,"ssjg":ssjg,"qydz":qydz,"fzr":fzr,"phon":phon,"iphon":iphon,"cz":cz,"yb":yb,"yx":yx},
		        	dataType:"json",
		        	async : true,
					success : function(list)
					{
						if(list[0]==0)
						{
							alert("该机构已经存在");
						}
						else if(list[0]==1)
						{
							 $('.checkList-table').removeClass("hide");
						        $('.user-form').addClass("hide");
						        alert("机构添加成功");
						}
					}
		        });
			}
			else if($("#jgsureBtn button").text()=="修改")
			{
				$.ajax({
					type:"post",
					url:"updateJg.do",
					data:{"jgname":jgname,"ssjg":ssjg,"qydz":qydz,"fzr":fzr,"phon":phon,"iphon":iphon,"cz":cz,"yb":yb,"yx":yx,"sshjgid":$("#sshjgid").val(),"id":$("#jgid").val()},
					dataType:"json",
					async:true,
					success:function(list){
						
					}
				});
			}
		}
	});
	
	
	
	
	
	
	
	
	
	//点击修改按钮
	$("#modifyJg").click(function(){
		$("#jgsureBtn button").text("修改");
		 $('.checkList-table').removeClass("hide");
		  
	      $('.user-form').addClass("hide");
		
		var obj=$("#glList input[type=checkbox]:checked");
		check_val = [];
		for (k in obj) {
			if (obj[k].checked)
				check_val.push(obj[k].value);
		}
		
		
		if(check_val.length==0)
		{
			alert("请选择一个机构");
		}
		else if(check_val.length>1)
		{
			alert("最多只能选择一个车辆");
		}
		else
		{
			$('.user-form').removeClass("hide");
			jgname=obj.parent().parent().children().eq(1).text();
			$.ajax({
				type:"post",
				url:"queryJgByName.do",
				data:{"jgname":jgname},
				dataType:"json",
				async:true,
				success:function(list)
				{
//					alert(sbj)
					
					$("#sshjgid").val(list[1].suoshuid);
					$("#jgid").val(list[1].subid);
					  $('.user-form').removeClass("hide");
					  $('.checkList-table').addClass("hide");
					$("#jgId").empty();
					if(list[1].suoshuid==0)
					{
						$("#jgId").append('<option value="添加新机构">添加新机构</option>');
					}
					else
					{
						
						for(var i=0;i<list[0].length;i++)
						{
							$("#jgId").append('<option value="'+list[0][i]+'">'+list[0][i]+'</option>');
						}
						
					}
					
					$("#qymc").val(list[1].organization_name);
					//$("#jgId").val();
					$('#jgId option[value="'+list[1].parname+'"]').attr("selected",true);
					$("#qydz").val(list[1].address);
					$("#fzr").val(list[1].legal_representative);
					$("#phon").val(list[1].contact_number);
					$("#iphon").val(list[1].phone_number);
					$("#cz").val(list[1].fax);
					$("#yb").val(list[1].zip_code);
					$("#yx").val(list[1].mail_box);
				}
			});
		}
				
	});
	
	
	
	
	
	
	//点击删除按钮
	$("#deleteJg").click(function(){
		
		
		
	});
});
