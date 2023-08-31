export function figmaToFlutterPadding(node: FrameNode) {
    var edgeInsets;
    if (node.paddingBottom === node.paddingLeft && node.paddingRight === node.paddingTop && node.paddingRight === node.paddingLeft) {
        if (node.paddingBottom === 0) { edgeInsets = ''; } else { edgeInsets = `EdgeInsets.all(${node.paddingBottom})`; }
    } else if (node.verticalPadding || node.horizontalPadding) {
        const verticalPadding = node.verticalPadding ? `vertical:${node.verticalPadding}` + ',\n\t\t' : '';
        const horizontalPadding = node.horizontalPadding ? `horizontal:${node.horizontalPadding}` + ',\n\t\t' : '';
        edgeInsets = `EdgeInsets.symmetric(\n\t\t${verticalPadding}${horizontalPadding})`;
    }
    return edgeInsets ? `padding: ${edgeInsets},` : '';
}

