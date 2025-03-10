import {createSlice, PayloadAction} from '@reduxjs/toolkit'

export type Household = {
    id: number;
    connectedPlants: Array<number>;
    connectedHouseholds: Array<number>;
}

type Households = {
  households:Array<Household>
}

const initialState:Households = {
  households: [
    { id: 1, connectedPlants: [1], connectedHouseholds: [] },
    { id: 2, connectedPlants: [2], connectedHouseholds: [1] },
    { id: 3, connectedPlants: [2], connectedHouseholds: [2] },
  ],
}

const householdsSlice = createSlice({
  name: 'householdsSlice',
  initialState,
  reducers: {
    connectHousehold: (state, action: PayloadAction<{ houseId: number; targetId: number }>) => {
      const { houseId, targetId } = action.payload;

      state.households.forEach((house) => {
        if (house.id === houseId || house.id === targetId) {
          house.connectedHouseholds = Array.from(
            new Set([...house.connectedHouseholds, house.id === houseId ? targetId : houseId])
          );
        }
      });
    },
  },
})

export const { connectHousehold } = householdsSlice.actions
export default householdsSlice.reducer
