Add-Type -Path "c:\Program Files\Common Files\microsoft shared\Web Server Extensions\16\ISAPI\Microsoft.SharePoint.Client.dll"
Add-Type -Path "c:\Program Files\Common Files\microsoft shared\Web Server Extensions\16\ISAPI\Microsoft.SharePoint.Client.Runtime.dll"
Add-Type -Path "c:\Program Files\Common Files\microsoft shared\Web Server Extensions\16\ISAPI\Microsoft.SharePoint.Client.Taxonomy.dll"

cls
[System.Net.ServicePointManager]::ServerCertificateValidationCallback = {$true}

$url = "https://vminsideweb01/sites/proc/"
$login = "etisalat-africa.net\svc_spadmin01"
$pwdstring = "@moovinside01"
$listNames = @('ListeCaissePaiement','ListeGadgetEvenement','ListeMaterielItArchitecture','ListeMaterielItCategories','ListeMaterielItMarques',
'ListeMaterielItModels','ListeMaterielItNature','ListeMissionDetailsIntitule','ListeMaterielItSiteExploitation','ListeMaterielItTypes','ListeMissionDestination',
'ListeMissionSiteBTS','ListeMissionTypeIntervention','ListeModePaiement',
'ListeTypeConge', 'ListeTypeAbsence', 'ListeMissionMotif', 'ListeZoneGeographique'

)



function Corrige {

    param (
        $pwdstring,
        $url, $login, $listName
    )


$pwd = ConvertTo-SecureString $pwdstring -AsPlainText -Force
$ctx = New-Object Microsoft.SharePoint.Client.ClientContext($url)
$credentiale = New-Object System.Net.NetworkCredential($login, $pwd)
$ctx.Credentials = $credentiale   

$list = $ctx.Web.Lists.GetByTitle($listName)
$ctx.Load($list)
$ctx.ExecuteQuery()
 

#Get a List item by its Title
$Query = New-Object Microsoft.SharePoint.Client.CamlQuery
$Query.ViewXml = "@
<View>
    <Query>
        <Where>
                
        </Where>
    </Query>
</View>"
  
#Get All List Items matching the query
$listItems = $list.GetItems($Query)
$ctx.Load($listItems)
$ctx.ExecuteQuery()
 
Write-host "########" $listName
    
    #Loop through each file in the library  
    Foreach($Item in $listItems)
    { 
         Write-host -f Red $Item["Title"]  

         $Item["Title"] = $Item["Title"].ToString().Replace('Ã¨','e').Replace('ï¿½','e').Replace('é','e').Replace('è','e').Replace('â','e').ToUpper().Trim()
         $Item.Update()
         $ctx.ExecuteQuery()

         Write-host -f Green  $Item["Title"].ToString().Replace('Ã¨','e').Replace('ï¿½','e').Replace('é','e').Replace('è','e').Replace('â','e').ToUpper()
    }

}


 Foreach($listname in $listNames)
 { 
       Corrige -pwdstring $pwdstring -url $url -login $login -listName $listname
    }

