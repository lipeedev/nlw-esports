interface GameParams {
    id: string;
    title: string;
    bannerUrl: string;
}

export declare global {
    namespace ReactNavigation {
        interface RootParamList {
            Home: undefined;
            Game: {
                id: string;
                title: string;
                bannerUrl: string;
            };
        }
    }
}