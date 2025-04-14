import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../utils/axiosInstance";

// ✅ Async thunk to add a new member
export const addMember = createAsyncThunk(
  "member/addMember",
  async (memberData, { rejectWithValue }) => {
    try {
      const formData = new FormData();

      // Append user fields with "user." prefix
      Object.entries(memberData.user).forEach(([key, value]) => {
        formData.append(`user.${key}`, value); // e.g., user.email
      });

      // Append other non-file fields
      Object.keys(memberData).forEach((key) => {
        if (key !== "user" && key !== "files") {
          formData.append(key, memberData[key]);
        }
      });

      // Append files
      if (memberData.files) {
        Object.entries(memberData.files).forEach(([key, file]) => {
          if (file) formData.append(key, file);
        });
      }

      const response = await axiosInstance.post("/api/register/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to add member");
    }
  }
);


// 🔹 Initial state
const initialState = {
  members: [],
  loading: false,
  error: null,
};

const memberSlice = createSlice({
  name: "member",
  initialState,
  reducers: {
    resetMembers: (state) => {
      state.members = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addMember.pending, (state) => {
        state.loading = true;
      })
      .addCase(addMember.fulfilled, (state, action) => {
        state.loading = false;
        state.members.push(action.payload);
      })
      .addCase(addMember.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetMembers } = memberSlice.actions;
export default memberSlice.reducer;