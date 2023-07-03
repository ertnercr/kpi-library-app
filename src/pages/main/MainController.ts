import { UIController, UIRouteOutlet, UIScene, UIView, VStack, cTopLeading } from "@tuval/forms";

export class MainController extends UIController {
    public LoadView(): UIView {
        window.document.title="Ana Sayfa"
        return (
            UIScene(
            VStack({ alignment: cTopLeading })(
                UIRouteOutlet().width('100%').height('100%')
            )
        ))
        
    }
}