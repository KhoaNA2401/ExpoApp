import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';
// story
export const fetchStory = () => (dispatch) => {
    dispatch(storyLoading());
    return fetch(baseUrl + 'story')
      .then((response) => {
        if (!response.ok) throw Error('Error ' + response.status + ': ' + response.statusText);
        else return response.json();
      })
      .then((story) => dispatch(addStory(story)))
      .catch((error) => dispatch(storyFailed(error.message)));
  };
  const storyLoading = () => ({
    type: ActionTypes.STORY_LOADING
  });
  const storyFailed = (errmess) => ({
    type: ActionTypes.STORY_FAILED,
    payload: errmess
  });
  const addStory = (story) => ({
    type: ActionTypes.ADD_STORY,
    payload: story
  });
  
  // comments
  export const fetchComments = () => (dispatch) => {
    return fetch(baseUrl + 'comments')
      .then((response) => {
        if (!response.ok) throw Error('Error ' + response.status + ': ' + response.statusText);
        else return response.json();
      })
      .then((comments) => dispatch(addComments(comments)))
      .catch((error) => dispatch(commentsFailed(error.message)));
  };
  const commentsFailed = (errmess) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errmess
  });
  const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
  });
  // favorites
export const postFavorite = (storyId) => (dispatch) => {
  dispatch(addFavorite(storyId));
};
const addFavorite = (storyId) => ({
  type: ActionTypes.ADD_FAVORITE,
  payload: storyId
});
export const deleteFavorite = (storyId) => ({
  type: ActionTypes.DELETE_FAVORITE,
  payload: storyId
});