const jQuery = require('jquery');
import { createIssueWidget, createRepoWidget, createUserIsuueWidget, createModelPopup } from "./CreateWidget";
import { createGitRepository, createGitIssue, getAllUserIssue, EditGitIssue, getInputFromRecastAPi } from './GetDataService';
import { repoCreateJson, issueCreateJson } from './KeyAndPath';
import { getFormData, makeFormEditable } from "./localUtility";

// event listener start from here
function eventListener() {
    jQuery("#queryRunner").on("click", "#submitQuery", function () {
        let inputValue = jQuery("#queryInput").val();
        getInputFromRecastAPi(inputValue, CreateRpeoAndIssueWidget)
    });
    jQuery("main").on("click", "#createRepo", function () {
        let formData = getFormData("repoWidget");
        let thisData = jQuery.extend(true, {}, repoCreateJson, formData);
        createGitRepository(thisData, completeRepoCreation);
    });
    jQuery("main").on("click", "#createIssue", function () {
        let formData = getFormData("issueWidget");
        let getRepoName = jQuery("#repositoryName").text();
        let thisData = jQuery.extend(true, {}, issueCreateJson, formData);
        createGitIssue(thisData, getRepoName, completeIssueCreation);
    });
    jQuery("#mainNavBar").on("click", "#AllIssue", function () {
        getAllUserIssue("user/issues?filter=all&state=all", constructIssueWidget);
    });
    jQuery("main").on("click", ".cancelWidget", function () {
        jQuery(this).parents(".container").remove();
    });
    jQuery("body").on("click", ".modalClose", function () {
        const modalId = jQuery(this).parents(".modal").attr("id");
        jQuery('#' + modalId).on('hidden.bs.modal', function (e) {
            jQuery(this).remove();
        });
    }); makeFormEditable
    jQuery("#userIsuueContainer").on("click", ".editSection", function () {
        const thisObj = jQuery(this);
        const containerId = thisObj.attr("container-id");
        makeFormEditable(containerId);
        thisObj.siblings(".submitSection").removeClass("d-none");
        thisObj.addClass("d-none")
    });
    jQuery("#userIsuueContainer").on("click", ".submitSection", function () {
        const thisObj = jQuery(this);
        const containerId = thisObj.attr("container-id");
        const url = thisObj.parent().attr("api-url");
        let formData = getFormData(containerId);
        let thisData = jQuery.extend(true, {}, issueCreateJson, formData);
        EditGitIssue(url, thisData, updateSuccessFully);
    });
    jQuery("#userIsuueContainer").on("click", ".closeThisIsuue", function () {
        const thisObj = jQuery(this);
        const url = thisObj.parent().attr("api-url");
        EditGitIssue(url, { state: "closed" }, updateSuccessFully);
    });
    jQuery("#userIsuueContainer").on("click", ".reopenThisIsuue", function () {
        const thisObj = jQuery(this);
        const url = thisObj.parent().attr("api-url");
        EditGitIssue(url, { state: "open" }, updateSuccessFully);
    });
}
// callback function for service
function CreateRpeoAndIssueWidget(recastData) {
    jQuery.each(recastData.intents, function (index, value) {
        if (value.slug == "create-repo") {
            const repoName = recastData.entities.repository;
            if (repoName) {
                jQuery("#repoWidget").remove();
                createRepoWidget(repoName[0].value);
            } else {
                createModelPopup({ modalId: "errorModal", modalHeading: "Error", ClassName: "bg-danger text-white", modalContent: "please write valid query for repository creation.", buttonName: "Ok" });
            }
        } else if (value.slug == "create-issue") {
            const issueTitle = recastData.entities.issue;
            const repoName = recastData.entities.repository;
            if (issueTitle && repoName) {
                jQuery("#issueWidget").remove();
                createIssueWidget(issueTitle[0].value, repoName[0].value);
            } else {
                createModelPopup({ modalId: "errorModal", modalHeading: "Error", ClassName: "bg-danger text-white", modalContent: "please write valid query for issue creation", buttonName: "Ok" });
            }
        }
    });
    console.log(recastData);
}
function constructIssueWidget(resData) {
    createUserIsuueWidget("userIsuueContainer", resData);
}
function completeIssueCreation(msg) {
    createModelPopup({ modalId: "completeIssueCreation", modalHeading: "Confirmation", ClassName: "bg-success", modalContent: "You have successfully created issue in repository the gitHub <span class='text-success'> For More Info Please Visit: www.github.com</span>", buttonName: "Close" });
}
function updateSuccessFully(data) {
    createModelPopup({ modalId: "completeIssueCreation", modalHeading: "Confirmation", ClassName: "bg-success", modalContent: "You have successfully created repository in the gitHub <span class='text-success'> For More Info Please Visit: www.github.com</span>", buttonName: "Close" });
}
function completeRepoCreation(msg) {
    console.log(msg);
}
export { eventListener }