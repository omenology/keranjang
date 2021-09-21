import React, { useEffect } from "react";

import { useGetBarang } from "../utils";
import Item from "./item";

const Items = (props) => {
  const { data, info, loading, error, setQuery, setData } = useGetBarang();

  console.log(data);
  useEffect(() => {
    if (props.newData) {
      setData(data.concat(props.newData));
    }
  }, [props.newData]);

  return (
    <div className="row">
      {data.map((val, index) => {
        return <Item key={index} data={val} />;
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
