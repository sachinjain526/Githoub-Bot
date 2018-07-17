const gitBaseUrl = "https://api.github.com/";
const gitApiToken = "9f2c78e350e28d55592667f27f0aca89eca126fb";
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