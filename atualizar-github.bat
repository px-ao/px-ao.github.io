@echo off
echo ================================
echo Atualizando repositorio GitHub
echo ================================
echo.

echo [1/4] Verificando status...
git status
echo.

echo [2/4] Adicionando arquivos modificados...
git add .

echo.

echo [3/4] Fazendo commit...
for /f "tokens=1-3 delims=/ " %%a in ('date /t') do set DATA=%%c-%%b-%%a
for /f "tokens=1-2 delims=: " %%a in ('time /t') do set HORA=%%a%%b
for /f "delims=" %%i in ('git diff --cached --name-only') do set ARQUIVOS=%%i & goto :done
:done
set mensagem=%DATA% %HORA% - %ARQUIVOS%
git commit -m "%mensagem%"
echo.

echo [4/4] Enviando para o GitHub...
git push origin main
echo.

echo ================================
echo Verificando resultado...
echo ================================
echo.
echo Ultimo commit:
git log -1 --oneline
echo.
echo Arquivos modificados neste commit:
git diff --name-only HEAD~1 HEAD
echo.

echo ================================
echo Concluido com sucesso!
echo ================================
pause
