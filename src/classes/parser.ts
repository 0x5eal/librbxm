import { BinaryParser } from "../../deps.ts";
import { BinaryDataType } from "../types/parserTypes.d.ts";

export class Parser {
	private BinaryParser: BinaryParser;

	constructor() {
		this.BinaryParser = new BinaryParser().endianess("little");

		return this;
	}

	section(meta: {
		name: string;
		type: BinaryDataType;
		sectionLen: number;
	}) {
		this.BinaryParser
			.array(meta.name, {
				type: meta.type,
				lengthInBytes: meta.sectionLen,
			});

		return this;
	}

	parseBin<T>(binData: Uint8Array | Buffer): T {
		return (this.BinaryParser
			.parse(binData) as T);
	}
}
