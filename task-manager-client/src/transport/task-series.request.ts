import { GenericRequest } from "./generic.request";

export class TaskSeriesRequest extends GenericRequest {

  private taskSeriesCode: string;
  private connectedTasksIds: number[] = [];
  private unconnectedTasksIds: number[] = [];

  /**
  * Getter $taskSeriesCode
  * @return {string}
  */
  public get $taskSeriesCode(): string {
    return this.taskSeriesCode;
  }

  /**
   * Setter $taskSeriesCode
   * @param {string} value
   */
  public set $taskSeriesCode(value: string) {
    this.taskSeriesCode = value;
  }
  /**
   *
  /**
 * Getter $connectedTasksIds
 * @return {number[]}
 */
  public get $connectedTasksIds(): number[] {
    return this.connectedTasksIds;
  }

  /**
   * Setter $connectedTasksIds
   * @param {number[]} value
   */
  public set $connectedTasksIds(value: number[]) {
    this.connectedTasksIds = value;
  }

  /**
* Getter $unconnectedTasksIds
* @return {number[]}
*/
  public get $unconnectedTasksIds(): number[] {
    return this.unconnectedTasksIds;
  }

  /**
   * Setter $unconnectedTasksIds
   * @param {number[]} value
   */
  public set $unconnectedTasksIds(value: number[]) {
    this.unconnectedTasksIds = value;
  }
}
