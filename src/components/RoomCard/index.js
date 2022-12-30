import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Switch, TouchableOpacity, View} from 'react-native';
import Label from '../../components/Label';
import Color from '../../utils/Color';

const RoomCard = ({data, onClick}) => {
  const [status, setStatus] = useState(false);
  const handleRoomConnection = () => {
    if (onClick) {
      onClick();
    }
  };
  useEffect(() => {
    let status = data?.pins.filter(item => item.status);
    setStatus(status.length > 0);
  }, []);

  return (
    <TouchableOpacity onPress={handleRoomConnection}>
      <View style={styles.container}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={styles.logoBackground}>
            <Image
              source={require('../../assets/images/calendar.png')}
              style={styles.logoStyle}
            />
          </View>
          <View
            style={[
              styles.mark,
              {backgroundColor: status ? Color.SUCCESS : Color.ERROR},
            ]}></View>
        </View>
        <Label numberOfLines={2} small mt={10} bolder color={Color.BLACK}>
          {data?.name}
        </Label>
        <Label xsmall color={Color.DARK_GRAY} bolder>
          {data?.pins?.length} Devices
        </Label>

        <View style={styles.rowAlignCenter}>
          <Image
            source={require('../../assets/images/orangeLightning.png')}
            style={styles.logoStyle}
          />
          <Label xsmall color={Color.DARK_GRAY}>
            {!data?.power ? 'Not consuming' : `Consuming ${data?.power}kWh`}
          </Label>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RoomCard;

const styles = StyleSheet.create({
  container: {
    width: 180,
    backgroundColor: Color.WHITE,
    // marginHorizontal: 20,
    // marginRight:10,
    margin: 10,

    borderRadius: 20,
    padding: 15,
  },
  logoStyle: {
    height: 20,
    width: 20,
  },
  logoBackground: {
    backgroundColor: Color.LIGHT_BLUE,
    borderRadius: 25,
    padding: 20,
    width: 0,
    height: 0,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  rowAlignCenter: {
    marginTop: 12,
    left: -3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  mark: {
    height: 0,
    width: 0,
    padding: 10,
    borderRadius: 20,
    alignSelf: 'center',
  },
  off: {},
});
