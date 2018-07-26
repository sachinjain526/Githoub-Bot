import createGitRepository from './repoWidgets/repoWidgetServices';
import createGitIssue from './issueWidgets/issueWidgetServices';
import { createUserissueSection, EditGitIssue } from './getAndupdateAllissues/getAndupdateAllissues';
import createModelPopup from './createModal/createModalWidget';
import { getInputFromRecastAPi } from './GetDataService';
import { repoCreateJson, issueCreateJson, gitBaseUrl } from './KeyAndPath';
import { getFormData, makeFormEditable } from './localUtility';
import updateCollboratersService from './collaboratorWidgets/updateCollboratersService';
import store from './reduxStore';
import { showRepoWidget, showIsuueWidget, showCollboratorWidget } from './actions';

const jQuery = require('jquery');

// callback function for service
function CreateRpeoAndIssueWidget(recastData) {
  jQuery.each(recastData.intents, (index, value) => {
    if (value.slug === 'create-repo') {
      const repoName = recastData.entities.repository;
      if (repoName) {
        store.dispatch(showRepoWidget({ repoName: repoName[0].value }));
      } else {
        createModelPopup({
          modalId: 'errorModal', modalHeading: 'Error', ClassName: 'bg-danger text-white', modalContent: 'please write valid query for repository creation.', buttonName: 'Ok',
        });
      }
    } else if (value.slug === 'create-issue') {
      const issueTitle = recastData.entities.issue ? recastData.entities.issue[0].value : '';
      const repoName = recastData.entities.repository ? recastData.entities.repository[0].value : '';
      if (issueTitle && repoName) {
        store.dispatch(showIsuueWidget({ repoName, title: issueTitle }));
      } else {
        createModelPopup({
          modalId: 'errorModal', modalHeading: 'Error', ClassName: 'bg-danger text-white', modalContent: 'please write valid query for issue creation', buttonName: 'Ok',
        });
      }
    } else if (value.slug === 'display-issue') {
      // / repos/sachinjain526/webapck-conf/issues
      let url = `${gitBaseUrl}repos/sachinjain526/`;
      const target = recastData.entities.target ? recastData.entities.target[0].value : '';
      const repoName = recastData.entities.repository ? recastData.entities.repository[0].value : '';
      const state = recastData.entities.state ? recastData.entities.state[0].value : '';
      const number = recastData.entities.number ? recastData.entities.number[0].raw : 1;
      // for repo
      if (repoName) {
        url = `${url + repoName}/issues`;
        if (target === 'all' || target === 'any') {
          url += '?filter=all';
          if (state) {
            url = `${url}&state=${state}`;
          }
        } else {
          url = `${url}/${number}`;
        }
      } else {
        url = 'user/issues?filter=all';
        if (state) {
          url = `${url}&state=${state}`;
        }
      }
      createUserissueSection('userIsuueContainer', url);
    } else if (value.slug === 'add-collaborator') {
      const action = recastData.entities.action ? recastData.entities.action[0].value : 'PATCH';
      const repoName = recastData.entities.repository ? recastData.entities.repository[0].value : '';
      const collaboratorName = recastData.entities.newcollab ? recastData.entities.newcollab[0].value : '';
      store.dispatch(showCollboratorWidget({ action, repoName, collaboratorName }));
    }
  });
}
// event listener start from here
function eventListener() {
  jQuery('#queryRunner').on('click', '#submitQuery', () => {
    const inputValue = jQuery('#queryInput').val();
    getInputFromRecastAPi(inputValue, CreateRpeoAndIssueWidget);
  });
  jQuery('main').on('click', '.createRepo', function () {
    const parentElem = jQuery(this).parents('.openWidget');
    const parentId = parentElem.attr('id');
    const formData = getFormData(parentId);
    const thisData = jQuery.extend(true, {}, repoCreateJson, formData);
    createGitRepository(thisData);
    parentElem.remove();
  });
  jQuery('main').on('click', '.createIssue', function () {
    const parentElem = jQuery(this).parents('.openWidget');
    const parentId = parentElem.attr('id');
    const getRepoName = parentElem.attr('repo');
    const formData = getFormData(parentId);
    const thisData = jQuery.extend(true, {}, issueCreateJson, formData);
    createGitIssue(thisData, getRepoName);
    parentElem.remove();
  });
  jQuery('main').on('click', '.collaboratorSubmit', function () {
    const parentElem = jQuery(this).parents('.openWidget');
    const parentId = parentElem.attr('id');
    const formData = getFormData(parentId);
    updateCollboratersService(formData);
    parentElem.remove();
  });
  jQuery('main').on('click', '.cancelWidget', function () {
    jQuery(this).parents('.openWidget').remove();
  });
  jQuery('#mainNavBar').on('click', '#AllIssue', () => {
    createUserissueSection('userIsuueContainer', `${gitBaseUrl}user/issues?filter=all&state=all`);
  });
  jQuery('#mainNavBar').on('click', '#AddCollaborators', () => {
    store.dispatch(showCollboratorWidget({}));
  });
  jQuery('body').on('click', '.modalClose', function () {
    const modalId = jQuery(this).parents('.modal').attr('id');
    jQuery(`#${modalId}`).on('hidden.bs.modal', function () {
      jQuery(this).remove();
    });
  });
  jQuery('#userIsuueContainer').on('click', '.editSection', function () {
    const thisObj = jQuery(this);
    const containerId = thisObj.attr('container-id');
    makeFormEditable(containerId);
    thisObj.siblings('.submitSection').removeClass('d-none');
    thisObj.addClass('d-none');
  });
  jQuery('#userIsuueContainer').on('click', '.submitSection', function () {
    const thisObj = jQuery(this);
    const containerId = thisObj.attr('container-id');
    const url = thisObj.parent().attr('api-url');
    const formData = getFormData(containerId);
    const thisData = jQuery.extend(true, {}, issueCreateJson, formData);
    EditGitIssue(url, thisData);
  });
  jQuery('#userIsuueContainer').on('click', '.closeThisIsuue', function () {
    const thisObj = jQuery(this);
    const url = thisObj.parent().attr('api-url');
    EditGitIssue(url, { state: 'closed' });
  });
  jQuery('#userIsuueContainer').on('click', '.reopenThisIsuue', function () {
    const thisObj = jQuery(this);
    const url = thisObj.parent().attr('api-url');
    EditGitIssue(url, { state: 'open' });
  });
}


export default eventListener;
