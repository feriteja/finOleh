import React, {useState} from 'react';
import {
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import IconFeather from 'react-native-vector-icons/Feather';
import IconFAwesom from 'react-native-vector-icons/FontAwesome';
import {Gap} from '../../../components';
import Colors from '../../../assets/theme/light';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {signUp, signOut} from '../../../config/redux/actions/auth';

const signup: React.FC = () => {
  const [secure, setSecure] = useState(true);
  const [secureConf, setSecureConf] = useState(true);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [passWord, setPassWord] = useState<string>('');
  const [passWordConf, setPassWordConf] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<null | string>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const navigation = useNavigation();

  const dispatch = useDispatch();

  const onRegister = () => {
    setLoading(true);
    if (passWord === passWordConf && passWord !== '') {
      dispatch(signUp({email: email, password: passWord})).then((a) => {
        if (a.status === 'error') {
          setErrorMessage(a.message);
          setLoading(false);
        } else {
          {
            navigation.reset({index: 0, routes: [{name: 'main'}]}),
              setLoading(false);
          }
        }
      });
    } else if (email == '') {
      setErrorMessage('Please fill the blank input');
      setLoading(false);
    } else {
      setErrorMessage('Password not match');
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
        <Text>Register</Text>
      </View>
      <Gap height={25} />
      <View style={styles.content}>
        <View style={styles.contentCard}>
          {errorMessage && (
            <View style={{alignSelf: 'center'}}>
              <Text
                style={{
                  fontSize: 18,
                  color: Colors.primary2,
                  textAlign: 'center',
                }}>
                {errorMessage}
              </Text>
            </View>
          )}
          <Gap height={15} />
          <View style={styles.textInputContainer}>
            <TextInput
              textContentType="username"
              onChangeText={(e) => setName(e)}
              value={name}
              style={styles.textInput}
              placeholder="Your Name"
            />
          </View>
          <Gap height={15} />
          <View style={styles.textInputContainer}>
            <TextInput
              textContentType="emailAddress"
              autoCapitalize="none"
              onChangeText={(e) => setEmail(e)}
              value={email}
              style={styles.textInput}
              placeholder="email"
            />
          </View>
          <Gap height={15} />
          <View style={styles.textInputContainer}>
            <TextInput
              textContentType="password"
              secureTextEntry={secure}
              style={styles.textInput}
              value={passWord}
              onChangeText={(e) => setPassWord(e)}
              placeholder="Passwords"
            />
            <TouchableOpacity onPress={() => setSecure((a) => !a)}>
              <IconFeather name={secure ? 'eye-off' : 'eye'} size={20} />
            </TouchableOpacity>
          </View>
          <Gap height={15} />
          <View style={styles.textInputContainer}>
            <TextInput
              textContentType="password"
              value={passWordConf}
              onChangeText={(e) => setPassWordConf(e)}
              secureTextEntry={secureConf}
              style={styles.textInput}
              placeholder="Passwords"
            />
            <TouchableOpacity onPress={() => setSecureConf((a) => !a)}>
              <IconFeather name={secureConf ? 'eye-off' : 'eye'} size={20} />
            </TouchableOpacity>
          </View>
          <Gap height={10} />

          <Gap height={15} />
          <TouchableOpacity
            onPress={() => onRegister()}
            style={[styles.button, {backgroundColor: Colors.success2}]}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default signup;

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
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.1,
    elevation: 2,
  },
  content: {
    flexGrow: 2,
  },
  contentCard: {
    marginHorizontal: 30,
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderWidth: 0.3,
    borderRadius: 7,
  },
  modal: {
    position: 'absolute',
    backgroundColor: 'rgba(50,50,50,.7)',
    height: '100%',
    width: '100%',
    zIndex: 10,
    justifyContent: 'center',
    alignItems: 'center',
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
});
