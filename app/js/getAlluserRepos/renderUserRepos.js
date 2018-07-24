import { dateConvertToDDMMYYY } from '../localUtility'
const jQuery = require('jquery')

function renderUserRepos(conatinerId, userRepoData) {
  if (!(userRepoData && userRepoData.length)) {
    userRepoData = [userRepoData]
  }
  var thisHtml = ''
  jQuery.each(userRepoData, function (index, value) {
    var description = value.description || 'No description Found'
    thisHtml = thisHtml + `<a class="col-4 p-3 shadow repo-section" href="${value.html_url}">
        <div class="border border-info rounded p-2">
        <h4 class="text-center text-truncate">${value.name}</h4>
        <p class="m-1">${description}</p>
        <p class="m-1">Open Issue: <strong class="text-danger">${value.open_issues}</strong></p>
        <p class="m-1">Created: <strong class="text-primary">${dateConvertToDDMMYYY(value.created_at)}</strong></p>
        <p class="m-1">Last Updated: <strong class="text-success"> ${dateConvertToDDMMYYY(value.updated_at)}</strong></p>
        </div>
    </a>`
  })
  jQuery('#' + conatinerId).append(thisHtml)
}
export { renderUserRepos }
