import { StyleSheet, View, Animated, Alert } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { fetchCategories } from '../redux/actions/categoryActions';
import { useDispatch } from 'react-redux';
import AppManager from '../utils/AppManager';
import { fetchProducts, fetchSaleProducts } from '../redux/actions/productActions';
import { fetchInformation } from '../redux/actions/infomationActions';
import { fetchCoupon } from '../redux/actions/voucherAction';

const SplashScreen = ({ navigation }) => {
    const fadeAnimLogo = useRef(new Animated.Value(1)).current;
    const fadeAnimBanner = useRef(new Animated.Value(0)).current;
    const dispatch = useDispatch();

    useEffect(() => {
        const loadDataAndAnimate = async () => {
            try {
                const isSuccess = await loadData();
                if (isSuccess) {
                    animate();
                }else{
                    Alert.alert(
                        'Lỗi',
                        'Không tải được dữ liệu. Vui lòng thử lại',
                        [
                            { text: 'Thử lại', onPress: loadDataAndAnimate },
                        ]
                    );
                }
            } catch (error) {
                Alert.alert(
                    'Lỗi',
                    'Không tải được dữ liệu. Vui lòng thử lại',
                    [
                        { text: 'Thử lại', onPress: loadDataAndAnimate },
                    ]
                );
            }
        };
    
        loadDataAndAnimate();
    }, [fadeAnimLogo, fadeAnimBanner, navigation]);
    
    const loadData = async () => {
        try {
            console.log('Load data');
    
            // Gọi và unwrap fetchCategories
            const fetchResult = await dispatch(fetchCategories()).unwrap();
            if (!fetchResult) {
                throw new Error('Fetch categories failed');
            }
    
            // Gọi và unwrap fetchProducts
            const fetchProduct = await dispatch(fetchProducts(1)).unwrap();
            if (!fetchProduct) {
                throw new Error('Fetch products failed');
            }
    
            const fetchSaleProduct = await dispatch(fetchSaleProducts(1)).unwrap();
            if (!fetchSaleProduct) {
                throw new Error('Fetch sale products failed');
            }
    
            const fetchCoupons = await dispatch(fetchCoupon()).unwrap();
            if (!fetchCoupons) {
                throw new Error('Fetch coupon failed');
            }
    
            await AppManager.shared.loadUserInfo();
    
            const token = await AppManager.shared.getToken();
            console.log('Token:', token);
    
            if (token) {
                const fetchPersonalInfo = await dispatch(fetchInformation()).unwrap();
                console.log('Fetch personal info success:', fetchPersonalInfo);
            }
    
            return true; // Thành công
        } catch (error) {
            console.log('Load data error: ', error);
            return false; // Thất bại
        }
    };

    const animate = () => {
        Animated.sequence([
            Animated.timing(fadeAnimLogo, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.timing(fadeAnimBanner, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            })
        ]).start(() => {
            setTimeout(() => {
                navigation.replace('Main');
            }, 3000);
        });
    };

    return (
        <View style={st.container}>
            <Animated.Image
                source={require('../assets/img_logo.png')}
                style={[st.image, { opacity: fadeAnimLogo }]} />

            <Animated.Image
                source={require('../assets/img_banner1.png')}
                style={[st.banner, { opacity: fadeAnimBanner }]} />
        </View>
    );
};

export default SplashScreen;

const st = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 100,
        height: 100,
        position: 'absolute',
    },
    banner: {
        width: '100%',
        height: '100%',
    }
});