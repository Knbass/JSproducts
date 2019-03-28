$(function() {

    var obj = [];

    obj = JSON.parse(localStorage.getItem('WORDS'));

    for(var i = 0; i < obj.length; i++){
        var array = obj[i];
        console.log(array);
        console.log(array.no);
    $('#review').append('<tbody>'
                      + '   <tr style="background-color:#fff;">'
                      + '       <td align="left">'+ array.word +'</td>'
                      + '       <td align="left">'+ array.mean +'</td>'
                      + '   </tr>'
                      + '</tbody>');
    }

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

    $('#level').text(player.getLevel());
    $('#exp').text(player.getExp());
    $('#hp').text(player.getMaxHp());
    $('#pow').text(player.getPow());
    $('#def').text(player.getDef());
    $('#spd').text(player.getSpd());
});
