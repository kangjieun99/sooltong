$(document).ready(function () {
    var $multiSlider = $('#multislider');
    var $visualEle = $multiSlider.find('.visual li');

    var oneSize = $visualEle.outerWidth(true);	//li 하나 크기
    var totalNum = $visualEle.length;					//복제 전 전체 li수
    var viewMax = 7;	//한 화면에 보여질 수
    var visWid = oneSize *(totalNum + viewMax*2);		//ul 너비 : 복제로 li 개수가 10*2(앞, 뒤에 복제)개 늘어남
    var startX = viewMax * -oneSize;					//시작시 ul 위치
    var current = 0;		//슬라이더 현재 보여지는 번호 저장
    var timer = 0;

    //console.log('li하나 크기 : ' + oneSize, ', 복제전 전체 li수 : ' + totalNum, ', ul 너비 : ' + visWid, ', 시작시 ul 위치 : ' + startX);
    //li하나 크기 : 205 , 복제전 전체 li수 : 15 , ul 너비 : 7175 , 시작시 ul 위치 : -2050

    //.visual 영역 앞 뒤로 10개씩 복제해 놓기(복제한 li는 .clone을 갖는다) => 초기 위치 지정
    $multiSlider.find('.visual').prepend( $visualEle.slice(-7).clone().attr('class', 'clone') ).append( $visualEle.slice(0, 7).clone().attr('class', 'clone') ).css('left', startX);

    //이전, 다음 버튼 클릭
    $multiSlider.find('.prev_next button').on('click', function () {
        if ($multiSlider.find('.visual').is(':animated')) return false;
        clearInterval(timer);

        var btnNum = $(this).index();		//0:이전, 1:다음

        //이전버튼 클릭
        if (btnNum == 0) nextAni(500, '이전버튼 클릭');
        //다음버튼 클릭
        else prevAni(500, '다음버튼 클릭');
    });

    function prevAni(duration, what) {
        current--;
        if (current < 0) {
            current = totalNum-1;
            $multiSlider.find('.visual').css({left: (totalNum+viewMax) * -oneSize});
        }
        $multiSlider.find('.visual').stop().animate({left: startX + current * -oneSize}, duration);
        console.log(what);
    }

    function nextAni(duration, what) {
        current++;
        if (current > totalNum) { 
            current = 1;
            $multiSlider.find('.visual').css({left: startX});
        }
        $multiSlider.find('.visual').stop().animate({left: startX + current * -oneSize}, duration);
        console.log(what);
    }

    //자동실행
    function autoPlay() {
        timer = setInterval(function () {
            nextAni(1300, '자동실행');
        }, 1300);
        console.log(timer);
    }
    autoPlay();

    //자동실행시 mouseenter, focusin일 경우 멈추기
    $multiSlider.on({
        'mouseenter focusin' : function (e) {
            clearInterval(timer);
            timer = 0;
            console.log(e.type + '일 경우 멈추기', timer);
        },
        'mouseleave focusout' : function  () {
            if (!timer) autoPlay();
        }
    });
});