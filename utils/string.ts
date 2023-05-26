export default class Str {
    public contents: string

    constructor(data: number[] | string) {
        if (typeof data == "string") this.contents = data
        else this.contents = this.fromRawBytes(data)

        return this
    }

    fromRawBytes(bytes: number[]): string {
        let allocStr = "";

        bytes.forEach((byte) => {
            allocStr += String.fromCharCode(byte);
        })

        return allocStr
    }
}