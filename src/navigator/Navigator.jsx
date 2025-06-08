import {createStackNavigator} from '@react-navigation/stack';
//screens
import Signup from '../screens/Signup';
import HomeScreen from '../screens/Home';
import Detail from '../screens/Detail';
import SignIn from '../screens/Signin';
import User from '../screens/User';
//Stack Navigator
const Stack = createStackNavigator();
const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Detail"
        component={Detail}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Signin"
        component={SignIn}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="User"
        component={User}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
