import { create } from 'zustand'
const Chance = require('chance')
const chance = new Chance()

const useItemsStore = create((set) => ({
	items: [],
	addItem: (title, value, type) => {
		set((state) => ({
			items: [
				...state.items,
				{
					itemId: chance.hash(),
					title,
					value,
					type,
					created: Date.now()
				}
			]
		}))
	},
	updateItem: (itemId, property, newValue) => {
		set((state) => {
			const index = state.items.findIndex((item) => item.itemId === itemId)
			if (index !== -1) {
				state.items[index][property] = newValue
			}
			return state
		})
	},
	deleteItem: (itemId) => {
		set((state) => ({
			items: state.items.filter((item) => item.itemId !== itemId)
		}))
	},
}))