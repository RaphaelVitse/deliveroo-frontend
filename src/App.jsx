import { useState, useEffect } from "react";
import Header from "./components/Header";
import logo from "./assets/logo.svg";
import "./App.css";
import axios from "axios";
import { FaStar } from "react-icons/fa6";

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
      <main>
        <section className="title-container container">
          <div className="title">
            <h2>{data.restaurant.name}</h2>
            <p>{data.restaurant.description}</p>
          </div>
          <div className="title-img">
            <img src={data.restaurant.picture} alt="" />
          </div>
        </section>
        <section className="menu-container ">
          <div className="food-container container">
            {data.categories.map((category, index) => {
              console.log(category);

              return (
                <>
                  {category.meals.length !== 0 && (
                    <h3 key={category.name}> {category.name}</h3>
                  )}
                  <div key={index} className="meals-card">
                    {category.meals.map((meal) => {
                      return (
                        <div key={meal.id} className="meals-container">
                          <div className="meals-description">
                            <h4>{meal.title}</h4>
                            {meal.description && <p>{meal.description}</p>}
                            <div className="star-container">
                              <p>{meal.price} €</p>
                              {meal.popular && (
                                <p className="star">
                                  <FaStar /> Populaire
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="meals-img">
                            {meal.picture && <img src={meal.picture} alt="" />}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              );
            })}
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
