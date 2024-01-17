// DeviceReadingTable.js
import React, { useEffect, useState } from "react";
import { Table } from "reactstrap";
import { useTranslation } from "react-i18next";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAxleByCoachData,
  fetchCoachByDeviceReading,
  selectDeviceReadings,
} from "../redux/slices/deviceReadingsSlice";
import { toast } from "react-toastify";

const AxleTable = (props) => {
  const { t } = useTranslation();
  const selectorData = useSelector(selectDeviceReadings);

  return (
    <Table striped>
      <thead>
        <tr>
          <th colspan="12" className="bg-primary full-width">
            {" "}
            <p className="m-0 text-md text-white font-weight-bold">{`${t(
              "Axle"
            )}`}</p>
          </th>
        </tr>
        <tr>
          <th>{t("axleIndexCoach")}</th>
          <th>{t("time")}</th>
          <th>{t("rightTemp")}</th>
          <th>{t("manualRightTemp")}</th>
          <th>{t("leftTemp")}</th>
          <th>{t("manualLeftTemp")}</th>
          <th>{t("diffTemp")}</th>
          <th>{t("speed")}</th>
          <th>{t("actionDepot")}</th>
          <th>{t("actionControl")}</th>
          <th>{t("actionInsp")}</th>
          <th>{t("remark")}</th>
        </tr>
      </thead>
      <tbody>
        {selectorData?.axleByCoashData &&
          selectorData?.axleByCoashData.map((rowData) => (
            <tr key={rowData.id}>
              <td>{rowData.axle_index_coach ?? ""}</td>
              <td>
                {moment(rowData.timestamp).format("DD-MM-YYYY HH:mm:ss") ?? ""}
              </td>
              <td>{rowData.right_temp ?? ""}</td>
              <td>{rowData.manual_right_temp ?? ""}</td>
              <td>{rowData.left_temp ?? ""}</td>
              <td>{rowData.manual_left_temp ?? ""}</td>
              <td>{rowData.diff_temp ?? ""}</td>
              <td>{rowData.speed ?? ""}</td>
              <td>{rowData.action_depot ?? ""}</td>
              <td>{rowData.action_control ?? ""}</td>
              <td>{rowData.action_insp ?? ""}</td>
              <td>{rowData.remarks ?? ""}</td>
            </tr>
          ))}
      </tbody>
    </Table>
  );
};

const CoachTable = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const selectorData = useSelector(selectDeviceReadings);
  const [selectedCoachRow, setSelectedCoachRow] = useState({});
  const [isAxleDataShow, setAxleDataShow] = useState({});

  const handleCoachIconClick = (data) => {
    const { id } = data;
    setSelectedCoachRow(data);
    if (selectedCoachRow?.id === id) {
      if (!isAxleDataShow) {
        try {
          dispatch(fetchAxleByCoachData(id));
          setAxleDataShow(true);
        } catch (error) {
          toast.error(
            error?.response?.data || error?.message || "Data fetch failed."
          );
        }
      } else {
        setAxleDataShow(false);
      }
    }
  };

  return (
    <Table striped>
      <thead>
        <tr>
          <th colspan="12" className="bg-primary full-width">
            {" "}
            <p className="m-0 text-md text-white font-weight-bold">{`${t(
              "coaches"
            )}`}</p>
          </th>
        </tr>
        <tr>
          <th></th>
          <th>{t("name")}</th>
          <th>{t("position")}</th>
          <th>{t("time")}</th>
          <th>{t("type")}</th>
          <th>{t("maxRightTemo")}</th>
          <th>{t("maxLeftTemp")}</th>
          <th>{t("maxDiffTemp")}</th>
          <th>{t("avgSpeed")}</th>
          <th>{t("remark")}</th>
        </tr>
      </thead>
      <tbody>
        {selectorData?.coachByDeviceData &&
          selectorData?.coachByDeviceData.map((rowData) => (
            <>
              <tr key={rowData.id}>
                <td>
                  <i
                    className={`ni ni-bold-${
                      isAxleDataShow && selectedCoachRow.id === rowData.id
                        ? "down"
                        : "right"
                    } text-primary`}
                    style={{ cursor: "pointer" }}
                    onClick={() => handleCoachIconClick(rowData)}
                  ></i>
                </td>
                <td>{rowData.coach_name ?? ""}</td>
                <td>{rowData.coach_position ?? ""}</td>
                <td>
                  {moment(rowData.timestamp).format("DD-MM-YYYY HH:mm:ss") ??
                    ""}
                </td>
                <td>{rowData.coach_type ?? ""}</td>
                <td>{rowData.max_right_temp ?? ""}</td>
                <td>{rowData.max_left_temp ?? ""}</td>
                <td>{rowData.max_diff_temp ?? ""}</td>
                <td>{rowData.avg_speed ?? ""}</td>
                <td>{rowData.remarks ?? ""}</td>
              </tr>
              {isAxleDataShow && selectedCoachRow.id === rowData.id && (
                <tr className="p-4">
                  <td colSpan="12">
                    {(selectorData?.axleByCoashData?.length > 0 && (
                      <AxleTable />
                    )) ||
                      "No rows found"}
                  </td>
                </tr>
              )}
            </>
          ))}
      </tbody>
    </Table>
  );
};

const DeviceReadingTable = (props) => {
  const { station, selectedRows, onSelectedRowsChange, onSelectAllChange } = props;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const selectorData = useSelector(selectDeviceReadings);
  const [isCoachDataShow, setIsCoachDataShow] = useState(false);
  const [selectedRow, setSelectedRow] = useState({});
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    const allRowIds = station.map((rowData) => rowData.id);
    const isAllSelected =
      selectedRows.length === allRowIds.length &&
      allRowIds.every((id) => selectedRows.includes(id));
    setSelectAll(isAllSelected);
  }, [selectedRows, station]);

  const handleIconClick = (data) => {
    const { id } = data;
    setSelectedRow(data);
    if (selectedRow?.id === id) {
      if (!isCoachDataShow) {
        try {
          dispatch(fetchCoachByDeviceReading(id));
          setIsCoachDataShow(true);
        } catch (error) {
          toast.error(
            error?.response?.data || error?.message || "Data fetch failed."
          );
        }
      } else {
        setIsCoachDataShow(false);
      }
    }
  };

  const handleCheckboxChange = (rowData) => {
    const updatedSelectedRows = selectedRows.includes(rowData.id)
      ? selectedRows.filter((id) => id !== rowData.id)
      : [...selectedRows, rowData.id];

    onSelectedRowsChange(updatedSelectedRows);
  };

  const handleSelectAllChange = () => {
    const allRowIds = station.map((rowData) => rowData.id); 

    const isAllSelected =
      selectedRows.length === allRowIds.length &&
      allRowIds.every((id) => selectedRows.includes(id));

    onSelectAllChange(!isAllSelected, allRowIds);
  };

  return (
    <Table striped>
      <thead>
        <tr>
          <th colspan="12" className="bg-primary full-width">
            {" "}
            <p className="m-0 text-md text-white font-weight-bold">{`${t(
              "station"
            )}: ${(station?.length > 0 && station[0].station) || ""}`}</p>
          </th>
        </tr>
        <tr>
          <th>
            <input
              type="checkbox"
              checked={selectAll}
              onChange={handleSelectAllChange}
            />
          </th>
          <th></th>
          <th>{t("deviceId")}</th>
          <th>{t("time")}</th>
          <th>{t("trainDir")}</th>
          <th>{t("rakeType")}</th>
          <th>{t("coachCnt")}</th>
          <th>{t("axleCnt")}</th>
          <th>{t("maxRightTemo")}</th>
          <th>{t("maxLeftTemp")}</th>
          <th>{t("maxDiffTemp")}</th>
          <th>{t("avgSpeed")}</th>
          <th>{t("remark")}</th>
          <th>{t("trainNo")}</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {station &&
          station.map((rowData) => (
            <>
              <tr key={rowData.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(rowData.id)}
                    onChange={() => handleCheckboxChange(rowData)}
                  />
                </td>
                <td>
                  <i
                    className={`text-primary ni ni-bold-${
                      isCoachDataShow && selectedRow.id === rowData.id
                        ? "down"
                        : "right"
                    }`}
                    style={{ cursor: "pointer" }}
                    onClick={() => handleIconClick(rowData)}
                  ></i>
                </td>
                <td>{rowData.device_id ?? ""}</td>
                <td>
                  {moment(rowData.timestamp).format("DD-MM-YYYY HH:mm:ss") ??
                    ""}
                </td>
                <td>{rowData.train_dir ?? ""}</td>
                <td>{rowData.rake_type ?? ""}</td>
                <td>{rowData.coach_count ?? ""}</td>
                <td>{rowData.device_id ?? ""}</td>
                <td>{rowData.axle_count ?? ""}</td>
                <td>{rowData.max_right_temp ?? ""}</td>
                <td>{rowData.max_left_temp ?? ""}</td>
                <td>{rowData.max_diff_temp ?? ""}</td>
                <td>{rowData.avg_speed ?? ""}</td>
                <td>{rowData.remarks ?? ""}</td>
                <td>{rowData.train_no ?? ""}</td>
              </tr>
              {isCoachDataShow && selectedRow.id === rowData.id && (
                <tr className="p-4">
                  <td colSpan="12">
                    {(selectorData?.coachByDeviceData?.length > 0 && (
                      <CoachTable />
                    )) ||
                      "No rows found"}
                  </td>
                </tr>
              )}
            </>
          ))}
      </tbody>
    </Table>
  );
};

export default DeviceReadingTable;
