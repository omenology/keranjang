import React, { useEffect } from "react";

import { useBarang } from "../utils";
import Item from "./item";

const Items = (props) => {
  const { data, info, loading, error, addToKeranjang, setQuery, setData } = useBarang();

  useEffect(() => {
    if (props.newData) {
      setData(data.concat(props.newData));
    }
  }, [props.newData]);

  return (
    <div className="row">
      {data.map((val, index) => {
        return <Item key={index} data={val} addToKeranjang={addToKeranjang} />;
      })}

      <input
        type="number"
        defaultValue={10}
        onChange={(val) => {
          setQuery({ limit: val.currentTarget.value });
        }}
      />
    </div>
  );
};

export default Items;
