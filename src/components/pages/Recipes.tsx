import { useEffect, useState, createContext, useContext } from 'react';

interface MealType {
  id: number;
  name: string;
}

const mealTypeContext = createContext({
  mealType: [] as MealType[],
});

function useMealType(): {
  mealType: MealType[];
} {
  const [mealType, setMealType] = useState<MealType[]>([]);

  useEffect(() => {
    fetch('/mealType.json')
      .then((response) => response.json())
      .then((data) => setMealType(data));
  }, []);

  return { mealType };
}

function MealTypeList() {
  const { mealType } = useContext(mealTypeContext);
  return (
    <div className="flex flex-wrap justify-center">
      {mealType.map((p) => (
        <button
          key={p.id}
          className="bg-blue-200 hover:bg-blue-300 text-blue-800 font-bold py-2 px-4 rounded m-2"
          type="button"
        >
          {p.name}
        </button>
      ))}
    </div>
  );
}

function Recipes() {
  return (
    <div className="container mx-auto py-8">
      <div className="flex container justify-center mx-auto py-8">
        <mealTypeContext.Provider value={useMealType()}>
          <MealTypeList />
        </mealTypeContext.Provider>
      </div>
    </div>
  );
}

export default Recipes;
