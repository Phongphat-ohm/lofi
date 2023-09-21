@echo off

echo Running npm build...
npm run build

echo Deploying to Firebase...
firebase deploy

pause