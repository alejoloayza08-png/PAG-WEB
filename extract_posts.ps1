Add-Type -AssemblyName System.Drawing

$img1Path = "C:\Users\alejo\.gemini\antigravity\brain\43ff539a-1547-4b62-8f40-ac899ee1ec0f\.user_uploaded\media_1788539701018.png"
$img2Path = "C:\Users\alejo\.gemini\antigravity\brain\43ff539a-1547-4b62-8f40-ac899ee1ec0f\.user_uploaded\media_1788539696210.png"

$img1 = [System.Drawing.Image]::FromFile($img1Path)
$img2 = [System.Drawing.Image]::FromFile($img2Path)

Write-Host "Img1 size: $($img1.Width) x $($img1.Height)"
Write-Host "Img2 size: $($img2.Width) x $($img2.Height)"

# Helper to crop and save
function Crop-Image($source, $rect, $outputPath) {
    $target = New-Object System.Drawing.Bitmap($rect.Width, $rect.Height)
    $g = [System.Drawing.Graphics]::FromImage($target)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.DrawImage($source, (New-Object System.Drawing.Rectangle(0, 0, $target.Width, $target.Height)), $rect, [System.Drawing.GraphicsUnit]::Pixel)
    $target.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Jpeg)
    $g.Dispose()
    $target.Dispose()
    Write-Host "Saved: $outputPath"
}

# In Img1 (1024x512 approx or similar), the 3 transformation cards are in the lower half
# Let's inspect the cards positions:
# Card 1: left approx X: 80, Y: 290, W: 275, H: 220
# Card 2: center approx X: 370, Y: 290, W: 275, H: 220
# Card 3: right approx X: 665, Y: 290, W: 275, H: 220

Crop-Image $img1 (New-Object System.Drawing.Rectangle(82, 285, 270, 225)) (Join-Path (Get-Location) "assets\post-transformacion-1.jpg")
Crop-Image $img1 (New-Object System.Drawing.Rectangle(372, 285, 270, 225)) (Join-Path (Get-Location) "assets\post-transformacion-2.jpg")
Crop-Image $img1 (New-Object System.Drawing.Rectangle(667, 285, 270, 225)) (Join-Path (Get-Location) "assets\post-transformacion-3.jpg")

# In Img2, academic/congresses cards:
Crop-Image $img2 (New-Object System.Drawing.Rectangle(82, 285, 270, 225)) (Join-Path (Get-Location) "assets\congreso-1.jpg")
Crop-Image $img2 (New-Object System.Drawing.Rectangle(372, 285, 270, 225)) (Join-Path (Get-Location) "assets\congreso-2.jpg")
Crop-Image $img2 (New-Object System.Drawing.Rectangle(667, 285, 270, 225)) (Join-Path (Get-Location) "assets\congreso-3.jpg")

$img1.Dispose()
$img2.Dispose()
