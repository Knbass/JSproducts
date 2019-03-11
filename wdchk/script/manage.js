function save(){

	//getData("data/words.json",setWords);
	
    var fs = require('fs');
	fs.writeFIle('hoge.json', JSON.stringify({ x: 5, y: 6 }));

}
