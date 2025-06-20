import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/index.js";
import { Toaster } from "react-hot-toast";
// import { PersistGate } from "redux-persist/integration/react";
// import { persistStore } from "redux-persist";

// let persistor = persistStore(store);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        {/* <PersistGate persistor={persistor}> */}
          <App />
        {/* </PersistGate> */}
        <Toaster position="top-center" />
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
