# Certify Email Setup Script
# Run this script to configure email settings for your business Gmail account

Write-Host "Certify Email Setup" -ForegroundColor Green
Write-Host "==================" -ForegroundColor Green
Write-Host ""

# Prompt for Gmail credentials
$email = Read-Host "Enter your business Gmail address (e.g., admin@yourcompany.com)"
$appPassword = Read-Host "Enter your Gmail App Password (16 characters)" -AsSecureString

# Convert secure string to plain text for configuration file output
$appPasswordPlain = [Runtime.InteropServices.Marshal]::PtrToStringAuto([Runtime.InteropServices.Marshal]::SecureStringToBSTR($appPassword))

$projectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$backendEnvPath = Join-Path $projectRoot "certify-backend\.env"
$envFileContents = @"
SPRING_MAIL_USERNAME=$email
SPRING_MAIL_PASSWORD=$appPasswordPlain
APP_MAIL_FROM=$email
APP_MAIL_ENABLED=true
APP_MAIL_EXPIRY_ALERT_DAYS=1
SPRING_MAIL_TEST_CONNECTION=true
"@

Set-Content -Path $backendEnvPath -Value $envFileContents

Write-Host ""
Write-Host "Email configuration saved:" -ForegroundColor Yellow
Write-Host "File: $backendEnvPath"
Write-Host "SPRING_MAIL_USERNAME: $email"
Write-Host "SPRING_MAIL_PASSWORD: [HIDDEN]"
Write-Host "APP_MAIL_FROM: $email"
Write-Host "APP_MAIL_EXPIRY_ALERT_DAYS: 1"
Write-Host ""

Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Restart your Spring Boot application"
Write-Host "2. Watch the backend logs for the SMTP startup validation result"
Write-Host "3. Register a new user or add a certificate to trigger an email"
Write-Host ""
Write-Host "This setup persists in certify-backend/.env, so it works from terminal and IDE launches." -ForegroundColor Magenta
