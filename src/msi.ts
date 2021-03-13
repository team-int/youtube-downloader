import { MSICreator } from 'electron-wix-msi';
import path from 'path';
const creator:MSICreator = new MSICreator({
    appDirectory: path.join(__dirname, 'out/win-ia32-unpacked'),
    outputDirectory: path.join(__dirname, 'out/msi'),
    exe: 'YouTube Downloader.exe',
    description: 'A simple YouTube downloader',
    version: require('./package.json').version,
    name: 'YouTube Downloader',
    manufacturer: 'Team int',
    features: {
        autoUpdate: true,
        autoLaunch: false
    },
    arch: 'x86',
    ui: {
        chooseDirectory: true
    },
    appIconPath: path.join(__dirname, 'build/icon.ico')
});
creator.create().then(async () => {
    await creator.compile();
});