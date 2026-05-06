import React from 'react';

import { View, StyleSheet } from 'react-native';
import AppText from '../common/AppText';
import { COLORS } from '../../theme/colors';
import { SPACING } from '../../theme/spacing';

export default function PostCard({ item}) {
    const initials = `U${item.userId}`;

    return (
        <View style={styles.card}>
            <View style={styles.header}>
                <View style={styles.avatar}>
                    <AppText style={styles.initials}>
                        {initials}
                    </AppText>
                </View>

                <AppText style={styles.user}>
                    User {item.userId}
                </AppText>
            </View>

            <AppText style={styles.title}>
                {item.title}
            </AppText>

            <View style={styles.bodyContainer}>
                <AppText style={styles.body}>
                    {item.body}
                </AppText>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        padding: SPACING.md,
        borderRadius: 18,
        backgroundColor: COLORS.cardBackground,
        marginBottom: SPACING.md,
        borderWidth: 1,
        borderColor: COLORS.border,
        elevation: 2,

        shadowColor: '#000',

        shadowOffset: {
            width: 0,
            height: 2,
        },

        shadowOpacity: 0.06,

        shadowRadius: 4,
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: SPACING.md,
    },

    avatar: {
        width: 42,
        height: 42,
        borderRadius: 50,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },

    initials: {
        color: '#FFFFFF',
        fontWeight: '700',
    },

    user: {
        marginLeft: SPACING.sm,
        fontWeight: '600',
    },

    title: {
        fontWeight: '700',
        marginBottom: SPACING.sm,
        textTransform: 'capitalize',
    },

    bodyContainer: {
        marginTop: SPACING.md,
        backgroundColor:
            COLORS.inputBackground ||
            '#F5F7FA',
        borderRadius: 14,
        padding: SPACING.md,
    },

    body: {
        lineHeight: 22,
        color: COLORS.textSecondary,
    },
});