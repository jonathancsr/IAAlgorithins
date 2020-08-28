
export interface IPath {
  neighborId:number;
  distance:number;
}
export default class Node {
  public name: string;
  public neighbors: IPath[] = [];
  public g :number = 0;
  public h :number = 0;  
  public f :number = 0;
  public distance:number = 0;
  
  constructor(name: string) {
    this.name = name;
  }
}
