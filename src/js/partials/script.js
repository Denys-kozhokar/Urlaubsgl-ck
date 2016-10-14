function getXmlHttp(){
  var xmlhttp;
  try {
    xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
  } catch (e) {
    try {
      xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    } catch (E) {
      xmlhttp = false;
    }
  }
  if (!xmlhttp && typeof XMLHttpRequest!='undefined') {
    xmlhttp = new XMLHttpRequest();
  }
  return xmlhttp;
}


function getPictures(word){
	var xmlhttp = getXmlHttp();
	var url = 'https://api.pixplorer.co.uk/image?amount=7&size=tb';
	if(word){
		url += '&word=' + word;
	}
	console.log(url);
	xmlhttp.open('GET', url, true);
	xmlhttp.onreadystatechange = function() {
	  	if (xmlhttp.readyState == 4) {
	    	if(xmlhttp.status == 200) {
	    	   	var pictures = JSON.parse(xmlhttp.responseText);
				console.log(pictures);
				var gridItems = document.querySelectorAll('.grid__item');
				
				for( var i = 0, length = gridItems.length; i < length; i++){
					var src = pictures.images[i].imageurl;
					var word = pictures.images[i].word;
					var img = '<img src="' + src + '">';
					gridItems[i].innerHTML += img;
				}
				
	    	}
	  	}
	};
	xmlhttp.send(null);
				

	//return pictures;
};

document.addEventListener("DOMContentLoaded", function(){

var container = document.querySelector('.grid');
var msnry;
  msnry = new Masonry( container, {
  itemSelector: '.grid__item',
  columnWidth: '.grid__sizer',
  percentPosition: true
});
var gridItems = document.querySelectorAll('.grid__item');
var pictures = getPictures();
// console.log(pictures);




});
// imagesLoaded( container, function() {
// });




// var API_KEY = 'LIVDSRZULELA';

// 	function createRequest(){
// 		var inputValue = $('.searcInput').val();
// 			console.log(inputValue);
// 			var URL = "https://api.riffsy.com/v1/search?key="+API_KEY+"&tag=" + inputValue + "&limit=10";
// 			getRequest(URL);
// 	}

// 	function getRequest(URL){
// 	$.getJSON(URL, function(data){
// 		console.log(data);
//     if (data.results.length > 0){
//     	$('#holder').empty();
//         for (var i = 0; i < data.results.length; i++) {
//         	var imgSrc = data.results[i].url;
//         	$('#holder').append('<img src ="' + imgSrc + '" class="searchImg">');
//         }
//     } else
//         console.log('No results');
// 	})
// 	};

// 	$('.searchBtn').on('click', function( event ) {
// 		createRequest();
// 	});

// 	$('.searcInput').keydown(function( event ) {
//   		if ( event.which == 13 ) {
//    			createRequest();
//   		}
// 	});

