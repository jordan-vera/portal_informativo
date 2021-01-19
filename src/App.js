import { BrowserRouter, Route, Switch } from "react-router-dom";
import Index from "./pages/index";
import Login from "./pages/login";
import Panel from "./pages/panel-admin";
import NoticiaShow from "./pages/NoticiaShow";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Index} />
        <Route exact path="/index" component={Index} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/panel-admin" component={Panel} />
        <Route exact path="/noticia" component={NoticiaShow} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
