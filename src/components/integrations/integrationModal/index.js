import TkButton from "@/globalComponents/TkButton";
import TkCard, { TkCardBody } from "@/globalComponents/TkCard";
import TkDate from "@/globalComponents/TkDate";
import React, { useEffect, useState } from "react";
import TkModal, {
  TkModalBody,
  TkModalHeader,
} from "@/globalComponents/TkModal";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import classnames from "classnames";
import Integration from "./Integration";
import NetsuiteComponent from "./NetsuiteComponent";
import GoogleSheetComponent from "./GoogleSheetComponent";
import Verified from "./Verified";
import TkRow, { TkCol } from "@/globalComponents/TkRow";

const ModalButton = ({ modal, toggle, syncWay, configData }) => {
  // console.log("3 model", configData)

  const [NSCTitle, setNSCTitle] = useState("Netsuite");
  const [GSCTitle, setGSCTitle] = useState("Google Sheet");

  useEffect(() => {
    if(configData){
      setNSCTitle(configData.source.label);
      setGSCTitle(configData.destination.label);
    }
  })

  const tabs = {
    Integration: 1,
    NetsuiteConfiguration: 2,
    GoogleSheetConfiguration: 3,
    Verified: 4,
  };


  const [activeTab, setActiveTab] = useState(tabs.Integration);
  const toggleTab = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  const onClickHandeler = () => {
    if (activeTab === tabs.Integration) {
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
      {/* <TkButton className={"btn-success"} onClick={toggle}>
        {children}
      </TkButton> */}

      {/* *** forms modal *** */}
      <TkModal
        isOpen={modal}
        // toggle={toggle}
        centered
        size="lg"
        className="border-0"
        modalClassName="modal fade zoomIn"
      >
        <TkModalHeader className="p-3" toggle={toggle}>
          {"Configuration"}
        </TkModalHeader>
        <div className="px-2 pt-2 bg-soft-info">
          <Nav className="nav-tabs dropdown-tabs nav-tabs-custom">
            <NavItem>
              <NavLink
                href="#"
                className={classnames({
                  active: activeTab === tabs.Integration,
                })}
                onClick={() => {
                  toggleTab(tabs.Integration);
                }}
              >
                Integration
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
                {NSCTitle} Configuration
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
                {GSCTitle} Configuration
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
            <TabPane tabId={tabs.Integration}>
              <Integration onClickHandeler={onClickHandeler} syncWay={syncWay} configData={configData} />
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
        </TkModalBody>
      </TkModal>
    </>
  );
};

export default ModalButton;
