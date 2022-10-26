import { useEffect, useState } from "react"
import {
	Typography,
	Stack,
	Dialog,
	IconButton,
	DialogTitle,
	DialogContent,
	TextField
} from "@mui/material"
import { Box, styled } from "@mui/system"
import { connect } from "react-redux"
import CloseIcon from "@mui/icons-material/Close"
import * as Yup from "yup"
import CheckIcon from "@mui/icons-material/Check"

import { dispatch, RootState } from "../../../store/rootStore"
import Board, { AddButton } from "../components/Board"
import { BoardsType, homePageActions } from "../store/reducer"
import { Form, Formik } from "formik"

const Container = styled(Box)({
	width: "1080px",
	margin: "auto"
})

interface IProps {
	boards: BoardsType
}

const AddCardSchema = Yup.object().shape({
	title: Yup.string().required("Board title is required")
})

const HomePage = (HomePageProps: IProps) => {
	const { boards } = HomePageProps
	const [open, setOpen] = useState(false)
	const [links, setLinks] = useState<any[]>([])

	useEffect(() => {
		const links = boards.map(board=> ({
			id: board.id,
			title: board.title
		}))
		setLinks(links)

		localStorage.setItem('boards', JSON.stringify(boards))
	}, [boards])

	const handleClickOpen = () => {
		setOpen(true)
	}

	const handleClose = () => {
		setOpen(false)
	}

	const handleAddBoardSubmit = (values: { title: string }) => {
		dispatch(
			homePageActions.addBoard({
				...values
			})
		)
	}

	return (
		<Container
			sx={{
				mt: 2
			}}
		>
			<Typography variant="h5">Kanban board</Typography>
			<Stack
				direction="row"
				sx={{
					overflowX: "auto"
				}}
			>
				{boards.map((board) => (
					<Board
						key={board.id}
						board={board}
						addBoard={handleClickOpen}
						links={links}
					/>
				))}
			</Stack>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<Box sx={{ position: "relative" }}>
					<IconButton
						onClick={handleClose}
						sx={{
							float: "right",
							position: "absolute",
							right: "5px",
							top: "5px",
							p: 1
						}}
					>
						<CloseIcon />
					</IconButton>
				</Box>
				<DialogTitle id="alert-dialog-title">Add new board</DialogTitle>
				<DialogContent>
					<Formik
						initialValues={{
							title: ""
						}}
						onSubmit={handleAddBoardSubmit}
						validationSchema={AddCardSchema}
						enableReinitialize
					>
						{({ values, errors, touched, handleChange, handleBlur }) => (
							<Form>
								<TextField
									variant="outlined"
									label="Board title"
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
								<AddButton variant="contained" color="success" type="submit">
									<CheckIcon />
								</AddButton>
							</Form>
						)}
					</Formik>
				</DialogContent>
			</Dialog>
		</Container>
	)
}

export default connect((state: RootState) => ({
	boards: state.homePage.boards
}))(HomePage)
