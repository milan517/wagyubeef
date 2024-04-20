import React, { useEffect } from "react";
import { resolveMethod } from "thirdweb";
import { useReadContract } from "thirdweb/react";

export function Component({ contract }) {
  const { data, isLoading } = useReadContract({
    contract,
    method: resolveMethod("getBeefs"),
    params: []
  });

  useEffect(() => {
    console.log("data", data);
  }, [data]);

  if (isLoading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  if (!data || Object.keys(data).length === 0) {
    return <div className="text-center mt-8">No data available</div>;
  }

  const reversedKeys = Object.keys(data).reverse(); // Reverse the keys array

  return (
    <div className="grid grid-cols-1 md:grid-cols-1 gap-4 w-[75%] m-auto">
      {reversedKeys.map((cowKey) => (
        <div
          key={data[cowKey].cowId}
          className="bg-white shadow rounded-lg overflow-hidden"
        >
          <div className="p-4">
            <div className="font-bold mb-2">Cow ID: {parseInt(data[cowKey].cowId)}</div>
            <div className="mb-2">Owner: {data[cowKey].eigenaar}</div>
            <div className="mb-2">Quality: {data[cowKey].kwaliteit}</div>
            <div className="mb-2">Fat Content: {data[cowKey].vetgehalte}%</div>
            <div className="mb-2">Served: {data[cowKey].geserveerd ? "Yes" : "No"}</div>
            <img
              src={data[cowKey].fotoUrl}
              alt={`Cow ${parseInt(data[cowKey].cowId)}`}
              className="w-full h-auto"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
