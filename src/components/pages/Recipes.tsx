import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getRecipes } from '../../api/api';
import RecipeCard from '../shared/RecipeCard';

const DEFAULT = {
  Message: '',
  Success: false,
  RecipeDTOs: [],
};

function Recipes() {
  const [data, setData] = useState<RecipeResponseDto>(DEFAULT);

  useEffect(() => {
    const getData = async (): Promise<void> => {
      try {
        const fetchedData: RecipeResponseDto = await getRecipes();
        setData(fetchedData);
      } catch (error) {
        // Handle error, e.g., show an error message or retry
      }
    };

    getData();
  }, []);

  return (
    <div>
      {data.RecipeDTOs.map((item) => (
        <Link to={`${item.Id}`} key={item.Id}>
          <RecipeCard
            name={item.Name}
            description={item.Description}
            cookTime={item.CookTimeMin.toLocaleString()}
          />
        </Link>
      ))}
    </div>
  );
}

export default Recipes;
