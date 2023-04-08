import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from "axios";

// Create post
export const createPost = createAsyncThunk(
  'posts/createPost',
  async (postData) => {
    const response = await axios.post('https://dev.codeleap.co.uk/careers/', postData);
    console.log('Data created:', response.data);
    return response.data;
  }
);

// Delete post
export const deletePost = createAsyncThunk(
  'posts/deletePost',
  async (postId) => {
    const response = await axios.delete(`https://dev.codeleap.co.uk/careers/${postId}/`);
    console.log('Data deleted:', response.data);
    return response.data;
  }
);

// Update post
export const updatePost = createAsyncThunk(
  'posts/updatePost',
  async ({postId, postData}) => {
    const response = await axios.patch(`https://dev.codeleap.co.uk/careers/${postId}/`, postData);
    console.log('Data updated:', response.data);
    return response.data;
  }
);

// Create Post
const createPostSlice = createSlice({
  name: 'createPost',
  initialState: {
    post: null,
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Create post
      .addCase(createPost.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.post = action.payload;
      })
      .addCase(createPost.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Delete Post
      .addCase(deletePost.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.post = null;
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Update Post
      .addCase(updatePost.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.post = action.payload;
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default createPostSlice.reducer;
