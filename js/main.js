$(document).ready(function() {
    $('#fullpage').fullpage();

    setTimeout(function(){
  $('.down-arrow').addClass('bounce');
}, 3000);

    $('.c-hamburger').click(function(){
    	if($(this).hasClass('is-active')){
    		$(this).removeClass('is-active');
    		$('.menu-container').fadeOut();
    	}else{
    		$(this).addClass('is-active');
    		$('.menu-container').fadeIn();
    	}
    });

});
