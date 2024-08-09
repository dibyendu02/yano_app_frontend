import React, {FC, useState, useEffect} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {Colors} from '../../../../../constants/Colors';

interface StripCodeScrollProps {
  setCode: React.Dispatch<React.SetStateAction<string>>;
}

const StripCodeScroll: FC<StripCodeScrollProps> = ({setCode}) => {
  const [middleItem, setMiddleItem] = useState('C20'); // Default value to avoid null issues

  const handleViewableItemsChanged = ({viewableItems}: any) => {
    if (viewableItems && viewableItems.length > 0) {
      const middleIndex = Math.floor(viewableItems.length / 2);
      const newMiddleItem = viewableItems[middleIndex]?.item || 'C20'; // Fallback to 'C20' if undefined
      setMiddleItem(newMiddleItem);
      setCode(newMiddleItem);
    }
  };

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 100, // Item is considered visible if it is 100% visible
  };

  const data = Array.from({length: 50}, (_, i) => `C${i + 14}`);

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        contentContainerStyle={{alignItems: 'center'}}
        style={{width: '100%'}}
        showsVerticalScrollIndicator={false}
        snapToInterval={40}
        decelerationRate="fast"
        bounces={false}
        onViewableItemsChanged={handleViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        renderItem={({item}) => (
          <View style={styles.itemContainer}>
            <Text
              style={[
                styles.itemText,
                item === middleItem && styles.selectedText,
              ]}>
              {item}
            </Text>
          </View>
        )}
        keyExtractor={item => item}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.BlueGrey,
    paddingHorizontal: 25,
    borderRadius: 20,
  },
  itemContainer: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  itemText: {
    fontSize: 18,
    color: Colors.Grey,
  },
  selectedText: {
    fontSize: 24,
    color: Colors.Blue,
    fontWeight: 'bold',
  },
});

export default StripCodeScroll;
