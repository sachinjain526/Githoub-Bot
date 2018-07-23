const gitBaseUrl = 'https://api.github.com/'
const gitApiToken = 'f184e43687a6e79ef650aa2836e6d3b834083ea2'
const repoCreateJson = {
  'name': 'Hello-World',
  'description': 'This is your first repository',
  'homepage': 'https://github.com',
  'private': false,
  'has_issues': true,
  'has_projects': true,
  'has_wiki': true
}
const issueCreateJson = {
  'title': 'Found a bug',
  'body': "I'm having a problem with this.",
  'labels': [
    'bug'
  ]
}

export { gitBaseUrl, gitApiToken, repoCreateJson, issueCreateJson }
