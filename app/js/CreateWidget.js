var jQuery = require('jQuery');

function createRepoWidget(data) {
    jQuery("#widgetSection").prepend(`
    <div class="container my-3 mx-auto border border-info rounded">
    <div class="row p-3">
        <form method="post" action="#" class="w-75 text-center">
            <div class="form-group row">
                <label for="repoName" class="col-sm-3 col-form-label">Repo Name</label>
                <div class="col-sm-9">
                    <input type="text" class="form-control" id="repoName" placeholder="Enter your repo name">
                </div>
            </div>
            <div class="form-group row">
                <label for="repoDesc" class="col-sm-3 col-form-label">Repo Description</label>
                <div class="col-sm-9">
                    <input type="text" class="form-control" id="repoDesc" placeholder="Description">
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
    <div class="container my-3 mx-auto border border-info rounded">
    <div class="row p-3">
        <form method="post" action="#" class="w-75 text-center">
            <div class="form-group row">
                <label for="issueTitle" class="col-sm-3 col-form-label">Title</label>
                <div class="col-sm-9">
                    <input type="text" class="form-control" id="issueTitle" placeholder="Enter title..">
                </div>
            </div>
            <div class="form-group row">
                <label for="issueBody" class="col-sm-3 col-form-label">Body</label>
                <div class="col-sm-9">
                    <input type="text" class="form-control" id="issueBody" placeholder="Enter issue body..">
                </div>
            </div>
            <div class="form-group row">
                <label for="issueAssignees" class="col-sm-3 col-form-label">Assignee Name</label>
                <div class="col-sm-9">
                    <input type="text" class="form-control" id="issueAssignees" placeholder="Enter issue assignee name..">
                </div>
            </div>
            <div class="form-group row">
                <label for="issueLabel" class="col-sm-3 col-form-label">Issue Type</label>
                <div class="col-sm-9">
                    <input type="text" class="form-control" id="issueLabel" placeholder="Enter issue type..">
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
export { createIssueWidget, createRepoWidget }