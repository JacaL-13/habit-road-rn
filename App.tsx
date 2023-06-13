import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Home from './app/screens/Home'
import AddNew from './app/screens/AddNew'

const Stack = createNativeStackNavigator()

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name="Home" component={Home} />
				<Stack.Screen name="AddNew" component={AddNew} options={{ title: 'Add New' }} />
			</Stack.Navigator>
		</NavigationContainer>
	)
}