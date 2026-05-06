import React from 'react';
import {
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
} from 'react-native';

import AppText from './AppText';

import { COLORS } from '../../theme/colors';
import { SPACING } from '../../theme/spacing';

export default function AppButton({
    title,
    onPress,
    loading,
    style,
}) {
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={onPress}
            disabled={loading}
            style={[styles.button, style]}
        >
            {loading ? (
                <ActivityIndicator color="#FFFFFF" />
            ) : (
                <AppText style={styles.title}>
                    {title}
                </AppText>
            )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        height: 52,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.primary,
        elevation: 3,

        shadowColor: '#000',

        shadowOffset: {
            width: 0,
            height: 2,
        },

        shadowOpacity: 0.1,

        shadowRadius: 4,
    },

    title: {
        color: '#FFFFFF',
        fontWeight: '600',
        fontSize: 16,
    },

});