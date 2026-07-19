import "./index.css";
import { LoadingProvider } from "./context/LoadingProvider";
import MainContainer from "./components/MainContainer";

const App = () => {
  return (
    <LoadingProvider>
      <MainContainer />
    </LoadingProvider>
  );
};

export default App;
