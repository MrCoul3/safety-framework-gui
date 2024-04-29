export class DebounceContainer {
    timeout: NodeJS.Timeout | null = null;

    invoke(callback: () => void, delay: number) {
        if (this.timeout !== null) {
            return;
        }

        this.timeout = setTimeout(() => {
            callback();
            this.timeout = null;
        }, delay);
    }
}
