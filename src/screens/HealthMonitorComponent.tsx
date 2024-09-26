import React, {useEffect} from 'react';
import {View, Text, Button} from 'react-native';
import {
  healthMonitor,
  healthMonitorEventEmitter,
} from '../core/heathMonitor/HealthMonitor';

const HealthMonitorComponent: React.FC = () => {
  useEffect(() => {
    healthMonitor.init();

    healthMonitor
      .bindService()
      .then(message => {
        console.log('Service bound:', message);
      })
      .catch(error => {
        console.error('Error binding service:', error);
      });

    const heartRateResultListener = healthMonitorEventEmitter.addListener(
      'HeartRateResultEvent',
      result => {
        console.log('Heart Rate Result:', result);
      },
    );

    const heartRateErrorListener = healthMonitorEventEmitter.addListener(
      'HeartRateErrorEvent',
      error => {
        console.error('Heart Rate Error:', error);
      },
    );

    return () => {
      // Remove listeners when the component unmounts
      heartRateResultListener.remove();
      heartRateErrorListener.remove();
      healthMonitor
        .unbindService()
        .then(message => {
          console.log('Service unbound:', message);
        })
        .catch(error => {
          console.error('Error unbinding service:', error);
        });
    };
  }, []);

  const startMeasurement = () => {
    healthMonitor
      .startHeartRateMeasurement()
      .then(message => {
        console.log('Measurement started:', message);
      })
      .catch(error => {
        console.error('Error starting measurement:', error);
      });
  };

  const stopMeasurement = () => {
    healthMonitor
      .stopHeartRateMeasurement()
      .then(message => {
        console.log('Measurement stopped:', message);
      })
      .catch(error => {
        console.error('Error stopping measurement:', error);
      });
  };

  return (
    <View>
      <Text>Health Monitor Component</Text>
      <Button title="Start Measurement" onPress={startMeasurement} />
      <Button title="Stop Measurement" onPress={stopMeasurement} />
    </View>
  );
};

export default HealthMonitorComponent;
