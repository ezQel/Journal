import { create } from "zustand";
import { GlobalState } from "../interfaces/global-state";
import authTokenService from "../services/authTokenService";

const useStore = create<GlobalState>((set) => ({
  token: null,

  setToken: async (token: string) => {
    await authTokenService.saveToken(token);
    set({ token });
  },

  clearToken: async () => {
    await authTokenService.deleteToken();
    set({ token: null });
  },
}));

export default useStore;
