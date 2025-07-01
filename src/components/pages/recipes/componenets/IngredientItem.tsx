function IngredientItem({ ingredient, idx }) {
  const icons = ['🥄', '🍽️', '🌿', '🧂', '🍳'];
  const icon = icons[Math.floor(Math.random() * icons.length)];
  return (
    <div
      className="w-full px-3 py-1.5 text-left font-['Caveat'] text-xl text-stone-800"
      style={{
        borderBottom: `2px dashed rgba(139, 69, 19, ${0.1 + (idx % 3) * 0.05})`,
        borderRadius: `0 0 ${Math.floor(Math.random() * 5)}px ${Math.floor(
          Math.random() * 5
        )}px`,
      }}
    >
      <span className="mr-2 select-none font-['Mynerve'] text-amber-700">
        {icon}
      </span>
      {ingredient}
    </div>
  );
}

export default IngredientItem;
