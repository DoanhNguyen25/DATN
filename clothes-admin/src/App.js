
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./pages/Home";
import Tables from "./pages/Tables";
import Billing from "./pages/Billing";
import Rtl from "./pages/Rtl";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Main from "./components/layout/Main";
import Users from "./pages/Users";

import "antd/dist/antd.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";
import Category from "./pages/Category";
import News from "./pages/News";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/sign-up" exact component={SignUp} />
        <Route path="/sign-in" exact component={SignIn} />
        <Main>
          <Route exact path="/Thống kê" component={Home} />
          <Route exact path="/Sản phẩm" component={Tables} />
          <Route exact path="/Người dùng" component={Users} />
          <Route exact path="/Danh mục" component={Category} />
          <Route exact path="/Tin tức" component={News} />
          <Route exact path="/Hóa đơn" component={Billing} />
          <Route exact path="/rtl" component={Rtl} />
          <Route exact path="/profile" component={Profile} />
          <Redirect from="*" to="/Thống kê" />
        </Main>
      </Switch>
    </div>
  );
}

export default App;
