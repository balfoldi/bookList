import React, { useEffect, useState } from "react";
import Book from "../Book"

const Books = () => {
  const [BooksData, setBooksData] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [isDisplayingFavorite, setIsDisplayingFavorite] = useState(false);
  const [isDisplayingToRead, setIsDisplayingToRead] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const fetchBooks = () => {
    setIsFetching(true);

    fetch("https://gist.githubusercontent.com/MathisDYKDan/76bc73ec77481ccb82677cc7c0d8b524/raw/a23c99027b9bfc1bfdb22e22ddcb4301a5f870ee/books.json")
      .then((response) => response.json())
      .then(( data ) => {
        console.log(data);
        var dataPostSearch
        if(setSearchInput){
          dataPostSearch = data.books[0].filter((book) => {
            return book.title.startsWith(searchInput)
        })}else{
          dataPostSearch = data.books[0]
        }
        setBooksData(
          dataPostSearch.map((book) => { 
            const { title, thumbnailUrl, shortDescription } = book;
            return({ 
              title: title,
              thumbnailUrl: thumbnailUrl,
              shortDescription: shortDescription
            })
          })
        )
        console.log(BooksData);
        setIsFetching(false);
      });
  };

  useEffect(() => {
    console.log("Le component est rendu");
    fetchBooks();
    return () => {
      console.log("Le component va être détruit !!");
    };
  }, []);

  useEffect(() => {
    console.log("Le component est re-rendu");
  }, [BooksData, isFetching]);


  useEffect(() => {
    fetchBooks()
  }, [searchInput]);

  const handleChange = (event) => {
    setSearchInput(event.target.value)
  }

  return(
    <div className="Books">
      <form>
        <label>
          Search:
          <input type="text" value={searchInput} onChange={handleChange} />
        </label>
      </form>
      <h1>Book liste</h1>
      <button onClick={() => setIsDisplayingFavorite(!isDisplayingFavorite)}>See favorites</button>
      <button onClick={() => setIsDisplayingToRead(!isDisplayingToRead)}>See to read books</button>
      {isFetching && <p>Chargement...</p>}
      {!isFetching && <p>Données chargées !</p>}
      <div class="d-flex flex-wrap justify-content-around">
      {BooksData.map(({thumbnailUrl, title, shortDescription}) => (
        <Book displayToRead={isDisplayingToRead} displayFavorite={isDisplayingFavorite} thumbnailUrl={thumbnailUrl} title={title} shortDescription={shortDescription}/>
      ))}
      </div>
    </div>
  );
};

export default Books;

