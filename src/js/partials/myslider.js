;
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


  //document.addEventListener("DOMContentLoaded", function(){
  // $(function(){
  //   initSlider();

  //   console.log('slider');
