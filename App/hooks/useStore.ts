import { GlobalState } from "@/interfaces/global-state.interface";
import { deleteToken, saveToken } from "@/utils/authToken";
import { create } from "zustand";

const useStore = create<GlobalState>((set) => ({
  token: null,

  setToken: async (token: string) => {
    await saveToken(token);
    set({ token });
  },

  clearToken: async () => {
    await deleteToken();
    set({ token: null });
  },
}));

export default useStore;
