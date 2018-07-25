
import { CREATE_REPO, CREATE_ISSUE, ADD_COLLABORATOR } from './actions'
const initailState = {
    action: "",
    repoWidget: {
        "repoName": ""
    },
    issueWidget: {
        title: "",
        repoName: ""
    },
    collaboratorWidget: {
        action: "",
        repoName: "",
        collaboratorName: ""
    }
}
const createWidgetReducer = function (state = initailState, action) {

    if (action.type === CREATE_REPO) {
        return {
            ...state, repoWidget: { repoName: action.payload.repoName }, action: action.type
        }
    } else if (action.type === CREATE_ISSUE) {
        return {
            ...state,
            issueWidget: {
                title: action.payload.title,
                repoName: action.payload.repoName
            }, action: action.type
        }
    }
    else if (action.type === ADD_COLLABORATOR) {
        return {
            ...state,
            collaboratorWidget: {
                action: action.payload.action,
                collaboratorName: action.payload.collaboratorName,
                repoName: action.payload.repoName
            }, action: action.type
        }
    }
    return state
}
export { createWidgetReducer };