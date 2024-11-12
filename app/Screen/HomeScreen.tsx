import * as React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Feed from "../HomeTab/Feed";
import Profile from "../HomeTab/Profile";
import Notifications from "../HomeTab/Notifications";
import Favorite from "../HomeTab/Favorite";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import Cart from "../HomeTab/Cart";
import ProductDetail from "./ProductDetail";

const Tab = createBottomTabNavigator();
const HomeScreen = ({ route }) => {
  const { username } = route.params || {}; // Kiểm tra xem username có được truyền vào không

  console.log("Route Params in HomeScreen: ", route.params); // Debug đ
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      screenOptions={{
        tabBarActiveTintColor: "#e91e63",
      }}
    >
      <Tab.Screen
        name="Feed"
        component={Feed}
        initialParams={{ username }}
        options={{
          headerShown: false,
          tabBarLabel: "Trang chủ",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="Favorite"
        component={Favorite}
        options={{
          headerShown: false,
          tabBarLabel: "Yêu thích",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="hearto" size={24} color="black" />
          ),
        }}
      />
      {/* <Tab.Screen
        name="Notification"
        component={Notifications}
        options={{
          tabBarLabel: 'Updates',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="bell" color={color} size={size} />
          ),
        }}
      /> */}
      <Tab.Screen
        name="Cart"
        component={Cart}
        options={{
          headerShown: false,
          tabBarLabel: "Giỏ hàng",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="shoppingcart" size={24} color="black" />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
          tabBarLabel: "Tài khoản",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeScreen;
