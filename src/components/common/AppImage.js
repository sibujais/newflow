import React from 'react';

import {
  Image,
  StyleSheet,
} from 'react-native';

export default function AppImage({
  source,
  style,
  resizeMode = 'contain',
}) {
  return (
    <Image
      source={source}
      resizeMode={resizeMode}
      style={[styles.image, style]}
    />
  );
}

const styles = StyleSheet.create({
  image: {},
});