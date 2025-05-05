import {View, Text, Image} from 'react-native';
import {st} from '../screens/LoginWithEmailScreen';

export const ValidationError = ({message}) =>
  message ? (
    <View style={st.errorContainer}>
      <Image
        source={require('../assets/icons/ic_warningValidate.png')}
        resizeMode="contain"
        style={{width: 16, height: 16}}
      />
      <Text style={st.errorLabel} numberOfLines={0}>
        {message}
      </Text>
    </View>
  ) : null;
