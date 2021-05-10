import auth from '@react-native-firebase/auth';
import * as action from './index';
import firestore from '@react-native-firebase/firestore';

interface userPass {
  email: string;
  password: string;
}

const signIn = ({email, password}: userPass) => {
  return (dispatch: any) => {
    return auth()
      .signInWithEmailAndPassword(email, password)
      .then((data) => {
        dispatch({type: 'LOGINAUTH', payload: data.user.providerData[0]});
        return data.user.providerData[0];
      })
      .catch((error) => {
        if (
          error.code === 'auth/invalid-email' ||
          error.code === 'auth/wrong-password' ||
          error.code === 'auth/user-not-found'
        ) {
          return {status: 'error', message: 'Invalid email or password'};
        } else if (error.code === 'auth/network-request-failed') {
          return {
            status: 'error',
            message: 'no internet, please check your connection',
          };
        } else {
          return {status: 'error', message: error.code};
        }
      });
  };
};

const signUp = ({email, password}: userPass) => {
  return (dispatch: any) => {
    return auth()
      .createUserWithEmailAndPassword(email.trim(), password.trim())
      .then((data) => {
        dispatch({
          type: 'LOGINAUTH',
          payload: data.user.providerData[0],
        });
        return {status: 'success', data};
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          return {
            status: 'error',
            message: 'That email address is already in use!',
          };
        } else if (error.code === 'auth/invalid-email') {
          return {status: 'error', message: 'That email address is invalid!'};
        } else if (error.code === 'auth/network-request-failed') {
          return {
            status: 'error',
            message: 'Network error, please check your connection',
          };
        } else {
          return {status: 'error', message: error.code};
        }
      });
  };
};

// const signOut = {
//   type: 'LOGOUTAUTH',
// };

const signOut = () => {
  return (dispatch: any) => {
    dispatch({type: action.LOGOUTAUTH});
    dispatch({type: action.CLEAR_CART});
    dispatch({type: action.CLEAR_FAVORITE});
  };
};

export {signUp, signOut, signIn};
