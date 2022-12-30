import React, {useEffect, useState} from 'react';
import {View, ScrollView, FlatList, SafeAreaView} from 'react-native';

import EnergyConsumptionCard from '../../components/EnergyConsumptionCard';
import RoomCard from '../../components/RoomCard';
import Label from '../../components/Label';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import APIs from '../../api/APIs';
import AlertBox from '../../components/AlertBox';
import { updateHistory } from '../../redux/reducers/historySlice';
import { groupByKey } from '../../utils/helpers';
import moment from "moment"
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
      device_id: "63ad829f9f933d1c3462cc41"
  })
    .then(res => {
      dispatch(updateHistory(res.data));
      // setState(res.data[0]);
    })
    .catch(error => console.log('getMyDevice error', error));
  }


  useEffect(() => {
    let param = {user_id: '63aadc8f5c2341b86b6655c7'};
    APIs.getMyDevice(param)
      .then(res => {
        getDeviceHistory(res.data[0]._id)
        setState(res.data[0]);
      })
      .catch(error => console.log('getMyDevice error', error));
    
  }, []);

  const getTotleAmoutOfPin = (pinHistory) => {
    let totle = 0;
    
    if(!pinHistory[pinHistory.length -1].switch_off_time){
      const current = moment();
      console.log('current: ', current);
      console.log('pinHistory[pinHistory.length -1].switch_on_time: ', pinHistory[pinHistory.length -1].switch_on_time);
     const diffrent = current.diff(moment(pinHistory[pinHistory.length -1].switch_on_time)._d,"seconds");
     const diffHours = diffrent / 3600;
     totle = diffHours;
    }
    for(let i=0;i<pinHistory.length; i++){
      if(pinHistory[i].switch_off_time && pinHistory[i].switch_on_time){
        let duration = Number(pinHistory[i].duration.replace('hr', ''));
        console.log('duration: ', duration);
        totle = totle + duration;
      }
    }
    return {
      totle,
      history:pinHistory,
      pinId:pinHistory[0].pin_Id,
      watt:1000
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
          data={state.devices}
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
