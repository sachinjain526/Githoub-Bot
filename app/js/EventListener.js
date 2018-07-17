const jQuery = require('jQuery');
import { createIssueWidget, createRepoWidget } from "./CreateWidget";
import { createGitRepository, createGitIssue, getAllFromGitApi, getInputFromRecastAPi } from './GetDataService';
import { repoCreateJson, issueCreateJson } from './KeyAndPath';
import { getFormData } from "./localUtility";

// event listener start from here
function eventListener() {
    jQuery("#queryRunner").on("click", "#submitQuery", function () {
        let inputValue = jQuery("#queryInput").val();
        getInputFromRecastAPi(inputValue, CreateRpeoAndIssueWidget)
    });
    jQuery("main").on("click", "#createRepo", function () {
        let formData = getFormData("repoWidget");
        var thisData = jQuery.extend(true, {}, repoCreateJson, formData);
        createGitRepository(thisData, confirmationCall);
    });
    jQuery("main").on("click", "#createIssue", function () {
        let formData = getFormData("issueWidget");
        var thisData = jQuery.extend(true, {}, issueCreateJson, formData);
        createGitIssue(thisData, confirmationCall);
    });
    jQuery("#mainNavBar").on("click", "#AllIssue", function () {
        getAllFromGitApi("repos/sachinjain526/webapck-conf/issues", confirmationCall);
    });
    jQuery("main").on("click", ".cancelWidget", function () {
        jQuery(this).parents(".container").remove();
    });
}
// callback function for service
function CreateRpeoAndIssueWidget(recastData) {
    jQuery.each(recastData.intents, function (index, value) {
        if (value.slug == "create-repo") {
            const repoName = recastData.entities.repository;
            if (repoName) {
                if (jQuery("#repoWidget").length) {
                    jQuery("#repoName").val(repoName[0].value);
                } else {
                    createRepoWidget(repoName[0].value);
                }
            } else {
                alert("please write valid query for repo creation");
            }
        } else if (value.slug == "create-issue") {
            const issueTitle = recastData.entities.repository;
            if (issueTitle) {
                if (jQuery("#issueWidget").length) {
                    jQuery("#issueWidget").val(issueTitle[0].value);
                } else {
                    createRepoWidget(issueTitle[0].value);
                }
            } else {
                alert("please write valid query for issue creation");
            }
        }
    });
    console.log(recastData);
}
function showResponse(data) {
    console.log(data);
}
export { eventListener }
/*
const recastai = require('recastai')

const client = new recastai.request('82f3ba26a2d8e73677febb5f93528372', 'en')

client.analyseText('hello')
  .then(function(res) {
    if (res.intent()) { console.log('Intent: ', res.intent().slug) }
    if (res.intent().slug === 'YOUR_EXPECTED_INTENT') {
      // Do your code...
    }
  })*/