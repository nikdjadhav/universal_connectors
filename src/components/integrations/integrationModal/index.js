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
import { API_BASE_URL } from "@/utils/Constants";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import tkFetch from "@/utils/fetch";

const ModalButton = ({ modal, toggle, syncWay, configData, integrationID }) => {
  const [NSCTitle, setNSCTitle] = useState("NetSuite™");
  const [GSCTitle, setGSCTitle] = useState("Google Sheets™");
  const [integrationData, setIntegrationData] = useState([]);
  const [addedIntegrationsId, setAddedIntegrationId] = useState();

  const {
    data: integration,
    isLoading: integrationLoading,
    error: integrationError,
  } = useQuery({
    queryKey: ["getIntegrationById", integrationID],
    queryFn: tkFetch.get(`${API_BASE_URL}/getIntegrationById/${integrationID}`),
    enabled: !!integrationID,
  });

  const tabs = {
    Integration: 1,
    NetsuiteConfiguration: 2,
    GoogleSheetConfiguration: 3,
  };

  const [activeTab, setActiveTab] = useState(tabs.Integration);

  // data from database
  useEffect(() => {
    if (integrationID) {
      if (integration?.length) {
        setNSCTitle(integration[0]?.sourceName);
        setGSCTitle(integration[0]?.destinationName);
      }
    }
  }, [integration, integrationID]);

  // data from
  useEffect(() => {
    if (configData) {
      setNSCTitle(configData.source);
      setGSCTitle(configData.destination);
    }
  }, [configData]);

  // callback to get integration details from child component
  const getIntegrationDetails = (integrationData) => {
    if (integrationData) {
      setIntegrationData(integrationData);
      onClickHandeler();
    }
  };

  // callback to get integraion id from child component
  const getIntegrationId = (integrationId) => {
    if (integrationId) {
      setAddedIntegrationId(integrationId);
    }
  };

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
      toggle();
    }
  };

  return (
    <>
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
          </Nav>
        </div>

        <TkModalBody className="modal-body">
          <TabContent activeTab={activeTab}>
            <TabPane tabId={tabs.Integration}>
              <Integration
                onClickHandeler={onClickHandeler}
                syncWay={syncWay}
                configData={configData}
                toggle={toggle}
                integrationID={integrationID}
                getIntegrationDetails={getIntegrationDetails}
              />
            </TabPane>

            <TabPane tabId={tabs.NetsuiteConfiguration}>
              <NetsuiteComponent
                onClickHandeler={onClickHandeler}
                toggle={toggle}
                integrationID={integrationID}
                title={NSCTitle}
                integrationDetails={integrationData}
                getIntegrationId={getIntegrationId}
              />
            </TabPane>

            <TabPane tabId={tabs.GoogleSheetConfiguration}>
              <GoogleSheetComponent
                onClickHandeler={onClickHandeler}
                toggle={toggle}
                integrationID={integrationID}
                title={GSCTitle}
                addedIntegrationsId={addedIntegrationsId}
              />
            </TabPane>
          </TabContent>
        </TkModalBody>
      </TkModal>
    </>
  );
};

export default ModalButton;
