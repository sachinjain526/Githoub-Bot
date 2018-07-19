const gitBaseUrl = "https://api.github.com/";
const gitApiToken = "ac8241ed79802a5a660145995c7c32bb13febcdc";
const repoCreateJson = {
    "name": "Hello-World",
    "description": "This is your first repository",
    "homepage": "https://github.com",
    "private": false,
    "has_issues": true,
    "has_projects": true,
    "has_wiki": true
}
const issueCreateJson = {
    "title": "Found a bug",
    "body": "I'm having a problem with this.",
    "labels": [
        "bug"
    ]
}
function getDescription(statusCode) {
    let statusDesc = ""
    switch (statusCode) {
        case 204:
            statusDesc = "Successfully Delete Collaborater from repository."
            break;
        case 404:
            statusDesc = "Serach repository/issue not found. Please Try Again!."
            break;
        case 400: statusDesc = "Bad Request-Please passed the correct data to complete this action. And Try Again!."
            break;
        case 401: statusDesc = "Unauthorized-Please input correct Authrization to complete this action. And Try Again!."
            break;
        case 403: statusDesc = "server locked and other reasons. Please Try after some time!."
            break;
        case 500: statusDesc = "Server under mantainance. Please Try after some time!."
            break;
        default:
            statusDesc = "there is some Issue with passing data. We will comeback shortly"
    }
    return statusDesc
}
export { gitBaseUrl, gitApiToken, repoCreateJson, issueCreateJson, getDescription };