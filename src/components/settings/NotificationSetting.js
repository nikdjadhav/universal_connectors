import TkInput from "@/globalComponents/TkInput";
import TkTableContainer from "@/globalComponents/TkTableContainer";
import React from "react";

const NotificationSetting = () => {

    const notificationHeader = [
        {
            Header: "Notification",
            accessor: "notification",
        },
        {
            Header: "Email",
            accessor: "email",
            Cell: () => {
                return (
                    <TkInput type="text" />
                )
            }
        }
    ]

    const notificationData = [
        {
            notification: "Send NetSuite™ invalid credentials notification to",
            email: ""
        },
        {
            notification: "Send NetSuite™ custom record update error notification to",
            email: ""
        },
        {
            notification: "Send status update error notification to",
            email: ""
        }
    ]
  return (
    <>
        <TkTableContainer columns={notificationHeader} data={notificationData} />
    </>
  );
};

export default NotificationSetting;
