import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addToCart, deleteCart, fetchCart, updateCart } from '../actions/cartActions';


const initialState = {
    carts: [],
};

// Tạo slice cho categories
const cartSlice = createSlice({
    name: 'carts',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.carts = action.payload;
            })
            .addCase(fetchCart.rejected, (state, action) => {
                // console.log('Fetch carts failed: ', action.payload);
            })

            // Add to cart
            .addCase(addToCart.fulfilled, (state, action) => {
                state.carts = action.payload;
                console.log(state.carts)
            })
            .addCase(addToCart.rejected, (state, action) => {
                // console.log('Add to cart failed: ', action.payload);
            })

            // Update cart
            .addCase(updateCart.fulfilled, (state, action) => {
                state.carts = action.payload;
            })
            .addCase(updateCart.rejected, (state, action) => {
                // console.log('Update cart failed: ', action.payload);
            })

            // Delete cart
            .addCase(deleteCart.fulfilled, (state, action) => {
                state.carts = action.payload;
            })
            .addCase(deleteCart.rejected, (state, action) => {
                // console.log('Delete cart failed: ', action.payload);
            })
    },
});

export default cartSlice.reducer;