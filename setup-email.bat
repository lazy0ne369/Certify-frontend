@echo off
REM Certify Email Setup Batch Script
REM Run this script to configure email settings

echo Certify Email Setup
echo ===================
echo.

set /p EMAIL="Enter your business Gmail address (e.g., admin@yourcompany.com): "
set /p APP_PASSWORD="Enter your Gmail App Password (16 characters): "

REM Save configuration to certify-backend\.env so Spring Boot can load it automatically
(
echo SPRING_MAIL_USERNAME=%EMAIL%
echo SPRING_MAIL_PASSWORD=%APP_PASSWORD%
echo APP_MAIL_FROM=%EMAIL%
echo APP_MAIL_ENABLED=true
echo APP_MAIL_EXPIRY_ALERT_DAYS=1
echo SPRING_MAIL_TEST_CONNECTION=true
) > certify-backend\.env

echo.
echo Email configuration saved:
echo File: certify-backend\.env
echo SPRING_MAIL_USERNAME: %EMAIL%
echo SPRING_MAIL_PASSWORD: [HIDDEN]
echo APP_MAIL_FROM: %EMAIL%
echo APP_MAIL_EXPIRY_ALERT_DAYS: 1
echo.

echo Next steps:
echo 1. Restart your Spring Boot app
echo 2. Watch the backend logs for the SMTP startup validation result
echo 3. Test by registering a new user or adding a certificate
echo.
echo This setup persists in certify-backend\.env, so it works from terminal and IDE launches.

pause
