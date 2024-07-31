
import { Colors } from '../../constants/Colors';
import Icons from './Icon';

export const IconName = {
  CheckCircle: 'checkcircle',
};

export const DeleteIcon = () => {
  return (
    <Icons.MaterialIcons
      name={'delete-outline'}
      color={Colors.Blue}
      size={20}
    />
  );
};
export const EditIcon = ({ size = 18 }) => {
  return <Icons.Feather name={'edit-2'} color={Colors.Blue} size={size} />;
};

export const RightIcon = () => {
  return <Icons.Entypo name={'chevron-right'} color={Colors.Blue} size={20} />;
};

export const PlusIcon = () => {
  return (
    <Icons.FontAwesome5
      name={'plus'}
      color={'#fff'}
      size={16}
      style={{ marginEnd: 6 }}
    />
  );
};

export const DateIcon = () => {
  return (
    <Icons.FontAwesome5 name={'calendar-alt'} color={Colors.Blue} size={18} />
  );
};

export const Checkbox = () => {
  return (
    <Icons.MaterialCommunityIcons
      name={'checkbox-marked'}
      color={Colors.Green}
      size={30}
    />
  );
};

export const CheckboxOutline = () => {
  return (
    <Icons.MaterialCommunityIcons
      name={'checkbox-blank-outline'}
      color={Colors.Grey}
      size={30}
    />
  );
}

export const CheckCircleIcon = () => {
  return (
    <Icons.MaterialIcons
      name={'radio-button-on'}
      color={Colors.Green}
      size={20}
    />
  );
}
export const CheckIcon = () => {
  return (
    <Icons.MaterialIcons
      name={'radio-button-off'}
      color={Colors.SteelBlue}
      size={20}
    />
  );
}

export const DownloadIcon = ({ size = 20, color = Colors.Blue }) => {
  return (
    <Icons.Feather
      name={'download'}
      color={color}
      size={size}
    />
  );
}

export const NextIcon = () => {
  return (
    <Icons.MaterialIcons
      name="navigate-next"
      size={25}
      color={'black'} />
  )
}

export const BluetoothConnected = ({ size = 20 }) => {
  return (
    <Icons.MaterialCommunityIcons
      name='bluetooth-connect'
      size={size}
      color={'#2F80ED'}
    />
  )
}
export const BluetoothDisconnected = () => {
  return (
    <Icons.MaterialCommunityIcons
      name='bluetooth-off'
      size={20}
      color={Colors.SteelBlue}
    />
  )
}
export const BatteryCharge = ({ size = 20 }) => {
  return (
    <Icons.MaterialCommunityIcons
      name='battery-70'
      size={size}
      color={'#0DAB76'}
    />
  )
}
export const LogoutIcon = () => {
  return (
    <Icons.MaterialIcons
      name='logout'
      size={25}
      color={Colors.Red}
    />
  )
}

export const OkIcon = ({ size = 20, color = Colors.Green }) => {
  return (
    <Icons.MaterialCommunityIcons
      name='checkbox-marked-circle'
      size={size}
      color={color}
    />
  )
}

export const ViewPassIcon = ({ size = 20, color = Colors.lightBlack }) => {
  return (
    <Icons.Ionicons
      name='eye'
      size={size}
      color={color}
    />
  )
}
export const NotViewPassIcon = ({ size = 20, color = Colors.lightBlack }) => {
  return (
    <Icons.Ionicons
      name='eye-off'
      size={size}
      color={color}
    />
  )
}
export const SettingsIcon = ({ size = 20, color = Colors.Blue }) => {
  return (
    <Icons.Ionicons
      name='settings'
      size={size}
      color={color}
    />
  )
}