$(function() {

	// 查询
	$("#cxBtn1").click(function() {
		var obj = $("#zdcheck input[type='checkbox']:checked");
		if (obj.length > 1)
			alert("不支持多车辆查询");
		else if (obj.length == 0)
			alert("请选择车辆");
		else {
			var id = obj.val();
			/* 判断是否选取查询选项 */
			var cxobj = $(".zdcx input[type='checkbox']:checked");
			var cxid;
			var s = '';
			$(".zdcx input[type='checkbox']:checked").each(function() {
				cxid = $(this).val();
				s += cxid + '|';
			});

			if (cxobj.length == 0)
				alert("请选择查询选项");
			else if (cxid == 129)
				alert("不支持切换平查询");
			else
				xfrunOne(id, 128, s);

		}

	});

	// 设置
	$("#szBtn1").click(
			function() {

				// 获取选取的车辆
				var obj = $("#zdcheck input[type='checkbox']:checked");

				check_val = [];
				for (k in obj) {
					if (obj[k].checked)
						check_val.push(obj[k].value);
				}

				// 获取查询或者设置的选项
				var inputval;
				var s = '';
				var cmdid = '';
				var allVin = '';
				$(".zdcx input[type='checkbox']:checked").each(
						function() {
							cmdid += $(this).val() + ",";
							if ($(this).val() == 129) {
								var ip = $("#ip").val();
								var port = $("#port").val();
								for ( var b = 0; b < check_val.length; b++) {
									s += $(this).val()
											+ ","
											+ $("#zdcheck").find(
													'input[value='
															+ check_val[b]
															+ ']').parent()
													.parent().children().eq(2)
													.text() + ";" + port + ";"
											+ ip + " ";
								}

							} else {
								inputval = $(this).parent().parent().parent()
										.parent().parent().find(
												'input[type="text"]').val();
								// inputval=$(this).parent().parent().parent().parent().children().eq(1).children("input").val();
								s += $(this).val() + "," + inputval + "|";
							}
						});

				if (check_val.length == 0)
					alert("请选择车辆");
				else if (inputval == "")
					alert("设置选项参数不能为空");
				else if (s == '')
					{
						alert("请选取设置条件");
					}
				else if (cmdid.indexOf('129') > 0)
					alert("平台切换不支持多项同时进行");
				else {
					// 如果是129，129
					if (cmdid.indexOf('129') == 0) {
						var allVid = '';
						for ( var a = 0; a < check_val.length; a++) {
							allVid += check_val[a] + ",";
						}
						qpt(allVid, 129, s)

					}else if(cmdid.indexOf('132') == 0) 
					{
						
						var context="132,";
						context+=$("#tzzdsz input[type='checkbox']:checked").length+"'";
						
						$("#tzzdsz input[type='checkbox']:checked").each(
								function() {
									if($(this).val()==1321)
									{
											context+=1+"?";
											if($("#modiVin").val().length!=17)
											{
												alert("VIN不正确");
												context="";
												return false;
											}
											else
											{
												context+=$("#modiVin").val()+"!";
											}
											
									}
									if($(this).val()==1322)
									{
											context+="2?";
											var obj=$("input[name='wake']");
											for(var i=0; i<obj.length; i ++){
										        if(obj[i].checked){
										            if(obj[i].value==13221)
										            {
										            	context+="1!";
										            }
										            else
										            {
										            	context+="0!";
										            }
										        }
										    }
									}
									if($(this).val()==1323)
									{
										context+="3?";
										reg=/^[0-9_]+$/;
										if(!reg.test($("#hxsj").val()))
										{
											alert("唤醒时间不正确");
											context="";
											return false;
										}
										else
										{
											context+=$("#hxsj").val()+"!";
										}
									}
									if($(this).val()==1324)
									{
										context+="4?";
										var obj=$("input[name='sleep']");
										for(var i=0; i<obj.length; i ++){
									        if(obj[i].checked){
									            if(obj[i].value==13241)
									            {
									            	context+="1!";
									            }
									            else
									            {
									            	context+="0!";
									            }
									        }
									    }
									}
									if($(this).val()==1325)
									{
										context+="5?";
										reg=/^[0-9_]+$/;
										if(!reg.test($("#xmsj").val()))
										{
											alert("休眠时间不正确");
											context="";
											return false;
										}
										else
										{
											context+=$("#xmsj").val()+"!";
										}
									}
									if($(this).val()==1326)
									{
										context+="6?";
										var obj=$("input[name='IP1']");
										for(var i=0; i<obj.length; i ++){
									        if(obj[i].checked){
									            if(obj[i].value==13261)
									            {
									            	context+="1:";
									            	reg=/^[0-9_]+$/;
									            	if(!reg.test($("#port1").val()))
									            	{
									            		alert("端口格式不对");
									            		context="";
														return false;
									            	}
									            	else
									            	{
									            		context+=$("#port1").val()+":";
									            	}
									            	
									            	if($("#ip1").val()=='')
									            	{
									            		alert("ip1不能为空");
									            		context="";
														return false;
									            	}
									            	else
									            	{
									            		context+=$("#ip1").val()+";!";
									            	}
									            }
									            else
									            {
									            	context+="0:1234:127.0.0.1;!";
									            }
									        }
									    }
									}
									if($(this).val()==1327)
									{

										context+="7?";
										var obj=$("input[name='IP2']");
										for(var i=0; i<obj.length; i ++){
									        if(obj[i].checked){
									            if(obj[i].value==13271)
									            {
									            	context+="1:";
									            	reg=/^[0-9_]+$/;
									            	if(!reg.test($("#port2").val()))
									            	{
									            		alert("端口格式不对");
									            		context="";
														return false;
									            	}
									            	else
									            	{
									            		context+=$("#port2").val()+":";
									            	}
									            	
									            	if($("#ip2").val()=='')
									            	{
									            		alert("ip2不能为空");
									            		context="";
														return false;
									            	}
									            	else
									            	{
									            		context+=$("#ip2").val()+";!";
									            	}
									            }
									            else
									            {
									            	context+="0:1234:127.0.0.1;!";
									            }
									        }
									    }
									
									}
									if($(this).val()==1328)
									{

										context+="8?";
										var obj=$("input[name='IP3']");
										for(var i=0; i<obj.length; i ++){
									        if(obj[i].checked){
									            if(obj[i].value==13281)
									            {
									            	context+="1:";
									            	reg=/^[0-9_]+$/;
									            	if(!reg.test($("#port3").val()))
									            	{
									            		alert("端口格式不对");
									            		context="";
														return false;
									            	}
									            	else
									            	{
									            		context+=$("#port3").val()+":";
									            	}
									            	
									            	if($("#ip3").val()=='')
									            	{
									            		alert("ip3不能为空");
									            		context="";
														return false;
									            	}
									            	else
									            	{
									            		context+=$("#ip3").val()+";!";
									            	}
									            }
									            else
									            {
									            	context+="0:1234:127.0.0.1;!";
									            }
									        }
									    }
									
									}
								
								});
						
						if(context=="132,0'")
						{
							alert("请选择正确的选项");
						}
						else if(context!='')
						{
							xfrunOne(check_val[0], 129, context);
						}
						
						
						
						
					}
					else {
						if (check_val.length == 1) {
							xfrunOne(check_val[0], 129, s);
						} else {

							var allVid = '';
							for ( var a = 0; a < check_val.length; a++) {
								allVid += check_val[a] + ",";
							}
							xfrunMore(allVid, 129, s);
						}
					}

				}

				// var obj1=$(".cxxx input[type='checkbox']:checked");
				//		    
				// check_val1 = [];
				// for(k in obj1){
				// if(obj1[k].checked)
				// check_val1.push(obj1[k].value);
				// }
			});

	// 控制
	$("#kzBtn1").click(
			function() {
				// 获取选取的车辆
				var obj = $("#zdcheck input[type='checkbox']:checked");

				check_val = [];
				for (k in obj) {
					if (obj[k].checked)
						check_val.push(obj[k].value);
				}
				//		
				//		
				// var obj1=$(".control-list input[type='radio']:checked");

				var radioval = $('#zdkzlb input:radio:checked').val();
				var s = '';
				if (radioval != 1) {
					s = radioval;
				} else {
					if ($(".uname").val() == "" || $(".pword").val() == ""
							|| $(".ftpip").val() == ""
							|| $(".ftpport").val() == ""
							|| $(".filename").val() == "") {
						s = '';
					} else {
						s = radioval + ",ftp://" + $(".uname").val() + ":"
								+ $(".pword").val() + ":" + $(".ftpip").val()
								+ ":" + $(".ftpport").val() + "/"
								+ $(".filename").val();
					}

				}

				if (check_val.length == 0)
					alert("请选取车辆");
				else if (s == '')
					alert("升级信息不完善");
				else {
					var allVid = '';
					for ( var a = 0; a < check_val.length; a++) {
						allVid += check_val[a] + ",";
					}

					kz(allVid, 130, s);
				}

			});

	// 取消
	$("#qxBtn1").click(function() {
		$(".cxxx").find("input[type='text']").val("");
	});

	// $("input[type='radio']").on('ifChecked', function () {
	// if($(this).val()==1)
	// $("#sjdiv").removeClass("hide");
	// else
	// $("#sjdiv").addClass("hide");
	//		
	// });

	// 升级的
	$("#sss").on('ifChecked', function() {
		$("#sjdiv").removeClass("hide");
	});
	$("#sss").on('ifUnchecked', function() {
		$("#sjdiv").addClass("hide");
	});

	// 选中
	$(".cxxx td>div.clo-md-5 input ").not("#setMore,#ssb").on('ifChecked', function(event){
        $('#setMore,#ssb').iCheck('unCheck');
        $(".setMoreBox").slideUp(500);
    });

    $(".setMoreBox").slideUp(500);
    //选中切换平台
    $('#ssb').on('ifChecked', function(event){
        $('.cxxx td .radio input[type="checkbox"].minimal').not(this).iCheck('unCheck').iCheck('disable');
        
        
    });
    
    //选中参数设置
    $('#setMore').on('ifChecked', function(event){
        $('.cxxx td .radio input[type="checkbox"].minimal').not(this).iCheck('unCheck').iCheck('disable');
        
    });
    $('#ssb').on('ifUnchecked', function(event){
        $('.cxxx td .radio input[type="checkbox"].minimal').not(this).iCheck('enable').iCheck('unCheck');
    });
    $('#setMore').on('ifUnchecked', function(event){
        $('.cxxx td .radio input[type="checkbox"].minimal').not(this).iCheck('enable').iCheck('unCheck');
    });
     $('#setMore').on('ifChecked', function(event){
        $('.setMoreBox .radio input[type="checkbox"].minimal').iCheck('enable').iCheck('check');
        $(".setMoreBox").slideDown();
    });
    $('#setMore').on('ifUnchecked', function(event){
        $(".setMoreBox").slideUp();
    });

	
});

function xfrunOne(v_id, c_id, send_info) {
	$.ajax({
		type : "post",
		url : "insertOne.do",
		data : {
			"v_id" : v_id,
			"c_id" : c_id,
			"send_info" : send_info
		},
		dataType : "json",
		async : true,
		success : function(list) {
			

				if (list.length == 1) {
					if (list[0] == -1 || list[0] == 0)
						alert("服务器ERROR");
					else if (list[0] == 1)
						alert("下发失败，检查终端是否在线");
					else
						alert("设置成功");
				} else {
					
					if (list[0]==132) {
						var a=list[1];
						if (a==1) {
							$("#modiVin").val(list[2]);
							var b=list[3];
							if (b==2) {
								if (list[4]==0) {
									$("#wake1").prop("checked",true);
								} else {
									$("#wake").prop("checked",true);
								}
								var c=list[5];
								if (c==3) {
									$("#hxsj").val(list[6]);
									var d=list[7];
									if (d==4) {
										if (list[8]==0) {
											$("#sleep1").prop("checked",true);
										} else {
											$("#sleep").prop("checked",true);
										}
										var e=list[9];
										if (e==5) {
											$("#xmsj").val(list[10]);
											var f=list[11];
											if (f==6) {
												if (list[12]==0) {
													$("#IP11").prop("checked",true);
												} else {
													$("#IP12").prop("checked",true);
												}
												$("#port1").val(list[13]);
												$("#ip1").val(list[14]);
												var g=list[15];
												if (g==7) {
													if (list[16]==0) {
														$("#IP21").prop("checked",true);
													} else {
														$("#IP22").prop("checked",true);
													}
													$("#port2").val(list[17]);
													$("#ip2").val(list[18]);
													var h=list[19];
													if (h==8) {
														if (list[20]==0) {
															$("#IP31").prop("checked",true);
														} else {
															$("#IP32").prop("checked",true);
														}
														$("#port3").val(list[21]);
														$("#ip3").val(list[22]);
													}
													
												}else if(g==8){
													if (list[16]==0) {
														$("#IP31").prop("checked",true);
													} else {
														$("#IP32").prop("checked",true);
													}
													$("#port3").val(list[17]);
													$("#ip3").val(list[18]);

												}
											}else if(f==7){
												if (list[12]==0) {
													$("#IP21").prop("checked",true);
												} else {
													$("#IP22").prop("checked",true);
												}
												$("#port2").val(list[13]);
												$("#ip2").val(list[14]);
												var h=list[15];
												if (h==8) {
													if (list[16]==0) {
														$("#IP31").prop("checked",true);
													} else {
														$("#IP32").prop("checked",true);
													}
													$("#port3").val(list[17]);
													$("#ip3").val(list[18]);
												}

											}else if(f==8){
												if (list[12]==0) {
													$("#IP31").prop("checked",true);
												} else {
													$("#IP32").prop("checked",true);
												}
												$("#port3").val(list[13]);
												$("#ip3").val(list[14]);

											}
										}else if(e==6){
											if (list[10]==0) {
												$("#IP11").prop("checked",true);
											} else {
												$("#IP12").prop("checked",true);
											}
											$("#port1").val(list[11]);
											$("#ip1").val(list[12]);
											var g=list[13];
											if (g==7) {
												if (list[14]==0) {
													$("#IP21").prop("checked",true);
												} else {
													$("#IP22").prop("checked",true);
												}
												$("#port2").val(list[15]);
												$("#ip2").val(list[16]);
												var h=list[17];
												if (h==8) {
													if (list[18]==0) {
														$("#IP31").prop("checked",true);
													} else {
														$("#IP32").prop("checked",true);
													}
													$("#port3").val(list[19]);
													$("#ip3").val(list[20]);
												}
												
											}else if(g==8){
												if (list[14]==0) {
													$("#IP31").prop("checked",true);
												} else {
													$("#IP32").prop("checked",true);
												}
												$("#port3").val(list[15]);
												$("#ip3").val(list[16]);

											}

										}else if(e==7){
											if (list[10]==0) {
												$("#IP21").prop("checked",true);
											} else {
												$("#IP22").prop("checked",true);
											}
											$("#port2").val(list[11]);
											$("#ip2").val(list[12]);
											var h=list[13];
											if (h==8) {
												if (list[14]==0) {
													$("#IP31").prop("checked",true);
												} else {
													$("#IP32").prop("checked",true);
												}
												$("#port3").val(list[15]);
												$("#ip3").val(list[16]);
											}

										}else if(e==8){
											if (list[10]==0) {
												$("#IP31").prop("checked",true);
											} else {
												$("#IP32").prop("checked",true);
											}
											$("#port3").val(list[11]);
											$("#ip3").val(list[12]);

										}
										
									}else if(d==5){
										$("#xmsj").val(list[8]);
										var f=list[9];
										if (f==6) {
											if (list[10]==0) {
												$("#IP11").prop("checked",true);
											} else {
												$("#IP12").prop("checked",true);
											}
											$("#port1").val(list[11]);
											$("#ip1").val(list[12]);
											var g=list[13];
											if (g==7) {
												if (list[14]==0) {
													$("#IP21").prop("checked",true);
												} else {
													$("#IP22").prop("checked",true);
												}
												$("#port2").val(list[15]);
												$("#ip2").val(list[16]);
												var h=list[17];
												if (h==8) {
													if (list[18]==0) {
														$("#IP31").prop("checked",true);
													} else {
														$("#IP32").prop("checked",true);
													}
													$("#port3").val(list[19]);
													$("#ip3").val(list[20]);
												}
												
											}else if(g==8){
												if (list[14]==0) {
													$("#IP31").prop("checked",true);
												} else {
													$("#IP32").prop("checked",true);
												}
												$("#port3").val(list[15]);
												$("#ip3").val(list[16]);

											}
										}else if(f==7){
											if (list[10]==0) {
												$("#IP21").prop("checked",true);
											} else {
												$("#IP22").prop("checked",true);
											}
											$("#port2").val(list[11]);
											$("#ip2").val(list[12]);
											var h=list[13];
											if (h==8) {
												if (list[14]==0) {
													$("#IP31").prop("checked",true);
												} else {
													$("#IP32").prop("checked",true);
												}
												$("#port3").val(list[15]);
												$("#ip3").val(list[16]);
											}

										}else if(f==8){
											if (list[10]==0) {
												$("#IP31").prop("checked",true);
											} else {
												$("#IP32").prop("checked",true);
											}
											$("#port3").val(list[11]);
											$("#ip3").val(list[12]);

										}

									}else if(d==6){
										if (list[8]==0) {
											$("#IP11").prop("checked",true);
										} else {
											$("#IP12").prop("checked",true);
										}
										$("#port1").val(list[9]);
										$("#ip1").val(list[10]);
										var g=list[11];
										if (g==7) {
											if (list[12]==0) {
												$("#IP21").prop("checked",true);
											} else {
												$("#IP22").prop("checked",true);
											}
											$("#port2").val(list[13]);
											$("#ip2").val(list[14]);
											var h=list[15];
											if (h==8) {
												if (list[16]==0) {
													$("#IP31").prop("checked",true);
												} else {
													$("#IP32").prop("checked",true);
												}
												$("#port3").val(list[17]);
												$("#ip3").val(list[18]);
											}
											
										}else if(g==8){
											if (list[12]==0) {
												$("#IP31").prop("checked",true);
											} else {
												$("#IP32").prop("checked",true);
											}
											$("#port3").val(list[13]);
											$("#ip3").val(list[14]);

										}

									}else if(d==7){
										if (list[8]==0) {
											$("#IP21").prop("checked",true);
										} else {
											$("#IP22").prop("checked",true);
										}
										$("#port2").val(list[9]);
										$("#ip2").val(list[10]);
										var h=list[11];
										if (h==8) {
											if (list[12]==0) {
												$("#IP31").prop("checked",true);
											} else {
												$("#IP32").prop("checked",true);
											}
											$("#port3").val(list[13]);
											$("#ip3").val(list[14]);
										}

									}else if(d==8){
										if (list[8]==0) {
											$("#IP31").prop("checked",true);
										} else {
											$("#IP32").prop("checked",true);
										}
										$("#port3").val(list[9]);
										$("#ip3").val(list[10]);

									}
									
								}else if(c==4){
									if (list[6]==0) {
										$("#sleep1").prop("checked",true);
									} else {
										$("#sleep").prop("checked",true);
									}
									var e=list[7];
									if (e==5) {
										$("#xmsj").val(list[8]);
										var f=list[9];
										if (f==6) {
											if (list[10]==0) {
												$("#IP11").prop("checked",true);
											} else {
												$("#IP12").prop("checked",true);
											}
											$("#port1").val(list[11]);
											$("#ip1").val(list[12]);
											var g=list[13];
											if (g==7) {
												if (list[14]==0) {
													$("#IP21").prop("checked",true);
												} else {
													$("#IP22").prop("checked",true);
												}
												$("#port2").val(list[15]);
												$("#ip2").val(list[16]);
												var h=list[17];
												if (h==8) {
													if (list[18]==0) {
														$("#IP31").prop("checked",true);
													} else {
														$("#IP32").prop("checked",true);
													}
													$("#port3").val(list[19]);
													$("#ip3").val(list[20]);
												}
												
											}else if(g==8){
												if (list[14]==0) {
													$("#IP31").prop("checked",true);
												} else {
													$("#IP32").prop("checked",true);
												}
												$("#port3").val(list[15]);
												$("#ip3").val(list[16]);

											}
										}else if(f==7){
											if (list[10]==0) {
												$("#IP21").prop("checked",true);
											} else {
												$("#IP22").prop("checked",true);
											}
											$("#port2").val(list[11]);
											$("#ip2").val(list[12]);
											var h=list[13];
											if (h==8) {
												if (list[14]==0) {
													$("#IP31").prop("checked",true);
												} else {
													$("#IP32").prop("checked",true);
												}
												$("#port3").val(list[15]);
												$("#ip3").val(list[16]);
											}

										}else if(f==8){
											if (list[10]==0) {
												$("#IP31").prop("checked",true);
											} else {
												$("#IP32").prop("checked",true);
											}
											$("#port3").val(list[11]);
											$("#ip3").val(list[12]);

										}
									}else if(e==6){
										if (list[8]==0) {
											$("#IP11").prop("checked",true);
										} else {
											$("#IP12").prop("checked",true);
										}
										$("#port1").val(list[9]);
										$("#ip1").val(list[10]);
										var g=list[11];
										if (g==7) {
											if (list[12]==0) {
												$("#IP21").prop("checked",true);
											} else {
												$("#IP22").prop("checked",true);
											}
											$("#port2").val(list[13]);
											$("#ip2").val(list[14]);
											var h=list[15];
											if (h==8) {
												if (list[16]==0) {
													$("#IP31").prop("checked",true);
												} else {
													$("#IP32").prop("checked",true);
												}
												$("#port3").val(list[17]);
												$("#ip3").val(list[18]);
											}
											
										}else if(g==8){
											if (list[12]==0) {
												$("#IP31").prop("checked",true);
											} else {
												$("#IP32").prop("checked",true);
											}
											$("#port3").val(list[13]);
											$("#ip3").val(list[14]);

										}

									}else if(e==7){
										if (list[8]==0) {
											$("#IP21").prop("checked",true);
										} else {
											$("#IP22").prop("checked",true);
										}
										$("#port2").val(list[9]);
										$("#ip2").val(list[10]);
										var h=list[11];
										if (h==8) {
											if (list[12]==0) {
												$("#IP31").prop("checked",true);
											} else {
												$("#IP32").prop("checked",true);
											}
											$("#port3").val(list[13]);
											$("#ip3").val(list[14]);
										}

									}else if(e==8){
										if (list[8]==0) {
											$("#IP31").prop("checked",true);
										} else {
											$("#IP32").prop("checked",true);
										}
										$("#port3").val(list[9]);
										$("#ip3").val(list[10]);

									}

								}else if(c==5){
									$("#xmsj").val(list[6]);
									var f=list[7];
									if (f==6) {
										if (list[8]==0) {
											$("#IP11").prop("checked",true);
										} else {
											$("#IP12").prop("checked",true);
										}
										$("#port1").val(list[9]);
										$("#ip1").val(list[10]);
										var g=list[11];
										if (g==7) {
											if (list[12]==0) {
												$("#IP21").prop("checked",true);
											} else {
												$("#IP22").prop("checked",true);
											}
											$("#port2").val(list[13]);
											$("#ip2").val(list[14]);
											var h=list[15];
											if (h==8) {
												if (list[16]==0) {
													$("#IP31").prop("checked",true);
												} else {
													$("#IP32").prop("checked",true);
												}
												$("#port3").val(list[17]);
												$("#ip3").val(list[18]);
											}
											
										}else if(g==8){
											if (list[12]==0) {
												$("#IP31").prop("checked",true);
											} else {
												$("#IP32").prop("checked",true);
											}
											$("#port3").val(list[13]);
											$("#ip3").val(list[14]);

										}
									}else if(f==7){
										if (list[8]==0) {
											$("#IP21").prop("checked",true);
										} else {
											$("#IP22").prop("checked",true);
										}
										$("#port2").val(list[9]);
										$("#ip2").val(list[10]);
										var h=list[11];
										if (h==8) {
											if (list[12]==0) {
												$("#IP31").prop("checked",true);
											} else {
												$("#IP32").prop("checked",true);
											}
											$("#port3").val(list[13]);
											$("#ip3").val(list[14]);
										}

									}else if(f==8){
										if (list[8]==0) {
											$("#IP31").prop("checked",true);
										} else {
											$("#IP32").prop("checked",true);
										}
										$("#port3").val(list[9]);
										$("#ip3").val(list[10]);

									}

								}else if(c==6){
									if (list[6]==0) {
										$("#IP11").prop("checked",true);
									} else {
										$("#IP12").prop("checked",true);
									}
									$("#port1").val(list[7]);
									$("#ip1").val(list[8]);
									var g=list[9];
									if (g==7) {
										if (list[10]==0) {
											$("#IP21").prop("checked",true);
										} else {
											$("#IP22").prop("checked",true);
										}
										$("#port2").val(list[11]);
										$("#ip2").val(list[12]);
										var h=list[13];
										if (h==8) {
											if (list[14]==0) {
												$("#IP31").prop("checked",true);
											} else {
												$("#IP32").prop("checked",true);
											}
											$("#port3").val(list[15]);
											$("#ip3").val(list[16]);
										}
										
									}else if(g==8){
										if (list[10]==0) {
											$("#IP31").prop("checked",true);
										} else {
											$("#IP32").prop("checked",true);
										}
										$("#port3").val(list[11]);
										$("#ip3").val(list[12]);

									}

								}else if(c==7){
									if (list[6]==0) {
										$("#IP21").prop("checked",true);
									} else {
										$("#IP22").prop("checked",true);
									}
									$("#port2").val(list[7]);
									$("#ip2").val(list[8]);
									var h=list[9];
									if (h==8) {
										if (list[10]==0) {
											$("#IP31").prop("checked",true);
										} else {
											$("#IP32").prop("checked",true);
										}
										$("#port3").val(list[11]);
										$("#ip3").val(list[12]);
									}

								}else if(c==8){
									if (list[6]==0) {
										$("#IP31").prop("checked",true);
									} else {
										$("#IP32").prop("checked",true);
									}
									$("#port3").val(list[7]);
									$("#ip3").val(list[8]);

								}
								
							}else if(b==3){
								$("#hxsj").val(list[4]);
								var d=list[5];
								if (d==4) {
									if (list[6]==0) {
										$("#sleep1").prop("checked",true);
									} else {
										$("#sleep").prop("checked",true);
									}
									var e=list[7];
									if (e==5) {
										$("#xmsj").val(list[8]);
										var f=list[9];
										if (f==6) {
											if (list[10]==0) {
												$("#IP11").prop("checked",true);
											} else {
												$("#IP12").prop("checked",true);
											}
											$("#port1").val(list[11]);
											$("#ip1").val(list[12]);
											var g=list[13];
											if (g==7) {
												if (list[14]==0) {
													$("#IP21").prop("checked",true);
												} else {
													$("#IP22").prop("checked",true);
												}
												$("#port2").val(list[15]);
												$("#ip2").val(list[16]);
												var h=list[17];
												if (h==8) {
													if (list[18]==0) {
														$("#IP31").prop("checked",true);
													} else {
														$("#IP32").prop("checked",true);
													}
													$("#port3").val(list[19]);
													$("#ip3").val(list[20]);
												}
												
											}else if(g==8){
												if (list[14]==0) {
													$("#IP31").prop("checked",true);
												} else {
													$("#IP32").prop("checked",true);
												}
												$("#port3").val(list[15]);
												$("#ip3").val(list[16]);

											}
										}else if(f==7){
											if (list[8]==0) {
												$("#IP21").prop("checked",true);
											} else {
												$("#IP22").prop("checked",true);
											}
											$("#port2").val(list[9]);
											$("#ip2").val(list[10]);
											var h=list[11];
											if (h==8) {
												if (list[12]==0) {
													$("#IP31").prop("checked",true);
												} else {
													$("#IP32").prop("checked",true);
												}
												$("#port3").val(list[13]);
												$("#ip3").val(list[14]);
											}

										}else if(f==8){
											if (list[8]==0) {
												$("#IP31").prop("checked",true);
											} else {
												$("#IP32").prop("checked",true);
											}
											$("#port3").val(list[9]);
											$("#ip3").val(list[10]);

										}
									}else if(e==6){
										if (list[8]==0) {
											$("#IP11").prop("checked",true);
										} else {
											$("#IP12").prop("checked",true);
										}
										$("#port1").val(list[9]);
										$("#ip1").val(list[10]);
										var g=list[11];
										if (g==7) {
											if (list[12]==0) {
												$("#IP21").prop("checked",true);
											} else {
												$("#IP22").prop("checked",true);
											}
											$("#port2").val(list[13]);
											$("#ip2").val(list[14]);
											var h=list[15];
											if (h==8) {
												if (list[16]==0) {
													$("#IP31").prop("checked",true);
												} else {
													$("#IP32").prop("checked",true);
												}
												$("#port3").val(list[17]);
												$("#ip3").val(list[18]);
											}
											
										}else if(g==8){
											if (list[12]==0) {
												$("#IP31").prop("checked",true);
											} else {
												$("#IP32").prop("checked",true);
											}
											$("#port3").val(list[13]);
											$("#ip3").val(list[14]);

										}

									}else if(e==7){
										if (list[8]==0) {
											$("#IP21").prop("checked",true);
										} else {
											$("#IP22").prop("checked",true);
										}
										$("#port2").val(list[9]);
										$("#ip2").val(list[10]);
										var h=list[11];
										if (h==8) {
											if (list[12]==0) {
												$("#IP31").prop("checked",true);
											} else {
												$("#IP32").prop("checked",true);
											}
											$("#port3").val(list[13]);
											$("#ip3").val(list[14]);
										}

									}else if(e==8){
										if (list[8]==0) {
											$("#IP31").prop("checked",true);
										} else {
											$("#IP32").prop("checked",true);
										}
										$("#port3").val(list[9]);
										$("#ip3").val(list[10]);

									}
									
								}else if(d==5){
									$("#xmsj").val(list[6]);
									var f=list[7];
									if (f==6) {
										if (list[8]==0) {
											$("#IP11").prop("checked",true);
										} else {
											$("#IP12").prop("checked",true);
										}
										$("#port1").val(list[9]);
										$("#ip1").val(list[10]);
										var g=list[11];
										if (g==7) {
											if (list[12]==0) {
												$("#IP21").prop("checked",true);
											} else {
												$("#IP22").prop("checked",true);
											}
											$("#port2").val(list[13]);
											$("#ip2").val(list[14]);
											var h=list[15];
											if (h==8) {
												if (list[16]==0) {
													$("#IP31").prop("checked",true);
												} else {
													$("#IP32").prop("checked",true);
												}
												$("#port3").val(list[17]);
												$("#ip3").val(list[18]);
											}
											
										}else if(g==8){
											if (list[12]==0) {
												$("#IP31").prop("checked",true);
											} else {
												$("#IP32").prop("checked",true);
											}
											$("#port3").val(list[13]);
											$("#ip3").val(list[14]);

										}
									}else if(f==7){
										if (list[8]==0) {
											$("#IP21").prop("checked",true);
										} else {
											$("#IP22").prop("checked",true);
										}
										$("#port2").val(list[9]);
										$("#ip2").val(list[10]);
										var h=list[11];
										if (h==8) {
											if (list[12]==0) {
												$("#IP31").prop("checked",true);
											} else {
												$("#IP32").prop("checked",true);
											}
											$("#port3").val(list[13]);
											$("#ip3").val(list[14]);
										}

									}else if(f==8){
										if (list[8]==0) {
											$("#IP31").prop("checked",true);
										} else {
											$("#IP32").prop("checked",true);
										}
										$("#port3").val(list[9]);
										$("#ip3").val(list[10]);

									}

								}else if(d==6){
									if (list[6]==0) {
										$("#IP11").prop("checked",true);
									} else {
										$("#IP12").prop("checked",true);
									}
									$("#port1").val(list[7]);
									$("#ip1").val(list[8]);
									var g=list[9];
									if (g==7) {
										if (list[10]==0) {
											$("#IP21").prop("checked",true);
										} else {
											$("#IP22").prop("checked",true);
										}
										$("#port2").val(list[11]);
										$("#ip2").val(list[12]);
										var h=list[13];
										if (h==8) {
											if (list[14]==0) {
												$("#IP31").prop("checked",true);
											} else {
												$("#IP32").prop("checked",true);
											}
											$("#port3").val(list[15]);
											$("#ip3").val(list[16]);
										}
										
									}else if(g==8){
										if (list[10]==0) {
											$("#IP31").prop("checked",true);
										} else {
											$("#IP32").prop("checked",true);
										}
										$("#port3").val(list[11]);
										$("#ip3").val(list[12]);

									}

								}else if(d==7){
									if (list[6]==0) {
										$("#IP21").prop("checked",true);
									} else {
										$("#IP22").prop("checked",true);
									}
									$("#port2").val(list[7]);
									$("#ip2").val(list[8]);
									var h=list[9];
									if (h==8) {
										if (list[10]==0) {
											$("#IP31").prop("checked",true);
										} else {
											$("#IP32").prop("checked",true);
										}
										$("#port3").val(list[11]);
										$("#ip3").val(list[12]);
									}

								}else if(d==8){
									if (list[6]==0) {
										$("#IP31").prop("checked",true);
									} else {
										$("#IP32").prop("checked",true);
									}
									$("#port3").val(list[7]);
									$("#ip3").val(list[8]);

								}

							}else if(b==4){
								if (list[4]==0) {
									$("#sleep1").prop("checked",true);
								} else {
									$("#sleep").prop("checked",true);
								}
								var e=list[5];
								if (e==5) {
									$("#xmsj").val(list[6]);
									var f=list[7];
									if (f==6) {
										if (list[8]==0) {
											$("#IP11").prop("checked",true);
										} else {
											$("#IP12").prop("checked",true);
										}
										$("#port1").val(list[9]);
										$("#ip1").val(list[10]);
										var g=list[11];
										if (g==7) {
											if (list[12]==0) {
												$("#IP21").prop("checked",true);
											} else {
												$("#IP22").prop("checked",true);
											}
											$("#port2").val(list[13]);
											$("#ip2").val(list[14]);
											var h=list[15];
											if (h==8) {
												if (list[16]==0) {
													$("#IP31").prop("checked",true);
												} else {
													$("#IP32").prop("checked",true);
												}
												$("#port3").val(list[17]);
												$("#ip3").val(list[18]);
											}
											
										}else if(g==8){
											if (list[12]==0) {
												$("#IP31").prop("checked",true);
											} else {
												$("#IP32").prop("checked",true);
											}
											$("#port3").val(list[13]);
											$("#ip3").val(list[14]);

										}
									}else if(f==7){
										if (list[6]==0) {
											$("#IP21").prop("checked",true);
										} else {
											$("#IP22").prop("checked",true);
										}
										$("#port2").val(list[7]);
										$("#ip2").val(list[8]);
										var h=list[9];
										if (h==8) {
											if (list[10]==0) {
												$("#IP31").prop("checked",true);
											} else {
												$("#IP32").prop("checked",true);
											}
											$("#port3").val(list[11]);
											$("#ip3").val(list[12]);
										}

									}else if(f==8){
										if (list[6]==0) {
											$("#IP31").prop("checked",true);
										} else {
											$("#IP32").prop("checked",true);
										}
										$("#port3").val(list[7]);
										$("#ip3").val(list[8]);

									}
								}else if(e==6){
									if (list[6]==0) {
										$("#IP11").prop("checked",true);
									} else {
										$("#IP12").prop("checked",true);
									}
									$("#port1").val(list[7]);
									$("#ip1").val(list[8]);
									var g=list[9];
									if (g==7) {
										if (list[10]==0) {
											$("#IP21").prop("checked",true);
										} else {
											$("#IP22").prop("checked",true);
										}
										$("#port2").val(list[11]);
										$("#ip2").val(list[12]);
										var h=list[13];
										if (h==8) {
											if (list[14]==0) {
												$("#IP31").prop("checked",true);
											} else {
												$("#IP32").prop("checked",true);
											}
											$("#port3").val(list[15]);
											$("#ip3").val(list[16]);
										}
										
									}else if(g==8){
										if (list[10]==0) {
											$("#IP31").prop("checked",true);
										} else {
											$("#IP32").prop("checked",true);
										}
										$("#port3").val(list[11]);
										$("#ip3").val(list[12]);

									}

								}else if(e==7){
									if (list[6]==0) {
										$("#IP21").prop("checked",true);
									} else {
										$("#IP22").prop("checked",true);
									}
									$("#port2").val(list[7]);
									$("#ip2").val(list[8]);
									var h=list[9];
									if (h==8) {
										if (list[10]==0) {
											$("#IP31").prop("checked",true);
										} else {
											$("#IP32").prop("checked",true);
										}
										$("#port3").val(list[11]);
										$("#ip3").val(list[12]);
									}

								}else if(e==8){
									if (list[6]==0) {
										$("#IP31").prop("checked",true);
									} else {
										$("#IP32").prop("checked",true);
									}
									$("#port3").val(list[7]);
									$("#ip3").val(list[8]);

								}

							}else if(b==5){
								$("#xmsj").val(list[4]);
								var f=list[5];
								if (f==6) {
									if (list[6]==0) {
										$("#IP11").prop("checked",true);
									} else {
										$("#IP12").prop("checked",true);
									}
									$("#port1").val(list[7]);
									$("#ip1").val(list[8]);
									var g=list[9];
									if (g==7) {
										if (list[10]==0) {
											$("#IP21").prop("checked",true);
										} else {
											$("#IP22").prop("checked",true);
										}
										$("#port2").val(list[11]);
										$("#ip2").val(list[12]);
										var h=list[13];
										if (h==8) {
											if (list[14]==0) {
												$("#IP31").prop("checked",true);
											} else {
												$("#IP32").prop("checked",true);
											}
											$("#port3").val(list[15]);
											$("#ip3").val(list[16]);
										}
										
									}else if(g==8){
										if (list[10]==0) {
											$("#IP31").prop("checked",true);
										} else {
											$("#IP32").prop("checked",true);
										}
										$("#port3").val(list[11]);
										$("#ip3").val(list[12]);

									}
								}else if(f==7){
									if (list[4]==0) {
										$("#IP21").prop("checked",true);
									} else {
										$("#IP22").prop("checked",true);
									}
									$("#port2").val(list[5]);
									$("#ip2").val(list[6]);
									var h=list[7];
									if (h==8) {
										if (list[8]==0) {
											$("#IP31").prop("checked",true);
										} else {
											$("#IP32").prop("checked",true);
										}
										$("#port3").val(list[9]);
										$("#ip3").val(list[10]);
									}

								}else if(f==8){
									if (list[4]==0) {
										$("#IP31").prop("checked",true);
									} else {
										$("#IP32").prop("checked",true);
									}
									$("#port3").val(list[5]);
									$("#ip3").val(list[6]);

								}

							}else if(b==6){

								if (list[4]==0) {
									$("#IP11").prop("checked",true);
								} else {
									$("#IP12").prop("checked",true);
								}
								$("#port1").val(list[5]);
								$("#ip1").val(list[6]);
								var g=list[7];
								if (g==7) {
									if (list[8]==0) {
										$("#IP21").prop("checked",true);
									} else {
										$("#IP22").prop("checked",true);
									}
									$("#port2").val(list[9]);
									$("#ip2").val(list[10]);
									var h=list[11];
									if (h==8) {
										if (list[12]==0) {
											$("#IP31").prop("checked",true);
										} else {
											$("#IP32").prop("checked",true);
										}
										$("#port3").val(list[13]);
										$("#ip3").val(list[14]);
									}
									
								}else if(g==8){
									if (list[8]==0) {
										$("#IP31").prop("checked",true);
									} else {
										$("#IP32").prop("checked",true);
									}
									$("#port3").val(list[9]);
									$("#ip3").val(list[10]);

								}
							

							}else if(b==7){

								if (list[4]==0) {
									$("#IP21").prop("checked",true);
								} else {
									$("#IP22").prop("checked",true);
								}
								$("#port2").val(list[5]);
								$("#ip2").val(list[6]);
								var h=list[7];
								if (h==8) {
									if (list[8]==0) {
										$("#IP31").prop("checked",true);
									} else {
										$("#IP32").prop("checked",true);
									}
									$("#port3").val(list[9]);
									$("#ip3").val(list[10]);
								}
								
							

							}else if(b==8){
								if (list[4]==0) {
									$("#IP31").prop("checked",true);
								} else {
									$("#IP32").prop("checked",true);
								}
								$("#port3").val(list[5]);
								$("#ip3").val(list[6]);

							}
							
							
						}else if(a==2){

							if (list[2]==0) {
								$("#wake1").prop("checked",true);
							} else {
								$("#wake").prop("checked",true);
							}
							var c=list[3];
							if (c==3) {
								$("#hxsj").val(list[4]);
								var d=list[5];
								if (d==4) {
									if (list[6]==0) {
										$("#sleep1").prop("checked",true);
									} else {
										$("#sleep").prop("checked",true);
									}
									var e=list[7];
									if (e==5) {
										$("#xmsj").val(list[8]);
										var f=list[9];
										if (f==6) {
											if (list[10]==0) {
												$("#IP11").prop("checked",true);
											} else {
												$("#IP12").prop("checked",true);
											}
											$("#port1").val(list[11]);
											$("#ip1").val(list[12]);
											var g=list[13];
											if (g==7) {
												if (list[14]==0) {
													$("#IP21").prop("checked",true);
												} else {
													$("#IP22").prop("checked",true);
												}
												$("#port2").val(list[15]);
												$("#ip2").val(list[16]);
												var h=list[17];
												if (h==8) {
													if (list[18]==0) {
														$("#IP31").prop("checked",true);
													} else {
														$("#IP32").prop("checked",true);
													}
													$("#port3").val(list[19]);
													$("#ip3").val(list[20]);
												}
												
											}else if(g==8){
												if (list[14]==0) {
													$("#IP31").prop("checked",true);
												} else {
													$("#IP32").prop("checked",true);
												}
												$("#port3").val(list[15]);
												$("#ip3").val(list[16]);

											}
										}else if(f==7){
											if (list[10]==0) {
												$("#IP21").prop("checked",true);
											} else {
												$("#IP22").prop("checked",true);
											}
											$("#port2").val(list[11]);
											$("#ip2").val(list[12]);
											var h=list[13];
											if (h==8) {
												if (list[14]==0) {
													$("#IP31").prop("checked",true);
												} else {
													$("#IP32").prop("checked",true);
												}
												$("#port3").val(list[15]);
												$("#ip3").val(list[16]);
											}

										}else if(f==8){
											if (list[10]==0) {
												$("#IP31").prop("checked",true);
											} else {
												$("#IP32").prop("checked",true);
											}
											$("#port3").val(list[11]);
											$("#ip3").val(list[12]);

										}
									}else if(e==6){
										if (list[8]==0) {
											$("#IP11").prop("checked",true);
										} else {
											$("#IP12").prop("checked",true);
										}
										$("#port1").val(list[9]);
										$("#ip1").val(list[10]);
										var g=list[11];
										if (g==7) {
											if (list[12]==0) {
												$("#IP21").prop("checked",true);
											} else {
												$("#IP22").prop("checked",true);
											}
											$("#port2").val(list[13]);
											$("#ip2").val(list[14]);
											var h=list[15];
											if (h==8) {
												if (list[16]==0) {
													$("#IP31").prop("checked",true);
												} else {
													$("#IP32").prop("checked",true);
												}
												$("#port3").val(list[17]);
												$("#ip3").val(list[18]);
											}
											
										}else if(g==8){
											if (list[12]==0) {
												$("#IP31").prop("checked",true);
											} else {
												$("#IP32").prop("checked",true);
											}
											$("#port3").val(list[13]);
											$("#ip3").val(list[14]);

										}

									}else if(e==7){
										if (list[8]==0) {
											$("#IP21").prop("checked",true);
										} else {
											$("#IP22").prop("checked",true);
										}
										$("#port2").val(list[9]);
										$("#ip2").val(list[10]);
										var h=list[11];
										if (h==8) {
											if (list[12]==0) {
												$("#IP31").prop("checked",true);
											} else {
												$("#IP32").prop("checked",true);
											}
											$("#port3").val(list[13]);
											$("#ip3").val(list[14]);
										}

									}else if(e==8){
										if (list[8]==0) {
											$("#IP31").prop("checked",true);
										} else {
											$("#IP32").prop("checked",true);
										}
										$("#port3").val(list[9]);
										$("#ip3").val(list[10]);

									}
									
								}else if(d==5){
									$("#xmsj").val(list[6]);
									var f=list[7];
									if (f==6) {
										if (list[8]==0) {
											$("#IP11").prop("checked",true);
										} else {
											$("#IP12").prop("checked",true);
										}
										$("#port1").val(list[9]);
										$("#ip1").val(list[10]);
										var g=list[11];
										if (g==7) {
											if (list[12]==0) {
												$("#IP21").prop("checked",true);
											} else {
												$("#IP22").prop("checked",true);
											}
											$("#port2").val(list[13]);
											$("#ip2").val(list[14]);
											var h=list[15];
											if (h==8) {
												if (list[16]==0) {
													$("#IP31").prop("checked",true);
												} else {
													$("#IP32").prop("checked",true);
												}
												$("#port3").val(list[17]);
												$("#ip3").val(list[18]);
											}
											
										}else if(g==8){
											if (list[12]==0) {
												$("#IP31").prop("checked",true);
											} else {
												$("#IP32").prop("checked",true);
											}
											$("#port3").val(list[13]);
											$("#ip3").val(list[14]);

										}
									}else if(f==7){
										if (list[8]==0) {
											$("#IP21").prop("checked",true);
										} else {
											$("#IP22").prop("checked",true);
										}
										$("#port2").val(list[9]);
										$("#ip2").val(list[10]);
										var h=list[11];
										if (h==8) {
											if (list[12]==0) {
												$("#IP31").prop("checked",true);
											} else {
												$("#IP32").prop("checked",true);
											}
											$("#port3").val(list[13]);
											$("#ip3").val(list[14]);
										}

									}else if(f==8){
										if (list[8]==0) {
											$("#IP31").prop("checked",true);
										} else {
											$("#IP32").prop("checked",true);
										}
										$("#port3").val(list[9]);
										$("#ip3").val(list[10]);

									}

								}else if(d==6){
									if (list[6]==0) {
										$("#IP11").prop("checked",true);
									} else {
										$("#IP12").prop("checked",true);
									}
									$("#port1").val(list[7]);
									$("#ip1").val(list[8]);
									var g=list[9];
									if (g==7) {
										if (list[10]==0) {
											$("#IP21").prop("checked",true);
										} else {
											$("#IP22").prop("checked",true);
										}
										$("#port2").val(list[11]);
										$("#ip2").val(list[12]);
										var h=list[13];
										if (h==8) {
											if (list[14]==0) {
												$("#IP31").prop("checked",true);
											} else {
												$("#IP32").prop("checked",true);
											}
											$("#port3").val(list[15]);
											$("#ip3").val(list[16]);
										}
										
									}else if(g==8){
										if (list[10]==0) {
											$("#IP31").prop("checked",true);
										} else {
											$("#IP32").prop("checked",true);
										}
										$("#port3").val(list[11]);
										$("#ip3").val(list[12]);

									}

								}else if(d==7){
									if (list[6]==0) {
										$("#IP21").prop("checked",true);
									} else {
										$("#IP22").prop("checked",true);
									}
									$("#port2").val(list[7]);
									$("#ip2").val(list[8]);
									var h=list[9];
									if (h==8) {
										if (list[10]==0) {
											$("#IP31").prop("checked",true);
										} else {
											$("#IP32").prop("checked",true);
										}
										$("#port3").val(list[11]);
										$("#ip3").val(list[12]);
									}

								}else if(d==8){
									if (list[6]==0) {
										$("#IP31").prop("checked",true);
									} else {
										$("#IP32").prop("checked",true);
									}
									$("#port3").val(list[7]);
									$("#ip3").val(list[8]);

								}
								
							}else if(c==4){
								if (list[4]==0) {
									$("#sleep1").prop("checked",true);
								} else {
									$("#sleep").prop("checked",true);
								}
								var e=list[5];
								if (e==5) {
									$("#xmsj").val(list[6]);
									var f=list[7];
									if (f==6) {
										if (list[8]==0) {
											$("#IP11").prop("checked",true);
										} else {
											$("#IP12").prop("checked",true);
										}
										$("#port1").val(list[9]);
										$("#ip1").val(list[10]);
										var g=list[11];
										if (g==7) {
											if (list[12]==0) {
												$("#IP21").prop("checked",true);
											} else {
												$("#IP22").prop("checked",true);
											}
											$("#port2").val(list[13]);
											$("#ip2").val(list[14]);
											var h=list[15];
											if (h==8) {
												if (list[16]==0) {
													$("#IP31").prop("checked",true);
												} else {
													$("#IP32").prop("checked",true);
												}
												$("#port3").val(list[17]);
												$("#ip3").val(list[18]);
											}
											
										}else if(g==8){
											if (list[12]==0) {
												$("#IP31").prop("checked",true);
											} else {
												$("#IP32").prop("checked",true);
											}
											$("#port3").val(list[13]);
											$("#ip3").val(list[14]);

										}
									}else if(f==7){
										if (list[8]==0) {
											$("#IP21").prop("checked",true);
										} else {
											$("#IP22").prop("checked",true);
										}
										$("#port2").val(list[9]);
										$("#ip2").val(list[10]);
										var h=list[11];
										if (h==8) {
											if (list[12]==0) {
												$("#IP31").prop("checked",true);
											} else {
												$("#IP32").prop("checked",true);
											}
											$("#port3").val(list[13]);
											$("#ip3").val(list[14]);
										}

									}else if(f==8){
										if (list[8]==0) {
											$("#IP31").prop("checked",true);
										} else {
											$("#IP32").prop("checked",true);
										}
										$("#port3").val(list[9]);
										$("#ip3").val(list[10]);

									}
								}else if(e==6){
									if (list[6]==0) {
										$("#IP11").prop("checked",true);
									} else {
										$("#IP12").prop("checked",true);
									}
									$("#port1").val(list[7]);
									$("#ip1").val(list[8]);
									var g=list[9];
									if (g==7) {
										if (list[10]==0) {
											$("#IP21").prop("checked",true);
										} else {
											$("#IP22").prop("checked",true);
										}
										$("#port2").val(list[11]);
										$("#ip2").val(list[12]);
										var h=list[13];
										if (h==8) {
											if (list[14]==0) {
												$("#IP31").prop("checked",true);
											} else {
												$("#IP32").prop("checked",true);
											}
											$("#port3").val(list[15]);
											$("#ip3").val(list[16]);
										}
										
									}else if(g==8){
										if (list[10]==0) {
											$("#IP31").prop("checked",true);
										} else {
											$("#IP32").prop("checked",true);
										}
										$("#port3").val(list[11]);
										$("#ip3").val(list[12]);

									}

								}else if(e==7){
									if (list[6]==0) {
										$("#IP21").prop("checked",true);
									} else {
										$("#IP22").prop("checked",true);
									}
									$("#port2").val(list[7]);
									$("#ip2").val(list[8]);
									var h=list[9];
									if (h==8) {
										if (list[10]==0) {
											$("#IP31").prop("checked",true);
										} else {
											$("#IP32").prop("checked",true);
										}
										$("#port3").val(list[11]);
										$("#ip3").val(list[12]);
									}

								}else if(e==8){
									if (list[6]==0) {
										$("#IP31").prop("checked",true);
									} else {
										$("#IP32").prop("checked",true);
									}
									$("#port3").val(list[7]);
									$("#ip3").val(list[8]);

								}

							}else if(c==5){
								$("#xmsj").val(list[4]);
								var f=list[5];
								if (f==6) {
									if (list[6]==0) {
										$("#IP11").prop("checked",true);
									} else {
										$("#IP12").prop("checked",true);
									}
									$("#port1").val(list[7]);
									$("#ip1").val(list[8]);
									var g=list[9];
									if (g==7) {
										if (list[10]==0) {
											$("#IP21").prop("checked",true);
										} else {
											$("#IP22").prop("checked",true);
										}
										$("#port2").val(list[11]);
										$("#ip2").val(list[12]);
										var h=list[13];
										if (h==8) {
											if (list[14]==0) {
												$("#IP31").prop("checked",true);
											} else {
												$("#IP32").prop("checked",true);
											}
											$("#port3").val(list[15]);
											$("#ip3").val(list[16]);
										}
										
									}else if(g==8){
										if (list[10]==0) {
											$("#IP31").prop("checked",true);
										} else {
											$("#IP32").prop("checked",true);
										}
										$("#port3").val(list[11]);
										$("#ip3").val(list[12]);

									}
								}else if(f==7){
									if (list[6]==0) {
										$("#IP21").prop("checked",true);
									} else {
										$("#IP22").prop("checked",true);
									}
									$("#port2").val(list[7]);
									$("#ip2").val(list[8]);
									var h=list[9];
									if (h==8) {
										if (list[10]==0) {
											$("#IP31").prop("checked",true);
										} else {
											$("#IP32").prop("checked",true);
										}
										$("#port3").val(list[11]);
										$("#ip3").val(list[12]);
									}

								}else if(f==8){
									if (list[6]==0) {
										$("#IP31").prop("checked",true);
									} else {
										$("#IP32").prop("checked",true);
									}
									$("#port3").val(list[7]);
									$("#ip3").val(list[8]);

								}

							}else if(c==6){
								if (list[4]==0) {
									$("#IP11").prop("checked",true);
								} else {
									$("#IP12").prop("checked",true);
								}
								$("#port1").val(list[5]);
								$("#ip1").val(list[6]);
								var g=list[7];
								if (g==7) {
									if (list[8]==0) {
										$("#IP21").prop("checked",true);
									} else {
										$("#IP22").prop("checked",true);
									}
									$("#port2").val(list[9]);
									$("#ip2").val(list[10]);
									var h=list[11];
									if (h==8) {
										if (list[12]==0) {
											$("#IP31").prop("checked",true);
										} else {
											$("#IP32").prop("checked",true);
										}
										$("#port3").val(list[13]);
										$("#ip3").val(list[14]);
									}
									
								}else if(g==8){
									if (list[8]==0) {
										$("#IP31").prop("checked",true);
									} else {
										$("#IP32").prop("checked",true);
									}
									$("#port3").val(list[9]);
									$("#ip3").val(list[10]);

								}

							}else if(c==7){
								if (list[4]==0) {
									$("#IP21").prop("checked",true);
								} else {
									$("#IP22").prop("checked",true);
								}
								$("#port2").val(list[5]);
								$("#ip2").val(list[6]);
								var h=list[7];
								if (h==8) {
									if (list[8]==0) {
										$("#IP31").prop("checked",true);
									} else {
										$("#IP32").prop("checked",true);
									}
									$("#port3").val(list[9]);
									$("#ip3").val(list[10]);
								}

							}else if(c==8){
								if (list[4]==0) {
									$("#IP31").prop("checked",true);
								} else {
									$("#IP32").prop("checked",true);
								}
								$("#port3").val(list[5]);
								$("#ip3").val(list[6]);

							}
							
						

							
						}else if(a==3){
							$("#hxsj").val(list[2]);
							var d=list[3];
							if (d==4) {
								if (list[4]==0) {
									$("#sleep1").prop("checked",true);
								} else {
									$("#sleep").prop("checked",true);
								}
								var e=list[5];
								if (e==5) {
									$("#xmsj").val(list[6]);
									var f=list[7];
									if (f==6) {
										if (list[8]==0) {
											$("#IP11").prop("checked",true);
										} else {
											$("#IP12").prop("checked",true);
										}
										$("#port1").val(list[9]);
										$("#ip1").val(list[10]);
										var g=list[11];
										if (g==7) {
											if (list[12]==0) {
												$("#IP21").prop("checked",true);
											} else {
												$("#IP22").prop("checked",true);
											}
											$("#port2").val(list[13]);
											$("#ip2").val(list[14]);
											var h=list[15];
											if (h==8) {
												if (list[16]==0) {
													$("#IP31").prop("checked",true);
												} else {
													$("#IP32").prop("checked",true);
												}
												$("#port3").val(list[17]);
												$("#ip3").val(list[18]);
											}
											
										}else if(g==8){
											if (list[12]==0) {
												$("#IP31").prop("checked",true);
											} else {
												$("#IP32").prop("checked",true);
											}
											$("#port3").val(list[13]);
											$("#ip3").val(list[14]);

										}
									}else if(f==7){
										if (list[8]==0) {
											$("#IP21").prop("checked",true);
										} else {
											$("#IP22").prop("checked",true);
										}
										$("#port2").val(list[9]);
										$("#ip2").val(list[10]);
										var h=list[11];
										if (h==8) {
											if (list[12]==0) {
												$("#IP31").prop("checked",true);
											} else {
												$("#IP32").prop("checked",true);
											}
											$("#port3").val(list[13]);
											$("#ip3").val(list[14]);
										}

									}else if(f==8){
										if (list[8]==0) {
											$("#IP31").prop("checked",true);
										} else {
											$("#IP32").prop("checked",true);
										}
										$("#port3").val(list[9]);
										$("#ip3").val(list[10]);

									}
								}else if(e==6){
									if (list[6]==0) {
										$("#IP11").prop("checked",true);
									} else {
										$("#IP12").prop("checked",true);
									}
									$("#port1").val(list[7]);
									$("#ip1").val(list[8]);
									var g=list[9];
									if (g==7) {
										if (list[10]==0) {
											$("#IP21").prop("checked",true);
										} else {
											$("#IP22").prop("checked",true);
										}
										$("#port2").val(list[11]);
										$("#ip2").val(list[12]);
										var h=list[13];
										if (h==8) {
											if (list[14]==0) {
												$("#IP31").prop("checked",true);
											} else {
												$("#IP32").prop("checked",true);
											}
											$("#port3").val(list[15]);
											$("#ip3").val(list[16]);
										}
										
									}else if(g==8){
										if (list[10]==0) {
											$("#IP31").prop("checked",true);
										} else {
											$("#IP32").prop("checked",true);
										}
										$("#port3").val(list[11]);
										$("#ip3").val(list[12]);

									}

								}else if(e==7){
									if (list[6]==0) {
										$("#IP21").prop("checked",true);
									} else {
										$("#IP22").prop("checked",true);
									}
									$("#port2").val(list[7]);
									$("#ip2").val(list[8]);
									var h=list[9];
									if (h==8) {
										if (list[10]==0) {
											$("#IP31").prop("checked",true);
										} else {
											$("#IP32").prop("checked",true);
										}
										$("#port3").val(list[11]);
										$("#ip3").val(list[12]);
									}

								}else if(e==8){
									if (list[6]==0) {
										$("#IP31").prop("checked",true);
									} else {
										$("#IP32").prop("checked",true);
									}
									$("#port3").val(list[7]);
									$("#ip3").val(list[8]);

								}
								
							}else if(d==5){
								$("#xmsj").val(list[4]);
								var f=list[5];
								if (f==6) {
									if (list[6]==0) {
										$("#IP11").prop("checked",true);
									} else {
										$("#IP12").prop("checked",true);
									}
									$("#port1").val(list[7]);
									$("#ip1").val(list[8]);
									var g=list[9];
									if (g==7) {
										if (list[10]==0) {
											$("#IP21").prop("checked",true);
										} else {
											$("#IP22").prop("checked",true);
										}
										$("#port2").val(list[11]);
										$("#ip2").val(list[12]);
										var h=list[13];
										if (h==8) {
											if (list[14]==0) {
												$("#IP31").prop("checked",true);
											} else {
												$("#IP32").prop("checked",true);
											}
											$("#port3").val(list[15]);
											$("#ip3").val(list[16]);
										}
										
									}else if(g==8){
										if (list[10]==0) {
											$("#IP31").prop("checked",true);
										} else {
											$("#IP32").prop("checked",true);
										}
										$("#port3").val(list[11]);
										$("#ip3").val(list[12]);

									}
								}else if(f==7){
									if (list[6]==0) {
										$("#IP21").prop("checked",true);
									} else {
										$("#IP22").prop("checked",true);
									}
									$("#port2").val(list[7]);
									$("#ip2").val(list[8]);
									var h=list[9];
									if (h==8) {
										if (list[10]==0) {
											$("#IP31").prop("checked",true);
										} else {
											$("#IP32").prop("checked",true);
										}
										$("#port3").val(list[11]);
										$("#ip3").val(list[12]);
									}

								}else if(f==8){
									if (list[6]==0) {
										$("#IP31").prop("checked",true);
									} else {
										$("#IP32").prop("checked",true);
									}
									$("#port3").val(list[7]);
									$("#ip3").val(list[8]);

								}

							}else if(d==6){
								if (list[4]==0) {
									$("#IP11").prop("checked",true);
								} else {
									$("#IP12").prop("checked",true);
								}
								$("#port1").val(list[5]);
								$("#ip1").val(list[6]);
								var g=list[7];
								if (g==7) {
									if (list[8]==0) {
										$("#IP21").prop("checked",true);
									} else {
										$("#IP22").prop("checked",true);
									}
									$("#port2").val(list[9]);
									$("#ip2").val(list[10]);
									var h=list[11];
									if (h==8) {
										if (list[12]==0) {
											$("#IP31").prop("checked",true);
										} else {
											$("#IP32").prop("checked",true);
										}
										$("#port3").val(list[13]);
										$("#ip3").val(list[14]);
									}
									
								}else if(g==8){
									if (list[8]==0) {
										$("#IP31").prop("checked",true);
									} else {
										$("#IP32").prop("checked",true);
									}
									$("#port3").val(list[9]);
									$("#ip3").val(list[10]);

								}

							}else if(d==7){
								if (list[4]==0) {
									$("#IP21").prop("checked",true);
								} else {
									$("#IP22").prop("checked",true);
								}
								$("#port2").val(list[5]);
								$("#ip2").val(list[6]);
								var h=list[7];
								if (h==8) {
									if (list[8]==0) {
										$("#IP31").prop("checked",true);
									} else {
										$("#IP32").prop("checked",true);
									}
									$("#port3").val(list[9]);
									$("#ip3").val(list[10]);
								}

							}else if(d==8){
								if (list[4]==0) {
									$("#IP31").prop("checked",true);
								} else {
									$("#IP32").prop("checked",true);
								}
								$("#port3").val(list[5]);
								$("#ip3").val(list[6]);

							}
							
						}else if(a==4){
							if (list[2]==0) {
								$("#sleep1").prop("checked",true);
							} else {
								$("#sleep").prop("checked",true);
							}
							var e=list[3];
							if (e==5) {
								$("#xmsj").val(list[4]);
								var f=list[5];
								if (f==6) {
									if (list[6]==0) {
										$("#IP11").prop("checked",true);
									} else {
										$("#IP12").prop("checked",true);
									}
									$("#port1").val(list[7]);
									$("#ip1").val(list[8]);
									var g=list[9];
									if (g==7) {
										if (list[10]==0) {
											$("#IP21").prop("checked",true);
										} else {
											$("#IP22").prop("checked",true);
										}
										$("#port2").val(list[11]);
										$("#ip2").val(list[12]);
										var h=list[13];
										if (h==8) {
											if (list[14]==0) {
												$("#IP31").prop("checked",true);
											} else {
												$("#IP32").prop("checked",true);
											}
											$("#port3").val(list[15]);
											$("#ip3").val(list[16]);
										}
										
									}else if(g==8){
										if (list[10]==0) {
											$("#IP31").prop("checked",true);
										} else {
											$("#IP32").prop("checked",true);
										}
										$("#port3").val(list[11]);
										$("#ip3").val(list[12]);

									}
								}else if(f==7){
									if (list[6]==0) {
										$("#IP21").prop("checked",true);
									} else {
										$("#IP22").prop("checked",true);
									}
									$("#port2").val(list[7]);
									$("#ip2").val(list[8]);
									var h=list[9];
									if (h==8) {
										if (list[10]==0) {
											$("#IP31").prop("checked",true);
										} else {
											$("#IP32").prop("checked",true);
										}
										$("#port3").val(list[11]);
										$("#ip3").val(list[12]);
									}

								}else if(f==8){
									if (list[6]==0) {
										$("#IP31").prop("checked",true);
									} else {
										$("#IP32").prop("checked",true);
									}
									$("#port3").val(list[7]);
									$("#ip3").val(list[8]);

								}
							}else if(e==6){
								if (list[4]==0) {
									$("#IP11").prop("checked",true);
								} else {
									$("#IP12").prop("checked",true);
								}
								$("#port1").val(list[5]);
								$("#ip1").val(list[6]);
								var g=list[7];
								if (g==7) {
									if (list[8]==0) {
										$("#IP21").prop("checked",true);
									} else {
										$("#IP22").prop("checked",true);
									}
									$("#port2").val(list[9]);
									$("#ip2").val(list[10]);
									var h=list[11];
									if (h==8) {
										if (list[12]==0) {
											$("#IP31").prop("checked",true);
										} else {
											$("#IP32").prop("checked",true);
										}
										$("#port3").val(list[13]);
										$("#ip3").val(list[14]);
									}
									
								}else if(g==8){
									if (list[8]==0) {
										$("#IP31").prop("checked",true);
									} else {
										$("#IP32").prop("checked",true);
									}
									$("#port3").val(list[9]);
									$("#ip3").val(list[10]);

								}

							}else if(e==7){
								if (list[4]==0) {
									$("#IP21").prop("checked",true);
								} else {
									$("#IP22").prop("checked",true);
								}
								$("#port2").val(list[5]);
								$("#ip2").val(list[6]);
								var h=list[7];
								if (h==8) {
									if (list[8]==0) {
										$("#IP31").prop("checked",true);
									} else {
										$("#IP32").prop("checked",true);
									}
									$("#port3").val(list[9]);
									$("#ip3").val(list[10]);
								}

							}else if(e==8){
								if (list[4]==0) {
									$("#IP31").prop("checked",true);
								} else {
									$("#IP32").prop("checked",true);
								}
								$("#port3").val(list[5]);
								$("#ip3").val(list[6]);

							}
							
						}else if(a==5){
							$("#xmsj").val(list[2]);
							var f=list[3];
							if (f==6) {
								if (list[4]==0) {
									$("#IP11").prop("checked",true);
								} else {
									$("#IP12").prop("checked",true);
								}
								$("#port1").val(list[5]);
								$("#ip1").val(list[6]);
								var g=list[7];
								if (g==7) {
									if (list[8]==0) {
										$("#IP21").prop("checked",true);
									} else {
										$("#IP22").prop("checked",true);
									}
									$("#port2").val(list[9]);
									$("#ip2").val(list[10]);
									var h=list[11];
									if (h==8) {
										if (list[12]==0) {
											$("#IP31").prop("checked",true);
										} else {
											$("#IP32").prop("checked",true);
										}
										$("#port3").val(list[13]);
										$("#ip3").val(list[14]);
									}
									
								}else if(g==8){
									if (list[8]==0) {
										$("#IP31").prop("checked",true);
									} else {
										$("#IP32").prop("checked",true);
									}
									$("#port3").val(list[9]);
									$("#ip3").val(list[10]);

								}
							}else if(f==7){
								if (list[4]==0) {
									$("#IP21").prop("checked",true);
								} else {
									$("#IP22").prop("checked",true);
								}
								$("#port2").val(list[5]);
								$("#ip2").val(list[6]);
								var h=list[7];
								if (h==8) {
									if (list[8]==0) {
										$("#IP31").prop("checked",true);
									} else {
										$("#IP32").prop("checked",true);
									}
									$("#port3").val(list[9]);
									$("#ip3").val(list[10]);
								}

							}else if(f==8){
								if (list[4]==0) {
									$("#IP31").prop("checked",true);
								} else {
									$("#IP32").prop("checked",true);
								}
								$("#port3").val(list[5]);
								$("#ip3").val(list[6]);

							}
						}else if(a==6){
							if (list[2]==0) {
								$("#IP11").prop("checked",true);
							} else {
								$("#IP12").prop("checked",true);
							}
							$("#port1").val(list[3]);
							$("#ip1").val(list[4]);
							var g=list[5];
							if (g==7) {
								if (list[6]==0) {
									$("#IP21").prop("checked",true);
								} else {
									$("#IP22").prop("checked",true);
								}
								$("#port2").val(list[7]);
								$("#ip2").val(list[8]);
								var h=list[9];
								if (h==8) {
									if (list[10]==0) {
										$("#IP31").prop("checked",true);
									} else {
										$("#IP32").prop("checked",true);
									}
									$("#port3").val(list[11]);
									$("#ip3").val(list[12]);
								}
								
							}else if(g==8){
								if (list[6]==0) {
									$("#IP31").prop("checked",true);
								} else {
									$("#IP32").prop("checked",true);
								}
								$("#port3").val(list[7]);
								$("#ip3").val(list[8]);

							}
						}else if(a==7){
							if (list[2]==0) {
								$("#IP21").prop("checked",true);
							} else {
								$("#IP22").prop("checked",true);
							}
							$("#port2").val(list[3]);
							$("#ip2").val(list[4]);
							var h=list[5];
							if (h==8) {
								if (list[6]==0) {
									$("#IP31").prop("checked",true);
								} else {
									$("#IP32").prop("checked",true);
								}
								$("#port3").val(list[7]);
								$("#ip3").val(list[8]);
							}
							
						}else if(a==8){
							if (list[2]==0) {
								$("#IP31").prop("checked",true);
							} else {
								$("#IP32").prop("checked",true);
							}
							$("#port3").val(list[3]);
							$("#ip3").val(list[4]);
						}
						
						
					} else {
						var lengt = list.length;
						for ( var a = 0; a < lengt;) {
							$("#z" + list[a]).val(list[a + 1]);
							a += 2
						}
					}
				}
		}
		
	});

}

function xfrunMore(v_id, c_id, send_info) {
	$.ajax({
		type : "post",
		url : "insertMore.do",
		data : {
			"v_id" : v_id,
			"c_id" : c_id,
			"send_info" : send_info
		},
		dataType : "json",
		async : true,
		success : function(list) {
			var cp = '';
			for ( var a = 0; a < list.length; a++) {
				cp += $("#zdcheck").find('input[value=' + list[a] + ']')
						.parent().parent().children().eq(1).text()
						+ "\n";

			}
			alert(cp + "下发失败,检查终端是否在线");
		}

	});

}

function qpt(v_id, c_id, send_info) {
	$.ajax({
		type : "post",
		url : "qpt.do",
		data : {
			"v_id" : v_id,
			"c_id" : c_id,
			"send_info" : send_info
		},
		dataType : "json",
		async : true,
		success : function(list) {
			var cp = '';
			for ( var a = 0; a < list.length; a++) {
				cp += $("#zdcheck").find('input[value=' + list[a] + ']')
						.parent().parent().children().eq(1).text()
						+ "\n";

			}
			alert(cp + "切换失败,检查终端是否在线");

		}
	});
}

function kz(v_id, c_id, send_info) {
	$.ajax({
		type : "post",
		url : "kz.do",
		data : {
			"v_id" : v_id,
			"c_id" : c_id,
			"send_info" : send_info
		},
		dataType : "json",
		async : true,
		success : function(list) {
			if (list.length == 0) {
				alert("控制成功");
			} else {

				var cp = '';
				for ( var a = 0; a < list.length; a++) {
					cp += $("#zdcheck").find('input[value=' + list[a] + ']')
							.parent().parent().children().eq(1).text()
							+ "\n";

				}
				alert(cp + "控制失败,检查终端是否在线");
			}

		}
	});
}
