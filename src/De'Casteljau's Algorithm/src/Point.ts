import p5, { Vector } from "p5";

export default class Point {
  p5: p5;
  pos: Vector;
  constructor(p5: p5, pos: Vector) {
    this.p5 = p5;
    this.pos = pos;
  }

  draw() {
    this.p5.circle(this.pos.x, this.pos.y, 10)
  }

  clone() {
    return new Point(this.p5, this.pos.copy())
  }
}
