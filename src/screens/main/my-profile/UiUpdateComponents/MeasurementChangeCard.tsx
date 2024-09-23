import React, {ReactNode, useEffect} from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {Colors} from '../../../../constants/Colors';
import RadioButton from '../../../../components/buttons/RadioButton';

interface MeasurementChangeCardProps {
  title?: string;
  children?: ReactNode;
  cardFooter?: ReactNode | null;
  contentContainerStyle?: StyleProp<ViewStyle>;
  active: (value: boolean) => void;
  items?: {unit1: string; unit2: string};
  onUnitChange: any;
  selectedUnit?: string; // New prop for the selected unit
}

const MeasurementChangeCard: React.FC<MeasurementChangeCardProps> = ({
  title = '',
  contentContainerStyle,
  active,
  items,
  onUnitChange,
  selectedUnit, // Destructure the new prop
}) => {
  const [selectedValue, setSelectedValue] = React.useState<string>('');

  useEffect(() => {
    if (items && selectedUnit) {
      // Set the selected value to the already selected unit passed from props
      setSelectedValue(selectedUnit);
    } else if (items) {
      setSelectedValue(items.unit1); // Default to unit1 if no selected unit is passed
    }
  }, [items, selectedUnit]);

  const handleValueChange = (value: string) => {
    setSelectedValue(value);
    onUnitChange(value);
    active(false); // Trigger the onPress action
  };

  return (
    <View style={[styles.container, contentContainerStyle]}>
      <View style={styles.content}>
        {title ? <Text style={styles.title}>{title}</Text> : null}
      </View>

      <View>
        <RadioButton
          label={items?.unit1 || ''}
          value={items?.unit1 || ''}
          selectedValue={selectedValue}
          onValueChange={handleValueChange}
        />

        <RadioButton
          label={items?.unit2 || ''}
          value={items?.unit2 || ''}
          selectedValue={selectedValue}
          onValueChange={handleValueChange}
        />
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.button} onPress={() => active(false)}>
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
    top: '30%',
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

export default MeasurementChangeCard;
