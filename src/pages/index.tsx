import { GetStaticProps } from "next";
import { MdAddShoppingCart } from 'react-icons/md';
import { ProductList } from '../styles/styles';
import Header from "../components/Header";
import { api } from '../services/api';
import { formatPrice } from '../util/format';
import { useCart } from '../hooks/useCart';

interface Product {
  id: number;
  title: string;
  price: string;
  image: string;
}

interface ProductProps {
  products: Product[];
}

interface CartItemsAmount {
  [key: number]: number;
}

export default function Home({ products }: ProductProps): JSX.Element {
  const { addProduct, cart } = useCart();

  const cartItemsAmount = cart.reduce((sumAmount, product) => {
    const newSumAmount = { ...sumAmount };
    newSumAmount[product.id] = product.amount;

    return newSumAmount;
  }, {} as CartItemsAmount)
  
  function handleAddProduct(id: number) {
    addProduct(id);
  }

  return (
    <>
      <Header />
      <ProductList>
        {products.map((product) => (
          <li key={product.id}>
            <img src={product.image} alt={product.title} />
            <strong>{product.title}</strong>
            <span>{product.price}</span>
            <button
              type="button"
              onClick={() => handleAddProduct(product.id)}
            >
              <div>
                <MdAddShoppingCart size={16} color="#FFF" />
                {cartItemsAmount[product.id] || 0}
              </div>
              <span>ADICIONAR AO CARRINHO</span>
            </button>
          </li>
        ))}
      </ProductList>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await api.get('/products');

  const products = response.data.map(product => ({
    ...product,
    price: formatPrice(product.price)
  }));

  return {
    props: { products }
  }
}
