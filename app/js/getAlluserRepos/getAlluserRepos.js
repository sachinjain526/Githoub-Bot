
import { renderUserRepos } from './renderUserRepos'
import { commonGetAjaxFunc } from '../GetDataService'
import { gitBaseUrl } from '../KeyAndPath'
var contianerId = ''
function createAlluserRepos(contianer) {
  contianerId = contianer
  getAllUserRepo()
}

function getServiceData(repoData) {
  renderUserRepos(contianerId, repoData)
}
function getAllUserRepo() {
  const fullurl = gitBaseUrl + 'users/sachinjain526/repos'
  commonGetAjaxFunc(fullurl, getServiceData)
}

export {
  createAlluserRepos
}
