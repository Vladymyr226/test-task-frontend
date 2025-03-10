import {FC} from "react";
import {PowerPlantComponent} from "./Components/PowerPlantComponent";
import {HouseholdComponent} from "./Components/HouseholdComponent";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "./store/store";
import { connectHousehold } from './store/householdsSlice'
import {togglePowerPlant} from "./store/powerPlantsSlice";

const PowerGrid: FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { households } = useSelector((state: RootState) => state.households)
  const { powerPlants } = useSelector((state: RootState) => state.powerPlants)

  const powerPlantHandle = (id: number) => {
    dispatch(togglePowerPlant(id));
  };

  const connectHouseholdHandle = (houseId: number, targetId: number) => {
    dispatch(connectHousehold({ houseId, targetId }));
  };

  const hasElectricity = (houseId: number, visited: Set<number> = new Set()): boolean => {
    if (visited.has(houseId)) return false;
    visited.add(houseId);

    const house = households.find((h) => h.id === houseId);
    if (!house) return false;

    if (house.connectedPlants.some((plantId) => powerPlants.find((p) => p.id === plantId)?.isAlive)) {
      return true;
    }

    return house.connectedHouseholds.some((neighborId) => hasElectricity(neighborId, visited));
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-lg font-bold">Electricity</h2>

      <div>
        <h3 className="font-semibold">Power Plants</h3>
        {powerPlants.map((plant) => (
          <PowerPlantComponent key={plant.id} plant={plant} powerPlantHandle={powerPlantHandle} />
        ))}
      </div>

      <div>
        <h3 className="font-semibold">Houses</h3>
        {households.map((house) => (
          <HouseholdComponent
            key={house.id}
            house={house}
            hasElectricity={hasElectricity}
            connectHouseholdHandle={connectHouseholdHandle}
          />
        ))}
      </div>
    </div>
  );
};

export default PowerGrid;
