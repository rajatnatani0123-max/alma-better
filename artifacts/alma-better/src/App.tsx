
import { Route, Switch } from "wouter";

import Home from "@/pages/home";
import Enroll from "@/pages/enroll";
import Payment from "@/pages/payment";

function App() {
  return (
    <Switch>

      <Route path="/" component={Home} />

      <Route path="/enroll" component={Enroll} />

      <Route path="/payment/:id" component={Payment} />

      <Route>
        <div className="min-h-screen flex items-center justify-center">
          <h1 className="text-2xl font-bold">
            Page Not Found
          </h1>
        </div>
      </Route>

    </Switch>
  );
}

export default App;
```

