import { createContext, useContext, useState, ReactNode } from 'react';

export type RecipeDraft = {
  id?: string; // ID of the loaded draft, if any
  name: string;
  cuisineTypes: string[];
  mealTypes: string[];
  foodTypes: string[];
  isVegetarian: boolean | null;
  isSpicy: boolean | null;
  cookTimeMin: number;
  prepTimeMin: number;
  serves: number;
  description: string;
  ingredients: string[];
  steps: string[];
  selectedImage: string | null;
  imageFile: File | null;
};

type RecipeDraftContextType = {
  recipeDraft: RecipeDraft;
  setRecipeDraft: React.Dispatch<React.SetStateAction<RecipeDraft>>;
  saveNamedDraft: (title: string) => void;
  listDrafts: () => { id: string; title: string; updatedAt: number }[];
  loadDraft: (id: string) => void;
  deleteDraft: (id: string) => void;
  clearDraft: () => void;
};

const defaultRecipeDraft: RecipeDraft = {
  name: '',
  cuisineTypes: [],
  mealTypes: [],
  foodTypes: [],
  isVegetarian: null,
  isSpicy: null,
  cookTimeMin: 0,
  prepTimeMin: 0,
  serves: 0,
  description: '',
  ingredients: Array(4).fill(''),
  steps: Array(2).fill(''),
  selectedImage: null,
  imageFile: null,
};

const RecipeDraftContext = createContext<RecipeDraftContextType | undefined>(
  undefined
);

export const useRecipeDraft = () => {
  const context = useContext(RecipeDraftContext);
  if (!context) {
    throw new Error('useRecipeDraft must be used within a RecipeDraftProvider');
  }
  return context;
};

export function RecipeDraftProvider({ children }: { children: ReactNode }) {
  const [recipeDraft, setRecipeDraft] =
    useState<RecipeDraft>(() => {
      try {
        const stored = localStorage.getItem('rc.currentDraft');
        if (stored) {
          return { ...defaultRecipeDraft, ...JSON.parse(stored) } as RecipeDraft;
        }
      } catch {}
      return defaultRecipeDraft;
    });

  // Auto-persist current draft (except imageFile) for navigation safety
  const persistCurrentDraft = (draft: RecipeDraft) => {
    const { imageFile, ...persistable } = draft;
    try {
      localStorage.setItem('rc.currentDraft', JSON.stringify(persistable));
    } catch {}
  };

  // Wrap setter to also persist
  const setAndPersistDraft: React.Dispatch<React.SetStateAction<RecipeDraft>> = (
    updater
  ) => {
    setRecipeDraft((prev) => {
      const next = typeof updater === 'function' ? (updater as any)(prev) : updater;
      persistCurrentDraft(next);
      return next;
    });
  };

  // Named drafts storage helpers
  const DRAFTS_KEY = 'rc.namedDrafts';
  type StoredDraft = { id: string; title: string; updatedAt: number; draft: Omit<RecipeDraft, 'imageFile'> };

  const readDrafts = (): StoredDraft[] => {
    try {
      return JSON.parse(localStorage.getItem(DRAFTS_KEY) || '[]');
    } catch {
      return [];
    }
  };

  const writeDrafts = (drafts: StoredDraft[]) => {
    try {
      localStorage.setItem(DRAFTS_KEY, JSON.stringify(drafts));
    } catch {}
  };

  const saveNamedDraft = (title: string) => {
    const { imageFile, ...persistable } = recipeDraft;
    const drafts = readDrafts();
    const id = `${Date.now()}`;
    const updatedAt = Date.now();
    drafts.push({ id, title, updatedAt, draft: persistable });
    writeDrafts(drafts);
  };

  const listDrafts = () => {
    return readDrafts()
      .sort((a, b) => b.updatedAt - a.updatedAt)
      .map(({ id, title, updatedAt }) => ({ id, title, updatedAt }));
  };

  const loadDraft = (id: string) => {
    const drafts = readDrafts();
    const found = drafts.find((d) => d.id === id);
    if (found) {
      const loaded = { ...defaultRecipeDraft, ...found.draft, id } as RecipeDraft;
      setRecipeDraft(loaded);
      persistCurrentDraft(loaded);
    }
  };

  const deleteDraft = (id: string) => {
    const drafts = readDrafts().filter((d) => d.id !== id);
    writeDrafts(drafts);
  };

  const clearDraft = () => {
    setRecipeDraft({ ...defaultRecipeDraft, id: undefined });
    try {
      localStorage.removeItem('rc.currentDraft');
    } catch {}
  };

  return (
    <RecipeDraftContext.Provider
      value={{
        recipeDraft,
        setRecipeDraft: setAndPersistDraft,
        saveNamedDraft,
        listDrafts,
        loadDraft,
        deleteDraft,
        clearDraft,
      }}
    >
      {children}
    </RecipeDraftContext.Provider>
  );
}
