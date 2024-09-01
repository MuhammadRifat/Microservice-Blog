import { IHomeApiResponse } from "./home.interface";
import { HomeService } from "./home.service";

export class HomeLogic {

    static async processData(): Promise<IHomeApiResponse[]> {
        try {
            const data = await HomeService.getSettings();
            // Perform any necessary data processing
            return data; // Return the processed data
        } catch (error: any) {
            throw new Error(`Error processing data: ${error.message}`);
        }
    }
}
