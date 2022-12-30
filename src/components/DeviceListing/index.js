import {
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Color from '../../utils/Color';

const DeviceView = ({data, active, onPress}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.subContainer,
          {backgroundColor: active ? 'orange' : Color.DARK_GRAYISH_BLUE},
        ]}
        onPress={onPress}>
        <Image
          source={require('../../assets/images/plug.png')}
          style={styles.image}
          resizeMode={'contain'}
        />
      </TouchableOpacity>
      <Text
        style={{
          alignSelf: 'center',
          color: data.value ? 'green' : Color.ERROR,
          fontWeight: 'bold',
        }}>
        {data.pinName}
      </Text>
    </View>
  );
};
const DeviceListing = ({data, handleClick, activePinId}, props) => {
  const renderItem = ({item}) => {
    return (
      <DeviceView
        data={item}
        active={activePinId === item?.pinId}
        onPress={() => {
          handleClick(item);
          // setActive(item);
          // getActivePin(item);
        }}
      />
    );
  };

  return (
    <>
      <FlatList
        data={data}
        horizontal
        keyExtractor={item => item.pinId}
        renderItem={renderItem}
        style={{alignSelf: 'center'}}
      />
    </>
  );
};

export default DeviceListing;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  subContainer: {
    margin: 10,
    height: 0,
    width: 0,
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
  },
  image: {
    height: 30,
    width: 30,
  },
});
