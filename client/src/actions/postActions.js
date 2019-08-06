import axios from 'axios';
import {
  GET_POSTS, ADD_POST, DELETE_POST, GET_POST_INFO,
  POSTS_LOADING, GET_COMMENTS, ADD_COMMENT, DELETE_COMMENT
} from './types';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';

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
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const addPost = post => (dispatch, getState) => {
  axios
    .post('/api/posts', post, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: ADD_POST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const deletePost = id => (dispatch, getState) => {
  axios
    .delete(`/api/posts/${id}`, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: DELETE_POST,
        payload: id
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
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
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
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
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const addComment = (comment, id) => (dispatch, getState) => {
  axios
    .post(`/api/posts/${id}`, comment, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: ADD_COMMENT,
        payload: res.data.comments
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const deleteComment = (postid, commentid) => (dispatch, getState) => {
  axios
    .delete(`/api/posts/${postid}/${commentid}`, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: DELETE_COMMENT,
        payload: commentid
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
