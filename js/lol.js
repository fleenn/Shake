//判定摇动的偏移量
var SHAKE_THRESHOLD = 3000;
//上次摇晃的时间
var last_update = 0;
//上次以及当前的陀螺仪坐标
var x = y = z = last_x = last_y = last_z = 0;
//摇晃次数
var count = 0
	//倒计时
var i = 11;
//分数
var score = 0

var audio = new Audio();
audio.src = "music/tokyo_hot.mp3"

//监听手机晃动事件
function init() {
	if (window.DeviceMotionEvent) {
		window.addEventListener('devicemotion', deviceMotionHandler, false);
	} else {
		alert('not support mobile event');
	}
}

function deviceMotionHandler(eventData) {
		var acceleration = eventData.accelerationIncludingGravity;
		var curTime = new Date().getTime();
		if ((curTime - last_update) > 50) {
			var diffTime = curTime - last_update;
			last_update = curTime;
			x = acceleration.x;
			y = acceleration.y;
			z = acceleration.z;
			var speed = Math.abs(x + y + z - last_x - last_y - last_z) / diffTime * 10000;
			if (speed > SHAKE_THRESHOLD) {

				//摇动进度条的外层div高度
				var content_height = $(".shock_content").height();
				if (count * 5 <= content_height * 0.52) {
					score = (count * 5) / (content_height * 0.52505) * 11111
					count++;
					//					score = count * 100;
					$(".lol_bar").css("height", count * 5);
				} else {
					score = 15000
					$(".lol_bar").css("background-color", "#4EC83B")
					return false;
				}
			}
			last_x = x;
			last_y = y;
			last_z = z;
		}
	}
	//倒计时行数

function send() {
	i--;
	if (i == -1) {
		var c = $("#score_hidden").val();
		var _percent = score/15500*100;
		$(".shock").hide();
		$(".finish").css("display", "block");
		$("#score").text(Math.floor(score));
		$("#percent").text(Math.floor(_percent));
		if(score >=5000 && score <10000){
			$("#score_tittle").attr("src","img/big_lol.png")
		}else if(score >= 10000){
			$("#score_tittle").attr("src","img/strong_lol.png")
		}
		return false;
	}
	$("#second").text(i);
	setTimeout("send();", 1000);
}
$(function() {
	//	排行榜点击事件
	$("#rank").on("click", function() {
		$(".list").fadeIn("200");
		$(".conten_button").css("display", "block");
		$("#rank_list").css("display", "block");
		$(".rules").css("display", "none");
		$(".tiyanjin").css("display", "none");
		$("#tittle_list").attr("src", "img/tittle_list.png")
	});
	//	开撸点击事件
	$("#lol").on("click", function() {
		$(".overlay").fadeIn("100")
		$(".shock").fadeIn("200")
		audio.play();
	});
	//	退出遮罩和弹窗
	$(".overlay").on("click", function() {
		$(".overlay").fadeOut("200")
		$(".shock").fadeOut("100")
	});
	//	活动规则按钮点击事件
	$("#notice").on("click", function() {
		$(".list").css("display", "block");
		$(".conten_button").css("display", "none");
		$("#rank_list").css("display", "none");
		$(".rules").fadeIn("200");
		$(".tiyanjin").css("display", "none");
		$("#tittle_list").attr("src", "img/rule.png")
	});
	//	使用体验金按钮点击事件
	$("#use").on("click", function() {
		$("#rank_list").css("display", "none");
		$(".tiyanjin").fadeIn("200");
	});
	//	弹窗关闭按钮
	$(".icon-close").on("click", function() {
			$(".list").fadeOut("100");
			$(".rules").fadeOut("100");
		})
		//	上传分享页面
	$("#share").on("click", function() {
		$(".overlay").css("display", "block");
		$(".share_wrapper").css("display", "block");
	})
});