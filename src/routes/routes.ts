import {​​ UIRoute, UIRoutes, UIView }​​ from "@tuval/forms"
import { LayoutController } from "../controllers/LayoutController"
import { MainController } from "../pages/main/MainController"
import { MainViewController } from "../pages/main/MainViewController"
import FontStyles from "../components/FontStyles"
import {Deneme} from "../pages/main/Deneme"
export const Routes = () => {​​
    return UIRoutes(
        UIRoute
        ("/", LayoutController).children(
            
            UIRoute("main",MainController).children(
                UIRoute("view",Deneme)
            ),
            UIRoute("",Deneme)
        ))

}​​
