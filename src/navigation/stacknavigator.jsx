//Navigation
import {createStackNavigator} from '@react-navigation/stack';

//Screens
import Signin from '../screens/Signin';
import Signup from '../screens/Signup';
import Home from '../screens/Home';
import Detail from '../screens/Detail';
import Profile from '../screens/Profile';

const Stack = createStackNavigator();
export default function StackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Signin"
        component={Signin}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Detail"
        component={Detail}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          title: 'Profile',
        }}
      />
    </Stack.Navigator>
  );
}
