import React from 'react';
import ThresholdInputWrapper from './components/ThresholdInputWrapper';

const GlucoseLevel = () => {
  const glucoseInputs = [
    {
      name: 'minGlucoseLevel',
      unit: 'mmol/L',
      minValue: 4,
      maxValue: 11,
      label: 'Minimum',
      //   placeholder: 'Select minimum glucose level',
      optionsListLabel: 'Select the glucose level',
      optionsListHeight: 500,
    },
    {
      name: 'maxGlucoseLevel',
      unit: 'mmol/L',
      minValue: 4,
      maxValue: 11,
      label: 'Maximum',
      //   placeholder: 'Select maximum glucose level',
      optionsListLabel: 'Select the glucose level',
      optionsListHeight: 500,
    },
  ];

  return <ThresholdInputWrapper title="Glucose level" inputs={glucoseInputs} />;
};

export default GlucoseLevel;
