import { View, KeyboardAvoidingView, ScrollView, Text, StyleSheet, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
const Chance = require('chance')
const chancey = new Chance()

import MultiSwitch from '../components/UI/MultiSwitch'
import MyButton from '../components/UI/MyButton'

function AddNew({ navigation }: any) {
	const [incrRedu, setIncrRedu] = useState(0)
	const [freqDurCoun, setFreqDurCoun] = useState(0)
	const [title, setTitle] = useState('')
	const [days, setDays] = useState('0')
	const [hours, setHours] = useState('0')
	const [minutes, setMinutes] = useState('0')
	const [counter, setCounter] = useState('0')

	function hdlTitleChange(newTitle: string) {
		setTitle(newTitle)
	}

	function hdlTimerChange(text: string, timerPart: string) {
		const textAsNum = parseInt(text.replace(/[^0-9]/g, ''))
		if (textAsNum === 0 || textAsNum) {
			switch (timerPart) {
				case 'days':
					setDays(textAsNum.toString())
					break
				case 'hours':
					setHours(textAsNum.toString())
					break
				case 'minutes':
					setMinutes(textAsNum.toString())
					break
			}
		}
	}

	function hdlCounterChange(text: string) {
		const textAsNum = parseInt(text.replace(/[^0-9]/g, ''))
		if (textAsNum === 0 || textAsNum) {
			setCounter(textAsNum.toString())
		}
	}

	// Calculate full timer and allocate to days, hours, and minutes
	function calcTimer() {
		let daysAsNum = parseInt(days)
		let hoursAsNum = parseInt(hours)
		let minutesAsNum = parseInt(minutes)

		const totalMinutes = daysAsNum * 24 * 60 + hoursAsNum * 60 + minutesAsNum

		const daysFromTotal = Math.floor(totalMinutes / (24 * 60))
		const hoursFromTotal = Math.floor((totalMinutes - daysFromTotal * 24 * 60) / 60)
		const minutesFromTotal = totalMinutes - daysFromTotal * 24 * 60 - hoursFromTotal * 60

		setDays(daysFromTotal.toString())
		setHours(hoursFromTotal.toString())
		setMinutes(minutesFromTotal.toString())

		return totalMinutes / 60
	}

	async function hdlPressAdd() {
		const timerSeconds = calcTimer()

		if (timerSeconds > 0 && title.length > 0) {
			try {
				let items = await AsyncStorage.getItem('items')
				const itemsAsObj = JSON.parse(items ? items : '[]')
				const newItems = [
					...itemsAsObj,
					{
						itemId: chancey.hash(),
						title,
						value: freqDurCoun < 2 ? timerSeconds : parseInt(counter),
						incrRedu,
						freqDurCoun,
						created: Date.now()
					}
				]
				await AsyncStorage.setItem('items', JSON.stringify(newItems))
				navigation.navigate('Home')
			} catch (err) {
				console.error(err)
			}
		} else {
			console.log('Timer must be greater than zero and title must be at least one character.')
		}
	}

	function timerCounter() {
		if (freqDurCoun < 2) {
			return (
				<View style={styles.timerContainer}>
					<Text style={styles.text}>Initial Timer</Text>
					<View style={styles.timer}>
						<View style={styles.timerColumns}>
							<TextInput
								value={days}
								style={styles.timerInput}
								placeholder="0"
								keyboardType="numeric"
								selectTextOnFocus
								onChangeText={(text) => hdlTimerChange(text, 'days')}
								onBlur={calcTimer}
							/>
							<Text style={styles.timerLabel} numberOfLines={1}>
								Days
							</Text>
						</View>
						<View style={styles.columnGap} />
						<View style={styles.timerColumns}>
							<TextInput
								value={hours}
								style={styles.timerInput}
								placeholder="0"
								keyboardType="numeric"
								selectTextOnFocus
								onChangeText={(text) => hdlTimerChange(text, 'hours')}
								onBlur={calcTimer}
							/>
							<Text style={styles.timerLabel} numberOfLines={1}>
								Hours
							</Text>
						</View>
						<View style={styles.columnGap} />
						<View style={styles.timerColumns}>
							<TextInput
								value={minutes}
								style={styles.timerInput}
								placeholder="0"
								keyboardType="numeric"
								selectTextOnFocus
								onChangeText={(text) => hdlTimerChange(text, 'minutes')}
								onBlur={calcTimer}
							/>
							<Text style={styles.timerLabel} numberOfLines={1}>
								Minutes
							</Text>
						</View>
					</View>
				</View>
			)
		} else {
			return (
				<View style={styles.timerContainer}>
					<Text style={styles.text}>Initial Count:</Text>
					<View style={styles.timer}>
						<TextInput
							value={counter}
							style={styles.timerInput}
							placeholder="0"
							keyboardType="numeric"
							selectTextOnFocus
							onChangeText={(text) => hdlCounterChange(text)}
						/>
					</View>
				</View>
			)
		}
	}

	return (
		<View style={styles.main}>
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
			{timerCounter()}
			<MyButton title="Add" onPress={hdlPressAdd} />
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
