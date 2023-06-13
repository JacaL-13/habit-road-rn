import { View, Text, Button, StyleSheet } from 'react-native'
import MyButton from '../components/UI/MyButton'

// type RootStackParamList = {
// 	Home: undefined
// }

function Home({ navigation }: any) {
	return (
		<View>
			<MyButton onPress={() => navigation.navigate('AddNew')} title="Add New"/>
		</View>
	)
}

export default Home

const styles = StyleSheet.create({
	button: {
		backgroundColor: 'red'
	}
})
