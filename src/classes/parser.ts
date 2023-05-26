import { BinaryParser } from "../../deps.ts";
import { BinaryDataType } from "../types/parserTypes.d.ts";

type SectionMeta = {
	name: string;
	type: BinaryDataType;
};
export class Parser {
	private BinaryParser: BinaryParser;

	constructor() {
		this.BinaryParser = new BinaryParser().endianess("little");

		return this;
	}

	section(
		meta: SectionMeta & {
			sectionLen: number;
		},
	) {
		this.BinaryParser
			.array(meta.name, {
				type: meta.type,
				lengthInBytes: meta.sectionLen,
			});

		return this;
	}

	sectionValue(meta: SectionMeta) {
		this
			.BinaryParser[meta.type](meta.name);

		return this;
	}

	parseBin<T>(binData: Uint8Array | Buffer): T {
		return (this.BinaryParser
			.parse(binData) as T);
	}
}
