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
echo Digite a mensagem do commit (ou aguarde 20 segundos para usar data-hora):
echo.
powershell -Command "$msg = ''; $job = Start-Job -ScriptBlock { Read-Host 'Mensagem' }; if (Wait-Job $job -Timeout 30) { $msg = Receive-Job $job }; Remove-Job $job -Force; if ($msg) { $msg | Out-File -Encoding ASCII -NoNewline commit_msg.tmp }" 2>nul

if exist commit_msg.tmp (
    set /p mensagem=<commit_msg.tmp
    del commit_msg.tmp
    echo Usando: %mensagem%
) else (
    for /f "tokens=1-3 delims=/ " %%a in ('date /t') do set DATA=%%c_%%b_%%a
    for /f "tokens=1-2 delims=: " %%a in ('time /t') do set HORA=%%a%%b
    set mensagem=%DATA%_%HORA%
    echo Timeout - usando mensagem automatica: %mensagem%
)

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
