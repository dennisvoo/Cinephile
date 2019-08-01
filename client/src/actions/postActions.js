import axios from 'axios';
import {
  GET_POSTS, ADD_POST, GET_POST_INFO, POSTS_LOADING, GET_COMMENTS, ADD_COMMENT
} from './types';

export const getPosts = () => dispatch => {
  dispatch(setPostsLoading());
  axios
    .get('/api/posts')
    .then(res =>
      dispatch({
        type: GET_POSTS,
        payload: res.data
      })
    )
};

export const addPost = post => dispatch => {
  axios
    .post('/api/posts', post)
    .then(res =>
      dispatch({
        type: ADD_POST,
        payload: res.data
      })
    )
};

export const getPostInfo = id => dispatch => {
  axios
    .get(`/api/posts/${id}`)
    .then(res =>
      dispatch({
        type: GET_POST_INFO,
        payload: res.data
      })
    )
};

export const setPostsLoading = () => {
  return {
    type: POSTS_LOADING
  };
};

export const getComments = id => dispatch => {
  axios
    .get(`/api/posts/${id}`)
    .then(res =>
      dispatch({
        type: GET_COMMENTS,
        payload: res.data.comments
      })
    )
};

export const addComment = (comment, id) => dispatch => {
  axios
    .post(`/api/posts/${id}`, comment)
    .then(res =>
      dispatch({
        type: ADD_COMMENT,
        payload: res.data.comments
      })
    )
};
