var query = getQuery();
if(query.id == undefined) {
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
			keyid: '99c27b689be1e1c4f463e2bb64ee33a1',
			format: 'json',
      id: query.id
	};

	$.getJSON(url, params, function(result) {
		if(result.error == undefined && result.total_hit_count==1) {
			entermcd(result);
		} else {
			$('#question').html("この辺マクドないわ");
			$('#message').html("<br>すまんな");
			$('#chara').attr("src","img/ika_nico.png");
			updatetwtbutton("マクドが見つからなかったので断食に決まりました");
		}
	});
}

function entermcd(result){
  var yuju = query.yuju;
  showOpenTime(result.rest.opentime);
  codeAddress(result.rest.address);
  updatetwtbutton('Meshinatorで「' + result.rest.name + '」へ行くのがベストだと気づいたのさ');
}

//ツイートボタンの文章を更新
function updatetwtbutton(twtmessage) {
	var button = '<a href="https://twitter.com/share?ref_src=twsrc%5Etfw" class="twitter-share-button" data-text="'+twtmessage+'" data-url="https://team2017-4.spiral.cloud/" data-hashtags="Meshinator" data-show-count="false"></a>';
	$('#twbtn').html(button);
	twttr.widgets.load();
}
