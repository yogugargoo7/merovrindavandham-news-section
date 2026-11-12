$ErrorActionPreference = "Stop"

$projectRoot = Split-Path -Parent $PSScriptRoot
$distDir = Join-Path $projectRoot "dist"
$zipPath = Join-Path $projectRoot "merovrindavandham-hostinger-upload.zip"

Write-Host "Building production site..."
Push-Location $projectRoot
try {
  npm run build
  if ($LASTEXITCODE -ne 0) {
    throw "Production build failed. ZIP was not created."
  }

  if (-not (Test-Path $distDir)) {
    throw "dist folder was not created."
  }

  if (Test-Path $zipPath) {
    Remove-Item -LiteralPath $zipPath -Force
  }

  Write-Host "Creating Hostinger ZIP with real folders..."
  # Pass each top-level item by name so entries are "index.html", "assets/..."
  # (no "./" prefix, which some extractors turn into an extra folder)
  $topLevel = Get-ChildItem -LiteralPath $distDir -Force | ForEach-Object { $_.Name }
  tar.exe -a -c -f $zipPath -C $distDir @topLevel
  if ($LASTEXITCODE -ne 0) {
    throw "ZIP creation failed."
  }

  $entries = tar.exe -tf $zipPath
  $badEntries = $entries | Where-Object { $_ -match "\\" -or $_ -match "^\./" }
  if ($badEntries) {
    throw "ZIP contains backslash or ./ paths. Do not upload this ZIP."
  }

  $requiredEntries = @(
    "index.html",
    ".htaccess",
    "api-proxy.php",
    "assets/",
    "vrindavan-material/"
  )

  foreach ($entry in $requiredEntries) {
    if ($entries -notcontains $entry) {
      throw "ZIP missing required entry: $entry"
    }
  }

  $zip = Get-Item $zipPath
  $sizeMb = [math]::Round($zip.Length / 1MB, 2)
  Write-Host "Hostinger ZIP ready: $zipPath ($sizeMb MB)"
  Write-Host "Upload this ZIP into public_html and extract it there."
}
finally {
  Pop-Location
}
