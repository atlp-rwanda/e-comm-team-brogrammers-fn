import { describe, test } from "@jest/globals";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "../src/redux/store";
import Products from "../src/Views/products/viewProducts";

describe('testing product list', () => {
test('render', () => {
render(
<Provider store={store}>
<BrowserRouter>
<Products/>
</BrowserRouter>
</Provider>
)
})
})
