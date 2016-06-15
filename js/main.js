$(document).ready(function() {


    setTimeout(function(){
  $('.down-arrow').addClass('bounce');
}, 3000);

    $('.c-hamburger').click(function(){
    	if($(this).hasClass('is-active')){
    		$(this).removeClass('is-active');
    		$('.menu-container').slideUp();
    	}else{
    		$(this).addClass('is-active');
    		$('.menu-container').slideDown();
    	}
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

});
