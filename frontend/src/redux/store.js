import { configureStore } from '@reduxjs/toolkit';
import memberReducer from '../Features/Members/memberSlice/memberSlice'; // Ensure this path is correct

const store = configureStore({
  reducer: {
    member: memberReducer,
  },
});

export default store; // Export as default
