# Servidor HTTP local en PowerShell para CLINIDIAB
param([int]$Port = 8000)

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$Port/")
$listener.Start()

Write-Host "=================================================="
Write-Host "  🩺 SERVIDOR CLINIDIAB INICIADO EN LOCALHOST"
Write-Host "  Página Web: http://localhost:$Port/index.html"
Write-Host "  Panel Admin: http://localhost:$Port/admin.html"
Write-Host "=================================================="

$mimeTypes = @{
    ".html" = "text/html; charset=utf-8"
    ".css"  = "text/css"
    ".js"   = "application/javascript"
    ".svg"  = "image/svg+xml"
    ".png"  = "image/png"
    ".jpg"  = "image/jpeg"
    ".webp" = "image/webp"
    ".json" = "application/json"
}

try {
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response
        
        $urlPath = [System.Uri]::UnescapeDataString($request.Url.LocalPath)
        if ($urlPath -eq "/" -or $urlPath -eq "") { $urlPath = "/index.html" }
        
        $relativePath = $urlPath.TrimStart('/').Replace('/', '\')
        $filePath = Join-Path (Get-Location) $relativePath
        
        if (Test-Path $filePath -PathType Leaf) {
            $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
            $contentType = $mimeTypes[$ext]
            if (-not $contentType) { $contentType = "application/octet-stream" }
            
            $bytes = [System.IO.File]::ReadAllBytes($filePath)
            $response.ContentType = $contentType
            $response.ContentLength64 = $bytes.Length
            $response.StatusCode = 200
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
        } else {
            $response.StatusCode = 404
            $notFoundBytes = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found")
            $response.ContentType = "text/plain"
            $response.ContentLength64 = $notFoundBytes.Length
            $response.OutputStream.Write($notFoundBytes, 0, $notFoundBytes.Length)
        }
        $response.Close()
    }
} catch {
    Write-Host "Servidor detenido."
} finally {
    $listener.Stop()
}
