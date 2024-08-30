import { Injectable } from '@nestjs/common';
import { CreateUniqueGeneratorDto } from './dto/create-unique-generator.dto';
import { UpdateUniqueGeneratorDto } from './dto/update-unique-generator.dto';

@Injectable()
export class UniqueGeneratorService {
  private signHash = {
    '0': 0,
    '1': 1,
    '2': 2,
    '3': 3,
    '4': 4,
    '5': 5,
    '6': 6,
    '7': 7,
    '8': 8,
    '9': 9,
    a: 10,
    b: 11,
    c: 12,
    d: 13,
    e: 14,
    f: 15,
  };

  private BASE = 16;

  nextValue(start: string = '9f') {
    let remainValue = 0, next = '';
    for (let i = start.length - 1; i >= 0; i--) {
      if (!this.signHash[start[i]]) return;

      const value = (i === start.length - 1) ? this.signHash[start[i]] + 1 : this.signHash[start[i]] + remainValue;
      if (value >= this.BASE) {
        next += this.signHash[value - this.BASE];
        remainValue = 1;
      } else {
        next += this.signHash[value];
      }
    }
  }
}
