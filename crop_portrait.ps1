Add-Type -AssemblyName System.Drawing
$imgPath = (Join-Path (Get-Location) "assets\congreso-2.jpg")
$img = [System.Drawing.Image]::FromFile($imgPath)

# Doctor is in the right half of congreso-2.jpg (270x225)
# Crop doctor: X: 140, Y: 10, W: 125, H: 200
$cropRect = New-Object System.Drawing.Rectangle(140, 10, 125, 200)
$target = New-Object System.Drawing.Bitmap(350, 480)
$g = [System.Drawing.Graphics]::FromImage($target)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.DrawImage($img, (New-Object System.Drawing.Rectangle(0, 0, 350, 480)), $cropRect, [System.Drawing.GraphicsUnit]::Pixel)
$target.Save((Join-Path (Get-Location) "assets\dr-loayza-portrait.jpg"), [System.Drawing.Imaging.ImageFormat]::Jpeg)

$g.Dispose()
$target.Dispose()
$img.Dispose()
Write-Host "Created assets\dr-loayza-portrait.jpg"
