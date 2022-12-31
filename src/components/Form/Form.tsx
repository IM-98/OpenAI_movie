import axios from 'axios';
import React, { useState } from 'react';
import "./form.css"

interface Movie {

    Actors: string,
    Director: string,
    Plot: string,
    Poster: string
    Title: string

}

const Form: React.FC = () => {

    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedEra, setSelectedEra] = useState<string | null>(null);
    const [movieData, setMovieData] = useState<Movie | null>(null);

    const generatedPromptByStyleAndEras = (selectedEra: string | null, selectedCategory: string | null) => {
        let prompt = `Please provide the title (without released date) of a ${selectedCategory} film released in the ${selectedEra}.`
        return prompt
    }

    const categories = [
        "Adventure",
        "War",
        "Action",
        "Comedy",
        "Drama",
        "Animation",
        "Thriller",
        "Science fiction",
        "Fantasy",
        "Horror",
        "Western",
        "Documentaries"
    ]
    const eras = [
        "60s",
        "70s",
        "80s",
        "90s",
        "2000s",
        "2010s",
        "2020s"
    ]

    const handleResponse = (data: Movie) => {
        setMovieData(data);
    }

    const handleSubmit = (event: React.SyntheticEvent) => {
        event.preventDefault();
        
        const target = event.target as typeof event.target & {
            selectedEra: { value: string };
            selectedCategory: { value: string };
        }
        const selectedEra1 = target.selectedEra.value; 
        const selectedCategory1 = target.selectedCategory.value;

        let question = generatedPromptByStyleAndEras(selectedEra1, selectedCategory1);
        

        const data = {
            prompt: question,
            max_tokens: 128,
            model: "text-davinci-003"
        }

        axios.post("https://myurl.com/.netlify/functions/handleSubmit", data)
            .then((res) => {
                handleResponse(res.data);
            })
            .catch((err) => {
                console.error(err);
            });
    }

    return (
        <>
            <h1>AI Movie</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="genre">Genre :</label>
                <select
                    id="genre"
                    name="selectedCategory"
                    value={selectedCategory || ''}
                    onChange={(event) => setSelectedCategory(event.target.value)}
                >
                    <option value="" disabled >
                        Sélectionnez un genre
                    </option>
                    {categories.map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
                <br />
                <label htmlFor="era">Époque :</label>
                <select
                    id="era"
                    name="selectedEra"
                    value={selectedEra || ''}
                    onChange={(event) => setSelectedEra(event.target.value)}
                >
                    <option value="" disabled>
                        Sélectionnez une époque
                    </option>
                    {eras.map((era) => (
                        <option key={era} value={era}>
                            {era}
                        </option>
                    ))}
                </select>
                <br />
                <button type="submit">Soumettre</button>
            </form>

            {movieData && (
                <div className='movie__card'>
                    <h2> {movieData.Title}</h2>
                    <p>Synopsis : {movieData.Plot} </p>
                    <img src={movieData.Poster} alt="movie poster"/>
                </div>)}
        </>
    );
};

export default Form;

