// This plugin will generate a sample codegen plugin
// that appears in the Element tab of the Inspect panel.

// import { figmaToFlutterContainer } from "./widgets/container_widget";
// import { figmaToFlutterText, figmaToFlutterTextStyle } from "./widgets/text_widget";

// This file holds the main code for plugins. Code in this file has access to
// the *figma document* via the figma global object.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser environment (See https://www.figma.com/plugin-docs/how-plugins-run).

// This provides the callback to generate the code.
figma.codegen.on('generate', (event) => {

  var textWidget = ``;
  var textStyle = ``;
  var containerWidget = ``;

  console.log(event.node.type);

  // if (event.node.type === "FRAME") {
  //   containerWidget = figmaToFlutterContainer(event.node);
  // }

  // if (event.node.type === "TEXT") {
  //   textWidget = figmaToFlutterText(event.node);
  //   textStyle = figmaToFlutterTextStyle(event.node);
  // }
  figma.showUI("<h1>This is Figma!</h1>");

  return [
    {
      language: "KOTLIN",
      code: containerWidget,
      title: "Container Widget",
    },
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





