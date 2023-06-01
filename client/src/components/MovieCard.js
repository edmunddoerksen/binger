import { commaSeparated } from '../utils.js'
import { useEffect, useState } from 'react'
import {
  Box,
  Button,
  ButtonGroup,
  Link,
  Modal,
  Typography,
} from '@mui/material'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import axios from 'axios'

const config = require('../config.json')

export default function MovieCard({ showName, handleClose }) {
  const [showData, setShowData] = useState({})
  const [streamingData, setStreamingData] = useState([])

  const handleLike = async () => {
    console.log("hello;");
    const res = await axios.get(
      `http://${config.server_host}:${config.server_port}/toggleLike/${showData.id}`,
      {
        headers: {
          authorization: sessionStorage.getItem('app-token'),
        },
      },
    )
  }
  useEffect(() => {
    fetch(
      `http://${config.server_host}:${config.server_port}/movie/${showName}`,
    )
      .then((res) => res.json())
      .then((resJson) => {
        console.log(resJson)
        setShowData(resJson)
      })
  }, [])


  return (
    <Modal
      open={true}
      onClose={handleClose}
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        p={3}
        style={{
          background: 'white',
          borderRadius: '16px',
          border: '2px solid #000',
          width: 600,
        }}
      >
        <Typography variant="h2" className='my-3'>{showData.original_title}</Typography>
        <p className='my-1'><b>Budget:</b> {showData.budget !== 0 ? showData.budget : 'N/A'}</p>
        <p className='my-1'><b>Genres:</b> {showData.genres}</p>
        <p className='my-1'><b>Language:</b> {showData.original_language} </p>
        <p className='my-1'><b>Description:</b> {showData.overview}</p>
        {showData && showData.modified_release_year && (
          <p className='my-1'><b>Release Year:</b> {showData.modified_release_year.slice(0, 4)}</p>
        )}
        <span className="clickable hover:bg-orange-300" onClick={handleLike}>
          <FontAwesomeIcon
            icon={icon({ name: 'heart', style: 'regular' })}
            color="red"
          />
        </span>

        <Button
          onClick={handleClose}
          style={{ left: '50%', transform: 'translateX(-50%)' }}
        >
          Close
        </Button>
      </Box>
    </Modal>
  )
}
