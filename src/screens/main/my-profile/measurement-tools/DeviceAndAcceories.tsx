import React, {useState} from 'react';
import {
  Animated,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Colors} from '../../../../constants/Colors';
import Header from '../../../../components/header/Header';
import {DummyImage} from '../../../../assets/dummy/images';
import FilledButton from '../../../../components/buttons/FilledButton';
import DeviceItems from '../components/DeviceItems';
import {staticIcons} from '../../../../assets/image';

const devices = [
  {
    id: 1,
    title: 'Dispositivo Multiparámetros Yano',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    imageSource: DummyImage.largeDevice,
  },
  {
    id: 2,
    title: 'Tiras reactivas para medición de glucosa',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    imageSource: DummyImage.stripsBox,
  },
  {
    id: 3,
    title: 'Medidor continuo de glucosa',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    imageSource: DummyImage.glucoround,
  },
  {
    id: 4,
    title: 'Glucómetro',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    imageSource: DummyImage.glucometer,
  },
];

const DeviceAndAccessories = ({navigation}: any) => {
  const [openStatus, setOpenStatus] = useState(
    devices.map(device => ({
      id: device.id,
      status: false,
      rotationAnim: new Animated.Value(0),
      heightAnim: new Animated.Value(0),
    })),
  );

  const toggleSection = (id: number) => {
    setOpenStatus(prevState => {
      return prevState.map(item => {
        if (item.id === id) {
          const isCurrentOpen = item.status;

          Animated.timing(item.rotationAnim, {
            toValue: isCurrentOpen ? 0 : 1,
            duration: 300,
            useNativeDriver: true,
          }).start();

          Animated.timing(item.heightAnim, {
            toValue: isCurrentOpen ? 0 : 250,
            duration: 300,
            useNativeDriver: false,
          }).start();

          return {...item, status: !isCurrentOpen};
        } else {
          return item;
        }
      });
    });
  };

  const renderDeviceSection = (
    item: any,
    imageSource: any,
    title: string,
    description: string,
  ) => {
    const rotate = item.rotationAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '180deg'],
    });

    return (
      <View style={[styles.container, {marginBottom: 12}]}>
        <View
          style={{
            flexDirection: 'row',
            marginBottom: 20,
            // backgroundColor: 'red',
          }}>
          <View style={[styles.imageBox]}>
            <Image
              source={imageSource}
              width={250}
              height={250}
              style={{
                alignSelf: 'center',
                marginBottom: 20,
                width: 70,
                height: 70,
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
              {title}
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: Colors.SteelBlue,
              }}>
              {description}
            </Text>
          </View>
        </View>
        <FilledButton
          label="Shop online"
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
              paddingBottom: item.status ? 0 : 20,
            }}
            onPress={() => toggleSection(item.id)}>
            <Text style={styles.heading}>You can also find it at</Text>
            <Animated.View style={{transform: [{rotate}]}}>
              <Image
                source={staticIcons.downIcon}
                style={{width: 12, height: 12, objectFit: 'contain'}}
              />
            </Animated.View>
          </TouchableOpacity>
          <Animated.View style={{height: item.heightAnim, overflow: 'hidden'}}>
            {item.status && (
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
            )}
          </Animated.View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Colors.GhostWhite,
        position: 'relative',
        marginBottom: 20,
      }}>
      <Header title="Device and accessories" />
      <ScrollView style={{paddingVertical: 12, width: '94%', margin: 'auto'}}>
        {openStatus.map(item => {
          const device = devices.find(device => device.id === item.id);
          return renderDeviceSection(
            item,
            device.imageSource,
            device.title,
            device.description,
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default DeviceAndAccessories;

const styles = StyleSheet.create({
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
    padding: 15,
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
