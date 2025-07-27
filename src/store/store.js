// store/store.js
import { create } from 'zustand';

export const useModalStore = create((set) => ({
  modalType: null, // 'register' | 'login' | null
  openModal: (type) => set({ modalType: type }), // pass 'register' or 'login'
  closeModal: () => set({ modalType: null }),
}));
