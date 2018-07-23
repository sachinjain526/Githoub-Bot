import { gitBaseUrl, gitApiToken } from '../KeyAndPath'
import { createModelPopup } from '../createModal/createModalWidget'
import { getErrorDescription } from '../localUtility'
const jQuery = require('jquery')

function addAndDeleteCollboraters (PostData) {
  /// repos/sachinjain526/sachin-jain/collaborators/sskeet
  jQuery.ajax({
    header: { 'Content-Length': 0 },
    url: gitBaseUrl + 'repos/sachinjain526/' + PostData.collaboraterRepo + '/collaborators/' + PostData.collaboraterName,
    method: PostData.collaboraterAction,
    dataType: 'json',
    mode: 'cors',
    beforeSend: function (xhr) { xhr.setRequestHeader('Authorization', 'BEARER ' + gitApiToken) }
  }).done(function (responseData) {
    collaboraterAddedSuccesfully(responseData)
  }).fail(function (jqXHR, textStatus) {
    createModelPopup({ modalId: 'errorModal', modalHeading: 'Error-' + jqXHR.status, ClassName: 'bg-danger text-white', modalContent: getErrorDescription(jqXHR.status), buttonName: 'Ok' })
    console.log('Request failed: ' + textStatus)
  })
}
function collaboraterAddedSuccesfully () {
  createModelPopup({ modalId: 'collaboraterAddedSuccesfully', modalHeading: 'Confirmation', ClassName: 'bg-success', modalContent: 'You have successfully uodated repositories collaborater in the gitHub <span class="text-success"> For More Info Please Visit: www.github.com</span>', buttonName: 'Close' })
}
export { addAndDeleteCollboraters }
