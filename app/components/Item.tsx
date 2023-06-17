import { View, Text } from 'react-native'

interface ItemType {
	itemId: string
	title: string
	value: number
	incrRedu: number
	freqDurCoun: number
	created: number
}

function Item(item: any) {
	const { title, value, incrRedu, freqDurCoun, created } = item

	return (
		<View >
			<Text>{title}</Text>
			<Text>{value}</Text>
			<Text>{incrRedu}</Text>
			<Text>{freqDurCoun}</Text>
			<Text>{created}</Text>
		</View>
	)
}

export default Item
