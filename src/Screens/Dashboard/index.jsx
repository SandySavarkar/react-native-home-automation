import {useNavigation} from '@react-navigation/native';
import React from 'react';
import { SafeAreaView, ScrollView, Text} from 'react-native';
import ConsumptionCard from '../../Components/ConsumptionCard';
import styles from './style';
const Dashboard = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.body}>
      <ScrollView style={styles.container}>
        {/* Header view */}
        <Text style={styles.headerText}>Hello, Nikola Techies ☀️</Text>
        <ConsumptionCard/>
      </ScrollView>
    </SafeAreaView>
  )
};
export default Dashboard;

