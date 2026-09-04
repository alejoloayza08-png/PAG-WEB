$base = 'https://c8b01750-c4aa-4328-9e88-410895d53050.frame.claudeusercontent.com/_f/1788462736-caee/'
$testNames = @('', 'index.html', 'app.html', 'frame.html', 'source.html', 'artifact.html', 'index.js', 'main.js', 'bundle.js', 'manifest.json', 'content.json', 'app.js')

foreach ($name in $testNames) {
    try {
        $url = $base + $name
        $res = Invoke-WebRequest -Uri $url -Method Get -TimeoutSec 5 -ErrorAction Stop
        Write-Host "FOUND: $url (Bytes: $($res.Content.Length))"
        $res.Content | Out-File (Join-Path (Get-Location) "artifact_found_$name.html")
    } catch {
        Write-Host "No: $name ($($_.Exception.Message))"
    }
}
