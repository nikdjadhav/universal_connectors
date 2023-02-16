import TkCard, {
  TkCardBody,
  TkCardHeader,
  TkCardTitle,
} from "@/globalComponents/TkCard";
import TkSelect from "@/globalComponents/TkSelect";
import TkTableContainer from "@/globalComponents/TkTableContainer";
// import { editValue } from "@/utils/Constants";
import React, { useState } from "react";
import Dropdown from "@/globalComponents/Dropdown";
import { editValue, netsuiteValues } from "@/utils/Constants";
import TkButton from "@/globalComponents/TkButton";
import { useRouter } from "next/router";
import TkRow, { TkCol } from "@/globalComponents/TkRow";
import TkInput from "@/globalComponents/TkInput";
import TkForm from "@/globalComponents/TkForm";
import * as Yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = Yup.object({}).required();

const MapTableComponent = () => {
  const {
    register,
    formState: { errors, isDirty },
    control,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [disabled, setDisabled] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  // console.log('selectedRow',selectedRow)
  const router = useRouter();
  // const onClickSave = () => {
  //   router.push("/dashboard");
  // };

  const tableHead = [
    {
      Header: "Google Sheets",
      accessor: "googleSheets",
      Cell: (props) => {
        // console.log("props.value", props.row.id);
        // const id = props.row.original.id;
        return (
          <TkInput
            {...register(props.value)}
            id={props.value}
            className="pe-5"
            // disabled={props.row.id == selectedRow ? false : true}
            defaultValue={props.value}
            // onChange={(e) => handleChange(e, props.row.id)}
            // style={props.value === "Name" ? {disabled : true} : {disabled : false}}
          />
        );
      },
    },
    {
      Header: "NetSuite",
      accessor: "netSuite",
      Cell: (props) => {
        // console.log("props props", props.row.original.id);
        return (
          <Controller
            name={props.row.id}
            control={control}
            render={({ field }) => (
              // <Dropdown {...field} id="netsuiteValues" data={netsuiteValues} />
              <TkSelect
              {...field}
                id={props.row.id}
                options={netsuiteValues}
                maxMenuHeight="80px"
              />
            )}
          />
        );
      },
    },
    {
      Header: "Action",
      accessor: "action",
      Cell: (prop) => {
        // console.log("row data", prop.row.original)
        return (
          <>
            <i
              className="ri-delete-bin-5-line pe-auto"
              onClick={() => onClickDelete(prop.row.original)}
            ></i>
            <i
              className="ri-edit-2-fill mx-2"
              onClick={() => onClickEdit(prop.row.original)}
            ></i>
            {/* <i className="ri-eye-fill"></i> */}
          </>
        );
      },
    },
    // {
    //   Header: "NetSuite Field Default Value",
    //   accessor: "netSuiteFieldDefaultValue",
    //   Cell: (props) => {
    //     return <Dropdown data={editValue} defaultValue={editValue[1]} />;
    //   },
    // },
  ];
  const data = [
    {
      id: 1,
      googleSheets: "Internal ID",
      netSuite: "",
      action: ""
      // netSuiteFieldDefaultValue: "",
    },
    {
      id: 2,
      googleSheets: "Name",
      netSuite: "",
      action: ""
      // netSuiteFieldDefaultValue: "",
    },
    {
      id: 3,
      googleSheets: "Email",
      netSuite: "",
      action: ""
      // netSuiteFieldDefaultValue: "",
    },
  ];

  // *** to add new row add set data ***
  const [row, setRow] = useState(data);
  const addField = () => {
    setRow((prevRows) => [
      ...prevRows,
      {
        googleSheets: " ",
        netSuite: "",
        action: ""
      },
    ]);
  };

  // *** Input field data ***
  const handleChange = (event, id) => {
    console.log(event.target.value, "===", id);
    const addedData = row.map((col) => {
      if (col.id === id) {
        col.googleSheets = event.target.value;
      }
    });
    // setRow(addedData);
  };

  // *** To delete row
  const onClickDelete = (value) => {
    console.log("deleted value", value);
    const data = row.filter((col) => col !== value);
    // console.log(data);
    setRow(data);
  };

  const onClickEdit = (rows) => {
    console.log("rows", rows);
    setSelectedRow(rows.id - 1);
    // row.map((col) => {
    //   if (col === value) {
    //     console.log(col);
    //     // setDisabled(false);
    //     // setSelectedRow(value.id)
    //   }
    // });
    // setSelectedRow((prevValue) => {
    //   // const value = {...prevValue}
    //   console.log({...prevValue, id: rows.id})
    //   return {...prevValue, id: rows.id}
    //   // rows.forEach((row) => {
    //     // if (!value[id]){
    //     //   value[id] = ""
    //     // }
    //   // })
    //   // return value;
    // })
  };

  // *** to save data
  const onClickSave = (data) => {
    // e.preventDefault();
    console.log("save data", data);
    setDisabled(true);
  };

  return (
    <>
      <TkRow className="justify-content-cente">
        <TkCol lg={5}>
          <h5>Field Mapping</h5>
        </TkCol>
        <TkCol lg={1} className="offset-6">
          <TkButton className="btn-success" type="button" onClick={addField}>
            Add
          </TkButton>
        </TkCol>
      </TkRow>

      <TkForm onSubmit={handleSubmit(onClickSave)}>
        <TkRow className="row justify-content-center">
          <TkCol lg={10}>
            <TkTableContainer
              columns={tableHead}
              data={row}
              // options={options}
              // isSearch={true}
              defaultPageSize={10}
              customPageSize={true}
              // isFilters={true}
              // showPagination={true}
              // rowSelection={true}
              // showSelectedRowCount={true}
            />
          </TkCol>
        </TkRow>

        <TkRow className="row justify-content-end">
          <TkCol lg={1} sm={2}>
            <TkButton className="btn-success" type="submit">
              Save
            </TkButton>
          </TkCol>
        </TkRow>
      </TkForm>
    </>
  );
};

export default MapTableComponent;
