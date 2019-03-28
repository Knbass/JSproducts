function init(){

	/*メソッドチェーン使わないとできないが*/
	getData("data/alphabet.json", setKyCd);
	getData("data/words.json",setWords);

    $('#field').append($('<div id="player_box" style="position: absolute;">'
    	               +     '<img id="player" src="img/playerR.png" />'
    	               +     '<meter id="player_hp" max='+player.getMaxHp()+' value='+player.getMaxHp()+' style="width: 130px; display: block; top:110px; position: absolute;" />'
    	               + '</div>'));
    $('#player_box').on('click', function(e){
    	e.stopPropagation();
    });
    initArea('bg.jpg', 500, 700);

    if(localStorage.getItem('Level')){
    	player.setLevel(localStorage.getItem('Level'));
    }
    if(localStorage.getItem('Exp')){
    	player.setExp(localStorage.getItem('Exp'));
    }
    if(localStorage.getItem('MAX_HP')){
    	player.setMaxHp(localStorage.getItem('MAX_HP'));
    }
    if(localStorage.getItem('POW')){
    	player.setPow(localStorage.getItem('POW'));
    }
    if(localStorage.getItem('DEF')){
    	player.setDef(localStorage.getItem('DEF'));
    }
    if(localStorage.getItem('SPD')){
    	player.setSpd(localStorage.getItem('SPD'));
    }
    $("#exp").val(player.getExp());
    $('#level').text(player.getLevel());

}

function initArea(bg,land_x,land_y){

	//矢印・オブジェクトの撤収
	//$("[id*='direction']").remove();

    //背景の設置
    $('#display').css({'background':'url("img/'+ bg +'")',
    	               'background-size':'200%',
    	               'background-position-x':400-land_x+'px',
    	               'background-position-y':200-land_y+'px',
    	               'background-repeat':'no-repeat'});

    //プレイヤーの設置
    $('#player_box').css({'top':'150px','left':'350px'});

	/*
    //矢印の設置
    for(var i = 0; i < changeArea.length; i++){
    	$('#field').append('<img id="direction'+ i +'" src="img/' + changeArea[i].direction +'.png" style="width: 50px; height: 50px; position: absolute;"/>')
	    $('#direction'+i).css({'left': changeArea[i].x +'px','top': changeArea[i].y +'px'});
	}

	$("[id*='direction']").on('click', function(e){

    	e.stopPropagation();

        var dist_x = getCssValue($(this),'left') - 400;
        var dist_y = getCssValue($(this),'top') - 200;
        var distance = Math.sqrt(Math.pow(dist_x, 2) + Math.pow(dist_y, 2));

        var changeArea = getChangeArea();
        if(distance < 150){
        	var directNo = parseInt($(this).attr('id').replace('direction', ''));
        	initArea(changeArea[directNo].bg, changeArea[directNo].land_x, changeArea[directNo].land_y);
       }
    });
    */
}

$(function() {

    init();

    //words = shuffle(words);

    function rtnCh(word, chCnt){
        return word.charAt(chCnt);
    }

    $('#mkene').on('click', function() {

        //ランダムな位置に配置
        var ene_pos = getEnemyPos();
        var rnd = Math.floor(Math.random()*ene_pos.length);

        //ポジションが空いていれば
        if(ene_pos[rnd].flg == -1){

            //ポジションの確保
            changeEnemyPosFlg(rnd,elm_cnt);

        	//ここに敵キャラと問題番号を紐づける処理が必要
        	var elm_cnt = elmCnt($("[id*='ene_box']"));
        	enemy[elm_cnt] = new Enemy(ene_pos[rnd].x, ene_pos[rnd].y, words[getQCnt()].no, words[getQCnt()].word, words[getQCnt()].mean);

            var ene_box = $('<div id="ene_box'+ elm_cnt+'" style="position: absolute;">'
                      +        '<div id="q_box">'
                      +           '<div id="mean"></div>'
                      +           '<div id="ans"></div>'
                      +        '</div>'
                      +        '<img id="enemy" src="img/enemy'+getRandomInt(3)+'.png" width="130" height="130" />'
                      +        '<meter id="ene_hp" max=100 value=100 style="width: 130px; display: block;" />'
                      +     '</div>');
            ene_box.css({'left': enemy[elm_cnt].x + 'px','top': enemy[elm_cnt].y + 'px'});

            $('#field').append(ene_box);

            $("#ene_box"+ elm_cnt +">#q_box>#mean").text(enemy[elm_cnt].mean);

            //敵
            $("[id*='ene_box']").on('click', function(e) {

            	var slct_elm = $(this).attr('id').replace('ene_box', '')

            	e.stopPropagation(); //親要素の処理を無効(フィールドは動かさない)

                var dist_x = getCssValue($(this),'left') + 1/2 * getCssValue($(this).children('#enemy'),'width') - 400;
                var dist_y = getCssValue($(this),'top') + 1/2 * getCssValue($(this).children('#enemy'),'height') + getCssValue($(this).children('#q_box'),'height') - 200;
                var distance = Math.sqrt(Math.pow(dist_x, 2) + Math.pow(dist_y, 2));

				if(distance < 150){					
	                setAns('');
	                //元々選択してたene_boxに対する処理。入力履歴を消去 + ロックオンを外す
	                $("#ene_box"+getSlctElm() + ">#q_box>#ans").text('');
	                $("#ene_box"+getSlctElm() + ">#lockon").remove();
	     
	                setSlctElm(slct_elm);
	                $("#ene_box"+getSlctElm() + ">#enemy").after($('<img id="lockon" src="img/lockon.png" />'));
				}
                setChCnt(0);
            });
        setQCnt(getQCnt()+1);
        }

    });

    $('#save').on('click', function() {
		localStorage.setItem('Level', player.getLevel()); 
		localStorage.setItem('Exp', player.getExp());
		localStorage.setItem('MAX_HP', player.getMaxHp()); 
		localStorage.setItem('POW', player.getPow());
		localStorage.setItem('DEF', player.getDef()); 
		localStorage.setItem('SPD', player.getSpd());

		var array = [];
		var missList = getMissList();
		for(var i = 0; i < missList.length; i++){
			var miss = missList[i];

			var obj = {
			  'no': miss[0],
			  'word': miss[1],
			  'mean': miss[2]
			};
			array.push(obj);
		}

		var setjson = JSON.stringify(array);
		localStorage.setItem('WORDS', setjson);

    });

    $('#delete_data').on('click', function() {
		localStorage.removeItem("Level");
		localStorage.removeItem("Exp"); 
		localStorage.removeItem("MAX_HP"); 
		localStorage.removeItem("POW");
		localStorage.removeItem("DEF"); 
		localStorage.removeItem("SPD");
		localStorage.removeItem("WORDS");	
    });

    //プレイヤーの移動
    $("#field").on('click', function(e){

    	//敵未選択に
    	$("#ene_box"+getSlctElm() + ">#lockon").remove();
    	setSlctElm(-1);

    	console.log(e.offsetX);
    	console.log($("#player_box").css('left').replace('px',''));
        //向き
        if(e.offsetX < $("#player_box").css('left').replace('px','')){
            $("#player").attr("src", "img/playerL.png");
        }else if(e.offsetX > getCssValue($("#player_box"),'left') + getCssValue($("#player_box"),'width')){
            $("#player").attr("src", "img/playerR.png");
        }

        //中心座標
        var centerX = 400;
        var centerY = 200;

        //移動:縦横
        var moveX = centerX - e.offsetX;
        var moveY = centerY - e.offsetY;
         
        //距離の計算
        var distance = Math.sqrt(Math.pow(moveX, 2) + Math.pow(moveY, 2));
          
        //座標
        var posX = -1*(getCssValue($("#display"),'background-position-x') + moveX - centerX);
        var posY = -1*(getCssValue($("#display"),'background-position-y') + moveY - centerY);
        console.log('('+posX+','+posY+')');

        //背景・敵・アイテム・オブジェクトが移動
        //背景
        $("#display").animate({
            'background-position-x': getCssValue($("#display"),'background-position-x') + moveX + 'px',
            'background-position-y': getCssValue($("#display"),'background-position-y') + moveY + 'px'
        }, distance * 10);
    
        //敵
        for(var i = 0; i < elmCnt($("[id*='ene_box']")); i++) {
        	moveObject($('#ene_box' + i), moveX, moveY, distance);
        }
        //オブジェクト
        var changeArea = getChangeArea();
        for(var i = 0; i < changeArea.length; i++){
        	moveObject($('#direction' + i), moveX, moveY, distance);
        }
    });
    
    $(document).keydown(function(e) {
        // 文字入力
        if(getChCnt() != -1 && getSlctElm() != -1) {
            var slctElm = getSlctElm();
            var ch = rtnCh(enemy[slctElm].word, chCnt);

            if (kyCdtoAlph[e.keyCode].small == ch
                || kyCdtoAlph[e.keyCode].capital == ch) {
                setAns(getAns() + ch);
                $("#ene_box"+getSlctElm() + ">#q_box>#ans").text(ans);
                setChCnt(getChCnt() + 1);
                $("#ene_box"+getSlctElm() + ">#ene_hp").val(((enemy[slctElm].word.length - getChCnt())/enemy[slctElm].word.length)*100); 
            } else {
            	player.setHp(player.getHp()-10);
            	$("#player_hp").val(player.getHp());

            	if(player.getHp() <= 0) {
	                $("#player_box").animate({
	                    opacity: "0"
	                }, 1000,
	                function(){
	                    $("#player_box").remove();
	                });
            	}

            	addMissList([enemy[slctElm].no, enemy[slctElm].word, enemy[slctElm].mean]);
            }

            if(getChCnt() >= enemy[slctElm].word.length) {

                setAns('');
                setChCnt(0);
                player.setExp(parseInt(player.getExp()) + parseInt(30));
                $("#exp").val(player.getExp());
                //敵のポジションを解放
                var ene_pos = getEnemyPos();
                for(var i = 0; i < ene_pos.length; i++){
                    if(ene_pos[i].flg == getSlctElm()){
                        changeEnemyPosFlg(i, false);
                    }
                }

                $("#ene_box" + getSlctElm()).animate({
                    opacity: "0"
                }, 1000,
                function(){
                    $("#ene_box" + getSlctElm()).remove();
                    setSlctElm(-1);
                });

                //レベルアップ
                if($("#exp").val() >= 100){
                	player.setExp(player.getExp() - 100);
                	$("#exp").val(player.getExp());
                	player.setLevel(parseInt(player.getLevel())+parseInt(1));
                	$('#level').text(player.getLevel());

                	//ステータスアップ
                	player.setMaxHp(parseInt(player.getMaxHp()) + 1);
                	player.setPow(parseInt(player.getPow()) + 1);
                	player.setDef(parseInt(player.getDef()) + 1);
                	player.setSpd(parseInt(player.getSpd()) + 1);

                	//HP全部回復
                	player.setHp(player.getMaxHp());
                	$("#player_hp").val(player.getHp());

                	//アニメーション
                	$('#player_box').append('<img id="levelup" src="img/levelup.png" width="150" height="50">');
	                $("#levelup").animate({
	                	'padding-bottom': '30px',
	                    opacity: "0"
	                }, 3000,
	                function(){
	                    $("#levelup").remove();
	                });
                }
            }
        }
    });
});
