export type Error = {
    errors: {
        [key: string]: string[];
    };
};
export function processError(err: Error) {
    const entries = Object.entries(err.errors);
    console.log('Error registering user', err);
    const errors = entries.map((entry) => {
        const [key, value] = entry;
        return `${key} ${(value as string[])[0]}`;
    });
    return errors;
}
