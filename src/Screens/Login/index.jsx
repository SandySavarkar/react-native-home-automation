import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import styles from './style';
import Color from '../../utils/Color';
import { useNavigation } from '@react-navigation/native';
import APIs from '../../api/APIs';
import { saveAuthData } from '../../redux/reducers/authSlice';
import { useDispatch } from 'react-redux';
export const Login = () => {
  const [user, setUser] = useState({email: '', password: ''});
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigation = useNavigation();
  const dispatch = useDispatch()
  const handleSubmit = () => {
    // var isValid;
    // let {email, password} = user;
    // if (!email) {
    //   isValid = false;
    //   setEmailError('Please enter email');
    // } else if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
    //   isValid = true;
    //   setEmailError('');
    // } else {
    //   isValid = false;
    //   setEmailError('Please enter valid email');
    // }
    // if (!password) {
    //   isValid = false;
    //   setPasswordError('Please enter password');
    // } else {
    //   isValid = true;
    //   setPasswordError('');
    // }
    // if (isValid) {
    if(user.email && user.password){
      let param = {
        email:user.email,
        password:user.password
      }
      APIs.login(param).then(res=>{
        console.log('login res', res)
        dispatch(saveAuthData(res?.data))
        navigation.navigate('AuthRoute')
      }).catch(error=>console.log('login error', error))
        
    }else{

      setPasswordError('Please enter valid data')
    }
  };
  return (
    <SafeAreaView style={styles.body}>
      <Text style={styles.header}>Smart Home</Text>
      <View style={styles.loginBox}>
        <Text style={styles.header}>Login</Text>
        {/* <Formik initialValues={{email:'',password:''}} onSubmit={(values=>console.log('values', values))}>
        {({handleChange, handleBlur, handleSubmit, values})=>(
        <> */}
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Enter email"
            style={styles.input}
            keyboardType={'email-address'}
            onChangeText={text => setUser({...user, email: text})}
            //  onBlur={handleBlur('email')}
            value={user.email}
          />
          {emailError ? (
            <Text style={{color: Color.ERROR}}>{emailError}</Text>
          ) : null}
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Enter password"
            style={styles.input}
            secureTextEntry
            onChangeText={text => setUser({...user, password: text})}
            //  onBlur={handleBlur('password')}
            value={user.password}
          />
          {passwordError ? (
            <Text style={{color: Color.ERROR}}>{passwordError}</Text>
          ) : null}
        </View>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        {/* </>
        )}
       </Formik> */}
      </View>
    </SafeAreaView>
  );
};