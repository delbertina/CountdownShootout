export enum TeamTheme {
    PINK = "Pink",
    RED = "Red",
    ORANGE = "Orange",
    YELLOW = "Yellow",
    LIME = "Lime",
    GREEN = "Green",
    CYAN = "Cyan",
    BLUE = "Blue",
    PURPLE = "Purple",
    BROWN = "Brown",
}

export const getShadedClass = (type: TeamTheme) => {
    switch (type) {
        case TeamTheme.PINK:
            return "border-pink-800 bg-pink-500 text-white";
        case TeamTheme.RED:
            return "border-red-800 bg-red-500 text-white";
        case TeamTheme.ORANGE:
            return "border-orange-800 bg-orange-500 text-white";
        case TeamTheme.YELLOW:
            return "border-yellow-800 bg-yellow-500 text-white";
        case TeamTheme.LIME:
            return "border-lime-800 bg-lime-500 text-white";
        case TeamTheme.GREEN:
            return "border-green-800 bg-green-500 text-white";
        case TeamTheme.CYAN:
            return "border-cyan-800 bg-cyan-500 text-white";
        case TeamTheme.BLUE:
            return "border-blue-800 bg-blue-600 text-white";
        case TeamTheme.PURPLE:
            return "border-purple-800 bg-purple-500 text-white";
        case TeamTheme.BROWN:
            return "border-brown-800 bg-brown-700 text-white";
        default:
            return "border-red-800 bg-red-500 text-white";
    }
}

export const getUnShadedClass = (type: TeamTheme) => {
    switch (type) {
        case TeamTheme.PINK:
            return "border-pink-400 bg-pink-300 text-white";
        case TeamTheme.RED:
            return "border-red-400 bg-red-300 text-white";
        case TeamTheme.ORANGE:
            return "border-orange-400 bg-orange-300 text-white";
        case TeamTheme.YELLOW:
            return "border-yellow-400 bg-yellow-300 text-white";
        case TeamTheme.LIME:
            return "border-lime-400 bg-lime-300 text-white";
        case TeamTheme.GREEN:
            return "border-green-400 bg-green-300 text-white";
        case TeamTheme.CYAN:
            return "border-cyan-400 bg-cyan-300 text-white";
        case TeamTheme.BLUE:
            return "border-blue-400 bg-blue-300 text-white";
        case TeamTheme.PURPLE:
            return "border-purple-400 bg-purple-300 text-white";
        case TeamTheme.BROWN:
            return "border-brown-300 bg-brown-200 text-white";
        default:
            return "border-red-400 bg-red-300 text-white";
    }
}