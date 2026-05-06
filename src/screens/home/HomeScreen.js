import React, { useState, useEffect, useCallback } from 'react';

import {
    View,
    StyleSheet,
    ActivityIndicator,
    RefreshControl,
    Pressable
} from 'react-native';

import { FlashList } from '@shopify/flash-list';
import ScreenWrapper from '../../components/common/ScreenWrapper';
import AppText from '../../components/common/AppText';
import { FONT_SIZE } from '../../theme/typography';
import PostCard from '../../components/cards/PostCard';
import { fetchPosts } from '../../api/posts';
import { COLORS } from '../../theme/colors';
import { SPACING } from '../../theme/spacing';
import AppInput from '../../components/common/AppInput';
import { useSelector } from 'react-redux';

export default function HomeScreen() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState('');
    const [page, setPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');


    const { user } = useSelector(state => state.auth);
    const POSTS_PER_PAGE = 10;

    const getPosts = async () => {
        try {
            setError('');

            const data = await fetchPosts();

            setPosts(data);

        } catch (err) {
            setError('Failed to fetch posts');
            console.log(err);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        getPosts();
    }, []);

    const filteredPosts = posts.filter(item => item.title.toLowerCase().includes(searchQuery.toLowerCase()));

    const paginatedPosts = filteredPosts.slice(0, page * POSTS_PER_PAGE);


    const loadMorePosts = () => {
        if (loadingMore || paginatedPosts.length >= filteredPosts.length) {
            return;
        }

        setLoadingMore(true);

        setTimeout(() => {
            setPage(prev => prev + 1);

            setLoadingMore(false);
        }, 1200);
    };
    const onRefresh = () => {
        setRefreshing(true);
        getPosts();
    };

    const renderItem = useCallback(({ item }) => { return <PostCard item={item} /> }, []);

    if (loading) {
        return (
            <ScreenWrapper
                style={styles.loaderContainer}
            >
                <ActivityIndicator
                    size="large"
                    color={COLORS.primary}
                />
            </ScreenWrapper>
        );
    }

    if (error) {
        return (
            <ScreenWrapper
                style={styles.loaderContainer}
            >
                <AppText>
                    {error}
                </AppText>
            </ScreenWrapper>
        );
    }

    return (
        <ScreenWrapper>
            <View style={styles.container}>
                <View style={styles.header}>

                    <AppText style={styles.heading}>
                        {"Welcome, "}<AppText style={styles.greeting}>
                            {user?.name}
                        </AppText>
                    </AppText>
                </View>

                <AppInput
                    placeholder="Search posts..."
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />



                <FlashList
                    data={paginatedPosts}
                    renderItem={renderItem}
                    estimatedItemSize={160}
                    keyExtractor={item =>
                        item.id.toString()
                    }
                    showsVerticalScrollIndicator={
                        false
                    }
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                    ListEmptyComponent={
                        <View style={styles.emptyContainer}>
                            <AppText style={styles.emptyText}>
                                No posts found
                            </AppText>
                        </View>
                    }
                    contentContainerStyle={{paddingBottom: 120}}
                    onEndReached={loadMorePosts}
                    onEndReachedThreshold={0.5}
                    ListFooterComponent={
                        paginatedPosts.length < filteredPosts.length ? loadingMore ? (
                            <ActivityIndicator
                                size="large"
                                color={COLORS.primary}
                            />
                        ) : null
                            : null

                    }
                />
            </View>
        </ScreenWrapper>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: SPACING.md,
    },

    heading: {
        fontSize: FONT_SIZE.heading,
        fontWeight: '700',
        marginVertical: SPACING.lg,
    },

    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15
    },
    filterContainer: {
        flexDirection: 'row',
        marginBottom: SPACING.md,
    },

    filterChip: {
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.sm,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: COLORS.border,
        marginRight: SPACING.sm,
    },

    selectedChip: {
        backgroundColor: COLORS.primary,
        borderColor: COLORS.primary,
    },

    chipText: {
        fontSize: 13,
    },

    selectedChipText: {
        color: '#FFFFFF',
    },

    emptyContainer: {
        marginTop: 80,
        alignItems: 'center',
    },

    emptyText: {
        color: COLORS.textSecondary,
    },
    header: {
        marginVertical: SPACING.md,
    },

    greeting: {
        color: COLORS.textSecondary,
        marginBottom: 4,
    },

});