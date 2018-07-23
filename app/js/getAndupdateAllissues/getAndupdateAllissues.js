import { commonPostAjaxFunc, commonGetAjaxFunc } from '../GetDataService'
import { createUserIsuueWidget } from './createUserIssueWidget'
import { createModelPopup } from '../createModal/createModalWidget'
let containerId = ''
function getAllUserIssue (fullurl, callback) {
  commonGetAjaxFunc(fullurl, callback)
}
function EditGitIssue (url, passData) {
  commonPostAjaxFunc(url, 'patch', passData, updateSuccessFully)
}
function createUserissueSection (container, fullUrl) {
  containerId = container
  getAllUserIssue(fullUrl, constructIssueWidget)
}
function constructIssueWidget (resData) {
  createUserIsuueWidget(containerId, resData)// "userIsuueContainer"
}
function updateSuccessFully () {
  createModelPopup({ modalId: 'completeIssueCreation', modalHeading: 'Confirmation', ClassName: 'bg-success', modalContent: "You have successfully uodated issue in the gitHub <span class='text-success'> For More Info Please Visit: www.github.com</span>", buttonName: 'Close' })
  //  createUserissueSection("userIsuueContainer", gitBaseUrl + "user/issues?filter=all&state=all");
}
export { createUserissueSection, EditGitIssue }
