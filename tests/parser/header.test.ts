import { Parser } from "../../src/classes/parser.ts";
import String from "../../utils/string.ts"
import { assertEquals } from "https://deno.land/std@0.189.0/testing/asserts.ts";

Deno.test("Parser::Header", () => {
    const testBin = Deno.readFileSync("assets/cc66668af760cef209b852c6563bdf25.rbxl");

    type TestBinStruct = {
        HEADER_MagicNumber: Array<number>;
        HEADER_Signature: Array<number>;
        HEADER_Version: number;
        HEADER_ClassCount: number;
        HEADER_InstanceCount: number;
        HEADER_Reserved: Array<number>;
    };

    const binTree = new Parser()
        .section({
            name: "HEADER_MagicNumber",
            type: "uint8",
            sectionLen: 8,
        })
        .section({
            name: "HEADER_Signature",
            type: "uint8",
            sectionLen: 6,
        })
        .sectionValue({
            name: "HEADER_Version",
            type: "uint16",
        })
        .sectionValue({
            name: "HEADER_ClassCount",
            type: "int32",
        })
        .sectionValue({
            name: "HEADER_InstanceCount",
            type: "int32",
        })
        .section({
            name: "HEADER_Reserved",
            type: "uint8",
            sectionLen: 8,
        })
        .parseBin<TestBinStruct>(testBin);

    assertEquals(
        new String(binTree.HEADER_MagicNumber).contents, 
        "<roblox!"
    );
    
    assertEquals(
        binTree.HEADER_Signature,
        [0x89, 0xff, 0x0d, 0x0a, 0x1a, 0x0a]
    );

    assertEquals(
        binTree.HEADER_Version,
        0
    );

    assertEquals(
        binTree.HEADER_ClassCount,
        66
    );

    assertEquals(
        binTree.HEADER_InstanceCount,
        70
    );

    assertEquals(
        binTree.HEADER_Reserved,
        [0, 0, 0, 0, 0, 0, 0, 0]
    );
})
