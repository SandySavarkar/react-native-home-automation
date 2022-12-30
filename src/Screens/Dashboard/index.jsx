import React, {useEffect, useState} from 'react';
import {View, ScrollView, FlatList, SafeAreaView} from 'react-native';

import EnergyConsumptionCard from '../../components/EnergyConsumptionCard';
import RoomCard from '../../components/RoomCard';
import Label from '../../components/Label';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import APIs from '../../api/APIs';
import AlertBox from '../../components/AlertBox';
import { updateHistory, updatePinsHistoryData } from '../../redux/reducers/historySlice';
import { groupByKey } from '../../utils/helpers';
import moment from "moment"
import { UNIT_PRICE } from '../../utils/constants';
const roomData = [
  {
    id: 123,
    name: 'Living Room',
    totalDevices: 12,
    status: 'off',
    power: 0,
    image: require('../../assets/images/calendar.png'),
    deviceList: [
      {id: 'Fan', status: 'on', pinId: '111'},
      {id: 'AC', status: 'off', pinId: '112'},
      {id: 'TV', status: 'on', pinId: '113'},
      {id: 'Lights', status: 'on', pinId: '114'},
      {id: 'Alexa', status: 'off', pinId: '115'},
    ],
  },
  {
    id: 223,
    name: 'Kitchen',
    totalDevices: 8,
    status: 'on',
    power: 12,
    image: require('../../assets/images/calendar.png'),
    deviceList: [{id: 'Fan', status: 'off', pinId: '121'}],
  },
  {
    id: 323,
    name: 'Study Room',
    totalDevices: 4,
    status: 'on',
    power: 21,
    image: require('../../assets/images/calendar.png'),
    deviceList: [{id: 'Fan', status: 'off', pinId: '131'}],
  },
  {
    id: 423,
    name: 'Bed Room',
    totalDevices: 3,
    status: 'off',
    power: 18,
    image: require('../../assets/images/calendar.png'),
    deviceList: [{id: 'Fan', status: 'on', pinId: '141'}],
  },
];
export const Dashboard = () => {
  const {history} = useSelector(state => state.history);

  const [state, setState] = useState({});
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const getDeviceHistory = (id) => {
    APIs.getHistory({
      device_id: id
  })
    .then(res => {
      dispatch(updateHistory(res.data));
    })
    .catch(error => console.log('get history error', error));
  }


  useEffect(() => {
    let param = {user_id: '63aec6a271076673a32d7605'};
    APIs.getMyDevice(param)
      .then(res => {
        getDeviceHistory(res?.data[0]?.devices[0]?._id)  
        setState(res.data[0]);
      })
      .catch(error => console.log('getMyDevice error', error));
    
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
    for(let i=0;i<pinHistory.length; i++){
      if(pinHistory[i].switch_off_time && pinHistory[i].switch_on_time){
        let duration = Number(pinHistory[i].duration.replace('hr', ''));
        totle = totle + duration;
        totleUnit = pinHistory[i].consumptionWattPerHour / 1000
      }
    }
    return {
      totleDuration:totle,
      totleUnit,
      totleCost :totleUnit * UNIT_PRICE,
      history:pinHistory,
      pinId:pinHistory[0].pin_Id,
      watt:pinHistory[0].defaultWattOfPin
    }
  }

  const handleUpdateHistory = (history) => {
      console.log(groupByKey(history,"pin_Id"));
      const pinsArray = Object.values(groupByKey(history,"pin_Id"));
      let pinHistoryData = {};
      for(let i=0; i<pinsArray.length; i++){
        let pinHistory = pinsArray[i];
        pinHistoryData[pinHistory[0].pin_Id] = getTotleAmoutOfPin(pinHistory);
        
      }
      console.log('pinHistoryData: ', pinHistoryData);
      dispatch(updatePinsHistoryData(pinHistoryData));
  }

  useEffect(()=>{
    handleUpdateHistory(history)
  },[history])
  const renderRoomCard = ({item}) => {
    return (
      <RoomCard
        data={item}
        onClick={() => navigation.navigate('RoomDetails', {details: item})}
      />
    );
  };
  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <Label mt={10} ph={20} bolder>
            Hello, Sanjay Punani ☀️
          </Label>
        </View>
        <EnergyConsumptionCard />
        <FlatList
          data={state?.devices || []}
          renderItem={renderRoomCard}
          keyExtractor={item => item.id}
          numColumns={2}
          style={{alignSelf: 'center'}}
        />
        <AlertBox message={'Eorrorrr'}/>
      </ScrollView>
    </SafeAreaView>
  );
};
