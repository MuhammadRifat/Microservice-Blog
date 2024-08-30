import { Injectable } from '@nestjs/common';

@Injectable()
export class UniqueGeneratorService {
  private BASE62_CHARACTERS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  private START = 0;
  private COVER = 5;

  // decimal to base 62
  public encodeBase62(number: number): string {
    let result = '';
    while (number > 0) {
      result = this.BASE62_CHARACTERS[number % this.BASE62_CHARACTERS.length] + result;
      number = Math.floor(number / this.BASE62_CHARACTERS.length);
    }
    const value = result || '0';
    return value.padStart(this.COVER, '0');
  }

  // base 62 to decimal
  public decodeBase62(str: string): number {
    let result = 0;
    for (let i = 0; i < str.length; i++) {
      result = result * this.BASE62_CHARACTERS.length + this.BASE62_CHARACTERS.indexOf(str[i]);
    }

    return result;
  }

  // generate sequence
  public generateSequence(start: number = 0, end: number) {
    const result = [];

    for (let i = start; i <= end; i++) {
      result.push(this.encodeBase62(i));
    }

    return result;
  }

  // get next value
  public getNext() {
    return this.encodeBase62(this.START++);
  }
}
