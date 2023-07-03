import {​​ UIRoute, UIRoutes, UIView }​​ from "@tuval/forms"
import { LayoutController } from "../controllers/LayoutController"
import { MainController } from "../pages/main/MainController"
import { MainViewController } from "../pages/main/MainViewController"
export const Routes = () => {​​
    return UIRoutes(
        UIRoute
        ("/", LayoutController).children(
            
            UIRoute("main",MainController).children(
                UIRoute("view",MainViewController)
            ),
            UIRoute("",MainViewController)
        ))

}​​
