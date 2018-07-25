const gitBaseUrl = 'https://api.github.com/';
const gitApiToken = '0c206d8d22221100c3caad6166c65570064f14a2';
const repoCreateJson = {
  name: 'Hello-World',
  description: 'This is your first repository',
  homepage: 'https://github.com',
  private: false,
  has_issues: true,
  has_projects: true,
  has_wiki: true,
};
const issueCreateJson = {
  title: 'Found a bug',
  body: "I'm having a problem with this.",
  labels: [
    'bug',
  ],
};

export {
  gitBaseUrl, gitApiToken, repoCreateJson, issueCreateJson,
};
