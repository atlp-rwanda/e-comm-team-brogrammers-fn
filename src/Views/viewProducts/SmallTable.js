import React from "react";

const SmallTable = (props) => {
  const { data, headers } = props;
  const keys = Object.keys(data[0]);
  return (
    <div className="w-full">
      <table className="w-full">
        <thead className="rounded-4xl font-semibold">
          <tr className="text-white bg-primary text-center">
            <td className="py-[6px] rounded-tl-xl">{headers[0]}</td>
            <td className="py-[6px]">{headers[1]}</td>
            <td className="py-[6px] rounded-tr-xl">{headers[2]}</td>
          </tr>
        </thead>
        <tbody>
          {data.map((datum) => (
            <tr
              key={data.indexOf(datum)}
              className="bg-[#DBD2EA] text-center border-t-2 border-whiteColor font-semibold"
            >
              <td className="py-[6px] rounded-bl-lg">{datum[keys[0]]}</td>
              <td className="py-[6px]">{datum[keys[1]]}</td>
              <td className="py-[6px] rounded-br-lg">{datum[keys[2]]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SmallTable;
