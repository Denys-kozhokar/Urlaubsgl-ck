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
				// var grid = document.querySelector('.grid');
				//console.log(grid);//gridItems.length
				for( var i = 0, length = gridItems.length; i < length; i++){
					var src = pictures.results[i].url;
					var word = pictures.results[i].title;
					var img = '<img class=".grid__item" src="' + src + '">';
					gridItems[i].innerHTML += img;
					// grid.innerHTML += img;

				}
				masonry();
	    	}
	  	}
	};
	xmlhttp.send(null);
				

	//return pictures;
};

function masonry(){
	var container = document.querySelector('.grid');
	var msnry;
  msnry = new Masonry( container, {
  itemSelector: '.grid__item',
// указываем класс элемента являющегося блоком в нашей сетке
          singleMode: false,
// true - если у вас все блоки одинаковой ширины
	  isResizable: true,
// перестраивает блоки при изменении размеров окна
	  isAnimated: true,
// анимируем перестроение блоков
          animationOptions: { 
	      queue: false, 
	      duration: 500 
	  }
  // columnWidth: '.grid__sizer',
  // percentPosition: true
});
}

var slider = {
	left: function() {
		
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
				holder.style.marginLeft = '0%';
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
				holder.style.marginLeft = '-200%';
				break;
 	        case 3:
				holder.style.marginLeft = '0%';
				break;
			case 7:
				holder.style.marginLeft = '-100%';
				break;
		}
	}
};

document.addEventListener("DOMContentLoaded", function(){

var pictures = getPictures();
var arrowLeft = document.querySelectorAll('.carousel__arrow--left');
var arrowRight = document.querySelectorAll('.carousel__arrow--right');

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


 // switch (images.length) {
 //                    case 1:
 //                        ulElement.appendChild(liElement1);
 //                        var liElement3 = document.createElement('li');
 //                        liElement3.style.width = this.sliderContainer.offsetWidth + 'px';
 //                        liElement3.style.background = "url('"+ images[0] +"') no-repeat center center";   
 //                        liElement3.style.backgroundSize = "cover";
 //                        liElement3.innerHTML = textBlock;

 //                        var divWithText3 = liElement3.childNodes[1];  
 //                        divWithText3.innerHTML = "<a>photo "+ 1 +"</a>";
 //                        divWithText3.innerHTML+= "<h1>"+ texts[0].tittle +"</h1>";
 //                        divWithText3.innerHTML+= "<p>"+ texts[0].description +"</p>";
 //                        ulElement.appendChild(liElement3); 
 //                        break;
 //                    case 2:
 //                        ulElement.appendChild(liElement2);
 //                        var liElement3 = document.createElement('li');
 //                        liElement3.style.width = this.sliderContainer.offsetWidth + 'px';
 //                        liElement3.style.background = "url('"+ images[1] +"') no-repeat center center";   
 //                        liElement3.style.backgroundSize = "cover";
 //                        liElement3.innerHTML = textBlock;

 //                        var divWithText3 = liElement3.childNodes[1];  
 //                        divWithText3.innerHTML = "<a>photo "+ 2 +"</a>";
 //                        divWithText3.innerHTML+= "<h1>"+ texts[1].tittle +"</h1>";
 //                        divWithText3.innerHTML+= "<p>"+ texts[1].description +"</p>";
 //                        ulElement.appendChild(liElement3);                         
 //                        break;