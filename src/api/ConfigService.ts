import { is } from "@tuval/core";

export class ConfigService {

    public static GetKPILibraryBrokerURL(): string {
        let url = '';
        debugger;
        if (false) { // false dersen api den çalışırsın
            url = 'http://localhost:5003/v1';
        } else {
            url = 'https://api.apirealm.com/pedavalans';
        }

        return url;
    }
}