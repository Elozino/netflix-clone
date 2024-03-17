import React from 'react'
import { create } from 'zustand'

export interface InfoModalProps {
  movieId?: string;
  isOpen: boolean;
  openModal: (movieId: string) => void;
  closeModal: () => void;
}

const useInfoModalStore = create<InfoModalProps>((set) => ({
  movieId: undefined,
  isOpen: false,
  openModal: (movieId: string) => set({ movieId, isOpen: true }),
  closeModal: () => set({ isOpen: false, movieId: undefined }),
}))

export default useInfoModalStore