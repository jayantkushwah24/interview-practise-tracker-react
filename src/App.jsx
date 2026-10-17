import { createBrowserRouter, RouterProvider } from "react-router";
import Dashboard from "./Pages/Dashboard";
import DSA from "./Pages/DSA";
import Git from "./Pages/Git";
import TechnicalQues from "./Pages/TechnicalQues";
import MachineCoding from "./Pages/MachineCoding";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Dashboard />,
    },
    {
      path: "/dsa",
      element: <DSA />,
    },
    {
      path: "/git",
      element: <Git />,
    },
    {
      path: "/technical-ques",
      element: <TechnicalQues />,
    },
    {
      path: "/machine-coding",
      element: <MachineCoding />,
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
