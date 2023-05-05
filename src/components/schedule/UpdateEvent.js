import React from 'react'
import EventSchedule from './events'

const UpdateEvent = ({ eventId }) => {
  return (
    <div>
      <EventSchedule
      eventId = {eventId}
       />
    </div>
  )
}

export default UpdateEvent
