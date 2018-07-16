var jQuery = require('jQuery');
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
    }).done(function (msg) {
        callback(msg);
    }).fail(function (jqXHR, textStatus) {
        console.log("Request failed: " + textStatus);
    })
}
function createGitIssue(passData, callback) {
    jQuery.ajax({
        headers: {
            'Content-Type': 'application/json'
        },
        url: gitBaseUrl + "repos/sachinjain526/es-6/issues",
        method: "POST",
        data: JSON.stringify(passData),
        dataType: "json",
        mode: "cors",
        beforeSend: function (xhr, settings) { xhr.setRequestHeader('Authorization', 'BEARER ' + gitApiToken); }
    }).done(function (msg) {
        callback(msg);
    }).fail(function (jqXHR, textStatus) {
        console.log("Request failed: " + textStatus);
    })
}
export { createGitRepository, createGitIssue };