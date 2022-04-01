import { Container, Cart } from './styles';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../../assets/images/logo.svg';
import { useCart } from '../../hooks/useCart';
import { MdShoppingBasket } from 'react-icons/md';

const Header = () => {
    const { cart } = useCart();
    const cartSize = cart.length;

    return (
        <Container>
            <Link href="/" passHref>
                <a>
                    <Image src={logo} alt="Rocketshoes" />
                </a>
            </Link>
            <Link href="/cart" passHref>
                <Cart>
                    <div>
                        <strong>Meu carrinho</strong>
                        <span>
                            {cartSize === 1 ? `${cartSize} item` : `${cartSize} itens`}
                        </span>
                    </div>
                    <MdShoppingBasket size={36} color="#FFF" />
                </Cart>
            </Link>
        </Container>

    )
}

export default Header;