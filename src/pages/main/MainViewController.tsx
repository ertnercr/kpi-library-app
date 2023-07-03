import { ReactView, UIController, UIView, VStack } from "@tuval/forms";
import React from "react";
import { Button } from "antd";
export class MainViewController extends UIController{

    public LoadView(): UIView {
        return(VStack(
            ReactView(
                <div>
                <Button type="primary">Primary Button</Button>
                </div>

            )
        ))
    }
}