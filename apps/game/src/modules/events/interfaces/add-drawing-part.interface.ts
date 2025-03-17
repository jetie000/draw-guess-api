export interface AddDrawingPart {
  drawing: {
    color: string;
    gameId: number;
    lineWidth: number;
    posX: number[];
    posY: number[];
    drawingId: number;
  };
  room: number;
}
