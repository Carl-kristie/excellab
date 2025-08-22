# PowerShell script to update all remaining pages with canonical data attributes
# This ensures all pages use the same data-site attribute names that match sanity-site-loader.js

$pages = @(
    "commodity.html",
    "exploration.html", 
    "hse.html",
    "international.html",
    "maritime.html",
    "oil.html",
    "oilfield.html",
    "team.html",
    "team1.html",
    "team2.html", 
    "team3.html",
    "team4.html",
    "team5.html",
    "team6.html",
    "team7.html",
    "team8.html"
)

foreach ($page in $pages) {
    if (Test-Path $page) {
        Write-Host "Updating $page with canonical attributes..."
        
        # Read file content
        $content = Get-Content $page -Raw -Encoding UTF8
        
        # Update logo-img to logo
        $content = $content -replace 'data-site="logo-img"', 'data-site="logo"'
        
        # Update company-name to companyName  
        $content = $content -replace 'data-site="company-name"', 'data-site="companyName"'
        
        # Update footer-navigation to footerNavigation
        $content = $content -replace 'data-site="footer-navigation"', 'data-site="footerNavigation"'
        
        # Write updated content back
        $content | Set-Content $page -Encoding UTF8 -NoNewline
        
        Write-Host "✅ Updated $page"
    } else {
        Write-Host "⚠️  File $page not found"
    }
}

Write-Host "`n🎉 Canonical attribute update complete!"
Write-Host "All pages now use standardized data-site attributes that match sanity-site-loader.js selectors."
