const jQuery = require('jquery');
function getFormData(containerId) {
    let formObj = {};
    jQuery("#" + containerId).find("input,select,textarea").each(function () {
        var thisObj = jQuery(this);
        const dataname = thisObj.attr("data-name");
        let thisVal = thisObj.val();
        const type = thisObj.attr("type");
        if (type == "checkbox" || type == "radio") {
            thisVal = thisObj.prop("checked");
        }
        if (thisObj.attr("data-type") == "array") {
            thisVal = thisObj.val().split(",");
        }
        formObj[dataname] = thisVal;
    });
    return formObj;
}
function makeFormEditable(containerId) {
    let formObj = {};
    jQuery("#" + containerId).find("input,select,textarea").each(function () {
        var thisObj = jQuery(this);
        thisObj.removeAttr("readonly");
        thisObj.removeAttr("disabled");
    });
    return formObj;
}
function dateConvertToDDMMYYY(date) {
    if (date) {
        function pad(s) { return (s < 10) ? '0' + s : s; }
        var d = new Date(date);
        return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('/');
    } else {
        return "";
    }
}
export { getFormData, makeFormEditable, dateConvertToDDMMYYY }