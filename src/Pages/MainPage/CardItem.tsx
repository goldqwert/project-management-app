import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Card, Button } from 'antd'
import Modal from '../../components/Modal/Modal'
import deleteBoard from '../../store/actions/deleteBoard-actions'
import { removeBoard } from '../../store/slices/ContentSlice'
import { dispatchStore, RootState } from '../../types/types'

const CardItem = (props) => {
    const { id, title, description } = props.item
    const [showModal, setShowModal] = useState(false)
    const boardItems = useSelector((state: RootState) => state.board.boardItems)
    const error = useSelector((state: RootState) => state.board.error)
    const existingBoard = boardItems.find((item) => {
        return item.id === id
    })
    const existingBoardId = existingBoard.id

    const deleteBoardHandler = () => {
        setShowModal(true)
    }
    const deleteClickHandler = () => {
        dispatchStore(removeBoard(id))
        dispatchStore(deleteBoard(existingBoardId))

        setShowModal(false)
    }

    const modalHandler = () => {
        setShowModal(false)
    }

    return (
        <>
            {showModal && (
                <Modal onConfirm={modalHandler}>
                    <header className="header">
                        <h2>Do you really want to delete board?</h2>
                    </header>
                    <footer className="actions">
                        <Button type="primary" onClick={deleteClickHandler}>
                            Delete
                        </Button>
                        <Button type="primary" onClick={modalHandler}>
                            Cancel
                        </Button>
                    </footer>
                </Modal>
            )}
            <div className="site-card-border-less-wrapper">
                {error && <p>Deleting board failed!</p>}
                <Link to="/board">
                    <Card
                        title={title}
                        bordered={false}
                        style={{ width: 300, marginLeft: 70, marginTop: 40 }}
                    >
                        <p>{description}</p>
                    </Card>
                </Link>
                <Button
                    type="primary"
                    onClick={deleteBoardHandler}
                    style={{ marginLeft: 150, marginTop: 10 }}
                >
                    Delete board
                </Button>
            </div>
        </>
    )
}

export default CardItem
