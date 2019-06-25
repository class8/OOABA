/**
 * 
 */
$(function() {
	//form-login을 제출 하는 함수.
	$('#form-login').submit(function(e) {
		e.preventDefault();//form-login을 제출할때 페이지 이동을 하는 기본 기능을 막는 다.
		//form-login 에서 .txt-warning인 요소를 찾아  내용을 DOM에서 삭제를 하고 영역자체를 숨긴다(display=none;).
		$(this).find('.txt-warning').empty().hide();
		
		//태그id가 id인 요소의 값을 가져와 객체 id에 대입.
		var id = $('#id').val();
		//validateId 함수 적용후 리턴값이 false경우실행.
		if (!validateId(id)) {
			//태그id가 id인 요소의 next(다음태그)의 html내용을 'id는 이메일 형식입니다.' 로 설정후 보여라.
			$('#id').next().html('id는 이메일 형식입니다.').show();
			return;
		}
		
		//태그id가 password인 요소의 값을 가져와 객체 password에 대입.
		var password = $('#password').val();
		//validateId 함수 적용후 리턴값이 false경우실행.
		if (!validatePassword(password)) {
			//태그id가 password인 요소의 next(다음태그)의 html내용을 '패스워드를 입력하세요' 로 설정후 보여라.
			$('#password').next().html('패스워드를 입력하세요').show();
			return;
		}
		//입력한 id,password를 매개변수로 submit 함수를 호출 .
		submit(id,password);
	});
	//btn-home 버튼 클릭시 index.html로 화면이 바뀐다.
	$('#btn-home').click(function() {
		document.location.href = 'index.html';
	});
});

//id 를 정규식으로 검사하는 함수 validateId
function validateId(id) {
	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	//test는 jquery 내장함수  찾는문자열이,들어있는지 아닌지를 알려준다.
	//id객체를 대입 re.test()에 넣어주면 대입한 id객체 의 값에 re가 들어가 있는지 확인한다.
	return re.test(id);
}

//password 를 정규식으로 검사하는 함수 validateId
function validatePassword(password) {
	var re = /^(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/;
	//test는 jquery 내장함수  찾는문자열이,들어있는지 아닌지를 알려준다.
	//password 객체를 대입 re.test()에 넣어주면 대입한 password 의 값에 re가 들어가 있는지 확인한다.
	return re.test(password);
}

function submit(id,password) {
	//객체 리터럴 방식으로 params 객체 생성
	var params ={
			id:id,
			password:password,
	};
	
	
	//http post 요청을 사용하여 서버에서 테이터를 로드하십시오.
	//some-server-url : 정보를 요청할 url
	//params : 서버로 보낼 data
	//fucntion(r) : 요청이 성공하면 실행될 콜백 함수
	$.post('some-server-url',params,function(r) {
		//요청이 완료되면 실행.
		console.log(r);
	});
	
}