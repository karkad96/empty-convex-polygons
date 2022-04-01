export abstract class IGraphDrawable {
  abstract drawNodes(isAnimated: boolean): void;
  abstract drawEdges(isAnimated: boolean): void;
  abstract drawGraph(isAnimated: boolean): void;
}
