$(document).ready(function(){
    var $visual = $('#minislider ul');
    var oneSize = $visual.children().outerWidth(true); //li의 한개의 가로크기
    var totalNum = $visual.children().length;//전체 li의 개수
    var viewNum = 2;
    var moveSize = viewNum * oneSize;
    var current = 1;
    var maxNum = Math.ceil(totalNum / viewNum);

    //console.log(oneSize,totalNum,moveSize,maxNum);

    //1.$visual 의 가로크기 css()
    $visual.css('width',oneSize * totalNum);

    $('#prev').on('click',function(){
        if ( $visual.is(':animated') ) return false;

        //current를 감소시키기 전에 1이 담겨있는지 확인하고 함수를 강제 종료
        if ( current == 1 ) return false;

        current--; //이전이므로 current변수의 값은 1씩 감소됨
        $visual.stop().animate({marginLeft:(current-1) * -moveSize });
       
    });
   /* 3) 다음버튼 클릭
    ★ $visual이 애니메이트 중이면 함수를 강제로 종료시키기
    전처리 추가) current에 담긴값이 3(maxNum)일 경우 => 함수를 강제 종료
    a) current변수에 담긴 값을 1씩 증가
    b) current는 3보다 커질수 없으므로 if 제거
    c) $visual 의 위치를 animate() : marginLeft / relative, left좌표값
    */
    $('#next').on('click', function () {
        //$visual이 애니메이트 중이면 함수를 강제로 종료
        if($visual.is(':animated'))return false;
        //current에 담긴값이 3(maxNum)일 경우 => 함수를 강제 종료
        if(current == maxNum)return false;

        //current변수에 담긴 값을 1씩 증가
        current++;

        //$visual 의 위치를 animate() : marginLeft
        $visual.stop().animate({marginLeft: (current-1) * -moveSize});
    });


    var $visual2 = $('.slider ul'); 

    /* 이전 클릭
    마지막 li를 잘라내어서 ul의 첫번째 자식으로 생성하기
    $(A부모).prepend(B자식);
     */
    
     $('#prev2').on('click',function(){
        $visual2.prepend($visual2.children().last());
     });

     /* 다음 클릭
    첫번째 li를 잘라내어서 ul의 마지막 자식으로 생성하기
    $(A부모).apend(B자식);
     */
     $('#next2').on('click',function(){
        $visual2.append($visual2.children().first());
     });

});