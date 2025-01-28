import { GenericRequest } from "./generic.request";

export class TaskRequest extends GenericRequest {

  private taskRef: string;
  private taskLot: string;
  private taskManufacturer: string;
  private taskNotes: string;
  private taskPurchaseDate: string;
  private purchaseDateFrom: string;
  private purchaseDateTo: string;
  private taskSeriesCodesList: string[];

  /**
   * Getter $taskRef
   * @return {string}
   */
  public get $taskRef(): string {
    return this.taskRef;
  }

  /**
   * Setter $taskRef
   * @param {string} value
   */
  public set $taskRef(value: string) {
    this.taskRef = value;
  }

  /**
   * Getter $taskLot
   * @return {string}
   */
  public get $taskLot(): string {
    return this.taskLot;
  }

  /**
   * Setter $taskLot
   * @param {string} value
   */
  public set $taskLot(value: string) {
    this.taskLot = value;
  }

  /**
    * Getter $taskManufacturer
    * @return {string}
    */
  public get $taskManufacturer(): string {
    return this.taskManufacturer;
  }

  /**
   * Setter $taskManufacturer
   * @param {string} value
   */
  public set $taskManufacturer(value: string) {
    this.taskManufacturer = value;
  }

  /**
    * Getter $taskNotes
    * @return {string}
    */
  public get $taskNotes(): string {
    return this.taskNotes;
  }

  /**
   * Setter $taskNotes
   * @param {string} value
   */
  public set $taskNotes(value: string) {
    this.taskNotes = value;
  }

  /**
   * Getter $taskPurchaseDate
   * @return {string}
   */
  public get $taskPurchaseDate(): string {
    return this.taskPurchaseDate;
  }

  /**
   * Setter $taskPurchaseDate
   * @param {string} value
   */
  public set $taskPurchaseDate(value: string) {
    this.taskPurchaseDate = value;
  }

  /**
 * Getter $purchaseDateFrom
 * @return {string}
 */
  public get $purchaseDateFrom(): string {
    return this.purchaseDateFrom;
  }

  /**
   * Setter $purchaseDateFrom
   * @param {string} value
   */
  public set $purchaseDateFrom(value: string) {
    this.purchaseDateFrom = value;
  }

  /**
   * Getter $purchaseDateTo
   * @return {string}
   */
  public get $purchaseDateTo(): string {
    return this.purchaseDateTo;
  }

  /**
   * Setter $purchaseDateTo
   * @param {string} value
   */
  public set $purchaseDateTo(value: string) {
    this.purchaseDateTo = value;
  }


  /**
   * Getter $taskSeriesCodesList
   * @return {string[]}
   */
  public get $taskSeriesCodesList(): string[] {
    return this.taskSeriesCodesList;
  }

  /**
   * Setter $taskSeriesCodesList
   * @param {string[]} value
   */
  public set $taskSeriesCodesList(value: string[]) {
    this.taskSeriesCodesList = value;
  }

}
