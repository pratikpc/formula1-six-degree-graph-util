# Formula One Graph Names

## Website [https://pratikpc.github.io/six-degree-f1/](https://pratikpc.github.io/six-degree-f1/)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) [![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/) [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier) 

Graph Operations utilised by the website to parse JSON and Abstract processing

```ts
console.log(Graph.GetDriverName('5'));
const graph = new Graph();

graph.CalculateDistancesBetweenAllElements({ cache: true });

console.log(graph.GetSixDegreesOfFreedomInMainComponent());
console.log(
   'Closest between 1950 and 2020',
   Graph.GetDriverName(graph.GetClosestDriverPairingBetweenSeasons(1950, 2020))
);
console.log(
   Graph.GetDriverName(graph.GetClosestTeamPairing('mclaren', 'lotus'))
);
console.log(
   Graph.GetDriverName(
      graph.GetClosestTeamAndDriverPairing('mclaren', 'kimi-raikkonen')
   )
);
console.log('Farthest');
console.log(
   Graph.GetDriverName(graph.GetFarthestDriverPairingBetweenSeasons(1950, 2020))
);
console.log(
   Graph.GetDriverName(graph.GetFarthestTeamPairing('mclaren', 'lotus'))
);
console.log(
   Graph.GetDriverName(
      graph.GetClosestTeamAndDriverPairing('mclaren', 'kimi-raikkonen')
   )
);

```