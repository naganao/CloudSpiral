//URLからクエリを取得
function getQuery() {
  var vars = [], max = 0, hash = "", array = "";
  var url = window.location.search;

      //?を取り除くため、1から始める。複数のクエリ文字列に対応するため、&で区切る
  hash  = url.slice(1).split('&');
  max = hash.length;
  for (var i = 0; i < max; i++) {
      array = hash[i].split('=');    //keyと値に分割。
      vars.push(array[0]);    //末尾にクエリ文字列のkeyを挿入。
      vars[array[0]] = array[1];    //先ほど確保したkeyに、値を代入。
  }

  return vars;
}

//営業時間を表示する関数
function showOpenTime(opentime){
	if(opentime != undefined && opentime.length != undefined){
		$('#opentime').html("営業時間："+opentime);//営業時間を表示
	}else{
		$('#opentime').text('');	//営業時間が取得できない場合何も表示しない
	}
}

//予算を表示する関数
function showBudget(bgt){
	if(bgt != undefined && bgt.length != undefined)
	    $('#budget').text("予算："+bgt + "円");//予算が表示できる倍は表示
	else
		$('#budget').text('');//取得できなかった場合は何も表示しない
}

//電話番号を返す関数
function getTelephoneNo(tel){
	if(tel != undefined && tel.length != undefined){
		telephoneNo = tel;
	}else{
		telephoneNo = null;
	}
  return telephoneNo;
}

//お店の住所から地図を表示する関数
function codeAddress(inaddress){
	var hash = inaddress.split(' ');
	var address = hash[0]+' '+hash[1];
	var geocoder = new google.maps.Geocoder();

	// 地図表示に関するオプション
	var mapOptions = {
			zoom: 18,
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			scrollwheel: true // マウスホイールによるズーム操作を有効
	};

	// 地図を表示させるインスタンスを生成
	var map = new google.maps.Map(document.getElementById("map"), mapOptions);

	// geocoder.geocode()メソッドを実行
	geocoder.geocode( { 'address': address}, function(results, status) {
		// ジオコーディングが成功した場合
		if (status == google.maps.GeocoderStatus.OK) {
			// google.maps.Map()コンストラクタに定義されているsetCenter()メソッドで
			// 変換した緯度・経度情報を地図の中心に表示
			map.setCenter(results[0].geometry.location);

			// 地図上に目印となるマーカーを設定
			// google.maps.Marker()コンストラクタにマーカーを設置するMapオブジェクトと
			// 変換した緯度・経度情報を渡してインスタンスを生成
			var marker = new google.maps.Marker({
				map: map,
				position: results[0].geometry.location
			});

			$('#locate').text(marker.position);

		} else {// ジオコーディングが成功しなかった場合
			console.log('Geocode was not successful for the following reason: ' + status);
		}
	});
}
