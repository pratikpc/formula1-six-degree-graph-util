import {
   Graph as GraphT,
   TeamMates,
   DriverIdAndNameLink,
   Drivers,
   TeamAndDriver,
   TeamIdAndNameLink,
   TeamNamesAndDrivers,
   Path,
   Distance,
   PathT,
   DistanceT
} from 'formula-one-six-degrees-metadata';
import type {
   DriversT,
   DriverLinkNameT,
   TeamAndDriverT,
   TeamNameT
} from 'formula-one-six-degrees-metadata';
import lodash from 'lodash';

export default class Graph extends GraphT {
   constructor() {
      super(TeamMates);
      this.path = Path as PathT;
      this.distance = Distance as DistanceT;
   }

   public static GetDriverIDsForSeason(season: number): DriverLinkNameT[] {
      let driverNames: DriverLinkNameT[] = [];
      for (const seasonData of TeamAndDriver)
         if (seasonData.season === season) {
            for (const teams in seasonData)
               if (teams !== 'season') {
                  const drivers = seasonData[
                     teams as TeamAndDriverT
                  ] as DriverLinkNameT[];
                  driverNames = driverNames.concat(drivers);
               }
            break;
         }
      return driverNames;
   }

   public GetSixDegreesOfFreedomInMainComponent() {
      const connected = this.ConnectedComponents();
      const bigNames = connected[0];
      const items = lodash
         .intersectionBy(
            Object.keys(
               this.CalculateAverageDistanceBetweenAllElements()
            ) as DriversT[],
            bigNames
         )
         .map(key => [
            key,
            Graph.GetDriverName(key as DriversT),
            Number(this.pathLength[key as DriversT].count)
         ]);
      const mostClosest = items.sort((a, b) => Number(a[2]) - Number(b[2]));
      const mostFarthest = items.sort((a, b) => Number(b[2]) - Number(a[2]));

      return {
         mostClosest: mostClosest,
         mostFarthest: mostFarthest
      };
   }

   public GetClosestDriversPairing(
      drivers1: DriverLinkNameT[],
      drivers2: DriverLinkNameT[]
   ) {
      let minDist = Number.MAX_VALUE;
      let minPair: DriverLinkNameT[] = ['a-j-foyt', 'a-j-foyt'];
      for (const driver1 of drivers1) {
         const driver1Id = Drivers[driver1] as DriverLinkNameT;
         for (const driverSeason2 of drivers2) {
            const driver2Id = Drivers[driverSeason2] as DriverLinkNameT;
            const dist = this.PathLength(driver1Id, driver2Id);
            if (minDist > dist && dist !== 0) {
               minDist = dist;
               minPair = [driver1Id, driver2Id];
               if (minDist === 1) break;
            }
         }
         if (minDist === 1) break;
      }
      return this.Path(minPair[0], minPair[1]) as DriversT[];
   }

   public GetFarthestDriverPairing(
      drivers1: DriverLinkNameT[],
      drivers2: DriverLinkNameT[]
   ) {
      let maxDist = Number.MIN_VALUE;
      let maxPair: DriverLinkNameT[] = ['a-j-foyt', 'a-j-foyt'];
      for (const driver1 of drivers1) {
         const driver1Id = Drivers[driver1] as DriverLinkNameT;
         for (const driver2 of drivers2) {
            const driver2Id = Drivers[driver2] as DriverLinkNameT;
            const dist = this.PathLength(driver1Id, driver2Id);
            if (maxDist < dist && dist !== 0) {
               maxDist = dist;
               maxPair = [driver1Id, driver2Id];
               if (maxDist === 1) break;
            }
         }
         if (maxDist === 1) break;
      }
      return this.Path(maxPair[0], maxPair[1]) as DriversT[];
   }

   public GetClosestDriverPairingBetweenSeasons(
      season1: number,
      season2: number
   ) {
      const drivers1 = Graph.GetDriverIDsForSeason(season1);
      const drivers2 = Graph.GetDriverIDsForSeason(season2);
      return this.GetClosestDriversPairing(drivers1, drivers2);
   }

   public GetClosestTeamPairing(team1: TeamNameT, team2: TeamNameT) {
      const drivers1 = TeamNamesAndDrivers[team1] as DriverLinkNameT[];
      const drivers2 = TeamNamesAndDrivers[team2] as DriverLinkNameT[];
      return this.GetClosestDriversPairing(drivers1, drivers2);
   }

   public GetClosestTeamAndDriverPairing(
      team: TeamNameT,
      driver: DriverLinkNameT
   ) {
      const drivers1 = TeamNamesAndDrivers[team] as DriverLinkNameT[];
      return this.GetClosestDriversPairing(drivers1, [driver]);
   }

   public GetFarthestDriverPairingBetweenSeasons(
      season1: number,
      season2: number
   ) {
      const drivers1 = Graph.GetDriverIDsForSeason(season1);
      const drivers2 = Graph.GetDriverIDsForSeason(season2);
      return this.GetFarthestDriverPairing(drivers1, drivers2);
   }

   public GetFarthestTeamPairing(team1: TeamNameT, team2: TeamNameT) {
      const drivers1 = TeamNamesAndDrivers[team1] as DriverLinkNameT[];
      const drivers2 = TeamNamesAndDrivers[team2] as DriverLinkNameT[];
      return this.GetFarthestDriverPairing(drivers1, drivers2);
   }

   public GetFarthestTeamAndDriverPairing(
      team: TeamNameT,
      driver: DriverLinkNameT
   ) {
      const drivers1 = TeamNamesAndDrivers[team] as DriverLinkNameT[];
      return this.GetFarthestDriverPairing(drivers1, [driver]);
   }

   public static GetTeamName(key: TeamNameT | Array<TeamNameT>) {
      if (key instanceof Array) {
         const names: string[] = [];
         for (const keyI of key) {
            names.push(Graph.GetTeamName(keyI) as string);
         }
         return names;
      }
      return TeamIdAndNameLink[key as TeamNameT];
   }

   public static GetDriverName(key: DriversT | Array<DriversT>) {
      if (key instanceof Array) {
         const names: string[] = [];
         for (const keyI of key) {
            names.push(Graph.GetDriverName(keyI) as string);
         }
         return names;
      }
      return DriverIdAndNameLink[Drivers[key] as DriverLinkNameT];
   }

   public GetClosestDriverPairing(
      source: DriverLinkNameT,
      dest: DriverLinkNameT
   ) {
      return this.Path(
         Drivers[source] as DriversT,
         Drivers[dest] as DriversT
      ) as DriversT[];
   }

   public PathDriverName(source: DriversT, dest: DriversT) {
      return this.Path(source, dest).map(k =>
         Graph.GetDriverName(k as DriverLinkNameT)
      );
   }

   public ConnectedComponentNames() {
      const connected = super.ConnectedComponents();
      const names = [];
      for (const connect of connected)
         names.push(Graph.GetDriverName(connect as DriverLinkNameT[]));
      return names;
   }

   public static PathToTree(items: DriversT[]) {
      if (items.length === 0) return {};
      // eslint-disable-next-line no-bitwise
      const mid = (items.length / 2) >> 0;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const tree: any = {
         name: `${this.GetDriverName(items[mid])}`,
         children: []
      };
      let treeL = tree;
      for (let i = mid - 1; i >= 0; i -= 1) {
         treeL.children.push({
            name: `${this.GetDriverName(items[i])}`,
            children: []
         });
         [treeL] = treeL.children;
      }
      let treeR = tree;
      let first = true;
      for (let i = mid + 1; i < items.length; i += 1) {
         treeR.children.push({
            name: `${this.GetDriverName(items[i])}`,
            children: []
         });
         if (first) {
            [, treeR] = treeR.children;
            first = false;
         } else [treeR] = treeR.children;
      }
      return [tree];
   }
}
