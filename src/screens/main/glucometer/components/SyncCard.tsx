import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, {ReactNode} from 'react';
import {Colors} from '../../../../constants/Colors';
import {navigate} from '../../../../navigation/RootNavigation';

interface CardProps {
  title?: string;
  children?: ReactNode;
  cardFooter?: ReactNode | null;
  contentContainerStyle?: StyleProp<ViewStyle>;
  active: (value: boolean) => void;
  action?: () => void;
}

const SyncCard: React.FC<CardProps> = ({
  title = '',
  children,
  cardFooter = null,
  contentContainerStyle,
  active,
  action,
}) => {
  return (
    <View style={[styles.container, contentContainerStyle]}>
      <View style={styles.content}>
        {title ? <Text style={styles.title}>{title}</Text> : null}
        <Text style={styles.text}>{children}</Text>
      </View>
      {cardFooter && <View style={styles.footer}>{cardFooter}</View>}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigate('HealthParametersList')}>
          <Text style={styles.cancelButtonText}>See measurement history</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={action}>
          <Text style={styles.yesButtonText}>Continue</Text>
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
    padding: 20,
    position: 'relative',
    top: '37%',
    zIndex: 2,
  },
  content: {
    width: '100%',
    alignItems: 'flex-start',
    // backgroundColor: 'yellow',
  },
  title: {
    fontWeight: 'bold',
    // marginTop: 10,
    marginBottom: 10,
    fontSize: 20,
    color: Colors.Blue,
    alignSelf: 'flex-start',
  },
  text: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 18,
    textAlign: 'left',
    color: Colors.SteelBlue,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
    width: '100%',
    // backgroundColor: 'red',
  },
  button: {
    paddingVertical: 10,
    paddingLeft: 30,
  },
  cancelButtonText: {
    color: Colors.LightGreen,
    fontWeight: 'bold',
    fontSize: 16,
  },
  yesButtonText: {
    color: Colors.LightGreen,
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default SyncCard;
