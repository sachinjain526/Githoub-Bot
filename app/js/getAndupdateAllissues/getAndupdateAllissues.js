import { commonPostAjaxFunc, commonGetAjaxFunc } from '../GetDataService';
import renderIsuueWidgets from './createUserIssueWidget';
import createModelPopup from '../createModal/createModalWidget';

let containerId = '';

function renderIssueWidget(resData) {
  renderIsuueWidgets(containerId, resData);// "userIsuueContainer"
}

function updateSuccessFully() {
  createModelPopup({
    modalId: 'completeIssueCreation', modalHeading: 'Confirmation', ClassName: 'bg-success', modalContent: "You have successfully uodated issue in the gitHub <span class='text-success'> For More Info Please Visit: www.github.com</span>", buttonName: 'Close',
  });
}
function getAllUserIssue(fullurl, callback) {
  commonGetAjaxFunc(fullurl, callback);
}

function EditGitIssue(url, passData) {
  commonPostAjaxFunc(url, 'patch', passData, updateSuccessFully);
}
function createUserissueSection(container, fullUrl) {
  containerId = container;
  getAllUserIssue(fullUrl, renderIssueWidget);
}

export { createUserissueSection, EditGitIssue };
