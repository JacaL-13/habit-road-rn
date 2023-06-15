import { create } from 'zustand'
const Chance = require('chance')
const chancey = new Chance()

type ItemType = {
	itemId: string
	title: string
	value: any
	type: string
	created: number
}

type ItemsStoreState = {
	items: ItemType[]
	addItem: (title: string, value: any, type: string) => void
	updateItem: (itemId: string, property: string, newValue: any) => void
	deleteItem: (itemId: string) => void
}

const chance = new Chance()

const useItemsStore = create<ItemsStoreState>((set) => ({
	items: [],
	addItem: (title, value, type) => {
		set((state) => ({
			items: [
				...state.items,
				{
					itemId: chancey.hash(),
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
			const updatedItems = state.items.map((item) => {
				if (item.itemId === itemId) {
					return { ...item, [property]: newValue }
				}
				return item
			})
			return { ...state, items: updatedItems }
		})
	},
	deleteItem: (itemId) => {
		set((state) => ({
			items: state.items.filter((item) => item.itemId !== itemId)
		}))
	}
}))

export default useItemsStore
