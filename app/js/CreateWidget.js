const jQuery = require('jQuery');
import { dateConvertToDDMMYYY } from "./localUtility";
function createRepoWidget(data) {
    jQuery("#widgetSection").prepend(`
    <div class="container my-3 mx-auto border border-info rounded" id="repoWidget">
    <div class="row p-3">
        <form method="post" action="#" class="w-75 text-center">
            <div class="form-group row">
                <label for="repoName" class="col-sm-3 col-form-label">Repo Name</label>
                <div class="col-sm-9">
                    <input type="text" class="form-control" id="repoName" placeholder="Enter your repo name" value="${data}" data-name="name">
                </div>
            </div>
            <div class="form-group row">
                <label for="repoDesc" class="col-sm-3 col-form-label">Repo Description</label>
                <div class="col-sm-9">
                    <input type="text" class="form-control" id="repoDesc" placeholder="Description" data-name="description">
                </div>
            </div>
            <div>
                <button type="button" class="btn btn-primary" id="createRepo">Create Repo</button>
                <button type="button" class="btn btn-danger cancelWidget" id="canceRepolWidget">Cancel</button>
            </div>
        </form>
    </div>
</div>`);
}
function createIssueWidget(data) {
    jQuery("#widgetSection").prepend(`
    <div class="container my-3 mx-auto border border-info rounded" id="issueWidget">
    <div class="row p-3">
        <form method="post" action="#" class="w-75 text-center">
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
            <div>
                <button type="button" class="btn btn-primary" id="createIssue">Create Isuue</button>
                <button type="button" class="btn btn-danger cancelWidget" id="cancelIssueWidget">Cancel</button>
            </div>
        </form>
    </div>
</div>
</div>
    `)
}
function createUserRepository(conatinerId, userRepoData) {
    var thisHtml = "";
    jQuery.each(userRepoData, function (index, value) {
        let description = description ? description : "No description Found"
        thisHtml = thisHtml + `<a class="col-4 p-1" href="${value.html_url}">
    <div class="border border-info rounded p-2">
    <h4 class="text-center">${value.name}</h4>
    <p class="m-1">${description}</p>
    <p class="m-1">Open Issue: <strong>${value.open_issues}</strong></p>
    <span class="text-primary">Created: <strong>${dateConvertToDDMMYYY(value.created_at)}</strong></span>
    <span class="d-block text-success float-right">Last Updated: <strong> ${dateConvertToDDMMYYY(value.updated_at)}</strong></span>
    </div>
</a>`
    });
    jQuery("#" + conatinerId).html(thisHtml);
}
export { createIssueWidget, createRepoWidget, createUserRepository }