/* eslint-disable prettier/prettier */

import {DummyImage} from '../assets/dummy/images';

// eslint-disable-next-line prettier/prettier
export const healthStatsData = [
  {
    month: 'July',
    data: [
      {
        field: 'Glucose Level',
        measurements: [
          {
            value: '5,6',
            unit: 'mmol/L',
          },
        ],
        timestamp: new Date(),
        isReviewed: true,
      },
      {
        field: 'Blood pressure',
        measurements: [
          {
            value: '121',
            unit: 'SIS',
          },
          {
            value: '78',
            unit: 'DIA',
          },
        ],
        timestamp: new Date(),
        isReviewed: true,
      },
      {
        field: 'Blood Oxygen',
        measurements: [
          {
            value: '98',
            unit: '%Sp02',
          },
        ],
        timestamp: new Date(),
        isReviewed: true,
      },
      {
        field: 'Heart rhythm',
        measurements: [
          {
            value: '84',
            unit: 'LPM',
          },
        ],
        timestamp: new Date(),
        isReviewed: true,
      },
      {
        field: 'Body temperature',
        measurements: [
          {
            value: '36,7',
            unit: '°C',
          },
        ],
        timestamp: new Date(),
        isReviewed: true,
      },
      {
        field: 'Electrocardiogram',
        measurements: [],
        diagram: DummyImage.Electrocardiogram,
        timestamp: new Date(),
        isReviewed: true,
      },
    ],
  },
];

const healthParameterDetails = {
  GL: {
    field: 'GL',
    field_full: 'Glucose Level',
    data: [
      {
        label: 'Glucose Level',
        value: '5.6',
        unit: 'mmol/L',
      },
      {
        label: 'Measurement Time',
        value: 'After Lunch',
        unit: '',
      },
    ],
  },
};

export const healthParameterDetailsN = {
  GL: {
    field: 'GL',
    field_full: 'Glucose Level',
    data: [
      {
        label: 'Glucose Level',
        value: '5.6',
        unit: 'mmol/L',
      },
      {
        label: 'Measurement Time',
        value: 'After Lunch',
        unit: '',
      },
    ],
  },
  BP: {
    field: 'BP',
    field_full: 'Blood Pressure',
    data: [
      {
        label: 'Systolic Pressure',
        value: '121',
        unit: 'SIS',
      },
      {
        label: 'Diastolic Pressure',
        value: '78',
        unit: 'DIA',
      },
      {
        label: 'Average Heart Rate',
        value: '84',
        unit: 'LPM',
      },
    ],
  },
  HR: {
    field: 'HR',
    field_full: 'Heart Rhythm',
    data: [
      {
        label: 'Heart Rate',
        value: '84',
        unit: 'LPM',
      },
      {
        label: 'Blood Oxygen',
        value: '98',
        unit: '%Sp02',
      },
    ],
  },
  BO: {
    field: 'BO',
    field_full: 'Blood Oxygen',
    data: [
      {
        label: 'Blood Oxygen',
        value: '98',
        unit: '%Sp02',
      },
      {
        label: 'Average Heart Rate',
        value: '84',
        unit: 'LPM',
      },
    ],
  },
  BT: {
    field: 'BT',
    field_full: 'Body Temperature',
    data: [
      {
        label: 'Body Temperature',
        value: '36.7',
        unit: '°C',
      },
    ],
  },
  ECG: {
    field: 'ECG',
    field_full: 'Electrocardiogram',
    data: [
      {
        label: 'ECG Date',
        value: '16/2/2022 - 13:45 PM',
        unit: '',
      },
      {
        label: 'Average Heart Rate',
        value: '80',
        unit: 'LPM',
      },
      [
        {
          label: 'RR Max',
          value: 804,
          unit: 'ms',
        },
        {
          label: 'RR Min',
          value: 693,
          unit: 'ms',
        },
        {
          label: 'HRV',
          value: 28,
          unit: 'ms',
        },
      ],
      {
        label: 'Respiratory Rate',
        value: 19,
        unit: '',
      },
      {
        label: 'Mood',
        value: 'Relaxed',
        unit: '',
      },
    ],
  },
};

export const GlucoseDetail = [
  {
    label: 'Glucose Level',
    value: '5.6',
    unit: 'mmol/L',
  },
  {
    label: 'Measurement Time',
    value: 'After Lunch',
    unit: '',
  },
];

export const HSDG = [
  {
    month: 'July',
    sequence: 7,
    data: [
      {
        field: 'Glucose Level',
        measurements: [
          {
            value: '5.6',
            unit: 'mmol/L',
          },
        ],
        measurement_time: {
          value: 'After Lunch',
          unit: '',
        },
        timestamp: '2024-07-28T00:00:00Z',
        isReviewed: false,
      },
      {
        field: 'Blood pressure',
        measurements: [
          {
            value: '121',
            unit: 'SIS',
          },
          {
            value: '78',
            unit: 'DIA',
          },
        ],
        timestamp: '2024-07-28T00:00:00Z',
        isReviewed: true,
      },
      {
        field: 'Blood Oxygen',
        measurements: [
          {
            value: '98',
            unit: '%Sp02',
          },
        ],
        timestamp: '2024-07-28T00:00:00Z',
        isReviewed: true,
      },
      {
        field: 'Heart rhythm',
        measurements: [
          {
            value: '84',
            unit: 'LPM',
          },
        ],
        timestamp: '2024-07-28T00:00:00Z',
        isReviewed: true,
      },
      {
        field: 'Body temperature',
        measurements: [
          {
            value: '36.7',
            unit: '°C',
          },
        ],
        timestamp: '2024-07-28T00:00:00Z',
        isReviewed: true,
      },
      {
        field: 'Electrocardiogram',
        measurements: [],
        diagram: DummyImage.Electrocardiogram,
        timestamp: '2024-07-28T00:00:00Z',
        isReviewed: true,
      },
    ],
  },
  {
    month: 'June',
    sequence: 6,
    data: [
      {
        field: 'Glucose Level',
        measurements: [
          {
            value: '5.7',
            unit: 'mmol/L',
          },
        ],
        timestamp: '2024-06-28T00:00:00Z',
        isReviewed: true,
      },
      {
        field: 'Blood pressure',
        measurements: [
          {
            value: '123',
            unit: 'SIS',
          },
          {
            value: '80',
            unit: 'DIA',
          },
        ],
        timestamp: '2024-06-28T00:00:00Z',
        isReviewed: true,
      },
      {
        field: 'Blood Oxygen',
        measurements: [
          {
            value: '97',
            unit: '%Sp02',
          },
        ],
        timestamp: '2024-06-28T00:00:00Z',
        isReviewed: true,
      },
      {
        field: 'Heart rhythm',
        measurements: [
          {
            value: '83',
            unit: 'LPM',
          },
        ],
        timestamp: '2024-06-28T00:00:00Z',
        isReviewed: true,
      },
      {
        field: 'Body temperature',
        measurements: [
          {
            value: '36.6',
            unit: '°C',
          },
        ],
        timestamp: '2024-06-28T00:00:00Z',
        isReviewed: true,
      },
      {
        field: 'Electrocardiogram',
        measurements: [],
        diagram: DummyImage.Electrocardiogram,
        timestamp: '2024-06-28T00:00:00Z',
        isReviewed: true,
      },
    ],
  },
  {
    month: 'May',
    sequence: 5,
    data: [
      {
        field: 'Glucose Level',
        measurements: [
          {
            value: '5.8',
            unit: 'mmol/L',
          },
        ],
        timestamp: '2024-05-28T00:00:00Z',
        isReviewed: true,
      },
      {
        field: 'Blood pressure',
        measurements: [
          {
            value: '124',
            unit: 'SIS',
          },
          {
            value: '81',
            unit: 'DIA',
          },
        ],
        timestamp: '2024-05-28T00:00:00Z',
        isReviewed: true,
      },
      {
        field: 'Blood Oxygen',
        measurements: [
          {
            value: '97',
            unit: '%Sp02',
          },
        ],
        timestamp: '2024-05-28T00:00:00Z',
        isReviewed: true,
      },
      {
        field: 'Heart rhythm',
        measurements: [
          {
            value: '82',
            unit: 'LPM',
          },
        ],
        timestamp: '2024-05-28T00:00:00Z',
        isReviewed: true,
      },
      {
        field: 'Body temperature',
        measurements: [
          {
            value: '36.7',
            unit: '°C',
          },
        ],
        timestamp: '2024-05-28T00:00:00Z',
        isReviewed: true,
      },
      {
        field: 'Electrocardiogram',
        measurements: [],
        diagram: DummyImage.Electrocardiogram,
        timestamp: '2024-05-28T00:00:00Z',
        isReviewed: true,
      },
    ],
  },
  {
    month: 'April',
    sequence: 4,
    data: [
      {
        field: 'Glucose Level',
        measurements: [
          {
            value: '5.9',
            unit: 'mmol/L',
          },
        ],
        timestamp: '2024-04-28T00:00:00Z',
        isReviewed: true,
      },
      {
        field: 'Blood pressure',
        measurements: [
          {
            value: '122',
            unit: 'SIS',
          },
          {
            value: '79',
            unit: 'DIA',
          },
        ],
        timestamp: '2024-04-28T00:00:00Z',
        isReviewed: true,
      },
      {
        field: 'Blood Oxygen',
        measurements: [
          {
            value: '98',
            unit: '%Sp02',
          },
        ],
        timestamp: '2024-04-28T00:00:00Z',
        isReviewed: true,
      },
      {
        field: 'Heart rhythm',
        measurements: [
          {
            value: '85',
            unit: 'LPM',
          },
        ],
        timestamp: '2024-04-28T00:00:00Z',
        isReviewed: true,
      },
      {
        field: 'Body temperature',
        measurements: [
          {
            value: '36.5',
            unit: '°C',
          },
        ],
        timestamp: '2024-04-28T00:00:00Z',
        isReviewed: true,
      },
      {
        field: 'Electrocardiogram',
        measurements: [],
        diagram: DummyImage.Electrocardiogram,
        timestamp: '2024-04-28T00:00:00Z',
        isReviewed: true,
      },
    ],
  },
  {
    month: 'March',
    sequence: 3,
    data: [
      {
        field: 'Glucose Level',
        measurements: [
          {
            value: '6.0',
            unit: 'mmol/L',
          },
        ],
        timestamp: '2024-03-28T00:00:00Z',
        isReviewed: true,
      },
      {
        field: 'Blood pressure',
        measurements: [
          {
            value: '125',
            unit: 'SIS',
          },
          {
            value: '82',
            unit: 'DIA',
          },
        ],
        timestamp: '2024-03-28T00:00:00Z',
        isReviewed: true,
      },
      {
        field: 'Blood Oxygen',
        measurements: [
          {
            value: '96',
            unit: '%Sp02',
          },
        ],
        timestamp: '2024-03-28T00:00:00Z',
        isReviewed: true,
      },
      {
        field: 'Heart rhythm',
        measurements: [
          {
            value: '86',
            unit: 'LPM',
          },
        ],
        timestamp: '2024-03-28T00:00:00Z',
        isReviewed: true,
      },
      {
        field: 'Body temperature',
        measurements: [
          {
            value: '36.4',
            unit: '°C',
          },
        ],
        timestamp: '2024-03-28T00:00:00Z',
        isReviewed: true,
      },
      {
        field: 'Electrocardiogram',
        measurements: [],
        diagram: DummyImage.Electrocardiogram,
        timestamp: '2024-03-28T00:00:00Z',
        isReviewed: true,
      },
    ],
  },
  {
    month: 'February',
    sequence: 2,
    data: [
      {
        field: 'Glucose Level',
        measurements: [
          {
            value: '5.5',
            unit: 'mmol/L',
          },
        ],
        timestamp: '2024-02-28T00:00:00Z',
        isReviewed: true,
      },
      {
        field: 'Blood pressure',
        measurements: [
          {
            value: '120',
            unit: 'SIS',
          },
          {
            value: '77',
            unit: 'DIA',
          },
        ],
        timestamp: '2024-02-28T00:00:00Z',
        isReviewed: true,
      },
      {
        field: 'Blood Oxygen',
        measurements: [
          {
            value: '98',
            unit: '%Sp02',
          },
        ],
        timestamp: '2024-02-28T00:00:00Z',
        isReviewed: true,
      },
      {
        field: 'Heart rhythm',
        measurements: [
          {
            value: '85',
            unit: 'LPM',
          },
        ],
        timestamp: '2024-02-28T00:00:00Z',
        isReviewed: true,
      },
      {
        field: 'Body temperature',
        measurements: [
          {
            value: '36.8',
            unit: '°C',
          },
        ],
        timestamp: '2024-02-28T00:00:00Z',
        isReviewed: true,
      },
      {
        field: 'Electrocardiogram',
        measurements: [],
        diagram: DummyImage.Electrocardiogram,
        timestamp: '2024-02-28T00:00:00Z',
        isReviewed: true,
      },
    ],
  },
  {
    month: 'January',
    sequence: 1,
    data: [
      {
        field: 'Glucose Level',
        measurements: [
          {
            value: '5.4',
            unit: 'mmol/L',
          },
        ],
        timestamp: '2024-01-28T00:00:00Z',
        isReviewed: true,
      },
      {
        field: 'Blood pressure',
        measurements: [
          {
            value: '119',
            unit: 'SIS',
          },
          {
            value: '76',
            unit: 'DIA',
          },
        ],
        timestamp: '2024-01-28T00:00:00Z',
        isReviewed: true,
      },
      {
        field: 'Blood Oxygen',
        measurements: [
          {
            value: '99',
            unit: '%Sp02',
          },
        ],
        timestamp: '2024-01-28T00:00:00Z',
        isReviewed: true,
      },
      {
        field: 'Heart rhythm',
        measurements: [
          {
            value: '84',
            unit: 'LPM',
          },
        ],
        timestamp: '2024-01-28T00:00:00Z',
        isReviewed: true,
      },
      {
        field: 'Body temperature',
        measurements: [
          {
            value: '36.7',
            unit: '°C',
          },
        ],
        timestamp: '2024-01-28T00:00:00Z',
        isReviewed: true,
      },
      {
        field: 'Electrocardiogram',
        measurements: [],
        diagram: DummyImage.Electrocardiogram,
        timestamp: '2024-01-28T00:00:00Z',
        isReviewed: true,
      },
    ],
  },
];

export const HSDGN = [
  {
    month: 'July',
    sequence: 7,
    data: [
      {
        field: 'GL',
        field_full: 'Glucose Level',
        measurements: [
          {
            value: '5.6',
            unit: 'mmol/L',
          },
        ],
        measurement_time: {
          value: 'After Lunch',
          unit: '',
        },
        timestamp: '2024-07-28T00:00:00Z',
        isReviewed: false,
      },
      {
        field: 'BP',
        field_full: 'Blood Pressure',
        measurements: [
          {
            value: '121',
            unit: 'SIS',
          },
          {
            value: '78',
            unit: 'DIA',
          },
        ],
        timestamp: '2024-07-28T00:00:00Z',
        isReviewed: true,
      },
      {
        field: 'BO',
        field_full: 'Blood Oxygen',
        measurements: [
          {
            value: '98',
            unit: '%Sp02',
          },
        ],
        timestamp: '2024-07-28T00:00:00Z',
        isReviewed: true,
      },
      {
        field: 'HR',
        field_full: 'Heart Rhythm',
        measurements: [
          {
            value: '84',
            unit: 'LPM',
          },
        ],
        timestamp: '2024-07-28T00:00:00Z',
        isReviewed: true,
      },
      {
        field: 'BT',
        field_full: 'Body Temperature',
        measurements: [
          {
            value: '36.7',
            unit: '°C',
          },
        ],
        timestamp: '2024-07-28T00:00:00Z',
        isReviewed: true,
      },
      {
        field: 'ECG',
        field_full: 'Electrocardiogram',
        measurements: [],
        diagram: DummyImage.Electrocardiogram,
        timestamp: '2024-07-28T00:00:00Z',
        isReviewed: true,
      },
    ],
  },
  {
    month: 'June',
    sequence: 6,
    data: [
      {
        field: 'GL',
        field_full: 'Glucose Level',
        measurements: [
          {
            value: '5.7',
            unit: 'mmol/L',
          },
        ],
        timestamp: '2024-06-28T00:00:00Z',
        isReviewed: true,
      },
      {
        field: 'BP',
        field_full: 'Blood Pressure',
        measurements: [
          {
            value: '123',
            unit: 'SIS',
          },
          {
            value: '80',
            unit: 'DIA',
          },
        ],
        timestamp: '2024-06-28T00:00:00Z',
        isReviewed: true,
      },
      {
        field: 'BO',
        field_full: 'Blood Oxygen',
        measurements: [
          {
            value: '97',
            unit: '%Sp02',
          },
        ],
        timestamp: '2024-06-28T00:00:00Z',
        isReviewed: true,
      },
      {
        field: 'HR',
        field_full: 'Heart Rhythm',
        measurements: [
          {
            value: '83',
            unit: 'LPM',
          },
        ],
        timestamp: '2024-06-28T00:00:00Z',
        isReviewed: true,
      },
      {
        field: 'BT',
        field_full: 'Body Temperature',
        measurements: [
          {
            value: '36.6',
            unit: '°C',
          },
        ],
        timestamp: '2024-06-28T00:00:00Z',
        isReviewed: true,
      },
      {
        field: 'ECG',
        field_full: 'Electrocardiogram',
        measurements: [],
        diagram: DummyImage.Electrocardiogram,
        timestamp: '2024-06-28T00:00:00Z',
        isReviewed: true,
      },
    ],
  },
  {
    month: 'May',
    sequence: 5,
    data: [
      {
        field: 'GL',
        field_full: 'Glucose Level',
        measurements: [
          {
            value: '5.8',
            unit: 'mmol/L',
          },
        ],
        timestamp: '2024-05-28T00:00:00Z',
        isReviewed: true,
      },
      {
        field: 'BP',
        field_full: 'Blood Pressure',
        measurements: [
          {
            value: '124',
            unit: 'SIS',
          },
          {
            value: '81',
            unit: 'DIA',
          },
        ],
        timestamp: '2024-05-28T00:00:00Z',
        isReviewed: true,
      },
      {
        field: 'BO',
        field_full: 'Blood Oxygen',
        measurements: [
          {
            value: '97',
            unit: '%Sp02',
          },
        ],
        timestamp: '2024-05-28T00:00:00Z',
        isReviewed: true,
      },
      {
        field: 'HR',
        field_full: 'Heart Rhythm',
        measurements: [
          {
            value: '82',
            unit: 'LPM',
          },
        ],
        timestamp: '2024-05-28T00:00:00Z',
        isReviewed: true,
      },
      {
        field: 'BT',
        field_full: 'Body Temperature',
        measurements: [
          {
            value: '36.7',
            unit: '°C',
          },
        ],
        timestamp: '2024-05-28T00:00:00Z',
        isReviewed: true,
      },
      {
        field: 'ECG',
        field_full: 'Electrocardiogram',
        measurements: [],
        diagram: DummyImage.Electrocardiogram,
        timestamp: '2024-05-28T00:00:00Z',
        isReviewed: true,
      },
    ],
  },
  {
    month: 'April',
    sequence: 4,
    data: [
      {
        field: 'GL',
        field_full: 'Glucose Level',
        measurements: [
          {
            value: '5.9',
            unit: 'mmol/L',
          },
        ],
        timestamp: '2024-04-28T00:00:00Z',
        isReviewed: true,
      },
      {
        field: 'BP',
        field_full: 'Blood Pressure',
        measurements: [
          {
            value: '122',
            unit: 'SIS',
          },
          {
            value: '79',
            unit: 'DIA',
          },
        ],
        timestamp: '2024-04-28T00:00:00Z',
        isReviewed: true,
      },
      {
        field: 'BO',
        field_full: 'Blood Oxygen',
        measurements: [
          {
            value: '98',
            unit: '%Sp02',
          },
        ],
        timestamp: '2024-04-28T00:00:00Z',
        isReviewed: true,
      },
      {
        field: 'HR',
        field_full: 'Heart Rhythm',
        measurements: [
          {
            value: '85',
            unit: 'LPM',
          },
        ],
        timestamp: '2024-04-28T00:00:00Z',
        isReviewed: true,
      },
      {
        field: 'BT',
        field_full: 'Body Temperature',
        measurements: [
          {
            value: '36.5',
            unit: '°C',
          },
        ],
        timestamp: '2024-04-28T00:00:00Z',
        isReviewed: true,
      },
      {
        field: 'ECG',
        field_full: 'Electrocardiogram',
        measurements: [],
        diagram: DummyImage.Electrocardiogram,
        timestamp: '2024-04-28T00:00:00Z',
        isReviewed: true,
      },
    ],
  },
  {
    month: 'March',
    sequence: 3,
    data: [
      {
        field: 'GL',
        field_full: 'Glucose Level',
        measurements: [
          {
            value: '6.0',
            unit: 'mmol/L',
          },
        ],
        timestamp: '2024-03-28T00:00:00Z',
        isReviewed: true,
      },
      {
        field: 'BP',
        field_full: 'Blood Pressure',
        measurements: [
          {
            value: '125',
            unit: 'SIS',
          },
          {
            value: '82',
            unit: 'DIA',
          },
        ],
        timestamp: '2024-03-28T00:00:00Z',
        isReviewed: true,
      },
      {
        field: 'BO',
        field_full: 'Blood Oxygen',
        measurements: [
          {
            value: '96',
            unit: '%Sp02',
          },
        ],
        timestamp: '2024-03-28T00:00:00Z',
        isReviewed: true,
      },
      {
        field: 'HR',
        field_full: 'Heart Rhythm',
        measurements: [
          {
            value: '86',
            unit: 'LPM',
          },
        ],
        timestamp: '2024-03-28T00:00:00Z',
        isReviewed: true,
      },
      {
        field: 'BT',
        field_full: 'Body Temperature',
        measurements: [
          {
            value: '36.4',
            unit: '°C',
          },
        ],
        timestamp: '2024-03-28T00:00:00Z',
        isReviewed: true,
      },
      {
        field: 'ECG',
        field_full: 'Electrocardiogram',
        measurements: [],
        diagram: DummyImage.Electrocardiogram,
        timestamp: '2024-03-28T00:00:00Z',
        isReviewed: true,
      },
    ],
  },
  {
    month: 'February',
    sequence: 2,
    data: [
      {
        field: 'GL',
        field_full: 'Glucose Level',
        measurements: [
          {
            value: '5.5',
            unit: 'mmol/L',
          },
        ],
        timestamp: '2024-02-28T00:00:00Z',
        isReviewed: true,
      },
      {
        field: 'BP',
        field_full: 'Blood Pressure',
        measurements: [
          {
            value: '120',
            unit: 'SIS',
          },
          {
            value: '77',
            unit: 'DIA',
          },
        ],
        timestamp: '2024-02-28T00:00:00Z',
        isReviewed: true,
      },
      {
        field: 'BO',
        field_full: 'Blood Oxygen',
        measurements: [
          {
            value: '98',
            unit: '%Sp02',
          },
        ],
        timestamp: '2024-02-28T00:00:00Z',
        isReviewed: true,
      },
      {
        field: 'HR',
        field_full: 'Heart Rhythm',
        measurements: [
          {
            value: '85',
            unit: 'LPM',
          },
        ],
        timestamp: '2024-02-28T00:00:00Z',
        isReviewed: true,
      },
      {
        field: 'BT',
        field_full: 'Body Temperature',
        measurements: [
          {
            value: '36.8',
            unit: '°C',
          },
        ],
        timestamp: '2024-02-28T00:00:00Z',
        isReviewed: true,
      },
      {
        field: 'ECG',
        field_full: 'Electrocardiogram',
        measurements: [],
        diagram: DummyImage.Electrocardiogram,
        timestamp: '2024-02-28T00:00:00Z',
        isReviewed: true,
      },
    ],
  },
  {
    month: 'January',
    sequence: 1,
    data: [
      {
        field: 'GL',
        field_full: 'Glucose Level',
        measurements: [
          {
            value: '5.4',
            unit: 'mmol/L',
          },
        ],
        timestamp: '2024-01-28T00:00:00Z',
        isReviewed: true,
      },
      {
        field: 'BP',
        field_full: 'Blood Pressure',
        measurements: [
          {
            value: '119',
            unit: 'SIS',
          },
          {
            value: '76',
            unit: 'DIA',
          },
        ],
        timestamp: '2024-01-28T00:00:00Z',
        isReviewed: true,
      },
      {
        field: 'BO',
        field_full: 'Blood Oxygen',
        measurements: [
          {
            value: '99',
            unit: '%Sp02',
          },
        ],
        timestamp: '2024-01-28T00:00:00Z',
        isReviewed: true,
      },
      {
        field: 'HR',
        field_full: 'Heart Rhythm',
        measurements: [
          {
            value: '84',
            unit: 'LPM',
          },
        ],
        timestamp: '2024-01-28T00:00:00Z',
        isReviewed: true,
      },
      {
        field: 'BT',
        field_full: 'Body Temperature',
        measurements: [
          {
            value: '36.7',
            unit: '°C',
          },
        ],
        timestamp: '2024-01-28T00:00:00Z',
        isReviewed: true,
      },
      {
        field: 'ECG',
        field_full: 'Electrocardiogram',
        measurements: [],
        diagram: DummyImage.Electrocardiogram,
        timestamp: '2024-01-28T00:00:00Z',
        isReviewed: true,
      },
    ],
  },
];
