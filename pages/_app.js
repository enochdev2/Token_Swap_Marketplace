import '../styles/globals.css'
import { ConnectWallet } from '../utils/ConnetWallet';



function MyApp({ Component, pageProps }) {
  return (
    <ConnectWallet>
    <Component {...pageProps} />
    </ConnectWallet>
  );
}

export default MyApp;
