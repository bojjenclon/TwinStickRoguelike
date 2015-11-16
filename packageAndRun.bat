@echo off

if "%1" == "-dev" (
  bundleNoMinify.bat && runElectron.bat
) else (
  bundle.bat && runElectron.bat
)
