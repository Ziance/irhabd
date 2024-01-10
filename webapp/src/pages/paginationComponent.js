// PaginationComponent.js
import React from "react";
import {
  Col,
  Row,
  Pagination,
  PaginationItem,
  PaginationLink,
  Input,
  Label,
} from "reactstrap";
import { useTranslation } from "react-i18next";

const PaginationComponent = (props) => {
  const {
    station,
    currentPage,
    rowsPerPage,
    handlePageChange,
    handleRowsPerPageChange,
    groupedByStation,
  } = props;
  const { t } = useTranslation();

  return (
    <Row className="justify-content-center mb-3">
      <Col xs="auto" className="d-flex align-items-center">
        <Pagination>
          <PaginationItem disabled={currentPage === 1}>
            <PaginationLink
              onClick={() => {
                handlePageChange(
                  currentPage - 1,
                  station && station[0]?.station
                );
              }}
              className="border-0 bg-transparent mt-2 text-primary"
            >
              {t("prev")}
            </PaginationLink>
          </PaginationItem>
        </Pagination>
      </Col>
      <Col
        xs="auto"
        className="d-flex align-items-center justify-content-center w-auto"
      >
        <Label for="rowsPerPage" className="mr-2 text-muted text-sm">
          Rows
        </Label>
        <Input
          type="number"
          id="rowsPerPage"
          defaultValue={5}
          onChange={(e) => {
            handleRowsPerPageChange(e, station && station[0]?.station);
          }}
          min={5}
          size="small"
          className="w-25 max-w-50 p-0 text-center"
        />
      </Col>
      <Col xs="auto" className="d-flex align-items-center">
        <Pagination>
          <PaginationItem
            disabled={
              currentPage ===
              Math.ceil(Object.keys(groupedByStation)?.length / rowsPerPage)
            }
          >
            <PaginationLink
              onClick={() =>
                handlePageChange(
                  currentPage + 1,
                  station && station[0]?.station
                )
              }
              className="border-0 bg-transparent mt-2 text-primary"
            >
              {t("next")}
            </PaginationLink>
          </PaginationItem>
        </Pagination>
      </Col>
    </Row>
  );
};

export default PaginationComponent;
