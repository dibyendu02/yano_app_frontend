import React from 'react';
import Card from '../cards/Card';

interface OptionsListProps {
  title?: string;
}

const OptionsList: React.FC<OptionsListProps> = ({title}) => {
  return <Card title={title}></Card>;
};

export default OptionsList;
