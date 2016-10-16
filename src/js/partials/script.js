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
	var url = 'https://api.riffsy.com/v1/search?key=LIVDSRZULELA&limit=7';
	if(word){
		url += '&tag=' + word;
	}
	console.log(url);
	xmlhttp.open('GET', url, true);
	xmlhttp.onreadystatechange = function() {
	  	if (xmlhttp.readyState == 4) {
	    	if(xmlhttp.status == 200) {
	    	   	var pictures = JSON.parse(xmlhttp.responseText);
				console.log(pictures.results);
				var gridItems = document.querySelectorAll('.grid__item');

				for( var i = 0, length = gridItems.length; i < length; i++){
					var src = pictures.results[i].url;
					var word = '<p class="grid__title">' + pictures.results[i].title + '</p>';
					var img = 'url("' + src + '")';
					gridItems[i].innerHTML = word;
					gridItems[i].style.backgroundImage = img;
					console.log(pictures.results[i].title);
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

var slider = {
	left: function() {
		
		var holder = this.parentElement.querySelector('.carousel__holder');
		var currentMargin = parseInt(getComputedStyle(holder).marginLeft);
		var currentWidth = parseInt(getComputedStyle(holder).width);
		var percent = Math.round(Math.abs(currentMargin/currentWidth*10));
		switch(percent) {
			case 0:
				holder.style.marginLeft = '-200%';
				break;
 	        case 3:
				holder.style.marginLeft = '0%';
				break;
			case 7:
				holder.style.marginLeft = '-100%';
				break;
		}
	},
	right: function() {
		var holder = this.parentElement.querySelector('.carousel__holder');
		var currentMargin = parseInt(getComputedStyle(holder).marginLeft);
		var currentWidth = parseInt(getComputedStyle(holder).width);
		var percent = Math.round(Math.abs(currentMargin/currentWidth*10));
		switch(percent) {
			case 0:
				holder.style.marginLeft = '-100%';
				break;
 	        case 3:
				holder.style.marginLeft = '-200%';
				break;
			case 7:
				holder.style.marginLeft = '0';
				break;
		}
	}
};

document.addEventListener("DOMContentLoaded", function(){

var pictures = getPictures();
var arrowLeft = document.querySelectorAll('.carousel__arrow--left');
var arrowRight = document.querySelectorAll('.carousel__arrow--right');

var discoverBtn = document.querySelector('.discover__button');
discoverBtn.addEventListener("click", searchPictures);

for (var i=0;i<arrowLeft.length;i++){
        arrowLeft[i].addEventListener("click", slider.left);
}

for (var i=0;i<arrowRight.length;i++){
        arrowRight[i].addEventListener("click", slider.right);
}



// console.log(slider.left);
// arrowLeft.addEventListener("click", slider.left);
// arrowRight.addEventListener("click", slider.right);

});
// imagesLoaded( container, function() {
// });

