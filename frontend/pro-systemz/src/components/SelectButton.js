import React from "react";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";

const SelectButton = ({ onClick }) => {
  const renderTooltip = (props) => (
    <Tooltip id="edit-tooltip" {...props}>
      Select
    </Tooltip>
  );

  return (
    <OverlayTrigger placement="top" overlay={renderTooltip}>
      <Button
        variant="ghost"
        size="sm"
        className="rounded-circle texttooltip"
        data-template="editOne"
        onClick={onClick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-plus-square m-2"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="12" y1="8" x2="12" y2="16"></line>
          <line x1="8" y1="12" x2="16" y2="12"></line>
        </svg>
        Select
      </Button>
    </OverlayTrigger>
  );
};

export default SelectButton;
