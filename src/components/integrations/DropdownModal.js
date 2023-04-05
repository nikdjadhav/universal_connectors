import TkButton from "@/globalComponents/TkButton";
import TkLabel from "@/globalComponents/TkLabel";
import TkModal, {
  TkModalBody,
  TkModalHeader,
} from "@/globalComponents/TkModal";
import TkRow, { TkCol } from "@/globalComponents/TkRow";
import TkSelect from "@/globalComponents/TkSelect";
import { destinationName, sourceName } from "@/utils/Constants";
import React, { useCallback, useEffect, useState } from "react";
import ModalButton from "./integrationModal";
import * as Yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import TkForm from "@/globalComponents/TkForm";
import FormErrorText from "@/globalComponents/ErrorText";

const schema = Yup.object({
  source: Yup.object().nullable().required("Field is required"),
  destination: Yup.object().nullable().required("Field is required"),
}).required();

const DropdownModal = ({ children, dModal, dropdownToggleModal, syncWay }) => {
  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors, isDurty },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // console.log("syncWay in next", syncWay);
  const [firstLabel, setFirstTitle] = useState();
  const [secondLabel, setSecondTitle] = useState();
  const [data, setData] = useState();

  useEffect(() => {
    if (syncWay === "oneWaySync") {
      setFirstTitle("Source");
      setSecondTitle("Destination");
    } else {
      setFirstTitle("System One");
      setSecondTitle("System Two");
    }
  },[syncWay]);
  // ***to open form modal
  const [integrationModal, setIntegrationModal] = useState(false);
  const integrationToggle = useCallback(() => {
    if (integrationModal) {
      setIntegrationModal(false);

      // *** close last modal(dropdown modal)
      dropdownToggleModal();
    } else {
      setIntegrationModal(true);
    }
  }, [dropdownToggleModal, integrationModal]);

  const onSubmit = (values) => {
    // console.log("values", values);
    // console.log('data',values.source.label, values.destination.label);
    integrationToggle();
    const lables = {
      source: values.source.label,
      destination: values.destination.label,
    }
    setData(lables);
  };
  // console.log('setData',data);

  return (
    <>
      <TkButton
        type="submit"
        className={"btn-success"}
        onClick={dropdownToggleModal}
      >
        {children}
      </TkButton>

      {/* *** dropdown modal *** */}
      <TkModal
        isOpen={dModal}
        centered
        size="lg"
        className="border-0"
        modalClassName="modal fade zoomIn"
      >
        <TkModalHeader
          className="p-3 bg-soft-info"
          toggle={dropdownToggleModal}
        >
          {"Select"}
        </TkModalHeader>

        <TkModalBody className="modal-body">
          <TkForm onSubmit={handleSubmit(onSubmit)}>
            <TkRow>
              <TkCol lg={6} className="my-3">
                <Controller
                  name="source"
                  control={control}
                  render={({ field }) => (
                    <>
                      <TkLabel id="source" requiredStarOnLabel={true}>
                        {firstLabel}
                      </TkLabel>
                      <TkSelect
                        {...field}
                        id="source"
                        // labelName="Source"
                        options={sourceName}
                        maxMenuHeight="130px"
                      />
                    </>
                  )}
                />
                {errors.source?.message ? (
                  <FormErrorText>{errors.source?.message}</FormErrorText>
                ) : null}
              </TkCol>

              <TkCol lg={6} className="my-3">
                <Controller
                  name="destination"
                  control={control}
                  render={({ field }) => (
                    <>
                      <TkLabel id="destination" requiredStarOnLabel={true}>
                        {secondLabel}
                      </TkLabel>
                      <TkSelect
                        {...field}
                        id="destination"
                        // labelName="Destination"
                        options={destinationName}
                        maxMenuHeight="130px"
                      />
                    </>
                  )}
                />
                {errors.destination?.message ? (
                  <FormErrorText>{errors.destination?.message}</FormErrorText>
                ) : null}
              </TkCol>

              <TkCol lg={12} className="my-4 d-flex justify-content-center">
                {/* <ModalButton
                  modal={ integrationModal}
                  toggle={ integrationToggle}
                  syncWay={syncWay}
                > */}
                <TkButton className="btn-success" type="submit">Submit</TkButton>
                {/* </ModalButton> */}
              </TkCol>
            </TkRow>
          </TkForm>
        </TkModalBody>
      </TkModal>
      <ModalButton
        modal={integrationModal}
        toggle={integrationToggle}
        syncWay={syncWay}
        configData={data}
      />
    </>
  );
};

export default DropdownModal;
