import React, { useState } from "react"
import { styled, Box } from "@mui/system"
import { Stack, Typography, IconButton, Button, TextField } from "@mui/material"
import AddIcon from "@mui/icons-material/Add"
import CloseIcon from "@mui/icons-material/Close"
import CheckIcon from "@mui/icons-material/Check"
import { Form, Formik } from "formik"
import * as Yup from "yup"

import Card from "../Card"
import { BoardType, homePageActions } from "../../store/reducer"
import { dispatch } from "../../../../store/rootStore"

const BoardContainer = styled(Stack)({
	minWidth: "260px",
	":not(:last-child)": {
		marginRight: "2rem"
	}
})

export const AddButton = styled(Button)({
	width: "100%"
})

interface IProps {
	board: BoardType
	addBoard: () => void
	links: {
		id: string
		title: string
	}[]
}

const AddCardSchema = Yup.object().shape({
	title: Yup.string().required("Card title is required"),
	description: Yup.string().required("Description is required")
})

const Board = ({ board, addBoard, links }: IProps) => {
	const [isAddingCard, setIsAddCard] = useState(false)

	const handleIsEditing = (val: boolean) => {
		setIsAddCard(val)
	}

	const handleSubmit = (values: { title: string; description: string }) => {
		dispatch(
			homePageActions.addCard({
				...values,
				bId: board.id
			})
		)
		handleIsEditing(false)
	}

	return (
		<BoardContainer>
			<Stack
				sx={{
					m: "1rem 0 0.5rem 0"
				}}
				direction="row"
				alignItems="center"
				justifyContent="space-between"
			>
				<Box>
					<Typography
						sx={{
							fontSize: "1.2rem",
							display: "inline-block",
							marginRight: "1rem"
						}}
					>
						{board.title}
					</Typography>
					<Typography
						sx={{
							display: "inline-block",
							color: "green"
						}}
					>
						{board?.cards?.length}
					</Typography>
				</Box>
				<IconButton
					size="small"
					sx={{
						backgroundColor: "#ccc"
					}}
					onClick={addBoard}
				>
					<AddIcon color="primary" />
				</IconButton>
			</Stack>
			<Box
				sx={{
					height: "80vh",
					overflowY: "auto",
					width: "280px"
				}}
			>
				{board.cards.map((card) => (
					<Card
						key={card.id}
						title={card.title}
						description={card.description}
						boardId={board.id}
						cardId={card.id}
						links={links}
					/>
				))}
				{isAddingCard ? (
					<Box>
						<Formik
							initialValues={{
								title: "",
								description: ""
							}}
							onSubmit={handleSubmit}
							validationSchema={AddCardSchema}
							enableReinitialize
						>
							{({ errors, values, touched, handleChange, handleReset, handleBlur }) => (
								<Form
									onReset={() => {
										handleReset()
										handleIsEditing(false)
									}}
								>
									<TextField
										variant="outlined"
										placeholder="Some title..."
										sx={{
											width: "100%",
											mt: 1,
											mb: 1
										}}
										name="title"
										onChange={handleChange}
										onBlur={handleBlur}
										value={values.title}
										error={Boolean(errors.title) && touched.title}
										helperText={errors.title}
									/>
									<TextField
										variant="outlined"
										placeholder="Some description"
										sx={{
											width: "100%",
											mt: 1,
											mb: 1
										}}
										name="description"
										onChange={handleChange}
										onBlur={handleBlur}
										value={values.description}
										error={errors.description !== undefined && touched.description}
										helperText={errors.description}
									/>
									<Stack direction="row">
										<AddButton
											variant="contained"
											color="success"
											type="submit"
										>
											<CheckIcon />
										</AddButton>
										<AddButton color="warning" variant="contained" type="reset">
											<CloseIcon />
										</AddButton>
									</Stack>
								</Form>
							)}
						</Formik>
					</Box>
				) : (
					<AddButton variant="contained" onClick={() => handleIsEditing(true)}>
						Add Card
					</AddButton>
				)}
			</Box>
		</BoardContainer>
	)
}

export default Board
