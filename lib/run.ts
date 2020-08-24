
import {
   Path,
   Distance,
   PathT,
   DistanceT
} from 'formula1-extract-driver-pairs';
import Graph from './Graph';

async function Run() {
   console.log(Graph.GetDriverName('5'));
   const graph = new Graph();

   graph.path = Path as PathT;
   graph.distance = Distance as DistanceT;

   graph.CalculateDistancesBetweenAllElements({ cache: true });

   console.log(graph.GetSixDegreesOfFreedomInMainComponent());
   console.log(
      'Closest between 1950 and 2020',
      graph.GetClosestDriverPairingBetweenSeasons(1950, 2020)
   );
   console.log(graph.GetClosestTeamPairing('mclaren', 'lotus'));
   console.log(
      graph.GetClosestTeamAndDriverPairing('mclaren', 'kimi-raikkonen')
   );
   console.log('Farthest');
   console.log(graph.GetFarthestDriverPairingBetweenSeasons(1950, 2020));
   console.log(graph.GetFarthestTeamPairing('mclaren', 'lotus'));
   console.log(
      graph.GetClosestTeamAndDriverPairing('mclaren', 'kimi-raikkonen')
   );
}

Run()
   .then(async () => {
      return console.log('Done');
   })
   .catch(err => {
      console.error(err);
   });
