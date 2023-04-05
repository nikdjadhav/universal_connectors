import TkButton from "@/globalComponents/TkButton";
import TkCard, { TkCardBody } from "@/globalComponents/TkCard";
import TkDate from "@/globalComponents/TkDate";
import React, { useEffect, useRef, useState } from "react";
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
import {
  API_BASE_URL,
  data,
  destinationName,
  sourceName,
} from "@/utils/Constants";
import { useMutation, useQuery } from "@tanstack/react-query";
import tkFetch from "@/utils/fetch";

const ModalButton = ({ modal, toggle, syncWay, configData, integrationID:intId }) => {
  // console.log("3 model", configData)
  // console.log('in modal==>', intId);

  const [NSCTitle, setNSCTitle] = useState("NetSuite™");
  const [GSCTitle, setGSCTitle] = useState("Google Sheets™");
  const [integrationID, setIntegrationID] = useState();

  // const integration = useMutation({
  //   // mutationFn: tkFetch.post("http://localhost:4000/v1/getIntegrationById"),
  //   mutationFn: tkFetch.post(`${API_BASE_URL}/getIntegrationById`),
  // });

  const {data: integration, isError, isLoading, error} = useQuery({
    queryKey: ["getIntegrationById", intId],
    queryFn: tkFetch.get(`${API_BASE_URL}/getIntegrationById/${intId}`),
    // queryFn: tkFetch.get(`http://localhost:4000/v1/getIntegrationById/${intId}`),

    enabled: !!intId,
  })
  // console.log("index==>",integration);
  useEffect(() => {
    if (intId) {
      // console.log("in modal==>", intId);

      const id = {
        id: JSON.parse(intId),
      };

      if(integration?.length){
        setNSCTitle(integration[0]?.sourceName);
        setGSCTitle(integration[0]?.destinationName);
      }

      // integration.mutate(id, {
      //   onSuccess: (data) => {
      //     // console.log("data", data);
      //     setNSCTitle(data[0]?.sourceName);
      //     setGSCTitle(data[0]?.destinationName);
      //   },
      //   onError: (error) => {
      //     console.log("error", error);
      //   },
      // });
    }
  }, [integration, intId]);

  // console.log("other==>", intId);

  // useEffect(() => {
  //   if (other) {
  //     console.log("in modal==>", other);
  //     data.map((item) => {
  //       if (item.id === other.recordId) {
  //         setNSCTitle(item.sourceName);
  //         setGSCTitle(item.destinationName);
  //         console.log("in modal==>", item.sourceName);
  //       }
  //     });
  //   }

  // }, [other]);

  // sourceName.map((item) => {
  //   destinationName.map((item2) => {})
  //   if(item.source.label === NSCTitle){
  //     configData = {
  //       source: item.source.label,
  //       destination: item.destination.label,
  //     }
  //   }
  // })
  // console.log("configData", configData)

  useEffect(() => {
    if (configData) {
      setNSCTitle(configData.source);
      setGSCTitle(configData.destination);
      // setNSCTitle(configData.source.label || configData.source);
      // setGSCTitle(configData.destination.label || configData.destination);
    }
  }, [configData]);

  // callback to get integrationID from child component
  const getIntegrationID = (id) => {
    setIntegrationID(id);
  };
  // console.log("integrationID########", typeof(integrationID));

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
              <Integration
                onClickHandeler={onClickHandeler}
                syncWay={syncWay}
                configData={configData}
                toggle={toggle}
                integrationID={intId}
                getIntegrationID={getIntegrationID}
              />
            </TabPane>

            <TabPane tabId={tabs.NetsuiteConfiguration}>
              <NetsuiteComponent
                onClickHandeler={onClickHandeler}
                integrationID={intId || integrationID}
                title={NSCTitle}
              />
            </TabPane>

            <TabPane tabId={tabs.GoogleSheetConfiguration}>
              <GoogleSheetComponent
                onClickHandeler={onClickHandeler}
                integrationID={intId || integrationID}
                title={GSCTitle}
              />
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
