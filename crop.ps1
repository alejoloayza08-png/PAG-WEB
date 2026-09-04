Add-Type -AssemblyName System.Drawing
$imgPath = Join-Path (Get-Location) "thumb.png"
$img = [System.Drawing.Image]::FromFile($imgPath)
Write-Output "Image size: $($img.Width)x$($img.Height)"

# Coordinates for doctor's photo in thumb.png (1200x630)
# Doctor photo is at approx X: 678, Y: 226, W: 118, H: 118
$cropRect = New-Object System.Drawing.Rectangle(678, 226, 118, 118)
$target = New-Object System.Drawing.Bitmap($cropRect.Width, $cropRect.Height)
$g = [System.Drawing.Graphics]::FromImage($target)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.DrawImage($img, (New-Object System.Drawing.Rectangle(0, 0, $target.Width, $target.Height)), $cropRect, [System.Drawing.GraphicsUnit]::Pixel)

$target.Save((Join-Path (Get-Location) "assets\dr-fabricio-loayza.jpg"), [System.Drawing.Imaging.ImageFormat]::Jpeg)
$g.Dispose()
$target.Dispose()
$img.Dispose()
Write-Output "Saved assets\dr-fabricio-loayza.jpg"
