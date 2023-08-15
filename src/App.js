import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import LandingPage from './components/LandingPage'
import { QuestionPage } from "./components/QuestionPage";
import { ResultsPage } from "./components/ResultsPage";
import { GlobalStateProvider } from './GlobalStateContext';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<LandingPage />} />
      <Route path="QuestionPage" element={<QuestionPage />} />
      <Route path="ResultsPage" element={<ResultsPage />} />
    </Route>
  )
);
 
const App = () => {
  return (
    <GlobalStateProvider>
      <RouterProvider router={router} />
    </GlobalStateProvider>
  )
}

export default App