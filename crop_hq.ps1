Add-Type -AssemblyName System.Drawing
$imgPath = "C:\Users\alejo\.gemini\antigravity\brain\43ff539a-1547-4b62-8f40-ac899ee1ec0f\.user_uploaded\media_1788540900069.png"
$img = [System.Drawing.Image]::FromFile($imgPath)
Write-Host "Size: $($img.Width) x $($img.Height)"

# In media_1788540900069.png (1024x1024), the doctor avatar is at X: 153, Y: 295, W: 140, H: 140
$cropRect = New-Object System.Drawing.Rectangle(153, 295, 140, 140)
$target = New-Object System.Drawing.Bitmap(300, 300)
$g = [System.Drawing.Graphics]::FromImage($target)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.DrawImage($img, (New-Object System.Drawing.Rectangle(0, 0, 300, 300)), $cropRect, [System.Drawing.GraphicsUnit]::Pixel)
$target.Save((Join-Path (Get-Location) "assets\dr-fabricio-loayza-profile.jpg"), [System.Drawing.Imaging.ImageFormat]::Jpeg)

# Also let's extract doctor's portrait in consultation room
$target.Save((Join-Path (Get-Location) "assets\dr-fabricio-loayza.jpg"), [System.Drawing.Imaging.ImageFormat]::Jpeg)

$g.Dispose()
$target.Dispose()
$img.Dispose()
Write-Host "Created assets\dr-fabricio-loayza-profile.jpg and updated assets\dr-fabricio-loayza.jpg"
