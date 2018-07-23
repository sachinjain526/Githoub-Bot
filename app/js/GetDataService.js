import { gitApiToken } from './KeyAndPath'
import { getErrorDescription } from './localUtility'
import { createModelPopup } from './createModal/createModalWidget'

const jQuery = require('jquery')
// ajax common function
function commonPostAjaxFunc (url, mehtod, postData, callback) {
  jQuery.ajax({
    url: url,
    method: mehtod,
    data: JSON.stringify(postData),
    dataType: 'json',
    mode: 'cors',
    beforeSend: function (xhr) { xhr.setRequestHeader('Authorization', 'BEARER ' + gitApiToken) }
  }).done(function (responseData) {
    callback(responseData)
  }).fail(function (jqXHR, textStatus) {
    createModelPopup({ modalId: 'errorModal', modalHeading: 'Error-' + jqXHR.status, ClassName: 'bg-danger text-white', modalContent: getErrorDescription(jqXHR.status), buttonName: 'Ok' })
    console.log('Request failed: ' + textStatus)
  })
}
function commonGetAjaxFunc (url, callback) {
  jQuery.ajax({
    headers: {
      'Content-Type': 'application/json'
    },
    url: url,
    method: 'get',
    dataType: 'json',
    mode: 'cors',
    beforeSend: function (xhr) { xhr.setRequestHeader('Authorization', 'BEARER ' + gitApiToken) }
  }).done(function (responseData) {
    callback(responseData)
  }).fail(function (jqXHR, textStatus) {
    createModelPopup({ modalId: 'errorModal', modalHeading: 'Error-' + jqXHR.status, ClassName: 'bg-danger text-white', modalContent: getErrorDescription(jqXHR.status), buttonName: 'Ok' })
    console.log('Request failed: ' + textStatus)
  })
}
function getInputFromRecastAPi (input, callback) {
  jQuery.ajax({
    headers: {
      'Content-Type': 'application/json'
    },
    url: 'https://api.recast.ai/v2/request?text=' + input,
    method: 'post',
    mode: 'cors',
    beforeSend: function (xhr) { xhr.setRequestHeader('Authorization', 'Token 82f3ba26a2d8e73677febb5f93528372') }
  }).done(function (response) {
    callback(response.results)
  }).fail(function (jqXHR, textStatus) {
    createModelPopup({ modalId: 'errorModal', modalHeading: 'Error-' + jqXHR.status, ClassName: 'bg-danger text-white', modalContent: getErrorDescription(jqXHR.status), buttonName: 'Ok' })
    console.log('Request failed: ' + textStatus)
  })
}

export { commonGetAjaxFunc, commonPostAjaxFunc, getInputFromRecastAPi }
