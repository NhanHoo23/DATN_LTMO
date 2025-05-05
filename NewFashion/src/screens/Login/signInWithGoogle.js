import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

async function onGoogleButtonPress() {
  // Check if your device supports Google Play
  await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
  // Get the users ID token
  const signInResult = await GoogleSignin.signIn();

  // Try the new style of google-sign in result, from v13+ of that module
  let idToken = signInResult.data?.idToken;
  if (!idToken) {
    // if you are using older versions of google-signin, try old style result
    idToken = signInResult.idToken;
  }
  if (!idToken) {
    throw new Error('No ID token found');
  }

  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(
    signInResult.data.idToken,
  );

  // Sign-in the user with the credential
  return auth().signInWithCredential(googleCredential);
}

async function onGoogleSignOut() {
  try {
    // Kiểm tra xem có phiên Google active không
    const hasGoogleSession = GoogleSignin.hasPreviousSignIn();
    if (hasGoogleSession) {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
    }

    // Luôn sign out Firebase
    await auth().signOut();

    console.log('User signed out successfully');
  } catch (error) {
    // Nếu lỗi SIGN_IN_REQUIRED (không có phiên Google), ta có thể bỏ qua
    if (error.code === SIGN_IN_REQUIRED_CODE) {
      console.warn('No Google session to sign out');
    } else {
      // console.error('Sign-out Error:', error);
      console.log('Sign-out Error:', error);
      throw error;
    }
  }
}

export {onGoogleButtonPress, onGoogleSignOut};
