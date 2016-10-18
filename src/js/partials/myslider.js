(function() {
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

    initSlider();

    function initSlider(){
      var arrowLeft = document.querySelectorAll('.carousel__arrow--left');
      var arrowRight = document.querySelectorAll('.carousel__arrow--right');
      
      for (var i=0;i<arrowLeft.length;i++){
              arrowLeft[i].addEventListener("click", slider.left);
      }

      for (var i=0;i<arrowRight.length;i++){
              arrowRight[i].addEventListener("click", slider.right);
      }
    }
  });

  // function export(object, name) {
  //   if (typeof module === "object" && module != null && typeof module.exports === "object")
  //     module.exports[name] = object;
  //   else
  //     window[name] = object;
  // };

})();
