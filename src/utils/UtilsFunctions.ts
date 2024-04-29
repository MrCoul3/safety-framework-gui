export class UtilsFunctions {
    static developmentDomain = "";

    static setDevelopmentDomain(value: string) {
        this.developmentDomain = value;
    }

    static getInitials(value: string) {
        return value
            .split(" ")
            .slice(0, 2)
            .map((item) => item.substring(0, 1))
            .join("")
            .toUpperCase();
    }

    static stringToHslColor(
        value: string,
        saturation: number,
        lightness: number,
    ) {
        let hash: number = 0;
        for (let i = 0; i < value.length; i++) {
            const shift: number = hash << 5;
            hash = value.charCodeAt(i) + (shift - hash);
        }

        const hue = hash % 360;
        return "hsl(" + hue + ", " + saturation + "%, " + lightness + "%)";
    }

    static getUpperLevelDomain() {
        const nodeEnv = process.env.NODE_ENV;
        const [, upperLevelDomain] = window.location.hostname.split(".");

        return nodeEnv === "development"
            ? this.developmentDomain
            : upperLevelDomain;
    }
}
