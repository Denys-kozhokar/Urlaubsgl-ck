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
	var key = '3545825-c60bc71ac0a2a71abd3e36913';
	var url = 'https://pixabay.com/api/?key=' + key + '&per_page=7';
	//var url = 'https://api.riffsy.com/v1/search?key=LIVDSRZULELA&limit=7';
	if(word){
		url += '&q=' + word;
	}
	// console.log(url);
	xmlhttp.open('GET', url, true);
	xmlhttp.onreadystatechange = function() {
	  	if (xmlhttp.readyState == 4) {
	    	if(xmlhttp.status >= 200 && this.status < 400) {
	    	   	var pictures = JSON.parse(xmlhttp.responseText);
				console.log(pictures);
				var gridItems = document.querySelectorAll('.grid__item');

				for( var i = 0, length = gridItems.length; i < length; i++){
					var src = pictures.hits[i].webformatURL;
					var word = '<p class="grid__title">' + pictures.hits[i].tags + '</p>';
					var img = 'url("' + src + '")';
					gridItems[i].innerHTML = word;
					gridItems[i].style.backgroundImage = img;
					// console.log(word);
				}
				masonry();
	    	}
	  	}
	};
	xmlhttp.send(null);
};

function masonry(){
	var container = document.querySelector('.grid');
	var msnry;
  msnry = new Masonry( container, {
  columnWidth: '.grid__sizer',
 	gutter: '.grid__gutter',
  itemSelector: '.grid__item',
 	percentPosition: true,
});
}

function searchPictures(event) {
	var request = document.querySelector('.discover__input');
	getPictures(request.value);
	request.value = '';
	event.preventDefault ? event.preventDefault() : (event.returnValue=false);
}

function initSlider(){
      var arrowLeft = document.querySelectorAll('.carousel__arrow--left');
      var arrowRight = document.querySelectorAll('.carousel__arrow--right');
      
      for (var i=0;i<arrowLeft.length;i++){
              // arrowLeft[i].addEventListener("click", slider.left);
              arrowLeft[i].onclick = slider.left;
    // alert( 'Клик!' );}
      }

      for (var i=0;i<arrowRight.length;i++){
              //arrowRight[i].addEventListener("click", slider.right);
              arrowRight[i].onclick = slider.right;
      }
    }
    
//document.addEventListener("DOMContentLoaded", function(){
$(function(){
	var pictures = getPictures();
	initSlider();

	var discoverBtn = document.querySelector('.discover__button');
	//discoverBtn.addEventListener("click", searchPictures);
	discoverBtn.onclick = searchPictures;

    

});

