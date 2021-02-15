import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { CommonStyles } from '../styles/CommonStyles';



class TopBar extends Component {

    render() {
        const { cartData } = this.props;
        console.log('In TopBar', cartData)

        return (
            <View style={styles.conatiner}>
                {(this.props.iconShow && this.props.header !== 'Home') ?
                    <TouchableOpacity
                        style={styles.cartButtonStyle}
                        onPress={() => this.props.navigation.goBack()}
                    >
                        <Image
                            style={styles.cartStyle}
                            source={require('../assets/icon/back-grey.png')}
                            resizeMode={'contain'}
                        />
                    </TouchableOpacity>
                    :
                    <View style={styles.cartButtonStyle} />
                }

                <View style={{ flex: 6, justifyContent: 'center' }}>
                    <Text style={CommonStyles.headerStyle}>
                        {this.props.header}
                    </Text>
                </View>

                {(this.props.iconShow) ?
                    <TouchableOpacity
                        style={styles.cartButtonStyle}
                        onPress={() => (cartData.length > 0) ? this.props.navigation.navigate('Cart') : alert('Your cart is empty')}
                    >
                        <Image
                            style={styles.cartStyle}
                            source={require('../assets/icon/cart.png')}
                            resizeMode={'contain'}
                        />

                        {(cartData.length > 0) ?
                            <View style={styles.circleStlye} >
                                <Text style={styles.circleTextStlye}>
                                    {cartData.length}
                                </Text>
                            </View>
                            :
                            null
                        }
                    </TouchableOpacity>
                    :
                    <View style={styles.cartButtonStyle} />
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    conatiner: {
        height: 45,
        justifyContent: 'center',
        elevation: 1,
        shadowOpacity: 0.3,
        backgroundColor: '#fff',
        borderBottomColor: '#E8E8E8',
        borderBottomWidth: 0.5,
        flexDirection: 'row'
    },
    cartButtonStyle: {
        flex: 2,
        justifyContent: 'center'
    },
    cartStyle: {
        height: 30,
        width: 30,
        alignSelf: 'center',
        tintColor: 'blue'
    },
    circleStlye: {
        height: 18,
        width: 18,
        position: 'absolute',
        right: 13,
        top: 2,
        borderRadius: 9,
        justifyContent: 'center',
        backgroundColor: 'red'
    },
    circleTextStlye: {
        fontSize: 10,
        color: '#FFF',
        textAlign: 'center'
    }
})

const mapStateToProps = state => {
    return {
        cartData: state.AlcoReducer.cartData,
    }
}
export default connect(mapStateToProps)(TopBar);