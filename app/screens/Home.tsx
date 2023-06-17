import { View, Text, Button, StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useState } from 'react'
import { useIsFocused } from '@react-navigation/native'

import MyButton from '../components/UI/MyButton'
import Item from '../components/Item'

interface ItemType {
	itemId: string
	title: string
	value: number
	incrRedu: number
	freqDurCoun: number
	created: number
}

function Home({ navigation }: any) {
	const [items, setItems] = useState<ItemType[]>([])
	const isFocused = useIsFocused()
	const [refresh, setRefresh] = useState(false)

	useEffect(() => {
		console.log('refreshed')
		async function getItems() {
			try {
				const itemsString = await AsyncStorage.getItem('items')
				if (itemsString) {
					setItems(JSON.parse(itemsString))
				}
			} catch (error) {
				console.error(error)
			}
		}
		getItems()
		setRefresh(false)
	}, [isFocused])

	//loop over items and render them
	const renderItems = items.map((item: ItemType) => {
		return (
			// <View key={item.itemId}>
			// 	<Text>{item.title}</Text>
			// 	<Text>{item.value}</Text>
			// 	<Text>{item.incrRedu}</Text>
			// 	<Text>{item.freqDurCoun}</Text>
			// 	<Text>{item.created}</Text>
			// </View>

			<Item key={item.itemId} item={item}></Item>
		)
	})

	return (
		<View style={styles.main}>
			<View>{renderItems}</View>
			<MyButton onPress={() => navigation.navigate('AddNew')} title="Add New" />
		</View>
	)
}

export default Home

const styles = StyleSheet.create({
	main: {
		flex: 1,
		justifyContent: 'space-between',
		margin: 20
	},
	button: {
		backgroundColor: 'red'
	}
})
