import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

const middleware = [thunk];

const mockStore = configureStore(middleware);

export default mockStore;
