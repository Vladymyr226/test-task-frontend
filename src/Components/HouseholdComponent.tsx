import {FC} from "react";
import type {Household} from "../store/householdsSlice";

export const HouseholdComponent: FC<{
  house: Household;
  hasElectricity: (id: number) => boolean;
  connectHouseholdHandle: (houseId: number, targetId: number) => void;
}> = ({ house, hasElectricity, connectHouseholdHandle }) => (
  <div className="flex items-center space-x-2 mb-2">
    <span>House {house.id}</span>
    <span className={hasElectricity(house.id) ? "text-green-600" : "text-red-600"}>
      {hasElectricity(house.id) ? "There is light" : "There is no light"}
    </span>
    <button
      onClick={() => {
        const targetId = Number(prompt("Enter your home ID to connect:"));
        if (targetId && targetId !== house.id) connectHouseholdHandle(house.id, targetId);
      }}
      className="px-2 py-1 bg-blue-500 text-white rounded"
    >
      Connect to home
    </button>
  </div>
);
