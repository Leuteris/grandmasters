import {GameStorageValues} from "@/types/localStorageTypes";
import {GameStorageHandler} from "@/utils/GameStorageHandler";

export const loadGames = async () => {

    try {
        const response = await fetch('/games.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const jsonData: GameStorageValues[] = await response.json();

        jsonData.forEach((item, index) => {
            const i = index + 1;
            if (!GameStorageHandler.getGame(i.toString())) {
                GameStorageHandler.setGame(i.toString(), item);
            }
        });

        console.log(`Items loaded`);


    } catch (error) {
        console.error('Error loading JSON data:', error);
    }
};