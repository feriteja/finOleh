import React, {useCallback, useState} from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import IconFeather from 'react-native-vector-icons/Feather';
import IconFAwesom from 'react-native-vector-icons/FontAwesome';
import {Gap} from '../../../components';
import Colors from '../../../assets/theme/light';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {signIn} from '../../../config/redux/actions/auth';

const signin: React.FC = () => {
  const [secure, setSecure] = useState(true);
  const [email, setEmail] = useState('');
  const [passWord, setPassWord] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<null | string>(null);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const onLogin = () => {
    setLoading(true);
    if (email && passWord) {
      dispatch(signIn({email: email.trim(), password: passWord.trim()})).then(
        (resp) => {
          if (resp.status === 'error') {
            setErrorMessage(resp.message);
            setLoading(false);
          } else {
            navigation.reset({index: 0, routes: [{name: 'main'}]});
            setLoading(false);
          }
        },
      );
    } else {
      setErrorMessage('Please fill the blank input');
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {loading && (
        <View style={styles.modal}>
          <ActivityIndicator size="large" color={Colors.secondary3} />
        </View>
      )}
      <View style={styles.backGround}>
        <Text>Login</Text>
      </View>
      <Gap height={25} />
      <View style={styles.content}>
        <View style={styles.contentCard}>
          {errorMessage && (
            <View style={{alignSelf: 'center'}}>
              <Text
                style={{
                  fontSize: 18,
                  textTransform: 'capitalize',
                  color: Colors.primary2,
                  textAlign: 'center',
                }}>
                {errorMessage}
              </Text>
            </View>
          )}
          <Gap height={10} />
          <View style={styles.textInputContainer}>
            <TextInput
              autoCapitalize="none"
              onChangeText={(a) => setEmail(a)}
              style={styles.textInput}
              placeholder="Username"
              textContentType="emailAddress"
            />
          </View>
          <Gap height={15} />
          <View style={styles.textInputContainer}>
            <TextInput
              autoCapitalize="none"
              onChangeText={(a) => setPassWord(a)}
              secureTextEntry={secure}
              style={styles.textInput}
              placeholder="Passwords"
            />
            <TouchableOpacity onPress={() => setSecure((a) => !a)}>
              <IconFeather name={secure ? 'eye-off' : 'eye'} size={20} />
            </TouchableOpacity>
          </View>
          <Gap height={10} />
          <Pressable
            onPress={() => navigation.navigate('forgot')}
            style={{alignSelf: 'flex-end'}}>
            <Text
              style={{
                color: Colors.secondary1,
                textDecorationLine: 'underline',
              }}>
              Forgot Password
            </Text>
          </Pressable>
          <Gap height={15} />
          <TouchableOpacity onPress={() => onLogin()} style={styles.button}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
        <Gap height={30} />
        <View style={[styles.contentCard, {borderWidth: 0}]}>
          <TouchableOpacity
            onPress={() => navigation.navigate('signUp')}
            style={[styles.button, {backgroundColor: Colors.success3}]}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={styles.dash} />
            <Text style={{fontSize: 17, paddingHorizontal: 10}}>OR</Text>
            <View style={styles.dash} />
          </View>
          <TouchableOpacity
            style={[
              styles.button,
              {
                backgroundColor: '#4285F4',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden',
              },
            ]}>
            <View
              style={{
                backgroundColor: 'white',
                alignItems: 'center',
                justifyContent: 'center',
                height: 60,
                width: 60,
                position: 'absolute',
                left: 0,
                borderWidth: 0.4,
                borderRadius: 7,
              }}>
              <IconFAwesom name="google" size={20} />
            </View>
            <Text style={[styles.buttonText, {color: '#fff'}]}>
              Login by Google
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default signin;

const styles = StyleSheet.create({
  button: {
    // alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.secondary1,
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderRadius: 7,
    borderWidth: 0.3,
    elevation: 1,
    height: 50,
  },
  buttonText: {fontSize: 18, fontWeight: 'bold'},
  container: {
    flex: 1,
    backgroundColor: '#fbfbfb',
  },
  dash: {height: 1, flex: 1, backgroundColor: Colors.gray, marginVertical: 20},
  backGround: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.1,
    elevation: 2,
  },
  content: {
    flex: 2,
  },
  contentCard: {
    marginHorizontal: 30,
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderWidth: 0.3,
    borderRadius: 7,
  },
  textInputContainer: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: Colors.gray6,
    borderRadius: 7,
    paddingVertical: 10,
    borderWidth: 0.4,
  },
  textInput: {
    alignSelf: 'stretch',
    flex: 1,
    padding: 0,
    margin: 0,
  },
  modal: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    zIndex: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(50,50,50,.7)',
    elevation: 2,
  },
});
