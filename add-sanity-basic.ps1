# PowerShell script to add Sanity CMS integration to all HTML pages

$htmlFiles = @(
    "commodity.html", "exploration.html", "hse.html", "international.html", 
    "maritime.html", "oil.html", "oilfield.html", "team.html",
    "team1.html", "team2.html", "team3.html", "team4.html", 
    "team5.html", "team6.html", "team7.html", "team8.html"
)

foreach ($file in $htmlFiles) {
    $filePath = "c:\Users\user\Documents\GitHub\excellab\$file"
    
    if (Test-Path $filePath) {
        Write-Host "Processing $file..."
        
        $content = Get-Content $filePath -Raw
        
        # Add CSS and body attribute  
        $content = $content -replace 'assets/css/style\.css">\s*</head>\s*<body>', "assets/css/style.css`">`n    <link rel=`"stylesheet`" href=`"assets/css/sanity-integration.css`">`n</head>`n<body data-slug=`"$(($file -split '\.')[0])`""
        
        # Add Sanity scripts before closing body tag
        $content = $content -replace '</body>', "`n<!-- Sanity CMS Integration -->`n<script type=`"module`" src=`"https://esm.sh/@sanity/client@6`"></script>`n<script type=`"module`" src=`"./assets/js/sanity-site-loader.js`"></script>`n`n</body>"
        
        # Write the updated content back to the file
        Set-Content $filePath -Value $content -Encoding UTF8
        
        Write-Host "Updated $file"
    } else {
        Write-Host "File not found: $file"
    }
}

Write-Host "Sanity integration added to all HTML pages!"
