import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalState } from "../GlobalStateContext"
import { Pagination, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export const ResultsPage = () => {
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [favorites, setFavorites] = useState([]);
  const { globalState, setGlobalState } = useGlobalState();

  const restartQuiz = () => {
    navigate('/', {replace: true})
  }

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavorites(storedFavorites);

    const dataFetch = async () => {
      const data = await (
        await fetch(
          "https://jeval.com.au/collections/hair-care/products.json?page=1"
        )
      ).json();
      const dataArray = Object.values(data);
      setProducts(dataArray[0]);
    };

    dataFetch();
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (productId) => {
    if (favorites.includes(productId)) {
      setFavorites(favorites.filter(id => id !== productId));
    } else {
      setFavorites([...favorites, productId]);
    }
  };

  const sortedProducts = [...products].sort((a, b) => {
    const isAFavorite = favorites.includes(a.id);
    const isBFavorite = favorites.includes(b.id);
    if (isAFavorite && !isBFavorite) return -1;
    if (!isAFavorite && isBFavorite) return 1;
    return 0;
  });

  return (
    <div className="wrapper__results">
        <div className="results__head">
          <h1>Build you everyday self care routine.</h1>
          <p>Perfect for if you're looking for soft, nourished skin, our moisturizing body washes are made with skin-natural nutrients that work with your skin to replenish moisture. With a light formula, the bubbly lather leaves your skin feeling cleansed and cared for. And by choosing relaxing fragrances you can add a moment of calm to the end of your day.</p>
          <button className="btn btn__restart" onClick={restartQuiz}>Retake the quiz</button>
        </div>
        <div className="products">
          <Swiper
             slidesPerView={3}
             spaceBetween={36}
             pagination={{
               clickable: true,
             }}
             navigation={true}
             modules={[Pagination, Navigation]}
             className="mySwiper"
          >
          {
            sortedProducts.length > 0 ?
            sortedProducts.map(product => (
              <SwiperSlide key={product.id}>
                <div className='product'>
                  <div className="product__img">
                    <img src={product.images[0].src} alt="img" />
                  </div>
                  <div className="product__title">{product.title}</div>
                  <div className="product__price">${product.variants[0].price}</div>
                  <button className="product__actions" onClick={() => toggleFavorite(product.id)}>{favorites.includes(product.id) ? 'Remove from Favorites' : 'Add to Favorites'}</button>
                </div>
              </SwiperSlide>
            ))
            :
            <div style={{color: '#fff'}}>Loading...</div>
          }
          </Swiper>
      </div>
    </div>
  )
}
