import React from 'react';

import {
  View,
  Image,
  StyleSheet,
} from 'react-native';

export default function SplashScreen({
  navigation,
}) {
  

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/splash-image.png')}
        style={styles.image}
        resizeMode="cover"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  image: {
    width: '100%',
    height: '100%',
  },
});