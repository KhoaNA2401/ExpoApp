import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { View, Text, Linking } from "react-native";
import { Icon, Image } from "react-native-elements";
import Home from "./HomeComponent";
import Menu from "./MenuComponent";
import Dishdetail from "./DishdetailComponent";
import Favorites from './FavoriteComponent';
function FavoritesNavigatorScreen() {
  const FavoritesNavigator = createStackNavigator();
  return (
    <FavoritesNavigator.Navigator initialRouteName='Favorites'
      screenOptions={{
        headerStyle: { backgroundColor: '#7cc' },
        headerTintColor: '#fff',
        headerTitleStyle: { color: '#fff' }
      }}>
      <FavoritesNavigator.Screen name='Favorites' component={Favorites}
        options={({ navigation }) => ({
          headerTitle: 'My Favorites',
          headerLeft: () => (<Icon name='menu' size={36} color='#fff' onPress={() => navigation.toggleDrawer()} />)
        })} />
      <FavoritesNavigator.Screen name='Dishdetail' component={Dishdetail}
        options={{ headerTitle: 'Dish Detail' }} />
    </FavoritesNavigator.Navigator>
  );
}
function HomeNavigatorScreen() {
  const HomeNavigator = createStackNavigator();
  return (
    <HomeNavigator.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: { backgroundColor: "#512DA8" },
        headerTintColor: "#fff",
        headerTitleStyle: { color: "#fff" },
      }}
    >
      <HomeNavigator.Screen
        name="Home"
        component={Home}
        options={({ navigation }) => ({
          headerTitle: "Home",
          headerLeft: () => (
            <Icon
              name="menu"
              size={36}
              color="#fff"
              onPress={() => navigation.toggleDrawer()}
            />
          ),
        })}
      />
    </HomeNavigator.Navigator>
  );
}
function MenuNavigatorScreen() {
  const MenuNavigator = createStackNavigator();
  return (
    <MenuNavigator.Navigator
      initialRouteName="Menu"
      screenOptions={{
        headerStyle: { backgroundColor: "#512DA8" },
        headerTintColor: "#fff",
        headerTitleStyle: { color: "#fff" },
      }}
    >
      <MenuNavigator.Screen
        name="Menu"
        component={Menu}
        options={({ navigation }) => ({
          headerTitle: "Menu",
          headerLeft: () => (
            <Icon
              name="menu"
              size={36}
              color="#fff"
              onPress={() => navigation.toggleDrawer()}
            />
          ),
        })}
      />
      <MenuNavigator.Screen
        name="Dishdetail"
        component={Dishdetail}
        options={{
          headerTitle: "Dish Detail",
        }}
      />
    </MenuNavigator.Navigator>
  );
}
function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <View
        style={{
          backgroundColor: "#7cc",
          height: 80,
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <View style={{ flex: 1 }}>
          <Image
            source={require("./images/logo.png")}
            style={{ margin: 10, width: 80, height: 60 }}
          />
        </View>
        <View style={{ flex: 2 }}>
          <Text style={{ color: "#fff", fontSize: 22, fontWeight: "bold" }}>
            TDK & Friends
          </Text>
        </View>
      </View>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Help"
        icon={({ focused, color, size }) => (
          <Icon name="help" size={size} color={focused ? "#7cc" : "#ccc"} />
        )}
        onPress={() =>
          Linking.openURL("https://reactnavigation.org/docs/getting-started")
        }
      />
    </DrawerContentScrollView>
  );
}
function MainNavigatorScreen() {
  const MainNavigator = createDrawerNavigator();
  return (
    <MainNavigator.Navigator
      initialRouteName="MenuScreen"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <MainNavigator.Screen
        name="MenuScreen"
        component={MenuNavigatorScreen}
        options={{
          title: "Menu",
          headerShown: false,
          drawerIcon: ({ focused, size }) => (
            <Icon name="menu" size={size} color={focused ? "#7cc" : "#ccc"} />
          ),
        }}
      />
      <MainNavigator.Screen
        name="HomeScreen"
        component={HomeNavigatorScreen}
        options={{
          title: "Home",
          headerShown: false,
          drawerIcon: ({ focused, size }) => (
            <Icon name="home" size={size} color={focused ? "#7cc" : "#ccc"} />
          ),
        }}
      />
       <MainNavigator.Screen name='FavoritesScreen' component={FavoritesNavigatorScreen}
        options={{
          title: 'My Favorites', headerShown: false,
          drawerIcon: ({ focused, size }) => (<Icon name='heart' type='font-awesome' size={size} color={focused ? '#7cc' : '#ccc'} />)
        }} />
      {/* <MainNavigator.Screen name='AboutScreen' component={AboutNavigatorScreen}
        options={{
          title: 'About Us', headerShown: false,
          drawerIcon: ({ focused, size }) => (<Icon name='info' size={size} color={focused ? '#7cc' : '#ccc'} />)
        }} /> */}

      {/* <MainNavigator.Screen name='ContactScreen' component={ContactNavigatorScreen}
        options={{
          title: 'Contact Us', headerShown: false,
          drawerIcon: ({ focused, size }) => (<Icon name='contacts' size={size} color={focused ? '#7cc' : '#ccc'} />)
        }} /> */}
    </MainNavigator.Navigator>
  );
}

// redux
import { connect } from 'react-redux';
import {  fetchStory, fetchComments } from '../redux/ActionCreators';
const mapDispatchToProps = (dispatch) => ({
  fetchStory: () => dispatch(fetchStory()),
  fetchComments: () => dispatch(fetchComments())
});
class Main extends Component {
  render() {
    return (
      <NavigationContainer>
        <MainNavigatorScreen />
      </NavigationContainer>
    );
  }
  componentDidMount() {
    // redux
    this.props.fetchStory();
    this.props.fetchComments();
  }
}

export default connect(null, mapDispatchToProps)(Main);
