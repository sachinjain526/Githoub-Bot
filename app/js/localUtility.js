const jQuery = require('jquery');

function getFormData(containerId) {
  const formObj = {};
  jQuery(`#${containerId}`).find('input,select,textarea').each(function () {
    const thisObj = jQuery(this);
    const dataname = thisObj.attr('data-name');
    let thisVal = thisObj.val();
    const type = thisObj.attr('type');
    if (type === 'checkbox' || type === 'radio') {
      thisVal = thisObj.prop('checked');
    }
    if (thisObj.attr('data-type') === 'array') {
      thisVal = thisObj.val().split(',');
    }
    formObj[dataname] = thisVal;
  });
  return formObj;
}

function makeFormEditable(containerId) {
  const formObj = {};
  jQuery(`#${containerId}`).find('input,select,textarea').each(function () {
    const thisObj = jQuery(this);
    thisObj.removeAttr('readonly');
    thisObj.removeAttr('disabled');
  });
  return formObj;
}
function pad(s) {
  return (s < 10) ? `0${s}` : s;
}
function dateConvertToDDMMYYY(date) {
  if (date) {
    const d = new Date(date);
    return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('/');
  }
  return '';
}

function setDataToLocalStorage(key, value) {
  localStorage.setItem(key, value);
}

function getDataToLocalStorage(key) {
  return localStorage[key];
}

function getErrorDescription(statusCode) {
  let statusDesc = '';
  switch (statusCode) {
    case 204:
      statusDesc = 'Successfully Delete Collaborater from repository.';
      break;
    case 404:
      statusDesc = 'Serach repository/issue not found. Please Try Again!.';
      break;
    case 400:
      statusDesc = 'Bad Request-Please passed the correct data to complete this action. And Try Again!.';
      break;
    case 401:
      statusDesc = 'Unauthorized-Please input correct Authrization to complete this action. And Try Again!.';
      break;
    case 403:
      statusDesc = 'server locked and other reasons. Please Try after some time!.';
      break;
    case 500:
      statusDesc = 'Server under mantainance. Please Try after some time!.';
      break;
    default:
      statusDesc = 'there is some Issue with passing data. We will comeback shortly';
  }
  return statusDesc;
}
export {
  getFormData,
  makeFormEditable,
  dateConvertToDDMMYYY,
  setDataToLocalStorage,
  getDataToLocalStorage,
  getErrorDescription,
};
