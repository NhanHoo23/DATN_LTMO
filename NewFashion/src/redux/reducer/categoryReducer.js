import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCategories } from "../actions/categoryActions";


const initialState = {
    categories: [],
};

// Tạo slice cho categories
const categorySlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.categories = action.payload;                
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                console.log('Fetch categories failed: ', action.payload); 
            });
    }
});

export default categorySlice.reducer;
