import {GameStorageValues} from '@/types/localStorageTypes';

const defaultGame: GameStorageValues = {
    fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
    moves: [],
    currentMove: 0
};

export class GameStorageHandler {

    static getGame(key: string): GameStorageValues | null {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) as GameStorageValues : null;
        } catch (error) {
            console.error(`Error retrieving item from localStorage: ${error}`);
            return null;
        }
    }

    static getCurrentGame(): GameStorageValues {
        try {
            const currentIndex = parseInt(localStorage.getItem('currentIndex') || '1');

            const item = localStorage.getItem(currentIndex.toString());

            if (currentIndex == 1) {
                localStorage.setItem('currentIndex', currentIndex.toString());
            }

            console.log(item);

            return item ? JSON.parse(item) as GameStorageValues : defaultGame;
        } catch (error) {
            console.error(`Error retrieving item from localStorage: ${error}`);
            return defaultGame;
        }
    }

    static getNextGame(): GameStorageValues {
        try {
            let currentIndex = parseInt(localStorage.getItem('currentIndex') || '0');
            console.log(currentIndex);

            currentIndex += 1;
            const item = localStorage.getItem(currentIndex.toString());

            if (item != null) {
                localStorage.setItem('currentIndex', currentIndex.toString());
            }

            console.log(item);

            return item ? JSON.parse(item) as GameStorageValues : defaultGame;
        } catch (error) {
            console.error(`Error retrieving item from localStorage: ${error}`);
            return defaultGame;
        }
    }

    static setGame(key: string, value: GameStorageValues): void {
        try {
            const item = JSON.stringify(value);
            localStorage.setItem(key, item);
        } catch (error) {
            console.error(`Error setting item in localStorage: ${error}`);
        }
    }

    static updateCurrentGame(value: GameStorageValues): void {
        try {
            const item = JSON.stringify(value);
            localStorage.setItem(localStorage.getItem("currentIndex") || '0', item);
        } catch (error) {
            console.error(`Error setting item in localStorage: ${error}`);
        }
    }


    static clear(): void {
        localStorage.clear();
    }

}
