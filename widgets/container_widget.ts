import { figmaToFlutterPadding } from "../utils/padding";

export function figmaToFlutterContainer(node: FrameNode) {

    const padding = figmaToFlutterPadding(node);

    return `Container(
    ${padding}
    )`;
}