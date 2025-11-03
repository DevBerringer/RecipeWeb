import { useRecipeDraft } from '../../../../../contexts/RecipeDraftContext';
import { useValidation } from '../contexts/ValidationContext';

export default function RecipeImage() {
  const { recipeDraft, setRecipeDraft } = useRecipeDraft();
  const { getFieldError, clearFieldError } = useValidation();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select a valid image file');
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image file size must be less than 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        setRecipeDraft({
          ...recipeDraft,
          selectedImage: event.target?.result as string,
          imageFile: file
        });
        clearFieldError('selectedImage');
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-4">
     
      {/* Image Upload Controls */}
      <div className="flex flex-col items-center space-y-4">
        <div className="flex items-center space-x-4">
          <label className="handWritten cursor-pointer rounded-xl border-2 border-dashed border-amber-900/30 bg-amber-50/60 px-6 py-3 text-lg font-semibold text-amber-800 shadow-sm transition-colors duration-200 hover:bg-amber-100/60 focus:outline-none focus:ring-2 focus:ring-amber-700/30">
            📸 Upload Photo
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>
          {recipeDraft.selectedImage && (
            <button
              type="button"
              onClick={() => setRecipeDraft({ ...recipeDraft, selectedImage: '', imageFile: null })}
              className="handWritten rounded-xl border-2 border-dashed border-red-300 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700 shadow-sm transition-colors duration-200 hover:bg-red-100"
            >
              🗑️ Remove
            </button>
          )}
        </div>
        
        {/* Image Preview */}
        {recipeDraft.selectedImage ? (
          <div className="overflow-hidden rounded-xl shadow-lg w-3/4">
            <img
              src={recipeDraft.selectedImage}
              alt="Recipe preview"
              className="h-[300px] w-full object-cover"
            />
          </div>
        ) : (
          <div className="flex items-center justify-center h-[300px] w-3/4 rounded-xl border-2 border-dashed border-gray-300 bg-gray-50">
            <p className="handWritten text-gray-500 text-lg">No image selected</p>
          </div>
        )}
      </div>
      
      {getFieldError('selectedImage') && (
        <p className="text-sm text-red-600">{getFieldError('selectedImage')}</p>
      )}
    </div>
  );
}
