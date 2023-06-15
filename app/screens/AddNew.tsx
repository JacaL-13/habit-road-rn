import { View, KeyboardAvoidingView, ScrollView, Text, StyleSheet, TextInput } from 'react-native'
import React, { useState } from 'react'

import MultiSwitch from '../components/UI/MultiSwitch'

function AddNew() {
	const [incrRedu, setIncrRedu] = useState(0)
	const [freqDurCoun, setFreqDurCoun] = useState(0)
	const [title, setTitle] = useState('')
	const [days, setDays] = useState(0)
	const [hours, setHours] = useState(0)
	const [minutes, setMinutes] = useState(0)

	function hdlTitleChange(newTitle: string) {
		setTitle(newTitle)
	}

	return (
			<View style={styles.main} >
				<Text style={styles.text}>I want to</Text>
				<MultiSwitch
					tabs={['Increase', 'Reduce']}
					currentIndex={incrRedu}
					onChange={(index: number) => {
						setIncrRedu(index)
					}}
				/>
				<MultiSwitch
					tabs={['Frequency', 'Duration', 'Count']}
					currentIndex={freqDurCoun}
					onChange={(index: number) => {
						setFreqDurCoun(index)
					}}
				/>
				<View style={styles.titleContainer}>
					<Text style={styles.text}>Of:</Text>
					<TextInput
						style={styles.titleInput}
						value={title}
						onChangeText={hdlTitleChange}
						placeholder={freqDurCoun < 2 ? 'Timer Title' : 'Counter Title'}
					/>
				</View>
				<View style={styles.horizontalRule} />
				<View style={styles.timerContainer}>
					<Text style={styles.text}>{freqDurCoun < 2 ? 'Initial Timer' : 'Initial Count'}</Text>
					<View style={styles.timer}>
						<View style={styles.timerColumns}>
							<TextInput style={styles.timerInput} placeholder="0" keyboardType="numeric" selectTextOnFocus />
							<Text style={styles.timerLabel} numberOfLines={1} ellipsizeMode="tail">
								Days
							</Text>
						</View>
						<View style={styles.columnGap} />
						<View style={styles.timerColumns}>
							<TextInput style={styles.timerInput} placeholder="0" keyboardType="numeric" selectTextOnFocus />
							<Text style={styles.timerLabel} numberOfLines={1} ellipsizeMode="tail">
								Hours
							</Text>
						</View>
						<View style={styles.columnGap} />
						<View style={styles.timerColumns}>
							<TextInput style={styles.timerInput} placeholder="0" keyboardType="numeric" selectTextOnFocus />
							<Text style={styles.timerLabel} numberOfLines={1} ellipsizeMode="tail">
								Minutes
							</Text>
						</View>
					</View>
				</View>
			</View>
	)
}

export default AddNew

const styles = StyleSheet.create({
	main: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'space-evenly'
	},
	scrollContentContainer: {
		flexGrow: 1,
		justifyContent: 'space-evenly',
		alignItems: 'center',
		padding: 20
	},
	text: {
		fontSize: 25,
		textAlign: 'center'
	},
	titleContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		width: '100%'
	},
	titleInput: {
		height: 40,
		width: '75%',
		borderColor: '#e5e5ea',
		backgroundColor: 'white',
		borderWidth: 1,
		paddingHorizontal: 10,
		marginLeft: 10,
		fontSize: 25
	},
	horizontalRule: {
		borderBottomColor: 'black',
		borderBottomWidth: 1,
		width: '80%'
	},
	timerContainer: {},
	timer: {
		flexDirection: 'row',
		justifyContent: 'center',
		marginTop: 20
	},
	timerColumns: {
		flex: 0,
		alignItems: 'center'
	},
	columnGap: {
		width: 10
	},
	timerInput: {
		height: 40,
		borderColor: '#e5e5ea',
		backgroundColor: 'white',
		borderWidth: 1,
		paddingHorizontal: 10,
		fontSize: 25,
		textAlign: 'center'
	},
	timerLabel: {
		fontSize: 14,
		overflow: 'visible'
	}
})
