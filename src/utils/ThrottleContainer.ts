export class ThrottleContainer {
    timeout: NodeJS.Timeout | null = null;

    invoke(callback: () => void, delay: number) {
        if (this.timeout === null) {
            this.timeout = setTimeout(() => {
                callback();
                this.timeout = null;
            }, delay);
        }
    }
}
