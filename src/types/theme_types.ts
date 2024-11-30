export enum TeamTheme {
    BLUE = "BLUE",
    RED = "RED",
}

export const getShadedClass = (type: TeamTheme) => {
    switch (type) {
        case TeamTheme.BLUE:
            return "border-blue-800 bg-blue-600 text-white";
        case TeamTheme.RED:
            return "border-red-800 bg-red-500 text-white";
    }
}

export const getUnShadedClass = (type: TeamTheme) => {
    switch (type) {
        case TeamTheme.BLUE:
            return "border-blue-400 bg-blue-300 text-white";
        case TeamTheme.RED:
            return "border-red-400 bg-red-300 text-white";
    }
}