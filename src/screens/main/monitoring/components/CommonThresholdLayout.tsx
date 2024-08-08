import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {FC, useState, useEffect} from 'react';
import CommonLayout from '../../../../components/CommonLayout';
import Header from '../../../../components/header/Header';
import {Colors} from '../../../../constants/Colors';
import SwitchButton from '../../../../components/formComp/SwitchButton';
import {NotificationIcon} from '../../../../assets/icon/IconNames';
import FilledButton from '../../../../components/buttons/FilledButton';
import {useFormContext} from 'react-hook-form';

type props = {
  title: string;
  children: React.ReactNode;
  onPress?: () => void;
  handleSwitchChange: (value: boolean) => void;
  isSwitchOn: boolean;
};

const CommonThresholdLayout: FC<props> = ({
  title,
  children,
  onPress,
  handleSwitchChange,
  isSwitchOn,
}) => {
  const {watch} = useFormContext();
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const formValues = watch();

  useEffect(() => {
    const allFieldsFilled = Object.values(formValues).every(
      value => value !== null && value !== undefined && value !== '',
    );
    setIsButtonDisabled(!allFieldsFilled);
  }, [formValues]);

  return (
    <CommonLayout>
      <Header
        title={'Edit threshold'}
        headerRightComponent={
          <FilledButton
            type="blue"
            label="Save"
            onPress={onPress}
            disabled={isButtonDisabled}
            style={{
              width: 70,
              paddingVertical: 10,
              borderRadius: 10,
            }}
          />
        }
      />
      <ScrollView>
        <View style={{padding: 20}}>
          <Text style={styles.title}>{title}</Text>
          <View
          //   style={{opacity: isSwitchOn ? 1 : 0.6}}
          >
            {children}
          </View>
          <SwitchButton
            element={<NotificationIcon />}
            label={'Health alerts'}
            value={isSwitchOn}
            onValueChange={handleSwitchChange}
          />
        </View>
      </ScrollView>
    </CommonLayout>
  );
};

export default CommonThresholdLayout;

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.Blue,
    marginBottom: 20,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
});
