const jQuery = require('jquery');

function createIssueWidgets(data, repoName) {
  jQuery(`#issueWidget-${repoName}`).remove();
  jQuery('#widgetSection').prepend(`
        <div class="p-3 my-3 mx-auto border border-info rounded openWidget" id="issueWidget-${repoName}" repo="${repoName}">
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
                    <div>
                        <button type="button" class="btn btn-primary createIssue">Create Isuue</button>
                        <button type="button" class="btn btn-danger cancelWidget" id="cancelIssueWidget">Cancel</button>
                    </div>
                </form>
            </div> `);
}

export default createIssueWidgets;
