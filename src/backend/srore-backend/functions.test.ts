import { areAllBoxesClicked, findWinner } from "./functions";

describe("test findWinner ", () => {
  test("check winner combination", () => {
    const boxes = Array.prototype.fill("", 0, 9);

    let result = findWinner(boxes);
    expect(result).toBeNull();

    const rndVal = (Math.random() * 100).toFixed(0).toString();

    boxes[0] = rndVal;
    boxes[1] = rndVal;
    boxes[2] = rndVal;
    result = findWinner(boxes);
    expect(result).toBe(rndVal);

    boxes[0] = rndVal;
    boxes[1] = "-";
    boxes[2] = rndVal;
    result = findWinner(boxes);
    expect(result).toBeNull();
  });
});

describe("test areAllBoxesClicked ", () => {
  test("check areAllBoxesClicked ", () => {
    let boxes: Array<string | null> = [
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
    ];

    let result = areAllBoxesClicked(boxes);
    expect(result).toBeFalsy();

    const rndVal = (Math.random() * 100).toFixed(0).toString();
    boxes = boxes.map((_) => rndVal);

    result = areAllBoxesClicked(boxes);
    expect(result).toBeTruthy();
  });
});
