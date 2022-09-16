import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Game, Home } from '../screens';

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes() {
    return (
        <Navigator screenOptions={{ headerShown: false }}>

            <Screen component={Home} name="Home" />
            <Screen component={Game} name="Game" />

        </Navigator>
    );
} 