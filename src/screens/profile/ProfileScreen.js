import React from 'react';

import {View,StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import ScreenWrapper from '../../components/common/ScreenWrapper';
import AppText from '../../components/common/AppText';
import AppButton from '../../components/common/AppButton';
import { logout } from '../../redux/slices/authSlice';
import { COLORS } from '../../theme/colors';
import { FONT_SIZE } from '../../theme/typography';
import { SPACING } from '../../theme/spacing';

export default function ProfileScreen() {
    const dispatch = useDispatch();

    const {user} = useSelector(state => state.auth);

    const initials = user?.name
        ?.split(' ')
        ?.map(word => word[0])
        ?.join('')
        ?.toUpperCase();

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <ScreenWrapper>
            <View style={styles.container}>
                <View style={styles.avatar}>
                    <AppText style={styles.initials}>
                        {initials}
                    </AppText>
                </View>

                <AppText style={styles.name}>
                    {user?.name}
                </AppText>

                <AppText style={styles.email}>
                    {user?.email}
                </AppText>

                <View style={styles.infoCard}>
                    <AppText style={styles.infoTitle}>
                        Account Status
                    </AppText>

                    <AppText>
                        Logged In
                    </AppText>
                </View>

                <AppButton
                    title="Logout"
                    onPress={handleLogout}
                    style={styles.button}
                />
            </View>
        </ScreenWrapper>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: SPACING.lg,
    },

    avatar: {
        width: 110,
        height: 110,
        borderRadius: 55,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: SPACING.xl,
    },

    initials: {
        color: '#FFFFFF',
        fontSize: 32,
        fontWeight: '700',
    },

    name: {
        marginTop: SPACING.lg,
        fontSize: FONT_SIZE.title,
        fontWeight: '700',
    },

    email: {
        marginTop: SPACING.sm,
        color: COLORS.textSecondary,
    },

    infoCard: {
        width: '100%',
        padding: SPACING.lg,
        borderRadius: 16,
        backgroundColor: COLORS.cardBackground,
        marginTop: SPACING.xl,
        borderWidth: 1,
        borderColor: COLORS.border,
    },

    infoTitle: {
        fontWeight: '700',
        marginBottom: SPACING.sm,
    },

    button: {
        width: '100%',
        marginTop: SPACING.xl,
    },
});