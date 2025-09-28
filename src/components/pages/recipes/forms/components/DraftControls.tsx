import { useState, useEffect, useRef } from 'react';
import { useRecipeDraft } from '../../../../../contexts/RecipeDraftContext';

export default function DraftControls() {
  const { 
    recipeDraft, 
    clearDraft, 
    saveNamedDraft, 
    listDrafts, 
    loadDraft, 
    deleteDraft 
  } = useRecipeDraft();
  const [drafts, setDrafts] = useState(listDrafts());
  const [refreshKey, setRefreshKey] = useState(0);
  const [notification, setNotification] = useState<{message: string, type: 'info' | 'success' | 'warning' | 'error'} | null>(null);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showNewConfirmModal, setShowNewConfirmModal] = useState(false);
  const [showUpdateConfirmModal, setShowUpdateConfirmModal] = useState(false);
  const [draftTitle, setDraftTitle] = useState('');
  const [draftToDelete, setDraftToDelete] = useState('');
  const selectRef = useRef<HTMLSelectElement>(null);

  // Get the currently loaded draft ID from the recipeDraft
  const loadedDraftId = recipeDraft.id || '';

  // Show notification function
  const showNotification = (message: string, type: 'info' | 'success' | 'warning' | 'error' = 'info') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000); // Auto-hide after 4 seconds
  };

  // Refresh drafts list when needed
  useEffect(() => {
    setDrafts(listDrafts());
  }, [refreshKey, listDrafts]);

  // Check if currently loaded draft still exists after refresh
  useEffect(() => {
    if (loadedDraftId) {
      const currentDrafts = listDrafts();
      const draftStillExists = currentDrafts.some(draft => draft.id === loadedDraftId);
      
      if (!draftStillExists) {
        // Current draft was deleted, clear the form and start fresh
        clearDraft();
        showNotification('The current draft was deleted. Starting a new recipe.', 'warning');
      }
    }
  }, [refreshKey, loadedDraftId, listDrafts, clearDraft]);

  // Update loaded draft ID when a draft is loaded
  const handleLoadDraft = (id: string) => {
    loadDraft(id);
  };

  // Reset loaded draft ID when starting new
  const handleNewRecipe = () => {
    setShowNewConfirmModal(true);
  };

  const confirmNewRecipe = () => {
    clearDraft();
    setShowNewConfirmModal(false);
    showNotification('Started a new recipe!', 'success');
  };

  return (
    <div className="relative">
      {/* Notification Toast */}
      {notification && (
        <div className={`fixed top-8 left-1/2 transform -translate-x-1/2 z-50 w-96 max-w-[90vw] rounded-2xl shadow-2xl border-2 p-6 transform transition-all duration-300 ${
          notification.type === 'success' ? 'bg-green-100 border-green-500 text-green-900' :
          notification.type === 'warning' ? 'bg-yellow-100 border-yellow-500 text-yellow-900' :
          notification.type === 'error' ? 'bg-red-100 border-red-500 text-red-900' :
          'bg-blue-100 border-blue-500 text-blue-900'
        }`}>
          <div className="flex items-center">
            <div className="flex-shrink-0 mr-4">
              {notification.type === 'success' && <span className="text-2xl text-green-600">✓</span>}
              {notification.type === 'warning' && <span className="text-2xl text-yellow-600">⚠</span>}
              {notification.type === 'error' && <span className="text-2xl text-red-600">✕</span>}
              {notification.type === 'info' && <span className="text-2xl text-blue-600">ℹ</span>}
            </div>
            <div className="flex-1">
              <p className="handWritten text-lg font-semibold">{notification.message}</p>
            </div>
            <div className="ml-4">
              <button
                onClick={() => setNotification(null)}
                className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-white/50"
              >
                <span className="sr-only">Close</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mx-auto flex flex-col md:flex-row max-w-7xl items-center justify-between gap-3">
      <div className="flex flex-wrap items-center gap-2 md:gap-3">
        <button
          type="button"
          onClick={handleNewRecipe}
          className="rounded-xl border-2 border-dashed border-stone-400 bg-white/80 px-3 py-2 text-xs md:text-sm shadow-inner transition hover:bg-amber-50"
        >
          ✨ New
        </button>
        {loadedDraftId ? (
          <button
            type="button"
            onClick={() => setShowUpdateConfirmModal(true)}
            className="rounded-xl border-2 border-dashed border-amber-600 bg-amber-100/80 px-3 py-2 text-xs md:text-sm shadow-inner transition hover:bg-amber-200"
          >
            ✏️ Update Draft
          </button>
        ) : (
          <button
            type="button"
            onClick={() => {
              setDraftTitle(recipeDraft.name || '');
              setShowSaveModal(true);
            }}
            className="rounded-xl border-2 border-dashed border-stone-400 bg-white/80 px-3 py-2 text-xs md:text-sm shadow-inner transition hover:bg-amber-50"
          >
            💾 Save
          </button>
        )}
      </div>
      <div className="flex flex-col md:flex-row items-center gap-2">
        <span className="handWritten text-sm text-stone-700">Open Draft:</span>
        <select
          ref={selectRef}
          className="rounded-xl border-2 border-dashed border-stone-400 bg-white/80 px-2 py-2 text-xs md:text-sm shadow-inner w-full md:w-auto"
          value={loadedDraftId}
          onChange={(e) => {
            const id = e.target.value;
            if (id) {
              handleLoadDraft(id);
            }
          }}
        >
          <option value="" disabled>
            Select draft
          </option>
          {drafts.map((d) => (
            <option key={d.id} value={d.id}>
              {d.title} — {new Date(d.updatedAt).toLocaleString()}
            </option>
          ))}
        </select>
        <button
          type="button"
          className="rounded-xl border-2 border-dashed border-stone-400 bg-white/80 px-2 py-2 text-xs md:text-sm shadow-inner transition hover:bg-amber-50"
          onClick={() => setShowDeleteModal(true)}
        >
          🗑️
        </button>
      </div>
      </div>

      {/* Save Draft Modal */}
      {showSaveModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="handWritten bg-white rounded-2xl shadow-2xl p-8 w-96 max-w-[90vw]">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Save Draft</h3>
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Draft Name
              </label>
              <input
                type="text"
                value={draftTitle}
                onChange={(e) => setDraftTitle(e.target.value)}
                className="handWritten w-full rounded-xl border-2 border-dashed border-amber-900/30 bg-amber-50/60 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-recipecentral focus:border-recipecentral transition-colors duration-200"
                placeholder="Enter draft name..."
                autoFocus
              />
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => {
                  setShowSaveModal(false);
                  setDraftTitle('');
                }}
                className="handWritten flex-1 px-6 py-3 text-gray-700 bg-white border-2 border-gray-300 rounded-xl font-semibold hover:bg-gray-50 hover:border-gray-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  const title = draftTitle.trim() || 'Untitled Recipe';
                  saveNamedDraft(title);
                  setRefreshKey(prev => prev + 1);
                  setShowSaveModal(false);
                  setDraftTitle('');
                  showNotification('Draft saved successfully!', 'success');
                }}
                className="handWritten flex-1 px-6 py-3 bg-recipecentral text-white rounded-xl font-semibold shadow-sm hover:bg-recipecentral-dark transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-recipecentral focus:ring-offset-2"
              >
                Save Draft
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Draft Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="handWritten bg-white rounded-2xl shadow-2xl p-8 w-96 max-w-[90vw]">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Delete Draft</h3>
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Select Draft to Delete
              </label>
              <select
                value={draftToDelete}
                onChange={(e) => setDraftToDelete(e.target.value)}
                className="handWritten w-full rounded-xl border-2 border-dashed border-amber-900/30 bg-amber-50/60 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-recipecentral focus:border-recipecentral transition-colors duration-200"
              >
                <option value="">Choose a draft...</option>
                {drafts.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.title} — {new Date(d.updatedAt).toLocaleString()}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setDraftToDelete('');
                }}
                className="handWritten flex-1 px-6 py-3 text-gray-700 bg-white border-2 border-gray-300 rounded-xl font-semibold hover:bg-gray-50 hover:border-gray-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (draftToDelete) {
                    deleteDraft(draftToDelete);
                    setRefreshKey(prev => prev + 1);
                    setShowDeleteModal(false);
                    setDraftToDelete('');
                    showNotification('Draft deleted successfully!', 'success');
                  }
                }}
                disabled={!draftToDelete}
                className="handWritten flex-1 px-6 py-3 bg-red-600 text-white rounded-xl font-semibold shadow-sm hover:bg-red-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Delete Draft
              </button>
            </div>
          </div>
        </div>
      )}

      {/* New Recipe Confirmation Modal */}
      {showNewConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="handWritten bg-white rounded-2xl shadow-2xl p-8 w-96 max-w-[90vw]">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Start New Recipe</h3>
            <div className="mb-6">
              <p className="text-gray-700 text-center">
                This will clear all current fields and start a fresh recipe. Are you sure you want to continue?
              </p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => setShowNewConfirmModal(false)}
                className="handWritten flex-1 px-6 py-3 text-gray-700 bg-white border-2 border-gray-300 rounded-xl font-semibold hover:bg-gray-50 hover:border-gray-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Cancel
              </button>
              <button
                onClick={confirmNewRecipe}
                className="handWritten flex-1 px-6 py-3 bg-recipecentral text-white rounded-xl font-semibold shadow-sm hover:bg-recipecentral-dark transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-recipecentral focus:ring-offset-2"
              >
                Start New
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Update Draft Confirmation Modal */}
      {showUpdateConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="handWritten bg-white rounded-2xl shadow-2xl p-8 w-96 max-w-[90vw]">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Update Draft</h3>
            <div className="mb-6">
              <p className="text-gray-700 text-center">
                This will update the current draft with your changes. Are you sure you want to continue?
              </p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => setShowUpdateConfirmModal(false)}
                className="handWritten flex-1 px-6 py-3 text-gray-700 bg-white border-2 border-gray-300 rounded-xl font-semibold hover:bg-gray-50 hover:border-gray-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // Update the existing draft
                  const drafts = JSON.parse(localStorage.getItem('rc.namedDrafts') || '[]');
                  const draftIndex = drafts.findIndex((d: any) => d.id === loadedDraftId);
                  if (draftIndex !== -1) {
                    const { imageFile, ...persistable } = recipeDraft;
                    drafts[draftIndex] = {
                      ...drafts[draftIndex],
                      draft: persistable,
                      updatedAt: Date.now()
                    };
                    localStorage.setItem('rc.namedDrafts', JSON.stringify(drafts));
                    setRefreshKey(prev => prev + 1); // Trigger refresh
                    showNotification('Draft updated successfully!', 'success');
                  }
                  setShowUpdateConfirmModal(false);
                }}
                className="handWritten flex-1 px-6 py-3 bg-amber-600 text-white rounded-xl font-semibold shadow-sm hover:bg-amber-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
              >
                Update Draft
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
