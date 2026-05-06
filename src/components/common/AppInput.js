

import React, {
  useState,
} from 'react';

import {
  View,
  TextInput,
  StyleSheet,
  Pressable,
} from 'react-native';

import Ionicons
  from 'react-native-vector-icons/Ionicons';
import AppText from './AppText';
import { COLORS } from '../../theme/colors';
import { SPACING } from '../../theme/spacing';

export default function AppInput({
  label,
  error,
  isPassword,
  style,
  ...props
}) {
  const [secureText, setSecureText] = useState(isPassword);

  return (
    <View style={styles.container}>
      {label ? (
        <AppText style={styles.label}>
          {label}
        </AppText>
      ) : null}

      <View style={styles.inputContainer}>
        <TextInput
          placeholderTextColor={COLORS.textSecondary}
          style={[
            styles.input,
            error && styles.errorInput,
            style,
          ]}
          secureTextEntry={secureText}
          {...props}
        />

        {isPassword ? (
          <Pressable
            onPress={() =>
              setSecureText(
                !secureText,
              )
            }
            style={styles.eyeButton}
          >
            <Ionicons
              name={
                secureText
                  ? 'eye-off'
                  : 'eye'
              }
              size={22}
              color={
                COLORS.textSecondary
              }
            />
          </Pressable>
        ) : null}
      </View>

      {error ? (
        <AppText style={styles.error}>
          {error}
        </AppText>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.md,
    width: '100%',
  },

  label: {
    marginBottom: SPACING.sm,
    fontWeight: '600',
  },

  inputContainer: {
    position: 'relative',
    justifyContent: 'center',
  },

  input: {
    width: '100%',
    height: 56,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 16,
    paddingHorizontal: SPACING.md,
    backgroundColor:
      COLORS.cardBackground,
    color: COLORS.textPrimary,
    paddingRight: 50,
  },

  eyeButton: {
    position: 'absolute',
    right: 16,
  },

  errorInput: {
    borderColor: COLORS.error,
  },

  error: {
    marginTop: 6,
    color: COLORS.error,
    fontSize: 13,
  },
});