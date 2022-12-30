import React, {useEffect, useState} from 'react';
import {View, ScrollView, FlatList, SafeAreaView,StyleSheet,TouchableOpacity,Image,RefreshControl} from 'react-native';

import EnergyConsumptionCard from '../../components/EnergyConsumptionCard';
import RoomCard from '../../components/RoomCard';
import Label from '../../components/Label';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import APIs from '../../api/APIs';
import AlertBox from '../../components/AlertBox';
import { updateHistory, updatePinsHistoryData } from '../../redux/reducers/historySlice';
import { groupByKey } from '../../utils/helpers';
import moment from "moment";
import { UNIT_PRICE } from '../../utils/constants';
import { clear } from '../../redux/reducers/authSlice';
export const Dashboard = () => {
  const {history, pinsHistoryData} = useSelector(state => state.history);
  const {auth} = useSelector(state => state.auth);
  const [state, setState] = useState({});
  const dispatch = useDispatch();
  const navigation = useNavigation();


  const [refreshing, setRefreshing] = React.useState(false);
  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }
  const onRefresh = React.useCallback(() => {
    getDevices();
  }, []);

  const getDeviceHistory = (id) => {
    APIs.getHistory({
      device_id: id
  })
    .then(res => {
      setRefreshing(false)
      dispatch(updateHistory(res.data));
    })
    .catch(error => console.log('get history error', error));
  }

  const getDevices = () => {
    console.log('auth.id: ', auth.id);
    let param = {user_id: auth.id};
    
    APIs.getMyDevice(param)
      .then(res => {
        getDeviceHistory(res?.data[0]?.devices[0]?._id)  
        setState(res.data[0]);
      })
      .catch(error => console.log('getMyDevice error', error));
  }

  useEffect(() => {
    getDevices();
  },[]);

  useEffect(() => {
    getDevices();
  }, []);

  const getTotleAmoutOfPin = (pinHistory) => {
    let totle = 0;
    let totleUnit = 0;
    
    if(!pinHistory[pinHistory.length -1].switch_off_time){
      const current = moment();
     const diffrent = current.diff(moment(pinHistory[pinHistory.length -1].switch_on_time)._d,"seconds");
     const diffHours = diffrent / 3600;
     totle = diffHours;
     totleUnit = (pinHistory[0].defaultWattOfPin * diffHours )/ 1000
    }
    for (let i = 0; i < pinHistory.length; i++) {
      if (pinHistory[i].switch_off_time && pinHistory[i].switch_on_time) {
        let duration = Number(pinHistory[i].duration.replace('hr', ''));
        totle = totle + duration;
        totleUnit = pinHistory[i].consumptionWattPerHour / 1000
      }
    }
    console.log('totle: ', totle);
    return {
      totleDuration:totle,
      totleUnit,
      totleCost :totleUnit * UNIT_PRICE,
      history:pinHistory,
      pinId:pinHistory[0].pin_Id,
      watt:pinHistory[0].defaultWattOfPin
    }
  };

  const handleUpdateHistory = (history) => {
      console.log(groupByKey(history,"pin_Id"));
      const pinsArray = Object.values(groupByKey(history,"pin_Id"));
      let pinHistoryData = {};
      for(let i=0; i<pinsArray.length; i++){
        let pinHistory = pinsArray[i];
        pinHistoryData[pinHistory[0].pin_Id] = getTotleAmoutOfPin(pinHistory);
        
      }
      dispatch(updatePinsHistoryData(pinHistoryData));
  }

  useEffect(()=>{
    handleUpdateHistory(history);
  },[history]);

  const checkForLimit = (item) => {
    let totleUnit = pinsHistoryData[item.pinId]?.totleUnit;
    if(totleUnit){
      if(totleUnit > item.limit){
        return {
          totleUnit
        }
      }
     return false;
    }
    return false
  }
  const renderRoomCard = ({item}) => {
    return (
      <RoomCard
        data={item}
        onClick={() => navigation.navigate('RoomDetails', {details: item})}
      />
    );
  };
  const handleLogout = ()=>{
    dispatch(clear())
    navigation.navigate('PublicRoute')
  }
  return (
    <SafeAreaView>
      <View style={styles.header}>
        <Label mt={10} bolder>
          Hello, Sanjay Punani ☀️
        </Label>
        <TouchableOpacity onPress={handleLogout}>
          <Image
            source={require('../../assets/images/logout.png')}
            style={styles.image}
          />
        </TouchableOpacity>
      </View>
      <ScrollView
        
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
        <EnergyConsumptionCard />
        <FlatList
          data={state?.devices || []}
          renderItem={renderRoomCard}
          keyExtractor={item => item.id}
          numColumns={2}
          style={{alignSelf: 'center'}}
        />
        {state?.devices && state?.devices.map(item=>{
          return (
            <View style={{padding:22}}>
              {
                item.pins.map(pin=>{
                  let overLimit = checkForLimit(pin);
                  if(overLimit){
                    return (
                      <View style={{height:48,width:"100%",backgroundColor:"red",borderRadius:8,flexDirection:"row",alignItems:"center",justifyContent:"space-between",paddingLeft:12,paddingRight:12,marginTop:12}}>
                          <Text style={{fontSize:16,fontWeight:"bold",color:"#FFFFFF"}}>Over Consupction alert</Text>
                          <View>
                            <Text  style={{fontSize:14,color:"#ffffff"}}>{`${item.name}, ${pin.pinName}`}</Text>
                            <Text style={{fontSize:14,color:"#ffffff"}}>{`${overLimit.totleUnit}kWh`}</Text>
                          </View>
                        </View>
                    )
                  } 
                  return null
                
                 
                })
              }
             
            </View>
              
          )
        })

        }
       
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  image: {height: 15, width: 15, alignSelf: 'center'},
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
})