import { createSlice } from "@reduxjs/toolkit"
import { nanoid } from "nanoid"

const boards: {
	title: string
	id: string
	cards: {
		id: string
		title: string
		description: string
	}[]
}[] = [{
	title: "To do",
	id: nanoid(),
	cards: []
}, {
	title: "In progress",
	id: nanoid(),
	cards: []
}, {
	title: "Done",
	id: nanoid(),
	cards: []
}]

const initialState = {
	boards: localStorage.getItem('boards') !== null ? JSON.parse(localStorage.getItem('boards') || "") : [...boards]
}

const homePage = createSlice({
	name: "homePage",
	initialState,
	reducers: {
		addCard(state, action) {
			const {
				title,
				id = nanoid(),
				description = "",
				bId
			} = action.payload
			const card = {
				title,
				id,
				description
			}
			const bIndex = state.boards.findIndex((b: { id: any }) => b.id === bId)
			if (bIndex < 0) return
			const tempBoards = [...state.boards]
			tempBoards[bIndex].cards.push(card)
			state.boards = tempBoards
		},
		removeCard(state, action) {
			const { boardId, cardId } = action.payload
			const boardIndex = state.boards.findIndex((b: { id: any }) => b.id === boardId)
			if (boardIndex < 0) return
			const cardIndex = state.boards[boardIndex].cards.findIndex((c: { id: any }) => c.id === cardId)
			if (cardIndex < 0) return
			const tempBoards = [...state.boards]
			tempBoards[boardIndex].cards.splice(cardIndex, 1)
			state.boards = tempBoards
		},
		addBoard(state, action) {
			const { title, id = nanoid() } = action.payload
			const tempBoards = state.boards
			state.boards = [
				...tempBoards,
				{
					title, id, cards: []
				}
			]
			console.log(state.boards)
		},
		updateBoard(state, action) {
			state.boards = action.payload
			console.log(action.payload)
		},
		moveToBoard(state, action) {
			const { cardId, sourceBoardId, targetBoardId } = action.payload
			const tempBoards = [...state.boards]
			const tempSourceBoardIndex = tempBoards.findIndex(b => b.id === sourceBoardId)
			if (tempSourceBoardIndex < 0) return

			const tempSourceCards = [...tempBoards[tempSourceBoardIndex].cards]
			const tempSourceCardIndex = tempSourceCards.findIndex(c => c.id === cardId)
			if (tempSourceCardIndex < 0) return

			const tempCard = tempSourceCards[tempSourceCardIndex]
			tempSourceCards.splice(tempSourceCardIndex, 1)
			tempBoards[tempSourceBoardIndex].cards = tempSourceCards

			const tempTargetBoardIndex = tempBoards.findIndex(b => b.id === targetBoardId)
			if (tempTargetBoardIndex < 0) return

			const tempTargetCards = [...tempBoards[tempTargetBoardIndex].cards]
			tempTargetCards.push(tempCard)
			tempBoards[tempTargetBoardIndex].cards = tempTargetCards
			state.boards = tempBoards
		}
	}
})

type BoardsType = typeof boards
type BoardType = typeof boards[0]

export type { BoardsType, BoardType }

const homePageReducer = homePage.reducer

export const homePageActions = homePage.actions
export default homePageReducer