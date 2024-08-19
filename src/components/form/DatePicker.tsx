import DatePicker from 'react-native-date-picker';
import {FC, useState} from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {Colors} from '../../constants/Colors';
import {DateIcon} from '../../assets/icon/IconNames';
import DialogBase from '../dialog/DialogBase';
import moment from 'moment';
import DateTimePicker from 'react-native-ui-datepicker';
import {StaticImage} from '../../assets/images';

type inputProps = {
  label: string;
  name: string;
  onchange: (name: string, e: string) => void;
};

export const DatePickerField: FC<inputProps> = ({label, name, onchange}) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <View style={styles.inputBox}>
      <Text style={styles.label}>{label}</Text>
      <Pressable
        onPress={() => setShowDatePicker(true)} // Corrected state here
        style={{position: 'relative'}}>
        <TextInput
          style={[styles.input, {color: Colors.Black}]}
          value={selectedDate.toDateString()} // Updated value to selectedDate
          placeholder={'Select a date'}
          editable={false}
        />
        <View
          style={{
            position: 'absolute',
            top: 20,
            right: 20,
          }}>
          {/* <DateIcon /> */}
          <Image
            source={StaticImage.CalenderIcon}
            style={{width: 25, height: 25, tintColor: Colors.SteelBlue}}
          />
        </View>
      </Pressable>

      <DialogBase
        isVisible={showDatePicker} // Corrected state here
        onBackdropPress={() => setShowDatePicker(false)}>
        <View
          style={{
            backgroundColor: Colors.White,
            width: '92%',
            borderRadius: 8,
            overflow: 'hidden',
          }}>
          <View
            style={{
              backgroundColor: Colors.Blue,
              height: 100,
              padding: 20,
            }}>
            <Text style={{color: Colors.GreyText}}>
              {moment(selectedDate).format('YYYY')}
            </Text>
            <Text style={{color: Colors.White, fontSize: 36}}>
              {moment(selectedDate).format('ddd, MMMM D')}
            </Text>
          </View>
          <View style={{paddingHorizontal: 10}}>
            <DateTimePicker
              mode="single"
              initialView={'day'}
              date={selectedDate}
              onChange={({date}) => {
                let _date = new Date(date);
                setSelectedDate(_date);
              }}
              headerTextStyle={{color: Colors.Blue}}
              headerButtonColor={Colors.Blue}
              headerContainerStyle={{paddingVertical: 10}}
              weekDaysContainerStyle={{borderBottomWidth: 0}}
              weekDaysTextStyle={{color: Colors.GreyText}}
              yearContainerStyle={{
                backgroundColor: Colors.Transparent,
                borderWidth: 0,
              }}
              calendarTextStyle={{color: Colors.Blue, fontWeight: '400'}}
              selectedItemColor={Colors.Blue}
              todayContainerStyle={{
                borderRadius: 20,
                height: 40,
                width: 40,
                borderColor: Colors.Transparent,
                backgroundColor: Colors.White,
              }}
              todayTextStyle={{
                color: Colors.Blue,
              }}
              dayContainerStyle={{
                borderRadius: 20,
                height: 40,
                width: 40,
              }}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              padding: 20,
            }}>
            <Text
              style={styles.dialogBtn}
              onPress={() => setShowDatePicker(false)}>
              Cancel
            </Text>
            <Text
              style={styles.dialogBtn}
              onPress={() => {
                onchange(name, selectedDate.toDateString());
                setShowDatePicker(false);
              }}>
              Ok
            </Text>
          </View>
        </View>
      </DialogBase>
    </View>
  );
};

const styles = StyleSheet.create({
  inputBox: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.Blue,
  },
  input: {
    backgroundColor: Colors.White,
    borderRadius: 8,
    marginTop: 5,
    borderWidth: 1,
    borderColor: Colors.LightGray,
    height: 56,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  dialogBtn: {
    color: Colors.Blue,
    width: 60,
    textAlign: 'right',
    fontWeight: '500',
  },
});
