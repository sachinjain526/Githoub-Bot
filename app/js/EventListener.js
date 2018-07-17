const jQuery = require('jquery');
import { createIssueWidget, createRepoWidget, createUserIsuueWidget } from "./CreateWidget";
import { createGitRepository, createGitIssue, getAllUserIssue, getInputFromRecastAPi } from './GetDataService';
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
        createGitRepository(thisData, completeRepoCreation);
    });
    jQuery("main").on("click", "#createIssue", function () {
        let formData = getFormData("issueWidget");
        var getRepoName = jQuery("#repositoryName").text();
        var thisData = jQuery.extend(true, {}, issueCreateJson, formData);
        createGitIssue(thisData, getRepoName, completeIssueCreation);
    });
    jQuery("#mainNavBar").on("click", "#AllIssue", function () {
        getAllUserIssue("repos/sachinjain526/webapck-conf/issues", createUserIsuueWidget);
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
            const issueTitle = recastData.entities.issue;
            const repoName = recastData.entities.repository;
            if (issueTitle && repoName) {
                if (jQuery("#issueWidget").length) {
                    jQuery("#issueWidget").val(issueTitle[0].value);
                    jQuery("#repositoryName").text(repoName[0].value);
                } else {
                    createIssueWidget(issueTitle[0].value, repoName[0].value);
                }
            } else {
                alert("please write valid query for issue creation");
            }
        }
    });
    console.log(recastData);
}
function completeIssueCreation(msg) {
    console.log(msg);
}
function completeRepoCreation(msg) {
    console.log(msg);
}
export { eventListener }