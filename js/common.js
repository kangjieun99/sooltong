$(document).ready(function (){
	function gnbOn () {
		var $header = $('#header');
		var $gnb=$("#gnb>ul");
		$gnb.find(" li ul").hide();	//depth2의 ul 태그는 자동으로 숨기고 시작

		//1)depth1 <a>에 마우스 진입:mouseenter, focus
		$gnb.find(">li>a").on("mouseenter focus",function  () {
			//초기화
			$gnb.find(">li.on").removeClass("on").children("ul").hide();
			$header.removeClass('active');

			//현재설정
			$(this).parent().has('ul').closest($header).addClass('active');	//#header 너비의 100% 흰색바 생성을 위한 클래스명 추가
			$(this).next().show().parent().addClass("on");
		});

		//2)nav에서 마우스 떠나기:mouseleave
		$gnb.on("mouseleave",function  () {
			$header.removeClass('active');
			$gnb.find(">li.on").removeClass("on").children("ul").hide();
		});

		//3)blur: shift탭을 눌러서 gnb에서 포커스가 나가던지, 탭을 눌러 gnb에서 포커스가 나가던지, 
		$("#gnb a:first , #gnb a:last").on("blur",function  () {
			setTimeout(function  () {
				if ( !$("#gnb a").is(":focus") ) {
					$gnb.mouseleave();
				}1
			}, 10);
		});
	}
	gnbOn();

	// top 이동
	$(window).on("scroll",function  () {
		$(".top_btn").on("click",function  () {
			$("html, body").stop().animate({scrollTop:0});
			return false;
		});
	});

	// 평점순 선택

	$("#category .area .option .select ul li a").on("click", function () {
		console.log('a');
		var $lang = $("#category .option .select");
		var idx = $(this).parent().index();
		var txt = $(this).text().toLowerCase();

		$(this).closest(".select").toggleClass("active");

		if ($lang.hasClass("active")) $lang.stop().animate({height:120}, "fast");
		else $lang.stop().animate({height:30}, "fast");

		if (idx == 1) location.href = '?select=' + txt;

		return false;
	});
	//레이어팝업
	$("#cnt1 .area .txt1 a").click(function(){
		$('.layer_bg').show();
		$('.layer').slideDown(300);
	});
	$(".layer .close").click(function(){
		$('.layer_bg').hide();
		$('.layer').hide();
	});

	var popup = 'https://www.youtube-nocookie.com/embed/GXm9FPp5Vak?rel=0&amp;showinfo=0';
	//윈도우 팝업
	$('#cnt2 .area .video_box a').on('click',function(){
		window.open(popup, 'pop', 'left=400, top =400, width=800 , height=400');
		return false;
	});
});