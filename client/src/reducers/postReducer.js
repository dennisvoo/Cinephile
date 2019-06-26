import {
  GET_POSTS, ADD_POST, GET_POST_INFO, POSTS_LOADING
} from '../actions/types';

const initialState = {
  posts: [],
  loading: false,
  movie: {}
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
        movie: action.payload
      };
    case POSTS_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
