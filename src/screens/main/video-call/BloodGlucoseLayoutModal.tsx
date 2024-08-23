import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC} from 'react';
import Header from '../../../components/header/Header';
import FilledButton from '../../../components/buttons/FilledButton';
import {Colors} from '../../../constants/Colors';
import {HelpIcon} from '../../../assets/icon/IconNames'; // Ensure this is the correct path
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
};

const BloodGlucoseLayoutModalLocal: FC<Props> = ({
  heading,
  loading,
  children,
  onPress,
  onBackPress,
  help = [], // Default to an empty array
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
      <View style={{paddingHorizontal: 20}}>{children}</View>
    </>
  );
};

export default BloodGlucoseLayoutModalLocal;

const styles = StyleSheet.create({
  addBtn: {
    width: '100%',
    backgroundColor: Colors.White,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  bottomSheetContent: {
    height: '90%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingBottom: 10,
  },
});
