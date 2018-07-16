var jQuery = require('jQuery');
import 'popper.js';
import 'bootstrap';
require("../scss/main.scss");
// my code start from here
console.log('app loaded');
import { createIssueWidget, canceRepolWidget } from "./CreateWidget"
function createRepo(passData, callback) {
  jQuery.ajax({
    url: "https://api.github.com/user/repos?access_token=313ccd01a0c47904416cd54df379dabcb0d08820",
    method: "POST",
    data: passData,
    dataType: "json",
    contentType: 'application/json; charset=utf-8',
    "Access-Control-Allow-Origin": "*",
    mode: "cors"
  }).done(function (msg) {
    callback(msg);
  }).fail(function (jqXHR, textStatus) {
    console.log("Request failed: " + textStatus);
  })
}
function showResponse(data) {
  console.log(data);
}
function eventListener() {
  jQuery("queryRunner").on("click", "", function () {

  });
  jQuery("main").on("click", ".cancelWidget", function () {
    jQuery(this).remove();
  });
}
jQuery(document).ready(function () {
  let createData = {
    "name": "Hello-World",
    "description": "This is your first repository",
    "homepage": "https://github.com",
    "private": false,
    "has_issues": true,
    "has_projects": true,
    "has_wiki": true
  }
  //createRepo(createData, showResponse);
});
var issueJson = {
  "title": "Found a bug",
  "body": "I'm having a problem with this.",
  "assignees": [
    "octocat"
  ],
  "milestone": 1,
  "labels": [
    "bug"
  ]
}
var token = {
  "access_token": "abcdefghijklmnopqrstuvwxyz..",
  "expires_in": 3600,
  "token_type": "Bearer"
} 