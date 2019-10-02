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

	var popup = 'https://www.youtube.com/embed/G1nnvjR89oc?controls=0';
	//윈도우 팝업
	$('#cnt2 .area > a').on('click',function(){
		window.open(popup, 'pop', 'left=400, top =200, width=1000 , height=600');
		return false;
	});
	//더보기

	 /* 문서 로딩시 보여지도록 함수 호출
        load(보여질 목록의 부모태그, 처음에 보여질 리스트 개수)*/
		load('#listwrap', '12');    

		//클릭시 추가로 보여지기
		$('#js-btn-wrap .button').on('click', function (e) {
		  e.preventDefault();
		  //load(보여질 목록의 부모태그, 추가될 리스트 개수, 더보기 버튼을 담는 부모)
		  load('#listwrap', '6');
		});


	function load(id, cnt) {
		var more_list = id + ' .load:not(.active)';   //#js-load .js-load:not(.active) : 현재 남겨진 li 선택자
		var more_length = $(more_list).length;    //남겨진 리스트들의 개수
		var more_total_cnt;  //추가될 리스트 개수

		//console.log(more_length);

		if (cnt < more_length) { //남겨진 리스트의 개수가 클릭시 보여질 개수보다 클 경우
		more_total_cnt = cnt;  //한번에 보여질 개수를 more_total_cnt에 대입 시키기
		} else {                 //남겨진 개수가 적다면
		more_total_cnt = more_length; //남겨진 개수를 more_total_cnt이란 변수에 대입 시켜라
		$('.button').hide()   //남겨진 개수가 적으므로 더이상 more를 클릭할수 없도록 버튼을 제거
		}

		//클릭할때 마다 4개씩active란 class명 추가하기
		$(more_list + ':lt(' + more_total_cnt + ')').addClass('active');
		console.log('남겨진 리스트들의 개수 : ' + more_length, ', 추가될 리스트 개수 : ' +  more_total_cnt);

	}	
	

	

});
	  