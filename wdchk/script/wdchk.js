var enemy_pos = [
    {x: '650', y: '200', flg: -1},
    {x: '350', y: '50',  flg: -1},
    {x: '800', y: '0',   flg: -1},
    {x: '0',   y: '100', flg: -1},
    {x: '100', y: '250', flg: -1},
    {x: '400', y: '150', flg: -1}
];

var changeArea = [
    {x: '1200', y: '200', direction: 'upRight', name: 'grass2', land_x: '0',    land_y: '200', bg:'bg2.jpg'},
    {x: '0'   , y: '200', direction: 'upLeft' , name: 'grass2', land_x: '1200', land_y: '0',   bg:'bg3.jpg'}
];

//wall area
var wall = [];

var stage_no = -1;
var q_cnt = 0;
var ans = '';
var chCnt = 0;
var slct_elm = -1;
var slct_q = -1;

function init(){

	/*メソッドチェーン使わないとできないが*/
	getData("data/alphabet.json", setKyCd);
	getData("data/words.json",setWords);

    $('#field').append($('<img id="player" src="img/nekoR.png" />'));
    $('#player').on('click', function(e){
        console.log('hello');
    	e.stopPropagation();
    });
    initArea('bg.jpg', 500, 700);

}

function initArea(bg,land_x,land_y){

	//矢印・オブジェクトの撤収
	$("[id*='direction']").remove();

    //背景の設置
    $('#display').css({'background':'url("img/'+ bg +'")',
    	               'background-size':'200%',
    	               'background-position-x':400-land_x+'px',
    	               'background-position-y':200-land_y+'px',
    	               'background-repeat':'no-repeat'});

    //プレイヤーの設置
    $('#player').css({'top':'150px','left':'350px'});

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
}
function setAns(a){
    ans = a;
}
function getAns(){
    return ans;
}
function setChCnt(cc){
    chCnt = cc;
}
function getChCnt(){
    return chCnt;
}
function setSlctElm(se){
    slct_elm = se;
}
function getSlctElm(){
    return slct_elm;
}
function setSlctQ(q){
	slect_q = q;
}
function getSlctQ(){
	return slect_q;
}
function setQCnt(cnt){
    q_cnt = cnt;
}
function getQCnt(){
    return q_cnt;
}
function getEnemyPos(){
    return enemy_pos;
}
function changeEnemyPosFlg(n, flg){
    enemy_pos[n].flg = flg;
}
function getChangeArea(){
	return changeArea;
}
function shuffle(array) {
  var n = array.length, t, i;

  while (n) {
    i = Math.floor(Math.random() * n--);
    t = array[n];
    array[n] = array[i];
    array[i] = t;
  }

  return array;
}

function validator(){

    if(posX > 400 && posY > 200 && posX < 1200 && posY < 1000){
        return true;
    }else{
        // playerを壁に寄せる処理
        return false;
    }

}

//CSSの値を計算に扱う
function getCssValue(elm, attr){
	return parseInt(elm.css(attr).replace('px',''));
}

//キャラクター移動時の周囲のモーション
function moveObject(elm, moveX, moveY, distance) {
    $(elm).animate({
        'left': getCssValue(elm,'left') + moveX + 'px',
        'top': getCssValue(elm,'top') + moveY + 'px'
    }, distance * 10);
}
//ある文字列を含む要素数を数える
function elmCnt(elm) {
	return elm.length;
}

$(function() {

    init();

    function rtnCh(word, chCnt){
        return word.charAt(chCnt);
    }

    $('#mkelm').on('click', function() {

    	//words = shuffle(words);

        //ランダムな位置に配置
        var left = Math.random()*1000;
        var top  = Math.random()*150;
        var ene_pos = getEnemyPos();
        var rnd = Math.floor(Math.random()*ene_pos.length);

        //ポジションが空いていれば
        if(ene_pos[rnd].flg == -1){

        	//ここに敵キャラと問題番号を紐づける処理が必要
        	//var ;

            var ene_box = $('<div id="ene_box'+elmCnt($("[id*='ene_box']"))+'" style="position: absolute;"></div>');
            var q_box = $('<div id="q_box"></div>');
            var mean  = $('<div id="mean"></div>');
            var ans   = $('<div id="ans"></div>');
            var enemy = $('<img id="enemy" src="img/enemy.png" width="130" height="130" />');
            var hp    = $('<meter id="ene_hp" max=100 value=100 style="width: 130px; display: block;" />');
            ene_box.css({'left': ene_pos[rnd].x + 'px','top': ene_pos[rnd].y + 'px'});

            //ポジションの確保
            changeEnemyPosFlg(rnd,elmCnt($("[id*='ene_box']")));

            mean.text(words[getQCnt()].mean);

            //組み立て
            q_box.append(mean);
            q_box.append(ans); 

            ene_box.append(q_box);
            ene_box.append(enemy);
            ene_box.append(hp);

            $('#field').append(ene_box);

            //敵
            $("[id*='ene_box']").on('click', function(e) {

            	var slct_elm = $(this).attr('id').replace('ene_box', '')

            	//フィールドは動かさない
            	e.stopPropagation(); //親要素の処理を無効

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

    //プレイヤーの移動
    $("#field").on('click', function(e){

    	//敵未選択に
    	$("#ene_box"+getSlctElm() + ">#lockon").remove();
    	setSlctElm(-1);

        //向き
        if(e.offsetX < $("#player").css('left').replace('px','')){
            $("#player").attr("src", "img/nekoL.png");
        }else if(e.offsetX > getCssValue($("#player"),'left') + getCssValue($("#player"),'width')){
            $("#player").attr("src", "img/nekoR.png");
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
            var ch = rtnCh(words[slctElm].word, chCnt);

            if (kyCdtoAlph[e.keyCode].small == ch
                || kyCdtoAlph[e.keyCode].capital == ch) {
                setAns(getAns() + ch);
                $("#ene_box"+getSlctElm() + ">#q_box>#ans").text(ans);
                setChCnt(getChCnt() + 1);
                $("#q_box"+getSlctElm() + ">#hp").val(((words[slctElm].word.length - getChCnt())/words[slctElm].word.length)*100); 
            }

            if(getChCnt() >= words[slctElm].word.length) {

                setAns('');
                setChCnt(0);
                $("#exp").val($("#exp").val() + 30);
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
            }
        }
    });
});
