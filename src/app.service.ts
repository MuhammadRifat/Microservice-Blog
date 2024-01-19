import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello() {
    const used = process.memoryUsage();
    const upTime = process.uptime();
    // const cpuUsage = process.cpuUsage();

    const welcome = `<h1 style="color:darkgreen">Welcome to Backend API Server</h1><hr/>`;
    const rss = `<h1>Resident Set Size: <span style="color:red;">${Math.round(used.rss / 1024 / 1024 * 100) / 100}</span> MB</h1>`;
    const heapTotal = `<h1>Heap Total: <span style="color:red;">${Math.round(used.heapTotal / 1024 / 1024 * 100) / 100}</span> MB</h1>`;
    const heapUsed = `<h1>Heap Used: <span style="color:red;">${Math.round(used.heapUsed / 1024 / 1024 * 100) / 100}</span> MB</h1>`;
    const arrayBuffers = `<h1>Array Buffers: <span style="color:red;">${Math.round(used.rss / 1024 / 1024 * 100) / 100}</span> MB</h1>`;
    const upTimeHtml = `<h1>Up time: <span style="color:red;">${Math.floor(upTime)}</span> Seconds</h1>`;

    return '<div style="text-align:center;">' + welcome + rss + heapTotal + heapUsed + arrayBuffers + upTimeHtml + '</div>';
  }
}
