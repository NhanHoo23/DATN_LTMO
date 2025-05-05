import * as React from 'react';
import {useState, useRef} from 'react';
import {View, Text, TouchableOpacity, Image, Linking} from 'react-native';
import BenefitsInfoBox from '../../components/BenefitsInfoBox';
import OutlinedButton from '../../components/OutlinedButton';
import ScreenSize from '../../constants/ScreenSize';
import {Modal} from 'react-native-paper';
import FilledButton from '../../components/FilledButton';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {useDispatch} from 'react-redux';
import AppManager from '../../utils/AppManager';
import {onGoogleButtonPress} from './signInWithGoogle';
import {loginWithGoogle} from '../../redux/actions/userActions';
import st from './style';
import ButtonSheetTroubleSigningIn from './components/ButtonSheetTroubleSigningIn';

const LoginScreen = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const dispatch = useDispatch();

  const bottomSheetRef = useRef();

  const openBottomSheet = () => {
    bottomSheetRef.current?.snapToIndex(0);
  };

  const handleLoginWithGoogle = async () => {
    try {
      const data = await onGoogleButtonPress();
      if (!data || !data.user) {
        console.log('Google login failed: No user data');
        return;
      }

      dispatch(loginWithGoogle(data.user._user)).then(result => {
        console.log(result);
        if (result?.meta.requestStatus === 'fulfilled') {
          AppManager.shared
            .saveUserInfo(result.payload.token)
            .then(() => AppManager.shared.getToken())
            .then(token => {
              console.log('token: ', token);
              navigation.replace('Main');
            })
            .catch(err => {
              console.log('Error in token processing: ', err);
            });
        } else {
          console.log('Google login failed:', result);
        }
      });
    } catch (error) {
      // console.error('Error in Google login:', error);
      console.log('Google login failed:', error);
    }
  };

  return (
    <GestureHandlerRootView
      style={{
        flex: 1,
        backgroundColor: isOpen ? '#fff' : 'rgba(128, 128, 128, 0.7)',
      }}>
      <View style={st.container}>
        <View style={st.header}>
          <TouchableOpacity
            style={st.iconContainer}
            onPress={() => setModalVisible(true)}>
            <Image
              source={require('../../assets/bt_exit.png')}
              style={st.closeIcon}
            />
          </TouchableOpacity>

          <Image
            source={require('../../assets/img_logo.png')}
            style={st.logo}
          />
        </View>

        <View style={st.infoContainer}>
          <BenefitsInfoBox
            icon={require('../../assets/icons/ic_freeShipping.png')}
            title="Miễn phí vận chuyển"
            subtitle="Trên tất cả các đơn hàng"
            dimmed={!isOpen}
          />
          <BenefitsInfoBox
            icon={require('../../assets/icons/ic_freeReturns.png')}
            title="Trả lại miễn phí"
            subtitle="Lên đến 90 ngày"
            dimmed={!isOpen}
          />
        </View>

        <OutlinedButton
          onPress={handleLoginWithGoogle}
          icon={require('../../assets/bt_google.png')}
          title="Tiếp tục với Google"
          customStyle={{width: ScreenSize.width - 40, marginTop: 60}}
        />
        <OutlinedButton
          icon={require('../../assets/bt_email.png')}
          title="Tiếp tục với Email"
          customStyle={{width: ScreenSize.width - 40, marginTop: 10}}
          onPress={() => {
            navigation.navigate('LoginWithEmail');
          }}
        />

        <TouchableOpacity
          style={st.troubleContainer}
          onPress={() => openBottomSheet()}>
          <Text style={st.troubleText}>Gặp sự cố khi đăng nhập?</Text>
        </TouchableOpacity>

        <View style={st.termsWrapper}>
          <Text style={st.termsText}>
            Bằng cách tiếp tục, bạn đồng ý với{' '}
            <Text
              style={st.linkText}
              onPress={() => {
                Linking.openURL(
                  'https://www.freeprivacypolicy.com/live/a1f3fc15-3468-4c50-897d-7d126f8de39e',
                );
              }}>
              Điều khoản sử dụng
            </Text>{' '}
            và{' '}
            <Text
              style={st.linkText}
              onPress={() => {
                Linking.openURL(
                  'https://www.freeprivacypolicy.com/live/9e7e7430-63f1-4258-beae-999dd85300cc',
                );
              }}>
              Chính sách bảo mật
            </Text>{' '}
            của chúng tôi.
          </Text>
        </View>

        <Modal visible={modalVisible} transparent animationType="fade">
          <View style={st.overlay}>
            <View style={st.modalContainer}>
              <Text style={st.title}>
                Tận hưởng những ưu đãi đặc biệt này sau khi đăng nhập! Bạn có
                chắc chắn muốn rời đi ngay bây giờ không?
              </Text>

              <View style={st.benefitsContainer}>
                <BenefitsInfoBox
                  icon={require('../../assets/icons/ic_freeShipping.png')}
                  title="Miễn phí vận chuyển"
                  subtitle="Trên tất cả các đơn hàng"
                />
                <View style={{width: 10}} />
                <BenefitsInfoBox
                  icon={require('../../assets/icons/ic_freeReturns.png')}
                  title="Trả lại miễn phí"
                  subtitle="Lên đến 90 ngày"
                />
              </View>

              <FilledButton
                title="Tiếp tục đăng nhập"
                customStyle={{
                  backgroundColor: 'black',
                  width: '100%',
                  marginVertical: 10,
                }}
                onPress={() => {
                  setModalVisible(false);
                }}
              />
              <OutlinedButton
                title="Rời đi ngay bây giờ"
                customStyle={{width: '100%'}}
                onPress={() => {
                  navigation.goBack();
                }}
              />
            </View>
          </View>
        </Modal>
        <ButtonSheetTroubleSigningIn
          ref={bottomSheetRef}
          setIsOpen={setIsOpen}
        />
      </View>
    </GestureHandlerRootView>
  );
};

export default LoginScreen;
