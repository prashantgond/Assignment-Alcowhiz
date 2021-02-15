import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

const Loader = props => {
    return (
        <View style={styles.Conatiner}>
            <View style={styles.InnerContainer}>
                <View style={{ flex: 3 }}>
                    <ActivityIndicator size="large" color='#259F59' />
                </View>
                <View style={{ flex: 7 }}>
                    <Text style={styles.textStyle}>
                        {'Please wait...'}
                    </Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    Conatiner: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    InnerContainer: {
        height: 100,
        width: 320,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 5,
        flexDirection: 'row'
    },
    textStyle: {
        fontSize: 16,
        color: '#000',
        fontWeight: '600',
    }
});

export default Loader;