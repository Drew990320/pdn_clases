@echo off
echo Construyendo frontend React...

cd frontend
call npm run build

echo Copiando archivos al directorio de recursos...
xcopy /E /I /Y dist\* ..\src\main\resources\static\

echo Frontend construido exitosamente!
pause
