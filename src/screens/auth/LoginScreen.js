import React, {useState } from 'react';

import {
  View,
  StyleSheet,
  Pressable,
  Alert,
  ScrollView, TouchableWithoutFeedback, Keyboard,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import { Snackbar } from 'react-native-paper';
import { Formik } from 'formik';

import { useDispatch, useSelector} from 'react-redux';

import ScreenWrapper from '../../components/common/ScreenWrapper';
import AppText from '../../components/common/AppText';
import AppInput from '../../components/common/AppInput';
import AppButton from '../../components/common/AppButton';
import AppImage from '../../components/common/AppImage';
import AppSnackbar from '../../components/common/AppSnackbar';

import { login } from '../../redux/slices/authSlice';
import { loginValidationSchema } from '../../utils/validationSchemas';
import { COLORS } from '../../theme/colors';
import { SPACING } from '../../theme/spacing';
import { FONT_SIZE } from '../../theme/typography';

export default function LoginScreen({ navigation }) {
  const dispatch = useDispatch();

  const { registeredUsers } = useSelector(state => state.auth);

  const [loading, setLoading] = useState(false);
  const [snackbarVisible,setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarType, setSnackbarType] = useState('default');

  const handleLogin = values => {
    setLoading(true);

    setTimeout(() => {
      const existingUser = registeredUsers.find(user => user.email === values.email );

      if (!existingUser) {
        setSnackbarMessage('User does not exist');
        setSnackbarType('error');
        setSnackbarVisible(true);
        setLoading(false);

        return;
      }

      if ( existingUser.password !== values.password ) {
        setSnackbarMessage('Incorrect password');
        setSnackbarType('error');
        setSnackbarVisible(true);
        setLoading(false);

        return;
      }

      setSnackbarMessage('Logged in successfully');
      setSnackbarType('success');
      setSnackbarVisible(true);

      setTimeout(() => {
        dispatch(login(existingUser));
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
            contentContainerStyle={ styles.container}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <AppImage
              source={require('../../assets/icon-rm-bg.png')}
              style={styles.logo}
            />

            <AppText style={styles.appName}>
              flow
            </AppText>

            <AppText style={styles.subtitle}>
              Welcome back
            </AppText>

            <Formik
              initialValues={{
                email: '',
                password: '',
              }}
              validationSchema={loginValidationSchema}
              onSubmit={handleLogin}
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
                    label="Email"
                    placeholder="Enter email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    returnKeyType="next"
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
                    returnKeyType="done"
                    isPassword
                    value={values.password}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    error={
                      touched.password &&
                      errors.password
                    }
                  />

                  <AppButton
                    title="Login"
                    loading={loading}
                    onPress={handleSubmit}
                    style={styles.button}
                  />

                  <View style={styles.footer}>
                    <AppText>
                      Don’t have an account?
                    </AppText>

                    <Pressable
                      onPress={() =>
                        navigation.navigate(
                          'Register',
                        )
                      }
                    >
                      <AppText
                        style={styles.registerText}
                      >
                        Register
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
        onDismiss={() =>
          setSnackbarVisible(false)
        }
      />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal:
      SPACING.lg,
    paddingTop: 80,
  },

  logo: {
    width: 110,
    height: 110,
    alignSelf: 'center',
  },


  appName: {
    fontSize: 34,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: SPACING.md,
    color: COLORS.primary
  },

  subtitle: {
    textAlign: 'center',
    color: COLORS.textSecondary,
    marginTop: SPACING.sm,
    marginBottom: 50,
  },

  button: {
    marginTop: SPACING.md,
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: SPACING.xl,
  },

  registerText: {
    color: COLORS.primary,
    fontWeight: '700',
  },
});