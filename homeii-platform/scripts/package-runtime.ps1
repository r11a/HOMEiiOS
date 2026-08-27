$ErrorActionPreference = "Stop"
$platformRoot = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
$workspaceRoot = (Resolve-Path (Join-Path $platformRoot "..")).Path
$panelRoot = Join-Path $workspaceRoot "homeos-react"
$sourceBundle = Join-Path $panelRoot "dist-runtime\homeii-panel.js"
$frontendDir = Join-Path $platformRoot "custom_components\homeii\frontend"
$targetBundle = Join-Path $frontendDir "homeii-panel.js"

Push-Location $panelRoot
try {
    npm.cmd run build:runtime
} finally {
    Pop-Location
}

New-Item -ItemType Directory -Path $frontendDir -Force | Out-Null
Copy-Item -LiteralPath $sourceBundle -Destination $targetBundle -Force
Write-Host "Packaged HOMEii native panel: $targetBundle"
