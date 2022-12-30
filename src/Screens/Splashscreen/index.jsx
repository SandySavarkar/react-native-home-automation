import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import { useSelector } from 'react-redux';
import ThemeUtils from '../../utils/ThemeUtils';
export const Splashscreen = () => {
  const navigation = useNavigation();
  const {auth} =useSelector(state=>state.auth)
  useEffect(() => {
   setTimeout(() => {
    handleNavigation();
   }, 2000);
  }, []);
  const handleNavigation = () => {
    if (auth) {
      navigation.navigate('AuthRoute');
    } else {
      navigation.navigate('PublicRoute');
    }
  };
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/logo.png')} style={styles.image}/>
      <Text>Nikola Techies welcomes you</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image:{
    width:ThemeUtils.relativeWidth(80),
    height:ThemeUtils.relativeWidth(80)
  }
});