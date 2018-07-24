import { createRepoWidgets } from './widget/createRepoWidgets'
import { createIssueWidgets } from './widget/createIssueWidgets'
import { CREATE_REPO, CREATE_ISSUE } from './actions'

const createWidgetReducer = function (state, action) {
    if (action.type === CREATE_REPO) {
        createRepoWidgets(action.payload.repoName)
    } else if (action.type === CREATE_ISSUE) {
        createIssueWidgets(action.payload.title, action.payload.repoName)
    }
    return state
}
export { createWidgetReducer };