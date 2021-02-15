import React, { Component } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import TopBar from '../../component/TopBar';
import { CommonStyles } from '../../styles/CommonStyles';
import { removeItemToCart } from '../../redux/actions/action';
import { add3Dots } from '../../common/commonFun';


class CartScreen extends Component {

    state = {
    }

    componentDidUpdate(previousProps, previousState) {
        if (this.props.cartData.length == 0) {
            this.props.navigation.navigate('Home')
        }
    }

    renderProdcutItems = (rowData) => {
        return (
            <View style={CommonStyles.cartlistStyle} >
                <View style={{ flex: 3 }}>
                    <Image
                        style={{ height: 90, width: '100%' }}
                        source={(rowData.image) ? { uri: rowData.image } : require('../../assets/icon/rcard11.png')}
                        resizeMode={'contain'}
                    />
                </View>

                <View style={{ flex: 7 }}>
                    <Text style={[CommonStyles.NameTextStyle, { marginVertical: 5 }]}>
                        {add3Dots(rowData.title)}
                    </Text>

                    <Text style={[CommonStyles.DescriptionTextStyle, { marginRight: 5 }]}
                        numberOfLines={2}
                    >
                        {rowData.description}
                    </Text>

                    <TouchableOpacity
                        style={[CommonStyles.cartButtonStyle, { width: 100, backgroundColor: 'red' }]}
                        onPress={() => this.props.removeCartitem(rowData)}
                    >
                        <Text style={CommonStyles.buttonTextStyle}>
                            {'REMOVE'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    render() {
        const { cartData } = this.props;
        console.log('cartData', this.props.cartData)
        return (
            <View style={{ flex: 1 }}>
                <TopBar
                    header={'Cart'}
                    iconShow={true}
                    navigation={this.props.navigation}
                />

                <FlatList
                    data={cartData}
                    renderItem={({ item }) => this.renderProdcutItems(item)}
                    keyExtractor={(item, index) => index.toString()}
                    extraData={this.props}
                    ListEmptyComponent={() => <Text style={{ textAlign: 'center' }}>{'No Items in Cart'}</Text>}
                />

                <TouchableOpacity
                    style={CommonStyles.buttonStyle}
                    onPress={() => this.props.navigation.navigate('OrderConfirm')}
                >
                    <Text style={CommonStyles.buttonTextStyle}>
                        {'PROCEED TO CHECKOUT'}
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        cartData: state.AlcoReducer.cartData,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        removeCartitem: (data) => {
            dispatch(removeItemToCart(data))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CartScreen);