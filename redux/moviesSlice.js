import {createSlice} from '@reduxjs/toolkit';

const moviesSlice = createSlice({
  name: 'movies',
  initialState: {
    shortlisted: [], // List of shortlisted movies
  },
  reducers: {
    addMovie: (state, action) => {
      // Add movie to shortlist if not already present
      const movieExists = state.shortlisted.find(
        movie => movie.imdbID === action.payload.imdbID,
      );
      if (!movieExists) {
        state.shortlisted.push(action.payload);
      }
    },
    removeMovie: (state, action) => {
      // Remove movie from shortlist
      state.shortlisted = state.shortlisted.filter(
        movie => movie.imdbID !== action.payload.imdbID,
      );
    },
  },
});

export const {addMovie, removeMovie} = moviesSlice.actions;
export default moviesSlice.reducer;
