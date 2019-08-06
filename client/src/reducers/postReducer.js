import {
  GET_POSTS, ADD_POST, DELETE_POST, GET_POST_INFO,
  POSTS_LOADING, GET_COMMENTS, ADD_COMMENT, DELETE_COMMENT
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
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== action.payload)
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
    case DELETE_COMMENT:
      return {
        ...state,
        comments: state.comments.filter(comment => comment._id !== action.payload)
      };
    default:
      return state;
  }
}
