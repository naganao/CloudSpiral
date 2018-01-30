var query = getQuery();
if(query.id == undefined) {
	$('#question').html("お店が見つかりませんでした");
	$('#message').html("<br>もう一度やり直してください");
	$('#chara').attr("src","img/ika_bad.png");
} else if(query.id == "mcd") {
	$('#question').html("この辺マクドないわ");
	$('#message').html("<br>すまんな");
	$('#chara').attr("src","img/ika_nico.png");
	updatetwtbutton("マクドが見つからなかったので断食に決まりました");
} else {
	searchRestaurant();
}

function searchRestaurant(){
	var url = 'https://api.gnavi.co.jp/RestSearchAPI/20150630/?callback=?';
//	パラメータの作成
	params = {
		keyid: 'c7099386a6277495ec9250cd4685ea6f',
		format: 'json',
      	id: query.id
	};

	$.getJSON(url, params, function(result) {
		if(result.error == undefined && result.total_hit_count==1) {
			entershop(result);
			$('#chara').attr("src","img/ika_nico.png");
		} else {
			var msg;
			console.log(result.error);
			$('#question').html("お店が見つかりませんでした");
			$('#chara').attr("src","img/ika_bad.png");
		}
	});
}

//店が決定した際に呼び出される関数
function entershop(result) {
    var telephoneNo = getTelephoneNo(result.rest.tel);
	
	if(telephoneNo == null){
		$('#question').html("やった！　さっそく" + result.rest.name + "にいきましょう！");
	}else{
		$('#question').html("やった！　さっそく" + result.rest.name + "にいきましょう！<br>予約はこちらに：" + telephoneNo);
	}
		$('#gurunavi-url').html("店舗情報は<a href=" + result.rest.url + ">" + "こちら" + "</a>");
		var yujunum = Number(query.yuju);
		if(	Number.isInteger(yujunum) && yujunum > -1 && yujunum < 1001) {
			var yujufudandeg = yujunum%10==0 ? (yujunum/10).toFixed(0) : (yujunum/10).toFixed(1);
			$('#yujufudan').html('優柔不断度：'+ yujufudandeg + '%');
		}
    showOpenTime(result.rest.opentime);
    codeAddress(result.rest.address);
	showBudget(result.rest.budget);
	updatetwtbutton('Meshinatorで「' + result.rest.name + '」へ行くことに決めました');
}

//ツイートボタンの文章を更新
function updatetwtbutton(twtmessage) {
	var button = '<a href="https://twitter.com/share?ref_src=twsrc%5Etfw" class="twitter-share-button" data-text="'+twtmessage+'" data-url="https://team2017-4.spiral.cloud/" data-hashtags="Meshinator" data-show-count="false"></a>';
	$('#twbtn').html(button);
	twttr.widgets.load();
}