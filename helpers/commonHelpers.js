export default class CommonHelpers {
    static getShortDisplayName(name) {
        return name.includes(' ') ? name.split(' ')[0] : name;
    }
}
