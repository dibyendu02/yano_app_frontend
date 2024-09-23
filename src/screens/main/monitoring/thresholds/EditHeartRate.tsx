import React from 'react';
import SingleThresholdInputWrapper from './components/SingleThresholdInputWrapper';

const EditHeartRate = () => {
  const inputs = [
    {
      name: 'minHeartRate',
      unit: 'BPM',
      minValue: 40,
      maxValue: 120,
      label: 'Minimum',
      //   placeholder: 'Select minimum heart rate',
      optionsListLabel: 'Select minimum heart rate',
      optionsListHeight: 300,
    },
    {
      name: 'maxHeartRate',
      unit: 'BPM',
      minValue: 40,
      maxValue: 120,
      label: 'Maximum',
      //   placeholder: 'Select maximum heart rate',
      optionsListLabel: 'Select maximum heart rate',
      optionsListHeight: 300,
    },
  ];

  return <SingleThresholdInputWrapper title="Heart rate" inputs={inputs} />;
};

export default EditHeartRate;
