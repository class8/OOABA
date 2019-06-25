//입력 폼 로직 구현

$(function() {
	// 출생 년도 목록 생성 selectmenu()함수 사용
	generateYears($('#sel-birth'));

	var birthSelect = $('#sel-birth').selectmenu();
	// (jQuery ui의 selectmenu()함수를 사용한다)
	// 함수에 menuWidget라는 문자열을 인자로 주면 목록 엘리먼트를 반환한다
	// 그 후 엘리먼트에 높이 값을 지정하는데, 미리 정해 놓은 css클래스 overflow를 부여한다
	birthSelect.selectmenu('menuWidget').addClass('overflow');
	// 이벤트 핸들러 (유효성 체크를 한 후에 전송한다)
	$('#form-register').submit(
			function(e) {
				// 해당 함수는 이벤트의 기본 동작을 실행하지 못하게 막는 역할
				// 기본 동작은 개발자가 따로 지정해주지 않아도 브라우저가 알아서 처리해주는 동작
				e.preventDefault();

				// $(this)는 폼을 가리킨다. '.txt-warning' 클래스의 엘리먼트를 찾아 (find)의 값을 지우고
				// (empty)를 감춘다
				$(this).find('.txt-warning').empty().hide();

				// 이메일 값을 가져와 유효성을 체크한다
				var email = $('#inp-email').val();
				if (!validateEmail(email)) {
					$('#inp-email').next().html('잘못된 형식입니다.').show();
					return;
				}

				var password = $('#inp-password').val();
				if (!validatePassword(password)) {
					$('#inp-password').next().html(
							'대문자와 숫자가 포함된 최소 8 자의 문자열이어야 합니다.').show();
					return;
				}

				// 비밀 번호 일치하는지 확인
				var confirm = $('#inp-confirm').val();
				if (password !== confirm) {
					$('#inp-confirm').next().html('비밀번호와 일치하지 않습니다.').show();
					return;
				}

				// 성별 체크
				var gender = $('input[name="gender"]:checked').val();
				if (!gender) {
					$('#inp-female').siblings('.txt-warning').html('필수 항목입니다.')
							.show();
					return;
				}

				var birth = $('#sel-birth').val();
				if (!birth) {
					$('#sel-birth').siblings('.txt-warning').html('필수 항목입니다.')
							.show();
					return;
				}

				var accept = $('#inp-accept:checked').val();
				if (!accept) {
					$('#inp-accept').next().html('필수 항목입니다.').show();
					return;
				}
				submit(email, password, gender, birth);
			});
	// 나머지 항목들은 체크와 서버로 전송한다!
	$('#btn-back').click(function() {
		document.location.href = 'index.html';
	});
});

// 출생년도 목록을 생성한다.
function generateYears($select) {
	for (var i = 1970; i <= 2010; i++) {
		$select.append('<option value="' + i + '">' + i + '</option>');
	}

}

function validateEmail(email) {
	// email 유효성 검사
	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
}
function validatePassword(password) {
	var re = /^(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/;
	return re.test(password);
}

// submit (가입사항)에 필요한 것들이 다 들어 왔는지 확인을 한다
function submit(email, password, gender, birth) {
	var params = {
		email : email,
		password : password,
		gender : gender,
		birth : birth
	};
	$.post('some-server-url', params, function(r) {
		console.log(r); // 이벤트 객체
	});
}