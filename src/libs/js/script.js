
function isElementVisible(elem) {
    let viewScrollTop = $(window).scrollTop(); // distancia de scroll superior
    let viewBottom = viewScrollTop + $(window).height(); // distancia de scroll + el alto actual de window (lo no visible por scroll + lo visible)
    // console.log('viewBottom', viewBottom)
    let topElemD = $(elem).offset().top; // distancia desde el elemento hasta el tope superior del viewport
    // console.log('topElemD', topElemD)
    return (topElemD < viewBottom);
}
// invoco una función anónima en el evento scroll sobre window
$(window).on("scroll", function () {
    let elem = $('.animacion_number'); // obtengo el elemento por id
    if (isElementVisible(elem)) {
        elem.addClass('number-counter');
        // console.log('Se ingresó elemento')
        $('.number-counter').countTo();
    } else {
        elem.removeClass('number-counter'); // si es visible agrego la class, de lo contrario la remuevo
        // console.log('No se ingresó elemento')
    }
});
//-- Plugin implementation
(function ($) {
    $.fn.countTo = function (options) {
        return this.each(function () {
            //-- Arrange
            var FRAME_RATE = 300; // Predefine default frame rate to be 60fps
            var $el = $(this);
            var countFrom = parseInt($el.attr('data-count-from'));
            var countTo = parseInt($el.attr('data-count-to'));
            var countSpeed = $el.attr('data-count-speed'); // Number increment per second

            //-- Action
            var rafId;
            var increment;
            var currentCount = countFrom;
            var countAction = function () {              // Self looping local function via requestAnimationFrame
                if (currentCount < countTo) {              // Perform number incremeant
                    $el.text(Math.floor(currentCount));     // Update HTML display
                    increment = countSpeed / FRAME_RATE;    // Calculate increment step
                    currentCount += increment;              // Increment counter
                    rafId = requestAnimationFrame(countAction);
                } else {                                  // Terminate animation once it reaches the target count number
                    $el.text(countTo);                      // Set to the final value before everything stops
                    //cancelAnimationFrame(rafId);
                }
            };
            rafId = requestAnimationFrame(countAction); // Initiates the looping function
        });
    };
}(jQuery));

//-- Executing
// $('.number-counter').countTo();