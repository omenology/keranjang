import React, { useEffect, useState } from "react";

import { useGetBarang, dataBarangArrType } from "../utils";
import Item from "./item";

const Items = (props) => {
  const { data, info, loading, err } = useGetBarang();
  const [newData, setNewData] = useState<dataBarangArrType>([]);

  useEffect(() => {
    if (props.newData) setNewData(newData.concat(props.newData));
  }, [props.newData]);

  return (
    <div className="row">
      {data.map((val, index) => {
        return <Item key={index} data={val} />;
      })}
      {newData.map((val, index) => {
        return <Item key={index} data={val} />;
      })}
    </div>
  );
};

export default Items;
