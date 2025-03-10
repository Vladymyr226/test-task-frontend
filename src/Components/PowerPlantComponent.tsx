import {FC} from "react";
import type {PowerPlant} from "../store/powerPlantsSlice";

export const PowerPlantComponent: FC<{
  plant: PowerPlant;
  powerPlantHandle: (id: number) => void;
}> = ({ plant, powerPlantHandle }) => (
  <div className="flex items-center space-x-2 mb-2">
    <span>Power Plant {plant.id}</span>
    <button
      onClick={() => powerPlantHandle(plant.id)}
      className={`px-2 py-1 rounded ${plant.isAlive ? "bg-green-500" : "bg-red-500"}`}
    >
      {plant.isAlive ? "Turn off" : "Turn on"}
    </button>
  </div>
);
