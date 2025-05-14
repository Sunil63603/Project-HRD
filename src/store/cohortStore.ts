//this is a server component , hence no 'use client'.
import { create } from "zustand";
//'create' function will [create a store,provide functions/actions to update state,automatically inform component about state change].

import { devtools, persist } from "zustand/middleware"; //'middleware' is used to get more information about state,in browser itself.(just like redux dev tools)
//devtools is for
//persist is for storing certain state in local storage.

//TS interfaces,imports and type-alias
interface CohortStoreType {
  pollingInterval: number;
}

//step 1:create data.
const cohortStore = (set: any): CohortStoreType => ({
  pollingInterval: 100000000, //this is used in all fetching oprations
});

//step 2:create store using data from step 1.
const useCohortStore = create<CohortStoreType>()(
  devtools(
    persist(cohortStore, {
      name: "cohortStore",
    })
  )
);

//step 3:export the store so that components can access data from store.
export default useCohortStore;
