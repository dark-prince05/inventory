import { Children, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AddItemPage from "./components/AddItemPage.jsx";
import ViewItemPage from "./components/ViewItemPage.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <AddItemPage />,
        path: "/",
      },
      {
        element: <ViewItemPage />,
        path: "/view-items",
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
