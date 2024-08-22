import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {Colors} from '../../../../constants/Colors';
import Header from '../../../../components/header/Header';
import {DummyImage} from '../../../../assets/dummy/images';
import FilledButton from '../../../../components/buttons/FilledButton';
import {NextIcon} from '../../../../assets/icon/IconNames';
import DeviceItems from '../components/DeviceItems';

const DeviceAndAccessories = ({navigation}: any) => {
  const [open, isOpen] = useState({
    id: 1,
    status: false,
  });
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Colors.GhostWhite,
        position: 'relative',
      }}>
      <Header title="Device and accessories" />
      <ScrollView style={{paddingVertical: 12, width: '94%', margin: 'auto'}}>
        <View>
          <View style={styles.container}>
            <View style={{flexDirection: 'row', marginBottom: 20}}>
              <View style={styles.imageBox}>
                <Image
                  source={DummyImage.largeDevice}
                  width={250}
                  height={250}
                  style={{
                    alignSelf: 'center',
                    marginBottom: 12,
                    width: 50,
                    height: 50,
                  }}
                />
              </View>
              <View style={{width: '70%'}}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    color: Colors.Blue,
                    marginBottom: 4,
                  }}>
                  Dispositivo Multiparámetros Yano
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: Colors.SteelBlue,
                  }}>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odio
                  veritatis
                </Text>
              </View>
            </View>
            <FilledButton
              label="Shop Online"
              type="blue"
              onPress={() => navigation.navigate('')}
            />
            <View
              style={{
                borderTopWidth: 1,
                borderColor: Colors.LightGray,
                marginTop: 20,
                paddingTop: 20,
              }}>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text style={styles.heading}>You can also find it at</Text>
                <View style={{}}>
                  <NextIcon />
                </View>
              </TouchableOpacity>
              <View>
                <DeviceItems
                  name="Farmatodo"
                  subtitle="All the national territory"
                  isVisibleIcon={false}
                  element={
                    <Image
                      source={DummyImage.farmatodoLogo}
                      width={40}
                      height={40}
                      style={{objectFit: 'contain', height: 40, width: 40}}
                    />
                  }
                  customStyle={{
                    borderBottomWidth: 1,
                    borderColor: Colors.LightGray,
                  }}
                />
                <DeviceItems
                  name="Locatel"
                  subtitle="Barquisimeto, Barinas, Puerto Ordaz"
                  isVisibleIcon={false}
                  element={
                    <Image
                      source={DummyImage.locatelLogo}
                      width={40}
                      height={40}
                      style={{objectFit: 'contain', height: 40, width: 40}}
                    />
                  }
                  customStyle={{
                    borderBottomWidth: 1,
                    borderColor: Colors.LightGray,
                  }}
                />
                <DeviceItems
                  name="Farmacias San Ignacio"
                  subtitle="Barquisimeto"
                  isVisibleIcon={false}
                  element={
                    <Image
                      source={DummyImage.farmaciasLogo}
                      width={40}
                      height={40}
                      style={{objectFit: 'contain', height: 40, width: 40}}
                    />
                  }
                />
              </View>
            </View>
          </View>
          <View style={[styles.container, {marginBottom: 25}]}>
            <View style={{flexDirection: 'row', marginBottom: 20}}>
              <View style={[styles.imageBox, {marginTop: 5}]}>
                <Image
                  source={DummyImage.stripsBox}
                  width={250}
                  height={250}
                  style={{
                    alignSelf: 'center',
                    marginBottom: 20,
                    width: 80,
                    height: 80,
                    marginTop: 16,
                  }}
                />
              </View>
              <View style={{width: '70%'}}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    color: Colors.Blue,
                    marginBottom: 4,
                  }}>
                  Tiras reactivas para medición de glucosa
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: Colors.SteelBlue,
                  }}>
                  Lorem ipsum dolor sit amet consectetur. Habitant nulla a leo
                  quis sem vel.
                </Text>
              </View>
            </View>
            <FilledButton
              label="Shop Online"
              type="blue"
              onPress={() => navigation.navigate('')}
            />
            <View
              style={{
                borderTopWidth: 1,
                borderColor: Colors.LightGray,
                marginTop: 20,
                paddingTop: 20,
              }}>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text style={styles.heading}>You can also find it at</Text>
                <View style={{}}>
                  <NextIcon />
                </View>
              </TouchableOpacity>
              <View>
                <DeviceItems
                  name="Farmatodo"
                  subtitle="All the national territory"
                  isVisibleIcon={false}
                  element={
                    <Image
                      source={DummyImage.farmatodoLogo}
                      width={40}
                      height={40}
                      style={{objectFit: 'contain', height: 40, width: 40}}
                    />
                  }
                  customStyle={{
                    borderBottomWidth: 1,
                    borderColor: Colors.LightGray,
                  }}
                />
                <DeviceItems
                  name="Locatel"
                  subtitle="Barquisimeto, Barinas, Puerto Ordaz"
                  isVisibleIcon={false}
                  element={
                    <Image
                      source={DummyImage.locatelLogo}
                      width={40}
                      height={40}
                      style={{objectFit: 'contain', height: 40, width: 40}}
                    />
                  }
                  customStyle={{
                    borderBottomWidth: 1,
                    borderColor: Colors.LightGray,
                  }}
                />
                <DeviceItems
                  name="Farmacias San Ignacio"
                  subtitle="Barquisimeto"
                  isVisibleIcon={false}
                  element={
                    <Image
                      source={DummyImage.farmaciasLogo}
                      width={40}
                      height={40}
                      style={{objectFit: 'contain', height: 40, width: 40}}
                    />
                  }
                />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DeviceAndAccessories;

const styles = StyleSheet.create({
  addBtn: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    backgroundColor: Colors.White,
    padding: 10,
  },
  imageBox: {
    width: 80,
    minWidth: 80,
    height: 80,
    backgroundColor: Colors.GhostWhite,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginEnd: 20,
  },
  container: {
    backgroundColor: Colors.White,
    padding: 20,
    paddingBottom: 0,
    borderRadius: 10,
    marginBottom: 12,
  },
  heading: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.Blue,
  },
});
