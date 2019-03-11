var kyCdtoAlph;
var words;


setKyCd = function(cd){
	kyCdtoAlph = cd;
}

setWords = function(wds){
	words = wds;
}

function getData(url, set){
	fetch(url)
	    .then(function(response) {
	    	return response.json();
	    }) 
	    .then(function(json) {
	    	set(json);
	    });
}
