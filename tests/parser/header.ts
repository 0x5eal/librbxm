import { Parser } from "../../src/classes/parser.ts";
import String from "../../utils/string.ts"
import { assertEquals } from "https://deno.land/std@0.189.0/testing/asserts.ts";

Deno.test("Parser::Header", () => {
    const testBin = Deno.readFileSync("assets/cc66668af760cef209b852c6563bdf25.rbxl");

    type TestBinStruct = {
        HEADER_MagicNumber: Array<number>;
    };

    const binTree = new Parser()
        .section({
            name: "HEADER_MagicNumber",
            type: "uint8",
            sectionLen: 8,
        })
        .parseBin<TestBinStruct>(testBin);

    assertEquals(
        new String(binTree.HEADER_MagicNumber).contents, 
        "<roblox!"
    )
})
