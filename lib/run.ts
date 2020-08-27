import Graph from './Graph';

async function Run() {
   console.log(Graph.GetDriverName('5'));
   const graph = new Graph();

   graph.CalculateDistancesBetweenAllElements({ cache: true });

   console.log(graph.GetSixDegreesOfFreedomInMainComponent());
   console.log(
      'Closest between 1950 and 2020',
      Graph.GetDriverName(
         graph.GetClosestDriverPairingBetweenSeasons(1950, 2020)
      )
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
      Graph.GetDriverName(
         graph.GetFarthestDriverPairingBetweenSeasons(1950, 2020)
      )
   );
   console.log(
      Graph.GetDriverName(graph.GetFarthestTeamPairing('mclaren', 'lotus'))
   );
   console.log(
      Graph.GetDriverName(
         graph.GetClosestTeamAndDriverPairing('mclaren', 'kimi-raikkonen')
      )
   );
}

Run()
   .then(async () => {
      return console.log('Done');
   })
   .catch(err => {
      console.error(err);
   });
