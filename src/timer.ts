export class Timer {
  timeCDRandom: number;
  timeCD: number;
  timer: NodeJS.Timeout | undefined;
  callback: () => Promise<boolean>;
  config: { startWithFirst: Boolean; };
  constructor(timeCD: number, timeCDRandom: number, callback: () => Promise<boolean>, config: { startWithFirst: Boolean } = { startWithFirst: true }) {
    this.timeCD = timeCD;
    this.timeCDRandom = timeCDRandom;
    this.timer = undefined;
    this.callback = callback;
    this.config = config;
  }
  async startTimer() {
    let status = await this.callback();
    if (status) {
      this.timer = setTimeout(this.startTimer.bind(this), this.timeCD + Math.random() * this.timeCDRandom)
    }
  }
  stopTimer() {
    if (this.timer !== undefined) {
      clearTimeout(this.timer)
    }
  }
}
