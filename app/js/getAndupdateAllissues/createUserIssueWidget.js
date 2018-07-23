import { dateConvertToDDMMYYY } from '../localUtility'
const jQuery = require('jquery')

function createUserIsuueWidget (containerId, resData) {
  if (resData && resData.length) {
    console.log(resData)
  } else {
    resData = [resData]
  }
  let issueHtml = ''
  jQuery.each(resData, function (index, data) {
    issueHtml = issueHtml + `  <section class="col-6 issuesection border border-secondary m-2 p-3 text-center font-weight-bold rounded" id="${data.id}" data-issue-url="${data.url}">
        <a href="${data.html_url}" target="_blank">
            <h4>Issue Number : ${data.repository ? data.repository.name : 'Current'}/Isuue#${data.number}</h4>
        </a>
        <div class="d-flex border-bottom  border-top  border-info text-left my-2">
            <div class="col-6 px-3 border-right  border-info">
                <p>Created:
                    <span class="text-success">${dateConvertToDDMMYYY(data.created_at)}</span>
                </p>
                <p> Owner:
                    <span class="text-success">${data.author_association}</span>
                </p>
                <p>State:
                    <span class="text-success">${data.state}</span>
                </p>
            </div>
            <div class="col-6 px-3">
                <p>Last Updated:
                    <span class="text-success">${dateConvertToDDMMYYY(data.updated_at)}</span>
                </p>
                <p>assignees:
                    <span class="text-success">${data.assignees}</span>
                </p>
                <p>Closed At :
                    <span class="text-danger">${dateConvertToDDMMYYY(data.closed_at)}</span>
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
            <button type="button" class="btn btn-danger px-5 my-1 closeThisIsuue ${data.state !== 'closed' ? '' : 'd-none'}" >Close Issue</button>
            <button type="button" class="btn btn-primary px-5 my-1 reopenThisIsuue ${data.state === 'closed' ? '' : 'd-none'}">Reopen Issue</button>
        </div>
        </section>`
  })
  jQuery('#' + containerId).html(issueHtml)
}
export { createUserIsuueWidget }
