$(function(){
	
	var sbid=$("input[name='sbid' ]").val();
	var pid=$("input[name='pid' ]").val();
	
	if(sbid == 0 && pid != 0)
	{
		// 父机构账号
		$("#clgl1").addClass("hide");
		
	}
	
	if(sbid != 0 && pid != 0){
		// 子机构账号
		$("#yhgl").addClass("hide");
		$("#clgl1").addClass("hide");
		
	}
});