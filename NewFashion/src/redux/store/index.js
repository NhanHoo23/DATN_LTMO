import { configureStore } from '@reduxjs/toolkit'
import userSlice from "../reducer/userReducer";
import categoryReducer from '../reducer/categoryReducer'
import subCategoryReducer from '../reducer/subCategoryReducer'
import productReducer from '../reducer/productReducer'
import cartReducer from '../reducer/cartReducer'
import personalInfoReducer from '../reducer/informationReducer'
import postReducer from "../reducer/postReducer";
import voucherReducer from '../reducer/voucherReducer'
import orderReducer from '../reducer/orderReducer'
import notificationReducer from "../reducer/notificationReducer";
import bannerReducer from "../reducer/bannerReducer";

export default configureStore({
    reducer: {
        user : userSlice,
        category: categoryReducer,
        subCategory: subCategoryReducer,
        product: productReducer,
        cart: cartReducer,
        personalInfo: personalInfoReducer,
        post: postReducer,
        coupons: voucherReducer,
        orders:orderReducer,
        notification: notificationReducer,
        banner : bannerReducer
    }
})
