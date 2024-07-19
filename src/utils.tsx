export function validateMass(mass: number): void {
    if (mass < 1 || mass > 10) {
        throw new Error('Mass must be between 1 and 10');
    }
    else {
        return;
    }
}