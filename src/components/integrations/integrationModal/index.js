import TkButton from "@/globalComponents/TkButton";
import TkCard, { TkCardBody } from "@/globalComponents/TkCard";
import TkDate from "@/globalComponents/TkDate";
import React, { useState } from "react";
import TkModal, {
  TkModalBody,
  TkModalHeader,
} from "@/globalComponents/TkModal";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import classnames from "classnames";
import Form from "./Form";
import NetsuiteComponent from "./NetsuiteComponent";
import GoogleSheetComponent  from "./GoogleSheetComponent";
import Verified from "./Verified";
import TkRow, { TkCol } from "@/globalComponents/TkRow";

const ModalButton = ({ children, modal, toggle }) => {
  // const tabs = [
  //   { id: 1, name: "Form" },
  //   { id: 2, name: "Netsuite Configuration" },
  //   { id: 3, name: "Google Sheet Configuration" },
  //   { id: 4, name: "Verified" },
  // ];

  const tabs = {
    Form: 1,
    NetsuiteConfiguration: 2,
    GoogleSheetConfiguration: 3,
    Verified: 4,
  };

  // const [activeTab, setActiveTab] = useState(tabs.personalInfo);
  // const toggleTab = (tab) => {
  //   if (activeTab !== tab) {
  //     setActiveTab(tab);
  //   }
  // };
  const [btnText, setBtnText] = useState("Next Step");
  const [activeTab, setActiveTab] = useState(tabs.Form);
  const toggleTab = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  console.log(activeTab);

  // const onClickHandeler = () => {
  //   for (let j = 0; j < tabs.length; j++) {
  //     if (activeTab === tabs[j].name) {
  //       if (j < tabs.length - 1) {
  //         setActiveTab(tabs[j + 1].name);

  //         if (j === tabs.length - 2) {
  //           setBtnText("Finish");
  //           // toggle();
  //         }
  //         // } else {
  //         //   // setActiveTab(tabs[0].name);
  //         // }
  //       }
  //     }
  //   }
  // };

  const onClickHandeler = () => {
    if (activeTab === tabs.Form) {
      setActiveTab(tabs.NetsuiteConfiguration);
    }
    if (activeTab === tabs.NetsuiteConfiguration) {
      setActiveTab(tabs.GoogleSheetConfiguration);
    }
    if (activeTab === tabs.GoogleSheetConfiguration) {
      setActiveTab(tabs.Verified);
    }
    if (activeTab === tabs.Verified) {
      toggle();
    }
  };

  return (
    <>
      <TkButton className={"btn-success"} onClick={toggle}>
        {children}
      </TkButton>

      <TkModal
        isOpen={modal}
        // toggle={toggle}
        centered
        size="lg"
        className="border-0"
        modalClassName="modal fade zoomIn"
      >
        <TkModalHeader className="p-3" toggle={toggle}>
          {"Verify your account"}
        </TkModalHeader>
        <div className="px-2 pt-2 bg-soft-info">
          <Nav className="nav-tabs dropdown-tabs nav-tabs-custom">
            <NavItem>
              <NavLink
                href="#"
                className={classnames({
                  active: activeTab === tabs.Form,
                })}
                onClick={() => {
                  toggleTab(tabs.Form);
                }}
              >
                Form
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink
                href="#"
                className={classnames({
                  active: activeTab === tabs.NetsuiteConfiguration,
                })}
                onClick={() => {
                  toggleTab(tabs.NetsuiteConfiguration);
                }}
              >
                Netsuite Configuration
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink
                href="#"
                className={classnames({
                  active: activeTab === tabs.GoogleSheetConfiguration,
                })}
                onClick={() => {
                  toggleTab(tabs.GoogleSheetConfiguration);
                }}
              >
                Google Sheet Configuration
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink
                href="#"
                className={classnames({ active: activeTab === tabs.Verified })}
                onClick={() => {
                  toggleTab(tabs.Verified);
                }}
              >
                Verified
              </NavLink>
            </NavItem>
          </Nav>
        </div>

        <TkModalBody className="modal-body">
          {/* <TkForm onSubmit={handleSubmit(onSubmit)}> */}
          <TabContent activeTab={activeTab}>
            <TabPane tabId={tabs.Form}>
              <Form onClickHandeler={onClickHandeler} />
            </TabPane>

            <TabPane tabId={tabs.NetsuiteConfiguration}>
              <NetsuiteComponent onClickHandeler={onClickHandeler} />
            </TabPane>

            <TabPane tabId={tabs.GoogleSheetConfiguration}>
              <GoogleSheetComponent onClickHandeler={onClickHandeler} />
            </TabPane>

            <TabPane tabId={tabs.Verified}>
              <Verified onClickHandeler={onClickHandeler} />
            </TabPane>
          </TabContent>
          {/* <TkButton
            type="button"
            className="btn btn-primary float-end"
            onClick={onClickHandeler}
          >
            {btnText}
          </TkButton> */}
        </TkModalBody>
      </TkModal>
    </>
  );
};

export default ModalButton;
