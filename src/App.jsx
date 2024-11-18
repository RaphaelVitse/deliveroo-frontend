import { useState, useEffect } from "react";
import Header from "./components/Header";
import logo from "./assets/logo.svg";
import "./App.css";
import axios from "axios";

function App() {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://site--deliveroo-backend--2652jln5dkl6.code.run"
        );
        // console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        // res.status(500).json({ error: error.message });
      }
    };

    fetchData();
  }, []);

  return isLoading ? (
    <span>En cours de chargement...</span>
  ) : (
    <>
      <Header logo={logo} />
      <main className="container">
        <section className="title-container">
          <div className="title">
            <h2>{data.restaurant.name}</h2>
            <p>{data.restaurant.description}</p>
          </div>
          <div className="title-img">
            <img src={data.restaurant.picture} alt="" />
          </div>
        </section>
        <section className="food-container">
          {data.categories.map((elem) => {
            {
              console.log(elem);
            }
            return <h3 key={elem}> {data.categories[elem].name}</h3>;
          })}
          {/* {data.categories[0].name} */}
          <div className="meals-container">
            <div className="meals-description">
              <h4>{data.categories[0].meals[0].title}</h4>
              <p>{data.categories[0].meals[0].description}</p>
              <p>{data.categories[0].meals[0].price}</p>
            </div>
            <div className="meals-img">
              <img src={data.categories[0].meals[0].picture} alt="" />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
