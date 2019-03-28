var enemy_pos = [
    {x: '650', y: '200', flg: -1},
    {x: '350', y: '50',  flg: -1},
    {x: '700', y: '50',  flg: -1},
    {x: '50',  y: '100', flg: -1},
    {x: '100', y: '250', flg: -1},
    {x: '400', y: '150', flg: -1},
    {x: '550', y: '150', flg: -1},
    {x: '300', y: '250', flg: -1}
];

var changeArea = [
    {x: '1200', y: '200', direction: 'upRight', name: 'grass2', land_x: '0',    land_y: '200', bg:'bg2.jpg'},
    {x: '0'   , y: '200', direction: 'upLeft' , name: 'grass2', land_x: '1200', land_y: '0',   bg:'bg3.jpg'}
];

//wall area
var wall = [];
var enemy = [];

var stage_no = -1;
var q_cnt = 0;
var ans = '';
var chCnt = 0;
var slct_elm = -1;
var slct_q = -1;
var player = new Player(1,0,100,100,1,1,1);
var missList = [];

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
  var n = array.length;
  var t;
  var i;

  while (n) {
    i = Math.floor(Math.random() * n--);
    t = array[n];
    array[n] = array[i];
    array[i] = t;
  }

  return array;
}
function addMissList(element) {
    var dup_flag = true;
    for(var i = 0; i < missList.length; i++) {
        var miss = missList[i];
        if(element[i]==miss[i]){
            console.log("dup"+dup_flag);
            dup_flag = false;
        }
    }
    if(dup_flag){
        console.log("push"+dup_flag);
        missList.push(element);
    }

}
function getMissList() {
    return missList;
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
//引数以下の乱数を返す（0以外）
function getRandomInt(max) {
  return parseInt(Math.floor(Math.random() * Math.floor(max))) + 1;
}