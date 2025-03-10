import {createSlice, PayloadAction} from '@reduxjs/toolkit'

export type PowerPlant = {
    id: number;
    isAlive: boolean;
}

type PowerPlants = {
  powerPlants:Array<PowerPlant>
}

const initialState:PowerPlants = {
  powerPlants: [
    { id: 1, isAlive: true },
    { id: 2, isAlive: true },
  ],
}

const powerPlantSlice = createSlice({
  name: 'powerPlantSlice',
  initialState,
  reducers: {
    togglePowerPlant: (state, action: PayloadAction<number>) => {
      const plant = state.powerPlants.find((p) => p.id === action.payload);
      if (plant) {
        plant.isAlive = !plant.isAlive;
      }
    },
  },
})

export const { togglePowerPlant } = powerPlantSlice.actions
export default powerPlantSlice.reducer
