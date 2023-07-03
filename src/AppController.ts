import { HStack, UIController, UIScene } from '@tuval/forms';
import { Routes } from './routes/routes';

 
export class AppController extends UIController {

 
  public LoadView() {
    return (
      UIScene(
        HStack(
          HStack(
            Routes()
          )
        )
      )
    )
  }
}