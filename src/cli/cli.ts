import * as commander from 'commander';

export class Cli {
  /**
   * Initializes the cli
   */
  public static initialize(): void {
    commander
      .version('0.1.0')
      .option('-p', 'lol', 'None')
      .parse(process.argv);
  }
}
