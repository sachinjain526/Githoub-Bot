const jQuery = require('jquery')
jQuery(document).on('ajaxSend', function () {
  var interval = setInterval(function () {
    jQuery('body').append("<div class='loading' id='ajaxSpinner'></div>")
    clearInterval(interval)
  }, 1)
})
  .on('ajaxComplete', function () {
    jQuery('#ajaxSpinner').remove()
  })
