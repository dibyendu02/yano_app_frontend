import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import React, {FC} from 'react';
import CommonLayout from '../../../../components/CommonLayout';
import {Colors} from '../../../../constants/Colors';
import FilledButton from '../../../../components/buttons/FilledButton';
import {HelpIcon} from '../../../../assets/icon/IconNames';
import BottomSheet from './BottomSheetLocal/BottomSheet';

type props = {
  help: {img: any; text: string}[];
  element: React.ReactNode;
  loading: boolean;
  onPress?: () => void;
};

const CommonMeasurementScreen: FC<props> = ({
  help,
  element,
  loading,
  onPress,
}) => {
  const [open, setOpen] = React.useState(false);
  const [index, setIndex] = React.useState(0);
  const [underStand, setUnderStand] = React.useState(false);

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

  const handleOnPress = () => {
    setOpen(!open);
  };

  return (
    <CommonLayout>
      {element}
      <View style={styles.addBtn}>
        {loading ? (
          <FilledButton label="Stop measuring" type="red" />
        ) : (
          <>
            <TouchableOpacity
              style={styles.helpButton}
              onPress={() => {
                handleOnPress();
              }}>
              <HelpIcon size={32} />
            </TouchableOpacity>
            <View style={styles.startButtonContainer}>
              <FilledButton
                label="Start measuring"
                type="blue"
                onPress={onPress}
              />
            </View>
          </>
        )}

        <BottomSheet
          isVisible={open}
          children={
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
      </View>
    </CommonLayout>
  );
};

export default CommonMeasurementScreen;

const styles = StyleSheet.create({
  addBtn: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    backgroundColor: Colors.White,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  helpButton: {
    width: 55,
    height: 55,
    borderWidth: 1,
    borderColor: Colors.LightGray,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  startButtonContainer: {
    width: '80%',
  },
  bottomSheetContent: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
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
    marginHorizontal: 40,
    textAlign: 'center',
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
