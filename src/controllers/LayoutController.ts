import { UIController, UIView, VStack, Text, UIRouteOutlet, HStack, cTopLeading } from '@tuval/forms';
 
export class LayoutController extends UIController {
 
    public override LoadView(): UIView {
        window.document.title = "KPI LIBRARY";
        return (
            HStack({ alignment: cTopLeading })(
                UIRouteOutlet().width("100%").height("100%")
            )
        )
 
    }
 
}