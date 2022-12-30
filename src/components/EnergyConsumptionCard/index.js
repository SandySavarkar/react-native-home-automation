import React from 'react';
import {Image, StyleSheet,  View} from 'react-native';
import Label from '../Label';
import Color from '../../utils/Color';
import { useSelector } from 'react-redux';
import {UNIT_PRICE} from '../../utils/constants'

const EnergyConsumptionCard = () => {
  const {pinsHistoryData} = useSelector(state => state.history);

  const getTodayData = (data)=>{
    let totleUnit = 0;
    if(data){
      const arrayData = Object.values(data);
      for(let i=0; i<arrayData.length;i++){
        totleUnit = totleUnit + arrayData[i].totleUnit
      }
    }
    return {
      totleUnit:totleUnit.toFixed(2),
      totleCost:(totleUnit*UNIT_PRICE).toFixed(2)
    }

  }
  return (
    <View style={styles.container}>
      <View style={styles.labelView}>
        <Label color={Color.WHITE} small bolder>
          Energy consumption
        </Label>
        <View style={styles.dateView}>
          <Image
            source={require('../../assets/images/calendar.png')}
            style={{height: 20, width: 20}}
          />
          <Label xsmall color={Color.WHITE}>
            16 Nov, 2022
          </Label>
        </View>
      </View>
      <View style={styles.subContainer}>
        <View style={styles.rowAlignCenter}>
          <View style={styles.logoBackground}>
            <Image
              source={require('../../assets/images/lightning.png')}
              style={styles.logoStyle}
            />
          </View>
          <View>
            <Label color={Color.WHITE} small bolder>
             {`${getTodayData(pinsHistoryData).totleUnit}kWh`}
            </Label>
            <Label color={Color.WHITE} small bolder>
             {`${getTodayData(pinsHistoryData).totleCost}₹`}
            </Label>
            <Label xsmall color={Color.WHITE}>
              Today
            </Label>
          </View>
        </View>
        <View style={styles.rowAlignCenter}>
          <View style={styles.logoBackground}>
            <Image
              source={require('../../assets/images/plug.png')}
              style={styles.logoStyle}
            />
          </View>
          <View>
          <Label color={Color.WHITE} small bolder>
             {`${getTodayData(pinsHistoryData).totleUnit}kWh`}
            </Label>
            <Label color={Color.WHITE} small bolder>
             {`${getTodayData(pinsHistoryData).totleCost}₹`}
            </Label>
            <Label xsmall color={Color.WHITE}>
              This month
            </Label>
          </View>
        </View>
      </View>
    </View>
  );
};

export default EnergyConsumptionCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.BLUE,
    margin: 20,
    borderRadius: 20,
  },
  labelView: {
    margin: 15,
    backgroundColor: Color.LIGHT_BLUE,
    paddingVertical: 12,
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  dateView: {
    backgroundColor: Color.DARK_BLUE,
    borderRadius: 20,
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoStyle: {
    height: 25,
    width: 25,
  },
  logoBackground: {
    backgroundColor: Color.LIGHT_BLUE,
    borderRadius: 25,
    padding: 25,
    width: 0,
    height: 0,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  rowAlignCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  subContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginBottom: 15,
  },
});
