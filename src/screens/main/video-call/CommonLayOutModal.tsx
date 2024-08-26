import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC} from 'react';
import Header from '../../../components/header/Header';
import FilledButton from '../../../components/buttons/FilledButton';
import {Colors} from '../../../constants/Colors';
import {HelpIcon, UTurnIcon} from '../../../assets/icon/IconNames'; // Ensure this is the correct path
import BottomSheet from '../my-profile/components/BottomSheetLocal/BottomSheet';
import CommonHeaderLocal from './components/CompoundHeaderLocal';
import Icons from '../../../assets/icon/Icon';

// Define the HelpItem type
type HelpItem = {
  page: string;
  text: string;
  img: any;
};

type Props = {
  heading: string;
  children: React.ReactNode;
  loading: boolean;
  onPress: () => void;
  onBackPress: () => void;
  onPressHelp?: () => void;
  help?: HelpItem[]; // Optional array of HelpItem objects
  count?: any;
};

const CommonLayoutModalLocal: FC<Props> = ({
  heading,
  loading,
  children,
  onPress,
  onBackPress,
  help = [], // Default to an empty array
  count,
}) => {
  const [open, setOpen] = React.useState(false);
  const [underStand, setUnderStand] = React.useState(false);
  const [index, setIndex] = React.useState(0);

  const incCnt = () => {
    if (index < help.length - 1) {
      setIndex(index + 1);
    }

    if (index === help.length - 2) {
      setUnderStand(true);
    } else if (index === help.length - 1) {
      setOpen(false);
      setTimeout(() => {
        setUnderStand(false);
        setIndex(0);
      }, 1000);
    }
  };

  const decCnt = () => {
    if (index > 0) {
      setIndex(index - 1);
      setUnderStand(false);
    } else if (index === 0) {
      setOpen(false);
      setUnderStand(false);
      setIndex(0);
    }
  };

  const onPressHelp = () => {
    setOpen(true);
  };

  return (
    <>
      <View style={{paddingHorizontal: 20}}>
        {/* <Header title={heading} /> */}
        <CommonHeaderLocal
          title={heading}
          leftIcon={
            <TouchableOpacity onPress={onBackPress}>
              <Icons.MaterialIcons
                name="arrow-back"
                size={30}
                color={Colors.Blue}
              />
            </TouchableOpacity>
          }
        />
      </View>
      <View style={{paddingHorizontal: 20}}>
        {children}
        <View style={styles.addBtn}>
          {loading ? (
            <FilledButton label="Stop measurement" type="red" />
          ) : (
            <>
              <View
                style={{
                  width: 55,
                  height: 55,
                  borderWidth: 1,
                  borderColor: Colors.LightGray,
                  borderRadius: 30,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <TouchableOpacity onPress={onPressHelp}>
                  <HelpIcon size={26} />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  width: '80%',
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  // backgroundColor: 'red',
                }}>
                <FilledButton
                  icon={count ? <UTurnIcon color="white" /> : null}
                  label={count ? `Start again` : `Start measuring`}
                  type="blue"
                  onPress={onPress}
                />
              </View>
            </>
          )}
        </View>
      </View>

      <BottomSheet
        isVisible={open}
        children={
          // <View style={styles.bottomSheetContent}>
          //   <View
          //     style={{
          //       alignItems: 'center',
          //       paddingVertical: 0,
          //       paddingBottom: 40,
          //     }}>
          //     <Image
          //       style={{width: 300, height: 400, marginBottom: 20}}
          //       source={
          //         help[index]?.img ||
          //         require('../../../assets/images/blood.png')
          //       } // Use a fallback image if undefined
          //     />

          //     <View style={{paddingHorizontal: 20}}>
          //       <Text
          //         style={{
          //           fontSize: 22,
          //           fontWeight: 'bold',
          //           fontFamily: 'Roboto',
          //           color: Colors.Blue,
          //           marginHorizontal: 40,
          //         }}>
          //         {help[index]?.text || 'No help text available.'}{' '}
          //         {/* Fallback text */}
          //       </Text>
          //     </View>
          //   </View>

          //   <View
          //     style={{
          //       flexDirection: 'row',
          //       justifyContent: 'space-between',
          //       alignSelf: 'flex-end',
          //       height: '12%',
          //       paddingHorizontal: 20,
          //       width: '100%',
          //     }}>
          //     <FilledButton
          //       label="Back"
          //       type="lightGrey"
          //       style={{width: '47%'}}
          //       onPress={() => decCnt()}
          //     />
          //     <FilledButton
          //       label={underStand ? 'Understood' : 'Next'}
          //       type="blue"
          //       style={{width: '47%'}}
          //       onPress={() => incCnt()}
          //     />
          //   </View>
          // </View>

          <View style={styles.bottomSheetContent}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
              <Image style={styles.helpImage} source={help[index].img} />

              <Text style={styles.helpText}>{help[index].text}</Text>
            </ScrollView>

            <View style={styles.buttonContainer}>
              <FilledButton
                label="Back"
                type="lightGrey"
                style={styles.button}
                onPress={() => decCnt()}
              />
              <FilledButton
                label={underStand ? 'Understood' : 'Next'}
                type="blue"
                style={styles.button}
                onPress={() => incCnt()}
              />
            </View>
          </View>
        }
        onBackdropPress={() => setOpen(false)}
      />
    </>
  );
};

export default CommonLayoutModalLocal;

const styles = StyleSheet.create({
  addBtn: {
    width: '100%',
    backgroundColor: Colors.White,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    gap: 10,
  },
  bottomSheetContent: {
    height: '90%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingBottom: 10,
  },
  scrollContainer: {
    alignItems: 'center',
    paddingBottom: 20, // Ensure there's space below the content
  },
  helpImage: {
    width: 300,
    height: 400,
    marginBottom: 20,
  },
  helpText: {
    fontSize: 22,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    color: Colors.Blue,
    marginHorizontal: 62,
    // textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
  },
  button: {
    width: '47%',
  },
});
