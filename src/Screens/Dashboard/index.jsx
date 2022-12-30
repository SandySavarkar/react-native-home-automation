import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Pressable, SafeAreaView, ScrollView, Text, View } from 'react-native';
import styles from './style'
const Dashboard =()=> {
    const navigation = useNavigation()
    return (
        <SafeAreaView>
        <ScrollView>
            {/* Header view */}
            <View>
                <Text>Hello, Nikola Techies</Text>
            </View>
            <Pressable onPress={()=>navigation.navigate('RoomDetails')}>
                        <Text>Go to Room details</Text>
                    </Pressable>
        </ScrollView>
    </SafeAreaView>
    )
};
export default Dashboard;

