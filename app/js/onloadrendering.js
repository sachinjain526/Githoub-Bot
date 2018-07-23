import { showRepoWidget, showIsuueWidget } from './actions'
import { store } from './reduxStore'
import { createAlluserRepos } from './getAlluserRepos/getAlluserRepos'
import { getDataToLocalStorage } from './localUtility'
function onLoadEventToFetchData () {
  const createRepoName = getDataToLocalStorage('repoWidget')
  const createIssueObj = getDataToLocalStorage('issueWidget')
  if (createRepoName) {
    store.dispatch(showRepoWidget({ 'repoName': createRepoName }))
  }
  if (createIssueObj) {
    store.dispatch(showIsuueWidget(JSON.parse(createIssueObj)))
  }
  createAlluserRepos('userRepoSection')
}
export { onLoadEventToFetchData }
