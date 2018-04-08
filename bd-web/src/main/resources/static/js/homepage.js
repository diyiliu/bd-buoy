var state;
	var id;
	var b;
	var d;

$(function() {
	
	$("#xxxxBtn").click(function() {
		
		jsparray.push("carDetail.jsp");
		$("#returnBtn").addClass("color-change");
		xxxx();
	});
	
	
});

function xxxx()
{
	
clearInterval(d);
clearInterval(b);
$("#hideId2").val(0);
id=$("#hideId").val();
$(".homecontext").addClass("hide");
$(".jsppage").removeClass("hide");

$.post("carDetail.jsp", function(data, status) {
	$(".jsppage").html(data);
	state = status;
});

b = window.setTimeout(function() {
	if (state == 'success') {
		state = 'false';
		if(id==33||id==34)
		{
				$("#kzxx").removeClass("hidden");
		}
		run(id,b);
	}
},500);

d=window.setInterval(function() {
	if(state=='false'&&$("#hideId1").val()==1)
		{
			run(id,b);
		}
	else
		{
			clearInterval(d);
		}
	
},10000);
}

function run(a,c) {
	$("#hideId1").val(1);
	clearInterval(c);
	$.ajax({
		type : "post",
		url : "queryVechCurrent.do",
		data : {
			"id" : a
		},
		dataType : "json",
		async : true,
		success : function(vc) {
			

	
			$("#cp").text(vc.staticvehicle_id);
			$("#vid1").text(vc.terminal_number);
			$("#vin1").text(vc.vin);
			$("#iccid1").text(vc.sim);
			$("#jgName1").text(vc.jgName);
			
			//图片判断
			if (vc.jgName.replace(/(^\s*)|(\s*$)/g, "") == "一汽客车（无锡）") {
				$("#imgIdtp").attr("src","images/wxyq.png");
			} else {
				$("#imgIdtp").attr("src","images/car2.png");
			}
			
			
			
			
			
			
			//静态数据
			$("#dcbh")
			.text(
					vc.battery_system_code);
	$("#cnzzlx")
			.text(
					vc.battery_type);
	$("#cnzzlxznl")
			.text(
					vc.total_battery_energy);
	$("#cnzzlqfs")
			.text(
					vc.battery_cooling_mode);
	$("#vinm").text(
			vc.vin);
	$("#xhlx")
			.text(
					vc.vehicle_type);
	$("#qddjbzfs")
			.text(
					vc.motor_arrangement_mode);
	$("#zgcs")
			.text(
					vc.maximum_speed);
	$("#cddxslc")
			.text(
					vc.travel_mileage);
	$("#dcgscs")
			.text(
					vc.gear_transmission_ratio);

	$("#qddjlqfs")
			.text(
					vc.motor_cooling_mode);
	$("#eddy")
			.text(
					vc.motor_rated_voltage);
	$("#qddjzdgzdl")
			.text(
					vc.motor_maximum_working_current);
	$("#qddjxh")
			.text(
					vc.motor_serial_number);
	$("#qddjxih")
			.text(
					vc.motor_model);
	$("#qddjfzgl")
			.text(
					vc.motor_peak_power);
	$("#qddjzgzs")
			.text(
					vc.motor_maximum_speed);
	$("#qddjfzzj")
			.text(
					vc.motor_peak_torque);
	$("#qddjzdsczj")
			.text(vc.motor_maximum_output_torque);

			
	
			//电池图表信息
	 //var data1 = [4.20, 4.82, 4.91, 4.34, 4.90, 4.30, 4.10, 4.23, 4.42, 3.21, 0.9, 1.49, 2.10, 1.22, 1.33, 3.34, 1.98, 1.23, 1.25, 2.20];
			var data1=[];
			var	data2=[];
			
			
			//没有实时信息
			if(vc.server_time==null||vc.server_time=="")
			{
				//时间
				$("#time").text("暂无数据");
				//电机
				$("#most").text("暂无数据");
				$("#mosp").text("暂无数据");
				$("#moto").text("暂无数据");
				$("#mote").text("暂无数据");
				$("#mocv").text("暂无数据");
				$("#mocc").text("暂无数据");
				$("#moco").text("暂无数据");
				//整车数据
				$("#ljcdnum").text("暂无数据");
				$("#cdzt").text("暂无数据");
				$("#cdjscdy").text("暂无数据");
				$("#cdjscdl").text("暂无数据");
				$("#ycsj").text("暂无数据");
				$("#sysj").text("暂无数据");
				$("#dccdrl").text("暂无数据");
				$("#dczzdy").text("暂无数据");
				$("#dczzdl").text("暂无数据");
				$("#dw").text("暂无数据");
				$("#jydz").text("暂无数据");
				//电池
				$("#dcdtdyzgz").text("暂无数据");
				$("#zgdydczxth").text("暂无数据");
				$("#zgdydcdtdh").text("暂无数据");
				$("#dcdtdyzdz").text("暂无数据");
				$("#zddydczxth").text("暂无数据");
				$("#zddydcdtdh").text("暂无数据");
				
				$("#zgwdzxth").text("暂无数据");
				$("#zgwdtzxh").text("暂无数据");
				$("#zgwd").text("暂无数据");
				$("#zdwdzxth").text("暂无数据");
				$("#zdwdtzxh").text("暂无数据");
				$("#zdwd").text("暂无数据");
				//车速，里程，电量
				carReal(-2,-2,-2);
				data1=[-2,-2,-2,-2,-2,-2,-2,-2,-2,-2];
				data2=[-2,-2,-2,-2,-2,-2,-2,-2,-2,-2];
				powerV1(data1);
				powerT1(data2);
			
			}
			//有实时信息
			else
			{
				//时间
				$("#time").text(vc.server_time);
				
				//车速，里程，电量图表
				var cs,
					lc,
					dl;
			if(vc.speed==6553.5)
				cs=-1;
			else
				cs=vc.speed;
			if(vc.mileage==429496729.5)
				lc=-1;
			else
				lc=vc.mileage;
			if(vc.soc==255)
				dl=-1;
			else
				dl=vc.soc;
				
			carReal(lc,cs,dl);
			
			
			//暂时只循环一个箱体内容
			var dymax=vc.charenerstorsubsysvoltlists[0][0];
			for(var z=0;z<vc.charenerstorsubsysvoltlists[0].length;z++)
			{
				var dtdyz=vc.charenerstorsubsysvoltlists[0][z];
				if(dtdyz==65.535)
				{
					data1.push(-1);
				}
				else
				{
					if(dymax<dtdyz)
					{
						dymax=dtdyz;
					}
					data1.push(dtdyz);
				}
			}
			powerV1(data1,dymax);
			
		
			var wdmax=-1;
			for(var x=0;x<vc.dcwd[0].length;x++)
			{
				var wdz=vc.dcwd[0][x];
				if(wdz==215)
				{
					data2.push(-1);
				}
				else
				{
					if(wdz>wdmax)
					{
						wdmax=wdz;
					}
					data2.push(wdz);
				}
			}
			powerT1(data2,wdmax);
			
			
				//驱动电机信息
				/*区分驱动电机个数*/
				if(vc.motorasseinfolists.length==1)
				{
					// alert(vc.motorasseinfolists[i].mose);

					var qddj = vc.motorasseinfolists[0];

					var most;//状态

					// alert(qddj.most);
					if (qddj.most == 1) {
						most = '耗电';
					} else if (qddj.most == 2) {
						most = '发电';
					} else if (qddj.most == 3) {
						most = '关闭';
					} else if (qddj.most == 4) {
						most = '准备';
					} else if (qddj.most == 254) {
						most = '异常';
					} else if (qddj.most == 255) {
						most = '无效';
					}
					$("#most").text(most);

					var mosp;//转速
					if (qddj.mosp == 45534) {
						mosp = '异常';
					} else if (qddj.mosp == 45535) {
						mosp = '无效';
					} else {
						mosp = new Number(
								qddj.mosp);
					}
					$("#mosp").text(mosp);

					var moto;//转矩
					if (qddj.moto == 4553.4) {
						moto = '异常';
					} else if (qddj.moto == 4553.5) {
						moto = '无效';
					} else {
						moto = new Number(
								qddj.moto);
					}
					$("#moto").text(moto);
					
					var mote;//温度
					if (qddj.mote == 214) {
						mote = '异常';
					} else if (qddj.mote == 215) {
						mote = '无效';
					} else {
						mote = qddj.mote;
					}
					$("#mote").text(mote);

					var mocv;//电压
					if (qddj.mocv == 6553.4) {
						mocv = '异常';
					} else if (qddj.mocv == 6553.5) {
						mocv = '无效';
					} else {
						mocv = qddj.mocv;
					}
					$("#mocv").text(mocv);

					var mocc;//电流
					if (qddj.mocc == 24534) {
						mocc = '异常';
					} else if (qddj.mocc == 24535) {
						mocc = '无效';
					} else {
						mocc = qddj.mocc;
					}
				
					$("#mocc").text(mocc);

					var moco;//温度
					if (qddj.moco == 214) {
						moco = '异常';
					} else if (qddj.moco == 215) {
						moco = '无效';
					} else {
						moco = qddj.moco;
					}
					$("#moco").text(moco);
				
				}
				else
				{
					for ( var i = 0; i < vc.motorasseinfolists.length; i++) {
						// alert(vc.motorasseinfolists[i].mose);

						var qddj = vc.motorasseinfolists[i];

						var most;

						// alert(qddj.most);
						if (qddj.most == 1) {
							most = '耗电';
						} else if (qddj.most == 2) {
							most = '发电';
						} else if (qddj.most == 3) {
							most = '关闭';
						} else if (qddj.most == 4) {
							most = '准备';
						} else if (qddj.most == 254) {
							most = '异常';
						} else if (qddj.most == 255) {
							most = '无效';
						}

						var mosp;
						if (qddj.mosp == 45534) {
							mosp = '异常';
						} else if (qddj.mosp == 45535) {
							mosp = '无效';
						} else {
							mosp = new Number(
									qddj.mosp);
						}

						var moto;
						if (qddj.moto == 4553.4) {
							moto = '异常';
						} else if (qddj.moto == 4553.5) {
							moto = '无效';
						} else {
							moto = new Number(
									qddj.moto);
						}

						var mote;
						if (qddj.mote == 214) {
							mote = '异常';
						} else if (qddj.mote == 215) {
							mote = '无效';
						} else {
							mote = qddj.mote;
						}

						var mocv;
						if (qddj.mocv == 6553.4) {
							mocv = '异常';
						} else if (qddj.mocv == 6553.5) {
							mocv = '无效';
						} else {
							mocv = qddj.mocv;
						}

						var mocc;
						if (qddj.mocc == 24534) {
							mocc = '异常';
						} else if (qddj.mocc == 24535) {
							mocc = '无效';
						} else {
							mocc = qddj.mocc;
						}
						$("#mocc").text(mocc);
						
						var moco;
						if (qddj.moco == 214) {
							moco = '异常';
						} else if (qddj.moco == 215) {
							moco = '无效';
						} else {
							moco = qddj.moco;
						}
					}
				}
				
				//车辆信息
				if (vc.vehiclestate == 1)
					$("#ljcdnum").text(
							"车辆启动");
				else if (vc.vehiclestate == 2)
					$("#ljcdnum").text(
							"车辆熄火");
				else if (vc.vehiclestate == 3)
					$("#ljcdnum").text(
							"其他状态");
				else if (vc.vehiclestate == 4)
					$("#ljcdnum").text(
							"车辆离线");
				else if (vc.vehiclestate == 254)
					$("#ljcdnum").text(
							"车辆异常");
				else if (vc.vehiclestate == 255)
					$("#ljcdnum").text("车辆无效");
				
				
				if (vc.chargestate == 1)
					$("#cdzt").text("停车充电");
				else if (vc.chargestate == 2)
					$("#cdzt").text("行驶充电");
				else if (vc.chargestate == 3)
					$("#cdzt").text("未充电");
				else if (vc.chargestate == 4)
					$("#cdzt").text("充电完成");
				else if (vc.chargestate == 254)
					$("#cdzt").text("充电异常");
				else
					$("#cdzt").text("充电无效");

				$("#cdjscdy").text("电动");
				
				/**/
				if (vc.dcstate == 1)
					$("#cdjscdl").text("工作中");
				else if (vc.dcstate == 2)
					$("#cdjscdl").text("已经断开");
				else if (vc.dcstate == 254)
					$("#cdjscdl").text("异常");
				else if (vc.dcstate == 255)
					$("#cdjscdl").text("无效");

				if (vc.driveState == 1)
					$("#ycsj").text("有驱动力");
				else
					$("#ycsj").text("无驱动");
				
				/**/
				if (vc.brakState == 1)
					$("#sysj").text("制动中");
				else
					$("#sysj").text("未制动");

				if (vc.positionstate == 0)
					$("#dccdrl").text("有效定位");
				else
					$("#dccdrl").text("无效定位");
				
				if (vc.voltage = 6553.5)
					$("#dczzdy").text("无效");
				else
					$("#dczzdy").text(vc.voltage);
				/**/
				if (vc.current == 6553.5) {
					$("#dczzdl").text("无效");
				}
				else {
					$("#dczzdl").text((vc.current - 1000).toFixed(1));
				}
				/**/
				var dw;
				if (vc.gear == 0) {
					dw = '空';
				} else if (vc.gear == 1) {
					dw = '1';
				} else if (vc.gear == 2) {
					dw = '2';
				} else if (vc.gear == 3) {
					dw = '3';
				} else if (vc.gear == 4) {
					dw = '4';
				} else if (vc.gear == 5) {
					dw = '5';
				} else if (vc.gear == 6) {
					dw = '6';
				} else if (vc.gear == 13) {
					dw = '倒';
				} else if (vc.gear == 14) {
					dw = '自动D';
				} else if (vc.gear == 15) {
					dw = 'P';
				}

				$("#dw").text(dw + '档');
				
				/**/
				if (vc.resistance == 65535)
					$("#jydz").text("无效");
				else
					$("#jydz").text(vc.resistance);
				
				
				//电池信息
				/*电压极值*/
				if(vc.maxvoltbattsingval==65.535)
					$("#dcdtdyzgz").text("无效数据");
				else
				$("#dcdtdyzgz").text(vc.maxvoltbattsingval);
				
				if(vc.maxvoltbattsubsys==255)
					$("#zgdydczxth")
					.text("无效数据");
				else
				$("#zgdydczxth")
				.text(vc.maxvoltbattsubsys);
				if(vc.maxvoltbattsingle==255)
					$("#zgdydcdtdh").text("无效数据");
				else
				$("#zgdydcdtdh").text(vc.maxvoltbattsingle);

				if(vc.minvoltbattsingval==65.535)
					$("#dcdtdyzdz").text("无效数据");
				else
					$("#dcdtdyzdz").text(vc.minvoltbattsingval);
				if(vc.minvoltbattsubsys==255)
					$("#zddydczxth").text("无效数据");
				else
					$("#zddydczxth").text(vc.minvoltbattsubsys);
				if(vc.minvoltbattsingle==255)
				$("#zddydcdtdh").text("无效数据");
				else
					$("#zddydcdtdh").text(vc.minvoltbattsingle);
				
				/*温度极值*/
				if(vc.maxtempsubsys==255)
					$("#zgwdzxth").text("无效数据");
				else
					$("#zgwdzxth").text(vc.maxtempsubsys);
				if(vc.maxtempprobno==255)
					$("#zgwdtzxh").text("无效数据");
				else
					$("#zgwdtzxh").text(vc.maxtempprobno);
				if(vc.maxtempval==215)
					$("#zgwd").text("无效数据");
				else
					$("#zgwd").text(vc.maxtempval);
				if(vc.mintempsubsys==255)
				$("#zdwdzxth").text("无效数据");
				else
					$("#zdwdzxth").text(vc.mintempsubsys);
				if(vc.mintempprobno==255)
				$("#zdwdtzxh").text("无效数据");
				else
					$("#zdwdtzxh").text(vc.mintempprobno);
				if(vc.mintempval==215)
				$("#zdwd").text("无效数据");
				else
					$("#zdwd").text(vc.mintempval);
				
				//报警数据
				
				if (vc.maxalarmgrade == 0) {
					$("#gzdj").children().eq(1).addClass("hide");
					$("#gzdj").children().eq(2).addClass("hide");
					$("#gzdj").children().eq(3).addClass("hide");
					$("#gzdj").children().eq(0).removeClass("hide");
				} else if (vc.maxalarmgrade == 1) {
					$("#gzdj").children().eq(0).addClass("hide");
					$("#gzdj").children().eq(2).addClass("hide");
					$("#gzdj").children().eq(3).addClass("hide");
					$("#gzdj").children().eq(1).removeClass("hide");
					
				} else if (vc.maxalarmgrade == 2) {
					$("#gzdj").children().eq(0).addClass("hide");
					$("#gzdj").children().eq(1).addClass("hide");
					$("#gzdj").children().eq(3).addClass("hide");
					$("#gzdj").children().eq(2).removeClass("hide");
				} else {
					$("#gzdj").children().eq(0).addClass("hide");
					$("#gzdj").children().eq(1).addClass("hide");
					$("#gzdj").children().eq(2).addClass("hide");
					$("#gzdj").children().eq(3).removeClass("hide");
				}

				if (vc.alarmsign5 == 0)
					$("#bmstxgz").html('<i class="ion  ion-checkmark text-green"></li>');
				else
					$("#bmstxgz").html('<i class="fa fa-warning text-red"></i>');
				if (vc.alarmsign9 == 0)
					$("#soctdbj").html(
							'<i class="ion  ion-checkmark text-green"></li>');
				else
					$("#soctdbj").html(
							'<i class="fa fa-warning text-red"></i>');
				if (vc.alarmsign8 == 0)
					$("#socggbj").html(
							'<i class="ion  ion-checkmark text-green"></li>');
				else
					$("#socggbj").html(
							'<i class="fa fa-warning text-red"></i>');
				if (vc.alarmsign15 == 0)
					$("#dcdcztbj")
							.html('<i class="ion  ion-checkmark text-green"></li>');
				else
					$("#dcdcztbj")
							.html('<i class="fa fa-warning text-red"></i>');
				if (vc.alarmsign18 == 0)
					$("#qddjwdbj")
							.html('<i class="ion  ion-checkmark text-green"></li>');
				else
					$("#qddjwdbj")
							.html('<i class="fa fa-warning text-red"></i>');
				if (vc.alarmsign16 == 0)
					$("#qddjwdbjbj")
							.html('<i class="ion  ion-checkmark text-green"></li>');
				else
					$("#qddjwdbjbj")
							.html('<i class="fa fa-warning text-red"></i>');
				if (vc.alarmsign10 == 0)
					$("#svcheckng")
							.html('<i class="ion  ion-checkmark text-green"></li>');
				else
					$("#svcheckng")
							.html('<i class="fa fa-warning text-red"></i>');
				if (vc.alarmsign11 == 0)
					$("#bmsselfcheck")
							.html('<i class="ion  ion-checkmark text-green"></li>');
				else
					$("#bmsselfcheck")
							.html('<i class="fa fa-warning text-red"></i>');
				if (vc.alarmsign2 == 0)
					$("#battemphigh")
							.html('<i class="ion  ion-checkmark text-green"></li>');
				else
					$("#battemphigh")
							.html('<i class="fa fa-warning text-red"></i>');
				if (vc.alarmsign17 == 0)
					$("#soclow").html(
							'<i class="ion  ion-checkmark text-green"></li>');
				else
					$("#soclow").html(
							'<i class="fa fa-warning text-red"></i>');
				if (vc.alarmsign6 == 0)
					$("#svhigh").html(
							'<i class="ion  ion-checkmark text-green"></li>');
				else
					$("#svhigh").html(
							'<i class="fa fa-warning text-red"></i>');
				if (vc.alarmsign7 == 0)
					$("#svlow").html(
							'<i class="ion  ion-checkmark text-green"></li>');
				else
					$("#svlow").html(
							'<i class="fa fa-warning text-red"></i>');
				if (vc.alarmsign1 == 0)
					$("#batwchigh")
							.html('<i class="ion  ion-checkmark text-green"></li>');
				else
					$("#batwchigh")
							.html('<i class="fa fa-warning text-red"></i>');
				if (vc.alarmsign3 == 0)
					$("#batvhigh")
							.html('<i class="ion  ion-checkmark text-green"></li>');
				else
					$("#batvhigh")
							.html('<i class="fa fa-warning text-red"></i>');
				if (vc.alarmsign4 == 0)
					$("#batvlow").html(
							'<i class="ion  ion-checkmark text-green"></li>');
				else
					$("#batvlow").html(
							'<i class="fa fa-warning text-red"></i>');
				if (vc.alarmsign14 == 0)
					$("#dchrover")
							.html('<i class="ion  ion-checkmark text-green"></li>');
				else
					$("#dchrover").html('<i class="fa fa-warning text-red"></i>');
				if (vc.alarmsign13 == 0)
					$("#batychigh").html('<i class="ion  ion-checkmark text-green"></li>');
				else
					$("#batychigh").html('<i class="fa fa-warning text-red"></i>');
				if (vc.alarmsign12 == 0)
					$("#battemplow").html('<i class="ion  ion-checkmark text-green"></li>');
				else
					$("#battemplow").html('<i class="fa fa-warning text-red"></i>');
				if (vc.alarmsign19 == 0)
					$("#czcnzzlxgcbj").html('<i class="ion  ion-checkmark text-green"></li>');
				else
					$("#czcnzzlxgcbj").html('<i class="fa fa-warning text-red"></i>');
			
			}
			
			if(vc.id==33||vc.id==34)
			{
				
				$.ajax({
					type : "post",
					url : "minankz.do",
					data : {
						"id" : vc.id
					},
					dataType : "json",
					async : true,
					success : function(list) {
						if(list.length!=0)
						{
							$("#zgyxcddy").text(
									list[0]);
							$("#zgyxcddl").text(
									list[1]);
							$("#cdkz")
									.text(list[2]);
							$("#dtdczgdy").text(
									list[3]);
							$("#tzcddtdyxz").text(
									list[4]);

							$("#cddy")
									.text(list[6]);
							$("#cddl")
									.text(list[7]);
							$("#cdzt1").text(
									list[8]);

							$("#cdjjldsrgl").text(
									list[9]);
							$("#cdjscgl").text(
									list[10]);
							$("#cddjwd").text(
									list[11]);

							if (list[12] != "-") {
								$("#cdgzdm").text(
										list[12]);
							} else {
								$("#cdgzdm").text(
										"--");
							}
							if (list[13] != "-") {
								$("#cdgzdm")
										.append(
												"/"
														+ list[13]);
							}
							if (list[14] != "-") {
								$("#cdgzdm")
										.append(
												"/"
														+ list[14]);
							}
							if (list[15] != "-") {
								$("#cdgzdm")
										.append(
												"/"
														+ list[15]);
							}
							if (list[16] != "-") {
								$("#cdgzdm")
										.append(
												"/"
														+ list[16]);
							}
							if (list[17] != "-") {
								$("#cdgzdm")
										.append(
												"/"
														+ list[17]);
							}
							if (list[18] != "-") {
								$("#cdgzdm")
										.append(
												"/"
														+ list[18]);
							}

							if (list[19] != "-") {
								$("#cdtzyy").text(
										list[19]);
							} else {
								$("#cdtzyy").text(
										"--");
							}
							if (list[20] != "-") {
								$("#cdtzyy")
										.append(
												"/"
														+ list[20]);
							}
							if (list[21] != "-") {
								$("#cdtzyy")
										.append(
												"/"
														+ list[21]);
							}
							if (list[22] != "-") {
								$("#cdtzyy")
										.append(
												"/"
														+ list[22]);
							}
							if (list[23] != "-") {
								$("#cdtzyy")
										.append(
												"/"
														+ list[23]);
							}
							if (list[24] != "-") {
								$("#cdtzyy")
										.append(
												"/"
														+ list[24]);
							}
							if (list[25] != "-") {
								$("#cdtzyy")
										.append(
												"/"
														+ list[25]);
							}

							$("#dcmxdl").text(
									list[26]);
							$("#dcmxdy").text(
									list[27]);

							if (list[29] != null) {
								$("#dtdcdyzdz")
										.text(
												new Number(
														list[29]) / 1000);
							}

							if (list[30] != null) {
								$("#dtdczdzzh")
										.text(
												list[30]);
							}
							if (list[31] != null) {
								$("#dtdczdzbh")
										.text(
												list[31]);
							}
							/*
							 * if(list[31]!=null) {
							 * $("#dtdcdyzdz").append("/"+list[31]); }
							 * if(list[32]!=null) {
							 * $("#dtdcdyzdz").append("/"+list[32]); }
							 * if(list[33]!=null) {
							 * $("#dtdcdyzdz").append("/"+list[33]); }
							 * if(list[34]!=null) {
							 * $("#dtdcdyzdz").append("/"+list[34]); }
							 * if(list[35]!=null) {
							 * $("#dtdcdyzdz").append("/"+list[35]); }
							 * if(list[36]!=null) {
							 * $("#dtdcdyzdz").append("/"+list[36]); }
							 * if(list[37]!=null) {
							 * $("#dtdcdyzdz").append("/"+list[37]); }
							 * if(list[38]!=null) {
							 * $("#dtdcdyzdz").append("/"+list[38]); }
							 * if(list[39]!=null) {
							 * $("#dtdcdyzdz").append("/"+list[39]); }
							 * if(list[40]!=null) {
							 * $("#dtdcdyzdz").append("/"+list[40]); }
							 * if(list[41]!=null) {
							 * $("#dtdcdyzdz").append("/"+list[41]); }
							 * if(list[42]!=null) {
							 * $("#dtdcdyzdz").append("/"+list[42]); }
							 * if(list[43]!=null) {
							 * $("#dtdcdyzdz").append("/"+list[43]); }
							 * if(list[44]!=null) {
							 * $("#dtdcdyzdz").append("/"+list[44]); }
							 * if(list[45]!=null) {
							 * $("#dtdcdyzdz").append("/"+list[45]); }
							 * if(list[46]!=null) {
							 * $("#dtdcdyzdz").append("/"+list[46]); }
							 */
							$("#dtdcdyzxz")
									.text(
											new Number(
													list[32]) / 1000);
							$("#dtdczxzzh").text(
									list[33]);
							$("#dtdczxzbh").text(
									list[34]);
							$("#BMSyjbbh").text(
									list[35]);
							$("#BMSrjbbh").text(
									list[36]);
							$("#dysckz").text(
									list[5]);
							$("#dczjs").text(
									list[37]);
							$("#dczSOC").text(
									list[38]);

							// 39-41
							if (list[39] != null) {
								$("#dczzt0").text(
										list[39]);
							} else {
								$("#dczzt0").text(
										"");
							}
							if (list[40] != null) {
								$("#dczzt0")
										.append(
												"/"
														+ list[40]);
							}
							if (list[41] != null) {
								$("#dczzt0")
										.append(
												"/"
														+ list[41]);
							}

							// 42-48
							if (list[42] != null) {
								$("#dczzt1").text(
										list[42]);
							} else {
								$("#dczzt1").text(
										"");
							}
							if (list[43] != null) {
								$("#dczzt1")
										.append(
												"/"
														+ list[43]);
							}
							if (list[44] != null) {
								$("#dczzt1")
										.append(
												"/"
														+ list[44]);
							}
							if (list[45] != null) {
								$("#dczzt1")
										.append(
												"/"
														+ list[45]);
							}
							if (list[46] != null) {
								$("#dczzt1")
										.append(
												"/"
														+ list[46]);
							}
							if (list[47] != null) {
								$("#dczzt1")
										.append(
												"/"
														+ list[47]);
							}
							if (list[48] != null) {
								$("#dczzt1")
										.append(
												"/"
														+ list[48]);
							}

							// 49-56
							if (list[49] != null) {
								$("#dczzt2").text(
										list[49]);
							} else {
								$("#dczzt2").text(
										"");
							}
							if (list[50] != null) {
								$("#dczzt2")
										.append(
												"/"
														+ list[50]);
							}
							if (list[51] != null) {
								$("#dczzt2")
										.append(
												"/"
														+ list[51]);
							}
							if (list[52] != null) {
								$("#dczzt2")
										.append(
												"/"
														+ list[52]);
							}
							if (list[53] != null) {
								$("#dczzt2")
										.append(
												"/"
														+ list[53]);
							}
							if (list[54] != null) {
								$("#dczzt2")
										.append(
												"/"
														+ list[54]);
							}
							if (list[55] != null) {
								$("#dczzt2")
										.append(
												"/"
														+ list[55]);
							}
							if (list[56] != null) {
								$("#dczzt2")
										.append(
												"/"
														+ list[56]);
							}

							// 57-58
							if (list[57] != null) {
								$("#dczzt3").text(
										list[57]);
							} else {
								$("#dczzt3").text(
										"");
							}
							if (list[58] != null) {
								$("#dczzt3")
										.append(
												"/"
														+ list[58]);
							}

							$("#dczwdzgz").text(
									list[59]);
							$("#wdzgdzh").text(
									list[60]);
							$("#wdzgdbh").text(
									list[61]);
							$("#dczwdzdz").text(
									list[62]);
							$("#wdzdzzh").text(
									list[63]);
							$("#wdzdzbh").text(
									list[64]);

							$("#djkzqbbh").text(
									list[65]);

							if (list[66] == null) {
								$("#djkzqzt").text(
										"");
							} else {
								$("#djkzqzt").text(
										list[66]);
							}
							if (list[67] != null) {
								$("#djkzqzt")
										.append(
												"/"
														+ list[67]);
							}
							if (list[68] != null) {
								$("#djkzqzt")
										.append(
												"/"
														+ list[68]);
							}
							if (list[69] != null) {
								$("#djkzqzt")
										.append(
												"/"
														+ list[69]);
							}

							$("#djgl").text(
									list[70]);

							$("#djwd").text(
									list[71]);

							$("#djkzqwd").text(
									list[72]);

							if (list[73] == null) {
								$("#djgzdm").text(
										"");
							} else {
								$("#djgzdm").text(
										list[73]);
							}
							if (list[74] != null) {
								$("#djgzdm")
										.append(
												"/"
														+ list[74]);
							}
							if (list[75] != null) {
								$("#djgzdm")
										.append(
												"/"
														+ list[75]);
							}
							if (list[76] != null) {
								$("#djgzdm")
										.append(
												"/"
														+ list[76]);
							}
							if (list[77] != null) {
								$("#djgzdm")
										.append(
												"/"
														+ list[77]);
							}
							if (list[78] != null) {
								$("#djgzdm")
										.append(
												"/"
														+ list[78]);
							}
							if (list[79] != null) {
								$("#djgzdm")
										.append(
												"/"
														+ list[79]);
							}
							if (list[80] != null) {
								$("#djgzdm")
										.append(
												"/"
														+ list[80]);
							}

							if (list[81] == null) {
								$("#zjgzbz").text(
										"");
							} else {
								$("#zjgzbz").text(
										list[81]);
							}
							if (list[82] != null) {
								$("#zjgzbz")
										.append(
												"/"
														+ list[82]);
							}
							if (list[83] != null) {
								$("#zjgzbz")
										.append(
												"/"
														+ list[83]);
							}
							if (list[84] != null) {
								$("#zjgzbz")
										.append(
												"/"
														+ list[84]);
							}
							if (list[85] != null) {
								$("#zjgzbz")
										.append(
												"/"
														+ list[85]);
							}
							if (list[86] != null) {
								$("#zjgzbz")
										.append(
												"/"
														+ list[86]);
							}
							if (list[87] != null) {
								$("#zjgzbz")
										.append(
												"/"
														+ list[87]);
							}
							if (list[88] != null) {
								$("#zjgzbz")
										.append(
												"/"
														+ list[88]);
							}

							$("#djzs").text(
									list[89]);

							$("#djzj1").text(
									list[90]);

							$("#djmxdy").text(
									list[91]);
							$("#djmxdl").text(
									list[92]);

							if (list[93] == null) {
								$("#kzxh").text("");
							} else {
								$("#kzxh").text(
										list[93]);
							}
							if (list[94] != null) {
								$("#kzxh")
										.append(
												"/"
														+ list[94]);
							}
							if (list[95] != null) {
								$("#kzxh")
										.append(
												"/"
														+ list[95]);
							}

							$("#djgdzj").text(
									list[96]);
							$("#dczddy").text(
									+list[97]);

							$("#smxh").text(
									list[98]);

							$("#ymkd").text(
									list[99]);

							if (list[100] == null) {
								$("#scxh").text("");
							} else {
								$("#scxh").text(
										list[100]);
							}

							$("#TCUbbh").text(
									list[101]);

							if (list[102] == null) {
								$("#AMTztdm").text(
										"");
							} else {
								$("#AMTztdm").text(
										list[102]);
							}
							if (list[103] != null) {
								$("#AMTztdm")
										.append(
												"/"
														+ list[103]);
							}

							$("#dqcs").text(
									list[104]);

							if (list[105] == null) {
								$("#AMTgzdm").text(
										"");
							} else {
								$("#AMTgzdm").text(
										list[105]);
							}
							if (list[106] != null) {
								$("#AMTgzdm")
										.append(
												list[106]);
							}
							if (list[107] != null) {
								$("#AMTgzdm")
										.append(
												list[107]);
							}
							if (list[108] != null) {
								$("#AMTgzdm")
										.append(
												list[108]);
							}
							if (list[109] != null) {
								$("#AMTgzdm")
										.append(
												list[109]);
							}
							if (list[110] != null) {
								$("#AMTgzdm")
										.append(
												list[110]);
							}
							if (list[111] != null) {
								$("#AMTgzdm")
										.append(
												list[111]);
							}

							$("#AMTsmxh").text(
									list[112]);
							$("#Pddqwz").text(
									list[113]);

						}
						
					}
				
				});
			}
		}
	});
	
}


/*aaa(100,100,100);

function aaa( a1,a2,a3 ){
	var lc = null,
	    cs = null,
	    dl = null;
	    lc = a1,
	    cs = a2,
	    dl = a3;
	
};*/

/*function chartsList(){
    powerList();
};*/



/*
车辆实时信息
*/
function carReal(a1,b1,c1){
	
    /*
        实时车速 电量 开始
    */
    var myChart = echarts.init(document.getElementById('real'));
  

    // 指定图表的配置项和数据
    var option = {
        tooltip : {
            formatter: "{a} <br/>{c} {b}"
        },
        series : [
            {
                name:'里程',
                type:'gauge',
                center : ['20%', '55%'],    // 默认全局居中
                radius : '40%',
                min:0,
                max:500000,
                endAngle:15,
                splitNumber:4,
                 axisLine: {            // 坐标轴线
                    lineStyle: {       // 属性lineStyle控制线条样式
                        width: 5,
                        color: [[0.2, '#21bbbd'],[0.8, '#4695ce'],[1, '#cc666d']],
                        shadowBlur: 1
                    }
                },
                axisLabel: {           // 坐标轴文本标签，详见axis.axisLabel
                    formatter: function(v){
                        switch (v+''){
                            case '10': return '高';
                            case '50': return '中';
                            case '90': return '低';
                            default: return '';
                        }
                    },
                    textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                        color: '#fff',
                        fontSize: 12,
                        fontWeight: 'bolder'
                    }
                },
                axisTick: {            // 坐标轴小标记
                    length: 5,        // 属性length控制线长
                    lineStyle: {       // 属性lineStyle控制线条样式
                        color: '#fff'
                    }
                },
                splitLine: {           // 分隔线
                    length: 15,         // 属性length控制线长
                    lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                         width:3,
                        color: '#fff'
                    }
                },
                pointer: {
                    width:5,           // 分隔线
                    shadowColor : '#fff', //默认透明
                    shadowBlur: 5,
                    color: 'rgba(30,144,255,0.8)',
                },
                title : {
                    textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                        fontWeight: 'bolder',
                        fontSize: 12,
                        fontStyle: 'italic',
                        color: '#333',
                        shadowColor : '#fff', //默认透明
                        shadowBlur: 10
                    }
                },
                detail : {
                    backgroundColor: 'rgba(30,144,255,0.8)',
                    borderWidth: 1,
                    borderColor: '#fff',
                    shadowColor : '#fff', //默认透明
                    shadowBlur: 5,
                    width: 50,
                    height: 25,
                    offsetCenter: [0, '50%'],       // x, y，单位px
                    textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                        fontWeight: 'bolder',
                        color: '#fff',
                        fontSize:"13"
                    }
                },
                data:[{value: a1, name: '累积里程'}]
            },
            {
                name: '速度',
                type: 'gauge',
                z: 2,
                min: 0,
                max: 220,
                center: ['50%', '50%'],
                splitNumber: 11,
                radius: '70%',
                axisLine: {            // 坐标轴线
                    lineStyle: {       // 属性lineStyle控制线条样式
                        width: 15,
                        color: [[0.18, '#21bbbd'],[0.82, '#4695ce'],[1, '#cc666d']],
                        shadowBlur: 1
                    }
                },
                axisLabel: {            // 坐标轴小标记
                    textStyle: {       // 属性lineStyle控制线条样式
                        fontWeight: 'bolder',
                        color: '#717171'
                    }
                },
                axisTick: {            // 坐标轴小标记
                    length: 5,        // 属性length控制线长
                    lineStyle: {       // 属性lineStyle控制线条样式
                        color: '#fff'
                    }
                },
                splitLine: {           // 分隔线
                    length: 15,         // 属性length控制线长
                    lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                         width:3,
                        color: '#fff'
                    }
                },
                pointer: {           // 分隔线
                    shadowColor : '#fff', //默认透明
                    shadowBlur: 5,
                    color: 'rgba(30,144,255,0.8)',
                },
                title : {
                    textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                        fontWeight: 'bolder',
                        fontSize: 14,
                        fontStyle: 'italic',
                        color: '#333',
                        shadowColor : '#fff', //默认透明
                        shadowBlur: 10
                    }
                },
                detail : {
                    backgroundColor: 'rgba(30,144,255,0.8)',
                    borderWidth: 1,
                    borderColor: '#fff',
                    shadowColor : '#fff', //默认透明
                    shadowBlur: 5,
                    width: 50,
                    height: 30,
                    offsetCenter: [0, '50%'],       // x, y，单位px
                    textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                        fontWeight: 'bolder',
                        color: '#fff',
                        fontSize:"18"
                    }
                },
                data:[{value: b1, name: '车速km/h'}]
            },{
                name: '电量',
                type: 'gauge',
                center: ['80%', '67%'],    // 默认全局居中
                radius: '40%',
                min:100,
                max:0,
                startAngle: 180,
                endAngle: 0,
                splitNumber:5,
                axisLine: {            // 坐标轴线
                    lineStyle: {       // 属性lineStyle控制线条样式
                        width: 40,
                        color: [[0.2, '#2ec7c9'],[0.8, '#5ab1ef'],[1, '#d87a80']],
                    }
                },
                axisTick: {            // 坐标轴小标记
                    length:2,        // 属性length控制线长
                    lineStyle: {       // 属性lineStyle控制线条样式
                        color: '#fff'
                    }
                },
                splitLine: {           // 分隔线
                    length:8,         // 属性length控制线长
                    lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                        color: '#eee'
                    }
                },
                axisLabel: {           // 坐标轴文本标签，详见axis.axisLabel
                    formatter: function(v){
                        switch (v+''){
                            case '10': return '高';
                            case '50': return '中';
                            case '90': return '低';
                            default: return '';
                        }
                    },
                    textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                        color: '#fff',
                        fontSize: 12,
                        fontWeight: 'bolder'
                    }
                },
                pointer: {
                    width:5,
                    length: '90%',
                    color: 'rgba(255, 255, 255, 0.8)'
                },
                title : {
                    show : true,
                    offsetCenter: [0, '-60%'],       // x, y，单位px
                    textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                        color: '#fff',
                        fontSize: 10
                    }
                },
                detail : {
                    show : true,
                    backgroundColor: 'rgba(0,0,0,0)',
                    borderWidth: 0,
                    borderColor: '#ccc',
                    width: 100,
                    height: 40,
                    offsetCenter: [0, 13],       // x, y，单位px
                    formatter:'{value}%',
                    textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                        fontSize : 15
                    }


                },
                data:[{value: c1, name: '电量'}]
            }

        ]
    };
        
        myChart.setOption(option,true);
        $(window).on('resize',function(){
            myChart.resize();
        });
    /*
        实时车速电量 结束
    */

};

/*
    储能系统列表函数
*/
/*function powerList(){
    powerV1();
    powerT1();
}; */
/*
    储能系统1 电压 开始
*/
function powerV1(data,yMax){
    /*
        电池储能子系统1 电压 开始
    */
    var voltage1 = echarts.init(document.getElementById('voltage1'));
    var dataAxis = [];
   
    var dataShadow = [];
    var MAXNUMBER = 1000000000000000;



    for (var i = 0; i < data.length; i++) {
        dataShadow.push(yMax);
        dataAxis.push("序号"+ (i + 1));
    }

    option = {
        title: {
            text: '电压'
        },
        tooltip : {
            trigger : "axis",
            axisPointer : {
                type : "line",
                textStyle : {
                    color : "#fff"
                }

            },
        },
        grid : {
            borderWidth : 0,
            top : 60,
            bottom : 95,
            textStyle : {
                color : "#fff"
            },
            width:'auto'
        },
        legend : {
            x : '4%',
            top : '2%',
            textStyle : {
                color : '#90979c',
            },
            data : [
                    '单体电压（v）' 
                    ]
        },

        calculable : true,
        xAxis: {
            data: dataAxis,
            axisLabel: {
                textStyle: {
                    color: '#333'
                }
            },
            axisTick: {
                show: false
            },
            axisLine: {
                show: false
            },
            z: 100
        },
        yAxis: {
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                textStyle: {
                    color: '#111'
                }
            }
        },
        dataZoom: [
            {
                "show" : true,
                "height" : 20,
                "xAxisIndex" : [ 0 ],
                bottom : 10,
                "start" : 1,
                "end" : 60,
                handleIcon : 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
                handleSize : '90%',
                handleStyle : {
                    color : "#d3dee5",

                },
                textStyle : {
                    color : "#808080"
                },
                borderColor : "#90979c"

            },
            {
                "type" : "inside",
                "show" : true,
                "height" : 15,
                "start" : 1,
                "end" : 35
            } 
        ],
        series: [
            { // For shadow
                type: 'bar',
                itemStyle: {
                    normal: {color: 'rgba(0,0,0,0.05)'}
                },
                barGap:'-100%',
                barCategoryGap:'40%',
                data: dataShadow,
                animation: false
            },
            {
                type: 'bar',
                label:{ 
                    normal:{ 
                        show: true, 
                        position: "top"
                    } 
                },
                tooltip : {
                    trigger: 'axis'
                },
                markPoint : {
                    data : [
                        {type : 'max', name: '最大值'},
                        {type : 'min', name: '最小值'}
                    ]
                },
                markLine : {
                    silent: true,
                        data: [
                            {
                                yAxis: 3.5      /*准线  */
                            }
                        ]
                },
                itemStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 0, 1,
                            [
                                {offset: 0, color: '#83bff6'},
                                {offset: 0.5, color: '#1db58c'},
                                {offset: 1, color: '#188df0'}
                            ]
                        )
                    },
                    emphasis: {
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 0, 1,
                            [
                                {offset: 0, color: '#2378f7'},
                                {offset: 0.7, color: '#2378f7'},
                                {offset: 1, color: '#83bff6'}
                            ]
                        )
                    }
                },
                data: data
            }
        ]
    };

    // Enable data zoom when user click bar.
    var zoomSize = 6;
    voltage1.on('click', function (params) {
        console.log(dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)]);
        voltage1.dispatchAction({
            type: 'dataZoom',
            startValue: dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)],
            endValue: dataAxis[Math.min(params.dataIndex + zoomSize / 2, data.length - 1)]
        });
    });
    voltage1.setOption(option);

    $(window).on('resize',function(){
            voltage1.resize();
    });




    /*
        电池储能子系统1 电压 结束
    */

};
/*
    储能系统1 电压 结束
*/
/*
    储能系统1 温度 开始
*/
function powerT1(data,yMax){
    /*
        电池储能子系统1 电压 开始
    */
    var temperature1 = echarts.init(document.getElementById('temperature1'));
    var dataAxis = [];
  

    var dataShadow = [];
    
    $(window).on('resize',function(){
        temperature1.resize();
});
    
    
    for (var i = 0; i < data.length; i++) {
        dataShadow.push(yMax);
        dataAxis.push("序号"+ (i + 1));
    }

    option = {
        title: {
            text: '温度'
        },
        legend: {
            data:['温度'],
            x: 'left'
        },
        tooltip : {
            trigger : "axis",
            axisPointer : {
                type : "line",
                textStyle : {
                    color : "#fff"
                }

            },
        },
        grid : {
            borderWidth : 0,
            top : 60,
            bottom : 95,
            textStyle : {
                color : "#fff"
            },
            width:'auto'
        },
        legend : {
            x : '4%',
            top : '2%',
            textStyle : {
                color : '#90979c',
            },
            data : [
                    '单体电压（v）' 
                    ]
        },

        calculable : true,
        xAxis: {
            data: dataAxis,
            axisLabel: {
                textStyle: {
                    color: '#333'
                }
            },
            axisTick: {
                show: false
            },
            axisLine: {
                show: false
            },
            z: 100
        },
        yAxis: {
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                textStyle: {
                    color: '#111'
                }
            }
        },
        dataZoom: [
            {
                "show" : true,
                "height" : 20,
                "xAxisIndex" : [ 0 ],
                bottom : 10,
                "start" : 1,
                "end" : 60,
                handleIcon : 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
                handleSize : '110%',
                handleStyle : {
                    color : "#d3dee5",

                },
                textStyle : {
                    color : "#808080"
                },
                borderColor : "#90979c"

            },
            {
                "type" : "inside",
                "show" : true,
                "height" : 15,
                "start" : 1,
                "end" : 35
            } 
        ],
        series: [
            { // For shadow
                type: 'bar',
                itemStyle: {
                    normal: {color: 'rgba(0,0,0,0.05)'}
                },
                barGap:'-100%',
                barCategoryGap:'40%',
                data: dataShadow,
                animation: false
            },
            {
                type: 'bar',
                label:{ 
                    normal:{ 
                        show: true, 
                        position: "top"
                    } 
                },
                tooltip : {
                    trigger: 'axis'
                },
                markPoint : {
                    data : [
                        {type : 'max', name: '最大值'},
                        {type : 'min', name: '最小值'}
                    ]
                },
                markLine : {
                    data : [
                        {type : 'average', name: '平均值'}
                    ]
                },
                itemStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 0, 1,
                            [
                                {offset: 0, color: '#83bff6'},
                                {offset: 0.5, color: '#188df0'},
                                {offset: 1, color: '#188df0'}
                            ]
                        )
                    },
                    emphasis: {
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 0, 1,
                            [
                                {offset: 0, color: '#2378f7'},
                                {offset: 0.7, color: '#2378f7'},
                                {offset: 1, color: '#83bff6'}
                            ]
                        )
                    }
                },
                data: data
            }
        ]
    };

    // Enable data zoom when user click bar.
    var zoomSize = 6;
    temperature1.on('click', function (params) {
        console.log(dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)]);
        temperature1.dispatchAction({
            type: 'dataZoom',
            startValue: dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)],
            endValue: dataAxis[Math.min(params.dataIndex + zoomSize / 2, data.length - 1)]
        });
    });
    temperature1.setOption(option);

    




    /*
        电池储能子系统1 电压 结束
    */

}


/*
    储能系统1 温度 结束
*/  

