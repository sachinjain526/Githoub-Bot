var jQuery = require('jQuery');
import 'popper.js';
import 'bootstrap';
require("../scss/main.scss");
// my code start from here
console.log('app loaded');
import { createIssueWidget, createRepoWidget } from "./CreateWidget";
import { createGitRepository, createGitIssue } from './GetDataService';

function showResponse(data) {
  console.log(data);
}
function eventListener() {
  jQuery("#queryRunner").on("click", "#submitQuery", function () {
    var inputValue = jQuery("#queryInput").val();
    if (inputValue) {
      const repoName = inputValue.split(" ")[2];
      if (inputValue.toLowerCase() == "create repo sachin-jain") {
        if (jQuery("#repoWidget").length) {
          jQuery("#repoName").val(repoName)
        } else {
          createRepoWidget(repoName)
        }
      }
      else if (inputValue.toLowerCase() == "create issue sachin-jain") {
        if (jQuery("#issueWidget").length) {
          jQuery("#issueTitle").val(repoName)
        } else {
          createIssueWidget(repoName)
        }
      }
    }
  });
  jQuery("main").on("click", ".cancelWidget", function () {
    jQuery(this).parents(".container").remove();
  });
}
jQuery(document).ready(function () {
  let createData = {
    "name": "Hello-rohit",
    "description": "This is your first repository",
    "homepage": "https://github.com",
    "private": false,
    "has_issues": true,
    "has_projects": true,
    "has_wiki": true
  }
  var issueJson = {
    "title": "Found a bug",
    "body": "I'm having a problem with this.",
    "assignees": [
      "octocat"
    ],
    "milestone": "none",
    "labels": [
      "bug"
    ]
  }
  //createGitIssue(issueJson, showResponse);
  //PATCH /repos/:owner/:repo/issues/:number
  //GET /repos/:owner/:repo/issues
  //GET /repos/:owner/:repo/issues/:number

  eventListener();
});
