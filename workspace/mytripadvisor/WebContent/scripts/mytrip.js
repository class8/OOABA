var MARKER_LABELS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var map;
var markers = {}; // markers오브젝트 선언!

$(function() { // 쿠키에 저장된 데이터로 목록을 생성하는 함수!

	var myTrips = Cookies.getJSON('MYTRIPS'); // 쿠키에 저장된 여행지를 myTrip으로 받기!

	if (!myTrips) {

		myTrips = []; // myTrips로 받은 여행지를 저장할 배열 생성!
	}
	showMap();
	generateMyTripList(myTrips);
});

function generateMyTripList(list) { // 여행지 목록을 구현하는 함수!

	var bounds = new google.maps.LatLngBounds(); // 구글지도에서 좌표값을 생성!

	var $list = $('#mytrip-list'); // 선택된 여행지를 리스트에 추가!

	for (var i = 0; i < list.length; i++) { // 리스트에 잇는 모든 항목에 불러오기!

		var myTrip = list[i]; // 여행목록 배열 생성!

		var pos = { // 선택된 여행지의 좌표값을 저장!
			lat : myTrip.x,
			lng : myTrip.y
		};

		var markerLabel = MARKER_LABELS[i]; // 지도에 나타날 마커 배열 생성
		var $item = $('#mytrip-item-template').clone().removeAttr('id'); // $item에
		// 들어있는
		// id속성값을
		// 제거해
		// 준다.

		$item.data('id', myTrip.id); // 선택된 id를 저장
		$item.find('.item-name').html(markerLabel + '.' + myTrip.name); // 선택된
		// id의
		// name에
		// 마커라벨과
		// 여행지명을
		// 저장.
		$item.find('.item-city-name').html(myTrip.cityName); // 선택된 id의
		// city-name에
		// 도시명을 저장한다.

		$item.find('.item-remove').click(function() { // 여행지목록에서 여행지를 제거하는 함수!

			var $elem = $(this).closest('.mytrip-item');
			// closest() 함수를 사용해 제거하려는 엘리먼트를 $elem 에 넣어주고 remove()하면 화면에서 사라짐!
			var id = $elem.data('id'); // 선택된 여행지를 화면에서뿐만 아니라 쿠키에서도 제거해야하기때문에
			// $elemdp에선택된 해당 id를 id에 넣어 줌!

			$elem.remove(); // $elem을 remove시켜 화면에서 해당 여행지를 제거한다.
			// google.maps.Marker() 함수의 API에서는 setMap() 함수에 null을 주어 지도에서 해당마커를
			// 제거한다.
			markers[id].setMap(null);
			markers[id] = null;

			// 하지만 아래와 같이 쿠키저장목록에서 해당여행지를 제거해주지 않으면
			// 페이지를 새로고침 했을 때 제거한 목록이 그대로 남아있게 된다.
			// 따라서 아래와 같이 remove함수를 이용해 쿠키저장목록에서 해당여행지를 제거후 새로고침을 해줘야함!
			var newList = removeFromList(list, id); // 여행지 목록에서 삭제 된 후 여행지 목록
			// 새로고침
			Cookies.set('MYTRIPS', newList); // 쿠기의 저장내용도 새로고침!
		});

		$list.append($item); // 위에서 선택된 여행지의 데이터를 list로 불러온다.

		var marker = new google.maps.Marker({ // 지도에 마커생성함수!

			position : pos,
			label : markerLabel,
			map : map

		});

		markers[myTrip.id] = marker; // 지도에 표실될 마커에 선택된 여행지정보와 좌표값을 넣어 준다.
		bounds.extend(pos); // pos에 들어 있는 좌표값에 대한 마커를 지도에 표시한다.
	}

	map.fitBounds(bounds);// 위에서 저장 된 좌표로 마커를 나타낸다.
}

function removeFromList(list, id) { // 배열로부터 특정 id값의 요소를 제거한 결과를 반환

	var index = -1; // index의 초기값을 -1로 설정한다.

	for (var i = 0; i < list.length; i++) {

		// list 배열의 요소들을 하나씩 비교해 id값이 같다면 인덱스값을 갱신한 후 break문으로 빠져나온다.
		if (list[i].id === id) {

			index = i;

			break;
		}

	}

	if (index !== -1) {

		list.splice(index, 1);
		// 반복문이 끝난 시점에서 인덱스가 -1이 아니라면,
		// 원하는 요소를 찾은 것으로 splice()를 사용해 요소를 삭제한다.
	}

	return list; // 삭제된 요소를 제외한 나머지 list결과를 반환한다.
}

function showMap() {
	map = new google.maps.Map(document.getElementById('map'));
}
