import p5 from "p5";
import Point from "./Point";
import Line from "./Line";

new p5((p5: p5) => {
  const points: Point[] = [];
  const linesList: Line[][] = [];
  const path: Point[] = [];
  let t = 0;

  function reset() {
    t = 0;
    path.splice(0);
  }

  p5.setup = () => {
    p5.createCanvas(800, 800);
    p5.colorMode(p5.HSB);
    p5.frameRate(30)
  };
  p5.draw = () => {
    p5.background(0);
    points.forEach((point) => {
      point.draw();
    });

    const colorStep = 360 / linesList.length;

    linesList.forEach((list, index) => {
      list.forEach((line) => {
        line.draw(t, [p5.map(colorStep * index, 0, 255,255,0), 200, 30]);
      });
    });

    const lastPoint = linesList[linesList.length - 1]?.[0]?.TPoint.clone();

    if (lastPoint) {
      path.push(lastPoint);
    }

    p5.stroke(0, 255, 255);
    p5.noFill();

    p5.beginShape();
    path.forEach((point) => {
      p5.vertex(point.pos.x, point.pos.y);
    });
    p5.endShape();

    t += 0.01;
    if (t >= 1) {
      reset();
    }
  };
  p5.mousePressed = () => {
    reset();
    function generateLines(points: Point[], depth = 0) {
      const lines: Line[] = [];
      const newPoints: Point[] = [];

      for (let i = 0; i < points.length - 1; i++) {
        const p1 = points[i];
        const p2 = points[i + 1];
        const line = new Line(p5, p1, p2);
        lines.push(line);
        newPoints.push(line.TPoint);
      }
      if (lines.length) linesList.push(lines);
      if (newPoints.length) {
        generateLines(newPoints, ++depth);
      }
    }

    points.push(new Point(p5, p5.createVector(p5.mouseX, p5.mouseY)));
    linesList.splice(0);
    generateLines(points);
  };
});
