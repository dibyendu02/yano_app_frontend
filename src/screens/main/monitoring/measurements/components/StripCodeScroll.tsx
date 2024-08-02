import React, {useRef, useState} from 'react';
import {FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {Colors} from '../../../../../constants/Colors';

const StripCodeScroll = ({
  setCode,
}: {
  setCode: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const flatListRef = useRef<FlatList<string>>(null);
  const data = Array.from({length: 50}, (_, index) => `C${index + 1}`);

  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleScroll = (event: any) => {
    const contentOffsetY = event.nativeEvent.contentOffset.y;
    const _selectedIndex = Math.floor(contentOffsetY / 40); // Assuming each item has a height of 40
    setSelectedIndex(_selectedIndex);
    setCode(data[_selectedIndex]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.scrollContainer}>
        <FlatList
          ref={flatListRef}
          data={data}
          renderItem={({item, index}) => (
            <View style={styles.itemContainer}>
              <Text
                style={[
                  styles.itemText,
                  {
                    opacity:
                      index === selectedIndex
                        ? 1
                        : Math.abs(selectedIndex - index) === 1
                        ? 0.6
                        : 0.5,
                    fontSize:
                      index === selectedIndex
                        ? 24
                        : Math.abs(selectedIndex - index) === 1
                        ? 20
                        : 16,
                    fontWeight: index === selectedIndex ? 'bold' : 'normal',
                  },
                ]}>
                {item}
              </Text>
            </View>
          )}
          keyExtractor={item => item}
          getItemLayout={(data, index) => ({
            length: 40,
            offset: 40 * index,
            index,
          })}
          onScroll={handleScroll}
          initialScrollIndex={0} // Start with item 0 in the middle
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

export default StripCodeScroll;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: Colors.GhostWhite,
    width: 80,
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 30,
  },
  scrollContainer: {
    height: 200,
  },
  itemContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  itemText: {
    color: Colors.Blue,
  },
});
