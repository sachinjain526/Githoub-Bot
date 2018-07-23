import { createStore } from 'redux'
import { createRepoWidgets } from './widget/createRepoWidgets'
import { createIssueWidgets } from './widget/createIssueWidgets'
import { CREATE_REPO, CREATE_ISSUE } from './actions'
// coding start
const CreateWidgetReducer = function (state = {}, action) {
  if (action.type === CREATE_REPO) {
    createRepoWidgets(action.payload.repoName)
  } else if (action.type === CREATE_ISSUE) {
    createIssueWidgets(action.payload.title, action.payload.repoName)
  }
  return state
}
export const store = createStore(CreateWidgetReducer, {})

store.subscribe(() => {
  console.log(store.getState())
})
