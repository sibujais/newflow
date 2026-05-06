import React, { useState } from 'react';

import {
  View,
  StyleSheet,
  ScrollView,
  Pressable,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { Formik } from 'formik';
import { useSelector } from 'react-redux';
import ScreenWrapper from '../../components/common/ScreenWrapper';
import AppText from '../../components/common/AppText';
import AppInput from '../../components/common/AppInput';
import AppButton from '../../components/common/AppButton';

import { SPACING } from '../../theme/spacing';
import { FONT_SIZE } from '../../theme/typography';
import { COLORS } from '../../theme/colors'
import { registerValidationSchema } from '../../utils/validationSchemas';
import { useDispatch } from 'react-redux';
import {registerUser} from '../../redux/slices/authSlice';
import AppSnackbar from '../../components/common/AppSnackbar';

export default function RegisterScreen({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarType, setSnackbarType] = useState('default');

  const { registeredUsers } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const handleRegister = values => {
    setLoading(true);

    setTimeout(() => {
      const userExists = registeredUsers.some(user => user.email === values.email);

      if (userExists) {
        setSnackbarMessage('User already exists. Try another email.');
        setSnackbarVisible(true);
        setLoading(false);

        return;
      }
      const userData = {
        id: Date.now(),
        name: values.name,
        email: values.email,
        password: values.password,
      };

      dispatch(registerUser(userData));

      setSnackbarMessage('Registration successful');
      setSnackbarType('success');
      setSnackbarVisible(true);

      setTimeout(() => {
        navigation.goBack()
      }, 900);

      setLoading(false);
    }, 1000);
  };

  return (
    <ScreenWrapper>
      <KeyboardAvoidingView
        behavior={
          Platform.OS === 'ios'
            ? 'padding'
            : 'height'
        }
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback
          onPress={Keyboard.dismiss}
        >
          <ScrollView
            contentContainerStyle={styles.container}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <AppText style={styles.title}>
              Create Account
            </AppText>

            <Formik
              initialValues={{
                name: '',
                email: '',
                password: '',
                confirmPassword: '',
              }}
              validationSchema={registerValidationSchema}
              onSubmit={handleRegister}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
              }) => (
                <>
                  <AppInput
                    label="Name"
                    placeholder="Enter name"
                    value={values.name}
                    onChangeText={handleChange('name')}
                    onBlur={handleBlur('name')}
                    error={
                      touched.name &&
                      errors.name
                    }
                  />

                  <AppInput
                    label="Email"
                    placeholder="Enter email"
                    keyboardType="email-address"
                    returnKeyType="next"
                    autoCapitalize="none"
                    value={values.email}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    error={
                      touched.email &&
                      errors.email
                    }
                  />

                  <AppInput
                    label="Password"
                    placeholder="Enter password"
                    returnKeyType="next"
                    // secureTextEntry
                    isPassword
                    value={values.password}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    error={
                      touched.password &&
                      errors.password
                    }
                  />
                  <AppText style={styles.hint}>
                    Password must contain:
                    {'\n'}• 8+ characters
                    {'\n'}• uppercase letter
                    {'\n'}• lowercase letter
                    {'\n'}• number
                    {'\n'}• special character
                  </AppText>

                  <AppInput
                    label="Confirm Password"
                    placeholder="Confirm password"
                    returnKeyType="done"
                    // secureTextEntry
                    isPassword
                    value={values.confirmPassword}
                    onChangeText={handleChange('confirmPassword')}
                    onBlur={handleBlur('confirmPassword')}
                    error={
                      touched.confirmPassword &&
                      errors.confirmPassword
                    }
                  />

                  <AppButton
                    title="Register"
                    loading={loading}
                    onPress={handleSubmit}
                    style={styles.button}
                  />


                  <View style={styles.footer}>
                    <AppText>
                      Already have an account?
                    </AppText>

                    <Pressable
                      onPress={() => navigation.goBack()}
                    >
                      <AppText
                        style={styles.loginText}
                      >
                        Login
                      </AppText>
                    </Pressable>
                  </View>
                </>
              )}
            </Formik>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
      <AppSnackbar
        visible={snackbarVisible}
        message={snackbarMessage}
        type={snackbarType}
        onDismiss={() => setSnackbarVisible(false)}
      />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: SPACING.md,
  },

  title: {
    fontSize: FONT_SIZE.heading,
    fontWeight: '700',
    marginBottom: SPACING.xl,
  },

  button: {
    marginTop: SPACING.md,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: SPACING.xl,
  },

  loginText: {
    color: COLORS.primary,
    fontWeight: '700',
  },

  hint: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginBottom: SPACING.md,
  },
});