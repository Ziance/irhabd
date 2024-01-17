// DeviceReadingFilterModal.js
import React, { useState } from "react";
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Button,
  CardBody,
  Input,
} from "reactstrap";
import LocationDropDown from "../components/common/locationDropDown";
import Select from "react-select";
import RangeSlider from "../components/common/rangeSlider";
import moment from "moment";

const DeviceReadingFilterModal = (props) => {
  const { toggleHandler, isModalOpen = false, handleFilterApply } = props;
  const [maxTempRange, setMaxTempRange] = useState({
    min: 0,
    max: 1000,
  });
  const [diffTempRange, setDiffTempRange] = useState({
    min: 0,
    max: 1000,
  });
  const [axleCountRange, setAxleCountRange] = useState({
    min: 0,
    max: 1000,
  });
  const [speedRange, setSpeedRange] = useState({
    min: 0,
    max: 1000,
  });
  const [filterKeys, setFilerKeys] = useState(null);

  const filterChangeHandler = (key, value) => {
    let obj = filterKeys;
    if (Array.isArray(value) && value.length) {
      let keyTitle =
        key === "zones"
          ? "zone_id"
          : key === "divisions"
          ? "division_id"
          : "station_id";
      obj = {
        ...obj,
        [keyTitle]: value.map((d) => d.value).join(","),
      };
    } else {
      obj = {
        ...obj,
        [key]: value,
      };
    }
    setFilerKeys(obj);
  };

  return (
    <Modal
      className="modal-dialog-centered"
      size="lg"
      isOpen={isModalOpen}
      toggle={toggleHandler}
    >
      <ModalHeader>Filters</ModalHeader>
      <ModalBody>
        <LocationDropDown
          isShowHeaderBackground={false}
          getSelectedData={(key, options) => {
            if (filterKeys?.zone_id) delete filterKeys.zone_id;
            if (filterKeys?.division_id) delete filterKeys.division_id;
            if (filterKeys?.station_id) delete filterKeys.station_id;
            filterChangeHandler(key, options);
          }}
        />
        <div className="row">
          <div className="col-md-6 col-xl-4">
            <div className="card-stats card border-0">
              <CardBody>
                <p className="text-muted text-sm">{"Start Date"}</p>
                <Input
                  type="date"
                  onChange={(e) =>
                    filterChangeHandler(
                      "start_date",
                      moment(e.target.value).format("DD-MM-YYYY")
                    )
                  }
                />
              </CardBody>
            </div>
          </div>
          <div className="col-md-6 col-xl-4">
            <div className="card-stats card border-0">
              <CardBody className="card-body">
                <p className="text-muted text-sm">{"End Date"}</p>
                <Input
                  type="date"
                  onChange={(e) =>
                    filterChangeHandler(
                      "end_date",
                      moment(e.target.value).format("DD-MM-YYYY")
                    )
                  }
                />
              </CardBody>
            </div>
          </div>
          <div className="col-md-6 col-xl-4">
            <div className="card-stats card border-0">
              <CardBody className="card-body">
                <p className="text-muted text-sm">{"Hot Axle only"}</p>
                <label className="custom-toggle">
                  <input
                    defaultChecked={false}
                    type="checkbox"
                    onChange={(e) =>
                      filterChangeHandler("hot_axle", e.target.checked)
                    }
                  />
                  <span className="custom-toggle-slider rounded-circle" />
                </label>
              </CardBody>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 col-xl-4">
            <div className="card-stats card border-0">
              <CardBody className="card-body">
                <p className="text-muted text-sm">{"Discard Demu"}</p>
                <label className="custom-toggle">
                  <input defaultChecked={false} type="checkbox" />
                  <span className="custom-toggle-slider rounded-circle" />
                </label>
              </CardBody>
            </div>
          </div>
          <div className="col-md-6 col-xl-4">
            <div className="card-stats card border-0">
              <CardBody className="card-body">
                <p className="text-muted text-sm">{"Train Type"}</p>
                <Select options={[]} />
              </CardBody>
            </div>
          </div>
          <div className="col-md-6 col-xl-4">
            <div className="card-stats card border-0">
              <CardBody className="card-body">
                <p className="text-muted text-sm">{"Train Sub-Type"}</p>
                <Select options={[]} />
              </CardBody>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 col-xl-6">
            <div className="card-stats card border-0">
              <CardBody className="card-body">
                <p className="text-muted text-sm">{"Max Temprature"}</p>
                <RangeSlider
                  minVal={maxTempRange.min}
                  maxVal={maxTempRange.max}
                  defaultMin={0}
                  defaultMax={1000}
                  step={1}
                  onInputHandler={(bounds) =>
                    setMaxTempRange({ min: bounds[0], max: bounds[1] })
                  }
                />
              </CardBody>
            </div>
          </div>

          <div className="col-md-6 col-xl-6">
            <div className="card-stats card border-0">
              <CardBody className="card-body">
                <p className="text-muted text-sm">{"Axle Count"}</p>
                <RangeSlider
                  minVal={axleCountRange.min}
                  maxVal={axleCountRange.max}
                  defaultMin={0}
                  defaultMax={1000}
                  step={1}
                  onInputHandler={(bounds) =>
                    setAxleCountRange({ min: bounds[0], max: bounds[1] })
                  }
                />
              </CardBody>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 col-xl-6">
            <div className="card-stats card border-0">
              <CardBody className="card-body">
                <p className="text-muted text-sm">{"Diff Temprature"}</p>
                <RangeSlider
                  minVal={diffTempRange.min}
                  maxVal={diffTempRange.max}
                  defaultMin={0}
                  defaultMax={1000}
                  step={1}
                  onInputHandler={(bounds) =>
                    setDiffTempRange({ min: bounds[0], max: bounds[1] })
                  }
                />
              </CardBody>
            </div>
          </div>

          <div className="col-md-6 col-xl-6">
            <div className="card-stats card border-0">
              <CardBody className="card-body">
                <p className="text-muted text-sm">{"Speed"}</p>
                <RangeSlider
                  minVal={speedRange.min}
                  maxVal={speedRange.max}
                  defaultMin={0}
                  defaultMax={1000}
                  step={1}
                  onInputHandler={(bounds) =>
                    setSpeedRange({ min: bounds[0], max: bounds[1] })
                  }
                />
              </CardBody>
            </div>
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button
          color="primary"
          onClick={() => {
            handleFilterApply && handleFilterApply(filterKeys);
          }}
        >
          Apply
        </Button>
        <Button color="secondary" onClick={() => setFilerKeys(null)}>
          Clear
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default DeviceReadingFilterModal;
