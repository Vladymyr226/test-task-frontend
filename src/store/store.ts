import { configureStore } from '@reduxjs/toolkit'
import powerPlantSlice from './powerPlantsSlice'
import householdsSlice from './householdsSlice'


export const store = configureStore({
  reducer: {
    powerPlants: powerPlantSlice,
    households: householdsSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
