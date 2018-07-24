const jQuery = require('jquery')

function createModelPopup(data) { // headername modelId
    jQuery('body').append(`<div class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" id="${data.modalId}">
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
            <button type="button" class="btn btn-success modalSubmit ${data.submitBotton ? '' : 'd-none'}" data-dismiss="modal">${data.submitBotton}</button>
            <button type="button" class="btn btn-danger modalClose" data-dismiss="modal">${data.buttonName}</button>
        </div>

        </div>
    </div>
    </div>`)
    jQuery('#' + data.modalId).modal('show')
    jQuery(document).on('click', '.modalSubmit', function () {
        if (data.submitCallback) {
            data.submitCallback(data.modalId)
        }
    })
}
function createFormPopup(data) {
    var addCollHtml = `
    <form method="post" action="#" class="w-100 text-center">
    <div class="form-group row">
        <label for="collaboraterAction" class="col-sm-3 col-form-label">Action</label>
        <div class="col-sm-9">
            <select type="text" class="form-control" id="collaboraterAction"  data-name="collaboraterAction" value="${data.formData.action}">
                <option value="PUT">Add Collaborater</option>
                <option value="DELETE">Remove Collaborater</option>
            </select>
        </div>
    </div>
    <div class="form-group row">
        <label for="collaboraterName" class="col-sm-3 col-form-label">Collaborater Name</label>
        <div class="col-sm-9">
            <input type="text" class="form-control" id="collaboraterName placeholder="Enter Collaborater user name.." data-name="collaboraterName" value="${data.formData.newcollab ? data.formData.newcollab : ''}">
        </div>
    </div>
    <div class="form-group row">
        <label for="collaboraterRepo" class="col-sm-3 col-form-label">Repository Name</label>
        <div class="col-sm-9">
            <input type="text" class="form-control" id="collaboraterRepo" placeholder="Enter Repository name.." data-name="collaboraterRepo" value="${data.formData.repoName ? data.formData.repoName : ''}">
        </div>
    </div>
</form>
    `
    jQuery('body').append(`<div class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" id="${data.modalId}">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
        <!-- Modal Header -->
        <div class="modal-header text-white bg-primary">
            <h4 class="modal-title"> ${data.modalHeading}</h4>
            <button type="button" class="close modalClose" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
             </button>
        </div>
        <!-- Modal body -->
        <div class="modal-body">
           ${data.modalContent ? data.modalContent : addCollHtml}
        </div>
        <!-- Modal footer -->
        <div class="modal-footer">
            <button type="button" class="btn btn-success modalSubmit data-dismiss="modal">Submit</button>
            <button type="button" class="btn btn-danger modalClose" data-dismiss="modal">Close</button>
        </div>

        </div>
    </div>
    </div>`)
    jQuery('#' + data.modalId).modal('show')
    jQuery(document).on('click', '.modalSubmit', function () {
        if (data.submitCallback) {
            data.submitCallback(data.modalId)
        }
    })
}
export { createModelPopup, createFormPopup }
