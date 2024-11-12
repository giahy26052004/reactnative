import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from "./Screen/HomeScreen";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DetailScreen from "./Screen/DetailScreen";
import SignInScreen from './Screen/SignInScreen';
import SignUpScreen from './Screen/SignUpScreen';
import ForgotScreen from './Screen/ForgotScreen';
import WelcomeScreen from './Screen/WelcomeScreen';
import SelectScreen from './Screen/SelectScreen';
import ProductDetail from './Screen/ProductDetail';
import PaymentScreen from './Screen/PaymentScreen';
import SuccessScreen from './Screen/SuccessScreen';
import SearchResults from './Screen/SearchScreen';
import AcountScreen from './Screen/AcountScreen';
import ChangePassword from './Screen/ChangePassword';
const Stack = createNativeStackNavigator();

function App() {
    return (
      <NavigationContainer independent={true}>
        <Stack.Navigator initialRouteName="Welcome">
          <Stack.Screen options = {{headerShown :false}} name="Home" component={HomeScreen} />
          <Stack.Screen options = {{headerShown :false}} name="Details" component={DetailScreen} />
          <Stack.Screen options = {{headerShown :false}} name="SignIn" component={SignInScreen} />
          <Stack.Screen options = {{headerShown :false}} name="SignUp" component={SignUpScreen} />
          <Stack.Screen options = {{headerShown :false}} name="Forgot" component={ForgotScreen} />
          <Stack.Screen options = {{headerShown :false}} name="Welcome" component={WelcomeScreen} />
          <Stack.Screen options = {{headerShown :false}} name="Select" component={SelectScreen} />
          <Stack.Screen options = {{headerShown :false}} name="ProductDetail" component={ProductDetail} />
          <Stack.Screen options = {{headerShown :false}} name="Payment" component={PaymentScreen} />
          <Stack.Screen options = {{headerShown :false}} name="Success" component={SuccessScreen} />
          <Stack.Screen options = {{headerShown :false}} name="SearchResults" component={SearchResults} />
          <Stack.Screen options = {{headerShown :false}} name="Acount" component={AcountScreen} />
          <Stack.Screen options = {{headerShown :false}} name="ChangePass" component={ChangePassword} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
  
  export default App;