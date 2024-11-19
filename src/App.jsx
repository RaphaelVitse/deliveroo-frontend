import { useState, useEffect } from "react";
import Header from "./components/Header";
import logo from "./assets/logo.svg";
import "./App.css";
import axios from "axios";
import { FaStar } from "react-icons/fa6";

function App() {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [cartContainer, setCartContainer] = useState([]);
  const [sousTotal, setSousTotal] = useState(Number(0.0));

  const deliveryCost = 2.5;

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
  useEffect(() => {
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
            <div className="main-left">
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
                          <div
                            onClick={() => {
                              const newCartContainer = [...cartContainer];
                              const newObj = {};
                              newObj.title = meal.title;
                              newObj.price = meal.price;
                              newCartContainer.push(newObj);
                              let add =
                                Number.parseFloat(sousTotal) +
                                Number.parseFloat(meal.price);

                              setSousTotal(add);
                              setCartContainer(newCartContainer);
                            }}
                            key={meal.id}
                            className="meals-container"
                          >
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
                              {meal.picture && (
                                <img src={meal.picture} alt="" />
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </>
                );
              })}
            </div>
            <div className="main-right">
              <div className="btn">
                <button> Valider mon panier</button>

                {cartContainer.map((elem) => {
                  return (
                    <>
                      <div
                        onChange={() => {
                          let add = sousTotal + elem.price;
                          setSousTotal(add);
                        }}
                        className="meal-cart"
                      >
                        <p key={elem.title}>{elem.title}</p>
                        <span>{elem.price} €</span>
                      </div>
                    </>
                  );
                })}
                <p>Sous total = {Math.round(sousTotal * 100) / 100}</p>
                <p> Frais de livraison = {deliveryCost}</p>
                <p>Total = {sousTotal + deliveryCost}</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
