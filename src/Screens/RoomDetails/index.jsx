import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Pressable, SafeAreaView, ScrollView, Text, View } from 'react-native';
import style from './style.js'
const RoomDetails =()=> {
    const navigation = useNavigation()
    return (
        <SafeAreaView>
            <ScrollView>
                {/* Header view */}
                <View>
                    <Text>Room Details</Text>
                    <Pressable onPress={()=>navigation.goBack()}>
                        <Text>Go back</Text>
                    </Pressable>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
};
export default RoomDetails;

