interface RecipeCardProps {
  name: string;
  selectedImage: string | null;
  prepTime: number;
  cookTime: number;
}

export default function RecipeCard({
  name,
  prepTime,
  selectedImage,
  cookTime,
}: RecipeCardProps) {
  const totalTime = prepTime + cookTime;
  
  return (
    <div className="group relative h-full w-full transform cursor-pointer overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl">
      {/* Image Container with Overlay */}
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={selectedImage || '/assets/noFood.jpg'}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        
        {/* Time Badge */}
        <div className="absolute top-3 right-3">
          <div className="handWritten rounded-full bg-amber-100/90 px-3 py-1 text-sm font-semibold text-amber-800 shadow-sm backdrop-blur-sm">
            {totalTime > 0 ? `${totalTime}min` : 'Quick'}
          </div>
        </div>
        
        {/* Hover Overlay with Recipe Icon */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="handWritten rounded-full bg-amber-500/90 px-6 py-3 text-lg font-bold text-white shadow-lg backdrop-blur-sm">
            👨‍🍳 View Recipe
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-1 flex-col justify-between p-5">
        {/* Recipe Name */}
        <div className="mb-4">
          <h3 className="handWritten text-xl font-bold text-gray-900 line-clamp-2 leading-tight">
            {name}
          </h3>
        </div>

        {/* Time Details */}
        <div className="mb-4 space-y-2">
          {prepTime > 0 && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="text-amber-600">⏱️</span>
              <span className="handWritten font-medium">Prep: {prepTime}min</span>
            </div>
          )}
          {cookTime > 0 && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="text-amber-600">🔥</span>
              <span className="handWritten font-medium">Cook: {cookTime}min</span>
            </div>
          )}
        </div>

        {/* Decorative Bottom Border */}
        <div className="mt-auto">
          <div className="handWritten flex items-center justify-between text-sm text-amber-700">
            <span className="font-medium">Recipe Details</span>
            <div className="flex gap-1">
              <div className="h-1 w-1 rounded-full bg-amber-400"></div>
              <div className="h-1 w-1 rounded-full bg-amber-500"></div>
              <div className="h-1 w-1 rounded-full bg-amber-600"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Corner Elements */}
      <div className="absolute top-0 left-0 h-8 w-8 -translate-x-2 -translate-y-2 rotate-45 bg-amber-100/50"></div>
      <div className="absolute bottom-0 right-0 h-6 w-6 translate-x-1 translate-y-1 rotate-45 bg-amber-200/50"></div>
    </div>
  );
}
