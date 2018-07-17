const jQuery = require('jQuery');
import { gitBaseUrl, gitApiToken } from './KeyAndPath';

function createGitRepository(passData, callback) {
    jQuery.ajax({
        headers: {
            'Content-Type': 'application/json'
        },
        url: gitBaseUrl + "user/repos",
        method: "POST",
        data: JSON.stringify(passData),
        dataType: "json",
        mode: "cors",
        beforeSend: function (xhr, settings) { xhr.setRequestHeader('Authorization', 'BEARER ' + gitApiToken); }
    }).done(function (responseData) {
        callback(responseData);
    }).fail(function (jqXHR, textStatus) {
        console.log("Request failed: " + textStatus);
    })
}
function createGitIssue(passData, callback) {
    jQuery.ajax({
        headers: {
            'Content-Type': 'application/json'
        },
        url: gitBaseUrl + "repos/sachinjain526/webapck-conf/issues",
        method: "POST",
        data: JSON.stringify(passData),
        dataType: "json",
        mode: "cors",
        beforeSend: function (xhr, settings) { xhr.setRequestHeader('Authorization', 'BEARER ' + gitApiToken); }
    }).done(function (responseData) {
        callback(responseData);
    }).fail(function (jqXHR, textStatus) {
        console.log("Request failed: " + textStatus);
    })
}
function getAllFromGitApi(url, callback) {
    jQuery.ajax({
        headers: {
            'Content-Type': 'application/json',
            "Accept": "application/vnd.github.machine-man-preview"
        },
        url: gitBaseUrl + url,
        method: "get",
        dataType: "json",
        mode: "cors",
        beforeSend: function (xhr, settings) { xhr.setRequestHeader('Authorization', 'BEARER ' + gitApiToken); }
    }).done(function (responseData) {
        callback(responseData);
    }).fail(function (jqXHR, textStatus) {
        console.log("Request failed: " + textStatus);
    })
}
function getInputFromRecastAPi(input, callback) {
    jQuery.ajax({
        headers: {
            'Content-Type': 'application/json'
        },
        url: "https://api.recast.ai/v2/request?text=" + input,
        method: "post",
        mode: "cors",
        beforeSend: function (xhr, settings) { xhr.setRequestHeader('Authorization', 'Token 82f3ba26a2d8e73677febb5f93528372'); }
    }).done(function (response) {
        callback(response.results);
    }).fail(function (jqXHR, textStatus) {
        console.log("Request failed: " + textStatus);
    })
}
export { createGitRepository, createGitIssue, getAllFromGitApi, getInputFromRecastAPi };


  //createGitIssue(issueJson, showResponse);
  //PATCH /repos/:owner/:repo/issues/:number
  //GET /repos/:owner/:repo/issues
  //GET /repos/:owner/:repo/issues/:number