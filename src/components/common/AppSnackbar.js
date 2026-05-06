import React from 'react';

import {View,StyleSheet} from 'react-native';

import {Snackbar} from 'react-native-paper';

import { COLORS } from '../../theme/colors';

export default function AppSnackbar({
  visible,
  message,
  onDismiss,
  type = 'default',
}) {
  const backgroundColor =
    type === 'error'
      ? COLORS.error
      : type === 'success'
      ? '#16A34A'
      : '#323232';

  return (
    <View style={styles.wrapper}>
      <Snackbar
        visible={visible}
        onDismiss={onDismiss}
        duration={2200}
        style={[
          styles.snackbar,
          {
            backgroundColor,
          },
        ]}
      >
        {message}
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 30,
    width: '100%',
    alignItems: 'center',
  },

  snackbar: {
    borderRadius: 16,
    maxWidth: '92%',
    alignSelf: 'center',
  },
});