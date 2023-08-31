import { figmaToFlutterPadding } from "../utils/padding";
export function figmaToFlutterContainer(node) {
    const padding = figmaToFlutterPadding(node);
    return `Container(
    ${padding}
    )`;
}
