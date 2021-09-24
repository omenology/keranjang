import { GlobalProvider } from "../context";

import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

function MyApp({ Component, pageProps }) {
  const Navigation = Component.navigation || (({ children }) => <>{children}</>);
  return (
    <GlobalProvider>
      <Navigation>
        <Component {...pageProps} />
      </Navigation>
    </GlobalProvider>
  );
}

export default MyApp;
