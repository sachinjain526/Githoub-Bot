import { showRepoWidget, showIsuueWidget, CREATE_ISSUE, CREATE_REPO, showCollboratorWidget, ADD_COLLABORATOR } from './actions'
import { store } from './reduxStore';
import { createAlluserRepos } from './getAlluserRepos/getAlluserRepos';
import { getDataToLocalStorage, setDataToLocalStorage } from './localUtility';
import { createRepoWidgets } from './widget/createRepoWidgets'
import { createIssueWidgets } from './widget/createIssueWidgets';
import { createCollaboratorWidgets } from "./collaboratorModule/collboratorView";
const jQuery = require('jquery');
function onLoadEventToFetchData() {
  const createRepoName = getDataToLocalStorage('repoWidget');
  const createIssueObj = getDataToLocalStorage('issueWidget');
  const collaboratorObj = getDataToLocalStorage('collaboratorWidget');
  if (createRepoName) {
    store.dispatch(showRepoWidget({ 'repoName': createRepoName }));
  }
  if (createIssueObj) {
    store.dispatch(showIsuueWidget(JSON.parse(createIssueObj)));
  }
  if (collaboratorObj) {
    store.dispatch(showCollboratorWidget(JSON.parse(collaboratorObj)));
  }
  createAlluserRepos('userRepoSection')
}
store.subscribe(() => {
  const curentState = store.getState();
  if (curentState.repoWidget && curentState.action === CREATE_REPO) {
    jQuery('#repoWidget').remove();
    setDataToLocalStorage('repoWidget', curentState.repoWidget.repoName);
    createRepoWidgets(curentState.repoWidget.repoName);
  }
  if (curentState.issueWidget && curentState.action === CREATE_ISSUE) {
    jQuery('#issueWidget').remove();
    setDataToLocalStorage('issueWidget', JSON.stringify(curentState.issueWidget));
    createIssueWidgets(curentState.issueWidget.title, curentState.issueWidget.repoName);
  }
  if (curentState.collaboratorWidget && curentState.action === ADD_COLLABORATOR) {
    jQuery('#collaboratorWidget').remove();
    setDataToLocalStorage('collaboratorWidget', JSON.stringify(curentState.collaboratorWidget));
    createCollaboratorWidgets(curentState.collaboratorWidget);
  }
})
export { onLoadEventToFetchData }
