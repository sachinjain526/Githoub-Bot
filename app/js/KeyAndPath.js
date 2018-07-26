const gitBaseUrl = 'https://api.github.com/';
const gitApiToken = '085c8a9f0e09dc607e1493ae20174268ff70d401';
const baseUrl = '/api/';
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
  gitBaseUrl, gitApiToken, repoCreateJson, issueCreateJson, baseUrl,
};
