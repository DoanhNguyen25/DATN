import React from "react";
import { SaleWrapper } from "./style";

const Sale = () => {
  return (
    <SaleWrapper>
      <div className="sale__container">
        <div className="sale--title">Giảm giá sốc tới 30%</div>
        <div className="sale--desc">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat,
          doloribus sed! Sit, culpa in. Eum, deserunt ipsa harum quod quasi
          tempora, provident id facilis officia, sit eaque vero molestias
          aperiam.
        </div>
        <div className="sale--btn">
          <button>Đăng kí</button>
        </div>
      </div>
      <div className="sale__overlay"></div>
    </SaleWrapper>
  );
};

export default Sale;
