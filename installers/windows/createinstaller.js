const createWindowsInstaller = require('electron-winstaller').createWindowsInstaller
const path = require('path')

getInstallerConfig()
  .then(createWindowsInstaller)
  .catch((error) => {
    console.error(error.message || error)
    process.exit(1)
  })

function getInstallerConfig () {
  console.log('creating windows installer')
  const rootPath = path.join('./')
  const outPath = path.join(rootPath, 'release-builds')

  return Promise.resolve({
    appDirectory: path.join(outPath, 'Victory-check-in-app-win32-ia32/'),
    authors: 'Glenn Hartong',
    noMsi: true,
    outputDirectory: path.join(outPath, 'windows-installer'),
    exe: 'victory-check-in-app.exe',
    setupExe: 'VictoryCheckInAppInstaller.exe',
    setupIcon: path.join(rootPath, 'public', 'assets', 'win', 'victory.png.ico')
  })
}