import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type ModalProps = {
  isOpen: boolean;
  title: string;
  content: string;
};

const initialState: ModalProps = {
  isOpen: false,
  title: "",
  content: "",
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<Omit<ModalProps, "isOpen">>) => {
      state.title = action.payload.title;
      state.content = action.payload.content;
      state.isOpen = true;
    },
    closeModal: (state) => {
      state.isOpen = false;
    },
  },
  selectors: {
    isModalOpen: (state) => state.isOpen,
    modalInfo: (state) => state,
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export const { isModalOpen, modalInfo } = modalSlice.selectors;

export default modalSlice.reducer;
