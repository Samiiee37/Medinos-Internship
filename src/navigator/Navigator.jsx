import {createStackNavigator} from '@react-navigation/stack';
//screens
import Signup from '../screens/Signup';
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
    </Stack.Navigator>
  );
};

export default StackNavigator;
