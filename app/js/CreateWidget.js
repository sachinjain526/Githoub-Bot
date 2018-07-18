const jQuery = require('jquery');
import { dateConvertToDDMMYYY } from "./localUtility";
function createRepoWidget(data) {
    jQuery("#widgetSection").prepend(`
    <div class="p-3 my-3 mx-auto border border-info rounded" id="repoWidget">
    <h3 class="text-center mt-2 mb-4 text-danger"> Create Repository </h3>
        <form method="post" action="#" class="w-100 text-center">
            <div class="form-group row">
                <label for="repoName" class="col-sm-5 col-form-label">Repo Name</label>
                <div class="col-sm-7">
                    <input type="text" class="form-control" id="repoName" placeholder="Enter your repo name" value="${data}" data-name="name">
                </div>
            </div>
            <div class="form-group row">
                <label for="repoDesc" class="col-sm-5 col-form-label">Repo Description</label>
                <div class="col-sm-7">
                    <input type="text" class="form-control" id="repoDesc" placeholder="Description" data-name="description">
                </div>
            </div>
            <div>
                <button type="button" class="btn btn-primary" id="createRepo">Create Repo</button>
                <button type="button" class="btn btn-danger cancelWidget" id="canceRepolWidget">Cancel</button>
            </div>
        </form>
</div>`);
}
function createIssueWidget(data, repoName) {
    jQuery("#widgetSection").prepend(`
    <div class="p-3 my-3 mx-auto border border-info rounded" id="issueWidget">
    <h3 class="text-center mt-2 mb-4 text-danger"> Create Issue </h3>
        <form method="post" action="#" class="w-100 text-center">
            <div class="form-group row">
                <label for="issueTitle" class="col-sm-3 col-form-label">Title</label>
                <div class="col-sm-9">
                    <input type="text" class="form-control" id="issueTitle" placeholder="Enter title.." value="${data}" data-name="title">
                </div>
            </div>
            <div class="form-group row">
                <label for="issueBody" class="col-sm-3 col-form-label">Body</label>
                <div class="col-sm-9">
                    <input type="text" class="form-control" id="issueBody" placeholder="Enter issue body.." data-name="body">
                </div>
            </div>
            <div class="form-group row">
                <label for="issueLabel" class="col-sm-3 col-form-label">Issue Type</label>
                <div class="col-sm-9">
                    <input type="text" class="form-control" id="issueLabel" placeholder="Enter Comma Saparated issue type.." data-type="array" data-name="labels" >
                </div>
            </div>
            <p class="form-group row d-none" id="repositoryName">
                ${repoName}
            </p>
            <div>
                <button type="button" class="btn btn-primary" id="createIssue">Create Isuue</button>
                <button type="button" class="btn btn-danger cancelWidget" id="cancelIssueWidget">Cancel</button>
            </div>
        </form>
    </div>
</div>
    `)
}
function createUserRepository(conatinerId, userRepoData) {
    var thisHtml = "";
    jQuery.each(userRepoData, function (index, value) {
        let description = description ? description : "No description Found"
        thisHtml = thisHtml + `<a class="col-4 p-3 shadow repo-section" href="${value.html_url}">
    <div class="border border-info rounded p-2">
    <h4 class="text-center text-truncate">${value.name}</h4>
    <p class="m-1">${description}</p>
    <p class="m-1">Open Issue: <strong class="text-danger">${value.open_issues}</strong></p>
    <p class="m-1">Created: <strong class="text-primary">${dateConvertToDDMMYYY(value.created_at)}</strong></p>
    <p class="m-1">Last Updated: <strong class="text-success"> ${dateConvertToDDMMYYY(value.updated_at)}</strong></p>
    </div>
</a>`
    });
    jQuery("#" + conatinerId).append(thisHtml);
}
function createUserIsuueWidget(containerId, resData) {
    let issueHtml = "";
    jQuery.each(resData, function (index, data) {
        issueHtml = issueHtml + `  <section class=" issuesection border border-secondary m-2 p-3 text-center font-weight-bold rounded" id="${data.id}" data-issue-url="${data.url}">
        <a href="${data.html_url}" target="_blank">
            <h4>Issue Number :-${data.repository.name + " #" + data.number}</h4>
        </a>
        <div class="d-flex border-bottom  border-top  border-info text-left my-2">
            <div class="col-6 px-3 border-right  border-info">
                <p>Iusse Created:
                    <span class="text-success">${ dateConvertToDDMMYYY(data.created_at)}</span>
                </p>
                <p>Iuuse Owner:
                    <span class="text-success">${data.author_association}</span>
                </p>
                <p>Issue State:
                    <span class="text-success">${data.state}</span>
                </p>
            </div>
            <div class="col-6 px-3">
                <p>Last Updated:
                    <span class="text-success">${dateConvertToDDMMYYY(data.updated_at)}</span>
                </p>
                <p>Iusse assignees:
                    <span class="text-success">${data.assignees}</span>
                </p>
                <p>issue Closed At :
                    <span class="text-success">${dateConvertToDDMMYYY(data.closed_at)}</span>
                </p>
            </div>
            <p class="d-none"></p>
        </div>

        <div class="form-group row">
            <label for="issueTitle-issuenumber" class="col-sm-3 col-form-label">Title</label>
            <div class="col-sm-9">
                <input readonly type="text" class="form-control" id="issueTitle-issuenumber" placeholder="Enter title.." data-name="title"
                    value="${data.title}">
            </div>
        </div>
        <div class="form-group row">
            <label for="issueDescription-issuenumber" class="col-sm-3 col-form-label">Issue Description</label>
            <div class="col-sm-9">
                <textarea readonly name="openissueDescription" id="issueDescription-issuenumber" rows="5" class="w-100" data-name="body">${data.body}</textarea>
            </div>
        </div>

        <div class="button-section" api-url="${data.url}">
            <button type="button" class="btn btn-success submitSection px-5 my-1 d-none" container-id="${data.id}">Submit</button>
            <button type="button" class="btn btn-dark editSection px-5 my-1" container-id="${data.id}">Edit</button>
            <button type="button" class="btn btn-danger px-5 my-1 closeThisIsuue ${data.state != "closed" ? "" : "d-none"}" >Close Issue</button>
            <button type="button" class="btn btn-primary px-5 my-1 reopenThisIsuue ${data.state == "closed" ? "" : "d-none"}">Reopen Issue</button>
        </div>
    </section>`
    });
    jQuery("#" + containerId).html(issueHtml);

}
function createModelPopup(data) {//headername modelId 
    jQuery("body").append(`<div class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" id="${data.modalId}">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
        <!-- Modal Header -->
        <div class="modal-header ${data.ClassName}">
            <h4 class="modal-title"> ${data.modalHeading}</h4>
            <button type="button" class="close modalClose" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
             </button>
        </div>
        <!-- Modal body -->
        <div class="modal-body">
           ${data.modalContent}
        </div>
        <!-- Modal footer -->
        <div class="modal-footer">
            <button type="button" class="btn btn-danger modalClose" data-dismiss="modal">${data.buttonName}</button>
        </div>

        </div>
    </div>
    </div>`);
    jQuery('#' + data.modalId).modal('show');
}
export { createIssueWidget, createRepoWidget, createUserRepository, createUserIsuueWidget, createModelPopup }