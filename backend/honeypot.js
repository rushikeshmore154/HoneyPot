// honeypot.js
import net from 'net';
import fs from 'fs';
const logFile = 'honeypot_log.txt';
const port = 8081;

// Ensure the log file exists
if (!fs.existsSync(logFile)) {
    fs.writeFileSync(logFile, '', { flag: 'w' });
}

const server = net.createServer((socket) => {
    const remoteAddress = socket.remoteAddress;
    const time = new Date().toISOString();
    const log = `[${time}] Connection attempt from ${remoteAddress}\n`;

    console.log(log);
    fs.appendFileSync(logFile, log);
    socket.destroy();
});

server.listen(port, () => {
    console.log(`Honeypot listening on port ${port}`);
});
