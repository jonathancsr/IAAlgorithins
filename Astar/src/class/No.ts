import Path from "../models/Path";
export default class No {
  private name: string;
  private children: Path[];

  constructor(name: string) {
    this.name = name;
  }
}
