import React, { Component } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import TopBar from '../../component/TopBar';
import { CommonStyles } from '../../styles/CommonStyles';
import { addItemToCart, removeItemToCart } from '../../redux/actions/action';
const { width } = Dimensions.get('window');


class ProductDetailScreen extends Component {

    render() {
        const { productData } = this.props.route.params;
        // console.log('productData', productData)

        return (
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <TopBar
                    header={'Product Detail'}
                    iconShow={true}
                    navigation={this.props.navigation}
                />

                <ScrollView>
                    <View style={styles.ImageViewStyle}>
                        <Image
                            style={styles.IconStyle}
                            source={(productData.image) ? { uri: productData.image } : require('../../assets/icon/rcard11.png')}
                            resizeMode={'contain'}
                        />
                    </View>

                    <Text style={styles.NameTextStyle}>
                        {productData.title}
                    </Text>
                    <Text style={styles.textStyleDescription}>
                        {productData.description}
                    </Text>
                </ScrollView>

                <TouchableOpacity
                    style={[CommonStyles.buttonStyle, { backgroundColor: (productData.isAdded) ? 'red' : '#259F59' }]}
                    onPress={() => (productData.isAdded) ? this.props.removeCartitem(productData) : this.props.addItem(productData)}
                >
                    <Text style={CommonStyles.buttonTextStyle}>
                        {(productData.isAdded) ? 'REMOVE' : 'ADD TO CART'}
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    ImageViewStyle: {
        height: 200,
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
    },
    IconStyle: {
        height: '100%',
        width: width,
    },
    NameTextStyle: {
        fontSize: 18,
        margin: 15,
        color: '#222222'
    },
    textStyleDescription: {
        fontSize: 13,
        marginHorizontal: 15,
        color: '#555555',
        letterSpacing: 0.6
    },
})

const mapStateToProps = state => {
    return {
        cartData: state.AlcoReducer.cartData,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        addItem: (data) => {
            dispatch(addItemToCart(data))
        },
        removeCartitem: (data) => {
            dispatch(removeItemToCart(data))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProductDetailScreen);