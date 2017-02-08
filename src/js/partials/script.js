var jsonp = {
    callbackCounter: 0,
 
    fetch: function(url, callback) {
        var fn = 'JSONPCallback_' + this.callbackCounter++;
        window[fn] = this.evalJSONP(callback);
        url = url.replace('=JSONPCallback', '=' + fn);
        var scriptTag = document.createElement('SCRIPT');
        scriptTag.src = url;
        document.getElementsByTagName('HEAD')[0].appendChild(scriptTag);
    },
 
    evalJSONP: function(callback) {
        return function(data) {
            var validJSON = false;
        if (typeof data == "string") {
            try {validJSON = JSON.parse(data);} catch (e) {
                /*invalid JSON*/}
        } else {
            validJSON = JSON.parse(JSON.stringify(data));
                // window.console && console.warn(
                // 'response data was not a JSON string');
            }
            if (validJSON) {
                callback(validJSON);
            } else {
                throw("JSONP call returned invalid or empty JSON");
            }
        }
    }
}

function getPictures(word){
	var key = '3545825-c60bc71ac0a2a71abd3e36913';
	var url = 'https://pixabay.com/api/?key=' + key + '&per_page=7';
	if(word){
		url += '&q=' + word;
	}
	if("onload" in new XMLHttpRequest()){
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.open('GET', url, true);
		xmlhttp.onreadystatechange = function() {
		  	if (xmlhttp.readyState == 4) {
		    	if(xmlhttp.status >= 200 && this.status < 400) {
		    	   	var pictures = JSON.parse(xmlhttp.responseText);
		    	   	//console.log(pictures);
		    	   	setTimeout(function() { fillMasonry(pictures) }, 100);
					//fillMasonry(pictures);
		    	}

		  	}
		};
		xmlhttp.send(null);
		
	} 
	else {
		// console.log('IE');
		url = 'http://pixabay.com/api/?key=' + key + '&per_page=7&callback=JSONPCallback';
		if(word){
			url += '&q=' + word;
		}
		
		jsonp.fetch(url , function(data) {
			var pictures = data;
			setTimeout(function() { fillMasonry(pictures) }, 100);
		});
	}

};

function fillMasonry(pictures){
	var gridItems = document.querySelectorAll('.grid__item');

				for( var i = 0, length = gridItems.length; i < length; i++){
					var src = pictures.hits[i].webformatURL;
					var word = '<p class="grid__title">' + pictures.hits[i].tags + '</p>';
					// var img = '<img src="' + src + '">';
					var img = 'url("' + src + '")';
					gridItems[i].innerHTML = word;
					gridItems[i].style.backgroundImage = img;
					// if(pictures.hits[i].webformatHeight >= pictures.hits[i].webformatWidth){
					// 	gridItems[i].className = 'grid__item';
					// } else {
					// 	gridItems[i].className = 'grid__item grid__item--width2';
					// }
					
					// gridItems[i].innerHTML = img;
					// gridItems[i].innerHTML += word;

					// gridItems[i].style.backgroundImage = img;
				}
				masonry();
}


function masonry(){
	window.onload = function() {

		var container = document.querySelector('.grid');
		var msnry;
		msnry = new Masonry( container, {
			columnWidth: '.grid__sizer',
			gutter: '.grid__gutter',
			itemSelector: '.grid__item',
			percentPosition: true,
		});
	};
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
      }

      for (var i=0;i<arrowRight.length;i++){
              //arrowRight[i].addEventListener("click", slider.right);
              arrowRight[i].onclick = slider.right;
      }
    }
    
//document.addEventListener("DOMContentLoaded", function(){
$(function(){
	initSlider();
	getPictures();

	var discoverBtn = document.querySelector('.discover__button');
	//discoverBtn.addEventListener("click", searchPictures);
	discoverBtn.onclick = searchPictures;

    

});