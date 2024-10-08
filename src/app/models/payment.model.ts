export class Payment {
  constructor(
    public id: string,
    public cxpId: string,
    public amount: number,
    public date: Date
  ) {}
}
