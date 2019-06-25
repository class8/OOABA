var map;

$(function() {
	var id = parseId(window.location.search); //? 뒤의 값을 가져와서 parseId함수 호출후 결과값을 id 변수에 대입
	getDetail(id); //id값으로 getDetail함수 호출
	showMap(); 
});
function getDetail(id) {
	var url = 'https://javascript-basic.appspot.com/locationDetail';

	$.getJSON(url, {
		id : id
	}, function(r) {
		$('.detail-header-name').html(r.name); //장소명 설정
		$('.detail-header-city-name').html(r.cityName); //시도명 설정
		$('.detail-desc-text').html(r.desc); //장소소개 설정
		
		var $gallery = $('#detail-images'); //gallery변수에 이미지 영역 아이디 대입
		var images = r.subImageList; //images변수에 불러온 이미지 리스트 대입
		for(var i =0;i<images.length;i++){ //이미지 크기 만큼 반복
			var $image = $('<img src="'+images[i]+'"/>'); //image변수에 장소이미지 추가태그 대입
			$gallery.append($image); //이미지 영역에 이미지추가태그 삽입
		}
		Galleria.loadTheme('libs/galleria/themes/classic/galleria.classic.min.js'); //갤러리아 플러그인의 테마 로드
		Galleria.run('#detail-images'); //플러그인 실행
		
		showMarker(r.position.x,r.position.y); //구글 지도 위치 설정
		
		$('.btn-register').click(function(){ //등록하기 버튼 클릭시 함수 호출
			var myTrips = Cookies.getJSON('MYTRIPS'); //myTrips변수에 Cookies 값 대입
			
			//존재하지 않을 경우 빈 배열로 초기화
			if(!myTrips){
				myTrips =[];
			}
			//myTrips 변수에 현재 선택한 장소데이터 삽입
			myTrips.push({
				id:id, 
				name:r.name,
				cityName:r.cityName,
				x:r.position.x,
				y:r.position.y
			});
			Cookies.set('MYTRIPS',myTrips); //데이터 추가한 myTrips값을 쿠키값으로 새로 설정
			alert('여행지가 등록되었습니다.'); 
		});
	});
}
function parseId(str) { // ?부터 뒤의값을 str로 받아서 함수 실행
	//str = "?id=12"
	var s = str.substring(1); //"id=12"
	var args = s.split('&'); // & 기준으로 분해하여 tokens에 대입

	for (var i = 0; i < args.length; i++) {
		var arg = args[i];
		var tokens = arg.split('='); // = 기준으로 분해하여 tokens에 대입 
		//tokens[0]=id, tokens[1]=12

		if (tokens[0] === 'id') {
			return tokens[1];
			//12
		}
	}
	return null;
}
//지도를 보여주는 함수
function showMap(){
	map = new google.maps.Map(document.getElementById('map'),{ //지도 객체 생성
		zoom : 12, //확대
		center : {
			lat : 33.3617, //위도
			lng : 126.5292 //경도
		}
	});
}
//지도에 마커를 표시하는 함수
function showMarker(lat,lng){
	var pos ={
			lat : lat, //위도
			lng : lng //경도
	};
	new google.maps.Marker({
		position : pos, //매개변수로 받은 위도 경도에 위치
		map : map
	});
	map.panTo(pos);
}