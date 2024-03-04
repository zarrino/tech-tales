import p5, { p5InstanceExtensions } from "p5";
import Point from "./Point";

export default class Line {
  p5: p5;
  p1: Point;
  p2: Point;

  _TPoint: Point;

  constructor(p5: p5, p1: Point, p2: Point) {
    this.p5 = p5;
    this.p1 = p1;
    this.p2 = p2;
    this._TPoint = this.getTPointFromT(0);
  }

  getTPointFromT(t: number) {
    const x = this.p1.pos.x + t * (this.p2.pos.x - this.p1.pos.x);
    const y = this.p1.pos.y + t * (this.p2.pos.y - this.p1.pos.y);
    return new Point(this.p5, this.p5.createVector(x, y));
  }

  get TPoint(): Point {
    return this._TPoint;
  }

  set TPoint(t: number) {
    this._TPoint.pos.x = this.p1.pos.x + t * (this.p2.pos.x - this.p1.pos.x);
    this._TPoint.pos.y = this.p1.pos.y + t * (this.p2.pos.y - this.p1.pos.y);
  }
  draw(
    t: number,
    stroke: number[] = [255]
  ) {
    this.TPoint = t;
    this.p5.stroke(...(stroke as [number]));
    this.p5.strokeWeight(3)
    this.p5.line(this.p1.pos.x, this.p1.pos.y, this.p2.pos.x, this.p2.pos.y);
    this.TPoint.draw();
  }
}
