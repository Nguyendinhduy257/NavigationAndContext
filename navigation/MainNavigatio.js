import React from 'react';
import { View, StyleSheet, Platform,Text } from 'react-native';
import { NavigationContainer, getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// 1. Import các Icon từ lucide-react-native
import { Home, Bell, Scan, Clock, ShoppingCart } from 'lucide-react-native';

import HomeScreen from '../Screens/HomeScreen';
import ScanScreen from '../Screens/ScanScreen';
import CartScreen from '../Screens/CartScreen';
import PaymentScreen from '../Screens/PaymentScreen';
import SuccessScreen from '../Screens/SuccessScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack() {
    return (
        <Stack.Navigator initialRouteName="HomeScreen">
            <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="ScanScreen" component={ScanScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}

// 3. TẠO CART STACK
function CartStack() {
    return (
        <Stack.Navigator initialRouteName="CartScreen">
            <Stack.Screen name="CartScreen" component={CartScreen} options={{ headerShown: false }} />
            <Stack.Screen name="PaymentScreen" component={PaymentScreen} options={{ headerShown: false }} />
            <Stack.Screen name="SuccessScreen" component={SuccessScreen} options={{headerShown:false}}/>
        </Stack.Navigator>
    );
}

function DummyScreen() {
    return(
         <View style={{ flex: 1, backgroundColor: '#f9f9f9',display:'flex' }}>
            <Text style={{backgroundColor:'#E8825A',padding:'10%',marginTop:'10%',display:'flex', justifyContent:'center',alignItems:'center',color:'#FFFFFF',fontSize:18,fontWeight:'500',borderWidth:2,borderRadius:20,borderLeftWidth:5,borderRightWidth:5}}>   Đây là Screen mẫu</Text>
         </View>
    );
    
}

export default function MainNavigation() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarStyle: styles.tabBar,
                    
                    tabBarIcon: ({ focused }) => {
                        let IconComponent;

                        // Gán Component Icon tương ứng với tên Tab
                        if (route.name === 'Home') IconComponent = Home;
                        else if (route.name === 'Notifications') IconComponent = Bell;
                        else if (route.name === 'Scan') IconComponent = Scan;
                        else if (route.name === 'History') IconComponent = Clock;
                        else if (route.name === 'Cart') IconComponent = ShoppingCart;

                        // Nếu không có icon thì không render gì cả để tránh lỗi
                        if (!IconComponent) return null;

                        // Render trạng thái Active
                        if (focused) {
                            return (
                                <View style={styles.activeIconContainer}>
                                    <IconComponent size={22} color="#4A90E2" strokeWidth={2.5} />
                                </View>
                            );
                        }

                        // Render trạng thái Inactive
                        return <IconComponent size={26} color="#B0B0B0" strokeWidth={2} />;
                    },
                })}
            >
                <Tab.Screen name="Home" component={HomeStack} />
                <Tab.Screen name="Notifications" component={DummyScreen} />
                <Tab.Screen name="Scan" component={ScanScreen} />
                <Tab.Screen name="History" component={DummyScreen} />

                {/* 4. ĐĂNG KÝ CART STACK VÀ CẤU HÌNH ẨN TAB BAR KHI VÀO PAYMENT */}
                <Tab.Screen
                    name="Cart"
                    component={CartStack}
                    options={({ route }) => {
                        const routeName = getFocusedRouteNameFromRoute(route) ?? 'CartScreen';

                        // Nếu đang ở PaymentScreen HOẶC SuccessScreen -> Ẩn thanh bottom navigation
                        if (routeName === 'PaymentScreen' || routeName === 'SuccessScreen') {
                            return { tabBarStyle: { display: 'none' } };
                        }

                        // Ngược lại, hiện thanh bottom navigation
                        return { tabBarStyle: styles.tabBar };
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    tabBar: {
        backgroundColor: '#FFFFFF',
        position: 'absolute',
        bottom: 0, left: 0, right: 0,
        height: '10%',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        padding: 40,
        paddingTop:10,
        paddingBottom:60,
        paddingBottom: Platform.OS === 'ios' ? 100 : 100,

    },
    activeIconContainer: {
        backgroundColor: '#EAF4FF',
        borderRadius: 12,
        padding: '20%',
        marginTop:'15%',
        justifyContent: 'center',
        alignItems: 'center',
    },
});