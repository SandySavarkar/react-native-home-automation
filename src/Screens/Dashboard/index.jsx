import {useNavigation} from '@react-navigation/native';
import React from 'react';
import { FlatList, SafeAreaView, ScrollView, Text, View} from 'react-native';
import ConsumptionCard from '../../Components/ConsumptionCard';
import RoomCard from '../../Components/RoomCard';
import Color from '../../Utils/Color';
import styles from './style';
const Dashboard = () => {
  const navigation = useNavigation();
  const renderItem = ({item}) =>{
    return (
      <RoomCard onPress={()=>navigation.navigate('RoomDetails')}/>
    )
  }
  return (
    <SafeAreaView style={styles.body}>
      <ScrollView style={styles.container}>
        {/* Header view */}
        <Text style={styles.headerText}>Hello, Nikola Techies ☀️</Text>
        <ConsumptionCard/>
        <Text style={[styles.headerText,{color:Color.EERIE_BLACK,alignSelf:'center'}]}>Rooms</Text>
        {/* Rooms */}
        <FlatList
          data={[1,2]}
          keyExtractor={(item)=>item}
          renderItem={renderItem}
          numColumns={2}
          style={{alignSelf:'center'}}
        />
      </ScrollView>
    </SafeAreaView>
  )
};
export default Dashboard;

