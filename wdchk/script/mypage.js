$(function() {

var obj = [];

obj = JSON.parse(localStorage.getItem('WORDS'));

console.log(obj);

for(var i = 0; i < obj.length; i++){
    var array = obj[i];
    console.log(array);
    console.log(array.no);
$('.table').prepend('<tbody>'
                  + '   <tr>'
                  + '       <td align="left">'+ array.no +'</td>'
                  + '       <td align="left">'+ array.word +'</td>'
                  + '       <td align="left">'+ array.mean +'</td>'
                  + '   </tr>'
                  + '</tbody>');
}

});
