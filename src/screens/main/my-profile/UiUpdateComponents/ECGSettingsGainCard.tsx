import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, {ReactNode, useEffect} from 'react';
import {Colors} from '../../../../constants/Colors';
import RadioButton from '../../../../components/buttons/RadioButton';

interface MeasurementChangeCardProps {
  title?: string;
  children?: ReactNode;
  cardFooter?: ReactNode | null;
  contentContainerStyle?: StyleProp<ViewStyle>;
  active: (value: boolean, selectedValue: string) => void;
  items?: {unit1: string; unit2: string; unit3: string};
}

const ECGSettingsGainCard: React.FC<MeasurementChangeCardProps> = ({
  title = '',
  contentContainerStyle,
  active,
  items,
}) => {
  const [selectedValue, setSelectedValue] = React.useState<string>('');

  useEffect(() => {
    if (items) {
      setSelectedValue(items.unit1); // Default to unit1, or handle previously selected unit
    }
  }, [items]);

  const handleSelect = (value: string) => {
    setSelectedValue(value);
    active(false, value); // Set selected value and close modal
  };

  return (
    <View style={[styles.container, contentContainerStyle]}>
      <View style={styles.content}>
        {title ? <Text style={styles.title}>{title}</Text> : null}
      </View>

      <View>
        {items?.unit1 && (
          <RadioButton
            label={items.unit1}
            value={items.unit1}
            selectedValue={selectedValue}
            onValueChange={handleSelect}
          />
        )}
        {items?.unit2 && (
          <RadioButton
            label={items.unit2}
            value={items.unit2}
            selectedValue={selectedValue}
            onValueChange={handleSelect}
          />
        )}
        {items?.unit3 && (
          <RadioButton
            label={items.unit3}
            value={items.unit3}
            selectedValue={selectedValue}
            onValueChange={handleSelect}
          />
        )}
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => active(false, selectedValue)}>
          <Text style={styles.cancelButtonText}>CANCEL</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 6,
    borderRadius: 10,
    backgroundColor: 'white',
    width: '94%',
    alignSelf: 'center',
    overflow: 'hidden',
    padding: 15,
    position: 'relative',
    top: '34%',
    zIndex: 2,
  },
  content: {
    width: '100%',
    alignItems: 'flex-start',
  },
  title: {
    fontWeight: 'bold',
    marginLeft: 4,
    marginTop: 10,
    marginBottom: 10,
    fontSize: 20,
    color: Colors.Blue,
    alignSelf: 'flex-start',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
    width: '100%',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  cancelButtonText: {
    color: Colors.LightGreen,
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ECGSettingsGainCard;
