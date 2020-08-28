import Node,{IPath} from './class/Node'
import Find from './Find'


import input from './input'

let citysArray = input.citys
let citys:Node[] = []

citysArray.forEach(element => {
  let city = new Node(element.name);
  citys.push(city);
});

citysArray.forEach(element => {
  let aux:IPath[] = []
  element.chidlren.forEach(neig =>{
    let city = citys.indexOf(citys.filter(el => el.name === neig.name)[0])
    let distance = neig.distance;
    aux.push({neighborId:city,distance})
  })
  citys.filter(ele => ele.name === element.name)[0].neighbors = aux;
});


const from = 'Lugoj'
const to = 'Bucharest'

const find = new Find(citys);
find.findMinPath(from,to)