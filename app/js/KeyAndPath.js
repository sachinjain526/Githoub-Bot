const gitBaseUrl = "https://api.github.com/";
const gitApiToken = "d669d3042ebfcc5e0c5cf7473d54033d5bbd5bbe";
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
export { gitBaseUrl, gitApiToken, repoCreateJson, issueCreateJson };