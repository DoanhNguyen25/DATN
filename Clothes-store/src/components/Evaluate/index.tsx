import React from "react";
import { EvaluateWrapper } from "./style";
import moment from "moment";
import "moment/locale/vi";
// moment.locale("vi");

const Evaluate = ({ value }: any) => {
  return (
    <EvaluateWrapper>
      <div className="evaluate__info">
        <div className="evaluate__info--avatar">
          <div>D</div>
          <span>{value.name}</span>
        </div>
        <div className="evaluate__info--date">
          {moment(value.createdAt).startOf("hour").fromNow()}
        </div>
      </div>
      <div className="evaluate__content">
        <div className="evaluate__content--container">{value.comment}</div>
      </div>
    </EvaluateWrapper>
  );
};

export default Evaluate;
