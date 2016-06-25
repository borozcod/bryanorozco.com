$(document).ready(function() {

//Menu
    $('.c-hamburger').click(function(){
    	if($(this).hasClass('is-active')){
    		$(this).removeClass('is-active');
    		$('.menu-container').slideUp();
    	}else{
    		$(this).addClass('is-active');
    		$('.menu-container').slideDown();
    	}
    });

    $('.menu-item').click(function(){
      var srollTo = $(this).data('section');
      console.log(srollTo);
      $('body').animate({
         scrollTop: $("."+srollTo+"").offset().top
      });
    });

    $('body').click(function(evt){
         if($(evt.target).closest('.menu-container, .c-hamburger').length)
            return;
  	   $('.c-hamburger').removeClass('is-active');
       $('.menu-container').slideUp();
  	});

    //Set the intro image to full height
    var window_height = $(window).height();
    $('.intro').css('height', window_height);


    //Animate text

    $.fn.ticker = function( options ) {

    options = $.extend({
        uppercase: true,
        //extra: ',.:+=/()',
        speed: 5
    }, options);

    var alph = 'ABCDEFGILMNHOPQRSTUVWY';

    if ( !options.uppercase ) {
        alph = alph + alph.toLowerCase();
    }
    alph = ''+alph + options.extra + ' ';

    return this.each(function() {
        var k = 1,
            elems = $(this).children(),
            arr = alph.split(''),
            len = 0,
            fill = function( a ) {
                while( a.length < len ) {
                    a.push(' ');
                }
                return a;
            },
            texts = $.map( elems, function( elem ) {
                var text = $(elem).text();
                len = Math.max(len, text.length);
                return options.uppercase ? text.toUpperCase() : text;
            }),
            target = $('<div>'),
            render = function(print) {
                target.data('prev', print.join(''));
                fill(print);
                print = $.map(print, function(p) {
                    return p == ' ' ? '&#160;' : p;
                });
                return target.html('<span>' + print.join('</span><span>') + '</span>');
            },
            attr = {}

        $.each(this.attributes, function(i, item) {
            target.attr( item.name, item.value );
        });

        $(this).replaceWith( render( texts[0].split('') ) );

        target.click(function(e) {

            var next = fill(texts[k].split('')),
                prev = fill(target.data('prev').split('')),
                print = prev;

            $.each(next, function(i) {
                if (next[i] == prev[i]) {
                    return;
                }
                var index = alph.indexOf( prev[i] ),
                    j = 0,
                    tid = window.setInterval(function() {
                        if ( next[i] != arr[index] ) {
                            index = index == alph.length-1 ? 0 : index + 1;
                        } else {
                            window.clearInterval(tid);
                        }
                        print[i] = alph[index];
                        render(print);
                }, options.speed)
            });
            k = k == texts.length-1 ? 0 : k + 1;
        });
    });
};


$('.quote-text > #text').ticker();

//Is element in view pointer
var didChange = false;
var introDiv = $('.intro').height();
introDiv = introDiv - 70;
$(window).scroll(function (event) {
    var scroll = $(window).scrollTop();
    if(scroll > introDiv && scroll < introDiv + 25 && didChange == false){

      didChange = true;
      $( "#text" ).trigger( "click" );

    }
});

$(".tl-aside").stick_in_parent();

var showTimeLine = false;
var child = 1;
$(document).on('scroll', function(){
  //var time_line = $('.time-line').position().top;

  var time_line_item = $('.tl-item:nth-child('+ child +')');
   if(child <= 6){
  var time_line_item_position = time_line_item.position().top - 250;
  }
  var ti_height = time_line_item.height();
	if(child > 6 ){
	showTimeLine = true;
	}
  if($(this).scrollTop()>=time_line_item_position && showTimeLine == false){
    $('.tl-item:nth-child('+ child +')').find('.tl-line-short').animate({height: 24},200);
    $('.tl-item:nth-child('+ child +')').find('.tl-line').animate({height: 50},200);
    $('.tl-item:nth-child('+ child +')').find('.time-desc').addClass('active');
    $('.tl-item:nth-child('+ child +')').find('.time').addClass('active');

    if(child <= 6){
      console.log('here '+ child);
      child++;
    }
  }
  //showTimeLine = false;
});


//skills
var bar1 = new ProgressBar.Circle('.skill-1', { strokeWidth: 6, easing: 'easeInOut', duration: 1400, text: { value: 'HTML' }, color: '#fff', trailColor: '#eee', trailWidth: 1, svgStyle: null});
var bar2 = new ProgressBar.Circle('.skill-2', { strokeWidth: 6, easing: 'easeInOut', duration: 1400, text: { value: 'CSS' }, color: '#fff', trailColor: '#eee', trailWidth: 1, svgStyle: null});
var bar3 = new ProgressBar.Circle('.skill-3', { strokeWidth: 6, easing: 'easeInOut', duration: 1400, text: { value: 'PHP' }, color: '#fff', trailColor: '#eee', trailWidth: 1, svgStyle: null});
var bar4 = new ProgressBar.Circle('.skill-4', { strokeWidth: 6, easing: 'easeInOut', duration: 1400, text: { value: 'IOS' }, color: '#fff', trailColor: '#eee', trailWidth: 1, svgStyle: null});
var bar5 = new ProgressBar.Circle('.skill-5', { strokeWidth: 6, easing: 'easeInOut', duration: 1400, text: { value: 'JAVA' }, color: '#fff', trailColor: '#eee', trailWidth: 1, svgStyle: null});
$(document).on('scroll', function() {
  var skillSection = $('.skills').position().top
  skillSection = skillSection - 400;
    if($(this).scrollTop()>=skillSection){
        bar1.animate(0.9);
        bar2.animate(0.9);
        bar3.animate(0.8);
        bar4.animate(0.6);
        bar5.animate(0.5);
    }
});

//Social


});

function closeSnapCode(){
	$('.snap-overlay').fadeOut();
	$('.snap-overlay').removeClass('active');
}

function showSnapCode(){
	$('.snap-overlay').fadeIn();
	$('.snap-overlay').addClass('active');
}
