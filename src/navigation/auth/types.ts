/* eslint-disable prettier/prettier */
import {
  NativeStackNavigationOptions,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {AuthScreenType} from './AuthScreens';

export type AuthStackParams = {
  [key in AuthScreenType]: undefined;
};

export type AuthStackConfig = {
  name: keyof AuthStackParams;
  component: React.ComponentType<any>;
  options?: NativeStackNavigationOptions;
};

//Auth Screen Types declarations

//Landing Screen
export type LandingScreenProps = NativeStackScreenProps<AuthStackParams , AuthScreenType>;
