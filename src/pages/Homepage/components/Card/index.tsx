import { useState } from "react"
import { styled, Box } from "@mui/system"
import {
	Typography,
	Dialog,
	DialogContent,
	DialogContentText,
	DialogTitle,
	IconButton,
	Menu,
	MenuItem
} from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat"
import DeleteForeverIcon from "@mui/icons-material/DeleteForever"
import { dispatch } from "../../../../store/rootStore"
import { homePageActions } from "../../store/reducer"

const CardContainer = styled(Box)({
	padding: "1rem 0.4rem",
	backgroundColor: "white",
	borderRadius: "5px",
	boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
	border: "1px solid #ccc",
	":not(:last-child)": {
		marginBottom: "1rem"
	}
})

interface CardProps {
	title: string
	description: string
	boardId: string
	cardId: string
	links: { title: string; id: string }[]
}

const Card = (CardProps: CardProps) => {
	const { title, description, boardId, cardId, links } = CardProps
	const [open, setOpen] = useState(false)
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
	const isMenuOpen = Boolean(anchorEl)

	const openMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget)
	}
	const handleMenuClose = () => {
		setAnchorEl(null)
	}

	const handleClickOpen = () => {
		setOpen(true)
	}

	const handleClose = () => {
		setOpen(false)
	}

	const handleDelete = () => {
		dispatch(
			homePageActions.removeCard({
				boardId,
				cardId
			})
		)
	}

	const handleMove = ({
		cardId,
		sourceBoardId,
		targetBoardId
	}: {
		cardId: string
		sourceBoardId: string
		targetBoardId: string
	}) => {
		dispatch(
			homePageActions.moveToBoard({
				cardId,
				sourceBoardId,
				targetBoardId
			})
		)
	}

	return (
		<>
			<CardContainer>
				<Box
					sx={{
						position: "relative"
					}}
				>
					<IconButton
						size="small"
						sx={{
							position: "absolute",
							right: "-5px",
							top: "-10px",
							width: "2rem",
							height: "2rem"
						}}
						onClick={handleDelete}
					>
						<DeleteForeverIcon />
					</IconButton>
					<IconButton
						size="small"
						sx={{
							position: "absolute",
							right: "40px",
							top: "-10px",
							width: "2rem",
							height: "2rem"
						}}
						onClick={openMenu}
					>
						<TrendingFlatIcon />
					</IconButton>
					<Menu
						anchorEl={anchorEl}
						id="account-menu"
						open={isMenuOpen}
						onClose={handleMenuClose}
						onClick={handleMenuClose}
						PaperProps={{
							elevation: 0,
							sx: {
								overflow: "visible",
								filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
								mt: 1.5,
								"& .MuiAvatar-root": {
									width: 32,
									height: 32,
									ml: -0.5,
									mr: 1
								},
								"&:before": {
									content: '""',
									display: "block",
									position: "absolute",
									top: 0,
									right: 14,
									width: 10,
									height: 10,
									bgcolor: "background.paper",
									transform: "translateY(-50%) rotate(45deg)",
									zIndex: 0
								}
							}
						}}
						transformOrigin={{ horizontal: "right", vertical: "top" }}
						anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
					>
						{links
							.filter((link) => link.id !== boardId)
							.map((link) => (
								<MenuItem
									key={link.id}
									onClick={() => {
										handleMove({
											cardId: cardId,
											sourceBoardId: boardId,
											targetBoardId: link.id
										})
									}}
								>
									{link.title}
								</MenuItem>
							))}
					</Menu>
				</Box>
				<Typography
					variant="h6"
					sx={{
						m: 0,
						fontSize: "1rem",
						cursor: "pointer"
					}}
					onClick={handleClickOpen}
				>
					{title}
				</Typography>
				<Typography
					sx={{
						fontSize: "0.8rem",
						color: "#909090",
						overflow: "hidden",
						display: "inline-block",
						maxWidth: "250px",
						textOverflow: "ellipsis",
						whiteSpace: "nowrap"
					}}
				>
					{description}
				</Typography>
			</CardContainer>
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
				<DialogTitle id="alert-dialog-title">{title}</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						{description}
					</DialogContentText>
				</DialogContent>
			</Dialog>
		</>
	)
}

export default Card
