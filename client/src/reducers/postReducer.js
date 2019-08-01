import {
  GET_POSTS, ADD_POST, GET_POST_INFO, POSTS_LOADING, GET_COMMENTS, ADD_COMMENT
} from '../actions/types';

const initialState = {
  posts: [],
  movie: {},
  comments: [],
  loading: false
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false
      };
    case ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts]
      };
    case GET_POST_INFO:
      return {
        ...state,
        movie: action.payload
      };
    case POSTS_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_COMMENTS:
      return {
        ...state,
        comments: action.payload
      }
    case ADD_COMMENT:
      return {
        ...state,
        comments: action.payload
      };
    default:
      return state;
  }
}
