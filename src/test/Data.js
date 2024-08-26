import {DummyImage} from '../assets/dummy/images';

export const patientList = [
  {name: 'María Clemente'},
  {name: 'Juan Torres'},
  {name: 'Jorge Pardo'},
  {name: 'Ana López'},
  {name: 'Carlos Sánchez'},
  {name: 'Lucía Martínez'},
  {name: 'Miguel Fernández'},
  {name: 'Laura García'},
  {name: 'Daniel Rodríguez'},
  {name: 'Sofía Pérez'},
  {name: 'Alejandro Gómez'},
  {name: 'Isabel Morales'},
  {name: 'Fernando Ortiz'},
  {name: 'Cristina Ruiz'},
  {name: 'Roberto Torres'},
  {name: 'Marta Flores'},
  {name: 'Alberto Ramírez'},
];

export const measurements = [
  {
    field: 'Blood glucose',
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
];

export const userData = {
  name: 'María Clemente',
  blood: 'O+',
  gender: 'Female',
  height: '186 cm',
  weight: '64 kg',
  age: '67 years',
};
