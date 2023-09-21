@echo off

echo Run Commit
git add .
git commit -m 'main'
git push

echo Running npm build...
npm run build

echo Deploying to Firebase...
firebase deploy

pause