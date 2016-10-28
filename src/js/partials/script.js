

function getPictures(word){
	var key = '3545825-c60bc71ac0a2a71abd3e36913';
	var url = 'https://pixabay.com/api/?key=' + key + '&per_page=7';

	if(word){
		url += '&q=' + word;
	}
	
	var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;

	var xhr = new XHR();

	xhr.open('GET', url, true);

	xhr.onload = function() {
	  var pictures = JSON.parse(this.responseText);
		console.log(pictures);
		fillMasonry(pictures);
	}

	xhr.onerror = function() {
	  console.log( 'Ошибка ' + this.status );
	}

	xhr.send();

};

function fillMasonry(pictures){
	var gridItems = document.querySelectorAll('.grid__item');

				for( var i = 0, length = gridItems.length; i < length; i++){
					var src = pictures.hits[i].webformatURL;
					var word = '<p class="grid__title">' + pictures.hits[i].tags + '</p>';
					var img = 'url("' + src + '")';
					gridItems[i].innerHTML = word;
					gridItems[i].style.backgroundImage = img;
				}
				masonry();
}


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
	event = event || window.event;
    if (event.preventDefault) { // если метод существует
    	event.preventDefault(); // то вызвать его
    } else { // иначе вариант IE8-:
    	event.returnValue = false;
    }
	//event.preventDefault ? event.preventDefault() : (event.returnValue=false);
	var request = document.querySelector('.discover__input');
	getPictures(request.value);
	request.value = '';
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