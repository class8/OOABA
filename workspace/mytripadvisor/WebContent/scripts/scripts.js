/**
 * script.js 파일 20190624 김수현 담당
 */

$(function() {
	$(window).scroll(function() {
		var top = $(window).scrollTop();
		if (top > 0) {
			$('#header').addClass('inverted');
		} else {
			$('#header').removeClass('inverted');
		}

	});
	$(window).trigger('scroll');// trigger() 자동으로 불러온다
	/* $('#from').datepicker(); // datepicker의 정보를 가져온다 */
	var dpFrom = $('#from').datepicker({
		dateFormat : 'yy-mm-dd',// 날짜 형식 변경

		// minDate 설정값이 0이란 오늘을 나타낸다 1은 내일-1은 어제
		// 이전날짜는 선택하지 못하도록 제약을 건다
		// 시작날짜가 변경될때마다 종료 날짜의minDate를 그에 맞게 바꿔줘야 한다
		minDate : 0,
		// onselect() 함수는 사용자가 특정날짜를 선택했을때 호출되는 함수
		onSelect : function() {
			dpTo.datepicker('option', 'minDate', dpFrom.datepicker('getDate'));
		}// dpTo 의 minDate 옵션값을 dpFrom의 현재 날짜로 설정해준다

	});
	// 오늘날짜가 입력창에 표시된다,객체 생성될때 인스턴스-> new Date()
	dpFrom.datepicker('setDate', new Date());
	var dpTo = $('#to').datepicker({
		dateFormat : 'yy-mm-dd',
		minDate : 0
	});

	dpTo.datepicker('setDate', 4); // setDate의 인자값이 4인것은 3박 4일과 같이 오늘날짜에 4일을 더한
	// 날짜로 설정하는것이다

	// $.submit()함수로 from의 submit 이벤트 핸들러를 작성한다
	$('#form-search').submit(function(e) {
		e.preventDefault();// 기본동작이 실행되지 않도록 주의한다

		var from = $('#from').val();
		var to = $('#to').val();

		search(from, to);// 변수의 값을 각각 구하는 코드로 jquery 의 val()함수를 사용해 입력의 창값을
		// 가져오면 된다
	});

});

// 입력 창 값을 가져와서 콘솔에 보여준다
function search(from, to) {

	// api 경로 가져오는 주소
	var url = 'https://javascript-basic.appspot.com/searchLocation';

	// getJSON()함수로 Ajax요청한다 이 함수는 $.get()에 마지막 인자로 json을 넣는것과 동일한 역할을한다
	$.getJSON(url, {
		from : from,
		to : to
	}, function(r) {
		// console.log(r);// 콘솔로 한번 확인을 해봐라는 뜻!
		var $list = $('#list-panel');

		for (var i = 0; i < r.length; i++) {
			var data = r[i];
			var $item = createListItem(data);
			$list.append($item);// 인자로 받은 엘리먼트를 가장 마지막 자식요소로 추가한다
		}
		$('#list-bg').show();
	});
}
function createListItem(data) {
	// 일반 dom 엘리먼트 이므로 dom 일레먼트 복제 방법으로 jquery clone() 함수를 사용한다
	// 복제를 미친 엘리먼트는 더이상 템플릿이 아니기 때문에 id를 지워야 한다
	var $tmpl = $('#list-item-template').clone().removeAttr('id');

	$tmpl.find('.list-item-image').attr('src', data.titleImageUrl);
	$tmpl.find('.list-item-name').html(data.name);
	$tmpl.find('.list-item-city-name').html(data.cityName);

	// 각여행사의 상세보기 페이지로 이동하기 위한 핸들러
	// 각 여행지를 구분할수 있는 키가 필요->id속성이 그역할
	$tmpl.click(function(e) {
		var url = 'detail.html?id=' + data.id;

		window.location = url;
	});
	return $tmpl;
}
