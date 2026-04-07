$files = @("adarkc.html","amilkc.html","bdarkc.html","bmilkc.html","cdarkc.html","cmilkc.html")
$old = '<svg viewBox="0 0 24 24"><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="16" y2="12"/><line x1="4" y1="18" x2="12" y2="18"/></svg>'
$new = '<svg viewBox="0 0 24 24"><line x1="21" y1="4" x2="14" y2="4"/><line x1="10" y1="4" x2="3" y2="4"/><line x1="21" y1="12" x2="12" y2="12"/><line x1="8" y1="12" x2="3" y2="12"/><line x1="21" y1="20" x2="16" y2="20"/><line x1="12" y1="20" x2="3" y2="20"/><circle cx="12" cy="4" r="2"/><circle cx="10" cy="12" r="2"/><circle cx="14" cy="20" r="2"/></svg>'

foreach ($f in $files) {
    $p = "public/pages/$f"
    $c = [System.IO.File]::ReadAllText((Resolve-Path $p).Path)
    if ($c.Contains($old)) {
        $c = $c.Replace($old, $new)
        [System.IO.File]::WriteAllText((Resolve-Path $p).Path, $c)
        Write-Host "DONE: $f (filter icon updated)"
    } else {
        Write-Host "SKIP: $f (old icon not found)"
    }
}
Write-Host "Done."
