const jQuery = require('jquery');
jQuery(document).on("ajaxSend", function (event, jqXHR, ajaxOptions) {
    var interval = setInterval(function () {
        jQuery("body").append("<div class='loading' id='ajaxSpinner'></div>");
        clearInterval(interval);
        console.log("ajaxStart");
    }, 1);
})
    .on("ajaxComplete", function () {
        jQuery('#ajaxSpinner').remove();
        console.log("ajaxStop");
    })