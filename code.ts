// This plugin will generate a sample codegen plugin
// that appears in the Element tab of the Inspect panel.

// This file holds the main code for plugins. Code in this file has access to
// the *figma document* via the figma global object.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser environment (See https://www.figma.com/plugin-docs/how-plugins-run).

// This provides the callback to generate the code.
figma.codegen.on('generate', (event) => {



  var textWidget = ``;
  var textStyle = ``;



  
  if (event.node.type === "TEXT") {
    textWidget = figmaToFlutterText(event.node);
    textStyle = figmaToFlutterTextStyle(event.node);
  }

  return [
    {
      language: "KOTLIN",
      code: textWidget,
      title: "Text Widget",
    },
    {
      language: "KOTLIN",
      code: textStyle,
      title: "TextStyle",
    },
  ];
});

function rgbToHex(r: number, g: number, b: number) {
  return "0xff" + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1);
}

function figmaToFlutterText(node: TextNode) {
  const text = `"${node.characters}",`;
  const textStyle = figmaToFlutterTextStyle(node);
  const textAlign = node.textAlignHorizontal ?
    node.textAlignHorizontal == "LEFT" ? `textAlign: TextAlign.left,` + `\n`
      : node.textAlignHorizontal == "RIGHT" ? `textAlign: TextAlign.right,` + `\n`
        : node.textAlignHorizontal == "CENTER" ? `textAlign: TextAlign.center,` + `\n`
          : node.textAlignHorizontal == "JUSTIFIED" ? `textAlign: TextAlign.justify,` + `\n`
            : '' : '';

  const textWidget =
    `Text(
  ${text}
  \t${textStyle}
  ${textAlign})`;
  return textWidget;
}

function figmaToFlutterTextStyle(node: TextNode) {
  // var rangefills = node.getRangeFills(0, 2);
  // console.log(rangefills);
  const fontFamily = node.fontName !== figma.mixed ? `\t` + ` fontFamily: "${node.fontName.family}",` + `\n` : '';
  const lineHeight = node.height && node.fontSize ? `\t` + `height: ${node.height}/${node.fontSize.toString()},` + `\n` : '';
  const size = node.fontSize ? `\t` + `fontSize: ${node.fontSize.toString()},` + `\n` : '';
  const weight = node.fontWeight ? `\t` + `fontWeight: FontWeight.w${node.fontWeight.toString()},` + `\n` : '';
  const colorString = (node.fills !== figma.mixed && node.fills[0].type === "SOLID") ? rgbToHex(node.fills[0].color.r * 256, node.fills[0].color.g * 256, node.fills[0].color.b * 256) : null;
  const color = colorString ? `\t` + `color: Color(${colorString}),` + `\n` : '';
  const letterSpacing = node.letterSpacing ? `\t` + `letterSpacing: ${node.letterSpacing.toString()} ,` + `\n` : '';
  var shadowList: string[] = [];
  node.effects.forEach((e) => {

    if (e.type === "DROP_SHADOW") {
      const blurRadius = e.radius ? `\t` + `blurRadius: ${e.radius},\n` : '';
      const offset = `\t` + `offset: Offset(${e.offset.x}, ${e.offset.y}),\n`;
      const nodeColor = e.color;
      const shadowColor = `\t` + `color: Color(${rgbToHex(nodeColor.r * 256, nodeColor.g * 256, nodeColor.b * 256)}),\n`
      const shadow = `\t` + `Shadow(${blurRadius}${offset}${shadowColor})`
      shadowList = [...shadows, shadow]
    }
  });

  const shadows = shadowList.length !== 0 ? `shadows:${shadowList.toString()},\n` : '';


  const textStyle = `style: const TextStyle(\n${fontFamily}${size}${weight}${color}${lineHeight}${shadows}\t),`


  return textStyle;
}

