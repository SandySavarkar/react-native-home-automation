import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import Color from '../../Utils/Color';
import moment from 'moment';
import {IMAGES} from '../../assets/images';

const ConsumptionCard = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Energy consumption</Text>
        <Text style={styles.dateView}>{moment(new Date()).format('ll')}</Text>
      </View>
      <View style={styles.subContainer}>
        <View style={styles.primary}>
          <View style={styles.imageView}>
            <Image source={IMAGES.Light_Thunder} style={styles.image} />
          </View>
          <View style={styles.center}>
            <Text style={styles.headerText}>31.7kWh</Text>
            <Text style={[styles.headerText, {fontSize: 14}]}>Today</Text>
          </View>
        </View>
        <View style={styles.primary}>
          <View style={styles.imageView}>
            <Image source={IMAGES.Light_Plug} style={styles.image} />
          </View>
          <View style={styles.center}>
            <Text style={styles.headerText}>31.7kWh</Text>
            <Text style={[styles.headerText, {fontSize: 14}]}>This month</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ConsumptionCard;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    backgroundColor: Color.PRIMARY,
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  header: {
    paddingVertical: 8,
    marginBottom: 15,
    paddingHorizontal: 15,
    backgroundColor: Color.LIGHT_BLUE,
    borderRadius: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    color: Color.WHITE,
    fontSize: 18,
  },
  dateView: {
    backgroundColor: Color.NAVY_BLUE,
    padding: 10,
    borderRadius: 25,
    color: Color.WHITE,
  },
  subContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal:4
  },
  image: {
    height: 30,
    width: 30,
  },
  imageView: {
    backgroundColor: Color.LIGHT_BLUE,
    borderRadius: 25,
    padding: 12,
    marginRight: 15,
  },
  primary: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  center: {
    alignSelf: 'center',
  },
});