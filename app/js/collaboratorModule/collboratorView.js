const jQuery = require('jquery');
function createCollaboratorWidgets(collaboratorData) {
    jQuery('#widgetSection').prepend(`
        <div class="p-3 my-3 mx-auto border border-info rounded" id="collaboratorWidget">
            <h3 class="text-center mt-2 mb-4 text-danger"> Create Collaborator </h3>
            <form method="post" action="#" class="w-100 text-center">
                <div class="form-group row">
                    <label for="collaboraterAction" class="col-sm-3 col-form-label">Action</label>
                    <div class="col-sm-9">
                        <select type="text" class="form-control" id="collaboraterAction"  data-name="collaboraterAction" value="${collaboratorData.action}">
                            <option value="PUT">Add Collaborater</option>
                            <option value="DELETE">Remove Collaborater</option>
                        </select>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="collaboraterName" class="col-sm-3 col-form-label">Collaborater Name</label>
                    <div class="col-sm-9">
                        <input type="text" class="form-control" id="collaboraterName placeholder="Enter Collaborater user name.." data-name="collaboraterName" value="${collaboratorData.collaboratorName ? collaboratorData.collaboratorName : ''}">
                    </div>
                </div>
                <div class="form-group row">
                    <label for="collaboraterRepo" class="col-sm-3 col-form-label">Repository Name</label>
                    <div class="col-sm-9">
                        <input type="text" class="form-control" id="collaboraterRepo" placeholder="Enter Repository name.." data-name="collaboraterRepo" value="${collaboratorData.repoName ? collaboratorData.repoName : ''}">
                    </div>
                </div>
                <div class="form-group text-center ">
                    <button type="button" class="btn btn-success" id="collaboratorSubmit" data-dismiss="modal">Submit</button>
                    <button type="button" class="btn btn-danger cancelWidget" id="collaboratorClose" data-dismiss="modal">Close</button>
                </div>
            </form>         
        </div>`
    );
}
export { createCollaboratorWidgets };