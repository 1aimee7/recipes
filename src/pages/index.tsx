import Image from "next/image";
import Link from "next/link";
import { GetStaticProps } from "next";


type Recipe = {
  id: number;
  title: string;
  slug: string;
  image: string;
  ingredients: string[];
  steps: string[];
};

type HomeProps = {
  recipes: Recipe[];
};

export default function Home({ recipes }: HomeProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
     
      <header className="bg-gradient-to-r from-amber-500 to-orange-500 shadow-md">
        <div className="max-w-5xl mx-auto py-6 px-4">
          <h1 className="text-3xl font-bold text-white">Recipe Viewer</h1>
        </div>
      </header>

     
      <main className="max-w-5xl mx-auto py-12 px-4">
        <h2 className="text-2xl font-semibold text-orange-800 mb-8 pb-2 border-b border-orange-200 inline-block">
          Delicious Recipes
        </h2>
        
      
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {recipes.map((recipe) => (
            <li
              key={recipe.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
            >
              <Link href={`/recipes/${recipe.slug}`}>
                <div className="group cursor-pointer">
                  <div className="relative">
                    <Image
                      src={recipe.image}
                      alt={recipe.title}
                      width={400}
                      height={250}
                      className="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-5">
                    <h2 className="text-xl font-semibold text-gray-800 group-hover:text-orange-600 transition-colors duration-200">
                      {recipe.title}
                    </h2>
                    <div className="mt-3 flex items-center text-sm text-gray-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                      </svg>
                      {recipe.ingredients.length} ingredients
                    </div>
                    <div className="mt-1 flex items-center text-sm text-gray-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                      </svg>
                      {recipe.steps.length} steps
                    </div>
                    <div className="mt-4 flex justify-center">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                        View Recipe
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>

     
        <footer className="mt-16 py-8 text-center">
          <p className="text-orange-700 mb-4">Explore delicious recipes with Recipe Viewer!</p>
          
        </footer>
      </main>
    </div>
  );
}


export const getStaticProps: GetStaticProps = async () => {
  const recipes: Recipe[] = require("../data/recipes.json");

  return {
    props: {
      recipes,
    },
  };
};
