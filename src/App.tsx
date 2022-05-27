import { Footer, Header } from './components';
import { AppRoutes } from './routes';

const App = () => (
  <>
    {false && <Header />}
    <AppRoutes />
    <Footer />
  </>
);

export default App;
