"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
let AppService = class AppService {
    getHello() {
        return 'Hello World!';
        const used = process.memoryUsage();
        const upTime = process.uptime();
        const welcome = `<h1 style="color:darkgreen">Welcome to Backend API Server</h1><hr/>`;
        const rss = `<h1>Resident Set Size: <span style="color:red;">${Math.round(used.rss / 1024 / 1024 * 100) / 100}</span> MB</h1>`;
        const heapTotal = `<h1>Heap Total: <span style="color:red;">${Math.round(used.heapTotal / 1024 / 1024 * 100) / 100}</span> MB</h1>`;
        const heapUsed = `<h1>Heap Used: <span style="color:red;">${Math.round(used.heapUsed / 1024 / 1024 * 100) / 100}</span> MB</h1>`;
        const arrayBuffers = `<h1>Array Buffers: <span style="color:red;">${Math.round(used.rss / 1024 / 1024 * 100) / 100}</span> MB</h1>`;
        const upTimeHtml = `<h1>Up time: <span style="color:red;">${Math.floor(upTime)}</span> Seconds</h1>`;
        return '<div style="text-align:center;">' + welcome + rss + heapTotal + heapUsed + arrayBuffers + upTimeHtml + '</div>';
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)()
], AppService);
//# sourceMappingURL=app.service.js.map