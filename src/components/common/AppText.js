import React from 'react';
import { Text, StyleSheet } from 'react-native';

import { COLORS } from '../../theme/colors';
import { FONT_SIZE } from '../../theme/typography';

export default function AppText({
  children,
  style,
  numberOfLines,
  onPress
}) {
  return (
    <Text
      numberOfLines={numberOfLines}
      style={[styles.text, style]}
      onPress={onPress}
    >
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    color: COLORS.textPrimary,
    fontSize: FONT_SIZE.body,
  },
});