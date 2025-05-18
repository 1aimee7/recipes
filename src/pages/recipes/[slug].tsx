import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";


type Recipe = {
  id: number;
  title: string;
  slug: string;
  image: string;
  ingredients: string[];
  steps: string[];
};


type RecipePageProps = {
  recipe: Recipe | null;
};

export default function RecipePage({ recipe }: RecipePageProps) {
  if (!recipe) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <p className="text-2xl text-orange-800 font-medium">Recipe not found</p>
          <Link href="/" className="mt-4 inline-block text-orange-600 hover:text-orange-800 transition-colors duration-200">
            Return to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      <header className="bg-gradient-to-r from-amber-500 to-orange-500 shadow-md">
        <div className="max-w-5xl mx-auto py-6 px-4">
          <Link href="/" className="no-underline">
            <h1 className="text-3xl font-bold text-white">Recipe Viewer</h1>
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto py-10 px-4">
        <Link href="/" className="text-orange-600 hover:text-orange-800 flex items-center mb-8 font-medium transition-colors duration-200">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Home
        </Link>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          
          <div className="relative h-96 w-full">
            <Image
              src={recipe.image}
              alt={recipe.title}
              layout="fill"
              objectFit="cover"
              priority
              className="transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <h1 className="absolute bottom-6 left-6 right-6 text-4xl font-bold text-white">{recipe.title}</h1>
          </div>

         \
          <div className="p-8">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-2xl font-semibold mb-6 text-orange-800 flex items-center border-b pb-2 border-orange-200">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                    <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                  </svg>
                  Ingredients
                </h2>
                <ul className="space-y-3">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index} className="flex items-start group">
                      <span className="inline-block w-5 h-5 bg-orange-200 rounded-full flex-shrink-0 mr-3 mt-1 group-hover:bg-orange-300 transition-colors duration-200"></span>
                      <span className="text-gray-700">{ingredient}</span>
                    </li>
                  ))}
                </ul>
              </div>

              
              <div>
                <h2 className="text-2xl font-semibold mb-6 text-orange-800 flex items-center border-b pb-2 border-orange-200">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                  </svg>
                  Preparation Steps
                </h2>
                <ol className="space-y-5">
                  {recipe.steps.map((step, index) => (
                    <li key={index} className="flex group">
                      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-orange-200 text-sm font-medium text-orange-800 mr-3 flex-shrink-0 group-hover:bg-orange-300 transition-colors duration-200">
                        {index + 1}
                      </span>
                      <span className="text-gray-700">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </main>

      
      <footer className="py-8 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <p className="text-orange-700">Explore more delicious recipes on Recipe Viewer!</p>
          
        </div>
      </footer>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const recipes: Recipe[] = require("../../data/recipes.json");
  const paths = recipes.map((recipe) => ({
    params: { slug: recipe.slug },
  }));
  return {
    paths,
    fallback: false, // Return 404 for unknown slugs
  };
};


export const getStaticProps: GetStaticProps = async ({ params }) => {
  const recipes: Recipe[] = require("../../data/recipes.json");
  const recipe = recipes.find((r) => r.slug === params?.slug) || null;
  return {
    props: {
      recipe,
    },
  };
};