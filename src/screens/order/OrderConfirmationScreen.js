import AsyncStorage from '@react-native-community/async-storage';
import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import TopBar from '../../component/TopBar';
import { CommonStyles } from '../../styles/CommonStyles';
import { updateCart } from '../../redux/actions/action';
import { connect } from 'react-redux';


class OrderConfirmationScreen extends Component {


    onCompleteOrder = () => {
        let arr = [];
        AsyncStorage.setItem('cartData', JSON.stringify(arr)).then((res) => {
            this.props.navigation.navigate('Home')
            this.props.updateCartItem(arr);
        })
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <TopBar
                    header={'Order Confirmation'}
                    navigation={this.props.navigation}
                    iconShow={false}
                />

                <View style={styles.container}>
                    <Image
                        source={require('../../assets/icon/orderConfirmation.png')}
                        style={styles.imageStyle}
                    />
                    <Text style={[CommonStyles.headerStyle, { color: '#0084ff' }]}>
                        {'Your Order is Confirmed'}
                    </Text>

                    <TouchableOpacity
                        style={CommonStyles.buttonStyle}
                        onPress={() => this.onCompleteOrder()}
                    >
                        <Text style={CommonStyles.buttonTextStyle}>
                            {'GO TO HOME SCREEN'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    imageStyle: {
        height: 100,
        width: 100,
        alignSelf: 'center'
    }
})

const mapDispatchToProps = dispatch => {
    return {
        updateCartItem: (data) => {
            dispatch(updateCart(data))
        }
    }
}

export default connect(null, mapDispatchToProps)(OrderConfirmationScreen);