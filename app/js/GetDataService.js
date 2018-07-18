const jQuery = require('jquery');
import { gitBaseUrl, gitApiToken, getDescription } from './KeyAndPath';
import { createModelPopup } from "./CreateWidget";
// ajax common function 
function commonPostAjaxFunc(url, mehtod, postData, callback) {
    jQuery.ajax({
        url: url,
        method: mehtod,
        data: JSON.stringify(postData),
        dataType: "json",
        mode: "cors",
        beforeSend: function (xhr, settings) { xhr.setRequestHeader('Authorization', 'BEARER ' + gitApiToken); }
    }).done(function (responseData) {
        callback(responseData);
    }).fail(function (jqXHR, textStatus) {
        createModelPopup({ modalId: "errorModal", modalHeading: "Error-" + jqXHR.status, ClassName: "bg-danger text-white", modalContent: getDescription(jqXHR.status), buttonName: "Ok" });
        console.log("Request failed: " + textStatus);
    })
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
        createModelPopup({ modalId: "errorModal", modalHeading: "Error-" + jqXHR.status, ClassName: "bg-danger text-white", modalContent: getDescription(jqXHR.status), buttonName: "Ok" });
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
        createModelPopup({ modalId: "errorModal", modalHeading: "Error-" + jqXHR.status, ClassName: "bg-danger text-white", modalContent: getDescription(jqXHR.status), buttonName: "Ok" });
        console.log("Request failed: " + textStatus);
    })
}

//PATCH /repos/:owner/:repo/issues/:number

// function exposed to user
function createGitRepository(passData, callback) {
    const url = gitBaseUrl + "user/repos";
    commonPostAjaxFunc(url, "POST", passData, callback);
}
function createGitIssue(passData, repoName, callback) {
    let url = gitBaseUrl + "repos/sachinjain526/" + repoName + "/issues";
    url = url.replace(/\s/g, "");
    commonPostAjaxFunc(url, "POST", passData, callback);
}
function getAllUserRepo(url, callback) {
    const fullurl = gitBaseUrl + url;
    commonGetAjaxFunc(fullurl, callback);
}
function getAllUserIssue(url, callback) {
    const fullurl = gitBaseUrl + url;
    commonGetAjaxFunc(fullurl, callback);
}
function EditGitIssue(url, passData, callback) {
    commonPostAjaxFunc(url, "patch", passData, callback);
}
export { createGitRepository, createGitIssue, getAllUserRepo, getAllUserIssue, EditGitIssue, getInputFromRecastAPi };


  //createGitIssue(issueJson, showResponse);
  //PATCH /repos/:owner/:repo/issues/:number
  //GET /repos/:owner/:repo/issues
  //GET /repos/:owner/:repo/issues/:number