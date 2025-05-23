import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

async function onGoogleButtonPress() {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
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
    const googleCredential = auth.GoogleAuthProvider.credential(signInResult.data.idToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);


}

async function onGoogleSignOut() {
    try {
        await GoogleSignin.revokeAccess(); // Revoke Google access
        await GoogleSignin.signOut(); // Sign out from Google
        await auth().signOut(); // Sign out from Firebase
        console.log('User signed out successfully');
    } catch (error) {
        console.error('Sign-out Error:', error);
        throw error;
    }
}

export { onGoogleButtonPress, onGoogleSignOut };
