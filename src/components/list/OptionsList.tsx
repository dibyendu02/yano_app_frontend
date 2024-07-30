/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import Card from '../cards/Card';
import {FlatList, ListRenderItem, View} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

interface OptionsListProps {
  title?: string;
  data: Array<any>;
  renderItem: ListRenderItem<any>;
}

const OptionsList: React.FC<OptionsListProps> = ({
  title,
  data = [],
  renderItem = () => null,
}) => {
  return (
    <Card title={title}>
      <FlatList
        data={data}
        renderItem={renderItem}
        ItemSeparatorComponent={() => (
          <View
            style={{
              height: 1,
              width: '100%',
              backgroundColor: Colors.LightGray,
              alignSelf: 'center',
            }}
          />
        )}
      />
    </Card>
  );
};

export default OptionsList;
