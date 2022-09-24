import * as ActionTypes from './ActionTypes';

export const story = (state = { isLoading: true, errMess: null, story: [] }, action) => {
  switch (action.type) {
    case ActionTypes.ADD_STORY:
      return { ...state, isLoading: false, errMess: null, story: action.payload };
    case ActionTypes.STORY_LOADING:
      return { ...state, isLoading: true, errMess: null, story: [] }
    case ActionTypes.STORY_FAILED:
      return { ...state, isLoading: false, errMess: action.payload };
    default:
      return state;
  }
};