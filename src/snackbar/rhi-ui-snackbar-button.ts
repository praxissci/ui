export class RhiUiSnackbarButton {
  public text: string = '...';
  public event: any;
  public eventName: string | null = null;
  public persistent: boolean = false;
  constructor(text: string, persistent: boolean, eventName: string | null = null, event: any = null) {
    this.text = text;
    this.persistent = persistent;
    this.eventName = eventName;
    this.event = event;
  }
}
