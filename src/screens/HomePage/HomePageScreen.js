import React, { Component } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux';
import TopBar from '../../component/TopBar';
import { CommonStyles } from '../../styles/CommonStyles';
import { addItemToCart, removeItemToCart, updateCart } from '../../redux/actions/action';
import { getProductList } from '../../network/ApiEndPoints';
import Loader from '../../common/Loader';
import { add3Dots } from '../../common/commonFun';


class HomeScreen extends Component {

    state = {
        listData: [],
        tempListData: [],
        page: 10,
        isLoading: true
    }

    componentDidMount = () => {
        this.fetchApiData();
        this.unsubscribe = this.props.navigation.addListener('focus', () => {
            // The screen is focused
            // Call any action
            this.fetchApiData();
        });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    fetchApiData = () => {
        const { page, listData } = this.state;

        this.setState({ isLoading: true })
        getProductList(page).then((res) => {
            // console.log('Product List', res)
            let Data = res.data;
            if (res.status == 200) {
                Data.forEach((item) => {
                    item.isAdded = false
                })
                this.setState({
                    isLoading: false,
                    // listData: page === 10 ? Data : [...listData, ...Data],
                    // tempListData: page === 10 ? Data : [...listData, Data]
                    listData: res.data,
                    tempListData: res.data
                }, () => {
                    this.showAddedItem()
                })
            }
            else {
                this.setState({
                    isLoading: false
                })
            }
        })
    }

    showAddedItem = () => {
        const { cartData } = this.props;
        const { listData } = this.state;

        for (let i = 0; i < listData.length; i++) {
            for (let j = 0; j < cartData.length; j++) {
                if (listData[i].id === cartData[j].id) {
                    listData[i].isAdded = cartData[j].isAdded
                }
            }
        }
        this.setState({ listData, tempListData: listData })
    }


    handleLoadMore = () => {
        this.setState({
            page: this.state.page + 5
        }, () => {
            this.fetchApiData();
        })
    }

    onSearchItem = (text) => {
        const { tempListData } = this.state;
        // Check if searched text is not blank
        if (text) {
            // Inserted text is not blank
            // Filter the masterDataSource and update FilteredDataSource
            const newData = tempListData.filter(function (item) {
                // Applying filter for the inserted text in search bar
                const itemData = item.title
                    ? item.title.toUpperCase()
                    : ''.toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });
            this.setState({
                searchText: text,
                listData: newData
            })
        }
        else {
            // Inserted text is blank
            // Update FilteredDataSource with masterDataSource
            this.setState({
                searchText: text,
                listData: tempListData
            })
        }
    }


    renderProdcutItems = (rowData) => {
        return (
            <TouchableOpacity
                style={CommonStyles.listStyle}
                onPress={() => this.props.navigation.navigate('ProductDetail', { productData: rowData })}
            >
                <Image
                    style={{ height: 100, width: '100%' }}
                    source={(rowData.image) ? { uri: rowData.image } : require('../../assets/icon/rcard11.png')}
                    resizeMode={'contain'}
                />

                <Text style={[CommonStyles.NameTextStyle, { marginVertical: 5 }]}>
                    {add3Dots(rowData.title)}
                </Text>

                <Text style={[CommonStyles.DescriptionTextStyle]}
                    numberOfLines={2}
                >
                    {rowData.description}
                </Text>

                <TouchableOpacity
                    style={[CommonStyles.cartButtonStyle, { backgroundColor: (rowData.isAdded) ? 'red' : '#259F59' }]}
                    onPress={() => (rowData.isAdded) ? this.props.removeCartitem(rowData) : this.props.addItem(rowData)}
                >
                    <Text style={CommonStyles.buttonTextStyle}>
                        {(rowData.isAdded) ? 'REMOVE' : 'ADD TO CART'}
                    </Text>
                </TouchableOpacity>
            </TouchableOpacity>
        )
    }

    render() {
        const { isLoading, listData } = this.state;
        // console.log('In HomePage render', listData)

        return (
            <View style={{ flex: 1 }}>
                <TopBar
                    header={'Home'}
                    navigation={this.props.navigation}
                    iconShow={true}
                />

                <TextInput
                    style={CommonStyles.searchTextInputStyle}
                    placeholder={'Search Items'}
                    returnKeyType={'search'}
                    onChangeText={(text) => this.onSearchItem(text)}
                />

                <FlatList
                    data={listData}
                    numColumns={2}
                    renderItem={({ item }) => this.renderProdcutItems(item)}
                    keyExtractor={(item, index) => index.toString()}
                    extraData={this.state}
                    ListEmptyComponent={() => <Text style={{ textAlign: 'center' }}>{'No Data Found'}</Text>}
                    onEndReached={this.handleLoadMore}
                    onEndReachedThreshold={0.5}
                />

                {(isLoading) ? <Loader /> : null}
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        cartData: state.AlcoReducer.cartData,
        listData: state.AlcoReducer.listData
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addItem: (data) => {
            dispatch(addItemToCart(data))
        },
        removeCartitem: (data) => {
            dispatch(removeItemToCart(data))
        },
        updateCartItem: (data) => {
            dispatch(updateCart(data))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);