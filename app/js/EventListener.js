import { createRepoWidgets, createGitRepository } from './widget/createRepoWidgets'
// createRepoWidget,createGitRepository
import { createIssueWidgets, createGitIssue } from './widget/createIssueWidgets'
import { createUserissueSection, EditGitIssue } from './getAndUpdateAllIssues/getAndUpdateAllIssues'
import { createModelPopup, createFormModelPopup } from './createModal/createModalWidget'
import { getInputFromRecastAPi } from './GetDataService'
import { repoCreateJson, issueCreateJson, gitBaseUrl } from './KeyAndPath'
import { getFormData, makeFormEditable, setDataToLocalStorage } from './localUtility'
import { addAndDeleteCollboraters } from './collaboratorModule/addAndDeleteCollaborator'
const jQuery = require('jquery')

// event listener start from here
function eventListener () {
  jQuery('#queryRunner').on('click', '#submitQuery', function () {
    let inputValue = jQuery('#queryInput').val()
    getInputFromRecastAPi(inputValue, CreateRpeoAndIssueWidget)
  })
  jQuery('main').on('click', '#createRepo', function () {
    let formData = getFormData('repoWidget')
    let thisData = jQuery.extend(true, {}, repoCreateJson, formData)
    createGitRepository(thisData)
    jQuery(this).parents('.container').remove()
  })
  jQuery('main').on('click', '#createIssue', function () {
    let formData = getFormData('issueWidget')
    let getRepoName = jQuery('#repositoryName').text()
    let thisData = jQuery.extend(true, {}, issueCreateJson, formData)
    createGitIssue(thisData, getRepoName)
    jQuery(this).parents('.container').remove()
  })
  jQuery('#mainNavBar').on('click', '#AllIssue', function () {
    createUserissueSection('userIsuueContainer', gitBaseUrl + 'user/issues?filter=all&state=all')
  })
  jQuery('main').on('click', '.cancelWidget', function () {
    jQuery(this).parents('.container').remove()
  })
  jQuery('body').on('click', '.modalClose', function () {
    const modalId = jQuery(this).parents('.modal').attr('id')
    jQuery('#' + modalId).on('hidden.bs.modal', function () {
      jQuery(this).remove()
    })
  })
  jQuery('#userIsuueContainer').on('click', '.editSection', function () {
    const thisObj = jQuery(this)
    const containerId = thisObj.attr('container-id')
    makeFormEditable(containerId)
    thisObj.siblings('.submitSection').removeClass('d-none')
    thisObj.addClass('d-none')
  })
  jQuery('#userIsuueContainer').on('click', '.submitSection', function () {
    const thisObj = jQuery(this)
    const containerId = thisObj.attr('container-id')
    const url = thisObj.parent().attr('api-url')
    let formData = getFormData(containerId)
    let thisData = jQuery.extend(true, {}, issueCreateJson, formData)
    EditGitIssue(url, thisData)
  })
  jQuery('#userIsuueContainer').on('click', '.closeThisIsuue', function () {
    const thisObj = jQuery(this)
    const url = thisObj.parent().attr('api-url')
    EditGitIssue(url, { state: 'closed' })
  })
  jQuery('#userIsuueContainer').on('click', '.reopenThisIsuue', function () {
    const thisObj = jQuery(this)
    const url = thisObj.parent().attr('api-url')
    EditGitIssue(url, { state: 'open' })
  })
  jQuery('#mainNavBar').on('click', '#AddCollaborators', function () {
    createFormModelPopup({ modalId: 'CollaboraterActions', modalHeading: 'Collaborater Form', submitCallback: addCollaboraterInRepo, formData: {} })
  })
}
// callback function for service
function CreateRpeoAndIssueWidget (recastData) {
  jQuery.each(recastData.intents, function (index, value) {
    if (value.slug === 'create-repo') {
      const repoName = recastData.entities.repository
      if (repoName) {
        jQuery('#repoWidget').remove()
        createRepoWidgets(repoName[0].value)
        setDataToLocalStorage('repoWidget', repoName[0].value)
      } else {
        createModelPopup({ modalId: 'errorModal', modalHeading: 'Error', ClassName: 'bg-danger text-white', modalContent: 'please write valid query for repository creation.', buttonName: 'Ok' })
      }
    } else if (value.slug === 'create-issue') {
      const issueTitle = recastData.entities.issue
      const repoName = recastData.entities.repository
      if (issueTitle && repoName) {
        jQuery('#issueWidget').remove()
        createIssueWidgets(issueTitle[0].value, repoName[0].value)
        setDataToLocalStorage('issueWidget', JSON.stringify({ 'repoName': repoName[0].value, 'title': issueTitle[0].value }))
      } else {
        createModelPopup({ modalId: 'errorModal', modalHeading: 'Error', ClassName: 'bg-danger text-white', modalContent: 'please write valid query for issue creation', buttonName: 'Ok' })
      }
    } else if (value.slug === 'display-issue') {
      /// repos/sachinjain526/webapck-conf/issues
      let url = gitBaseUrl + 'repos/sachinjain526/'
      const target = recastData.entities.target ? recastData.entities.target[0].value : ''
      const repoName = recastData.entities.repository ? recastData.entities.repository[0].value : ''
      const state = recastData.entities.state ? recastData.entities.state[0].value : ''
      const number = recastData.entities.number ? recastData.entities.number[0].raw : 1
      // for repo
      if (repoName) {
        url = url + repoName + '/issues'
        if (target === 'all' || target === 'any') {
          url = url + '?filter=all'
          if (state) {
            url = url + '&state=' + state
          }
        } else {
          url = url + '/' + number
        }
      } else {
        url = 'user/issues?filter=all'
        if (state) {
          url = url + '&state=' + state
        }
      }
      createUserissueSection('userIsuueContainer', url)
    } else if (value.slug === 'add-collaborator') {
      const action = recastData.entities.action ? recastData.entities.action[0].value : 'PATCH'
      const repoName = recastData.entities.repository ? recastData.entities.repository[0].value : ''
      const newcollab = recastData.entities.newcollab ? recastData.entities.newcollab[0].value : ''
      createFormModelPopup({ modalId: 'CollaboraterActions', modalHeading: 'Collaborater Form', submitCallback: addCollaboraterInRepo, formData: { action, repoName, newcollab } })
    }
  })
  console.log(recastData)
}
function addCollaboraterInRepo (modelId) {
  let formData = getFormData(modelId)
  addAndDeleteCollboraters(formData)
  jQuery('#' + modelId).on('hidden.bs.modal', function () {
    jQuery(this).remove()
  })
}

export { eventListener }
