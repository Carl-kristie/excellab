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
        
        # 1. Add CSS and body attribute
        $content = $content -replace '(assets/css/style\.css">)\s*</head>\s*<body>', "`$1`n    <link rel=`"stylesheet`" href=`"assets/css/sanity-integration.css`">`n</head>`n<body data-slug=`"$(($file -split '\.')[0])`""
        
        # 2. Add data attributes to header phone/email
        $content = $content -replace '(<li><i class="fas fa-phone"></i>[^<]*</li>)', '<li data-site="phone"><i class="fas fa-phone"></i>+2348037091874</li>'
        $content = $content -replace '(<li><i class="far fa-envelope"></i>[^<]*</li>)', '<li data-site="email"><i class="far fa-envelope"></i>info@excellauenergy.com</li>'
        
        # 3. Add data attributes to logo
        $content = $content -replace '(<a href="index\.html">)(<img src="assets/img/logo/excella\.png" alt="">)(Excella <br> U <br> Energy</a>)', '`$1<img src="assets/img/logo/excella.png" alt="" data-site="logo-img"><span data-site="company-name">Excella <br> U <br> Energy</span></a>'
        $content = $content -replace '(<a href="index\.html">)', '<a href="index.html" data-site="logo-link">'
        
        # 4. Add data attribute to navigation
        $content = $content -replace '(<ul id="navigation">)', '<ul id="navigation" data-site="navigation">'
        
        # 5. Add data attributes to footer sections
        $content = $content -replace '(<div class="col-lg-6 col-md-6">\s*<h5[^>]*>Contact</h5>\s*)(<p class="mb-2[^>]*><i class="fa fa-envelope[^>]*>[^<]*</p>\s*)(<p class="mb-2[^>]*><i class="fa fa-envelope[^>]*>[^<]*</p>)', '`$1<div data-site="footer-emails">`$2`$3</div>'
        
        $content = $content -replace '(<p class="mb-2[^>]*><i class="fa fa-map-marker-alt[^>]*>[^<]*</p>)', '<p class="mb-2 btn-light-white" data-site="footer-address"><i class="fa fa-map-marker-alt me-3"></i> Cyrus Excel Estate Plot 963 R.I Uzoma street Wuye Abuja</p>'
        
        $content = $content -replace '(<p class="mb-2[^>]*><i class="fa fa-phone[^>]*>[^<]*</p>\s*)(<p class="mb-2[^>]*><i class="fa fa-phone[^>]*>[^<]*</p>)', '<div data-site="footer-phones">`$1`$2</div>'
        
        # 6. Add data attribute to footer navigation
        $content = $content -replace '(<h5 class="text-white mb-4">Navigation</h5>\s*)(<a class="btn1[^>]*>[^<]*</a>\s*)(<a class="btn1[^>]*>[^<]*</a>\s*)(<a class="btn1[^>]*>[^<]*</a>\s*)(<a class="btn1[^>]*>[^<]*</a>\s*)(<a class="btn1[^>]*>[^<]*</a>)', '`$1<div data-site="footer-navigation">`$2`$3`$4`$5`$6</div>'
        
        # 7. Add data attribute to copyright
        $content = $content -replace '(<p>Copyright ©2025 All rights reserved</p>)', '<p data-site="copyright">Copyright ©2025 All rights reserved</p>'
        
        # 8. Add Sanity scripts before closing body tag
        $content = $content -replace '(</body>)', "`n<!-- Sanity CMS Integration -->`n<script type=`"module`" src=`"https://esm.sh/@sanity/client@6`"></script>`n<script type=`"module`" src=`"./assets/js/sanity-site-loader.js`"></script>`n`n</body>"
        
        # Write the updated content back to the file
        Set-Content $filePath -Value $content -Encoding UTF8
        
        Write-Host "✓ Updated $file"
    } else {
        Write-Host "✗ File not found: $file"
    }
}

Write-Host "Sanity integration added to all HTML pages!"
