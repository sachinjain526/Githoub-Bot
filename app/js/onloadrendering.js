import {
  CREATE_ISSUE, CREATE_REPO, ADD_COLLABORATOR,
} from './actions';
import store from './reduxStore';
import createAlluserRepos from './getAlluserRepos/userReposServices';
import { getDataToLocalStorage } from './localUtility';// setDataToLocalStorage
import createRepoWidgets from './repoWidgets/repoWidgetsView';
import createIssueWidgets from './issueWidgets/issueWidgetsView';
import createCollaboratorWidgets from './collaboratorWidgets/collaboratorWidgetsView';

function onLoadEventToFetchData() {
  const createRepoObj = getDataToLocalStorage('repoWidget');
  const createIssueObj = getDataToLocalStorage('issueWidget');
  const collaboratorObj = getDataToLocalStorage('collaboratorWidget');
  if (createRepoObj) {
    // store.dispatch(showRepoWidget(JSON.parse(createRepoObj)));
  }
  if (createIssueObj) {
    // store.dispatch(showIsuueWidget(JSON.parse(createIssueObj)));
  }
  if (collaboratorObj) {
    // store.dispatch(showCollboratorWidget(JSON.parse(collaboratorObj)));
  }
  createAlluserRepos('userRepoSection');
}
function renderWidgets() {
  const curentState = store.getState();
  if (curentState.repoWidget && curentState.action === CREATE_REPO) {
    // setDataToLocalStorage('repoWidget', JSON.stringify(curentState.repoWidget));
    createRepoWidgets(curentState.repoWidget);
  }
  if (curentState.issueWidget && curentState.action === CREATE_ISSUE) {
    // setDataToLocalStorage('issueWidget', JSON.stringify(curentState.issueWidget));
    createIssueWidgets(curentState.issueWidget.title, curentState.issueWidget.repoName);
  }
  if (curentState.collaboratorWidget && curentState.action === ADD_COLLABORATOR) {
    // setDataToLocalStorage('collaboratorWidget', JSON.stringify(curentState.collaboratorWidget));
    createCollaboratorWidgets(curentState.collaboratorWidget);
  }
}
store.subscribe(renderWidgets);
export default onLoadEventToFetchData;
