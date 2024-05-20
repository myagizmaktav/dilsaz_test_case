import { create } from "zustand";
import { Todo } from "../../../backend/src/types/todoTypes";

type Store = {
  popup: {
    visible: boolean;
    data: any;
    type: string;
  };
  setPopup: (popup: any) => void;
  rawData: Todo[];
  setRawData: (rawData: Todo[]) => void;
  data: Todo[];
  sortingPosition: {
    position: "asc" | "desc";
    field: string;
    search: string;
    priority: string;
  };
  setData: (data: Todo[]) => void;
  setSortingPosition: (sortingPosition: {
    position: string;
    field: string;
    search: string;
    priority: string;
  }) => void;
};

export const useZustandStore = create<Store>((set) => ({
  popup: {
    visible: false,
    data: null,
    type: "",
  },
  setPopup: (popup: any) => set({ popup }),

  rawData: [
    {
      id: "1b8af69d-6080-407e-af4d-6098fd720d33",
      description: "Daily Meeting",
      status: "Urgent",
      created_at: "2024-05-15T20:13:52.742Z",
      updated_at: "2024-05-18T17:25:43.339Z",
    },
    {
      id: "c5b31039-c08f-4a6b-bc54-e6b978a19d7b",
      description: "Yemek Yapılacak",
      status: "Trivial",
      created_at: "2024-05-15T20:13:52.742Z",
      updated_at: "2024-05-15T20:13:52.742Z",
    },
    {
      id: "fdb73d7b-3927-4c4f-9f29-d9342fdafb3c",
      description: "Fairy Meeting",
      status: "Regular",
      created_at: "2024-05-18T16:58:21.495Z",
      updated_at: "2024-05-18T16:58:21.495Z",
    },
  ],
  setRawData: (rawData: any) => set({ rawData }),
  data: [],

  setData: (data: any) => set({ data }),

  sortingPosition: {
    position: "asc",
    field: "status",
    search: "",
    priority: "Priority(All)",
  },
  setSortingPosition: (sortingPosition: any) => set({ sortingPosition }),
}));
