import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/login/LoginScreen';
import HomeScreen from '../screens/HomePage/HomePageScreen';
import ProductDetailScreen from '../screens/ProductDetail/ProductDetailScreen';
import CartScreen from '../screens/cart/cartScreen';
import OrderConfirmationScreen from '../screens/order/OrderConfirmationScreen';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import { updateCart } from '../redux/actions/action';
import { ActivityIndicator, View } from 'react-native';

const Stack = createStackNavigator();

function AppNavigation({ updateCartItem }) {
    const [isLogin, setLoginStats] = React.useState(false);
    const [isLoading, setLoding] = React.useState(true);

    AsyncStorage.getItem('loginStatus').then((res) => {
        setLoginStats(res);
        setLoding(false);
    })

    AsyncStorage.getItem('cartData').then((res) => {
        let cartValue = [];
        if (res) {
            cartValue = JSON.parse(res);
        }
        updateCartItem(cartValue);
    })


    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#259F59" />
            </View>
        );
    }
    else if (isLogin) {
        return (
            <NavigationContainer >
                <Stack.Navigator headerMode={'none'}
                    screenOptions={{ gestureEnabled: false }}
                >
                    <Stack.Screen name="Home" component={HomeScreen} />
                    <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
                    <Stack.Screen name="Cart" component={CartScreen} />
                    <Stack.Screen name="OrderConfirm" component={OrderConfirmationScreen} />
                    {/* <Stack.Screen name="Login" component={LoginScreen} /> */}
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
    else {
        return (
            <NavigationContainer >
                <Stack.Navigator headerMode={'none'}
                    screenOptions={{ gestureEnabled: false }}
                >
                    <Stack.Screen name="Login" component={LoginScreen} />
                    <Stack.Screen name="Home" component={HomeScreen} />
                    <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
                    <Stack.Screen name="Cart" component={CartScreen} />
                    <Stack.Screen name="OrderConfirm" component={OrderConfirmationScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateCartItem: (data) => {
            dispatch(updateCart(data))
        }
    }
}

export default connect(null, mapDispatchToProps)(AppNavigation);