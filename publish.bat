@echo off
echo NPM PUBLISH
echo Before continuing, ensure that:
echo - you are logged in (npm whoami)
echo - you have successfully rebuilt all the libraries (npm run build-all)
pause
cd .\dist\myrmidon\cadmus-itinera-core
call npm publish --access=public
cd ..\..\..
pause
cd .\dist\myrmidon\cadmus-itinera-part-lt-pg
call npm publish --access=public
cd ..\..\..
pause
cd .\dist\myrmidon\cadmus-itinera-part-lt-ui
call npm publish --access=public
cd ..\..\..
pause
cd .\dist\myrmidon\cadmus-itinera-part-ms-pg
call npm publish --access=public
cd ..\..\..
pause
cd .\dist\myrmidon\cadmus-itinera-part-ms-ui
call npm publish --access=public
cd ..\..\..
pause
cd .\dist\myrmidon\cadmus-itinera-ui
call npm publish --access=public
cd ..\..\..
pause
echo ALL DONE
