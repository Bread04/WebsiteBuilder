import { createBrowserRouter } from "react-router";
import { Root } from "./components/Root";
import { Home } from "./components/Home";
import { JobBoard } from "./components/JobBoard";
import { ShieldProtocol } from "./components/ShieldProtocol";
import { FlexMatch } from "./components/FlexMatch";
import { AmplifyPortfolio } from "./components/AmplifyPortfolio";
import { Profile } from "./components/Profile";
import { SafeFlexScoreDemo } from "./components/SafeFlexScoreDemo";
import { LuminaWallet } from "./components/LuminaWallet";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "jobs", Component: JobBoard },
      { path: "shield", Component: ShieldProtocol },
      { path: "flex-match", Component: FlexMatch },
      { path: "amplify", Component: AmplifyPortfolio },
      { path: "wallet", Component: LuminaWallet },
      { path: "profile", Component: Profile },
      { path: "safety-score", Component: SafeFlexScoreDemo },
    ],
  },
]);
