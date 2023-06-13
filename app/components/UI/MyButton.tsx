import { View, Text, GestureResponderEvent, Pressable, StyleSheet } from 'react-native'

type MyButtonProps = {
	onPress: (event: GestureResponderEvent) => void
	title: string
}

const styles = StyleSheet.create({
	button: {
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 12,
		paddingHorizontal: 32,
		marginHorizontal: 10,
		borderRadius: 10,
		elevation: 3,
		backgroundColor: '#3457D5'
	},
	text: {
		fontSize: 16,
		lineHeight: 21,
		fontWeight: 'bold',
		letterSpacing: 0.25,
		color: 'white'
	}
})

function MyButton({ onPress, title }: MyButtonProps) {
	return (
		<Pressable onPress={onPress} style={styles.button}>
			<Text style={styles.text}>{title}</Text>
		</Pressable>
	)
}

export default MyButton
