
import { userReposConstruction } from './userReposConstruction'
import { commonGetAjaxFunc } from '../GetDataService'
import { gitBaseUrl } from '../KeyAndPath'
var contianerId = ''
function createAlluserRepos (contianer) {
  contianerId = contianer
  getAllUserRepo()
}

function getServiceData (repoData) {
  userReposConstruction(contianerId, repoData)
}
function getAllUserRepo () {
  const fullurl = gitBaseUrl + 'users/sachinjain526/repos'
  commonGetAjaxFunc(fullurl, getServiceData)
}

export {
  createAlluserRepos
}
