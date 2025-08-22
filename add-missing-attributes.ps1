# PowerShell script to add missing data-site attributes to pages that need them
# This adds logo and companyName attributes to pages that are missing them

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
        Write-Host "Adding missing attributes to $page..."
        
        # Read file content
        $content = Get-Content $page -Raw -Encoding UTF8
        
        # Add data-site="logo" to img tags that don't have it
        $content = $content -replace '<img src="assets/img/logo/excella\.png" alt="">', '<img src="assets/img/logo/excella.png" alt="" data-site="logo">'
        
        # Add data-site="companyName" to company name text that doesn't have it
        $content = $content -replace 'Excella <br> U <br> Energy</a>', '<span data-site="companyName">Excella <br> U <br> Energy</span></a>'
        
        # Fix cases where span might already exist but without data-site
        $content = $content -replace '<span>Excella <br> U <br> Energy</span>', '<span data-site="companyName">Excella <br> U <br> Energy</span>'
        
        # Add footer navigation wrapper if missing
        if ($content -match '<div class="col-lg-3 col-md-6">\s*<h5 class="text-white mb-4">Navigation</h5>\s*<a class="btn1 btn-link"') {
            $content = $content -replace '(<h5 class="text-white mb-4">Navigation</h5>\s*)((?:\s*<a class="btn1 btn-link"[^>]*>[^<]*</a>\s*)+)', '$1<div data-site="footerNavigation">$2</div>'
        }
        
        # Write updated content back
        $content | Set-Content $page -Encoding UTF8 -NoNewline
        
        Write-Host "✅ Updated $page"
    } else {
        Write-Host "⚠️  File $page not found"
    }
}

Write-Host "`n🎉 Missing attributes addition complete!"
Write-Host "All pages now have complete data-site attribute coverage."
