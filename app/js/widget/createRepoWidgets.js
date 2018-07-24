const jQuery = require('jquery');
import { commonPostAjaxFunc } from '../GetDataService';
import { gitBaseUrl } from '../KeyAndPath';
import { createModelPopup } from '../createModal/createModalWidget';
import { renderUserRepos } from '../getAlluserRepos/renderUserRepos';

function createRepoWidgets(repoName) {
    jQuery('#widgetSection').prepend(`
            <div class="p-3 my-3 mx-auto border border-info rounded" id="repoWidget">
                <h3 class="text-center mt-2 mb-4 text-danger"> Create Repository </h3>
                <form method="post" action="#" class="w-100 text-center">
                    <div class="form-group row">
                        <label for="repoName" class="col-sm-5 col-form-label">Repo Name</label>
                        <div class="col-sm-7">
                            <input type="text" class="form-control" id="repoName" placeholder="Enter your repo name" value="${repoName}" data-name="name">
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="repoDesc" class="col-sm-5 col-form-label">Repo Description</label>
                        <div class="col-sm-7">
                            <input type="text" class="form-control" id="repoDesc" placeholder="Description" data-name="description">
                        </div>
                    </div>
                    <div>
                        <button type="button" class="btn btn-primary" id="createRepo">Create Repo</button>
                        <button type="button" class="btn btn-danger cancelWidget" id="canceRepolWidget">Cancel</button>
                    </div>
                </form>
            </div>`
    );
}
function createGitRepository(passData) {
    const url = gitBaseUrl + 'user/repos';
    commonPostAjaxFunc(url, 'POST', passData, completeRepoCreation);
}
function completeRepoCreation(repoData) {
    createModelPopup({ modalId: 'completeIssueCreation', modalHeading: 'Confirmation', ClassName: 'bg-success', modalContent: "You have successfully created repository in the gitHub <span class='text-success'> For More Info Please Visit: www.github.com</span>", buttonName: 'Close' })
    renderUserRepos('userRepoSection', repoData);
}
export { createRepoWidgets, createGitRepository };
