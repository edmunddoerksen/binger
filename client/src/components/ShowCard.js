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


export default function ShowCard({ showName, handleClose }) {
  const [showData, setShowData] = useState({})
  const [streamingData, setStreamingData] = useState([])


  useEffect(() => {
    fetch(`http://${config.server_host}:${config.server_port}/show/${showName}`)
      .then((res) => res.json())
      .then((resJson) => {
        setShowData(resJson)

        fetch(
          `http://${config.server_host}:${config.server_port}/services/${showName}?type=TV Show`,
        )
          .then((res) => res.json())
          .then((resJson) => setStreamingData(resJson))
      })
  }, [])

  const handleLike = async () => {
    console.log("hello");
    const res = await axios.get(
      
      `http://${config.server_host}:${config.server_port}/toggleLikeShow/${showData.title}`,
      {
        headers: {
          authorization: sessionStorage.getItem('app-token'),
        },
      },
    )
  }
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
        <Typography variant="h2">{showData.title}</Typography>
        <h2>Director: {showData.director ?? 'N/A'}</h2>

        <p>Cast: {showData.cast ?? 'N/A'}</p>
        <p>Country: {showData.country ?? 'N/A'} </p>
        <p>Release Year: {showData.release_year}</p>
        <p>Rating: {showData.rating ?? 'N/A'}</p>
        <p>
          Duration: {showData.duration}{' '}
          {showData.duration === 1 ? 'Season' : 'Seasons'}{' '}
        </p>
        <p>Genres: {showData.listed_in ?? 'N/A'} </p>
        <p>Description: {showData.description ?? 'N/A'}</p>
        <p>Streaming On: {commaSeparated(streamingData)}</p>
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
