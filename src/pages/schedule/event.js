import EventSchedule from '@/components/schedule';
import TkContainer from '@/components/TkContainer';
import TkPageHead from '@/globalComponents/TkPageHead';
import BreadCrumb from '@/utils/BreadCrumb';
import React from 'react'

const Event = () => {
  return (
    <>
    <TkPageHead>
        <title>{"Event"}</title>
    </TkPageHead>

    <div className="page-content">
        <BreadCrumb parentTitle="Schedule" parentLink='/schedule' pageTitle='Event' />

        {/* <TkContainer> */}
            <EventSchedule />
        {/* </TkContainer> */}
    </div>
    </>
  )
}

export default Event
Event.options = {
    layout: true,
    auth: true,
  };

   
