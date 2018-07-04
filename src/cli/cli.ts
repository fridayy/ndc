import { Command } from 'commander';

export class Cli {
  /**
   * Initializes the cli
   */
  public static initialize(): void {
    const c = new Command();
    c.version('0.1.0')
      .option('-p', 'lol', 'None')
      .parse(process.argv);
  }
}
