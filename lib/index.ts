import { DriverIdAndNameLink } from 'formula1-extract-driver-pairs';
import Graph from './Graph';

export function GetNumberOfDrivers() {
   return Object.keys(DriverIdAndNameLink).length;
}
export { Graph };
