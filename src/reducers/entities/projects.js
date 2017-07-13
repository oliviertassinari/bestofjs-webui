import log from '../../helpers/log'
import processProject from './processProject'

export default function (state = {}, action) {
  switch (action.type) {
    case 'FETCH_PROJECTS_SUCCESS':
      return setProjects(state, action.payload)
    case 'GET_README_SUCCESS':
      const project = Object.assign({}, state[action.id], {
        readme: action.html
      })
      return Object.assign({}, state, {
        [action.id]: project
      })
    case 'CREATE_REVIEW_SUCCESS':
    case 'UPDATE_REVIEW_SUCCESS':
      return addReviewIdsToProjects(state, [action.payload])
    case 'CREATE_LINK_SUCCESS':
    case 'UPDATE_LINK_SUCCESS':
      return addLinkIdsToProjects(state, [action.payload])
    default:
      return state
  }
}

function setProjects (entities, payload) {
  const projectsBySlug = payload.projects
    .map(processProject)
    .reduce((acc, project) => {
      return {...acc, [project.slug]: project}
    }, {})
  return projectsBySlug
}

// A "link" object can be associated to N projects
// This function loops through projects and update the ".links" property
function addLinkIdsToProjects (projects0, links) {
  let projects1 = Object.assign({}, projects0)
  links.forEach(link => {
    const id = link._id
    const projectIds = link.projects // get the array of project ids
    projectIds.forEach(projectId => {
      const project = projects1[projectId]
      if (project) {
        const links0 = project.links
        const links1 = links0 ? (
          addUniqueLink(links0, id)
        ) : [id] // update the link id array or create it if it does not exist
        project.links = links1
        projects1 = Object.assign({}, projects1, { projectId: project })
      } else {
        log('No project with the id', projectId)
      }
    })
  })
  return projects1
}

function addReviewIdsToProjects (projects0, reviews) {
  let projects1 = Object.assign({}, projects0)
  reviews.forEach(review => {
    const id = review._id
    const projectId = review.project
    const project = projects1[projectId]
    if (project) {
      const reviews0 = project.reviews
      const reviews1 = reviews0 ? addUniqueLink(reviews0, id) : [id] // update the link id array or create it
      project.reviews = reviews1
      projects1 = Object.assign({}, projects1, { projectId: project })
    } else {
      log('No project with the id', projectId)
    }
  })
  return projects1
}

function addUniqueLink (ids, id) {
  return ids.indexOf(id) > -1 ? ids : [id, ...ids]
}
