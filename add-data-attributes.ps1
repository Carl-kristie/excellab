# PowerShell script to add specific data attributes to HTML pages

$htmlFiles = @(
    "commodity.html", "exploration.html", "hse.html", "international.html", 
    "maritime.html", "oil.html", "oilfield.html", "team.html",
    "team1.html", "team2.html", "team3.html", "team4.html", 
    "team5.html", "team6.html", "team7.html", "team8.html"
)

foreach ($file in $htmlFiles) {
    $filePath = "c:\Users\user\Documents\GitHub\excellab\$file"
    
    if (Test-Path $filePath) {
        Write-Host "Adding data attributes to $file..."
        
        $content = Get-Content $filePath -Raw
        
        # Fix body tag if malformed
        $content = $content -replace '<body data-slug="[^"]*"[^>]*>', "<body data-slug=`"$(($file -split '\.')[0])`">"
        
        # Add data attributes to header phone/email
        $content = $content -replace '<li><i class="fas fa-phone"></i>[^<]*</li>', '<li data-site="phone"><i class="fas fa-phone"></i>+2348037091874</li>'
        $content = $content -replace '<li><i class="far fa-envelope"></i>[^<]*</li>', '<li data-site="email"><i class="far fa-envelope"></i>info@excellauenergy.com</li>'
        
        # Add data attributes to logo
        $content = $content -replace '<a href="index\.html"><img src="assets/img/logo/excella\.png" alt="">([^<]*)</a>', '<a href="index.html" data-site="logo-link"><img src="assets/img/logo/excella.png" alt="" data-site="logo-img"><span data-site="company-name">$1</span></a>'
        
        # Add data attribute to navigation
        $content = $content -replace '<ul id="navigation">', '<ul id="navigation" data-site="navigation">'
        
        # Add data attributes to footer copyright
        $content = $content -replace '<p>Copyright ©2025 All rights reserved</p>', '<p data-site="copyright">Copyright ©2025 All rights reserved</p>'
        
        # Write the updated content back to the file
        Set-Content $filePath -Value $content -Encoding UTF8
        
        Write-Host "Added data attributes to $file"
    } else {
        Write-Host "File not found: $file"
    }
}

Write-Host "Data attributes added to all HTML pages!"
