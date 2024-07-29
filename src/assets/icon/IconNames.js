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
export const EditIcon = () => {
  return <Icons.Feather name={'edit-2'} color={Colors.Blue} size={18} />;
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
