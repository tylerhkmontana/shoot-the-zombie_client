import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { deleteMessage } from '../actions/message.action'
import './Message.css'

function Message(props) {
  const dispatch = useDispatch()
  const [visibility, setVisibility] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      dispatch(deleteMessage(props.content))
    }, 3000)
    return setVisibility(false)
  }, [])

  return (
    <div className="Message" style={{animation: `${visibility ? "fadeIn" : "fadeOut"} 2s`}}>
      <p>{props.content}</p>
    </div>
  )
}

export default Message
