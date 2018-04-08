$(function(){
	var id;
	 
	/*添加车辆*/
	//点击添加按钮
	  $('#addVeh').click(function(){
		  $("#addmodfyBtn").text('确定');
		  $(".addvehicle input").val('');
          $('.clgllb').addClass("hide");
          
          var sbid=$("input[name='sbid']").val();
  		  var pid=$("input[name='pid']").val();
          $.ajax({
  					type : "post",
  					url : "showAllJgName.do",
  					
  					data:{
						"sbid":sbid,
						"pid":pid,
					},
  					dataType : "json",
  					async : true,
  					success : function(list)
  					{
  						$("#orgids").empty();
  						$("#orgids1").empty();
  						for(var i=0;i<list.length;i++)
  						{
  							$("#orgids").append('<option value='+list[i]+'>'+list[i]+'</option>');
  							$("#orgids1").append('<option value='+list[i]+'>'+list[i]+'</option>');
  						}
  					}
  				});
          
         $('.addvehicle').removeClass("hide");
         
     });
	
	  
	  
	  //添加页面的确定按钮
	  $('#addmodfyBtn').on('click', function (){
		  
		  //验证数据合法性
		  if($("#buslic").val()==''||$("#serno").val()==''||$("#vin2").val()==''||$("#sim").val()==''||$("#btype").val()==''||$("#orgids").val()==''||$("#ddqcxslc").val()==''||$("#ddqczgcs").val()==''||$("#gdwcdb").val()==''||$("#djzj").val()==''||$("#zdsczj").val()==''||$("#djqdnum").val()==''||$("#djwz").val()==''||$("#djlqfs").val()==''||$("#djtype").val()==''||$("#djeddy").val()==''||$("#djzdgzdl").val()==''||$("#djfzpower").val()==''||$("#djrpm").val()==''||$("#batnums").val()==''||$("#batno").val()==''||$("#batenery").val()==''||$("#battype").val()==''||$("#dclqfs").val()=='')
			 {
			  //alert("buslic" + $("#buslic").val()+"serno"+$("#serno").val()+"vin"+$("#vin").val()+"sim"+$("#sim").val()+"btype"+$("#btype").val()+"orgids"+$("#orgids").val()+"ddqcxslc"+$("#ddqcxslc").val()+"ddqczgcs"+$("#ddqczgcs").val()+"gdwcdb"+$("#gdwcdb").val()+"djzj"+$("#djzj").val()+"zdsczj"+$("#zdsczj").val()+"djqdnum"+$("#djqdnum").val()+"djwz"+$("#djwz").val()+"djlqfs"+$("#djlqfs").val()+"djtype"+$("#djtype").val()+"djeddy"+$("#djeddy").val()+"djzdgzdl"+$("#djzdgzdl").val()+"djfzpower"+$("#djfzpower").val()+"djrpm"+$("#djrpm").val()+"batnums"+$("#batnums").val()+"batno"+$("#batno").val()+"batenery"+$("#batenery").val()+"battype"+$("#battype").val()+"dclqfs"+$("#dclqfs").val());
			  	alert("车辆信息不完整");
			  }
		  else
			 {
			  	/*判断终端号*/ 
			  	reg=/^[0-9_]+$/;   
			  	if($("#serno").val().length!=10||!reg.test($("#serno").val()))
			  	{
			  		alert("非法终端号");
			  	}
			  	else
			  	{
			  		//判断VIN
			  		reg=/^[a-zA-Z0-9_]+$/;
			  		if($("#vin2").val().length!=17||!reg.test($("#vin2").val()))
			  		{
			  			alert("非法VIN");
			  		}
			  		else
			  		{
			  			//判断
			  			reg=/^[a-zA-Z0-9_]+$/;
			  			if($("#sim").val().length!=20||!reg.test($("#sim").val()))
			  			{
			  				alert("非法iccid");
			  			}
			  			else
			  			{
			  				//判断续航里程
			  				reg=/^[0-9_]+$/; 
			  				if($("#ddqcxslc").val().length>3||!reg.test($("#ddqcxslc").val()))
			  				{
			  					alert("续航里程非法");
			  				}
			  				else
			  				{
			  					//判断传动比
			  					reg = /^[0-9]+.?[0-9]*$/;
			  					if(!reg.test($("#gdwcdb").val()))
			  						{
			  							alert("传动比非法");
			  						}
			  					else
			  						{
			  							//判断最高车速
			  							reg=/^[0-9_]+$/;
			  							if(reg.test($("#ddqczgcs").val()))
			  							{
			  								if($("#ddqczgcs").val()>parseInt('300'))
			  									{
			  									alert("非法最高车速");
			  									}
			  								else
			  									{
			  									//判断电机峰值转矩
			  									reg=/^[0-9_]+$/;
			  									if($("#djzj").val().length>5||!reg.test($("#djzj").val()))
			  									{
			  										alert("电机峰值转矩非法");
			  									}
			  									else
			  										{
			  											//判断最大电机安装数量
			  											reg=/^[0-9_]+$/;
			  											if($("#djqdnum").val().length>2||!reg.test($("#djqdnum").val()))
			  												{
			  													alert("安装电机数量非法");
			  												}
			  											else
			  												{
			  													//判断额定电压
			  													reg=/^[0-9_]+$/;
			  													if($("#djeddy").val().length>3||!reg.test($("#djeddy").val()))
			  													{
			  														alert("额定电压非法");
			  													}
			  													else
			  													{	
			  														//判断额定功率
			  														reg=/^[0-9_]+$/;
				  													if($("#djfzpower").val().length>5||!reg.test($("#djfzpower").val()))
				  													{
				  														alert("额定功率非法");
				  													}
				  													else
				  													{
				  														//判断电机序号
				  														reg=/^[0-9_]+$/;
				  														if($("#batnums").val().length>2||!reg.test($("#batnums").val()))
					  													{
					  														alert("电机序号非法");
					  													}
					  													else
					  													{
					  														//判断最大输出转矩
					  														reg=/^[0-9_]+$/;
					  														if($("#zdsczj").val().length>6||!reg.test($("#zdsczj").val()))
						  													{
						  														alert("最大输出转矩非法");
						  													}
						  													else
						  													{
						  														//判断最大工作电流
						  														reg=/^[0-9_]+$/;
						  														if($("#djzdgzdl").val().length>4||!reg.test($("#djzdgzdl").val()))
							  													{
							  														alert("最大工作电流非法");
							  													}
							  													else
							  													{
							  														//判断电机最高转速
							  														reg=/^[0-9_]+$/;
							  														if($("#djzdgzdl").val().length>4||!reg.test($("#djzdgzdl").val()))
								  													{
								  														alert("最大工作电流非法");
								  													}
								  													else
								  													{
								  														
								  														//判断电机最高转速
								  														reg=/^[0-9_]+$/;
								  														if($("#djrpm").val().length>6||!reg.test($("#djrpm").val()))
									  													{
									  														alert("电机最高转速非法");
									  													}
									  													else
									  													{
									  														
									  														//判断额定能量
									  														reg=/^[0-9_]+$/;
									  														if($("#batenery").val().length>7||!reg.test($("#batenery").val()))
										  													{
										  														alert("额定能量非法");
										  													}
										  													else
										  													{
										  														
										  													//判断电池包序号
										  														reg=/^[0-9_]+$/;
										  														if($("#batno").val().length>3||!reg.test($("#batno").val()))
											  													{
											  														alert("电池包序号非法");
											  													}
											  													else
											  													{
											  														if($("#addmodfyBtn").text()=="确定")
											  														{
													  													  $.ajax({
													  														type : "post",
													  														url : "addcl.do",
													  														data : 
													  														{
													  															"buslic" : $("#buslic").val(),"serno":$("#serno").val(),"vin":$("#vin2").val(),"sim":$("#sim").val(),"btype":$("#btype").val(),"orgids":$("#orgids").val(),"ddqcxslc":$("#ddqcxslc").val(),"ddqczgcs":$("#ddqczgcs").val(),"gdwcdb":$("#gdwcdb").val(),"djzj":$("#djzj").val(),"zdsczj":$("#zdsczj").val(),"djqdnum":$("#djqdnum").val(),"djwz":$("#djwz").val(),"djlqfs":$("#djlqfs").val(),"djtype":$("#djtype").val(),"djeddy":$("#djeddy").val(),"djzdgzdl":$("#djzdgzdl").val(),"djfzpower":$("#djfzpower").val(),"djrpm":$("#djrpm").val(),"batnums":$("#batnums").val(),"batno":$("#batno").val(),"batenery":$("#batenery").val(),"battype":$("#battype").val(),"dclqfs":$("#dclqfs").val()
													  														},
													  														dataType : "json",
													  														async : true,
													  														success : function(list)
													  														{
													  															//查询车辆列表
													  														if(list[0]==0)
													  														{
													  															alert("添加失败:车牌已经存在");
													  														}
													  														else if(list[0]==1)
													  														{
													  															alert("添加失败:VIN已被使用");
													  														}
													  														else if(list[0]==2)
													  															{
													  																alert("添加失败:business_device已存在");
													  															}
													  														else if(list[0]==3)
													  														{
													  															alert("添加失败:device_info已存在");
													  														}
													  														else if(list[0]==4)
													  															{
													  															alert("添加失败:原始数据已存在");
													  															}
													  														else if(list[0]==5)
													  															{
													  															var t = $('#table_clgl').DataTable();
													  															var counter = $('#table_clgl tbody tr').length;
													  															t.row.add([
							'<input type="checkbox" class="minimal" value="'+list[1].id+'">',
							'<td>'+list[1].vehicle_id+'</td>',
							'<td>'+list[1].vin+'</td>',
							'<td>'+list[1].terminal_number+'</td>',
							'<td>'+list[1].sim+'</td>',
							'<td>'+list[1].vehicle_type+'</td>'
													  															                ]).draw();
													  															         
													  															                counter++;
													  															
														  															$('.addvehicle').addClass("hide");
														  															$('.clgllb').removeClass("hide");
													  																alert("添加成功");
													  															}
													  															
													  														}
													  													});  
											  														}
											  														else if($("#addmodfyBtn").text()=='修改')
											  														{
											  															
											  															$.ajax({
													  														type : "post",
													  														url : "modifyVec.do",
													  														data : 
													  														{
													  															"id":id,"buslic" : $("#buslic").val(),"serno":$("#serno").val(),"vin":$("#vin2").val(),"sim":$("#sim").val(),"btype":$("#btype").val(),"orgids":$("#orgids").val(),"ddqcxslc":$("#ddqcxslc").val(),"ddqczgcs":$("#ddqczgcs").val(),"gdwcdb":$("#gdwcdb").val(),"djzj":$("#djzj").val(),"zdsczj":$("#zdsczj").val(),"djqdnum":$("#djqdnum").val(),"djwz":$("#djwz").val(),"djlqfs":$("#djlqfs").val(),"djtype":$("#djtype").val(),"djeddy":$("#djeddy").val(),"djzdgzdl":$("#djzdgzdl").val(),"djfzpower":$("#djfzpower").val(),"djrpm":$("#djrpm").val(),"batnums":$("#batnums").val(),"batno":$("#batno").val(),"batenery":$("#batenery").val(),"battype":$("#battype").val(),"dclqfs":$("#dclqfs").val()
													  														},
													  														dataType : "json",
													  														async : true,
													  														success : function(list)
													  														{
													  															if(list[0]==0)
													  																alert("修改失败:车牌已经存在");
													  															else if(list[0]==1)
													  																alert("修改失败:VIN已被使用");
													  															else if(list[0]==2)
													  																alert("修改失败:business_device已存在");
													  															else if(list[0]==3)
													  																alert("修改失败:device_info已存在");
													  															else if(list[0]==4)
													  																{
													  																alert("修改成功");
													  																$('.checkList-table').removeClass("hide");
													  																$('.addvehicle').addClass("hide");
													  																}
													  														}
													  													});  
											  														}
											  													}
										  													}
									  													}
								  													}
							  													}
						  													}
					  													}
				  													}
			  													}
			  												}
			  										}
			  									}
			  							}
			  							else
			  								{
			  									alert("非法最高车速");
			  								}
			  						}
			  				}
			  			}
			  		}
			  	}
			 }
      });
	
	
	  
	  //点击修改按钮
	  $("#modifyVecBtn").click(function(){
		 
		  $('.checkList-table').removeClass("hide");
		  $('.addvehicle').addClass("hide");
			var obj = $("#vecManagerList input[type='checkbox']:checked");

			check_val = [];
			for (k in obj) {
				if (obj[k].checked)
					check_val.push(obj[k].value);
			}
			
			if(check_val.length==0)
			{
				alert("请选择车辆")
			}
			else if(check_val.length>1)
			{
				alert("不支持批量修改");
			}
			else
			{
				id=obj.val();
				 $.ajax({
						type : "post",
						url : "queryVecStaticById.do",
						data : {
							"id":id
						},
						dataType : "json",
						async : true,
						success : function(list)
						{
							
							$("#orgids").empty();
	  						for(var i=0;i<list[0].length;i++)
	  						{
	  							$("#orgids").append('<option value='+list[0][i]+'>'+list[0][i]+'</option>');
	  							
	  						}
							
							
							var veh=list[1];
							//将值带入到页面
								 /*车牌*/$("#buslic").val(veh.vehicle_id);
								/*终端号*/$("#serno").val(veh.terminal_number);
								/*vin*/$("#vin2").val(veh.vin);
								/*iccid*/$("#sim").val(veh.sim);
								/*车型*/$("#btype").val(veh.vehicle_type);
								/*机构*/
								
								
//								$('#orgids').attr("selected",true);
								$('#orgids option[value="'+veh.jgname+'"]').attr("selected",true);
								$("#ddqcxslc").val(veh.travel_mileage);
								$("#ddqczgcs").val(veh.maximum_speed);
								$("#gdwcdb").val(veh.gear_transmission_ratio);
								$("#djzj").val(veh.motor_peak_torque);
								$("#zdsczj").val(veh.motor_maximum_output_torque);
								$("#djqdnum").val('1');
								$("#djwz").val(veh.motor_arrangement_mode);
								$("#djlqfs").val(veh.motor_cooling_mode);
								$("#djtype").val(veh.motor_model);
								$("#djeddy").val(veh.motor_rated_voltage);
								$("#djzdgzdl").val(veh.motor_maximum_working_current);
								$("#djfzpower").val(veh.motor_peak_power);
								$("#djrpm").val(veh.motor_maximum_speed);
								$("#batnums").val(veh.battery_type);
								$("#batno").val(veh.battery_system_code);
								$("#batenery").val(veh.total_battery_energy);
								$("#battype").val(veh.battery_type);
								$("#dclqfs").val(veh.battery_cooling_mode);

							
						}
			});
				 $('.addvehicle').removeClass("hide");
				 $('.checkList-table').addClass("hide");
				 $("#addmodfyBtn").text('修改');
				
			}
	  });
	  
	  
	  
	  //点击删除按钮
	  
/*	  $('#table_clgl tbody').on('click', 'tr input.minimal', function () {
          var $tr = $(this).parents('tr');
          $tr.toggleClass('selected');
          var $tmp = $('input.minimal:checkbox');
          $('#table_clgl').prop('checked', $tmp.length == $tmp.filter(':checked').length);

      });

      $('.delUser').click(function () {
          table_clgl.rows('.selected').remove().draw(false);
          if ( $("#checkAll").prop("checked") === true ) {
               $("input.minimal").prop("checked", false);
          }
      });*/
	  
	  
	  
	  $("#deleteVecBtn").click(function(){
		 
		  $('.checkList-table').removeClass("hide");
		  $('.addvehicle').addClass("hide");
			var obj = $("#vecManagerList input[type='checkbox']:checked");

			check_val = [];
			for (k in obj) {
				if (obj[k].checked)
					check_val.push(obj[k].value);
			}
		  
			var ids='';
			$("#vecManagerList input[type='checkbox']:checked").each(
					function() {
						
						ids+=$(this).val()+",";
					});
			
			
			
		  if(check_val.length==0)
			 {
			  	alert("请选择车辆");
			 }
		  else
			 {
			  
			  	$.ajax({
			  		type:"post",
			  		url:"deleteVeh.do",
			  		data:{"ids":ids},
			  		dataType:"json",
			  		async:true,
			  		success:function(list2)
			  		{
			  			if(list2.length==0)
			  				alert("删除成功");
			  			else 
			  				alert("删除失败");
			  		}
			  		
			  	});
			  
			  
			 }
	  });
	  
	
	  //批量添加
	  $("#addmore").click(function(){
		 
		  var orgid=$("#orgids1").val();
		  
		  $("#more").submit();
		  
		  $.ajax({
			 type:"post",
			 url:"bbb.do",
			data:{"orgids":orgid},
		  	dataType:"json",
	  		async:true,
	  		success:function(l)
	  		{
	  			if(l[0]==0)
	  			{
	  				alert("表头长度不正确");
	  			}
	  			else if(l[0]==1)
	  			{
	  				alert("表头格式不正确");
	  			}
	  			else if(l[0]==2)
	  			{
	  				alert("表中数据格式有误");
	  			}
	  			else if(l[0]==3)
	  			{
	  				alert("添加成功");
	  			}
	  				
	  		}
			  
		  });
		  
		  
	  });
	  
	  
});