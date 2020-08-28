import Node, { IPath } from "./class/Node";


export default class Find {
  private citys: Node[];
  constructor(citys: Node[]) {
    this.citys = citys;
  }

  private removeFromArray(arr: Node[], elt: Node) {
    arr.splice(arr.indexOf(elt), 1)
  }

  private find(name: string): Node {
    return this.citys.filter(element => element.name === name)[0];
  }

  private heuristic(name: any):number {
    const lineDistance = {
      Arad: 366,
      Oradea: 380,
      Zerind: 374,
      Sibiu: 253,
      Timisoara: 329,
      Lugoj: 244,
      Mehadia: 241,
      Dobreta: 242,
      Craiova: 160,
      Pitesti:101,
      "Rimnicu Vicea": 193,
      Bucharest: 0,
      Fagaras: 176,
      Urziceni: 80,
      Hirsova: 151,
      Varsiui: 199,
      Iasi: 226,
    }
    return lineDistance[name];
  }

  findMinPath(from: string, to: string) {
    let openSet: Node[] = [];
    let closedSet: Node[] = [];
    let path: IPath[] = [];

    openSet.push(this.find(from))
    while(openSet.length > 0){
    if (openSet.length > 0) {
    let lowestIndex = 0;
      for (let i = 0; i < openSet.length; i++) {
        if (openSet[i].f < openSet[lowestIndex].f) {
          lowestIndex = i;
        }
      }

      var current = openSet[lowestIndex];
      console.log(`${current.name}: f-> ${current.f} g-> ${current.g} h-> ${current.h}`)
      if(current.name === to)
      {
        console.log("DONE!")
        return;
      }

      this.removeFromArray(openSet,current)
      closedSet.push(current)

      let neighbors = current.neighbors

      let tempG = 0;
      for (let i = 0; i < neighbors.length; i++) {
        const neighbor = neighbors[i];
        const neighborCity = this.citys[neighbor.neighborId]
        if(closedSet.indexOf(neighborCity) === -1){
          tempG = current.g + neighbor.distance;
          
          let newPath = false;
          if(openSet.indexOf(neighborCity) !== -1){
            if(tempG < neighborCity.g){
              neighborCity.g = tempG;
              newPath = true;
            }
          }else{
            neighborCity.g = tempG;
            newPath = true;
            openSet.push(neighborCity);
          } 
          
          if(newPath){
            neighborCity.h = this.heuristic(neighborCity.name);
            neighborCity.f = neighborCity.g + neighborCity.h;
          }
        }
      }
    }
      else{
        console.log('no solution');
        return;
      }
    }
  }
}

