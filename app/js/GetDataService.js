const jQuery = require('jquery');
import { gitBaseUrl, gitApiToken } from './KeyAndPath';

function createGitRepository(passData, callback) {
    const url = gitBaseUrl + "user/repos";
    commonPostAjaxFunc(url, passData, callback);
}
function createGitIssue(passData, repoName, callback) {
    let url = gitBaseUrl + "repos/sachinjain526/" + repoName + "/issues";
    url = url.replace(/\s/g, "");
    commonPostAjaxFunc(url, passData, callback);
}
function commonPostAjaxFunc(url, postData, callback) {
    jQuery.ajax({
        headers: {
            'Content-Type': 'application/json'
        },
        url: url,
        method: "POST",
        data: JSON.stringify(postData),
        dataType: "json",
        mode: "cors",
        beforeSend: function (xhr, settings) { xhr.setRequestHeader('Authorization', 'BEARER ' + gitApiToken); }
    }).done(function (responseData) {
        callback(responseData);
    }).fail(function (jqXHR, textStatus) {
        console.log("Request failed: " + textStatus);
    })
}
function getAllUserRepo(url, callback) {
    const fullurl = gitBaseUrl + url;
    commonGetAjaxFunc(fullurl, callback);
}
function getAllUserIssue(url, callback) {
    const fullurl = gitBaseUrl + url;
    commonGetAjaxFunc(fullurl, callback);
}
function commonGetAjaxFunc(url, callback) {
    jQuery.ajax({
        headers: {
            'Content-Type': 'application/json'
        },
        url: url,
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
export { createGitRepository, createGitIssue, getAllUserRepo, getAllUserIssue, getInputFromRecastAPi };


  //createGitIssue(issueJson, showResponse);
  //PATCH /repos/:owner/:repo/issues/:number
  //GET /repos/:owner/:repo/issues
  //GET /repos/:owner/:repo/issues/:number