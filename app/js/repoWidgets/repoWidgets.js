const jQuery = require('jquery');

function createRepoWidgets(repoName) {
  jQuery('#widgetSection').prepend(`
        <div class="p-3 my-3 mx-auto border border-info rounded repoWidget" id="repoWidget-${repoName}">
            <h3 class="text-center mt-2 mb-4 text-danger"> Create Repository </h3>
            <form method="post" action="#" class="w-100 text-center">
                <div class="form-group row">
                    <label for="repoName" class="col-sm-5 col-form-label">Repo Name</label>
                    <div class="col-sm-7">
                        <input type="text" class="form-control" id="repoName" placeholder="Enter your repo name" value="${repoName}" data-name="name">
                    </div>
                </div>
                <div class="form-group row">
                    <label for="repoDesc" class="col-sm-5 col-form-label">Repo Description</label>
                    <div class="col-sm-7">
                        <input type="text" class="form-control" id="repoDesc" placeholder="Description" data-name="description">
                    </div>
                </div>
                <div>
                    <button type="button" class="btn btn-primary createRepo" key="${repoName}">Create Repo</button>
                    <button type="button" class="btn btn-danger cancelWidget" id="canceRepolWidget">Cancel</button>
                </div>
            </form>
        </div>`);
}


export default createRepoWidgets;
