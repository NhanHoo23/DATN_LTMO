import {View, Text, TouchableOpacity, Image, TextInput} from 'react-native';
import React, {
  forwardRef,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import OutlinedButton from '../../../components/OutlinedButton';
import TextField, {TextFieldType} from '../../../components/TextField';
import FilledButton from '../../../components/FilledButton';
import ScreenSize from '../../../constants/ScreenSize';
import PasswordStrengthBar from '../../../components/PasswordStrengthBar';
import st from '../style';

const ButtonSheetTroubleSigningIn = (props, ref) => {
  const [currentSheet, setCurrentSheet] = useState('sheet1');
  const [password, setPassword] = useState('');
  const [strengLabel, setStrengLabel] = useState('');
  const [values, setValues] = useState(Array(6).fill(''));

  const bottomSheetRef = useRef();
  const snapPoints = useMemo(() => ['25%', '85%'], []);

  useImperativeHandle(ref, () => ({
    snapToIndex(index) {
      bottomSheetRef.current?.snapToIndex(index);
      props.setIsOpen(false);
    },
  }));

  const goToHalf = () => {
    bottomSheetRef.current?.snapToIndex(1);
  };

  // Đóng BottomSheet
  const closeBottomSheet = () => {
    bottomSheetRef.current?.close();
    props.setIsOpen(true);
  };

  const handleChange = (index, text) => {
    const newValues = [...values];
    newValues[index] = text;
    setValues(newValues);
  };

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      handleIndicatorStyle={{backgroundColor: 'transparent', height: 0}}
      onClose={() => {
        props.setIsOpen(true);
        setCurrentSheet('sheet1');
      }}>
      <BottomSheetView
        style={{flex: 1, alignItems: 'center', backgroundColor: '#fff'}}>
        {currentSheet === 'sheet1' && (
          <>
            <View style={st.modalHeader}>
              <Text style={st.troubleTitle}>Gặp sự cố khi đăng nhập?</Text>
              <TouchableOpacity onPress={() => closeBottomSheet()}>
                <Image
                  source={require('../../../assets/bt_exit.png')}
                  style={st.closeIcon1}
                />
              </TouchableOpacity>
            </View>
            <View style={st.separator} />
            <View style={{marginHorizontal: 8}}>
              <Text style={st.troubleSubtitle}>
                Nếu bạn đã đăng ký tài khoản bằng địa chỉ email nhưng quên mật
                khẩu, bạn có thể đặt lại mật khẩu.
              </Text>
            </View>
            <OutlinedButton
              title="Đặt lại mật khẩu"
              customStyle={{width: ScreenSize.width - 40, marginTop: 10}}
              onPress={() => {
                setCurrentSheet('sheet2');
                goToHalf();
              }}
            />
          </>
        )}
        {currentSheet === 'sheet2' && (
          <>
            <View style={st.modalHeader}>
              <Text style={st.troubleTitle}>Gặp sự cố khi đăng nhập?</Text>
              <TouchableOpacity onPress={() => closeBottomSheet()}>
                <Image
                  source={require('../../../assets/bt_exit.png')}
                  style={st.closeIcon1}
                />
              </TouchableOpacity>
            </View>
            <View style={st.separator} />
            <Text style={st.troubleSubtitle}>
              Nhập địa chỉ email của bạn bên dưới và chúng tôi sẽ gửi cho bạn mã
              đặt lại mật khẩu gồm 6 chữ số.
            </Text>
            <TextField
              placeholder="Nhập địa chỉ email"
              customStyle={{width: ScreenSize.width - 40, marginTop: 4}}
            />
            <FilledButton
              title="Gửi"
              customStyle={{
                backgroundColor: 'black',
                width: ScreenSize.width - 40,
                marginTop: 20,
              }}
              onPress={() => setCurrentSheet('sheet3')}
            />
          </>
        )}
        {currentSheet === 'sheet3' && (
          <>
            <View style={st.modalHeader}>
              <TouchableOpacity onPress={() => setCurrentSheet('sheet2')}>
                <Image
                  source={require('../../../assets/ic_back.png')}
                  style={st.closeIcon1}
                />
              </TouchableOpacity>
              <Text style={st.troubleTitle}>Nhập mã đặt lại mật khẩu</Text>
              <TouchableOpacity onPress={() => closeBottomSheet()}>
                <Image
                  source={require('../../../assets/bt_exit.png')}
                  style={st.closeIcon1}
                />
              </TouchableOpacity>
            </View>
            <View style={st.separator} />
            <Text style={[st.troubleSubtitle, {paddingHorizontal: 10}]}>
              Vui lòng kiểm tra hộp thư của bạn ngay bây giờ! Nhập mã đặt lại
              mật khẩu gồm 6 chữ số được gửi đến email của bạn. Mã sẽ hết hạn
              sau 2 giờ.
            </Text>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                padding: 10,
              }}>
              {values.map((value, index) => (
                <TextInput
                  key={index}
                  value={value}
                  onChangeText={text => handleChange(index, text)}
                  maxLength={1}
                  style={st.input}
                />
              ))}
            </View>
            <View>
              <Text style={{alignSelf: 'center'}}>60 giây Gửi lại mã</Text>
              <FilledButton
                title="Gửi"
                customStyle={{
                  backgroundColor: 'black',
                  width: ScreenSize.width - 40,
                  marginTop: 20,
                }}
                onPress={() => setCurrentSheet('sheet4')}
              />
            </View>
            <View style={{marginTop: 60, alignSelf: 'flex-start', padding: 10}}>
              <Text style={{fontSize: 16, fontWeight: 'bold', marginBottom: 8}}>
                Không nhận được email?
              </Text>
              <Text style={st.text}>
                1. Đảm bảo địa chỉ email của bạn là chính xác.
              </Text>
              <Text style={st.text}>2. Vui lòng kiểm tra thư mục thư rác.</Text>
              <Text style={st.text}>
                3. Nếu bạn vẫn không thấy mã,{' '}
                <TouchableOpacity onPress={() => setCurrentSheet('sheet6')}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: 'bold',
                      color: '#000',
                    }}>
                    hãy thử một cách khác để xác minh danh tính của bạn &gt;
                  </Text>
                </TouchableOpacity>
              </Text>
            </View>
          </>
        )}
        {currentSheet === 'sheet4' && (
          <>
            <View style={st.modalHeader}>
              <TouchableOpacity onPress={() => setCurrentSheet('sheet3')}>
                <Image
                  source={require('../../../assets/ic_back.png')}
                  style={st.closeIcon1}
                />
              </TouchableOpacity>
              <Text style={st.troubleTitle}>Tạo mật khẩu mới</Text>
              <TouchableOpacity onPress={() => closeBottomSheet()}>
                <Image
                  source={require('../../../assets/bt_exit.png')}
                  style={st.closeIcon1}
                />
              </TouchableOpacity>
            </View>
            <View style={st.separator} />
            <View style={{padding: 10}}>
              <Text style={st.troubleSubtitle}>
                Nhập mật khẩu mới mà bạn muốn liên kết với tài khoản của bạn bên
                dưới.
              </Text>
              <TextField
                type={TextFieldType.PASSWORD}
                placeholder="Enter your password"
                customStyle={{width: ScreenSize.width - 40, marginTop: 4}}
                onChangeText={setPassword}
              />
              <PasswordStrengthBar
                password={password}
                customStyle={{width: ScreenSize.width - 40, marginTop: 10}}
                onChangeText={setStrengLabel}
              />
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 14,
                  marginTop: 8,
                  alignSelf: 'flex-start',
                  marginVertical: 5,
                }}>
                Chất lượng mật khẩu: {strengLabel}
              </Text>
              <Text style={st.passwordQuality}>
                Đừng sử dụng mật khẩu của một trang web khác hoặc thứ gì đó quá
                dễ đoán như tên thú cưng của bạn.
              </Text>
              <FilledButton
                title="Gửi"
                customStyle={{
                  backgroundColor: 'black',
                  width: ScreenSize.width - 40,
                  marginTop: 20,
                }}
                onPress={() => setCurrentSheet('sheet5')}
              />
            </View>
          </>
        )}
        {currentSheet === 'sheet5' && (
          <>
            <View style={st.modalDone}>
              <Image
                source={require('../../../assets/ic_done.png')}
                style={st.doneIcon}
              />

              <Text style={st.doneTitle}>Mật khẩu của bạn đã được đặt lại</Text>
              <Text style={st.doneText}>
                Your email{' '}
                <Text style={st.doneEmail}>dominhhieuhn01@gmail.com</Text> có
                thể không nhận được email Thời trang mới của chúng tôi. Bạn luôn
                có thể chỉnh sửa email trên tài khoản Thời trang mới của mình
                thành một tài khoản khác.
              </Text>
              <FilledButton
                title="Continue Shopping"
                customStyle={{
                  backgroundColor: 'black',
                  width: ScreenSize.width - 40,
                  marginTop: 20,
                }}
              />
            </View>
          </>
        )}
        {/*  */}
        {currentSheet === 'sheet6' && (
          <>
            <View style={st.modalHeader}>
              <TouchableOpacity onPress={() => setCurrentSheet('sheet3')}>
                <Image
                  source={require('../../../assets/ic_back.png')}
                  style={st.closeIcon1}
                />
              </TouchableOpacity>
              <Text style={st.troubleTitle}>Xác minh danh tính của bạn</Text>
              <TouchableOpacity onPress={() => closeBottomSheet()}>
                <Image
                  source={require('../../../assets/bt_exit.png')}
                  style={st.closeIcon1}
                />
              </TouchableOpacity>
            </View>
            <View style={st.separator} />
            <View style={{margin: 6}}>
              <Text style={st.troubleSubtitle}>
                Để bảo mật tài khoản của bạn, chúng tôi cần đảm bảo rằng bạn
                thực sự là người đó, bạn có cách khác để xác minh danh tính của
                mình.
              </Text>
              <TouchableOpacity
                style={st.verifyContainer}
                onPress={() => setCurrentSheet('sheet7')}>
                <View style={st.verifyText}>
                  <Text style={st.verifyTitle}>
                    Sử dụng mã xác minh SMS để xác minh danh tính
                  </Text>
                  <Text style={st.verifySubtitle}>
                    Chúng tôi sẽ gửi mã xác minh SMS tới +84 975****96
                  </Text>
                </View>
                {/* Icon mũi tên bên phải */}
                <Image
                  source={require('../../../assets/ic_arrowRight.png')}
                  style={st.closeIcon}
                />
              </TouchableOpacity>
            </View>
          </>
        )}
        {/*  */}
        {currentSheet === 'sheet7' && (
          <>
            <View style={st.modalHeader}>
              <TouchableOpacity onPress={() => setCurrentSheet('sheet6')}>
                <Image
                  source={require('../../../assets/ic_back.png')}
                  style={st.closeIcon1}
                />
              </TouchableOpacity>
              <Text style={st.troubleTitle}>Nhập mã xác minh</Text>
              <TouchableOpacity onPress={() => closeBottomSheet()}>
                <Image
                  source={require('../../../assets/bt_exit.png')}
                  style={st.closeIcon1}
                />
              </TouchableOpacity>
            </View>
            <View style={st.separator} />
            <Text style={[st.troubleSubtitle, {paddingHorizontal: 10}]}>
              Để tiếp tục, hãy hoàn tất bước xác minh này. Chúng tôi đã gửi mã
              xác minh đến số điện thoại +84 0975 953 696. Vui lòng nhập mã bên
              dưới.
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                padding: 10,
              }}>
              {values.map((value, index) => (
                <TextInput
                  key={index}
                  value={value}
                  onChangeText={text => handleChange(index, text)}
                  maxLength={1}
                  style={st.input}
                />
              ))}
            </View>
            <View>
              <Text style={{alignSelf: 'center'}}>60 giây Gửi lại mã</Text>
            </View>
          </>
        )}
      </BottomSheetView>
    </BottomSheet>
  );
};

export default forwardRef(ButtonSheetTroubleSigningIn);
