import { writable } from "svelte/store";
import { insertData } from "./Supabase";
// this needs revision
// TODO: Revise name so its not cringe
interface PopupState {
  activePopup: "none" | "add" | "entry";
  selectedGroupID: string;
}

function createPopupStore() {
  const { subscribe, update, set } = writable<PopupState>({
    activePopup: "none",
    selectedGroupID: "",
  });

  return {
    subscribe,

    open: (popup: PopupState["activePopup"], groupID: string = "") =>
      update(() => ({
        activePopup: popup,
        selectedGroupID: groupID,
      })),

    close: () => set({ activePopup: "none", selectedGroupID: "" }),

    toggle: (popup: PopupState["activePopup"], groupID: string = "") =>
      update((state) => ({
        activePopup: state.activePopup === popup ? "none" : popup,
        selectedGroupID: state.activePopup === popup ? "" : groupID,
      })),

    reset: () =>
      update(() => ({
        activePopup: "none",
        selectedGroupID: "",
      })),
  };
}

export const popupStore = createPopupStore();

interface InsertEntry {
  questionsList: string[];
  mainIndex: number;
  content: string;
}

function createInsertEntryStore() {
  const { subscribe, set, update } = writable<InsertEntry>({
    questionsList: [],
    mainIndex: 0,
    content: "",
  });

  return {
    subscribe,

    updateEntry: (payload: Partial<InsertEntry>) => {
      update((state) => ({ ...state, ...payload }));
    },

    saveEntry: async () => {
      let savedData: InsertEntry | undefined;

      update((state) => {
        savedData = state;
        return state;
      });

      if (
        !savedData ||
        savedData.questionsList.length === 0 ||
        !savedData.content.trim()
      ) {
        throw new Error("Invalid entry: Missing required data.");
      }

      try {
        await insertData(
          savedData.questionsList,
          savedData.content,
          savedData.mainIndex
        );
        console.log("Entry saved successfully!");
      } catch (error) {
        console.error("Error saving entry:", error);
      }
    },

    /** ✅ Clear data after use */
    reset: () => set({ questionsList: [], mainIndex: 0, content: "" }),
  };
}

export const insertEntryStore = createInsertEntryStore();
