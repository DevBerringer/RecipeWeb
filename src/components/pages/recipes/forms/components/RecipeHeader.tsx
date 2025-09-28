import { useRecipeDraft } from '../../../../../contexts/RecipeDraftContext';
import { useValidation } from '../contexts/ValidationContext';

export default function RecipeHeader() {
  const { recipeDraft, setRecipeDraft } = useRecipeDraft();
  const { getFieldError, hasFieldError, validateField, clearFieldError } = useValidation();

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

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setRecipeDraft({ ...recipeDraft, name: value });
    
    if (value.trim().length > 0) {
      clearFieldError('name');
    }
  };

  const handleNameBlur = () => {
    validateField('name', recipeDraft.name);
  };

  return (
    <>
      {/* Recipe Name Input */}
      <div className="flex flex-col items-center">
        <input
          type="text"
          id="name"
          placeholder="Enter Recipe Name"
          value={recipeDraft.name}
          onChange={handleNameChange}
          onBlur={handleNameBlur}
          className={`handWritten max-w-full rounded-2xl border-2 border-dashed px-4 py-3 text-center text-2xl md:text-4xl shadow-sm focus:outline-none focus:ring-2 ${
            hasFieldError('name')
              ? 'border-red-500 bg-red-50/60 focus:ring-red-500/30'
              : 'border-amber-900/30 bg-amber-50/60 focus:ring-amber-700/30'
          }`}
        />
        {getFieldError('name') && (
          <p className="mt-2 text-sm text-red-600 text-center">{getFieldError('name')}</p>
        )}
      </div>

      {/* Image Upload Section */}
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
        {recipeDraft.selectedImage && (
          <div className="overflow-hidden rounded-xl shadow-lg max-w-md">
            <img
              src={recipeDraft.selectedImage}
              alt="Recipe preview"
              className="h-[300px] w-full object-cover"
            />
          </div>
        )}
      </div>
    </>
  );
}
