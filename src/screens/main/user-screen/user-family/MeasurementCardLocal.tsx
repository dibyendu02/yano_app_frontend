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
  active: (value: boolean) => void;
  items?: {unit1: string; unit2: string; unit3: string};
  setValue: (value: string) => void;
}

const MeasurementChangeCardLocal: React.FC<MeasurementChangeCardProps> = ({
  title = '',
  contentContainerStyle,
  active,
  items,
  setValue = () => {},
}) => {
  const [selectedValue, setSelectedValue] = React.useState<string>('');

  useEffect(() => {
    if (items) {
      setSelectedValue(items.unit1); // Default to unit1, or you could add logic to check for previously selected unit
    }
  }, [items]);

  const handleValueChange = (value: string) => {
    setSelectedValue(value);
    setValue(value);
    active(false);
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
            onValueChange={handleValueChange}
          />
        )}
        {items?.unit2 && (
          <RadioButton
            label={items.unit2}
            value={items.unit2}
            selectedValue={selectedValue}
            onValueChange={handleValueChange}
          />
        )}
        {items?.unit3 && (
          <RadioButton
            label={items.unit3}
            value={items.unit3}
            selectedValue={selectedValue}
            onValueChange={handleValueChange}
          />
        )}
        {items?.unit4 && (
          <RadioButton
            label={items.unit4}
            value={items.unit4}
            selectedValue={selectedValue}
            onValueChange={handleValueChange}
          />
        )}
        {items?.unit5 && (
          <RadioButton
            label={items.unit5}
            value={items.unit5}
            selectedValue={selectedValue}
            onValueChange={handleValueChange}
          />
        )}
        {items?.unit6 && (
          <RadioButton
            label={items.unit6}
            value={items.unit6}
            selectedValue={selectedValue}
            onValueChange={handleValueChange}
          />
        )}
        {items?.unit7 && (
          <RadioButton
            label={items.unit7}
            value={items.unit7}
            selectedValue={selectedValue}
            onValueChange={handleValueChange}
          />
        )}
        {items?.unit8 && (
          <RadioButton
            label={items.unit8}
            value={items.unit8}
            selectedValue={selectedValue}
            onValueChange={handleValueChange}
          />
        )}
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
    top: '20%',
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
  radioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  radioText: {
    marginLeft: 8,
    color: 'black',
    fontSize: 18,
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

export default MeasurementChangeCardLocal;
