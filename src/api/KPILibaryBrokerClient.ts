import { ConfigService } from "./ConfigService";
import { RealmHttpClient } from '@tuval/forms';

export class SenseiBrokerClient {
    public static async GetShowingKPIList(): Promise<any[]> {
        return new Promise((resolve, reject) => {
            RealmHttpClient.Post(ConfigService.GetKPILibraryBrokerURL() + "/GetShowingKPIList").then(response => {
            resolve(response.data);
          });
        })
      }

}