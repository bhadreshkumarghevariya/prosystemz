import React from "react";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";

const DetailsButton = ({ onClick }) => {
  const renderTooltip = (props) => (
    <Tooltip id="edit-tooltip" {...props}>
      Edit
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
          className="feather feather-eye icon-xs"
        >
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
          <circle cx="12" cy="12" r="3"></circle>
        </svg>
      </Button>
    </OverlayTrigger>
  );
};

export default DetailsButton;
