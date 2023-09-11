# Copies tous les fichier  Schema.xml de toutes tes listes dans un dossier
# Renommes les � chaque fois

Add-Type -Path "c:\Program Files\Common Files\microsoft shared\Web Server Extensions\16\ISAPI\Microsoft.SharePoint.Client.dll"
Add-Type -Path "c:\Program Files\Common Files\microsoft shared\Web Server Extensions\16\ISAPI\Microsoft.SharePoint.Client.Runtime.dll"
Add-Type -Path "c:\Program Files\Common Files\microsoft shared\Web Server Extensions\16\ISAPI\Microsoft.SharePoint.Client.Taxonomy.dll"

$url = "http://vminsideweb01/sites/proc/"
$login = "etisalat-africa.net\svc_spadmin02"
$pwdstring = "P@ssw0rd02"
$listName = "tools"
$localFolder= Get-Location
$subFolder = "";

$pwd = ConvertTo-SecureString $pwdstring -AsPlainText -Force
$ctx = New-Object Microsoft.SharePoint.Client.ClientContext($url)
$credentiale = New-Object System.Net.NetworkCredential($login, $pwd)
$ctx.Credentials = $credentiale

$list = $ctx.Web.Lists.GetByTitle($listName)
$ctx.Load($list)
$ctx.ExecuteQuery()
$rootFolder = $list.RootFolder
$ctx.Load($rootFolder)
$ctx.ExecuteQuery()
$rootFolderUrl = $rootFolder.ServerRelativeUrl

$listfolder = Get-ChildItem $localFolder -Recurse

write-host "Starting upload ..."
foreach ($f in $listfolder){
  $t=$f.GetType() ;
  if($t.FullName.EndsWith("DirectoryInfo"))
   {
      $subFolder=$rootFolder.Folders.Add($rootFolderUrl + $f.FullName.Replace($localFolder,""))
      $ctx.Load($subFolder)
      $ctx.ExecuteQuery()
      write-host "Copying folder " $f.FullName "to" $rootFolderUrl + $f.FullName.Replace($localFolder,"") "..."
   }

   if($t.FullName.EndsWith("FileInfo"))
   {
     $FileStream = ([System.IO.FileInfo] (Get-Item $f.FullName)).OpenRead()
     $FileCreationInfo = New-Object Microsoft.SharePoint.Client.FileCreationInformation
     $FileCreationInfo.Overwrite = $true
     $FileCreationInfo.ContentStream = $FileStream
     $FileCreationInfo.URL = $rootFolderUrl + $f.FullName.Replace($localFolder,"")
     $Upload = $subFolder.Files.Add($FileCreationInfo)
     $ctx.Load($Upload)
     $ctx.ExecuteQuery()
     write-host "Copying file " $f.FullName " to " $rootFolderUrl + $f.FullName.Replace($localFolder,"")  "..."

   }
}