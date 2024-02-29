





function Add-OptionsToList {
  param(
      [string]$SiteUrl,
      [string]$ListName,
      [string]$OptionsString
  )

  $site = Get-SPSite $SiteUrl
  $web = $site.OpenWeb()

  try {
      $list = $web.Lists[$ListName]
      $OptionPattern = '<OPTION value=(.*?)>(.*?)<\/OPTION>'
      $OptionMatches = [regex]::Matches($OptionsString, $OptionPattern)

      # Ajouter chaque option en tant qu'enregistrement
      foreach ($Match in $OptionMatches) {
          $Value = $Match.Groups[2].Value
          $newItem = $list.AddItem()
          $newItem["Title"] = $Value
          $newItem.Update()
      }
      Write-Host "..."
  }
  catch {
      Write-Host "Une erreur s'est produite : $_.Exception.Message"
  }
  finally {
      $web.Dispose()
      $site.Dispose()
  }
}
