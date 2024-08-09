import {useEffect, useRef} from 'react';
import {Animated, View} from 'react-native';
import {StyleSheet} from 'react-native';
import {StaticImage} from '.';

const HeartAnimation = () => {
  // Create an animated value
  const scaleValue = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Define the animation sequence
    const animate = () => {
      Animated.sequence([
        Animated.timing(scaleValue, {
          toValue: 1.2, // Scale up
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(scaleValue, {
          toValue: 1, // Scale down to normal
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start(() => {
        animate(); // Loop the animation
      });
    };

    animate(); // Start the animation
  }, [scaleValue]);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={StaticImage.HeartIcon} // Replace with your image path
        style={[styles.heart, {transform: [{scale: scaleValue}]}]}
      />
    </View>
  );
};

export default HeartAnimation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heart: {
    width: 30, // Adjust size as needed
    height: 27,
  },
});
