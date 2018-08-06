import {
  CREATE_ISSUE, CREATE_REPO, ADD_COLLABORATOR,
} from './actions';
import store from './reduxStore';
import createAlluserRepos from './getAlluserRepos/userReposServices';
import createRepoWidgets from './repoWidgets/repoWidgetsView';
import createIssueWidgets from './issueWidgets/issueWidgetsView';
import createCollaboratorWidgets from './collaboratorWidgets/collaboratorWidgetsView';
import { getHistory } from './GetDataService';

const jQuery = require('jquery');

function createCommonClosedOrSubmitWidget(widgetData) {
  const widgetHtml = ` <div class="p-3 my-3 mx-auto border border-info rounded  closedWidget" id="closed-${widgetData.id}">
  <h5 class="text-center mt-2 mb-4 text-danger">This widget has been closed with action ${widgetData.result} </h5>
  <p class="text-center">The query was:
      <span>${widgetData.source}</span>
  </p>
  <p class="d-inline">Create Date:
      <span>${widgetData.createDate}</span>
  </p>
  <p class="d-inline float-right mr-2">Closed Date:
      <span>${widgetData.closedDate}</span>
  </p>
</div>`;
  jQuery('#widgetSection').prepend(widgetHtml);
}

function initialPageRendering(data) {
  jQuery.each(data, (index, value) => {
    console.log(index);
    if (value.result) {
      createCommonClosedOrSubmitWidget(value);
    } else {
      if (value.intent === 'create-repo') {
        createRepoWidgets(value);
      }
      if (value.intent === 'create-issue') {
        createIssueWidgets(value);
      }
      if (value.intent === 'add-collaborator') {
        createCollaboratorWidgets(value);
      }
    }
  });
}

function onLoadEventToFetchData() {
  getHistory(initialPageRendering);
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
    createIssueWidgets(curentState.issueWidget);
  }
  if (curentState.collaboratorWidget && curentState.action === ADD_COLLABORATOR) {
    // setDataToLocalStorage('collaboratorWidget', JSON.stringify(curentState.collaboratorWidget));
    createCollaboratorWidgets(curentState.collaboratorWidget);
  }
}
store.subscribe(renderWidgets);
export default onLoadEventToFetchData;
