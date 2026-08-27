param(
    [Parameter(Mandatory = $true)]
    [string]$ConfigPath
)

$ErrorActionPreference = "Stop"
$source = (Resolve-Path (Join-Path $PSScriptRoot "..\custom_components\homeii")).Path
$resolvedConfig = (Resolve-Path -LiteralPath $ConfigPath).Path
$customComponents = Join-Path $resolvedConfig "custom_components"
$target = Join-Path $customComponents "homeii"

if (-not (Test-Path -LiteralPath (Join-Path $source "frontend\homeii-panel.js"))) {
    throw "Frontend bundle missing. Run scripts\package-runtime.ps1 first."
}
New-Item -ItemType Directory -Path $customComponents -Force | Out-Null
New-Item -ItemType Directory -Path $target -Force | Out-Null
Get-ChildItem -LiteralPath $source -Recurse -File |
    Where-Object { $_.Extension -notin ".pyc", ".pyo" -and $_.FullName -notmatch "[\\/]__pycache__[\\/]" } |
    ForEach-Object {
        $relative = $_.FullName.Substring($source.Length).TrimStart("\", "/")
        $destination = Join-Path $target $relative
        New-Item -ItemType Directory -Path (Split-Path $destination -Parent) -Force | Out-Null
        Copy-Item -LiteralPath $_.FullName -Destination $destination -Force
    }
Write-Host "Installed HOMEii integration to $target"
Write-Host "Restart Home Assistant, then add 'HOMEii Dashboard Platform' from Devices & services."
