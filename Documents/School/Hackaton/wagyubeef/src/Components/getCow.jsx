import React, { useEffect } from "react";
import { resolveMethod } from "thirdweb";
import { useReadContract } from "thirdweb/react";

export default function GetCow({ contract }) {
  const { data, isLoading } = useReadContract({
    contract,
    method: resolveMethod("getCows"),
    params: []
  });

  useEffect(() => {
    console.log("cows", data);
  }, [data]);

  if (isLoading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  if (!data || data.length === 0) {
    return <div className="text-center mt-8">No data available</div>;
  }

  // Reverse the list of data
  const reversedData = [...data].reverse();

  return (
    <div className="grid grid-cols-1 md:grid-cols-1 gap-4 w-[75%] m-auto">
      {reversedData.map((cow) => (
        <div
          key={cow.cowId}
          className="bg-white shadow rounded-lg overflow-hidden"
        >
          <div className="p-4">
            <div className="font-bold mb-2">Cow ID: {parseInt(cow.cowId)}</div>
            <div className="mb-2">Owner: {cow.eigenaar}</div>
            <div className="mb-2">Birth Date: {cow.geboorteDatum}</div>
            <div className="mb-2">Birth Place: {cow.geboortePlaats}</div>
            <div className="mb-2">Gender: {cow.geslacht}</div>
            <div className="mb-2">Mother ID: {parseInt(cow.moederId)}</div>
            <div className="mb-2">Father ID: {parseInt(cow.vaderId)}</div>
            <div className="mb-2">Slaughter Date: {parseInt(cow.slachtdatum)}</div>
            <div className="mb-2">Farm Location: {cow.boederijLocatie}</div>
            <div className="mb-2">Farm Owner: {cow.boederijOwner}</div>
            <div className="mb-2">Fat Content: {parseInt(cow.vetgehalte)}%</div>
            <div className="mb-2">Served: {cow.geserveerd ? "Yes" : "No"}</div>
            <img
              src={cow.fotoUrl}
              alt={`Cow ${parseInt(cow.cowId)}`}
              className="w-full h-auto"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
