import React, { useState } from "react";
import "../../styles/base/Card.css";

const Card = React.forwardRef(
  (
    {
      width = "250px",
      // height = "300px",
      child,
      blurColor = "rgba(48,118,234,0.2)",
      onClick,
    },
    ref
  ) => (
    <div
      class="col-xl-3 col-lg-4 col-md-6 col-sm-6 ">
        <div class="card__item four">
          <div class="card_body space-y-10"
            
              
      
    >
      {child}
      
      
      </div>
      </div>
    </div>
  )
);
export default Card;
