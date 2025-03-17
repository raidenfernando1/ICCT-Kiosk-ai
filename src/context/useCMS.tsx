import { create } from "zustand";

interface CMSState {
  selectedEntry: string | null;
  popups: { addPopup: boolean; entryPopup: boolean };
  openPopup: (name: keyof CMSState["popups"]) => void;
  closePopup: (name: keyof CMSState["popups"]) => void;
  togglePopup: (name: keyof CMSState["popups"]) => void;
  clearSelectedEntry: () => void;
  setSelectedEntry: (groupId: string) => void;
}

export const CMSStore = create<CMSState>((set) => ({
  selectedEntry: null,
  popups: { addPopup: false, entryPopup: false },

  openPopup: (name) =>
    set((state) => ({
      popups: { ...state.popups, [name]: true },
    })),

  closePopup: (name) =>
    set((state) => ({
      popups: { ...state.popups, [name]: false },
    })),

  togglePopup: (name) =>
    set((state) => ({
      popups: { ...state.popups, [name]: !state.popups[name] },
    })),

  clearSelectedEntry: () =>
    set(() => ({
      selectedEntry: null,
    })),

  setSelectedEntry: (groupId) =>
    set(() => ({
      selectedEntry: groupId,
    })),
}));
