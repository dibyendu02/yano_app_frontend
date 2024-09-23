import React from 'react';
import ThresholdInputWrapper from './components/ThresholdInputWrapper';

const BodyTemperature = () => {
  const temperatureInputs = [
    {
      name: 'minBodyTemperature',
      unit: '°C',
      minValue: 34,
      maxValue: 41,
      label: 'Minimum',
      //   placeholder: 'Select minimum body temperature',
      optionsListLabel: 'Select the temperature',
      optionsListHeight: 500,
    },
    {
      name: 'maxBodyTemperature',
      unit: '°C',
      minValue: 34,
      maxValue: 41,
      label: 'Maximum',
      //   placeholder: 'Select maximum body temperature',
      optionsListLabel: 'Select the temperature',
      optionsListHeight: 500,
    },
  ];

  return (
    <ThresholdInputWrapper
      title="Body temperature"
      inputs={temperatureInputs}
    />
  );
};

export default BodyTemperature;
